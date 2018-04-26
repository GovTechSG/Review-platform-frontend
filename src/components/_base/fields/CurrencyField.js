/* eslint complexity: [2,8] */
/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames';
import numeral from 'numeral';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class CurrencyField extends React.Component {
  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
    this.maxFraction = parseInt(props.maxFraction, 10) || 2;
    this.maxInteger = props.maxInteger || 12;
    this.previousInverseCursor = null;
    this.rawValue = props.data.deref();
    this.negative = props.negative;

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue;
    const value = this.refs.field.value;
    if (typeof defaultValue !== 'undefined' && !value && value !== '') {
      this.refs.field.value = defaultValue;
    }
  }

  componentDidUpdate(prevProps) {
    const field = this.refs.field;
    const prevValue = prevProps.data.deref();
    const curValue = this.props.data.deref();

    if (prevValue && curValue && this.previousInverseCursor !== null) {
      const previousCursor = field.value.length - this.previousInverseCursor;
      if (prevValue.length === curValue.length) {
        this.setCaretPosition(field, previousCursor + 1);
      } else {
        this.setCaretPosition(field, previousCursor);
      }
    }
  }

  render() {
    const value = this.props.data.deref();
    const error = this.props.error.deref();
    const readOnly = this.props.readOnly;
    const disabled = this.props.disabled;
    const displayError = this.props.displayError;
    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;
    const leftAddon = this.props.leftAddon;
    const rightAddon = this.props.rightAddon;

    const classes = classNames(`form-control bgp-textfield ${this.props.additionalClasses || ''}`,
      { 'has-error': error });
    const addonClass = (leftAddon || rightAddon) ? 'input-group' : '';
    const unitClasses = classNames('input-group-addon bgp-input-group-addon', { 'has-error': error });

    return (
      <div>
        <div className={addonClass}>
          {
            leftAddon && <span className={unitClasses}>{leftAddon}</span>
          }
          <input className={classes}
            id={id}
            type="text"
            value={this.formatCurrency(value, this.maxFraction)}
            readOnly={readOnly}
            disabled={disabled}
            ref="field"
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {
            rightAddon && <span className={unitClasses}>{rightAddon}</span>
          }
        </div>
        {
          displayError && error && <FieldAlert id={alertId} type="error" content={error} />
        }
      </div>
    );
  }

  handleChange() {
    const field = this.refs.field;
    const unformattedValue = this.unformatCurrency(field.value, this.maxFraction);
    const nonDecimalValue = unformattedValue.toString().split('.');
    const isNegativeValue = unformattedValue.toString().indexOf('-') !== -1;
    const isMoreThanMaxInteger =
      nonDecimalValue.length > 0 && Math.abs(nonDecimalValue[0]).toString().length > this.maxInteger;

    if (!(isNegativeValue && !this.negative) && !isMoreThanMaxInteger) {
      this.previousInverseCursor = field.value.length - this.getCaretPosition(field);
      this.rawValue = unformattedValue;
      this.onChange();
    }
  }

  handleBlur() {
    const value = this.refs.field.value;
    if (value) {
      const valueArray = value.split('.');
      if (!(valueArray.length === 2 && valueArray[1].length === 0)) {
        const newValue = parseFloat(this.unformatCurrency(value, this.maxFraction))
        .toFixed(this.maxFraction);

        this.refs.field.value = this.formatCurrency(newValue, this.maxFraction);
        this.rawValue = this.unformatCurrency(this.refs.field.value, this.maxFraction);

        this.onChange();
      }
    }
    this.previousInverseCursor = null;
    this.onBlur();
  }

  formatCurrency(value, maxFraction) {
    const nonNumericPermittedPattern = new RegExp(`(-0\\.0{0,${maxFraction}}|-0|-|\\.)`);
    if (typeof value === 'string' && value.replace(nonNumericPermittedPattern, '') === '') {
      return value;
    } else if (value === null || typeof value === 'undefined') {
      return '';
    }
    const formattedValue = numeral(value).format(`0,0[.][${new Array(maxFraction + 1).join('0')}]`);
    return this.formatDot(value, formattedValue, maxFraction);
  }

  unformatCurrency(value, maxFraction) {
    const negativeFloatPattern = new RegExp(`(-0\\.0{0,${maxFraction}}|-0|-)`);
    const nonNumericDotPattern = new RegExp('^[^\\d\\.]+$');
    if (typeof value === 'string' && value.replace(negativeFloatPattern, '') === '') {
      return value;
    } else if (value === null || typeof value === 'undefined' ||
      (typeof value === 'string' && value.replace(nonNumericDotPattern, '') === '')) {
      return '';
    }
    const unformattedValue = numeral().unformat(value);
    const formattedValue =
      isNaN(unformattedValue) ? '' : numeral(unformattedValue).format(`0[.][${new Array(maxFraction + 2).join('0')}]`);
    return this.formatDot(value, formattedValue, maxFraction);
  }

  getCaretPosition(input) {
    if (!input) return undefined; // No (input) element found

    if ('selectionStart' in input) {
      // Standard-compliant browsers
      return input.selectionStart;
    } else if (document.selection) {
      // IE
      input.focus();
      const sel = document.selection.createRange();
      const selLen = document.selection.createRange().text.length;
      sel.moveStart('character', -input.value.length);
      return sel.text.length - selLen;
    }
  }

  setCaretPosition(elem, caretPos) {
    if (elem) {
      if (elem.createTextRange) {
        const range = elem.createTextRange();
        range.move('character', caretPos);
        range.select();
      } else if (elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      } else {
        elem.focus();
      }
    }
  }

  formatDot(value, formattedValue, maxFraction) {
    const formattedValueArray = formattedValue.split('.');
    const valueArray = value.toString().split('.');
    if (valueArray.length === 2) {
      if (formattedValueArray.length === 2) {
        // When formatted value includes (incomplete) decimal, and value includes decimal
        const difference = valueArray[1].slice(0, maxFraction).substring(formattedValueArray[1].length);

        return `${formattedValueArray[0]}.${formattedValueArray[1].slice(0, maxFraction) + (isNaN(difference)
          ? '' : difference)}`;
      }
      // When formatted value doesn't include decimal, and value includes decimal
      return `${formattedValue}.${(isNaN(valueArray[1]) ? '' : valueArray[1].slice(0, maxFraction))}`;
    }
    // When value does not include decimal
    return formattedValue;
  }
}

CurrencyField.defaultProps = { displayError: true };

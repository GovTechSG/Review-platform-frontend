/* eslint complexity: [2,7] */
/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class NumberField extends React.Component {
  static defaultProps = {
    maxLength: 38,
    disabled: false
  };

  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
    this.formatNumber = this.formatNumber.bind(this);
  }

  render() {
    const value = this.props.data.deref();
    const inputValue = value === null ? '' : value;
    const error = this.props.error.deref();
    const readOnly = this.props.readOnly;
    const suffix = this.props.suffix;
    const prefix = this.props.prefix;
    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;
    const classes = classNames(
      'form-control bgp-textfield',
      { 'bgp-has-left-addon': prefix },
      { 'bgp-has-right-addon': suffix },
      { 'has-error': error }
    );
    const containerClass = classNames({ 'input-group': (prefix || suffix) });
    const maxLength = this.props.maxLength;

    return (
      <div>
        <div className={containerClass}>
          {prefix && <span className="input-group-addon bgp-input-group-addon">{prefix}</span>}

            <input type="text"
              id={id}
              className={classes}
              ref="field"
              value={inputValue}
              placeholder={this.props.placeholder}
              maxLength={maxLength}
              readOnly={readOnly}
              onBlur={this.onBlur}
              disabled={this.props.disabled}
              onChange={this.formatNumber}
              onInput={this.formatNumber}
            />

          {suffix && <span className="input-group-addon bgp-input-group-addon">{suffix}</span>}
        </div>

        {error && <FieldAlert id={alertId} type="error" content={error} />}
      </div>
    );
  }

  formatNumber() {
    if (this.refs && this.refs.field) {
      const value = this.refs.field.value;
      const isNegativeValue = value && value.indexOf('-') !== -1;
      const isInteger = value && value.indexOf('.') === -1;
      if (value === '' || !isNegativeValue && !isNaN(value) && isInteger) {
        this.onChange();
      }
    }
  }
}

/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
    this.getAllowClearProperty = this.getAllowClearProperty.bind(this);
    this.state = { isSelectionChanged: false };
  }

  componentDidMount() {
    this.select2(this.props);
  }

  componentDidUpdate() {
    $(this.refs.field).select2('destroy');
    this.select2(this.props);

    if (this.props.multiple && this.state.isSelectionChanged) {
      $(this.refs.field).select2('focus');
    }
  }

  getAllowClearProperty() {
    return (typeof this.props.allowClear !== 'undefined') ? this.props.allowClear : true;
  }

  select2(props) {
    let placeholder = props.placeholder;
    const field = $(this.refs.field);
    if (props.multiple) {
      placeholder = placeholder || (props.required ? 'Select one or more' : 'Select all that applies');
    } else {
      placeholder = placeholder || 'Select one';
    }

    field
      .select2({
        placeholder,
        allowClear: this.getAllowClearProperty(),
        minimumResultsForSearch: props.hideSearch ? 'Infinity' : null,
        customTextId: `${this.elementId()}_s2search`,
        width: '100%'
      })
      .unbind('change')
      .unbind('select2:close')
      .on('change', () => {
        this.onChange({ val: field.val() });
        this.setState({ isSelectionChanged: true });
      })
      .on('select2:close', () => {
        if (this.onBlur) {
          this.onBlur();
        }
      });
  }

  render() {
    const error = this.props.error.deref();
    const classes = classNames('form-control bgp-dropdown', { 'has-error': error });
    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;
    const multiple = this.props.multiple || false;

    // when refreshing the page, the value returned is an immutable list, so need to convert to array first
    let value = this.props.data.deref();
    if (value && value.toJS) {
      value = value.toJS();
    }

    return (
      <div className="bgp-dropdown-wrapper">
        <select id={id}
          className={classes}
          value={value}
          ref="field"
          onBlur={this.onBlur}
                // this onChange is only triggered when selection is made with the <select> element
                // (e.g. when selecting with selenium).
                // In normal usage the select2's onChange would be called instead.
                // this.refs.field.value only returns a single value, hence the filter and map
          onChange={() => this.onChange({ val: multiple ? _.filter(this.refs.field.options, o => o.selected)
                                                      .map(o => o.value) : this.refs.field.value })}
          multiple={multiple}
        >
          {multiple || <option value=""></option>}
          {this.getOptionNodes()}
        </select>

        <div>
          {
            error ?
              <FieldAlert id={alertId} type="error" content={error} />
              : ''
          }
        </div>
      </div>
    );
  }

  getOptionNodes() {
    let optionNodes;

    if (this.props.options) {
      if ('optgroup' in this.props.options) {
        optionNodes = this.props.options.optgroup.map((optgroup, index) => {
          return (
            <optgroup label={optgroup.label} key={`optgroup-${index}`}>
              {this.getOptions(optgroup.options)}
            </optgroup>
          );
        });
      } else {
        optionNodes = this.getOptions(this.props.options);
      }
    }

    return optionNodes;
  }

  getOptions(options) {
    return options.map((option, index) => {
      return (
        <option key={`option-${index}`} value={option.value || option}>
          {option.display || option}
        </option>
      );
    });
  }
}

import React from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import CheckBoxField from '../../_base/fields/CheckBoxField';
import FieldAlert from '../../_utility/FieldAlert';
import Label from '../../_base/typography/Label';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class CheckBoxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange.bind(null, this);
    this.getCheckedValues = this.getCheckedValues.bind(this);
  }

  render() {
    const data = this.props.data.deref();
    const error = this.props.error.deref();
    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;
    const label = this.props.label;
    this.name = this.props.name || this.elementId();
    const required = this.props.required;
    const options = this.props.options;
    const classes = classNames('controls', 'bgp-radio-text-format', { 'has-error': error });

    return (
      <div className="form-horizontal bgp-check-group">
        <div className="form-group" >
          <div className="col-xs-12">
            <Label content={label} required={required} />
          </div>

          <div className="col-xs-12 bgp-radio-inline-box">
            <div className={classes}>
              {this.getOptions(data, options)}
              {error ? <FieldAlert id={alertId} type="error" content={error} /> : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }

  getOptions(data, options) {
    return options.map((option, index) => {
      const checked = data && data.indexOf(option.value) >= 0;
      const classes = classNames('radio-inline', { 'bgp-radio-inline-gap': index });
      return (
        <label className={classes} key={this.elementId(index)}>
          <CheckBoxField
            checked={checked}
            name={this.name}
            id={`checkbox-${this.elementId()}-${index}`}
            label={option.label}
            value={option.value}
            onChange={this.onChange}
          />
        </label>
      );
    });
  }

  getCheckboxes() {
    return ReactDOM.findDOMNode(this).querySelectorAll(`input[type="checkbox"][name="${this.name}"]`);
  }

  getCheckedValues() {
    const checkboxes = this.getCheckboxes();
    const values = Object.keys(checkboxes).reduce((result, key) => {
      return checkboxes[key].checked ? result.concat(checkboxes[key].value) : result;
    }, []);
    return values.length ? values : [''];
  }
}

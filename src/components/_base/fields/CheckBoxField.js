/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class CheckBoxField extends React.Component {
  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
  }

  render() {
    const checked = this.props.data ?
      (this.props.data.deref() && this.props.data.deref() !== 'false') : this.props.checked;
    const error = this.props.error && this.props.error.deref();
    const label = this.props.required ?
      `${this.props.label}<span class="mandatory-indicator">&nbsp;*</span>` : this.props.label;
    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;
    const name = this.props.name;
    const value = this.props.value;

    return (
      <label>
        <div className="bgp-checkbox">
          <input type="checkbox"
            name={name}
            id={id}
            checked={checked}
            ref="field"
            value={value}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
          </div>
        <span className="bgp-checkboxlabel" dangerouslySetInnerHTML={{ __html: label }}></span>
        { error && <FieldAlert id={alertId} type="error" content={error} /> }
      </label>
    );
  }
}

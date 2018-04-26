/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import DateField from '../../_base/fields/DateField';
import Label from './../typography/Label';
import { bindElementId } from '../../../helpers/element-id-decorator';
import immutablePure from '../../../helpers/immutable-pure-decorator';

@immutablePure
@bindElementId
export default class DateBox extends React.Component {
  render() {
    const label = this.props.label;
    const required = this.props.required;
    const showLabel = !!this.props.label;
    const fieldId = this.elementId();
    const labelId = this.elementId('label');

    return (
      showLabel ?
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-6">
            <Label content={label} htmlFor={fieldId} required={required} id={labelId} />
          </div>
          <div className="col-sm-6">
            <DateField {...this.props} ref="date_field" id={fieldId} />
          </div>
        </div>
      </div>
      : <div className="form-horizontal">
          <div className="cols-sm-12">
            <DateField {...this.props} ref="date_field" onChange={this.handleChange} id={fieldId} />
          </div>
        </div>
    );
  }
}

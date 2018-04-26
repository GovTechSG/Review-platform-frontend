/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import SelectField from '../../_base/fields/SelectField';
import Label from '../typography/Label';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class SelectBox extends React.Component {
  render() {
    const label = this.props.label;
    const required = this.props.required;
    const fieldId = this.props.id || this.elementId();
    const labelId = this.elementId('label');

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-6">
            <Label id={labelId} content={label} htmlFor={fieldId} required={required} />
          </div>
          <div className="col-sm-6">
              <SelectField {...this.props} id={fieldId} />
          </div>
        </div>
      </div>
    );
  }
}

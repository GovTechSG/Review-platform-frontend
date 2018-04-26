/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import PercentageField from '../../_base/fields/PercentageField';
import Label from '../../_base/typography/Label';
import { bindElementId } from '../../../helpers/element-id-decorator';
import immutablePure from '../../../helpers/immutable-pure-decorator';

@immutablePure
@bindElementId
export default class PercentageBox extends React.Component {
  render() {
    const label = this.props.label;
    const required = this.props.required;
    const fieldId = this.elementId();
    const labelId = this.elementId('label');

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-6">
            <Label
              id={labelId}
              content={label}
              htmlFor={fieldId}
              required={required}
            />
          </div>

          <div className="col-sm-6">
            <PercentageField {...this.props} id={fieldId} />
          </div>
        </div>
      </div>
    );
  }
}

/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import NumberField from '../../_base/fields/NumberField';
import Label from '../../_base/typography/Label';
import { bindElementId } from '../../../helpers/element-id-decorator';
import immutablePure from '../../../helpers/immutable-pure-decorator';

@immutablePure
@bindElementId
export default class NumberBox extends React.Component {
  render() {
    const label = this.props.label;
    const required = this.props.required;
    const fieldId = this.elementId();
    const labelId = this.elementId('label');

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-6">
            <Label content={label} tooltipTitle={this.props.tooltipTitle}
              htmlFor={fieldId} required={required} id={labelId}
            />
          </div>

          <div className="col-sm-6">
            <NumberField {...this.props} id={fieldId} />
          </div>
        </div>
      </div>
    );
  }
}

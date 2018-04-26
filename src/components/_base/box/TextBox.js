/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import TextField from '../../_base/fields/TextField';
import Label from '../../_base/typography/Label';
import { bindElementId } from '../../../helpers/element-id-decorator';
import immutablePure from '../../../helpers/immutable-pure-decorator';

@immutablePure
@bindElementId
export default class TextBox extends React.Component {
  render() {
    const label = this.props.label;
    const required = this.props.required;
    const className = this.props.className || 'col-sm-6';
    const fieldId = this.elementId();
    const labelId = this.elementId('label');

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-6">
            <Label content={label} htmlFor={fieldId} required={required} id={labelId} />
          </div>
          <div className={className}>
            <TextField {...this.props} id={fieldId} ref="field" />
          </div>
        </div>
      </div>
    );
  }
}

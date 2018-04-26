/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import TextAreaField from './../fields/TextAreaField';
import Label from './../typography/Label';
import { bindElementId } from '../../../helpers/element-id-decorator';
import immutablePure from '../../../helpers/immutable-pure-decorator';

@immutablePure
@bindElementId
export default class TextAreaBox extends React.Component {
  render() {
    const label = this.props.label;
    const required = this.props.required;
    const fieldId = this.elementId();
    const labelId = this.elementId('label');

    return (
      <div className="form-group">
        <Label content={label} id={labelId} htmlFor={fieldId} required={required} />
        <TextAreaField
          data={this.props.data}
          error={this.props.error}
          placeholder={this.props.placeholder}
          id={fieldId}
          maxLength={this.props.maxLength}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

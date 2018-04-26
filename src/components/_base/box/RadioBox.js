/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames';
import Label from './../typography/Label';
import RadioField from './../fields/RadioField';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class RadioBox extends React.Component {
  render() {
    const label = this.props.label;
    const required = this.props.required;
    const id = this.props.id || this.elementId() || 'radiobox';
    const error = this.props.error.deref();
    const classes = classNames('controls', 'bgp-radio-text-format', { 'has-error': error });
    const radioStyle = this.props.inlineRadio ? 'col-xs-6' : 'col-xs-12';
    const noTopMargin = this.props.noTopMargin;
    const radioBoxClasses = classNames('form-horizontal', { 'bgp-radio-group': !noTopMargin });

    const fields = this.props.options.map((option, index) => {
      return (<RadioField
        key={`${id}-${index}`}
        {...this.props}
        affix={option.value}
        label={option.label}
        value={option.value}
      />);
    });

    return (
      <div className={radioBoxClasses}>
        <div className="form-group">
          <div className={radioStyle}>
            <Label content={label} required={required} />
          </div>

          <div className={classes}>
            {fields}
            {error ? <FieldAlert id={`${id}-alert`} type="error" content={error} /> : '' }
          </div>
        </div>
      </div>
    );
  }
}

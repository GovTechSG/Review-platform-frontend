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
export default class ListRadioBox extends React.Component {

  render() {
    const label = this.props.label;
    const required = this.props.required;
    const id = this.props.id || this.elementId() || 'listradiobox';
    const error = this.props.error.deref();
    const classes = classNames('controls', 'bgp-radio-text-format', { 'has-error': error });
    const radioStyle = this.props.inlineRadio ? 'col-xs-6' : 'col-xs-12';

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
      <li className="form-horizontal bgp-radio-group">
        <div className="form-group form-list-group">
          <div className={radioStyle}>
            <span>
              <Label classes="list-alignment" content={label} required={required} />
            </span>
          </div>

          <div className={classes}>
            {fields}
            {error ? <FieldAlert id={`${id}-alert`} type="error" content={error} /> : '' }
          </div>
        </div>
      </li>
    );
  }
}

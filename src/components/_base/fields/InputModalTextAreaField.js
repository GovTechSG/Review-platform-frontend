/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import I18n from 'i18n';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';
import Label from './../typography/Label';
import FieldAlert from '../../_utility/FieldAlert';

@immutablePure
@bindElementId
export default class InputModalTextAreaField extends React.Component {
  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
  }

  static defaultProps = {
    maxLength: 500
  };

  render() {
    const value = this.props.data.deref();
    const maxLength = this.props.maxLength;
    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;
    const classes = 'form-control bgp-textarea';
    const length = value ? (maxLength - value.length) : maxLength;
    const hasError = length < 0;
    const counter = I18n.t('basic_unit.character_counter', { count: length });
    const errorMsg = I18n.t('activerecord.errors.messages.too_long', { count: maxLength });
    const renderCharacterCount = (length <= 50)
                                  ? <p className="field-error-message">{counter}</p>
                                  : <p className="textarea-counter">{counter}</p>;

    return (
        <div className="bgp-textareabox">
          {this.props.label ?
                <div>
                  <Label content={this.props.label}
                    htmlFor={id}
                  />
                </div>
                : ''
          }
        <textarea className={classes}
          id={id}
          ref="field"
          onBlur={this.onBlur}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          rows="5"
          value={value}
        />
        { hasError
        ? <FieldAlert id={alertId} type="error" content={errorMsg} />
        : renderCharacterCount }

        </div>
    );
  }
}

/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames';
import Textarea from 'react-textarea-autosize-fork-slorber';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';
import componentMounted from '../../../helpers/component-mounted-decorator';

@immutablePure
@bindElementId
@componentMounted
export default class TextAreaField extends React.Component {
  static defaultProps = {
    maxLength: 500,
    disabled: false
  };

  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
  }

  render() {
    const value = this.props.data.deref();
    const error = this.props.error && this.props.error.deref();
    const maxLength = this.props.maxLength;
    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;
    const classes = classNames('form-control bgp-textarea', { 'has-error': error });

    const length = value ? (maxLength - value.length) : maxLength;
    const counter = `${length} characters left`;
    const renderCharacterCount = (length <= 50)
      ? <p className="help-inline field-error-message">{counter}</p>
      : <p className="textarea-counter">{counter}</p>;
    return (
      <div className="bgp-textareabox">
        <Textarea
          className={classes}
          id={id}
          ref="field"
          onBlur={this.onBlur}
          onChange={this.onChange}
          onInput={this.onChange}
          placeholder={this.props.placeholder}
          minRows={3}
          maxRows={10}
          value={value === null ? '' : value}
          disabled={this.props.disabled}
        />
        {error
          ? <FieldAlert id={alertId} type="error" content={error} />
          : renderCharacterCount}
      </div>
    );
  }
}

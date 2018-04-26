/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class TextField extends React.Component {
  static defaultProps = {
    disabled: false
  };

  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
    this.onDestroy = props.onDestroy ? props.onDestroy.bind(this) : null;
  }

  componentWillUnmount() {
    this.onDestroy && this.onDestroy(this);
  }

  render() {
    const value = this.props.value || this.props.data.deref();
    const error = this.props.error.deref();
    const readOnly = this.props.readOnly;
    const prefix = this.props.prefix;
    const classes = classNames(
      'form-control bgp-textfield',
      { 'bgp-has-left-addon': prefix },
      { 'has-error': error }
    );
    const containerClass = classNames({ 'input-group': prefix });
    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;
    const maxLength = this.props.maxLength || 250;

    return (
      <div>
        <div className={containerClass}>
          {prefix && <span className="input-group-addon bgp-input-group-addon">{prefix}</span>}
          <input
            type="text"
            id={id}
            className={classes}
            ref="field"
            value={value === null ? '' : value}
            placeholder={this.props.placeholder}
            maxLength={maxLength}
            readOnly={readOnly}
            onBlur={this.onBlur}
            onChange={this.onChange}
            disabled={this.props.disabled}
            onInput={this.onChange}
            style={this.props.style}
          />
        </div>
        {(error && !this.props.disabled) ? <FieldAlert id={alertId} type="error" content={error} /> : ''}
      </div>
    );
  }
}

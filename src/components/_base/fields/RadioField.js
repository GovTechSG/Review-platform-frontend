/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class RadioField extends React.Component {
  static defaultProps = {
    disabled: false
  };

  constructor(props) {
    super(props);
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
  }

  render() {
    const value = this.props.value;
    const label = this.props.label;
    const dataValue = this.props.data.deref();
    let radioChecked = false;

    if (value === dataValue) {
      radioChecked = true;
    }

    const isSolutionItem = this.props.solutionListed;
    const isProposeYourOwn = this.props.proposeYourOwn;
    const classes = classNames({ 'bgp-solution-item': isSolutionItem },
                               { 'propose-your-own': isProposeYourOwn },
                               { 'bgp-radio': !isSolutionItem },
                               { 'disable-overlay': this.props.disabled });

    const buttonClasses = classNames({ 'bgp-self-propose': isProposeYourOwn },
                                     { radiobutton: !isProposeYourOwn });

    const labelClasses = classNames({ 'bgp-self-propose-label': isProposeYourOwn },
                                     { 'bgp-label': !isProposeYourOwn });

    return (
        <label className={classes}>
          <input type="radio"
            value={value}
            checked={radioChecked}
            name={this.elementId()}
            id={this.elementId(this.props.affix)}
            ref="field"
            onClick={this.onChange}
            disabled={this.props.disabled}
          />
          <span className={buttonClasses}></span>
          <span className={labelClasses}>{label}</span>
        </label>
    );
  }
}

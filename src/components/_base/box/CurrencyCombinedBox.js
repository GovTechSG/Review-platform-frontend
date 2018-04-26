/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Label from '../typography/Label';
import CurrencyCombinedField from '../fields/CurrencyCombined/CurrencyCombinedField';
import { bindElementId } from '../../../helpers/element-id-decorator';
import immutablePure from '../../../helpers/immutable-pure-decorator';

@immutablePure
@bindElementId
export default class CurrencyCombinedBox extends React.Component {
  render() {
    const label = this.props.label;
    const required = this.props.required;

    return (
      <div className="form-horizontal">
        <div className="form-group">

          <div className="col-sm-6">
            <Label content={label} required={required} htmlFor={this.elementId()} />
          </div>

          <div className="col-sm-6">
            <CurrencyCombinedField
              additionalClasses=" bgp-has-left-addon bgp-currency-input"
              {...this.props}
            />
          </div>
        </div>
      </div>
    );
  }
}

/* eslint react/prefer-stateless-function: 0 */

import React, { Component } from 'react';
import CurrencyCodeField from './CurrencyCodeField';
import FieldAlert from '../../../_utility/FieldAlert';
import CurrencyField from '../CurrencyField';
import ReadOnlyCurrencyCodeField from '../../../_base/fields/CurrencyCombined/ReadOnlyCurrencyCodeField';
import immutablePure from '../../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class CurrencyCombinedField extends Component {
  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
  }

  static propTypes = {
    enableChangeCurrency: React.PropTypes.bool
  };

  render() {
    const error = this.props.error.deref();
    const isChangeCurrencyEnabled = this.props.enableChangeCurrency;
    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;

    return (
      <div>
        <div className="currency-input-group input-group">
          {
            isChangeCurrencyEnabled ?
              <CurrencyCodeField
                data={this.props.currencyCode}
                error={this.props.currencyError}
                onChangeCurrencyCombinedField={this.props.onChangeCurrencyCombinedField}
              />
            :
              <ReadOnlyCurrencyCodeField currencyCode="SGD" />
          }
          <CurrencyField {...this.props} displayError={false} />
        </div>

        <div>
          {
            error ?
              <FieldAlert id={alertId} type="error" content={error} />
              : ''
          }
        </div>
      </div>
    );
  }
}

CurrencyCombinedField.defaultProps = { enableChangeCurrency: true };

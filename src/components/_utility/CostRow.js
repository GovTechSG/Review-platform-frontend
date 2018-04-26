import React from 'react';
import I18n from 'i18n';

import TextAreaBox from '../_base/box/TextAreaBox';
import CurrencyCombinedBox from '../_base/box/CurrencyCombinedBox';
import CurrencyBox from '../_base/box/CurrencyBox';
import ReadOnlyCurrencyField from '../_base/typography/ReadOnlyCurrencyField';
import { calculateEstimatedCost } from '../../helpers/calculations';

const CostRow = (props) => {
  const data = props.data;
  const error = props.errors;
  const grantType = props.grantType;
  const descriptionPlaceholder = props.placeholder;
  const exchangeRateLabel = I18n.t(`${grantType}.project_cost.exchange_rate`);
  const estimatedCostLabel = I18n.t(`${grantType}.project_cost.estimated_cost`);
  const amountInBillingCurrencyLabel = I18n.t(`${grantType}.project_cost.amount_in_billing_currency`);
  const descriptionLabel = I18n.t(`${grantType}.project_cost.description`);

  return (
    <div className="panel-body">
      <TextAreaBox data={data.cursor('description')}
        error={error.cursor('description')}
        label={descriptionLabel}
        placeholder={descriptionPlaceholder}
        maxLength={500}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />

      <CurrencyCombinedBox data={data.cursor('amount_in_billing_currency')}
        error={error.cursor('amount_in_billing_currency')}
        currencyCode={data.cursor('currency_code')}
        currencyError={error.cursor('currency_code')}
        label={amountInBillingCurrencyLabel}
        onChangeCurrencyCombinedField={props.onChangeCurrencyCombinedField}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
                           {
                              data.cursor('currency_code').deref() === 'SGD' ?
                              ''
                              :
                              <CurrencyBox data={data.cursor('exchange_rate')}
                                error={error.cursor('exchange_rate')}
                                label={exchangeRateLabel}
                                defaultValue="1.000000000"
                                maxFraction="9"
                                maxInteger="3"
                                onChange={props.onChange}
                                onBlur={props.onBlur}
                              />
                            }
    <ReadOnlyCurrencyField value={calculateEstimatedCost(data, 'amount_in_billing_currency')}
      label={estimatedCostLabel}
      prefix="SGD"
    />
    </div>
  );
};

export default CostRow;

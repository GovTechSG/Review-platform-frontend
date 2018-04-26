import React from 'react';
import I18n from 'i18n';

import { bindElementId } from '../../helpers/element-id-decorator';
import pureImmutableRender from '../../helpers/immutable-pure-decorator';
import FullWidthLabel from '../_base/typography/FullWidthLabel';
import HalfWidthLabel from '../_base/typography/HalfWidthLabel';
import ReadOnlyCurrencyField from '../_base/typography/ReadOnlyCurrencyField';

@bindElementId
@pureImmutableRender
export default class ReadOnlyCostRowSection extends React.Component {
  render() {
    const data = this.props.data;
    const grantType = this.props.grantType;
    const exchangeRateLabel = I18n.t(`${grantType}.project_cost.exchange_rate`);
    const estimatedCostLabel = I18n.t(`${grantType}.project_cost.estimated_cost`);
    const amountInBillingCurrencyLabel = I18n.t(`${grantType}.project_cost.amount_in_billing_currency`);
    const descriptionLabel = I18n.t(`${grantType}.project_cost.description`);

    return (
      <div className="panel-body">
        <FullWidthLabel
          value={data.cursor('description').deref()}
          label={descriptionLabel}
          id={this.elementId('description')}
        />
        <ReadOnlyCurrencyField
          value={data.cursor('amount_in_billing_currency').deref()}
          label={amountInBillingCurrencyLabel}
          prefix={data.cursor('currency_code').deref()}
          id={this.elementId('amount_in_billing_currency')}
        />

        {
          data.cursor('currency_code').deref() !== 'SGD' ?
          <HalfWidthLabel
            value={data.cursor('exchange_rate').deref()}
            label={exchangeRateLabel}
            id={this.elementId('exchange_rate')}
          />
          : ''
        }

        <ReadOnlyCurrencyField
          value={data.cursor('estimated_cost').deref()}
          label={estimatedCostLabel}
          prefix="SGD"
          id={this.elementId('estimated_cost')}
        />
      </div>
    );
  }
}

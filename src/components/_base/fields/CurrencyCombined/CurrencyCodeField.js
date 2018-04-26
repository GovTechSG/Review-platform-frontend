/* eslint react/prefer-stateless-function: 0 */

import React, { Component } from 'react';
import CURRENCIES from '../../../../helpers/currencies';
import immutablePure from '../../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class CurrencyCodeField extends Component {
  constructor(props) {
    super(props);
    this.activityOptions;
  }

  componentDidMount() {
    this.select2(this.props);
  }

  componentDidUpdate() {
    $(this.refs.field).select2('destroy');
    this.select2(this.props);
  }

  select2(props) {
    const field = $(this.refs.field);

    const sel2 = field.select2({
      minimumResultsForSearch: props.hideSearch ? 'Infinity' : null,
      customTextId: `${this.elementId()}_s2search`,
      dropdownCssClass: 'currency-border',
      dropdownAutoWidth: 'true',
      width: '70px',
      templateSelection(obj) {
        return obj.id;
      }
    });
    sel2.val(props.data.deref()).trigger('change.select2');
    sel2.unbind('change')
    .on('change', () => {
      this.props.onChangeCurrencyCombinedField(this, { val: field.val() });
    });
  }

  render() {
    const id = this.elementId();
    const value = this.props.data.deref() || 'SGD';

    const currencyOptions = CURRENCIES.display.map((currency) => {
      const newCurrency = {};
      newCurrency.label = currency.text;
      newCurrency.options = currency.children.map((child) => {
        return { display: child.text, value: child.id };
      });

      return newCurrency;
    });

    this.activityOptions = {
      optgroup: currencyOptions
    };

    return (
      <select id={id}
        className="btn-group bgp-currency-dropdown"
        defaultValue={value}
        ref="field"
      >
        {this.getOptionNodes()}
      </select>
    );
  }

  getOptionNodes() {
    let optionNodes;

    if (this.activityOptions) {
      if ('optgroup' in this.activityOptions) {
        optionNodes = this.activityOptions.optgroup.map((optgroup, index) => {
          return (
            <optgroup label={optgroup.label} key={`optgroup-${index}`}>
              {this.getOptions(optgroup.options)}
            </optgroup>
          );
        });
      } else {
        optionNodes = this.getOptions(this.activityOptions);
      }
    }

    return optionNodes;
  }

  getOptions(options) {
    return options.map((option, index) => {
      return (
        <option key={`option-${index}`} value={option.value || option}>
          {option.display || option}
        </option>
      );
    });
  }

}

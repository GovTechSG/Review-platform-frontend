import React from 'react';
import { formatCurrency, roundDown } from '../../../helpers/calculations';

export default class ReadOnlyTotalCurrencyBox extends React.Component {

  formatCurrency(total) {
    const currency = formatCurrency(roundDown(total));
    return currency ? `SGD ${currency}` : 'SGD 0.00';
  }

  render() {
    const classes = `form-horizontal ${this.props.className}`;

    return (
      <div id={this.props.id} className={classes}>
        <div className="col-xs-6">
          {this.props.label}
        </div>
        <div className="col-xs-6">
          {this.formatCurrency(this.props.value)}
        </div>
      </div>
    );
  }
}

ReadOnlyTotalCurrencyBox.defaultProps = { className: 'total-container' };

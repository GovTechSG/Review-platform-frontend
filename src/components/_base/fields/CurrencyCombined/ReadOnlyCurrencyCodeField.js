import React from 'react';
import pureImmutableRender from '../../../../helpers/immutable-pure-decorator';

@pureImmutableRender
export default class ReadOnlyCurrencyCodeField extends React.Component {
  render() {
    const currencyCode = this.props.currencyCode;

    return (
            <span className="bgp-input-group-addon">{currencyCode}</span>
    );
  }
}

import React from 'react';
import Label from './../typography/Label';
import Address from '../../../helpers/address';

export default class SummaryAddressLabel extends React.Component {

  render() {
    const address = Address.format(this.props.data);
    const id = this.props.id || '';

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-xs-12 col-sm-6">
            <Label content={this.props.label} />
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className="bgp-readonly" dangerouslySetInnerHTML={{ __html: address }} id={id} />
          </div>
        </div>
      </div>
    );
  }
}

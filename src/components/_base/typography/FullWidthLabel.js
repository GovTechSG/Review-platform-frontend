import React from 'react';
import Label from './../typography/Label';

export default class FullWidthLabel extends React.Component {
  formatValue() {
    if ((this.props.value !== undefined) && (this.props.value !== '')) {
      return this.props.value;
    }
    return null;
  }

  render() {
    const contentLabel = this.props.label;
    const contentValue = this.formatValue();
    const id = this.props.id ? this.props.id : '';

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-xs-12">
            <Label content={contentLabel} />
            <div className="bgp-readonly" id={id}>
              {contentValue !== null ? contentValue : <span className="unfilled">nil</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import Label from './Label';

export default class HalfWidthLabel extends React.Component {
  formatValue() {
    if ((this.props.value !== undefined) && (this.props.value !== '')) {
      if (this.props.formatBoolean) {
        return this.props.value === 'true' ? 'Yes' : 'No';
      }

      return this.props.value;
    }
    return null;
  }
  displayMessage(contentValue, contentPrefix, contentSuffix, id) {
    if (contentValue === null) {
      return <div className="bgp-readonly unfilled" id={id}>nil</div>;
    }
    return <div className="bgp-readonly" id={id}>{`${contentPrefix}${contentValue}${contentSuffix}`}</div>;
  }

  render() {
    const contentLabel = this.props.label;
    const contentPrefix = this.props.prefix ? `${this.props.prefix} ` : '';
    const contentSuffix = this.props.suffix ? ` ${this.props.suffix}` : '';
    const contentValue = this.formatValue();
    const id = this.props.id ? this.props.id : '';
    const labelId = `${id}_label`;
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-6">
            <Label id={labelId} tooltipTitle={this.props.tooltipTitle} content={contentLabel} />
          </div>
          <div className="col-sm-6">
            {this.displayMessage(contentValue, contentPrefix, contentSuffix, id)}
          </div>
        </div>
      </div>
    );
  }
}

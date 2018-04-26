import React from 'react';
import Label from './../typography/Label';

export default class ReadOnlyLabel extends React.Component {
  formatDisplayValue(contentValue) {
    if (contentValue !== null && contentValue !== undefined && contentValue !== '') {
      if (contentValue.toString() === 'true') {
        return 'Yes';
      }
      return 'No';
    }
    return <span className="unfilled">nil</span>;
  }

  render() {
    const contentValue = this.props.value.deref();
    const contentLabel = this.props.label;
    const id = this.props.id || '';
    const displayValue = this.formatDisplayValue(contentValue);
    const labelDesc = this.props.label_desc;

    const halfWidth = this.props.halfWidth;

    return (
      <div className="form-horizontal bgp-radio-group">
        <div className="form-group">
          <div className="row">
            <div className={halfWidth ? 'col-xs-6' : 'col-xs-10'}>
              <Label content={contentLabel} />
              {labelDesc && <div className="label-desc pad-all-md">{labelDesc}</div>}
            </div>
            <div className={halfWidth ? 'col-xs-6' : 'col-xs-2 col-sm-1 col-sm-offset-1'}>
              <div className="bgp-radio-readonly" id={id}>
                {displayValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import Label from './../typography/Label';

export default class SummaryDeclarationLabel extends React.Component {
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
    const list = this.props.list || false;

    return (
      <div>
        <div className="bgp-declaration-question">
          {
            list ?
              <ol className="bgp-summary-label" dangerouslySetInnerHTML={{ __html: contentLabel }}></ol>
              : <Label classes="bgp-no-padding-label" content={contentLabel} />
          }
        </div>
        <div className="bgp-declaration-answer">
          <div className="bgp-radio-readonly" id={id}>
            {displayValue}
          </div>
        </div>
      </div>
    );
  }
}

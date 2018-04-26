import React from 'react';

export default class SummaryLabel extends React.Component {

  render() {
    const contentLabel = this.props.label;
    const contentClass = this.props.className || '';
    const id = this.props.id || '';

    return (
      <div>
      {contentLabel !== null ?
        <div className={contentClass} id={id} dangerouslySetInnerHTML={{ __html: contentLabel }}></div>
      :
        <div className={contentClass} id={id}>
          <span className="unfilled">nil</span>
        </div>
      }
      </div>
    );
  }
}

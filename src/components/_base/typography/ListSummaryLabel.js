import React from 'react';

export default class ListSummaryLabel extends React.Component {

  render() {
    const contentLabel = this.props.label;
    const contentClass = this.props.className || '';
    const id = this.props.id || 'list-question';

    return (
      <div>
        <ol className={contentClass} id={id} dangerouslySetInnerHTML={{ __html: contentLabel }}></ol>
      </div>
    );
  }
}

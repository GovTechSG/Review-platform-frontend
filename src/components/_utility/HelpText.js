import React from 'react';

export default class HelpText extends React.Component {
  render() {
    return (
      <div className="info-text-box margin-btm-md" dangerouslySetInnerHTML={{ __html: this.props.content }} />
    );
  }
}

import React from 'react';

export default class GrantTitle extends React.Component {
  render() {
    const showTitle = this.props.showTitle;
    const title = showTitle ? `Grant Application: ${this.props.title}` : this.props.title;

    return (
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
    );
  }
}

GrantTitle.defaultProps = { showTitle: false };

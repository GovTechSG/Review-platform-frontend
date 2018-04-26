import React from 'react';

export default class ClaimTitle extends React.Component {
  render() {
    return (
      <h1 dangerouslySetInnerHTML={{ __html: this.props.title }} />
    );
  }
}

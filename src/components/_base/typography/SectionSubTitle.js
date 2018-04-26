import React from 'react';

export default class SectionSubTitle extends React.Component {
  render() {
    return (
      <div>
        <h4 dangerouslySetInnerHTML={{ __html: this.props.title }} />
      </div>
    );
  }
}

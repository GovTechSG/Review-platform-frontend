import React from 'react';

export default class SubSectionSubTitle extends React.Component {
  render() {
    return (
        <div>
          <h5 dangerouslySetInnerHTML={{ __html: this.props.title }} />
        </div>
    );
  }
}

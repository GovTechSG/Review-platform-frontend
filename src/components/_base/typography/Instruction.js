import React from 'react';

export default class Instruction extends React.Component {
  render() {
    return (
      <small>
        {{ __html: this.props.title }}
      </small>
    );
  }
}

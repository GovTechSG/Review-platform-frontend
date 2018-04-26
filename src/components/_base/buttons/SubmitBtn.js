import React from 'react';

export default class SubmitBtn extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = props.handleClick
    ? props.handleClick.bind(null, props.section)
    : () => { return null; };
  }

  render() {
    return (
      <button
        className={'bgp-btn bgp-btn-submit bgp-btn-regular'}
        disabled={this.props.disabled}
        id="submit-btn"
        href="#"
        onClick={this.handleClick}
      >
        {this.props.children ? this.props.children : 'Submit'}
      </button>
    );
  }
}

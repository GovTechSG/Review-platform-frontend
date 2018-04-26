import React from 'react';

export default class AjaxBtn extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = () => {
      $.post(this.props.url, () => {});
    };
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
        Submit
      </button>
    );
  }
}

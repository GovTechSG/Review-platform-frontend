import React from 'react';

export default class SaveBtn extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = props.handleClick ? props.handleClick.bind(null, props.section) : () => { return null; };
  }

  getWindowWidth() {
    return $(window).width();
  }

  render() {
    return (
      <button
        className="bgp-btn bgp-btn-save"
        id="save-btn"
        href="#"
        onClick={this.handleClick}
      >Save
      </button>
    );
  }
}

import React from 'react';

export default class ReviewBtn extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = props.handleClick ? props.handleClick.bind(null, this) : null;
  }

  render() {
    return (
      <button className="bgp-btn bgp-btn-review" id="review-btn" onClick={this.handleClick}> Review </button>
    );
  }
}

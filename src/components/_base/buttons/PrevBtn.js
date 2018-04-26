import React from 'react';
import { Link } from 'react-router';

export default class PrevBtn extends React.Component {
  scrollTo() {
    $('html, body').animate({ scrollTop: 0 }, 500);
  }
  render() {
    return (
      <Link to={this.props.url}>
        <button className="bgp-btn bgp-btn-back" id="back-btn" onClick={this.scrollTo.bind()}>Previous</button>
      </Link>
    );
  }
}

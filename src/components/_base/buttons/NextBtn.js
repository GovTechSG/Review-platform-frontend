import React from 'react';
import { Link } from 'react-router';

export default class NextBtn extends React.Component {
  scrollTo() {
    $('html, body').animate({ scrollTop: 0 }, 500);
  }
  render() {
    return (
      <Link to={this.props.url}>
        {
          this.props.isNavigationDisabled ?
          <button className="bgp-btn bgp-btn-next" id="next-btn" onClick={this.scrollTo.bind()} disabled>Next</button>
          : <button className="bgp-btn bgp-btn-next" id="next-btn" onClick={this.scrollTo.bind()}>Next</button>
        }
      </Link>
    );
  }
}

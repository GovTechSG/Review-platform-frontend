import React from 'react';

export default class ProceedBtn extends React.Component {
  scrollTo() {
    $('html, body').animate({ scrollTop: 0 }, 500);
  }
  render() {
    const className = 'bgp-btn bgp-btn-proceed';
    return (
          this.props.isNavigationDisabled ?
          <button className={className} id="proceed-btn" onClick={this.props.onClick} disabled>Proceed</button>
          : <button className={className} id="proceed-btn" onClick={this.props.onClick}>Proceed</button>
    );
  }
}

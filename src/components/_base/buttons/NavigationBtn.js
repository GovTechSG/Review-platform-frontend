import React from 'react';

export default class NavigationBtn extends React.Component {
  render() {
    const navigation = this.props.navigation || 'cancel';
    const btnClass = `bgp-btn bgp-btn-${navigation}`;
    const btnId = `${navigation}-btn`;

    return (
      <button className={btnClass}
        id={btnId}
        href="#"
        onClick={this.props.handleToGrant}
      >
        {this.props.navigation_text}
      </button>
    );
  }
}

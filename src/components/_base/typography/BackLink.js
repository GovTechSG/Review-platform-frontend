/* eslint max-len: 0 */

import React from 'react';

export default class BackLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = props.handleClick ? props.handleClick.bind(null, this) : () => { return null; };
  }
  render() {
    return (
      <a className="back-title-container" onClick={this.handleClick}>

        <svg className="back-arrow" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 16 16">
          <g>
            <path data-color="color-2" d="M14,16c-0.3,0-0.6-0.1-0.8-0.3l-6-7c-0.3-0.4-0.3-0.9,0-1.3l6-7c0.4-0.4,1-0.5,1.4-0.1 c0.4,0.4,0.5,1,0.1,1.4L9.3,8l5.4,6.3c0.4,0.4,0.3,1-0.1,1.4C14.5,15.9,14.2,16,14,16z" />
            <path d="M8,16c-0.3,0-0.6-0.1-0.8-0.3l-6-7c-0.3-0.4-0.3-0.9,0-1.3l6-7c0.4-0.4,1-0.5,1.4-0.1c0.4,0.4,0.5,1,0.1,1.4 L3.3,8l5.4,6.3c0.4,0.4,0.3,1-0.1,1.4C8.5,15.9,8.2,16,8,16z" />
          </g>
        </svg>

        <span className="back-text">{this.props.linkText}</span>
      </a>
    );
  }
}

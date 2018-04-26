import React from 'react';

export default class Anchor extends React.Component {
  componentDidMount() {
    if (this.props.popover !== null) {
      $('[data-toggle="popover"]').popover({ trigger: 'hover' });
    }
  }

  render() {
    const href = this.props.href;
    const content = this.props.content;
    let className = this.props.className !== null ? this.props.className : '';
    const popover = this.props.popover;

    let data = {};
    if (popover !== null) {
      className += ' bgp-tooltip-link';

      data = {
        'data-original-title': '',
        'data-content': popover,
        'data-placement': 'top',
        'data-toggle': 'popover'
      };
    }

    return (
      <a href={href} {...data} className={className} onClick={this.handleClick.bind(this)}>{content}</a>
    );
  }

  handleClick() {
    if (this.props.handleClick !== null) {
      this.props.handleClick(this);
    }

    $('html, body').scrollTop(0);
  }
}

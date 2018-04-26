import React from 'react';

export default class AddNestedBtn extends React.Component {
  static defaultProps = {
    disabled: false
  };

  render() {
    const btnClass = 'bgp-btn bgp-btn-fullwidth';
    return (
      <button ref="button" className={btnClass} id={this.props.id} onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.label}
      </button>
    );
  }
}

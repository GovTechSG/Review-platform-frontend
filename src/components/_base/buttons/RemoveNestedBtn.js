import React from 'react';

export default class RemoveNestedBtn extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = props.handleClick
    ? props.handleClick.bind(null, props.section)
    : () => { return null; };
  }

  render() {
    const label = this.props.label;
    return (
      <div>
        <a ref="a" className="bgp-delete-entry" onClick={this.handleClick}>
            <span>
              {label}
            </span>
        </a>
      </div>
    );
  }
}

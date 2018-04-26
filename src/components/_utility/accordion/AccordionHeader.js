import React from 'react';

export default class AccordionHeader extends React.Component {
  render() {
    return (
        React.createElement(this.props.panelHeader, this.props)
    );
  }
}

import React from 'react';

export default class AccordionBody extends React.Component {
  render() {
    return (
        <this.props.panelBody {...this.props} />
    );
  }
}

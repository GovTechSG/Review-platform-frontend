import React from 'react';
import Waypoint from 'react-waypoint';

export default class SummaryWaypoint extends React.Component {
  render() {
    const summaryComponents = this.props.children.map((child) => {
      return [
        <Waypoint
          key={`${child.props.section}-up-waypoint`}
          onEnter={this.props.handleScroll.bind(this, child.props.section)}
        />,
        child,
        <Waypoint
          key={`${child.props.section}-down-waypoint`}
          onEnter={this.props.handleScroll.bind(this, child.props.section)}
        />
      ];
    });

    return (<div>{summaryComponents.reduce((a, b) => a.concat(b))}</div>);
  }
}

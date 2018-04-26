import React from 'react';
import Remarkable from 'remarkable';

export default class Markdown extends React.Component {
  render() {
    const md = new Remarkable('full', {
      breaks: true,
      linkTarget: '_blank'
    });

    return <span className="bgp-markdown" dangerouslySetInnerHTML={{ __html: md.render(this.props.children) }} />;
  }
}

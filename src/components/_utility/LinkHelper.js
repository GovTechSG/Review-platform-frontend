import React from 'react';
import url from 'url';
import { Link } from 'react-router';
import pureImmutableRender from '../../helpers/immutable-pure-decorator';

@pureImmutableRender
export default class LinkHelper extends React.Component {
  render() {
    const to = this.props.to;
    return url.parse(to || '').host ?
      <a href={to} {...this.props} target="_blank" /> :
      <Link {...this.props} />;
  }
}

import React from 'react';
import Ellipsis from '../../../helpers/ellipsis';

export default class DownloadAttachmentLink extends React.Component {

  render() {
    const attachment = this.props.data.deref();
    const download = this.props.download;
    const href = attachment.get('show_url');
    const filename = attachment.get('attachment_file_name');

    return (
      download === true ?
        <a href={href} target="_blank" download>{Ellipsis.formatName(filename)}</a>
        :
        <span>{Ellipsis.formatName(filename)}</span>
    );
  }
}

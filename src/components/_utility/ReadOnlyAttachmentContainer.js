import React from 'react';
import moment from 'moment';
import DownloadAttachmentLink from '../_base/buttons/DownloadAttachmentLink';
import Label from '../_base/typography/Label';

export default class ReadOnlyAttachmentContainer extends React.Component {
  render() {
    const attachments = this.props.attachments;
    const documentTypes = typeof this.props.documentOptions !== 'undefined' ? this.props.documentOptions.toJS() : [];
    const title = this.props.title;
    const subtitle = this.props.subtitle;
    let timestampStyle = this.props.timestampStyle ? ' pad-change-request-attachment-date-time' : '';
    timestampStyle = this.props.customTimestampStyle ? ` ${this.props.customTimestampStyle}` : timestampStyle;

    return (
      <div className="margin-top-btm-xs-sm">
        <Label content={title} />
        {
          subtitle !== undefined ?
            <div className="ui-instructions-box" dangerouslySetInnerHTML={{ __html: subtitle }} />
            : ''
        }
        <div>
          {
            attachments.count() > 0 ?
              <table className="bgp-attachment-table margin-top-sm">
                <tbody>
                {
                  attachments.map((attachmentCursor, index) => {
                    const attachment = attachmentCursor.toJS();
                    const documentTypesExist = attachment.document_type &&
                      attachment.document_type.types instanceof Array &&
                      attachment.document_type.types.length > 0;
                    const texts = documentTypesExist ? attachment.document_type.types.map((type) => {
                      let documentType = documentTypes.length > 0 && documentTypes.find(doc => doc[0] === type)[1];
                      if (documentType.length > 0 && documentType.indexOf('(') > -1) {
                        documentType = documentType.substring(0,
                          documentType.indexOf('(')).trim();
                      }
                      return (<li key={`tag${index}${type}`} className="bgp-document-tag">{documentType}</li>);
                    }) : null;
                    const createdTimestamp = moment(attachmentCursor.get('created_at')).format('DD MMM YYYY, h:mm a');
                    return (
                      <div key={`success${index}`} className="upload-success">
                        <tr className="upload-success" key={`attachment${index}`}>
                            <td className="bgp-attachment-icon"><DownloadAttachmentLink
                              data={attachmentCursor} download
                            /></td>
                            <td className={`mobile-hide-col${timestampStyle}`}>{createdTimestamp}</td>
                            <td></td>
                        </tr>
                        {texts && <ul className="bgp-document-tag-wrapper">{texts}</ul>}
                      </div>
                    );
                  })
                }
                </tbody>
              </table>
              :
              <div className="bgp-readonly">
                <span className="unfilled">nil</span>
              </div>
          }
        </div>
      </div>
    );
  }
}

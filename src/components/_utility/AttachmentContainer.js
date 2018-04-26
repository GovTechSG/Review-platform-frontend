import React from 'react';
import I18n from 'i18n';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Label from '../_base/typography/Label';
import AttachmentRow from './AttachmentRow';
import FieldAlert from '../_utility/FieldAlert';
import pureImmutableRender from '../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../helpers/element-id-decorator';

@pureImmutableRender
@bindElementId
export default class AttachmentContainer extends React.Component {
  constructor() {
    super();
    this.onDrop = this.onDrop.bind(this);
    this.documentOptionsLabelDesc = '';
    this.generateDocumentList = this.generateDocumentList.bind(this);
  }

  /* eslint-disable max-len */
  getIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <path fill="#e0e0e0" d="M38.863 21.041C37.891 13.098 31.09 7 23 7 14.7 7 7.843 13.318 7.088 21.51A8.974 8.974 0 0 0 1 30c0 4.963 4.037 9 9 9h28c4.963 0 9-4.037 9-9 0-4.67-3.577-8.522-8.137-8.959z" />
        <path fill="#FFF" d="M30.707 22.293l-5.999-5.999a1 1 0 0 0-1.09-.217 1 1 0 0 0-.326.217l-5.999 5.999a1 1 0 1 0 1.414 1.414L23 19.414V33a1 1 0 1 0 2 0V19.414l4.293 4.293a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414z" />
      </svg>
    );
  }
  /* eslint-enable max-len */


  generateDocumentList() {
    const numAttachments = this.props.data.size;
    const documentTypes = this.props.documentOptions;
    const requiredDocuments = this.props.requiredDocuments;
    const tooltips = this.props.documentOptionToolTips ? this.props.documentOptionToolTips.toJS() : {};
    const documentOptionDescription = this.props.documentOptionDescription;
    let optionItem;
    const allSelectedOptions = [];
    for (let i = 0, len = numAttachments; i < len; i++) {
      this.props.data.cursor([i.toString(), 'document_type', 'types']).deref() &&
        allSelectedOptions.push(...this.props.data.cursor([i.toString(), 'document_type', 'types']).deref());
    }
    const allSelectedUniqueOptions = allSelectedOptions.filter((v, i, a) => a.indexOf(v) === i);
    if (documentTypes && documentTypes.toJS()) {
      const types = documentTypes.toJS();
      const typesDescription = documentOptionDescription ? documentOptionDescription.toJS() : {};
      let html = '<ul class="no-bullet">';
      let descriptionHtml;

      Object.values(types).forEach(([key, value]) => {
        const star = requiredDocuments &&
          requiredDocuments.includes(key) ? '<span class="mandatory-indicator"> &nbsp*</span>' : '';
        const included = allSelectedUniqueOptions.includes(key);
        const tooltipContent = tooltips[key];
        optionItem = tooltipContent ?
          `<li${included ? ' class="green-tick"' : ''}><span class="bgp-tooltip-link" data-placement="top" ` +
              `data-html="true" data-container="body" data-toggle="popover" data-content="${tooltipContent}">` +
              `${value}${star}</span></li>` :
          `<li${included ? ' class="green-tick"' : ''}>${value}${star}</li>`;

        descriptionHtml = typesDescription && key in typesDescription ?
        this.generateDocumentDescription(typesDescription, key) : '';
        optionItem += descriptionHtml;
        html += optionItem;
      });
      html += '</ul>';
      this.documentOptionsLabelDesc = html;
    }
  }

  generateDocumentDescription(typesDescription, key) {
    let descriptionHtml = '<ul class="dashed">';
    typesDescription[key].forEach(descriptionItem => {
      descriptionHtml += `<li>${descriptionItem}</li>`;
    });
    descriptionHtml += '</ul>';
    return descriptionHtml;
  }

  generateDocumentOptions(documentTypes) {
    if (documentTypes && documentTypes.toJS()) {
      const types = documentTypes.toJS();
      const documentOptions = Object.values(types).map(([key, value]) => {
        let val;
        val = value;
        if (value.indexOf('(') > -1) {
          val = value.substring(0, value.indexOf('(')).trim();
        }
        return { value: key, label: val };
      });
      return documentOptions;
    }
  }

  generateDocumentLabel(documentOptions) {
    return documentOptions ? this.documentOptionsLabelDesc : this.props.label_desc;
  }

  getAttachmentErrors(attachmentsError, documentErrors) {
    const containerErrorMessage = documentErrors && documentErrors.deref && documentErrors.deref() ||
      attachmentsError && attachmentsError.deref && attachmentsError.deref();
    return _.isObjectLike(containerErrorMessage) && containerErrorMessage.toJS() ? false : containerErrorMessage;
  }

  render() {
    const ongoingAttachments = this.props.ongoingAttachment;
    const attachments = ongoingAttachments ? this.props.data.unshift(...ongoingAttachments) : this.props.data;
    const attachmentsError = this.props.error;
    const attachmentsData = this.props.data;
    const documentErrors = this.props.documentErrors;
    const title = this.props.title;
    const documentTypes = this.props.documentOptions;
    const documentOptions = documentTypes && this.generateDocumentOptions(documentTypes);
    const fileDropTitle = I18n.t('common.file_drop_title');
    const requirements = this.props.requirements;

    const fineprint = requirements ? '' :
      (<div>
        <div className="fineprint">
          { I18n.t('common.supported_file_types_text') }
        </div>
        <div className="fineprint">
          { I18n.t('common.file_greater_text') }
        </div>
      </div>);

    const required = this.props.required || false;
    const hasAttachmentError = attachmentsError && this.getAttachmentErrors(attachmentsError, documentErrors);
    const classes = classNames('bgp-attachment-dropzone', { 'has-error': hasAttachmentError });
    const dropzoneClasses = classNames({ 'bgp-dropzone-two-col-row': requirements });
    const colClasses = classNames({ 'col-sm-6': requirements });

    const uploadBtnClasses = 'bgp-btn bgp-btn-upload margin-top-sm margin-btm-md';
    documentOptions && this.generateDocumentList();
    const labelDesc = this.generateDocumentLabel(documentOptions);

    return (
      <div className="margin-top-xl clear-float">
        <Label content={title} required={required} />
        { requirements && <div className="fineprint" dangerouslySetInnerHTML={{ __html: requirements }} /> }
        <div className={dropzoneClasses}>
          <div className={colClasses}>
            {
              labelDesc && <div className="label-desc" dangerouslySetInnerHTML={{ __html: labelDesc }} />
            }
          </div>
          <div className={colClasses}>
            <Dropzone
              onDrop={this.onDrop}
              supportClick
              activeClassName="active"
              className={classes}
              inputProps={{ id: this.elementId('input') }}
              multiple
            >
              <div>
                { this.getIcon() }
                <div className="bgp-dropzone-instruction">
                  {fileDropTitle}
                </div>
                <div>
                  or
                </div>
                <button
                  id={this.elementId('btn')}
                  name={this.elementId('btn')}
                  className={uploadBtnClasses}
                >
                  Select Files
                </button>
                { fineprint }
              </div>
            </Dropzone>
            {
              hasAttachmentError ?
                <FieldAlert
                  id={`${this.elementId()}-alert`}
                  type="error"
                  content={documentErrors && documentErrors.deref() || attachmentsError.deref()}
                />
                : ''
            }
          </div>
        </div>
        <div>
          <div className="table-responsive bgp-uploaded-group">
            <table className="table bgp-attachment-table margin-top-sm">
              <ReactCSSTransitionGroup
                component="tbody"
                transitionName={'bgp-ani-dropzone'}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={600}
              >
                {
                  attachments.map((attachmentCursor) => {
                    return (
                      <AttachmentRow
                        data={attachmentCursor}
                        parentData={attachmentsData}
                        parentError={attachmentsError}
                        key={this.elementId(attachmentCursor.get('attachment_timestamp') || attachmentCursor.get('id'))}
                        removeAttachment={this.props.removeAttachment}
                        options={documentOptions}
                        generateDocumentList={this.generateDocumentList.bind(this)}
                        handleReactSelectChange={this.props.handleReactSelectChange}
                        handleUpdateDocumentTagging={this.props.handleUpdateDocumentTagging}
                        onBlur={this.props.handleBlur}
                      />
                    );
                  })
                }
              </ReactCSSTransitionGroup>
            </table>
          </div>
        </div>
      </div>
    );
  }

  onDrop(files) {
    for (let file of files) {
      file = Object.assign(file, {
        attachment_type: this.props.attachment_type === undefined ? 'Attachment' : this.props.attachment_type,
        attachment_file_name: file.name,
        attachment_timestamp: Date.now()
      });
      this.props.addAttachment(this, file);
    }
  }
}

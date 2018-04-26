import React from 'react';
import I18n from 'i18n';
import classNames from 'classnames';
import Immutable from 'immutable';
import { formatStandardDateTime } from '../../helpers/calculations';
import pureImmutableRender from '../../helpers/immutable-pure-decorator';
import { bindElementId, getElementId } from '../../helpers/element-id-decorator';
import ActionModalBox from '../_base/box/ActionModalBox';
import DownloadAttachmentLink from '../_base/buttons/DownloadAttachmentLink';
import ReactSelectBox from '../_base/box/ReactSelectBox';

@pureImmutableRender
@bindElementId
export default class AttachmentRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = props.handleReactSelectChange ?
      props.handleReactSelectChange : () => null;
    this.handleUpdateDocumentTagging = props.handleUpdateDocumentTagging ?
      props.handleUpdateDocumentTagging : () => null;
    this.attachmentKeypathIndex = props.data._keyPath.indexOf('attachments');
    this.updateDocumentTagUrl = props.data.get('update_document_tag_url');
    this.generateDocumentList = props.generateDocumentList ?
      props.generateDocumentList : () => null;
    this.handleChangeDocumentType = this.handleChangeDocumentType.bind(this);
  }

  handleChangeDocumentType(component, event) {
    this.handleSelectChange(component, event);
    this.generateDocumentList();
    const value = event && event.value;
    this.handleUpdateDocumentTagging(component, value, this.updateDocumentTagUrl);
    // TODO: add store get errors for handling of document types on blur
  }

  render() {
    const data = this.props.data;
    const parentError = this.props.parentError;
    const parentData = this.props.parentData;
    const state = data.get('state');
    const modalId = `modal-attachments-${this.props.modalId}`;
    const classes = classNames(this.getClasses(state), { 'bgp-ani-transition': (state === 'uploaded') });

    return (
      <tr className={classes} id={this.elementId('attachment-row')}>
        <table>
        <tr>
          {this.renderLink(data, state)}
          {this.renderMessage(data, state)}
          {this.renderSize(data, state)}
          {this.renderDelete(data, parentData, parentError, this.props.removeAttachment, state, modalId)}
        </tr>
        { this.props.options &&
          <tr>
            {this.renderDocument(data, parentError, state)}
          </tr>
        }
        </table>
      </tr>);
  }

  renderDocument(data, parentError, state) {
    const selectedTypes = data.cursor(['document_type', 'types']).deref();

    const attachmentId = data.get('id');
    if (!state || state === 'uploaded') {
      return (
        <td colSpan={4}>
          <ReactSelectBox
            value={selectedTypes && Immutable.List(selectedTypes).toJS()}
            data={data.cursor(['document_type', 'types'])}
            error={parentError.cursor([attachmentId, 'document_type', 'types'])}
            label={'Tag this document'}
            placeHolder={'Select the type of document…'}
            required
            ref="select"
            multi
            clearable
            options={this.props.options}
            onChange={this.handleChangeDocumentType}
            onBlur={this.props.onBlur}
            id={getElementId(data.cursor(['document_type', 'types']))}
          />
        </td>
      );
    }
  }

  renderLink(data, state) {
    return (
      <td className="bgp-attachment-icon">
        <DownloadAttachmentLink data={data}
          download={!!data.get('id') && state !== 'deleting'}
        />
      </td>);
  }

  renderDelete(data, parentData, parentError, removeAttachment, state, modalId) {
    const modalText = I18n.t('common.delete_text');
    const modalTitle = I18n.t('common.delete_title');
    const deleteButton = (
      <a>
        <span className="pull-right">
          <div className="delete-icon" id={this.elementId('btn-remove')} />
        </span>
      </a>);

    if (!state || state === 'uploaded' || state === 'delete_fail') {
      return (
        <td>
          <ActionModalBox triggerComponent={deleteButton}
            handleAction={removeAttachment.bind(null, data, parentData, parentError)}
            headerText={modalTitle}
            bodyText={modalText}
            actionButtonText="Delete"
            closeButtonText="Cancel"
            modalId={modalId}
          />
        </td>);
    } else if (state === 'upload_fail') {
      return (
        <td>
          <a onClick={removeAttachment.bind(null, data, parentData, parentError)}>
            <span className="pull-right">
              <div className="delete-icon" id={this.elementId('btn-remove')} />
            </span>
          </a>
        </td>);
    }

    return (<td></td>);
  }

  renderMessage(data, state) {
    return (
      <td>
        {(state === 'uploading' || state === 'deleting')
          ? <span className="loading">
              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
              <div className="bar bar3"></div>
            </span>
          : ''}

        {data.get('message')
          ? <span className="loading-message">{data.get('message')}</span>
          : <span>{formatStandardDateTime(data.get('created_at'))}</span>
        }
      </td>);
  }

  renderSize(data) {
    return (<td>
        {(data.get('attachment_file_size'))
        ? <span className="file-size">{`${(data.get('attachment_file_size') / 1048576).toFixed(2)}MB`}</span>
        : ''}
    </td>);
  }

  getClasses(state) {
    if (state === 'uploading' || state === 'deleting') {
      return 'upload-inprogress';
    } else if (state === 'delete_fail' || state === 'upload_fail') {
      return 'upload-error';
    }
    return 'upload-success';
  }
}

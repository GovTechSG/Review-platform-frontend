/* eslint max-len: 0 */

import React from 'react';
import { Modal } from 'react-bootstrap';

export default class ActionModalBox extends React.Component {
  constructor() {
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onHandleAction = this.onHandleAction.bind(this);
    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  onHandleAction() {
    this.close();
    setTimeout(this.props.handleAction, 300);
  }

  getWarningIcon() {
    return (
      <i>
        <svg x="0px" y="0px" width="18px" height="18px" viewBox="0 -4 27 27">
          <g transform="translate(0, 0)">
            <line data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeMiterlimit="10" x1="7.1" y1="10" x2="16.9" y2="10" strokeLinejoin="miter" strokeLinecap="butt" />
            <line data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeMiterlimit="10" x1="5.5" y1="15" x2="18.5" y2="15" strokeLinejoin="miter" strokeLinecap="butt" />
            <polyline data-cap="butt" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeMiterlimit="10" points="3,23 10,1 14,1 21,23 " strokeLinejoin="miter" strokeLinecap="butt" />
            <line fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="square" strokeMiterlimit="10" x1="1" y1="23" x2="23" y2="23" strokeLinejoin="miter" />
          </g>
        </svg>
      </i>
    );
  }

  componentDidMount() {
    $(this.refs.trigger).click((e) => {
      e.stopPropagation();
      this.open();
    });
  }

  render() {
    const triggerComponent = React.cloneElement(this.props.triggerComponent, { ref: 'trigger' });
    return (
      <div>
        {triggerComponent}
          <Modal show={this.state.showModal} onHide={this.close} dialogClassName="bgp-modal-dialog">
            <div id={this.props.modalId} className="bgp-modal-content">
              <Modal.Header className="bgp-modal-header">
                {this.getWarningIcon()}
                <Modal.Title className="bgp-modal-title">{this.props.headerText}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="bgp-modal-body">
                <span>{this.props.bodyText}</span>
              </Modal.Body>
              <Modal.Footer className="bgp-modal-footer">
                <button className="bgp-btn bgp-btn-modal-cancel" onClick={this.close}>{this.props.closeButtonText}</button>
                <button className="bgp-btn bgp-btn-modal-delete" onClick={this.onHandleAction}>{this.props.actionButtonText}</button>
              </Modal.Footer>
            </div>
          </Modal>
        </div>
    );
  }
}

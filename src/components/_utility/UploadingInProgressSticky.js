import React from 'react';

export default class UploadingInProgressSticky extends React.Component {
  render() {
    return this.props.progress
      ? (
        <div className="upload-sticky-wrapper">
          <div className="upload-sticky">
            <i className="fa fa-spinner"></i>
            <span className="upload-message">File upload in progress</span>
          </div>
        </div>
      )
      : null;
  }
}

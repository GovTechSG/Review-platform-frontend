import React from 'react';

export default class WarningBanner extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = props.handleChange ? props.handleChange.bind(null, this) : () => null;
  }

  handleClick() {
    // Do save the current data of application form in the selected section
    this.props.handleGrantSave();
    // redirect to the company profile page.
    this.handleChange();
  }

  render() {
    return (
      <div className="infobar">
        <div className={this.props.className}>
          <div
            className="warning-text-alignment"
            dangerouslySetInnerHTML={{ __html: this.props.text }}
          />
          {
          this.props.linkName && <a
            className="bar-link"
            onClick={this.handleClick}
          >{this.props.linkName}
          </a>
          }
        </div>
      </div>
    );
  }
}

import React from 'react';

export default class SubSectionTitle extends React.Component {
  render() {
    const content = this.props.required ?
                    `${this.props.title}<span class="mandatory-indicator">&nbsp;*</span>`
                    : this.props.title;
    return (
        <div className="subsection-title">
          {this.props.icon}
          <h3 dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
  }
}

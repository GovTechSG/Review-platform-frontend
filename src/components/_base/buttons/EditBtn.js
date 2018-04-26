/* eslint max-len: 0 */

import React from 'react';

export default class EditBtn extends React.Component {
  render() {
    return (
        <button onClick={this.props.onClick.bind(null, this.props.href)} className="bgp-btn-edit">
          <svg className="nc-icon glyph" x="0px" y="0px" width="13px" height="13px" viewBox="0 0 16 16">
            <g>
              <path d="M11.7,0.3c-0.4-0.4-1-0.4-1.4,0l-10,10C0.1,10.5,0,10.7,0,11v4c0,0.6,0.4,1,1,1h4c0.3,0,0.5-0.1,0.7-0.3 l10-10c0.4-0.4,0.4-1,0-1.4L11.7,0.3z M4.6,14H2v-2.6l6-6L10.6,8L4.6,14z M12,6.6L9.4,4L11,2.4L13.6,5L12,6.6z" />
            </g>
          </svg>
          Edit
        </button>
    );
  }
}

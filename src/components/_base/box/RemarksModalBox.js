/* eslint max-len: 0 */

import React from 'react';
import TextAreaBox from './TextAreaBox';

export default class RemarksModalBox extends React.Component {
  render() {
    const id = this.props.id;
    const data = this.props.data;
    const label = this.props.label;
    const placeholder = this.props.placeholder;
    const handleChange = this.props.handleChange;
    const onClick = this.props.onClick;

    return (
        <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="bgp-modal-dialog" role="document">
            <div className="bgp-modal-content">
              <div className="bgp-modal-header">
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
              </div>
              <div className="bgp-modal-body">
                <TextAreaBox data={data.cursor('remarks')}
                  label={label}
                  placeholder={placeholder}
                  onChange={handleChange}
                />
              </div>
              <div className="bgp-modal-footer">
                <button type="button" className="bgp-btn bgp-btn-modal-cancel" data-dismiss="modal">Cancel</button>
                <button type="button" className="bgp-btn bgp-btn-modal-delete" data-dismiss="modal" onClick={onClick}>Proceed</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

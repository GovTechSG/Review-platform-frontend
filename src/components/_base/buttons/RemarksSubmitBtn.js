import React from 'react';
import RemarksModalBox from '../../_base/box/RemarksModalBox';
import SubmitBtn from './SubmitBtn';

export default class RemarksSubmitBtn extends React.Component {
  render() {
    const data = this.props.data;
    const modalId = `modal-remarks-${data.get('id')}`;
    const label = this.props.label;
    const handleClick = this.props.handleClick;
    const handleChange = this.props.handleChange;

    return (
      <div>
        <RemarksModalBox
          id={modalId}
          modalType="remarks"
          data={data}
          label={label}
          handleChange={handleChange}
          onClick={handleClick}
        />
        <a href="#" data-toggle="modal" data-target={`#${modalId}`}>
          <SubmitBtn />
        </a>
      </div>
    );
  }
}

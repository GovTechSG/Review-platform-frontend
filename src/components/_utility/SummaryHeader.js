import React from 'react';
import SectionTitle from '../_base/typography/SectionTitle';
import EditBtn from '../_base/buttons/EditBtn';

export default class SummaryHeader extends React.Component {
  render() {
    return (
      <div className="row margin-btm-xl margin-top-md">
        <div className="cols-sm-10 cols-xs-7 ">
          <SectionTitle icon={this.props.icon} title={this.props.sectionTitle} />
        </div>
        <div className="cols-sm-2 cols-xs-5 text-right">
        {
          this.props.editable ?
          <EditBtn href={this.props.href || ''} onClick={this.props.handleToDraft} />
          :
          null
        }
        </div>
      </div>
    );
  }
}

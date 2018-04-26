import React, { Component } from 'react';
import classNames from 'classnames';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import I18n from 'i18n';
import immutablePure from '../../helpers/immutable-pure-decorator';
import Ellipsis from '../../helpers/ellipsis';

@immutablePure
export default class UserInfo extends Component {
  render() {
    const action = I18n.t(`user.actions.${this.props.userRole}`);
    const companyName = Ellipsis.formatText(this.props.companyName || this.props.companyUen, 38);
    const role = I18n.t(`user.role.${this.props.userRole}`);
    const roleClassNames = classNames({
      'role-info': true,
      'role-viewer': role === 'Viewer',
      'role-preparer': role === 'Preparer',
      'role-acceptor': role === 'Acceptor'
    });

    return (
      <div className="username-tag">
        <div className="username-message">Welcome, {this.props.userName}.</div>
        <span className={roleClassNames}>
          <OverlayTrigger
            className="user-info"
            trigger={['hover', 'focus']}
            placement={this.props.tooltipPlacement}
            overlay={<Popover id="user-details">{action}</Popover>}
          ><a>{role}</a>
          </OverlayTrigger>
        </span>
        <span className="company-name">{companyName}</span>
      </div>
    );
  }
}

UserInfo.defaultProps = {
  tooltipPlacement: 'right'
};

UserInfo.propTypes = {
  companyName: React.PropTypes.string,
  companyUen: React.PropTypes.string,
  nric: React.PropTypes.string,
  popover: React.PropTypes.string,
  userRole: React.PropTypes.string
};

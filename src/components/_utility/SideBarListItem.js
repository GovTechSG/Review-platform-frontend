/* eslint max-len: 0 */
/* eslint react/no-multi-comp: 0 */

import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import SideBarErrorUtility from './SideBarErrorUtility';

const sideBarIcons = {
  company: () => (
    <i>
      <svg className="nc-icon outline" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <polyline className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points="16,11 16,6 14,6 14,3 10,3 10,6 8,6 8,14 " strokeLinejoin="miter" />
          <line className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="23" x2="14" y2="23" strokeLinejoin="miter" />
          <line className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="12" y1="1" x2="12" y2="3" strokeLinejoin="miter" />
          <rect className="icon-color-1" x="2" y="14" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="8" height="9" strokeLinejoin="miter" />
          <rect className="icon-color-1" x="14" y="11" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="8" height="12" strokeLinejoin="miter" />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="17" y1="14" x2="19" y2="14" strokeLinejoin="miter" />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="17" y1="17" x2="19" y2="17" strokeLinejoin="miter" />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="17" y1="20" x2="19" y2="20" strokeLinejoin="miter" />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="5" y1="17" x2="7" y2="17" strokeLinejoin="miter" />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="5" y1="20" x2="7" y2="20" strokeLinejoin="miter" />
        </g>
      </svg>
    </i>
  ),

  eligibility: () => (
    <i>
      <svg className="nc-icon outline" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="4" x2="22" y2="4" strokeLinejoin="miter" />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="12" x2="22" y2="12" strokeLinejoin="miter" />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="10" y1="20" x2="22" y2="20" strokeLinejoin="miter" />
          <rect className="icon-color-1" x="2" y="2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="4" height="4" strokeLinejoin="miter" />
          <rect className="icon-color-1" x="2" y="10" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="4" height="4" strokeLinejoin="miter" />
          <rect className="icon-color-1" x="2" y="18" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="4" height="4" strokeLinejoin="miter" />
        </g>
      </svg>
    </i>
  ),

  contact_info: () => (
    <i>
      <svg className="nc-icon outline" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <path className="icon-color-1" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M17,15l-3,3l-8-8l3-3L4,2 L1,5c0,9.941,8.059,18,18,18l3-3L17,15z" strokeLinejoin="miter" />
          <path className="icon-color-2" data-color="color-2" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M14,1 c4.971,0,9,4.029,9,9" strokeLinejoin="miter" />
          <path className="icon-color-2" data-color="color-2" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M14,5 c2.761,0,5,2.239,5,5" strokeLinejoin="miter" />
        </g>
      </svg>
    </i>
  ),

  project: () => (
    <i>
      <svg className="nc-icon outline" x="0px"
        y="0px" width="20px" height="20px" viewBox="0 0 24 24"
      >
        <g transform="translate(0, 0)">
          <path className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10"
            d="M4,1h13c1.1,0,2,0.9,2,2v18 c0,1.1-0.9,2-2,2H4" strokeLinejoin="miter"
          />
          <rect className="icon-color-1" x="1" y="1" fill="none" strokeWidth="2" strokeLinecap="square"
            strokeMiterlimit="10" width="3" height="22" strokeLinejoin="miter"
          />
          <rect className="icon-color-2" data-color="color-2" x="8" y="5" fill="none" strokeWidth="2"
            strokeLinecap="square" strokeMiterlimit="10" width="7" height="4" strokeLinejoin="miter"
          />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square"
            strokeMiterlimit="10" x1="8" y1="12" x2="15" y2="12" strokeLinejoin="miter"
          />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square"
            strokeMiterlimit="10" x1="8" y1="15" x2="11" y2="15" strokeLinejoin="miter"
          />
          <line className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10"
            x1="21" y1="4" x2="21" y2="6" strokeLinejoin="miter"
          />
          <line className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10"
            x1="21" y1="9" x2="21" y2="11" strokeLinejoin="miter"
          />
        </g>
      </svg>
    </i>
  ),

  project_impact: () => (
    <i>
      <svg className="nc-icon outline" x="0px"
        y="0px" width="22px" height="22px" viewBox="0 0 24 24"
      >
        <g transform="translate(0, 0)">
          <rect className="icon-color-1" x="10" y="13" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="4"
            height="9" strokeLinejoin="miter"
          />
          <rect className="icon-color-1" x="2" y="17" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="4"
            height="5" strokeLinejoin="miter"
          />
          <rect className="icon-color-1" x="18" y="9" fill="none" strokeWidth="2" strokeLinecap="square"
            strokeMiterlimit="10" width="4" height="13" strokeLinejoin="miter"
          />
          <polyline className="icon-color-2" data-cap="butt" data-color="color-2" fill="none" strokeWidth="2"
            strokeMiterlimit="10" points="5,10 9,6 12,9 19,2 " strokeLinejoin="miter" strokeLinecap="butt"
          />
          <polyline className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square"
            strokeMiterlimit="10"
            points=" 15,2 19,2 19,6 " strokeLinejoin="miter"
          />
        </g>
      </svg>
    </i>
  ),

  project_cost: () => (
    <i>
      <svg className="nc-icon outline" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <path className="icon-color-1" data-cap="butt" fill="none" strokeWidth="2" strokeMiterlimit="10" d="M21,15.1c1.2,0,2-0.7,2-2 s-1-1.5-1-1.5" strokeLinejoin="miter" strokeLinecap="butt" />
          <path className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M15,9H9C7.8,6,5,7,5,7 l1,2.9c-1.2,0.7-2.1,1.8-2.6,3.1H1v5h2.8c0.7,1.2,1.8,2.2,3.2,2.7V23h3v-2h4v2h3v-2.3c2.3-0.8,4-3,4-5.7C21,11.7,18.3,9,15,9z" strokeLinejoin="miter" />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="11" y1="12" x2="15" y2="12" strokeLinejoin="miter" />
          <circle className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" cx="13" cy="3" r="2" strokeLinejoin="miter" />
        </g>
      </svg>
    </i>
  ),

  declaration: () => (
    <i>
      <svg className="nc-icon outline" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="3" y1="22" x2="21" y2="22" />
          <path className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M13,12L9,8l6-6 c1.1-1.1,2.9-1.1,4,0l0,0c1.1,1.1,1.1,2.9,0,4L13,12z" />
          <path className="icon-color-1" data-cap="butt" fill="none" stroke="#435e70" strokeWidth="2" strokeMiterlimit="10" d="M10,9l-6,6c-0.6,0.6-0.6,1.4,0,2 c0.6,0.6,1.4,0.6,2,0l6-6" />
          <line className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="4" y1="17" x2="3" y2="18" />
          <polyline className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points="19,6 21,8 17,12 " />
        </g>
      </svg>
    </i>
  ),

  review: () => (
    <i>
      <svg className="nc-icon outline" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="3" y1="22" x2="21" y2="22" />
          <path className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M13,12L9,8l6-6 c1.1-1.1,2.9-1.1,4,0l0,0c1.1,1.1,1.1,2.9,0,4L13,12z" />
          <path className="icon-color-1" data-cap="butt" fill="none" stroke="#435e70" strokeWidth="2" strokeMiterlimit="10" d="M10,9l-6,6c-0.6,0.6-0.6,1.4,0,2 c0.6,0.6,1.4,0.6,2,0l6-6" />
          <line className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="4" y1="17" x2="3" y2="18" />
          <polyline className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points="19,6 21,8 17,12 " />
        </g>
      </svg>
    </i>
  ),

  contact: () => (
    <i>
      <svg className="nc-icon outline" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <path className="icon-color-1" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M17,15l-3,3l-8-8l3-3L4,2 L1,5c0,9.941,8.059,18,18,18l3-3L17,15z" strokeLinejoin="miter" />
          <path className="icon-color-2" data-color="color-2" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M14,1 c4.971,0,9,4.029,9,9" strokeLinejoin="miter" />
          <path className="icon-color-2" data-color="color-2" fill="none" stroke="#444444" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M14,5 c2.761,0,5,2.239,5,5" strokeLinejoin="miter" />
        </g>
      </svg>
    </i>
  ),

  claim_info: () => (
    <i>
      <svg className="nc-icon outline" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 24 24">
        <g transform="translate(0, 0)">
          <path className="icon-color-1" data-cap="butt" fill="none" strokeWidth="2" strokeMiterlimit="10" d="M21,15.1c1.2,0,2-0.7,2-2 s-1-1.5-1-1.5" strokeLinejoin="miter" strokeLinecap="butt" />
          <path className="icon-color-1" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" d="M15,9H9C7.8,6,5,7,5,7 l1,2.9c-1.2,0.7-2.1,1.8-2.6,3.1H1v5h2.8c0.7,1.2,1.8,2.2,3.2,2.7V23h3v-2h4v2h3v-2.3c2.3-0.8,4-3,4-5.7C21,11.7,18.3,9,15,9z" strokeLinejoin="miter" />
          <line className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" x1="11" y1="12" x2="15" y2="12" strokeLinejoin="miter" />
          <circle className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" cx="13" cy="3" r="2" strokeLinejoin="miter" />
        </g>
      </svg>
    </i>
  ),

  business_outcome: () => (
    <i>
      <svg className="nc-icon outline" x="0px"
        y="0px" width="22px" height="22px" viewBox="0 0 24 24"
      >
        <g transform="translate(0, 0)">
          <rect className="icon-color-1" x="10" y="13" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="4"
            height="9" strokeLinejoin="miter"
          />
          <rect className="icon-color-1" x="2" y="17" fill="none" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" width="4"
            height="5" strokeLinejoin="miter"
          />
          <rect className="icon-color-1" x="18" y="9" fill="none" strokeWidth="2" strokeLinecap="square"
            strokeMiterlimit="10" width="4" height="13" strokeLinejoin="miter"
          />
          <polyline className="icon-color-2" data-cap="butt" data-color="color-2" fill="none" strokeWidth="2"
            strokeMiterlimit="10" points="5,10 9,6 12,9 19,2 " strokeLinejoin="miter" strokeLinecap="butt"
          />
          <polyline className="icon-color-2" data-color="color-2" fill="none" strokeWidth="2" strokeLinecap="square"
            strokeMiterlimit="10"
            points=" 15,2 19,2 19,6 " strokeLinejoin="miter"
          />
        </g>
      </svg>
    </i>
  )
};

export class SideBarStaticListItem extends React.Component {
  render() {
    const section = this.props.section;
    const title = this.props.title;
    const onClick = this.props.onClick && this.props.onClick.bind(null, section);
    return (
      <li className={this.props.active ? 'active' : null}>
        <a ref="a" onClick={onClick}>
          {sideBarIcons[section]()}
          <span className="menu-text">{title}</span>
        </a>
      </li>
    );
  }
}

export class SideBarDynamicListItem extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  scrollTo() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  }

  render() {
    const section = this.props.section;
    const title = this.props.title;
    const isNavigationDisabled = this.props.isNavigationDisabled;
    const reworkSections = this.props.reworkSections;

    let sectionPath = section;
    let navigationClassName = classNames({ active: this.context.router.isActive({
      pathname: `${this.props.currentPath}/${section}` }) });
    let onclickToScroll = this.scrollTo.bind();
    if (isNavigationDisabled && section !== 'eligibility') {
      navigationClassName = classNames('disabled');
      sectionPath = '';
      onclickToScroll = () => {};
    }

    let menuTextClassName = classNames(reworkSections.length > 0
      && _.split(reworkSections, ',').indexOf(section) === -1 ?
      'menu-text disabled'
      : 'menu-text'
    );

    // Enable Project Section only for Psg Grant when Location is sent to Rework
    if (reworkSections.length > 0 && section === 'project'
      && _.split(reworkSections, ',').includes('location')) {
      menuTextClassName = 'menu-text';
    }

    return (
      <li className={navigationClassName} >
        <Link to={`${this.props.currentPath}/${sectionPath}`} activeClassName="active" onClick={onclickToScroll}>
          {sideBarIcons[section]()}
          <span className={menuTextClassName}>{title}</span>

          <div className="sidebar-label">
            {this.props.errorCount
              ?
              <SideBarErrorUtility errorCount={this.props.errorCount.deref()} reviewStatus={this.props.reviewStatus} />
              : ''}
          </div>
        </Link>
      </li>
    );
  }
}

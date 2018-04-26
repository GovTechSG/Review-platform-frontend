/* eslint complexity: [2,7] */

import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import I18n from 'i18n';
import bgpLogoMain from './bgp-logo.svg';
import bgpLogoAffix from './bgp-logo-affix.svg';
import govtLogo from './govt-logo.svg';
import UserInfo from '../UserInfo';
import GoogleSearchField from '../../_base/fields/GoogleSearchField';

export default class Header extends Component {
  static HOME_SECTIONS = [
    '',
    'about_us',
    'faq',
    'feedback',
    'how_it_works',
    'landing',
    'logged_out',
    'news',
    'privacy',
    'rate',
    'sitemap',
    'terms',
    'unauthorized',
    'search'
  ];

  constructor(props) {
    super(props);
    this.state = { sticky: false, googleSearchField: false };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      setInterval(() => {
        $.getJSON('/saml/last_request', () => {
        }).done((data) => {
          const minutes = 5;

          if (data.logged_in && (data.now > data.timeout - (minutes * 60))) {
            const answer = confirm(I18n.t('common.alert.session_renew', { minutes }));  // eslint-disable-line no-alert

            if (answer) {
              $.ajax({
                url: '/saml/touch.json',
                type: 'post',
                headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
              }).fail(() => {
                alert(I18n.t('common.alert.session_timeout')); // eslint-disable-line no-alert
                this.logout();
              });
            } else {
              this.logout();
            }
          }
        });
      }, 60 * 1000);
    }

    const url = '/home_config';
    $.getJSON(url, () => {
    }).done((data) => {
      this.setState({ googleSearchField: data.google_search_field });
    });

    $('.nav a').click(() => {
      this.closeNav();
    });
  }

  getLink(linkTo, title) {
    return ~Header.HOME_SECTIONS.indexOf(this.props.location.split('/').pop()) ?
      <Link to={linkTo}>{title}</Link> :
      <a href={linkTo}>{title}</a>;
  }

  closeNav() {
    $('.navbar-collapse').collapse('hide');
  }

  render() {
    const locationPathName = this.props.location.split('/').pop();
    const isAuthenticated = this.props.isAuthenticated;
    const { nric, userName, userRole, companyName, companyUen } = this.props;
    const userInfoProps = { nric, userName, userRole, companyName, companyUen };
    const imgTitle = this.props.versionCommit;

    return (
      <div className={classNames('header', { sticky: this.props.sticky })}>
        <div className="bgp-masthead hidden-xs hidden-sm">
          <div className="bgp-header-logo-container" id="bgp-header-logo">
            <a href="/">
              <img className="bgp-header-logo" src={bgpLogoMain} alt="Business Grants Portal" />
            </a>
          </div>

          <div className="pull-right">
            <div id="bgp-gvt-logo-container">
              <div className="govt-logo">
                <a target="_blank" href="https://www.gov.sg">
                  <img src={govtLogo} title={imgTitle} alt="gov.sg" />
                </a>
              </div>

              <div className="lion-link">
                <a href="/feedback">Contact Us/Feedback</a>
                <a href="/about_us">About Us</a>
              </div>
              {
                isAuthenticated ?
                  <UserInfo {...userInfoProps} tooltipPlacement="left" />
                :
                  ''
              }
            </div>
          </div>
        </div>

        <div id="nav" className={classNames({ sticky: this.state.sticky })}>
          <div className="navbar navbar-default bgp-topnavi-wrapper">
            <div className="bgp-nav-logo" id="bgp-nav-logo">
              <a href="/"><img src={bgpLogoAffix} alt="Home" /></a>
            </div>

            <button
              className="navbar-toggle bgp-mobile-nav-btn"
              data-target="#bgp-navbar-collapse"
              data-toggle="collapse"
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <div id="bgp-navbar-collapse" className="collapse navbar-collapse no-transition">
              <ul className="nav navbar-nav bgp-topnavi">

                {
                  isAuthenticated
                    ?
                    <li className={classNames({ active: Header.HOME_SECTIONS.indexOf(locationPathName) === -1 })}>
                        <a className="mygrants-icon" href="/dashboard">My Grants</a>
                      </li>
                    : ''
                }

                <li className={classNames({ active: locationPathName === 'news' })}>
                  {this.getLink('/news', 'News')}
                </li>

                <li className={classNames({ active: locationPathName === 'how_it_works' })}>
                  {this.getLink('/how_it_works', 'How it works')}
                </li>

                <li className={classNames({ active: locationPathName === 'faq' })}>
                  {this.getLink('/faq', 'FAQ')}
                </li>

                <li className="log-button">
                  {
                    isAuthenticated
                      ? <a className="logout" id="logout-button" onClick={this.logout}>Log Out</a>
                      : <a className="login" id="login-button" onClick={(this.login)}>Log In</a>
                  }
                </li>

                {
                  !isAuthenticated && this.state.googleSearchField &&
                  <li className="gsearch">
                    <GoogleSearchField closeNav={this.closeNav.bind(this)} />
                  </li>
                }

                {
                  isAuthenticated
                    ?
                    <div className="bgp-mobile-auth-details">
                      <UserInfo {...userInfoProps} tooltipPlacement="right" />
                    </div>
                    : ''
                }

              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  login() {
    window.location = '/saml/sso';
  }

  logout() {
    window.localStorage.setItem('bgp-logged-out', Date.now());
    window.location = '/saml/slo';
  }
}

Header.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  location: React.PropTypes.string,
  sticky: React.PropTypes.bool
};

/* eslint complexity: [2,8] */

import React from 'react';
import classNames from 'classnames';
import Header from './header/Header';
import styles from './styles/layoutStyles.scss';

export default class LayoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sticky: false };
  }

  componentDidMount() {
    this.$window = this.$window || $(window);

    window.addEventListener('scroll', () => {
      const fullHeaderHeight = 175;
      const stickyHeaderHeight = 50;

      // Use $window.scrollTop() instead of scrollTop from event for consistent behaviour across browsers
      const sticky = this.$window.scrollTop() >= fullHeaderHeight - stickyHeaderHeight;

      if (this.state.sticky !== sticky) {
        this.setState({ sticky });
      }
    });
  }

  render() {
    // Home components and other components have different methods of accessing props
    const footer = this.props.footer || (this.props.route && this.props.route.footer);
    const sidebar = this.props.sidebar || (this.props.route && this.props.route.sidebar);
    const versionCommit = '🇸🇬';

    return (
      <div className={styles['layout-container']}>
        <div className={styles['header-wrapper']}>
          <Header
            location={window.location.pathname}
            isAuthenticated={this.props.isAuthenticated}
            sticky={this.state.sticky}
            nric={this.props.nric}
            userName={this.props.userName}
            userRole={this.props.userRole}
            companyName={this.props.companyName}
            companyUen={this.props.companyUen}
            versionCommit={versionCommit}
          />
        </div>

        {
          this.props.errors && this.props.errors.map((el) => {
            return el.props.error
              ? (
                <div className={styles['infobar-wrapper']} key={el.props.error}>
                  <div className={classNames(styles.infobar, this.state.sticky ? styles.sticky : '')}>
                    {el}
                  </div>
                </div>
              )
              : null;
          })
        }

        <div className={styles['children-wrapper']}>
          {
            sidebar
              ? <div className={styles['sidebar-wrapper']}>
                  <div className={classNames(styles.sidebar, this.state.sticky ? styles.sticky : null)}>
                    {sidebar}
                  </div>
                </div>
              : ''
          }

          <div className={styles.children}>
            { this.props.children }
          </div>
        </div>

        {footer || ''}
      </div>
    );
  }
}

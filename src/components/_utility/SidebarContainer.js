/* eslint complexity: [2,8] */

import React from 'react';
import classNames from 'classnames';
import styles from './styles/layoutStyles.scss';

export default class SidebarContainer extends React.Component {
  static defaultProps = {
    sidebar: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      sticky: false
    };
  }

  componentDidMount() {
    this.$window = this.$window || $(window);

    window.addEventListener('scroll', () => {
      const fullHeaderHeight = 175;
      const stickyHeaderHeight = 50;
      const sticky = this.$window.scrollTop() >= fullHeaderHeight - stickyHeaderHeight;

      if (this.state.sticky !== sticky) {
        this.setState({ sticky });
      }
    });
  }

  render() {
    const { sidebar } = this.props;
    const { activeSection } = this.state;


    return (
      <div className={styles['children-wrapper']}>
        <div className={styles['sidebar-wrapper']}>
          <div className={classNames(styles.sidebar, this.state.sticky ? styles.sticky : null)}>
            {sidebar(activeSection)}
          </div>
        </div>

        <div div className={styles.children}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

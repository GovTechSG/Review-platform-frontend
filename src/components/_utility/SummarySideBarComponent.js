/* global namespace */

import React, { Component } from 'react';
import I18n from 'i18n';
import { SideBarStaticListItem } from './SideBarListItem';
import BackLink from '../_base/typography/BackLink';
import sectionConfiguration from '../../config/sectionConfiguration';
import FormEvents from '../../flux/FormEvents';

import SummaryStore from '../../flux/SummaryStore';

export default class SummarySidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.state = {
      scrollListener: (section) => {
        this.setState({ activeSection: section });
      },
      activeSection: 'company'
    };
  }

  componentDidMount() {
    SummaryStore.listen(this.onChange);
    window.addEventListener('summarySectionChange', (event) =>
      this.setState({ activeSection: event.detail.section })
    );
  }

  componentWillUnmount() {
    window.onbeforeunload = null;
    SummaryStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState(SummaryStore.getState());
  }

  scrollTo(section) {
    const div = $(`#${section}`);
    const offsetValue = div.offset().top - 75;
    const scrollListener = this.state.scrollListener;
    this.setState({ scrollListener: () => { this.setState(section); } });
    $('html, body').animate({
      scrollTop: offsetValue
    }, 500, () => {
      this.setState({ activeSection: section, scrollListener });
    });
  }

  render() {
    const keypath = SummaryStore.getState().getIn(['data', 'grant', 'url']);

    const BackLinkComponent = (
      <BackLink
        key="backLink"
        link={keypath}
        linkText={I18n.t('back_button.grant_actions')}
        handleClick={FormEvents.handleToGrantKeyPage}
      />
    );

    const companySideBarStaticListItem = (
      <SideBarStaticListItem
        section="company"
        key="company"
        title="Company Profile"
        active={this.state.activeSection === 'company'}
        onClick={() => this.scrollTo('company')}
      />
    );

    const sideBarToRender = sectionConfiguration[namespace].map(s => {
      return (
        <SideBarStaticListItem
          section={s.id}
          key={s.id}
          title={s.summaryTitle || s.title}
          active={this.state.activeSection === s.id}
          onClick={() => this.scrollTo(s.id)}
        />
      );
    });
    sideBarToRender.unshift(companySideBarStaticListItem);
    sideBarToRender.unshift(BackLinkComponent);

    return (
      <div className="bgp-sidebar">
        <ul className="nav nav-sidebar sidebar-menu">
          {sideBarToRender}
        </ul>
      </div>
    );
  }
}

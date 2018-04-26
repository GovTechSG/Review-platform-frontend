/* global namespace */

import React from 'react';
import Cursor from 'immutable/contrib/cursor';
import I18n from 'i18n';
import { SideBarDynamicListItem } from './SideBarListItem';
import Store from '../../flux/Store';
import FormEvents from '../../flux/FormEvents';
import ClaimFormEvents from '../../flux/ClaimFormEvents';
import BackLink from '../_base/typography/BackLink';
import claimConfiguration from '../../config/claimConfiguration';
import sectionConfiguration from '../../config/sectionConfiguration';

export default class SideBarComponent extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.growled = false;
  }

  componentDidMount() {
    Store.listen(this.onChange);
  }

  componentWillUnmount() {
    Store.unlisten(this.onChange);
  }

  componentDidUpdate() {
    if (!this.growled) {
      const errorCount = Store.getState().toJSON().errorCount;
      let isValid = true;
      for (const i in errorCount) {
        if (errorCount[i] > 0 && i !== 'company_profile') {
          isValid = false;
          break;
        }
      }
      if (!isValid) {
        $.growl.error({
          title: I18n.t('growl_messages.review_failed_title'),
          message: I18n.t('growl_messages.review_failed_subtext'),
          size: 'large'
        });
        this.growled = true;
      }
    }
  }

  onChange() {
    this.setState(Store.getState());
  }

  render() {
    const storeCursor = Cursor.from(Store.getState());
    const { pathname } = this.props.location;
    const isClaim = this.props.isClaim;
    const isNavigationDisabled = this.props.isNavigationDisabled;
    const currentSection = pathname.substr(pathname.lastIndexOf('/') + 1);
    const basePath = pathname.substr(0, pathname.lastIndexOf('/'));
    const keyPath = storeCursor.cursor(['data', 'grant', 'url']).deref();
    const claimsKeyPageLink = `${basePath.substr(0, basePath.lastIndexOf('/'))}/key_page`;
    const lastReviewed = isClaim ? storeCursor.cursor(['data', 'claim', 'last_reviewed']).deref() :
    storeCursor.cursor(['data', 'grant', 'last_reviewed']).deref();

    return (
      <div className="bgp-sidebar">
        <ul className="nav nav-sidebar sidebar-menu">
          {
            isClaim ?
              <BackLink
                link={claimsKeyPageLink}
                linkText={'Back To Claims'}
                handleClick={ClaimFormEvents.handleToClaimKeyPage}
                currentSection={currentSection}
              />
              :
              <BackLink
                link={keyPath}
                linkText={I18n.t('back_button.grant_actions')}
                handleClick={FormEvents.handleToGrantKeyPage}
                currentSection={currentSection}
              />
          }
          {
            isClaim ?
              claimConfiguration[namespace].map(s =>
                <SideBarDynamicListItem
                  currentPath={basePath}
                  isNavigationDisabled={isNavigationDisabled}
                  reworkSections={this.props.reworkSections}
                  section={s.id}
                  key={s.id}
                  title={s.title}
                  errorCount={storeCursor.cursor(['errorCount', s.id])}
                  reviewStatus={lastReviewed}
                />
              )
              :
              sectionConfiguration[namespace].map(s =>
                <SideBarDynamicListItem
                  currentPath={basePath}
                  isNavigationDisabled={isNavigationDisabled}
                  reworkSections={this.props.reworkSections}
                  section={s.id}
                  key={s.id}
                  title={s.title}
                  errorCount={storeCursor.cursor(['errorCount', s.id])}
                  reviewStatus={lastReviewed}
                />
              )
          }
        </ul>
      </div>
    );
  }
}

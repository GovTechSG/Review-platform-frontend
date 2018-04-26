import React from 'react';
import NextBtn from '../_base/buttons/NextBtn';
import PrevBtn from '../_base/buttons/PrevBtn';
import ReviewBtn from '../_base/buttons/ReviewBtn';
import SaveBtn from '../_base/buttons/SaveBtn';
import NavigationBtn from '../_base/buttons/NavigationBtn';

export default class NavigationContainer extends React.Component {
  navText = (formType, claimID) => {
    let navigationText = '';
    if (formType === 'claims' || claimID) {
      navigationText = 'Back to Claim';
    } else {
      navigationText = 'Back to Application';
    }
    return navigationText;
  }

  render() {
    const saveBtn = <SaveBtn handleClick={this.props.handleSave} section={this.props.section} />;
    const prevBtn = this.props.prevUrl
      ? <PrevBtn url={this.props.prevUrl} />
      : '';

    const nextBtn = this.props.nextUrl
      ? <NextBtn url={this.props.nextUrl} isNavigationDisabled={this.props.isNavigationDisabled} />
      : (<span className={this.props.disableReviewBtn}>
        <ReviewBtn
          handleClick={this.props.handleReviewGrant}
          url={this.props.reviewUrl}
        />
        </span>);

    let backBtn = '';
    const grantID = this.props.isCompanyProfile && this.props.grantData && this.props.grantData.grant_id;
    const claimID = this.props.claimData && this.props.claimData.claim_id;

    // Checks if url is from claims form.
    const urlList = document.referrer.split('/');
    const formType = urlList[urlList.length - 3];
    const navigationText = this.navText(formType, claimID);

    if (grantID || claimID) {
      backBtn = (<NavigationBtn
        navigation="back"
        section={this.props.section}
        handleToGrant={this.props.handleToGrant}
        navigation_text={navigationText}
      />);
    }

    return (
      <div>
        <div className="bgp-btn-group">
          <div className="bgp-btn-left">
            {prevBtn}
            {backBtn}
          </div>
          <div className="bgp-btn-right">
            {saveBtn}
            {
              this.props.isCompanyProfile
              ? null
              : nextBtn
            }
          </div>
        </div>
      </div>
    );
  }
}

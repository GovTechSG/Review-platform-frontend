import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';

export default class EligibilityAdvice extends React.Component {
  render() {
    const content = this.props.content;

    return (
        <ReactCSSTransitionGroup transitionName="bgp-ani-fadeInDown"
          transitionAppear={this.props.animate}
          transitionAppearTimeout={400}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          <div className="eligibility-advice">
            <span dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </ReactCSSTransitionGroup>
    );
  }
}

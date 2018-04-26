import React from 'react';

import pureImmutableRender from '../../helpers/immutable-pure-decorator';
import ReadOnlyCostRowSection from './ReadOnlyCostRowSection';
import MainAccordionContainer from './accordion/MainAccordionContainer';

@pureImmutableRender
export default class ReadOnlyCostBoxSection extends React.Component {
  render() {
    const costItems = this.props.data;
    const grantType = this.props.grantType;
    const costRows = costItems.count() > 0 ? costItems.map((costItem, index) => {
      return (
        <MainAccordionContainer
          data={costItem}
          grantType={grantType}
          title={costItem.get('title')}
          key={`${costItem.get('id')}-${index}`}
          accordionPanelBody={ReadOnlyCostRowSection}
          expand
          readOnly
        />
      );
    })
    : 'nil';

    return (
      <div>
        {costRows}
      </div>
    );
  }
}

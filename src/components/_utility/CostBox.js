import React from 'react';
import I18n from 'i18n';

import CostRow from './CostRow';
import MainAccordionContainer from './accordion/MainAccordionContainer';

const CostBox = (props) => {
  const costItems = props.data;
  const error = props.error;
  const grantType = props.grantType;

  const costRows = costItems.map((costItem, index) => {
    const errorCursor = error.cursor(costItem.get('id').toString());
    const title = costItem.get('title');
    const descriptionPlaceHolderTitle = props.placeholder ?
      I18n.t(`${grantType}.project_cost.${costItem.cursor('title').deref()}`)
      :
      '';

    return (
      <MainAccordionContainer
        data={costItem}
        errors={errorCursor}
        placeholder={descriptionPlaceHolderTitle}
        grantType={grantType}
        title={title}
        key={`${costItem.get('id')}-${index}`}
        accordionPanelBody={CostRow}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        onSelectBoxChange={props.handleChangeSelectField}
        onChangeCurrencyCombinedField={props.onChangeCurrencyCombinedField}
      />
    );
  });

  return (
    <div>
      {costRows}
    </div>
  );
};

export default CostBox;

CostBox.defaultProps = { placeholder: true };

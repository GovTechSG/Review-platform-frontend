import React from 'react';
import classNames from 'classnames';

const FieldAlert = ({ id, content, type }) => {
  const elementId = id || 'field-alert';
  const classes = classNames('help-inline', {
    'field-error-message': type === 'error',
    'field-warning-message': type === 'warning'
  });

  return (
      <p id={elementId} className={classes}>{content}</p>
  );
};

export default FieldAlert;

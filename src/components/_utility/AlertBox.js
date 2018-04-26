import React from 'react';
import classNames from 'classnames';

const AlertBox = ({ text, type }) => {
  const classes = classNames('text-semibold', {
    'success-helptext': type === 'success',
    'warning-helptext': type === 'warning',
    'danger-helptext': type === 'danger'
  });

  return (
    <div className="helptext-wrapper">
      <div className={classes} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default AlertBox;

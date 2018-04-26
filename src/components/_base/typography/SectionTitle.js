import React from 'react';

const SectionTitle = ({ icon, title }) => {
  const classname = icon ? 'summary-header' : '';
  return (
    <div className={classname}>
      {icon}
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
};

export default SectionTitle;

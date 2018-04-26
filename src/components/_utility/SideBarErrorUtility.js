import React from 'react';

export default (props) => {
  const error = props.errorCount;
  const reviewStatus = (props.reviewStatus === 'true');

  if (error > 0) {
    return <span className="label label-error"> {error} </span>;
  }

  if (error === 0 && reviewStatus) {
    return <span className="label label-success"></span>;
  }

  return <span></span>;
};

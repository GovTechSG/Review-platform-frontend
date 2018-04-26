import React from 'react';

export default class MiniHelpText extends React.Component {
  render() {
    const classes = this.props.instruction === true ? 'ui-instructions-box' : 'info-text-box';

    return (
      <div className={classes} dangerouslySetInnerHTML={{ __html: this.props.content }} />
    );
  }
}

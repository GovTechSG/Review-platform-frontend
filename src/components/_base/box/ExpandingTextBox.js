import React from 'react';
import Ellipsis from '../../../helpers/ellipsis';

export default class ExpandingTextBox extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = { clicked: false };
  }

  render() {
    const { content, user } = this.props;
    const maxCharacter = 300;
    const reworkComments = this.props.reworkComments || '';

    return (
      <div>
        <div className="col-xs-4 col-sm-2">
          <div className="avatar">
            <i className="officer"> </i>
            <span className="avatar-display-name">{user}</span>
          </div>
        </div>
        <div className="col-xs-8 col-sm-10">
          <div className="chatbox">
            {(() => {
              if (content.length > maxCharacter) {
                if (this.state.clicked) {
                  return (
                    <div>
                      <div>{reworkComments}{content}</div>
                      <a className="link" onClick={this.onClick}>Show Less</a>
                    </div>
                  );
                }
                return (
                  <div>
                    <div>{reworkComments}{Ellipsis.formatText(content, maxCharacter)}</div>
                    <a className="link" onClick={this.onClick}>Show More</a>
                  </div>
                );
              }
              return <div>{reworkComments}{content}</div>;
            })()}
          </div>
        </div>
      </div>
    );
  }

  onClick() {
    this.setState({ clicked: !this.state.clicked });
  }
}

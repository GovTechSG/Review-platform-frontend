import React from 'react';
import ReadOnlyAccordionRowContainer from './ReadOnlyAccordionRowContainer';

export default class ReadOnlyAccordionContainer extends React.Component {

  render() {
    const data = this.props.data;

    const keypath = data._keyPath.join('_');

    const objectRows = data.map((ele, index) => {
      const key = `${keypath}-${index}-${ele.get('id')}`;
      const id = `${keypath}-${index}`;
      return <ReadOnlyAccordionRowContainer {...this.props} data={ele} key={key} id={id} index={index} />;
    });

    if (objectRows.size > 0) {
      return (
        <div>
        {objectRows}
        </div>
      );
    }

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <div className="col-xs-12">
            <div className="bgp-readonly">
              <span className="unfilled">nil</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

import React from 'react';
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';

export default class ReadOnlyAccordionRowContainer extends React.Component {
  render() {
    const id = this.props.id;
    const headerTitle = `${id}-title`;

    return (
        <div className="panel accordion-container">
          <div id={headerTitle} className="summary-panel-heading">
            <div className="row">
              <div>
                <AccordionHeader {...this.props} />
              </div>
            </div>
          </div>

          <div id={id} ref="field">
            <div className="panel-body">
              <AccordionBody {...this.props} />
            </div>
          </div>
        </div>
    );
  }
}

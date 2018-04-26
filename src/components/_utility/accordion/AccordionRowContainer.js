import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';

export default class AccordionRowContainer extends React.Component {
  static propTypes = {
    handleClick: React.PropTypes.func
  };

  static defaultProps = {
    handleClick() {}
  };

  componentDidMount() {
    if (this.props.accHeaderClass) {
      $(`#${this.props.accHeaderClass}`).find('.collapse-row.collapse').collapse('hide');
    } else {
      $('.collapse-row.collapse').collapse('hide');
    }
    const field = $(ReactDOM.findDOMNode(this.refs.field));
    if (this.props.expand === true) {
      field.collapse('show');
    }
  }

  componentDidUpdate() {
    const field = $(ReactDOM.findDOMNode(this.refs.field));
    if (this.props.mustExpandOne && this.props.expand === true) {
      field.collapse('show');
    }
  }

  render() {
    const id = this.props.id;
    const headerTitle = `${id}-title`;
    const href = `#${id}`;
    const collapse = this.props.noCollapse ? '' : 'collapse';

    const classes = classNames('panel-heading', { 'has-error': this.props.hasError });

    return (
      <div className="panel accordion-container">
        <div
          id={headerTitle}
          className={classes}
          data-toggle={collapse}
          href={href}
          onClick={this.props.handleClick}
        >
          <div className="row">
            <div>
              <AccordionHeader {...this.props} />
            </div>
          </div>
        </div>

        <div id={id} className="collapse-row collapse" ref="field">
          <div className="panel-body">
            <AccordionBody {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

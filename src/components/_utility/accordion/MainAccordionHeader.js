import React from 'react';
import classNames from 'classnames';

export default class MainAccordionHeader extends React.Component {
  constructor(props) {
    super();
    this.href = `#${props.href}`;
    this.handleClick = props.handleClick ? props.handleClick.bind(this) : () => null;
  }

  render() {
    const title = this.props.required ?
      `${this.props.title}<span class="mandatory-indicator">&nbsp;*</span>`
      : this.props.title;
    const classes = classNames(
      this.props.accordionHeaderClass,
      { collapsed: !this.props.expand },
      { 'has-error': this.props.hasError }
    );
    const accordionHeader = (
      <div className="row">
        <div className={classNames(`col-md-${this.props.rightText ? 6 : 11}`, 'col-xs-10')}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {
          this.props.rightText &&
          <div className="col-md-5 hidden-sm hidden-xs" dangerouslySetInnerHTML={{ __html: this.props.rightText }} />
        }
        <div className="col-md-1 col-xs-2">
          {
            (this.props.readOnly)
            ? ''
            : <div className="accordion-chevron pull-right" />
        }
        </div>
      </div>
    );
    return (
      <div>
        {(this.props.readOnly)
          ? <div className="main-accordion-header" id={this.props.id} href={this.href} onClick={this.handleClick}>
              {accordionHeader}
            </div>
          : <div className={classes} id={this.props.id} data-toggle="collapse" href={this.href}
            onClick={this.handleClick}
          >
              {accordionHeader}
            </div>
          }
      </div>
    );
  }
}

import React from 'react';
import classNames from 'classnames';
import MainAccordionHeader from './MainAccordionHeader';
import AccordionBody from './AccordionBody';
import Errors from '../../../helpers/errors';
import MiniHelpText from '../MiniHelpText';
import Label from '../../_base/typography/Label';
import { bindElementId } from '../../../helpers/element-id-decorator';

@bindElementId
export default class MainAccordionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.expanded = this.props.expand;
    this.getError = this.getError.bind(this);
  }

  render() {
    const id = this.props.idSuffix ? this.elementId(this.props.idSuffix) : this.elementId();
    const href = `${id}`;
    const headerId = `${id}-accordion-header`;
    const accordionBodyClasses = classNames(
      'collapse-row collapse', { 'panel-body': this.props.padded },
      { in: this.expanded }
    );
    return (
      <div className="accordion-container">
        <MainAccordionHeader
          {...this.props}
          hasError={this.getError()}
          id={headerId}
          title={this.props.title}
          rightText={this.props.headerRightText}
          href={href}
          expand={this.expanded}
          handleClick={this.handleRowClick.bind(this)}
          accordionHeaderClass={this.props.padded ? 'accordion-question-header' : 'main-accordion-header'}
        />
        <div id={id} className={accordionBodyClasses} ref="field">
          {this.props.subtitle && <Label content={this.props.subtitle} />}
          {this.props.helpText && <MiniHelpText content={this.props.helpText} />}
          <AccordionBody
            {...this.props}
            accHeaderClass={id}
            panelBody={this.props.accordionPanelBody}
          />
        </div>
      </div>
    );
  }

  getError() {
    if (this.props.errors) {
      return Errors.errorCountForSection(this.props.errors) > 0;
    }
    return this.props.error && this.props.error.deref();
  }

  handleRowClick() {
    this.expanded = !this.expanded;
  }
}

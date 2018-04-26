/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames';
import { bindElementId } from '../../../helpers/element-id-decorator';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import FieldAlert from '../../_utility/FieldAlert';

@immutablePure
@bindElementId
export default class Label extends React.Component {
  componentDidMount() {
    if ($('[data-toggle="popover"]').length !== 0) {
      $('[data-toggle="popover"]').popover({ trigger: 'hover' });
    }
  }

  render() {
    const id = this.props.id || 'label';
    const alertId = `${id}-alert`;
    return (
      <div>
        {
          this.props.tooltipTitle ?
          this.getLabelHtmlWithTooltip()
          : this.getLabelHtml()
        }
        {this.props.error ? <FieldAlert id={alertId} type="error" content={this.props.error.deref()} /> : ''}
      </div>
    );
  }

  getLabelHtmlWithTooltip() {
    const tooltipContent = `<p>${this.props.tooltipTitle}</p>`;
    return (
        <a className={'bgp-tooltip-link'}
          data-placement={'top'}
          data-html={'true'}
          data-container={'body'}
          data-toggle={'popover'}
          data-content={tooltipContent}
        >
              {this.getLabelHtml()}
        </a>
    );
  }

  getLabelHtml() {
    const htmlFor = this.props.htmlFor;
    const id = this.props.id;
    const classes = classNames('control-label bgp-label', this.props.classes);

    // &#42; is the escape character for *
    // labels with &#42; will be replaced with mandatory indicator
    // labels without &#42; will have mandatory indicator appended at the end
    let content = /&#42;/.test(this.props.content) ? this.props.content : `${this.props.content}&#42;`;
    // remove &#42; when props.required is false
    content = content.replace(/&#42;/, this.props.required ? '<span class="mandatory-indicator">&nbsp;*</span>' : '');

    return (
      <label
        htmlFor={htmlFor}
        className={classes}
        dangerouslySetInnerHTML={{ __html: content }}
        id={id}
      />
    );
  }
}

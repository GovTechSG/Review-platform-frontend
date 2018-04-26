import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Textarea from 'react-textarea-autosize-fork-slorber';
import Label from '../_base/typography/Label';


export default class RatingScale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSelection: 6,
      commentSection: false
    };
  }

  render() {
    const currentSelectedValue = this.state.activeSelection;
    const classes = classNames('form-control bgp-textarea', { 'has-error': '' });
    return (
      <div>
        {this.props.questionTitle ? <p>{this.props.questionTitle}</p> : '' }
          <ul className="rateMe">
            {_.times(6, i =>
              <li onClick={() => { this.onUpdateValue(i); }} className={currentSelectedValue === i ?
                'active' : null}
              >{i + 1}
              </li>
            )}
          </ul>
        {
          this.state.commentSection ?
          <div style={{ marginBottom: '10px' }}>
            <Label content={'Additional Comments'} id={'id'} htmlFor={''} required />
            <Textarea
              className={classes}
              id={'id'}
              ref="field"
              onBlur={this.onBlur}
              onChange={this.onChange}
              onInput={this.onChange}
              placeholder={this.props.placeholder}
              minRows={3}
              maxRows={10}
              value={''}
              disabled={this.props.disabled}
            />
          </div>
          : ''
        }
      </div>
    );
  }

  onUpdateValue(value) {
    value <= 1 ?
    this.setState({ activeSelection: value, commentSection: true }) :
    this.setState({ activeSelection: value, commentSection: false });
  }
}

import React from 'react';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';
import { setSearchQuery } from '../../../flux/actions/Actions';
import { reduxStore } from '../../../flux/stores/Reducers';

@immutablePure
@bindElementId
export default class GoogleSearchField extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnEnter = this.handleOnEnter.bind(this);

    this.state = {
      value: ''
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleOnEnter(event) {
    if (event.key === 'Enter' && this.state.value !== '') {
      this.onClick();
    }
  }

  onClick() {
    const { value } = this.state;
    if (value !== '') {
      reduxStore.dispatch(setSearchQuery({ query: value, page: 0 }));
      browserHistory.push('/search');
      this.props.closeNav();
    }
  }

  render() {
    const id = 'google-search';
    const error = false;
    const containerClass = classNames('input-group');
    const placeholder = 'Search';

    const { value } = this.state;
    const classes = value ? classNames(
      'form-control bgp-textfield active',
      { 'has-error': error }
    ) : classNames(
      'form-control bgp-textfield',
      { 'has-error': error }
    );

    return (
      <div>
        <div className={containerClass}>
            <input type="text"
              id={id}
              className={classes}
              ref="field"
              placeholder={placeholder}
              value={value}
              onChange={this.handleChange}
              onKeyPress={this.handleOnEnter}
            />

            <span className="input-group-addon bgp-search-group-addon"
              onClick={this.onClick}
            >
               <span className="glyphicon search-logo"></span>
            </span>
        </div>
      </div>
    );
  }
}

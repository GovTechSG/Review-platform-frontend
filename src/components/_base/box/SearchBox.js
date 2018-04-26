/* eslint complexity: [2,7] */
/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import classNames from 'classnames';
import Immutable from 'immutable';
import Cursor from 'immutable/contrib/cursor';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId, getElementId } from '../../../helpers/element-id-decorator';
import Label from '../../_base/typography/Label';
import Store from '../../../flux/Store';
import Actions from '../../../flux/actions/ContactInfoActions';


@immutablePure
@bindElementId
export default class SearchBox extends React.Component {
  static defaultProps = {
    maxLength: 38,
    disabled: false
  };

  constructor(props) {
    super(props);
    this.state = { searchResults: '', showSearchList: false, pageCount: 1, tempResults: [] };
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
    this.formatNumber = this.formatNumber.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleOpenSearchList = this.handleOpenSearchList.bind(this);
    this.loadSearchResults = this.loadSearchResults.bind(this, null);
    this.enterPressed = this.enterPressed.bind(this);
  }

  componentDidUpdate() {
    document.body.addEventListener('click', this.handleOpenSearchList);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleOpenSearchList);
  }

  handleOpenSearchList(event) {
    if (event.target && event.target.id !== 'postal-row') {
      this.setState({ searchResults: '', showSearchList: !this.state.showSearchList, pageCount: 1, tempResults: [] });
    }
  }

  loadSearchResults(e, index) {
    if (this.state.searchResults) {
      const postal = this.refs.field.value;
      const block = this.state.searchResults[index].BLK_NO;
      const street = this.state.searchResults[index].ROAD_NAME;
      this.setState({ searchResults: '', showSearchList: false, tempResults: [] });
      const toDataKeyPath = this.props.data._keyPath.slice(0, -1);
      const fromCursor = Cursor.from(Immutable.fromJS({
        postal,
        street,
        block,
        level: '',
        unit: '',
        building_name: '',
        validated_postal: true
      }));
      Actions.copyAddress({ fromCursor, toDataKeyPath });
    }
    this.onBlur();
  }

  buildSearch(options) {
    return (<div className="Select-search-postal-menu">
         { this.buildRows(options) }
    </div>);
  }

  buildRows(options) {
    return options.map((option, index) => {
      return (
        <p id={'postal-row'}
          key={`postal-row-${index}`}
          onClick={this.loadSearchResults.bind(this, index)}
        >
            { option.BLK_NO } { option.ROAD_NAME }
        </p>
      );
    });
  }

  render() {
    const label = this.props.label;
    const required = this.props.required;
    const fieldId = getElementId(this.props.data);
    const labelId = getElementId(this.props.data, 'label');
    const data = this.props.data;
    const value = this.props.data.deref();
    const inputValue = value === null ? '' : value;
    const error = this.props.error.deref();
    const readOnly = this.props.readOnly;
    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;
    const postalId = `${id}-postal`;
    const classes = classNames(
      'form-control bgp-textfield',
      { 'has-error': error }
    );
    const containerClass = classNames('input-group');
    const maxLength = this.props.maxLength;
    const searchResultRows = this.state.searchResults && this.buildSearch(this.state.searchResults);
    const showSearchList = this.state.showSearchList;

    return (
      <div>
        <Label id={labelId}
          content={label}
          htmlFor={fieldId}
          required={required}
        />
        <div className={containerClass}>
            <input type="text"
              id={id}
              className={classes}
              ref="field"
              value={inputValue}
              placeholder={this.props.placeholder}
              maxLength={maxLength}
              readOnly={readOnly}
              onBlur={this.handleBlur}
              disabled={this.props.disabled}
              onChange={this.formatNumber}
              onKeyPress={this.enterPressed}
              onInput={this.formatNumber}
            />

            <span id={postalId} className="input-group-addon bgp-search-group-addon"
              onClick={() => { this.onSearch(data.deref()); }}
            >
               <span className="glyphicon glyphicon-search search-icon-logo"></span>
            </span>
        </div>

        {error && <FieldAlert id={alertId} type="error" content={error} />}
        { showSearchList && searchResultRows }
      </div>
    );
  }

  formatNumber() {
    if (this.refs && this.refs.field) {
      const value = this.refs.field.value;
      const isNegativeValue = value && value.indexOf('-') !== -1;
      const isInteger = value && value.indexOf('.') === -1;
      if (value === '' || !isNegativeValue && !isNaN(value) && isInteger) {
        this.callOneMapApi(value);
        this.onChange();
      }
    }
  }

  handleBlur(component) {
    this.onBlur(component);
  }

  enterPressed(event) {
    const code = event.key;
    if (code === 'Enter') {
      const postalCode = this.props.data.deref();
      this.callOneMapApi(postalCode);
      this.onChange();
      this.onBlur();
    }
  }

  onSearch(postalCode) {
    this.setState({ pageCount: 1, tempResults: [] });
    this.callOneMapApi(postalCode);
    this.onChange();
    this.onBlur();
  }

  callOneMapApi(postalCode) {
    const dataKeyPath = this.props.data._keyPath.slice(0, -1);
    this.setState({ searchResults: '', showSearchList: false });
    if (postalCode && postalCode.length === 6) {
      const url = `https://developers.onemap.sg/commonapi/search?searchVal=${postalCode}
      &returnGeom=Y&getAddrDetails=Y&pageNum=${this.state.pageCount}`;
      const transform = response => {
        const postal = postalCode;
        let street;
        let block;
        let validatedPostal = false;
        if (response.found > 0 && response.results && response.pageNum < response.totalNumPages) {
          validatedPostal = true;
          this.setState({
            pageCount: this.state.pageCount + 1,
            tempResults: this.state.tempResults.concat(response.results)
          });
          this.callOneMapApi(postal);
        } else if (response.found > 0 && response.results && response.pageNum >= response.totalNumPages) {
          validatedPostal = true;
          this.setState({
            pageCount: this.state.pageCount,
            tempResults: this.state.tempResults.concat(response.results)
          });
          const updatedResult = _.map(this.state.tempResults, addr => {
            const newAddr = addr;
            newAddr.BLK_NO = newAddr.ROAD_NAME && newAddr.BLK_NO === '' ? '--' : newAddr.BLK_NO;
            return newAddr;
          });
          const result = _.uniqBy(_.flatten(updatedResult), 'BLK_NO');
          const sortedResult = _.sortBy(result, 'BLK_NO');
          street = sortedResult[0].ROAD_NAME;
          block = sortedResult[0].BLK_NO;
          if (result.length > 1) {
            this.setState({ searchResults: sortedResult, showSearchList: true });
          }
        }
        return {
          data: {
            postal,
            street,
            block,
            level: '',
            unit: '',
            building_name: '',
            validated_postal: validatedPostal
          }
        };
      };
      Store.fetchJsonApi(url, transform, dataKeyPath, { skipHeader: true });
    } else {
      this.setState({ searchResults: '', showSearchList: false, tempResults: [], pageCount: 1 });
      Actions.clearCorrespondenceAddress(dataKeyPath);
    }
  }
}

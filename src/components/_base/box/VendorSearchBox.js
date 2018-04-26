import React from 'react';
import I18n from 'i18n';
import _ from 'lodash';
import classNames from 'classnames';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId, getElementId } from '../../../helpers/element-id-decorator';
import Label from '../../_base/typography/Label';
import Store from '../../../flux/Store';
import Actions from '../../../flux/actions/Common';
import FieldsToBeCleared from '../../../helpers/fields_to_be_cleared';
import { startSpinWithMsg, endSpinWithMsg } from '../../../helpers/spinner';

@immutablePure
@bindElementId
export default class VendorSearchBox extends React.Component {
  static defaultProps = {
    maxLength: 38,
    disabled: false,
    searchLength: 4
  };

  constructor(props) {
    super(props);
    this.state = { searchResults: '', showSearchList: false };
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
    this.handleChange = this.handleChange.bind(this);
    this.clearVendorUen = this.clearVendorUen.bind(this);
    this.clearVendorSearchBox = this.clearVendorSearchBox.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleOpenSearchList = this.handleOpenSearchList.bind(this);
    this.handleSearchResultClick = this.handleSearchResultClick.bind(this, null);
    this.handleNoRecordsRowClick = this.handleNoRecordsRowClick.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
    this.fieldsToClearNameUen = FieldsToBeCleared[props.clearVendorKey];
    this.handleFormClearFields = props.handleClearFields.bind(this);
    this.vendorKeyPath = props.vendorKeyPath;
    this.updateVendorUen = props.handleUpdateUen ? props.handleUpdateUen.bind(this) : () => null;
  }

  componentDidUpdate() {
    ['click', 'touchstart'].forEach(event => document.body.addEventListener(event, this.handleOpenSearchList));
  }

  componentWillUnmount() {
    ['click', 'touchstart'].forEach(event => document.body.removeEventListener(event, this.handleOpenSearchList));
  }

  handleOpenSearchList(event) {
    if (event.target && event.target.id !== 'vendor-row-name' &&
        event.target.id !== 'vendor-empty' && event.target.id !== 'vendor-row-uen' &&
        event.target.id !== 'vendor-row-sub') {
      this.setState({ searchResults: '', showSearchList: !this.state.showSearchList });
    }
  }

  clearVendorUen = _.throttle((component) => {
    let vendorData = component.props.data;
    vendorData._keyPath.pop(1);
    const uenKey = this.props.uenKey || 'vendor_uen';
    vendorData = vendorData.cursor(uenKey);
    Actions.syncGrant({ data: vendorData, error: component.props.error, value: '' });
  }, 2000, { trailing: false })

  clearVendorSearchBox() {
    const isDisabled = this.props.disabled || false;
    if (isDisabled) {
      return;
    }

    if (this.refs && this.refs.field) {
      this.handleFormClearFields(this.vendorKeyPath, this.fieldsToClearNameUen);
      this.clearVendorUen(this);
      this.handleBlur(this);
    }
  }

  // Below code will be handled to update selected value to result set with UEN
  handleSearchResultClick(e, index) {
    if (this.state.searchResults) {
      this.setState({ searchResults: '', showSearchList: false });
      const searchName = this.state.searchResults[index].vendor_name;
      const searchUen = this.state.searchResults[index].uen;
      Actions.syncGrant({ data: this.props.data, error: this.props.error, value: searchName });
      this.updateVendorUen(searchUen);
    }
    this.onBlur();
  }

  handleChange() {
    if (this.refs && this.refs.field) {
      this.onChange();
      this.clearVendorUen(this);
      this.setState({ searchResults: '', showSearchList: false });
    }
  }

  handleBlur(component) {
    this.onBlur(component);
  }

  enterPressed(event) {
    if (event && event.key === 'Enter') {
      this.onSearch(this.props.data.deref());
    }
  }

  onSearch(searchText) {
    const isDisabled = this.props.disabled || false;
    if (isDisabled) {
      return;
    }
    // rails do not allow percentage as it violates routes
    startSpinWithMsg(I18n.t('common.alert.spinner_message'));
    const filterSearchText = searchText.replace(/%/g, '');
    this.searchVendorUEN(filterSearchText);
    this.onChange();
  }

  searchVendorUEN(searchText) {
    const dataKeyPath = this.props.data._keyPath.slice(0, -1);
    this.setState({ searchResults: '', showSearchList: false });
    const url = `/api/v1/vendors/${searchText}`;
    if (searchText && searchText.length >= this.props.searchLength) {
      const transform = response => {
        endSpinWithMsg();
        this.setState({ searchResults: response, showSearchList: true });
        return {
          data: response
        };
      };
      Store.fetchJsonApi(url, transform, dataKeyPath, { skipHeader: true });
    } else {
      // To Do: Show Default row that no records found
      endSpinWithMsg();
      this.onBlur();
      this.setState({ searchResults: '', showSearchList: false });
    }
  }

  emptyRows() {
    const searchText = this.props.data && this.props.data.deref();
    const searchTextTitle = `${I18n.t('psg.project.vendor.no_records_text')} '${searchText}'`;
    return (
      <p id={'vendor-empty'}
        key={'vendor-empty-row-0'} onClick={this.handleNoRecordsRowClick.bind(this)}
      >
        {searchTextTitle}
      </p>
    );
  }

  handleNoRecordsRowClick() {
    if (this.props.data) {
      this.setState({ searchResults: '', showSearchList: false });
      let vendorData = this.props.data;
      vendorData._keyPath.pop(1);
      vendorData = vendorData.cursor('vendor_uen');
      Actions.syncGrant({ data: vendorData, error: this.props.error, value: '' });
    }
    this.onBlur();
  }

  buildSearchList(results) {
    return (<div className="propose-container">
      <div className="Select-search-vendor-menu">{ this.buildSearchRows(results) }</div>
    </div>);
  }

  buildSearchRows(results) {
    if (results.length > 0) {
      return results.map((result, index) => {
        return (
          <p id={'vendor-row-name'}
            key={`vendor-row-${index}`}
            className="vendor-row-name"
            onClick={this.handleSearchResultClick.bind(this, index)}
          >
            <span
              id={'vendor-row-sub'}
              key={`vendor-row-sub-${index}`}
              className="vendor-row-sub"
            >
            { result.vendor_name }
            </span>
            <span
              id={'vendor-row-uen'}
              key={`vendor-row-uen-${index}`}
              className="vendor-list-uen"
            >
            { result.uen }
            </span>
          </p>
        );
      });
    }
    return (this.emptyRows());
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
    const searchId = `${id}-vendor`;
    const classes = classNames(
      'form-control bgp-textfield',
      { 'has-error': error }
    );
    const containerClass = classNames('input-group');
    const maxLength = this.props.maxLength;
    const searchResultRows = this.state.searchResults && this.buildSearchList(this.state.searchResults);
    const showSearchList = this.state.showSearchList;
    return (
      <div className={'form-group'}>
        <Label id={labelId}
          content={label}
          htmlFor={fieldId}
          required={required}
        />
        <div className={'propose-container'}>
          <div className={containerClass}>
            <span className="Select-clear-zone vendorsearch-clearbtn"
              onClick={this.clearVendorSearchBox}
            >
              <span className="Select-clear">×</span>
            </span>
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
              onChange={this.handleChange}
              onKeyPress={this.enterPressed}
            />
            <span id={searchId} className="input-group-addon bgp-search-group-addon"
              onClick={() => { this.onSearch(data.deref()); }}
            >
              <span className="glyphicon glyphicon-search search-icon-logo"></span>
            </span>
          </div>
        </div>
        { showSearchList && searchResultRows }
        {error && <FieldAlert id={alertId} type="error" content={error} />}
      </div>
    );
  }
}

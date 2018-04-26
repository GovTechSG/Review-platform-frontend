/* eslint complexity: [2,7] */
/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import classNames from 'classnames';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId, getElementId } from '../../../helpers/element-id-decorator';
import Label from '../../_base/typography/Label';
import Store from '../../../flux/Store';
import Actions from '../../../flux/actions/ContactInfoActions';

@immutablePure
@bindElementId
export default class SearchField extends React.Component {
  static defaultProps = {
    maxLength: 38,
    disabled: false
  };

  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
    this.formatNumber = this.formatNumber.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
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
      </div>
    );
  }

  formatNumber() {
    if (this.refs && this.refs.field) {
      const value = this.refs.field.value;
      const isNegativeValue = value && value.indexOf('-') !== -1;
      const isInteger = value && value.indexOf('.') === -1;
      if (value === '' || !isNegativeValue && !isNaN(value) && isInteger) {
        this.onChange();
      }
    }
  }

  handleBlur(component) {
    this.onBlur(component);

    const postalCode = this.props.data.deref();
    this.callOneMapApi(postalCode);
  }

  enterPressed(event) {
    const code = event.key;
    if (code === 'Enter') {
      const postalCode = this.props.data.deref();
      this.callOneMapApi(postalCode);
      this.onChange();
    }
  }

  onSearch(postalCode) {
    this.callOneMapApi(postalCode);
    this.onChange();
  }

  callOneMapApi(postalCode) {
    const dataKeyPath = this.props.data._keyPath.slice(0, -1);
    const errorKeyPath = this.props.error._keyPath.slice(0, -1);

    if (postalCode.length === 6) {
      const url = `https://developers.onemap.sg/commonapi/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y`;
      const transform = response => {
        const postal = postalCode;
        let street = '';
        let block = '';
        let validatedPostal = false;
        if (response.found > 0 && response.results[0]) {
          Actions.clearCorrespondenceAddressError(errorKeyPath);
          street = response.results[0].ROAD_NAME;
          block = response.results[0].BLK_NO;
          validatedPostal = true;
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
      Actions.clearCorrespondenceAddress(dataKeyPath);
    }
  }
}

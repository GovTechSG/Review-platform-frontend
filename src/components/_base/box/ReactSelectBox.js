import React from 'react';
import I18n from 'i18n';
import Select from 'react-select-plus';
import classNames from 'classnames';
import Label from '../typography/Label';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';
import FieldAlert from '../../_utility/FieldAlert';

@immutablePure
@bindElementId
export default class ReactSelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.onChange = props.onChange ? props.onChange.bind(null, this) : () => null;
  }

  render() {
    const label = this.props.label;
    const required = this.props.required;
    const fieldId = this.props.id || this.elementId();
    const labelId = `${fieldId}-label`;
    const alertId = `${fieldId}-alert`;
    const placeHolder = this.props.placeHolder;
    const multiple = this.props.multi || false;
    const resetValue = (multiple ? [] : '');
    const error = this.props.error.deref();
    const classes = classNames('', { 'has-error': error });
    const optionsArr = this.transformOptions(this.props.options);
    const formatFieldId = this.formatFieldId;
    return (
      <div className="form-horizontal">
        <div className="form-group">
          {
            label && (
              <div className="col-sm-6">
                <Label id={labelId} content={label} htmlFor={fieldId} required={required} />
              </div>
            )
          }

          <div className={label ? 'col-sm-6' : 'col-sm-12'}>
            <Select
              {...this.props}
              instanceId={formatFieldId(fieldId)}
              className={classes}
              ref="field"
              placeholder={placeHolder}
              onChange={o => this.onChange({ value: multiple ? o.map(obj => obj.value) : o.value })}
              onBlur={this.onBlur}
              options={optionsArr}
              resetValue={resetValue}
            />
            {
              error && <FieldAlert id={alertId} type="error" content={error} />
            }
          </div>
        </div>
      </div>
    );
  }

  formatFieldId(fieldId) {
    return fieldId.indexOf('react-') >= 0 ? fieldId.substring(6) : fieldId;
  }

  transformOptions(arr) {
    if (Array.isArray(arr) && arr[0]) {
      return arr[0].hasOwnProperty('label') ? arr : arr.map((val) => { return ({ value: val, label: val }); });
    }
    return arr;
  }
}

ReactSelectBox.defaultProps = {
  placeHolder: I18n.t('common.react_select_box.placeholder')
};

import React from 'react';
import I18n from 'i18n';
import classNames from 'classnames';
import moment from 'moment';
import Datetime from 'react-datetime';
import { Glyphicon } from 'react-bootstrap';
import Actions from '../../../flux/actions/Common';
import FieldAlert from '../../_utility/FieldAlert';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';
import Validations from '../../../helpers/validations';

@immutablePure
@bindElementId
export default class DateField extends React.Component {
  constructor(props) {
    super(props);
    this.onBlur = props.onBlur ? props.onBlur.bind(null, this) : () => null;
    this.amChange = this.amChange.bind(this);
  }

  amChange(value) {
    const date = moment(value, this.props.dateFormat, true);
    const parsedDate = date.isValid() ? date.format(this.props.dateFormat) : '';

    this.props.fromCompany
      ? this.props.onChange({ props: { ...this.props }, rawValue: parsedDate })
      : Actions.syncGrant({ data: this.props.data, error: this.props.error, value: parsedDate });

    // we want "end_date" AsyncGrant to be called when we change "start_date",
    // so we are passing the "onCombinedDateChange" event from parent to
    // trigger the end_date AsyncGrant
    if (this.props.onCombinedDateChange) {
      this.props.onCombinedDateChange();
    }

    this.onBlur();
  }

  isPickableDate(date) {
    const minDate = this.props.minDate ? moment(this.props.minDate, this.props.dateFormat) : null;
    const maxDate = this.props.maxDate ? moment(this.props.maxDate, this.props.dateFormat) : null;

    if (minDate && maxDate) {
      return date.isBetween(minDate, maxDate, null, '[]');
    }

    if (minDate) {
      return date.isSameOrAfter(minDate);
    }

    if (maxDate) {
      return date.isSameOrBefore(maxDate);
    }

    return true;
  }

  getValue() {
    if (this.props.data.deref()) {
      return moment(this.props.data.deref(), this.props.dateFormat);
    }

    if (this.props.initialDate) {
      return moment(this.props.initialDate, this.props.dateFormat);
    }

    return '';
  }

  clearDateField() {
    // Using forceUpdate because inputValue is cleared when date is invalid but not rerendered
    this.refs.field.state.inputValue = '';
    this.forceUpdate();
  }

  render() {
    const refField = this.refs.field;
    const inputValue = refField && refField.state && refField.state.inputValue;

    const isNotADate =
      inputValue !== undefined && inputValue !== '' &&
      !Validations.isDateValid(inputValue, this.props.dateDisplayFormat, true) &&
      !Validations.isDateValid(this.props.data.deref(), this.props.dateFormat, true);
    const error = isNotADate ? I18n.t('custom_errors.DTE003') : this.props.error.deref();

    const id = this.props.id || this.elementId();
    const alertId = `${id}-alert`;
    const classes = classNames('bgp-textfield form-control', { 'has-error': error });

    const iconClass = classNames('bgp-datefield-icon input-group-addon bgp-input-group-addon',
                                 { 'has-error': error });

    const disabled = this.props.disabled;
    const centerText = this.props.centerText;
    const styles = { 'border-radius': '0 4px 4px 0' };
    if (centerText) { styles['text-align'] = 'center'; }

    return (
      <div>
        <div className="input-group date">
          <span
            className={iconClass}
            onClick={() => { this.refs.field.openCalendar && this.refs.field.openCalendar(); }}
          >
            {this.props.icon}
          </span>

          <Datetime
            closeOnSelect
            closeOnTab
            dateFormat={this.props.dateDisplayFormat}
            defaultValue={this.getValue()}
            inputProps={{ id, placeholder: `eg. ${moment().format(this.props.dateDisplayFormat)}`,
              className: classes, style: styles, disabled }}
            isValidDate={this.isPickableDate.bind(this)}
            onBlur={this.onBlur}
            onChange={this.amChange}
            ref="field"
            timeFormat={false}
          />
        </div>

        {error ? <FieldAlert id={alertId} type="error" content={error} /> : ''}
      </div>
    );
  }
}

DateField.defaultProps = {
  dateFormat: 'YYYY-MM-DD',
  dateDisplayFormat: 'DD MMM YYYY',
  icon: <Glyphicon glyph="calendar" />,
  disabled: false
};

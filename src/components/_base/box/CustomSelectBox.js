import React from 'react';
import SelectBox from '../../_base/box/SelectBox';
import TextBox from '../../_base/box/TextBox';
import immutablePure from '../../../helpers/immutable-pure-decorator';
import { bindElementId } from '../../../helpers/element-id-decorator';

@immutablePure
@bindElementId
export default class CustomSelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.customSelectBoxChange = this.customSelectBoxChange.bind(this);
    this.state = { isCustom: props.data.deref() && !~props.options.indexOf(props.data.deref()) };
  }

  customSelectBoxChange(component, event) {
    const e = event;
    if (e.val === 'Others') {
      this.setState({ isCustom: true });
      e.val = '';
    } else {
      this.setState({ isCustom: false });
    }
    this.props.onSelectFieldChange(component, e);
  }

  render() {
    const { data, error, label, otherLabel, maxLength } = this.props;
    const options = this.props.options
      .concat([{ display: 'Others', value: this.state.isCustom && data.deref() || 'Others' }]);

    return (
      <div>
        <SelectBox
          data={(this.state.isCustom && data.deref() === '') ? { ...data, deref: () => 'Others' } : data}
          error={this.state.isCustom ? { ...error, deref: () => null } : error}
          label={label}
          options={options}
          id={this.elementId('select')}
          onChange={this.customSelectBoxChange}
          onBlur={this.props.onBlur}
          hideSearch
          required
        />
        {
          this.state.isCustom &&
          <TextBox
            data={data}
            error={error}
            label={otherLabel}
            required
            maxLength={maxLength}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
          />}
      </div>
    );
  }
}

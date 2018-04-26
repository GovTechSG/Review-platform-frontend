import React from 'react';
import TextField from '../../_base/fields/TextField';
import NumberField from '../../_base/fields/NumberField';
import Label from '../../_base/typography/Label';
import { getElementId } from '../../../helpers/element-id-decorator';

export default function AddressTextBox(props) {
  const label = props.label;
  const required = props.required;
  const fieldId = getElementId(props.data);
  const labelId = getElementId(props.data, 'label');

  return (
    <div>
      <div className="col-xs-12 bgp-no-padding">
        <Label id={labelId}
          content={label}
          htmlFor={fieldId}
          required={required}
        />
      </div>

      <div className="col-xs-12 bgp-no-padding">
        {
          props.name === 'postal' ?
            <NumberField {...props} id={fieldId} />
            :
            <TextField {...props} id={fieldId} />
        }
      </div>
    </div>
  );
}

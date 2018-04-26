/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import BaseBox from '../../BaseBox';
import CheckBoxField from '../../_base/fields/CheckBoxField';
import immutablePure from '../../../helpers/immutable-pure-decorator';

@immutablePure
export default class CheckBoxBox extends BaseBox {
  render() {
    return (
          <CheckBoxField {...this.props} ref="checkBoxField" />
    );
  }
}

import HalfWidthLabel from './HalfWidthLabel';
import { formatCurrency, roundDown } from '../../../helpers/calculations';

export default class ReadOnlyCurrencyField extends HalfWidthLabel {
  formatValue() {
    return formatCurrency(roundDown(this.props.value, 2));
  }
}

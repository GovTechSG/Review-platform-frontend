import React from 'react';
import AccordionRowContainer from './AccordionRowContainer';
import AddNestedBtn from '../../_base/buttons/AddNestedBtn';
import { bindElementId } from '../../../helpers/element-id-decorator';
import Errors from '../../../helpers/errors';

@bindElementId
export default class AccordionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.objectRows = null;
    this.accHeaderClass = props.accHeaderClass ? props.accHeaderClass : '';
    this.rowExpandedStates = {};
  }

  componentDidMount() {
    this.expandOneLocationRow();
  }

  static propTypes = {
    minimum: React.PropTypes.number,
    maximum: React.PropTypes.number,
    addItemLabel: React.PropTypes.string
  };

  render() {
    const minimum = this.props.minimum;
    const maximum = this.props.maximum;
    const addItemLabel = this.props.addItemLabel || 'Add New Item';
    const data = this.props.data;
    const keypath = this.elementId();
    const canRemove = data.size > minimum;
    const mustExpandOne = data.size === 1;
    data.size === 1 ? this.rowExpandedStates[`${keypath}-${0}`] = true : '';

    this.objectRows = data
      .valueSeq()
      .map((ele, index) => {
        const key = `${keypath}-${index}-${ele.get('id')}`;
        const id = `${keypath}-${index}`;
        const error = this.props.errors.cursor(ele.get('id').toString());
        const ongoingTasks = this.props.ongoingTasks && this.props.ongoingTasks.cursor(index);
        const fixedRow = ele.has('fixed_row') && ele.get('fixed_row');
        // * Store expansion state by ID so handleClick callback can expand newly created
        //   row without knowing the row's key (hackish).
        // * Do not store as a state key to avoid rerender on setState whenever expansion status changes
        // * Row expansion itself is handled by bootstrap
        let hasError = false;
        if (error.deref() !== undefined) {
          hasError = Errors.errorCountForSection(error.deref()) > 0;
        }
        const expand = hasError ? true : fixedRow || !!this.rowExpandedStates[id];
        return (
          <AccordionRowContainer
            {...this.props}
            hasError={hasError}
            index={index}
            data={ele}
            error={error}
            ongoingTasks={ongoingTasks}
            canRemove={!fixedRow && canRemove}
            handleClick={this.handleRowClick.bind(this, id)}
            expand={expand}
            key={key}
            id={id}
            mustExpandOne={mustExpandOne}
          />
        );
      });

    const shouldRenderAddBtn = data.size < maximum;

    return (
      <div id={keypath}>
        {this.objectRows}
          {
            (shouldRenderAddBtn)
            ? <AddNestedBtn
              label={addItemLabel}
              onClick={this.handleClick}
              id={`${keypath}-add-item`}
              data={data}
              disabled={this.props.disableAddButton}
            />
            : ''
          }
      </div>
    );
  }

  handleRowClick(key) {
    this.rowExpandedStates[key] = !this.rowExpandedStates[key];
  }

  handleClick() {
    if (this.props.addResource) {
      this.props.addResource(this);
    }
    const prefix = `${this.accHeaderClass}-${this.objectRows.size}`;
    const suffix = `${this.accHeaderClass}-${this.objectRows.size - 1}`;
    const titleId = `#${prefix}-title`;
    const rowId = `#${prefix}`;
    this.rowExpandedStates[prefix] = true;
    this.rowExpandedStates[suffix] = false;

    function removeAnimation() {
      $(titleId).parent().removeClass('Apulse');
    }

    function scrollAccordion() {
      if ($(titleId).length > 0 && $(rowId).length > 0) {
        $(rowId)
          .find('textarea, input')
          .first()
          .focus();
        const aHeight = $(titleId).offset().top - 120;
        $('html, body').animate({ scrollTop: aHeight }, 300);
        $(titleId).parent().addClass('Apulse');
        setTimeout(removeAnimation, 1000);
      }
    }

    setTimeout(scrollAccordion, 700);
  }

  expandOneLocationRow() {
    if (this.props.addResource && this.props.data.size === 0 && this.props.autoExpandLocation) {
      this.props.addResource(this);
      this.rowExpandedStates[`${this.elementId()}-${0}`] = true;
    }
  }
}


AccordionContainer.defaultProps = { minimum: 0, maximum: 10, disableAddButton: false };

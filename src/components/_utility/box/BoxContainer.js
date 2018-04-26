import React from 'react';
import BoxHeader from './BoxHeader';
import BoxBody from './BoxBody';
import AddNestedBtn from '../../_base/buttons/AddNestedBtn';
import { bindElementId } from '../../../helpers/element-id-decorator';
import pureImmutableRender from '../../../helpers/immutable-pure-decorator';

@pureImmutableRender
@bindElementId
export default class BoxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.objectRows = null;
  }

  static propTypes = {
    minimum: React.PropTypes.number,
    maximum: React.PropTypes.number,
    addItemLabel: React.PropTypes.string
  };

  render() {
    const minimum = this.props.minimum;
    const maximum = this.props.maximum;
    const addItemLabel = this.props.addItemLabel || 'Add Item';
    const data = this.props.data;
    const keypath = this.elementId();
    const canRemove = data.size > minimum;

    this.objectRows = data
      .valueSeq()
      .map((ele, index) => {
        const key = `${keypath}-${index}-${ele.get('id')}`;
        const id = `${keypath}-${index}`;
        const error = this.props.errors.cursor(ele.get('id').toString());
        // * Store expansion state by ID so handleClick callback can expand newly created
        //   row without knowing the row's key (hackish).
        // * Do not store as a state key to avoid rerender on setState whenever expansion status changes
        // * Row expansion itself is handled by bootstrap
        return (
          <div className="form-group" key={key}>
            <BoxBody
              {...this.props}
              index={index}
              data={ele}
              error={error}
              canRemove={canRemove}
              id={id}
            />
          </div>
        );
      });

    return (
      <div id={keypath}>
        {
          data.size > 0
            ? <div className="panel accordion-container">
            <div className="panel-heading">
              <div className="row">
                <div>
                  <BoxHeader {...this.props} />
                </div>
              </div>
            </div>
            <div className="panel-body form-horizontal">
              {this.objectRows}
            </div>
          </div>
            : ''
        }
        {
          data.size < maximum
            ? <AddNestedBtn
              label={addItemLabel}
              onClick={this.handleClick}
              id={`${keypath}-add-item`}
              data={data}
            />
            : ''
        }
      </div>
    );
  }

  handleClick() {
    if (this.props.addResource) {
      this.props.addResource(this);
    }
  }
}

BoxContainer.defaultProps = { minimum: 1, maximum: 10 };

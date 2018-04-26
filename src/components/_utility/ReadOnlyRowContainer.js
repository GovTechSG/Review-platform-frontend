import React from 'react';
import pureImmutableRender from '../../helpers/immutable-pure-decorator';
import { getElementId } from '../../helpers/element-id-decorator';

@pureImmutableRender
export default class ReadOnlyRowContainer extends React.Component {

  render() {
    const row = this.props.row;
    const columnKeys = this.props.columnKeys;
    const rows = columnKeys.map((columnKey) => {
      return (
        columnKeys.includes(columnKey)
        ? <td id={getElementId(row.cursor(columnKey))} key={`rowContainer-${columnKey}`}>
            {row.cursor(columnKey).deref()}
          </td>
        : null
      );
    });

    return (
      <tr className="bgp-readonly">
        {rows}
      </tr>
    );
  }
}

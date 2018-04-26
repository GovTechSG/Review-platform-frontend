import React from 'react';
import ReadOnlyRowContainer from './ReadOnlyRowContainer';
import pureImmutableRender from '../../helpers/immutable-pure-decorator';

@pureImmutableRender
export default class ReadOnlyBoxContainer extends React.Component {
  render() {
    const rows = this.props.data;
    const headerTitles = this.props.headerTitles;
    const columnKeys = this.props.columnKeys;
    const className = this.props.className;

    const headerRows = headerTitles.map((headerTitle, index) => {
      return <th key={`headerTitle-${index}`}>{headerTitle}</th>;
    });

    const bodyRows = rows.valueSeq().map((row, index) => {
      return <ReadOnlyRowContainer key={`containerRow-${index}`} row={row} columnKeys={columnKeys} />;
    });

    return (
        <div>
          <table className={className}>
            <thead>
            <tr>
              {headerRows}
            </tr>
            </thead>
            <tbody>
              {bodyRows}
            </tbody>
          </table>
        </div>
    );
  }
}

import React from 'react';

export default class ColumnManager {
  pCached = {};

  constructor(columns, elements) {
    this.columns = columns || this.normalize(elements);
  }

  isAnyColumnsFixed = () => this.cached('isAnyColumnsFixed', () =>
      this.columns.some(column => !!column.fixed));


  isAnyColumnsLeftFixed() {
    return this.cached('isAnyColumnsLeftFixed', () => this.columns.some(
        column => column.fixed === 'left' || column.fixed === true
      ));
  }

  isAnyColumnsRightFixed() {
    return this.cached('isAnyColumnsRightFixed', () => this.columns.some(
        column => column.fixed === 'right'
      ));
  }

  leftColumns() {
    return this.cached('leftColumns', () => this.groupedColumns().filter(
        column => column.fixed === 'left' || column.fixed === true
      ));
  }

  rightColumns() {
    return this.cached('rightColumns', () => {
      return this.groupedColumns().filter(
        column => column.fixed === 'right'
      );
    });
  }

  leafColumns() {
    return this.cached('leafColumns', () =>
      this.leafColumnsBase(this.columns)
    );
  }

  leftLeafColumns() {
    return this.cached('leftLeafColumns', () =>
      this.leafColumnsBase(this.leftColumns())
    );
  }

  rightLeafColumns() {
    return this.cached('rightLeafColumns', () =>
      this.leafColumnsBase(this.rightColumns())
    );
  }

  // add appropriate rowspan and colspan to column
  groupedColumns() {
    return this.cached('groupedColumns', () => {
      const groupColumns = (columns, currentRow = 0, parentColumn = {}, rows = []) => {
        // track how many rows we got
        const parentC = parentColumn;
        const parentRow = rows;
        const columnsF = columns;
        parentRow[currentRow] = rows[currentRow] || [];
        const grouped = [];
        const setRowSpan = column => {
          const rowSpan = rows.length - currentRow;
          if (column &&
            !column.children && // parent columns are supposed to be one row
            rowSpan > 1 &&
            (!column.rowSpan || column.rowSpan < rowSpan)
          ) {
              columnsF.rowSpan = rowSpan;
          }
        };
        columnsF.forEach((column, index) => {
          const newColumn = { ...column };
          rows[currentRow].push(newColumn);
            parentC.colSpan = parentC.colSpan || 0;
          if (newColumn.children && newColumn.children.length > 0) {
            newColumn.children = groupColumns(newColumn.children, currentRow + 1, newColumn, rows);
              parentC.colSpan += newColumn.colSpan;
          } else {
              parentC.colSpan += 1;
          }
          // update rowspan to all same row columns
          for (let i = 0; i < rows[currentRow].length - 1; i += 1) {
            setRowSpan(rows[currentRow][i]);
          }
          // last column, update rowspan immediately
          if (index + 1 === columns.length) {
            setRowSpan(newColumn);
          }
          grouped.push(newColumn);
        });
        return grouped;
      };
      return groupColumns(this.columns);
    });
  }

  normalize(elements) {
    const columns = [];
    React.Children.forEach(elements, element => {
      if (!React.isValidElement(element)) {
        return;
      }
      const column = { ...element.props };
      if (element.key) {
        column.key = element.key;
      }
      if (element.type.isTableColumnGroup) {
        column.children = this.normalize(column.children);
      }
      columns.push(column);
    });
    return columns;
  }

  reset(columns, elements) {
    this.columns = columns || this.normalize(elements);
    this.pCached = {};
  }

  cached(name, fn) {
    if (name in this.pCached) {
      return this.pCached[name];
    }
    this.pCached[name] = fn();
    return this.pCached[name];
  }

  leafColumnsBase(columns) {
    const leafColumns = [];
    columns.forEach(column => {
      if (!column.children) {
        leafColumns.push(column);
      } else {
        leafColumns.push(...this.leafColumnsBase(column.children));
      }
    });
    return leafColumns;
  }
}

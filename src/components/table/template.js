import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

// Алфавит от А до Z
const CODES = {
  A: 65,
  Z: 90
};

function getWidth(state, index) {
  return state[index] ? `width: ${state[index]}px` : '';
}

function getHeight(state, index) {
  return state[index] ? `height: ${state[index]}px` : '';
}

function toCell(store, row) {
  return function(_, col) {
    const width = getWidth(store.colState, col);
    const id = `${row}:${col}`;
    const data = store.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...store.stylesState[id]
    });
    return `<div class="cell" 
                  contenteditable  
                  data-col="${col}" 
                  data-type="cell"
                  data-id="${id}"
                  data-value="${data || ''}"
                  style="${styles + width}"
                  >${parse(data) || ''}</div>`;
  };
}

function toColumn({col, index, width}) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, defaultHeight) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable" data-row="${index}" style="${defaultHeight}">
        <div class="row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

// Парсим кодированную алфавит
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(store) {
  return function(col, index) {
    return {
      col, index, width: getWidth(store.colState, index)
    };
  };
}

export function createTable(rowsCount = 15, store = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  // Рисуем Алфавит на фронте
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(store))
      .map(toColumn)
      .join('');
  rows.push(createRow(null, cols, null));


  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(store, row))
        .join('');
    rows.push(createRow(row + 1, cells, getHeight(store.rowState, row + 1)));
  }

  return rows.join('');
}

// Алфавит от А до Z
const CODES = {
  A: 65,
  Z: 90
};

// Вариант 1
// function toCell(_, col) {
//   return `
//     <div class="cell" contenteditable data-col="${col}"></div>
//   `;
// }
// Вариант 2
function toCell(row) {
  return function(_, col) {
    return `<div class="cell" 
                  contenteditable  
                  data-col="${col}" 
                  data-type="cell"
                  data-id="${row}:${col}"
                  ></div>`;
  };
}

function toColumn(el, col) {
  return `
    <div class="column" data-type="resizable" data-col="${col}">
        ${el}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  // Рисуем Алфавит на фронте
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');
  rows.push(createRow(null, cols));


  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        // Вариант 1
        // .map((_, col) => toCell(row, col))
        // Вариант 2
        .map(toCell(row))
        .join('');
    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}

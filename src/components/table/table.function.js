import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}
export function isCell(event) {
  return event.target.dataset.type === 'cell';
}
export function matrix($target, $current) {
  const target = $target.id(true); // 0:0 => {col: 0, row: 0}
  const current = $current.id(true); // 0:3 => {col: 0, row: 3}
  const cols = range(current.col, target.col); // [0, 1, 2, 3]
  const rows = range(current.row, target.row); // []
  return cols.reduce((newArr, col) => {
    rows.forEach(row => newArr.push(`${row}:${col}`));
    return newArr;
  }, []); // [] => ['0:0', '0:1', '0:2', '2:0', '2:1', '2:2']
}
export function nextSelecter(key, {col, row}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col--;
      break;
    case 'ArrowUp':
      row--;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}

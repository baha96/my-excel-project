import {ExcelComponents} from '@core/ExcelComponents';
import {createTable} from '@/components/table/template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelecter, shouldResize} from '@/components/table/table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponents {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', txt => {
      this.selection.current.text(txt);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  toHTML() {
    return createTable(20);
  }
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelecter(key, id));
      if ($next.isNotEmpty()) this.selectCell($next);
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }
}


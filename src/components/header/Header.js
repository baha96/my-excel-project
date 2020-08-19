import {ExcelComponents} from '@core/ExcelComponents';
import {$} from '@core/dom';
import {changeTitle} from '@/store/action';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';

export class Header extends ExcelComponents {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }
  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
    <input type="text" class="input" value="${title}"/>
    <div>
        <div class="button">
            <span class="material-icons">delete</span>
        </div>
        <div class="button">
            <span class="material-icons">exit_to_app</span>
        </div>
    </div>
`;
  }
  onInput(e) {
    console.log(e.target);
    const $target= $(e.target);
    this.$dispatch(changeTitle($target.text()));
  }
}

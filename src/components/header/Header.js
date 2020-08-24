import {ExcelComponents} from '@core/ExcelComponents';
import {$} from '@core/dom';
import {changeTitle} from '@/store/action';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Header extends ExcelComponents {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
        <div class="button" data-button="delete">
            <span class="material-icons" data-button="delete">delete</span>
        </div>
        <a href="#/" class="button">
            <span class="material-icons">exit_to_app</span>
        </a>
    </div>
`;
  }
  onInput(e) {
    const $target= $(e.target);
    this.$dispatch(changeTitle($target.text()));
  }
  onClick(e) {
    const $target = $(e.target);
    if ($target.data.button === 'delete') {
      const decision = confirm('Вы действительно хотите удалить таблицу?');
      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    }
  }
}

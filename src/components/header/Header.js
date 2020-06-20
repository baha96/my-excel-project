import {ExcelComponents} from '@core/ExcelComponents';

export class Header extends ExcelComponents {
  static className = 'excel__header';
  toHTML() {
    return `
    <input type="text" class="input" value="Новая таблица"/>
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
}

import {DomListener} from '@core/DomListener';

export class ExcelComponents extends DomListener {
  // Возвращает  шаблон компонента
  constructor($root, options = {}) {
    super($root, options.listeners);
  }
  toHTML() {
    return '';
  }
  init() {
    this.initDomListeners();
  }
}

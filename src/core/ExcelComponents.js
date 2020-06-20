import {DomListener} from '@core/DomListener';

export class ExcelComponents extends DomListener {
  // Возвращает  шаблон компонента
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
  }
  toHTML() {
    return '';
  }
  init() {
    this.initDomListeners();
  }
  destroy() {
    this.removeDomListeners();
  }
}

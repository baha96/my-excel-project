import {ExcelComponents} from '@core/ExcelComponents';

export class ExcelStateComponent extends ExcelComponents {
  constructor(...args) {
    super(...args);
  }

  get template() {
    return JSON.stringify(this.store, null, 2);
  }
  initState(initialStore) {
    this.store = {...initialStore};
  }
  setState(newStore) {
    this.store = {...this.store, ...newStore};
    this.$root.html(this.template);
  }
}

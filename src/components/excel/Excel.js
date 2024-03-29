import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import * as actions from '@/store/action';

export class Excel {
  // selector это - #app
  // options это обьект в котором есть components
  constructor(options) {
    this.components = options.components || [];
    this.emitter = new Emitter();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    };
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  init() {
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
    this.store.dispatch(actions.apllyLastVisit());
  }
  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}

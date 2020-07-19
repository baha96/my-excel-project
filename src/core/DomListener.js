import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('Не найден $root');
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  initDomListeners() {
    // console.log('initDomListeners listeners', this.listeners, this);
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) throw new Error(`Не создан метод ${method} в компоненте ${this.name}`);

      this[method] = this[method].bind(this);
      // Тоже самое что и addEventListener
      this.$root.on(listener, this[method]);
    });
  }
  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

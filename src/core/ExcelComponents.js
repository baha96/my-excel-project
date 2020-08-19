import {DomListener} from '@core/DomListener';

export class ExcelComponents extends DomListener {
  // Возвращает  шаблон компонента
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  // Выполняется до инициализации init()
  // то есть как во vue метод BeforeCreate
  // Настраиваем наш компонент до init()
  prepare() {}

  // возвращаем шаблон компонента
  toHTML() {
    return '';
  }

  // уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Сюда приходят только изменения по тем полям,
  // на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }
  // Инициализируем компонент
  // Добавляем ДОМ слушателей
  init() {
    this.initDomListeners();
  }

  // Удаляем компонент
  // чистим слушателей
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}

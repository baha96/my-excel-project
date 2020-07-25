export class Emitter {
  constructor() {
    this.listener = {};
  }

  // dispatch, trigger
  // Будем уведомлять, слушателей если он есть
  // event => 'table.select' || table.emit('table.select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listener[event])) {
      return false;
    }
    this.listener[event].forEach(listener => {
      listener(...args);
    });
    return true; // это не обязательно но для проверки
  }

  // on, listen
  // Подписываемся на уведомление
  // добавляем нового слушателя(подписчика)
  // formula.subscribe('table.select', () => {})
  subscribe(event, fn) {
    this.listener[event] = this.listener[event] || [];
    this.listener[event].push(fn);
    return () => this.unsubscribe(event, fn);
  }
  unsubscribe(event, fn) {
    this.listener[event] = this.listener[event].filter(listener => listener !== fn);
  }
}

// Example
// const emitter = new Emitter();
// emitter.subscribe('baha', data => console.log('sub', data));
// emitter.emit('baha', 15);
// emitter.emit('3242', 15);

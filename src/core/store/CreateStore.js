export class CreateStore {
  constructor(rootReducer, initialState = {}) {
    this.state = rootReducer({...initialState}, {type: '__INIT__'});
    this.listeners = [];
    this.rootReducer = rootReducer;
  }
  subscribe(fn) {
    const vm = this;
    vm.listeners.push(fn);
    return {
      unsubscribe() {
        vm.listeners = vm.listeners.filter(l => l !== fn);
      }
    };
  }
  dispatch(action) {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach(listener => listener(this.state));
  }
  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}

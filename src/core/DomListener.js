export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('Не найден $root');
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  initDomListeners() {
    console.log('initDomListeners listeners', this.listeners);
  }
  removeDomListeners() {

  }
}

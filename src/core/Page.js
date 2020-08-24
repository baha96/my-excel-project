export class Page {
  constructor(params) {
    this.params = params;
  }
  getRoot() {
    throw new Error('метод getRoot не реализован');
  }
  afterRender() {

  }
  destroy() {

  }
}

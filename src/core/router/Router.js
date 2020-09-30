import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Не найден selecter. Обычно это #app');
    }
    this.$placeholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
    this.page = null;
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }
  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    const Page = checkComponent(this.routes);
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
function checkComponent(routes) {
  let page;
  for (const [key, component] of Object.entries(routes)) {
    if (ActiveRoute.path.includes(key)) {
      page = component;
      break;
    }
  }
  // return page;

  // временное решение для не существующих страниц
  return page ? page : routes.dashboard;
}

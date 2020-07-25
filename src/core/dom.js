class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }
  get data() {
    return this.$el.dataset;
  }
  html(html) {
    // setter
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    // getter
    return this.$el.outerHTML.trim();
  }
  text(text) {
    // setter
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    // getter
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }
  clear() {
    this.html('');
    return this;
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  append(node) {
    if (node instanceof Dom) node = node.$el;
    if (Element.prototype.append) this.$el.append(node);
    else this.$el.appendChild(node);

    return this;
  }
  parent(selector) {
    // closest пойдет дальше искать selector по родителям, пока не найдет его
    return $(this.$el.closest(selector));
  }
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  css(styles = {}) {
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key]);
  }
  focus() {
    this.$el.focus();
    return this;
  }
  isNotEmpty() {
    return !!this.$el;
  }
  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
  id(parse) {
    if (parse) {
      const parse = this.id().split(':');
      return {
        row: +parse[0],
        col: +parse[1],
      };
    }
    return this.data.id;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, className = '') => {
  const el = document.createElement(tagName);
  if (el) el.classList.add(className);
  return $(el);
};

export default class Layout {
  constructor({tag, className, id, parent}) {
    this.tag = tag;
    this.className = className;
    this.id = id;
    this.parent = parent;
  }

  createElement() {
    const newElement = document.createElement( `${this.tag}`);
    newElement.className = this.className;
    newElement.id = this.id;
    return newElement;
  }

  appendElement() {
    this.element = this.createElement();
    document.querySelector(this.parent).append(this.element);
  }
}
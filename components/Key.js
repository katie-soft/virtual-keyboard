export default class Key {
  constructor({
    value,
    shiftOn,
    size,
    row,
  }) {
    this.value = value;
    this.shiftOn = shiftOn;
    this.size = size;
    this.row = row;
  }

  createKey() {
    const newKey = document.createElement('div');
    newKey.className = 'key';
    newKey.textContent = this.value;
    return newKey;
  }

  appendKey() {
    this.element = this.createKey();
    document.querySelector(`#row-${this.row}`).append(this.element);
  }
}

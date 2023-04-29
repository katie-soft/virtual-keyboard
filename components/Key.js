import { currentLang } from '../constants.js'

export default class Key {
  constructor({
    value,
    shiftOn,
    valueRU,
    shiftOnRU,
    size,
    row,
    color,
    showShift
  }) {
    this.value = value;
    this.shiftOn = shiftOn;
    this.valueRU = valueRU;
    this.shiftOnRU = shiftOnRU;
    this.size = size;
    this.row = row;
    this.color = color;
    this.showShift = showShift;
  }

  createKey() {
    const newKey = document.createElement('div');
    newKey.className = 'key';
    if (this.size !== 's') {
      newKey.classList.add(`key_size-${this.size}`);
    };
    if (this.color) {
      newKey.classList.add(`key_color-${this.color}`);
    }
    if (this.showShift) {
      newKey.setAttribute('data-content', this.shiftOn);
    }
    if (currentLang.language === 'RU' && this.valueRU) {
      newKey.textContent = this.valueRU;
    } else {
      newKey.textContent = this.value;
    }
    return newKey;
  }

  appendKey() {
    this.element = this.createKey();
    document.querySelector(`#row-${this.row}`).append(this.element);
  }
}

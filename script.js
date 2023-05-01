import { pageElements, textContent, keys, currentLang } from '../constants.js';
import Layout from './components/Layout.js'; 
import Key from './components/Key.js';

// initial settings
let capsLockIsOn = false;
let shiftIsOn = false;
let currentCursor = 0;

// create basic page layout
for (let element of pageElements) {
  const el = new Layout(element);
  el.appendElement();
}

Object.keys(textContent).forEach((key) => {
  document.querySelector(key).innerText = textContent[key];
});

// create keys
const keyboard = document.querySelector('#keyboard');
const textarea = document.querySelector('#input');
const keyboardRows = document.querySelectorAll('.keyboard__row');

function sortByPosition(arr) {
  arr.sort((a, b) => a.position > b.position ? 1 : -1);
}

const startValues = Object.values(keys);

function drawKeys(arr) {
  sortByPosition(arr);
  keyboardRows.forEach((el) => el.innerHTML = '');
  for (let i = 0; i < arr.length; i += 1) {
    const key = new Key(arr[[i]]);
    key.appendKey();
  }
}

drawKeys(startValues);

// track cursor
textarea.addEventListener('click', () => {
  currentCursor = textarea.selectionStart;
});

// change language
function changeKeyboardLang() {
  currentLang.change();
  keys.lang.value = currentLang.language;
  document.querySelector('#lang').innerText = currentLang.language;
  drawKeys(startValues);
}

// handle keys
function virtualType(value, keyObj = {}) {
  if (!Object.keys(keyObj).length) {
    keyObj = keys[value];
  }
  let currentValue = value;

  if (capsLockIsOn || shiftIsOn) {
    currentValue = value.toUpperCase();
    if (shiftIsOn && !event.shiftKey && keyObj.shiftOnRU && currentLang.language === 'RU') {
      currentValue = keyObj.shiftOnRU;
    }
    if (shiftIsOn && !event.shiftKey && keyObj.shiftOn && currentLang.language === 'EN') {
      currentValue = keyObj.shiftOn;
    }
  }
  const inputArr = textarea.value.split('');
  inputArr.splice(currentCursor, 0, currentValue);
  textarea.value = inputArr.join('');
  currentCursor += 1;
}

function showKeyAnimation(key) {
  key.classList.add('key-press-animation');
  setTimeout(() => {
    key.classList.remove('key-press-animation')
  }, 300);
}

function virtualDel() {
  const inputArr = textarea.value.split('');
  inputArr.splice(currentCursor, 1, '');
  textarea.value = inputArr.join('');
}

function virtualBackspace() {
  const inputArr = textarea.value.split('');
  inputArr.splice(currentCursor - 1, 1, '');
  textarea.value = inputArr.join('');
  currentCursor = currentCursor > 0 ? currentCursor - 1 : currentCursor;
}

function keysToUpperCase() {
  const letterKeys = Array.from(document.querySelectorAll('.key')).filter(el => el.textContent.length === 1);
  letterKeys.forEach((el) => {
    el.innerText = el.innerText.toUpperCase();
  });
}

function handleCapsLock() {
  const capsLockKey = Array.from(document.querySelectorAll('.key')).find(el => el.textContent === 'capslock');
  if (capsLockIsOn) {
    capsLockIsOn = false;
    capsLockKey.classList.remove('key_pressed');
    drawKeys(startValues);
  } else {
    capsLockIsOn = true;
    capsLockKey.classList.add('key_pressed');
    keysToUpperCase();
  }
}

function handleSpecialKeys(value) {
  switch (value) {
    case '':
      virtualType(' ');
      break;
    case 'tab':
      virtualType(' ');
      virtualType(' ');
      virtualType(' ');
      virtualType(' ');
      break;
    case 'enter':
      virtualType('\n');
      break;
    case 'arrowup':
    case 'arrowdown':
    case 'arrowleft':
    case 'arrowright':
      virtualType(keys[value].value);
      break;
    case 'delete':
      virtualDel();
      break;
    case 'backspace':
      virtualBackspace();
      break;
    case 'capslock':
      handleCapsLock();
      break;
    case currentLang.language.toLowerCase():
      changeKeyboardLang();
      break;
    default:
      console.log(value);
  }
}

function handleKey(value) {
  let targetKey = '';
  let targetValue = '';
  let keyObj = {};

  if (shiftIsOn) {
    if (currentLang.language === 'EN') {
      if (parseInt(value) >= 0) {
        keyObj = Object.values(keys).find(el => el.value === value);
        targetValue = keyObj.shiftOn;
      } else if (!keys[value]) {
        keyObj = Object.values(keys).find(el => el.shiftOn === value);
        targetValue = keyObj.shiftOn;
      } else {
        targetValue = value;
      }
    } else {
      if (parseInt(value) >= 0) {
        keyObj = Object.values(keys).find(el => el.value === value);
        targetValue = keyObj.shiftOnRU;
      } else if (keyObj = Object.values(keys).find(el => el.shiftOnRU === value)) {
        keyObj = Object.values(keys).find(el => el.shiftOnRU === value);
        targetValue = keyObj.shiftOnRU;
      } else {
        keyObj = Object.values(keys).find(el => el.valueRU === value);
        targetValue = keyObj.valueRU;
      }
    }
  } else if (value === 'en' || value === 'ru') {
    targetValue = keys['lang'].value.toLowerCase();
  } else {
    if (keys[value]) {
      targetValue = keys[value].value;
    } else {
      targetValue = value;
    }
  }

  targetKey = Array.from(keyboard.querySelectorAll('.key')).find(el => el.textContent.toLowerCase() === targetValue);
  if (targetKey && value !== 'shift') {
    showKeyAnimation(targetKey);
  }

  if (value.length === 1) {
    virtualType(value, keyObj);
  } else {
    handleSpecialKeys(value);
  }
}

keyboard.addEventListener('click', (event) => handleKey(event.target.textContent.toLowerCase()));
document.addEventListener('keydown', (event) => {
  event.preventDefault();
  handleKey(event.key.toLowerCase());
});

// handle Shift
function showShiftValues() {
  const altKeys = Array.from(document.querySelectorAll('.key')).filter((el) => el.dataset.content);
  altKeys.forEach((el) => {
    el.textContent = el.dataset.content;
    el.removeAttribute('data-content');
  });
}

function handleShift() {
  const shiftKey = Array.from(document.querySelectorAll('.key')).find(el => el.textContent === 'shift');
  if (shiftIsOn) {
    shiftKey.classList.add('key_pressed');
    keysToUpperCase();
    showShiftValues();
  } else {
    shiftKey.classList.remove('key_pressed');
    drawKeys(startValues);
  }
}

keyboard.addEventListener('mousedown', (event) => {
  if (event.target.innerText === 'shift') {
    shiftIsOn = true;
    handleShift();
  }
});

document.addEventListener('mouseup', () => {
  if (shiftIsOn) {
    shiftIsOn = false;
    handleShift();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift' && !shiftIsOn) {
    shiftIsOn = true;
    handleShift();
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift' && shiftIsOn) {
    shiftIsOn = false;
    handleShift();
  }
});

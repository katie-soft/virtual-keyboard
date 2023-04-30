import { pageElements, textContent, keys, currentLang } from '../constants.js';
import Layout from './components/Layout.js'; 
import Key from './components/Key.js';

//settings
let capsLockIsOn = false;
let shiftIsOn = false;
let currentCursor = 0;

// create basic page layout
for (let element of pageElements) {
  const el = new Layout(element);
  el.appendElement();
}

Object.keys(textContent).forEach(key =>  {
  document.querySelector(key).innerText = textContent[key];
})

// create keys
const keyboard = document.querySelector('#keyboard');
const textarea = document.querySelector('#input');
const keyboardRows = document.querySelectorAll('.keyboard__row');

function sortByPosition(arr) {
  arr.sort((a, b) => a.position > b.position ? 1 : -1);
}

let startValues = Object.values(keys);

function drawKeys(arr) {
  sortByPosition(arr);
  keyboardRows.forEach(el => el.innerHTML = '');
  for (let i = 0; i < arr.length; i++) {
    const key = new Key(arr[[i]]);
    key.appendKey();
  }
}

drawKeys(startValues);

//track cursor
textarea.addEventListener('click', () => {
  currentCursor = textarea.selectionStart;
})

//handle keys
keyboard.addEventListener('click', (event) => handleKey(event.target.textContent.toLowerCase()));
document.addEventListener('keydown', (event) => {
  event.preventDefault();
  handleKey(event.key.toLowerCase());
});

function handleKey(value) {
  let targetKey = '';
  let targetValue = '';
  if (shiftIsOn) {
    targetValue = value.toLowerCase();
  } else if (value === 'en' || value === 'ru') {
    targetValue = keys['lang'].value.toLowerCase();
  } else {
    //targetValue = keys[value].value;
    targetValue = value;
  }
  targetKey = Array.from(keyboard.querySelectorAll('.key')).find(el => el.textContent.toLowerCase() === targetValue);
  if (targetKey && value !== 'shift') {
    showKeyAnimation(targetKey);
  } 
  if (value.length === 1) {
    virtualType(value);
  } else {
    handleSpecialKeys(value);
  }
}

function showKeyAnimation(key) {
  key.classList.add('key-press-animation');
  setTimeout(() => {
    key.classList.remove('key-press-animation')}, 300);
}

function virtualType(value) {
  let currentValue = value;
  if (capsLockIsOn || shiftIsOn) {
    currentValue = value.toUpperCase();
    if (shiftIsOn && !event.shiftKey && keys[value].shiftOn) {
      currentValue = keys[value].shiftOn;
    }
  }
  let inputArr = textarea.value.split('');
  inputArr.splice(currentCursor, 0, currentValue);
  textarea.value = inputArr.join('');
  currentCursor = currentCursor + 1;
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
  }
}

function virtualDel() {
  let inputArr = textarea.value.split('');
  inputArr.splice(currentCursor, 1, '');
  textarea.value = inputArr.join('');
}

function virtualBackspace() {
  let inputArr = textarea.value.split('');
  inputArr.splice(currentCursor - 1, 1, '');
  textarea.value = inputArr.join('');
  currentCursor = currentCursor - 1;
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

function keysToUpperCase() {
  const letterKeys = Array.from(document.querySelectorAll('.key')).filter(el => el.textContent.length === 1);
  letterKeys.forEach(el => {
      el.innerText = el.innerText.toUpperCase();
  })
}

//handle Shift
keyboard.addEventListener('mousedown', (event) => {
  if (event.target.innerText === 'shift') {
    shiftIsOn = true;
    handleShift();
  }
})

document.addEventListener('mouseup', () => {
  if (shiftIsOn) {
    shiftIsOn = false;
    handleShift();
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift' && !shiftIsOn) {
    shiftIsOn = true;
    handleShift();
  }
})

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift' && shiftIsOn) {
    shiftIsOn = false;
    handleShift();
  }
})

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

function showShiftValues() {
  const altKeys = Array.from(document.querySelectorAll('.key')).filter(el => el.dataset.content);
    altKeys.forEach(el => {
      el.textContent = el.dataset.content;
      el.removeAttribute('data-content');
    })
}

//change language
function changeKeyboardLang() {
  currentLang.change();
  keys.lang.value = currentLang.language;
  document.querySelector('#lang').innerText = currentLang.language;
  drawKeys(startValues);
}
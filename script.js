import { pageElements, textContent, keys } from '../constants.js';
import Layout from './components/Layout.js'; 
import Key from './components/Key.js';

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

function sortByPosition(arr) {
  arr.sort((a, b) => a.position > b.position ? 1 : -1);
}

let arrValues = Object.values(keys);
sortByPosition(arrValues);

function drawKeys(arr) {
  for (let i = 0; i < arr.length; i++) {
    const key = new Key(arr[[i]]);
    key.appendKey();
  }
}

drawKeys(arrValues);

//create keys effects
keyboard.addEventListener('click', (event) => {
  if (event.target.classList.contains('key')) {
    showKeyAnimation(event.target);
    if (event.target.innerText.length === 1) {
      virtualType(event.target.innerText);
    } else {
      switch (event.target.innerText) {
        case '':
          virtualType(' ');
          break;
        case 'enter':
          virtualType('\n');
          break;
        case 'del':
          virtualDel();
          break;
        case 'bksp':
          virtualBackspace();
          break;
        case 'capslock':
          handleCapsLock();
          break;
      }
    }
  }
});

function showKeyAnimation(element) {
  element.classList.add('key-press-animation');
  setTimeout(() => {
    element.classList.remove('key-press-animation')}, 300)
}

function showKey(event) {
    const virtualButton = Array.from(document.querySelectorAll('.key')).find(el => el.textContent === event.key.toLowerCase());
    showKeyAnimation(virtualButton);
}
document.addEventListener('keydown', showKey);

function virtualType(element) {
  let inputArr = textarea.value.split('')
  inputArr.splice(currentCursor, 0, element);
  textarea.value = inputArr.join('');
  //textarea.focus();
  currentCursor = currentCursor + 1;
}

function virtualDel() {
  let inputArr = textarea.value.split('')
  inputArr.splice(currentCursor, 1, '');
  textarea.value = inputArr.join('');
}

function virtualBackspace() {
  let inputArr = textarea.value.split('')
  inputArr.splice(currentCursor - 1, 1, '');
  textarea.value = inputArr.join('');
  currentCursor = currentCursor - 1;
}

//track cursor on input
let currentCursor = 0;
textarea.addEventListener('keyup', () => {
  currentCursor = textarea.selectionStart;
})

textarea.addEventListener('click', () => {
  currentCursor = textarea.selectionStart;
})

//CapsLock
let capsLockIsOn = false;

function handleCapsLock() {
  const capsLockKey = Array.from(document.querySelectorAll('.key')).find(el => el.textContent === 'capslock');
  if (capsLockIsOn) {
    capsLockIsOn = false;
    capsLockKey.classList.remove('key_pressed');
    keysToLowerCase()
    //drawKeys(arrValues);

  } else {
    capsLockIsOn = true;
    capsLockKey.classList.add('key_pressed');
    keysToUpperCase();
  }
}

function keysToUpperCase() {
  const letterKeys = Array.from(document.querySelectorAll('.key'));
  const capsKey = 'capsOn';
  letterKeys.forEach(el => {
    let obj = keys[el.innerText];
    if (typeof obj === 'object' && capsKey in obj) {
      el.innerText = el.innerText.toUpperCase();
    }
  })
}

function keysToLowerCase() {
  const letterKeys = Array.from(document.querySelectorAll('.key'));
  letterKeys.forEach(el => {
    el.innerText = el.innerText.toLowerCase();
  })
}


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
const keyboard = document.querySelector('#keyboard');
const textarea = document.querySelector('#input');

keyboard.addEventListener('click', (event) => {
  if (event.target.classList.contains('key')) {
    showKeyAnimation(event.target);
    virtualType(event.target.innerText);
  }
});

function showKeyAnimation(element) {
  element.classList.add('key-press-animation');
  setTimeout(() => {
    element.classList.remove('key-press-animation')}, 300)
}

function showKey(event) {
  const virtualButton = Array.from(document.querySelectorAll('.key')).find(el => el.textContent === event.key);
  showKeyAnimation(virtualButton);
}
document.addEventListener('keydown', showKey);

function virtualType(element) {
  textarea.value += element;
  textarea.focus();
}

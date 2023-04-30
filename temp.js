//create keys effects
keyboard.addEventListener('click', (event) => handleKey(event.target));

function handleKey(key) {
  if (key.classList.contains('key')) {
    showKeyAnimation(key);
    if (key.innerText.length === 1) {
      if (capsLockIsOn) {
        virtualType(key.innerText.toUpperCase());
      } else {
        virtualType(key.innerText);
      }      
    } else {
      switch (key.innerText) {
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
        case 'del':
          virtualDel();
          break;
        case 'backspace':
          virtualBackspace();
          break;
        case 'capslock':
          handleCapsLock();
          break;
        case currentLang.language:
          changeKeyboardLang();
      }
    }
  }
}

function virtualType(element) {
  let inputArr = textarea.value.split('');
  inputArr.splice(currentCursor, 0, element);
  textarea.value = inputArr.join('');
  //textarea.focus();
  currentCursor = currentCursor + 1;
}

function virtualDel() {
  let inputArr = textarea.value.split('');
  inputArr.splice(currentCursor, 1, '');
  textarea.value = inputArr.join('');
  console.log(currentCursor);
  currentCursor = currentCursor + 1;
}

function virtualBackspace() {
  let inputArr = textarea.value.split('');
  inputArr.splice(currentCursor - 1, 1, '');
  textarea.value = inputArr.join('');
  currentCursor = currentCursor - 1;
}

//track cursor on input
/*textarea.addEventListener('keyup', () => {
  currentCursor = textarea.selectionStart;
}) */

//CapsLock
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

//change language
function changeKeyboardLang() {
  currentLang.change();
  keys.lang.value = currentLang.language;
  document.querySelector('#lang').innerText = currentLang.language;
  drawKeys(startValues);
}

//handle Shift
keyboard.addEventListener('mousedown', (event) => {
  if (event.target.innerText === 'shift') {
    shiftIsOn = true;
    handleShift();
  }
})

document.addEventListener('mouseup', (event) => {
  if (shiftIsOn) {
    shiftIsOn = false;
    handleShift();
  }
})

function handleShift() {
  const shiftKey = Array.from(document.querySelectorAll('.key')).find(el => el.textContent === 'shift');
  if (shiftIsOn) {
    shiftKey.classList.add('key_pressed');
    keysToUpperCase();
    showShiftValues()
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

//handle of physical keyboard
function handlePhysKey(keyContent) {
  const virtualTarget = Array.from(document.querySelectorAll('.key')).find(el => el.textContent === keys[keyContent].value);
  console.log(virtualTarget)
  handleKey(virtualTarget);
}

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.key.length === 1) {
    virtualType(event.key)
  } else if (event.key === 'Shift') {
    shiftIsOn = event.shiftKey;
    handleShift();
  } else {
    handlePhysKey(event.key)
  }
})

document.addEventListener('keydown', (event) => {
  if (shiftIsOn || event.shiftKey) {
    console.log(keys[event.key].shiftOn)
    virtualType(keys[event.key].shiftOn)
  }
}) 
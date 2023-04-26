const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.text-area__input');
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

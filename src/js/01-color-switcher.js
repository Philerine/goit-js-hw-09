const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

buttonStart.addEventListener('click', ChangeColor);
buttonStop.addEventListener('click', stopChangeColor);
buttonStop.setAttribute('disabled', true);

let timer = null;

function ChangeColor() {
  timer = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.setAttribute('disabled', ' ');
  buttonStop.removeAttribute('disabled');
}

function stopChangeColor() {
  clearInterval(timer);
  buttonStop.setAttribute('disabled', ' ');
  buttonStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector(`button[data-stop]`);
const body = document.querySelector('body');
let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener(`click`, changeColor);
stopBtn.addEventListener(`click`, freezeColor);

function changeColor() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function freezeColor() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
}

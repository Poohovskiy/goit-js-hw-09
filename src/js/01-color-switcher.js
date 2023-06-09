function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const page = document.body;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let intervalId = null;

const startChangeColor = () => {
  btnStart.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    page.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const endChangeColor = () => {
  clearInterval(intervalId);
  btnStart.removeAttribute('disabled');
  page.style.backgroundColor = 'rgb(250, 250, 250)';
};

btnStart.addEventListener('click', startChangeColor);
btnStop.addEventListener('click', endChangeColor);

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let timerId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      startBtn.disabled = false;
    }
  },
};

const calendar = flatpickr('input[id=datetime-picker]', options);

startBtn.addEventListener(`click`, onStart);

function onStart() {
  const Time = new Date(calendar.selectedDates[0]).getTime();
  timerId = setInterval(() => {
    startBtn.disabled = true;
    const currentTime = Date.now();
    const deltaTime = Time - currentTime;
    if (deltaTime <= 0) {
      clearInterval(timerId);
      Notiflix.Notify.info('Time is over');
    } else {
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      daysEl.textContent = `${days}`;
      hoursEl.textContent = `${hours}`;
      minutesEl.textContent = `${minutes}`;
      secondsEl.textContent = `${seconds}`;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
}

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
refs.btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr(refs.dateInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function onClickStartBtn() {
  refs.btnStart.setAttribute('disabled', true);
  refs.dateInput.setAttribute('disabled', true);
  onClickStartTimer();
}

function onClickStartTimer() {
  const intervalId = setInterval(() => {
    // const currentDate = Date.now();
    const deltaDate = selectedDate - Date.now();
    const time = convertMs(deltaDate);

    if (deltaDate < 1000) {
      clearInterval(intervalId);
    }
    updateClockFace(time);
  }, 1000);
}

refs.btnStart.addEventListener('click', onClickStartBtn);

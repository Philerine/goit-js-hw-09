import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
 input: document.querySelector('#datetime-picker'),
 days: document.querySelector('[data-days]'),
 hours: document.querySelector('[data-hours]'),
 minutes: document.querySelector('[data-minutes]'),
 seconds: document.querySelector('[data-seconds]'),
 button: document.querySelector('[data-start]'),
}

refs.button.setAttribute('disabled', ' ');
refs.button.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.button.setAttribute('disabled', ' ');
    } else {
      Notiflix.Notify.success('You have selected a date');
      refs.button.removeAttribute('disabled');
    }
  },
};

const date = flatpickr(refs.input, options);

function startTimer() {

  refs.button.setAttribute('disabled', ' ');
  refs.input.setAttribute('disabled', ' ');
  Notiflix.Notify.success('The countdown has begun');

  const interval = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = date.selectedDates[0] - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(interval);
      refs.button.removeAttribute('disabled');
      refs.input.removeAttribute('disabled');
      Notiflix.Notify.success('');
    }
  }, 1000);

  setTimeout(interval);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
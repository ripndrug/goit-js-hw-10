// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const flatPicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let userSelectedDate;
let intervalId = null;

startBtn.disabled = true;

startBtn.addEventListener('click', handleStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      let currentDate = new Date();

    if (userSelectedDate < currentDate) {
        iziToast.error({
            message: 'Please choose a date in the future',
            position: 'topRight',
            closeOnClick: true,
            progressBar: false,
});
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
      }
      
  },
};

flatpickr(flatPicker, options);

function handleStart() {
    startBtn.disabled = true;
    flatPicker.disabled = true;
    
    intervalId = setInterval(() => {
        const currentDate = new Date();
        const remainingDateMs = userSelectedDate - currentDate;
          
          if (remainingDateMs <= 0) {
              clearInterval(intervalId);
              updateTimerUI(0);
              flatPicker.disabled = false;
              return;
          }

          updateTimerUI(remainingDateMs);
      }, 1000)
}

function updateTimerUI(ms) {
    const time = convertMs(ms);

    days.textContent = addLeadingZero(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

console.log(flatPicker, startBtn, days, hours, minutes, seconds);
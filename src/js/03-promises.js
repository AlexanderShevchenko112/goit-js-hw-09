const delayEl = document.getElementsByName('delay');
const stepEl = document.getElementsByName('step');
const amountEl = document.getElementsByName('amount');
const form = document.querySelector(`.form`);
const createBtn = document.querySelector(`button`);
import Notiflix from 'notiflix';

createBtn.addEventListener(`click`, onSubmit);
function onSubmit(event) {
  event.preventDefault();
  let delay = 0;
  for (let position = 1; position <= amountEl.value; position++) {
    delay = delayEl.value + stepEl.value * (position - 1);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  // form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

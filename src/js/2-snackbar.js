// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    
    const delay = e.target.elements.delay.value;
    const promiseState = e.target.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (promiseState === 'fulfilled') {
                resolve(iziToast.success({
                    message: `✅ Fulfilled promise in ${delay}ms`,
                }))
            } else {
                reject(iziToast.error({
                    message: `❌ Rejected promise in ${delay}ms`,
                }))
            }
        }, delay)
        
    });

    promise
        .then(data => data)
        .catch(error => error);
}

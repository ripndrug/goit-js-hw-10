import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i}from"./assets/vendor-BbbuE1sJ.js";const r=document.querySelector(".form");r.addEventListener("submit",n);function n(t){t.preventDefault();const s=t.target.elements.delay.value,m=t.target.elements.state.value;new Promise((e,o)=>{setTimeout(()=>{m==="fulfilled"?e(i.success({message:`✅ Fulfilled promise in ${s}ms`})):o(i.error({message:`❌ Rejected promise in ${s}ms`}))},s)}).then(e=>e).catch(e=>e)}
//# sourceMappingURL=2-snackbar.js.map
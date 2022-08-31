const enable_btn = document.querySelector("#enable-btn");
const messageDiv = document.querySelector("#message");
const resultText = document.querySelector("#result");

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// random day of the week
let randomDay = daysOfTheWeek[Math.floor(Math.random() * 7) + 1];
// console.log(randomDay);

// speech recognition init
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = new window.SpeechRecognition();

// show ing user's speech
const showMessage = (message) => {
  messageDiv.innerHTML = `<div>You said: ${message}</div>`;
};

const checkDaysOfWeek = (message) => {
  if (randomDay === message) {
    resultText.innerHTML = `
    <span style="color: #00f700;"> Your guess is correct!</span>
    `;
    recog.addEventListener("end", () => recog.abort());
  } else {
    resultText.innerHTML = `
    <span style="color: #f54a19;"> Oops! our guess is incorrect! Try Again.</span>
    `;
  }
};

// getting users speech
const getUserSpeech = (e) => {
  // console.log(e.results[0][0].transcript);
  let message = e.results[0][0].transcript;
  showMessage(message);
  checkDaysOfWeek(message);
};

enable_btn.addEventListener("click", () => {
  recog.start();
  messageDiv.innerHTML = "";
  resultText.innerHTML = "";
});
recog.addEventListener("result", getUserSpeech);

setTimeout(() => {
  recog.addEventListener("end", () => recog.stop());
}, 5 * 1000);

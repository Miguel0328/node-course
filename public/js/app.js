const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message = document.querySelector("#message");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  message.style.color = "black";
  message.textContent = "Loading...";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message.style.color = "red";
        message.textContent = data.error;
      } else {
        message.style.color = "black";
        message.setAttribute('style', 'white-space: pre;');
        message.textContent = data.location + "\r\n" + data.forecast;
      }
    });
  });
});

const NUMBERS = document.querySelectorAll("button");
const IO_PANEL = document.querySelector("#io-panel");
const HISTORY_PANEL = document.querySelector("#history-panel");

NUMBERS.forEach((number) => {
  number.addEventListener("click", function (e) {
    IO_PANEL.textContent += e.target.textContent;
  });
});


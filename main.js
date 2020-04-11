// Buttons
const NUMBERS = document.querySelectorAll(".number");
const OPERATORS = document.querySelectorAll(".operator");
const DELETE = document.querySelector("#delete");
const CLEAR = document.querySelector("#clear");
const EQUALS = document.querySelector("#equals");

// Panels
const IO_PANEL = document.querySelector("#io-panel");
const HISTORY_PANEL = document.querySelector("#history-panel");

// Variables
let firstNumber = "";
let secondNumber = "";
let result = "";
let ioText = ""; // Stores value for IO_PANEL
let historyText = ""; // Stores value for HISTORY_PANEL
let operator = "";
let clickedEquals = false;

function clear() {
  firstNumber = "";
  secondNumber = "";
  result = "";
  ioText = "";
  historyText = "";
  operator = "";

  updateDisplay();
}

function updateDisplay() {
  IO_PANEL.textContent = ioText;
  HISTORY_PANEL.textContent = historyText;
}

function deleteOne() {
  ioText = ioText.substring(0, ioText.length - 1);
  updateDisplay();
}

// Operations
function add(x, y) {
  return (parseFloat(x) + parseFloat(y)).toString();
}

function subtract(x, y) {
  return (parseFloat(x) - parseFloat(y)).toString();
}

function multiply(x, y) {
  return (parseFloat(x) * parseFloat(y)).toString();
}

function divide(x, y) {
  return (parseFloat(x) / parseFloat(y)).toString();
}

function calculate() {
  if (ioText && operator) {
    // If ioText and operator is not empty
    secondNumber = ioText;
    switch (operator) {
      case "+":
        result = add(firstNumber, secondNumber);
        break;
      case "-":
        result = subtract(firstNumber, secondNumber);
        break;
      case "*":
        result = multiply(firstNumber, secondNumber);
        break;
      case "/":
        result = divide(firstNumber, secondNumber);
        break;
    }
    ioText = result;
    updateDisplay();

    clickedEquals = true;
    operator = "";
  }
}

// Add event listeners
NUMBERS.forEach((numberButton) => {
  numberButton.addEventListener("click", (e) => {
    if (clickedEquals) {
      // Next input will be directed to secondNumber if previous button clicked is "Equals"
      ioText = "";
      clickedEquals = false;
    }
    ioText += e.target.textContent;
    updateDisplay();
  });
});

OPERATORS.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (e) => {
    if (!operator) {
      // If operator is empty
      operator = e.target.textContent;
      if (!secondNumber) {
        // Next input will be directed to secondNumber if secondNumber is empty
        firstNumber = ioText;
        historyText = firstNumber + operator;
        ioText = "";
        updateDisplay();
        return;
      }
      firstNumber = result;
      historyText = firstNumber + operator;
      secondNumber = "";
      result = "";
      ioText = "";
      updateDisplay();
      // Else
      return;
    }
    operator = e.target.textContent;
    historyText = historyText.substring(0, historyText.length - 1);
    historyText += operator;
    updateDisplay();
  });
});

DELETE.addEventListener("click", deleteOne);

CLEAR.addEventListener("click", clear);

EQUALS.addEventListener("click", calculate);

document.addEventListener("keypress", (e) => {
  console.log(e.keyCode);
  // Number buttons
  if (
    (e.keyCode >= 48 && e.keyCode <= 57) ||
    (e.keyCode >= 96 && e.keyCode <= 105) ||
    e.keyCode == 46 ||
    e.keyCode == 110
  ) {
    if (clickedEquals) {
      // Next input will be directed to secondNumber if previous button clicked is "Equals"
      ioText = "";
      clickedEquals = false;
    }
    ioText += String.fromCharCode(e.keyCode);
    updateDisplay();
  }

  // Operator buttons
  if (
    e.keyCode == 47 ||
    e.keyCode == 43 ||
    e.keyCode == 45 ||
    e.keyCode == 42
  ) {
    if (!operator) {
      // If operator is empty
      operator = String.fromCharCode(e.keyCode);
      if (!secondNumber) {
        // Next input will be directed to secondNumber if secondNumber is empty
        firstNumber = ioText;
        historyText = firstNumber + operator;
        ioText = "";
        updateDisplay();
        return;
      }
      firstNumber = result;
      historyText = firstNumber + operator;
      secondNumber = "";
      result = "";
      ioText = "";
      updateDisplay();
      // Else
      return;
    }
    operator = String.fromCharCode(e.keyCode);
    historyText = historyText.substring(0, historyText.length - 1);
    historyText += operator;
    updateDisplay();
  }

  // Enter or equals button
  if (e.keyCode == 61 || e.keyCode == 13) {
    calculate();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 8) {
    deleteOne();
  }
});

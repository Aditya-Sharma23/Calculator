const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let resetDisplay = false;

// Add a number
function enterNumber(number) {
    if (display.value === "Error") {
        display.value = "0";
    }

    if (resetDisplay) {
        display.value = number;
        resetDisplay = false;
    } else if (display.value === "0") {
        display.value = number;
    } else if (display.value.length < 15) {
        display.value += number;
    }
}

// Add a decimal point
function enterDecimal() {
    if (display.value === "Error" || resetDisplay) {
        display.value = "0.";
        resetDisplay = false;
    } else if (!display.value.includes(".")) {
        display.value += ".";
    }
}

// Select an operator
function selectOperator(selectedOperator) {
    if (display.value === "Error") return;

    firstNumber = parseFloat(display.value);
    operator = selectedOperator;
    resetDisplay = true;
}

// Calculate the result
function calculate() {
    if (operator === null || firstNumber === null) return;

    const secondNumber = parseFloat(display.value);
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0) {
                display.value = "Error";
                firstNumber = null;
                operator = null;
                resetDisplay = true;
                return;
            }
            result = firstNumber / secondNumber;
            break;
        default:
            return;
    }

    display.value = Number.isFinite(result)
        ? String(Number(result.toPrecision(12)))
        : "Error";

    firstNumber = null;
    operator = null;
    resetDisplay = true;
}

// Clear everything
function clearCalculator() {
    display.value = "0";
    firstNumber = null;
    operator = null;
    resetDisplay = false;
}

// Delete the last digit
function deleteDigit() {
    if (display.value === "Error" || resetDisplay) {
        display.value = "0";
        resetDisplay = false;
    } else {
        display.value = display.value.slice(0, -1) || "0";
    }
}

// Percentage
function percentage() {
    if (display.value === "Error") return;

    display.value = String(parseFloat(display.value) / 100);
    resetDisplay = true;
}

// Change positive/negative sign
function changeSign() {
    if (display.value === "Error") return;

    const number = parseFloat(display.value);

    if (number !== 0) {
        display.value = String(-number);
    }
}

// Connect all buttons
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.number !== undefined) {
            enterNumber(button.dataset.number);
        } else if (button.dataset.operator !== undefined) {
            selectOperator(button.dataset.operator);
        } else {
            switch (button.dataset.action) {
                case "clear":
                    clearCalculator();
                    break;
                case "delete":
                    deleteDigit();
                    break;
                case "decimal":
                    enterDecimal();
                    break;
                case "percent":
                    percentage();
                    break;
                case "sign":
                    changeSign();
                    break;
                case "equals":
                    calculate();
                    break;
            }
        }
    });
});

// Keyboard controls
document.addEventListener("keydown", event => {
    if (/^[0-9]$/.test(event.key)) {
        enterNumber(event.key);
    } else if (event.key === ".") {
        enterDecimal();
    } else if (["+", "-", "*", "/"].includes(event.key)) {
        selectOperator(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
        calculate();
    } else if (event.key === "Backspace") {
        deleteDigit();
    } else if (event.key === "Escape") {
        clearCalculator();
    }
});

console.log("Calculator JavaScript loaded successfully!");


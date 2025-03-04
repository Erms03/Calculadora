const screen = document.querySelector('.screen');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.operator-equal');
const clearButton = document.querySelector('.operator-clear');

let numberChoice = {
    number1: 0,
    number2: 0,
    operation: undefined,
    result: 0,
};

const handleEqual = (number1, number2, operation) => {
    switch (operation) {
        case '+': return number1 + number2;
        case '-': return number1 - number2;
        case '*': return number1 * number2;
        case '/': return number1 / number2;
        default: return 0;
    }
};

const handleClear = () => {
    numberChoice = { number1: 0, number2: 0, operation: undefined, result: 0 };
    screen.textContent = '0';
};

const handleNumberScreen = (number) => {
    if (number === '.' && screen.textContent.includes('.')) return;
    screen.textContent = screen.textContent === '0' && number !== '.' ? number : screen.textContent + number;
};

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const number = e.target.textContent;
        if (numberChoice.operation) {
            handleNumberScreen(number);
            numberChoice.number2 = screen.textContent;
        } else {
            handleNumberScreen(number);
            numberChoice.number1 = screen.textContent;
        }
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if(numberChoice.operation) return;
        numberChoice.operation = e.target.textContent;
        screen.textContent = '0';
    });
});

equalButton.addEventListener('click', () => {
    if (!numberChoice.operation) return;
    screen.textContent = handleEqual(parseFloat(numberChoice.number1), parseFloat(numberChoice.number2), numberChoice.operation);
    numberChoice.result = screen.textContent;
    numberChoice.number1 = numberChoice.result;
    numberChoice.number2 = 0;
    numberChoice.operation = undefined;
});

clearButton.addEventListener('click', handleClear);

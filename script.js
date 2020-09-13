class Calculator {
    constructor(displayTextElem) {
        this.displayTextElem = displayTextElem
        this.clear()
    }

    clear() {
        this.previousOperand = ''
        this.operator = ''
        this.currentOperand = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    compute() {
        this.currentOperand = eval(`${this.previousOperand}${this.operator}${this.currentOperand}`)
        this.previousOperand = ''
        this.operator = ''
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    appendOperator(operator) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    updateDisplay() {
        this.displayTextElem.innerText = `${this.previousOperand}${this.operator}${this.currentOperand}`
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const displayTextElem = document.querySelector('[data-display]');


const calculator = new Calculator(displayTextElem);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendOperator(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
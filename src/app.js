// const result = document.querySelector(".result");
// toggle scientific keys on and off
const openBtn = document.querySelector(".open--side-keys");
const closeBtn = document.querySelector(".close--side-keys");


const extraKeys = document.querySelector(".extra--keys");
// open scientific key
openBtn.addEventListener("click", () => {
    extraKeys.classList.add("open--extra");
})
// close scientific key
closeBtn.addEventListener("click", () => {
    extraKeys.classList.remove("open--extra");
})


// const keys = document.querySelector(".keyboard");
// keys.addEventListener("click", (event) => {
//     console.log(event.target);
// })


class Calculator {
    constructor(currentOperandDisplay, previousOperandDisplay) {
        this.currentOperandDisplay = currentOperandDisplay;
        this.previousOperandDisplay = previousOperandDisplay;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }


    compute() {
        let computation;
        let current;
        let prev;
        if(this.currentOperand.includes('sin')||this.currentOperand.includes('cos')||this.currentOperand.includes('tan')||this.currentOperand.includes('sqrt')||this.currentOperand.includes('log')) {
            var op, cp, num;
            op = this.currentOperand.indexOf('(');
            cp = this.currentOperand.indexOf(')');
            num = this.currentOperand.slice(op+1, cp);
            this.currentOperand = (this.computeTrig(parseFloat(num))).toString();
            this.trig = '';
            if(this.previousOperand !== '') {
                this.compute();
            } else {                
                this.updateDisplay();
            }
        } else if (this.previousOperand.includes('sin')||this.previousOperand.includes('cos')||this.previousOperand.includes('tan')||this.previousOperand.includes('sqrt')||this.previousOperand.includes('log')) {
            var op, cp, num;
            op = this.previousOperand.indexOf('(');
            cp = this.previousOperand.indexOf(')');
            num = this.previousOperand.slice(op+1, cp);
            this.previousOperand = (this.computeTrig(parseFloat(num))).toString();
            this.trig = '';
            this.compute();
        } else{            
            current = parseFloat(this.currentOperand);
            prev = parseFloat(this.previousOperand);
            const operation = this.operation;
            switch (operation) {
                case '+':
                    computation = prev + current;
                    break 
                case '-':
                    computation = prev - current;
                    break 
                case '*':
                    computation = prev * current;
                    break 
                case '/':
                    computation = prev / current;
                    break 
                default:
                    return     
            }
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand ='';
            this.updateDisplay()
        }
        // this.previousOperand = this.currentOperand;
        // this.currentOperand = '';
    }

    computeTrig(number) {
        let computation;
        // const trig = this.trig;
        console.log(`${this.trig} ${number}`);
        switch (this.trig) {
            case 'sin':
                computation = Math.sin(number);
                console.log('i got here');
                break
            case 'cos':
                computation = Math.cos(number);
                break
            case 'tan':
                computation = Math.tan(number);
                break
            case 'sqrt':
                computation = Math.sqrt(number); 
                break 
            case 'log':
                computation = Math.log(number);
                break          
            default:
                console.log('Not Found');
                break
        }
        // this.trig = undefined;
        return computation;
        // this.currentOperand = computation;
        // this.previousOperand = '';
        // this.updateDisplay();
    }

    appendNumber(number) {
        this.updateDisplay();
        if(number === '.' && this.currentOperand.includes('.')) return
        if(this.currentOperand !== '') {
            // console.log(typeof(this.currentOperand));
            if(this.currentOperand.includes('sin')||this.currentOperand.includes('cos')||this.currentOperand.includes('tan')) {
                if((this.currentOperand.toString()).includes(')')) {                
                    if(this.operation === undefined) {
                        this.compute();
                        this.chooseOperation('*');
                        // this.updateDisplay();
                        this.currentOperand = this.currentOperand.toString() + number.toString();
                    }
                } else {
                    this.currentOperand = this.currentOperand.toString() + number.toString();
            } 
            } else {
                this.currentOperand = this.currentOperand.toString() + number.toString();
            }
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }

    }

    chooseOperation(operation) {
        if(this.currentOperand === '' || this.currentOperand === '.') return;
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand + operation;
        this.currentOperand = '';
    }

    chooseTrig(trig) {
        if(this.currentOperand === '.') return
        // if(this.previousOperand !== '') {
        //     // this.compute()
        //     if(this.operation === undefined) {       
        //         this.operation = '*'         
        //         this.previousOperand = this.previousOperand + this.operation;
        //     }
        // }
        if(this.currentOperand !== '') {
            this.previousOperand = this.currentOperand;
            this.chooseOperation('*');
            this.updateDisplay();
        }
        this.trig = trig;
        console.log(typeof(this.trig));
        // this.previousOperand = this.previousOperand + trig;
        this.currentOperand = `${this.trig}(`
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandDisplay.textContent = this.currentOperand;
        this.previousOperandDisplay.textContent = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equal]')
const clearButton = document.querySelector('[data-clear]')
const currentOperandDisplay = document.querySelector('[data-current-operand')
const previousOperandDisplay = document.querySelector('[data-previous-operand')
const trigButtons = document.querySelectorAll('[data-trig]')
const sqrt = document.querySelector('[data-sqrt]')
const log = document.querySelector('[data-log]')
const parentheses = document.querySelectorAll('[data-bracket]')


// console.log(numbers);
// numbers.forEach(number=>{
//   number.addEventListener('click', ()=> {
//     // display.
//     console.log(number);
//   })  
// })

// for(var i = 0;i<numbers.length;i++) {
//     // console.log(numbers[i]);
//     numbers[i].addEventListener('click', (event)=> {
//         display.appendChild(event.target);
//     })
// }

const calculator =new Calculator(currentOperandDisplay, previousOperandDisplay)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // calculator.appendNumber(button.textContent);
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
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

trigButtons.forEach(button => {
    button.addEventListener('click', () => {        
        calculator.chooseTrig(button.firstChild.nodeValue);
        calculator.updateDisplay();
    })
});

sqrt.addEventListener('click', () => {
    calculator.chooseTrig('sqrt');
    calculator.updateDisplay();
})

log.addEventListener('click', () => {
    calculator.chooseTrig('log');
    calculator.updateDisplay();
})

parentheses.forEach(button => {    
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay();
    })
})
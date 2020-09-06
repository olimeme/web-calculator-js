class Calculator{
    constructor(prevOperandTextElement,currOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.currOperandTextElement = currOperandTextElement;
        this.clear();
    }
    delete(){
        this.currOperandTextElement.innerHTML = this.currOperandTextElement.innerHTML.toString().substring(0,this.currOperandTextElement.innerHTML.length - 1);
    }
    clear(){
        this.prevOperandTextElement.innerHTML = '';
        this.currOperandTextElement.innerHTML = '';
        this.operation = undefined;
    }
    appendNumber(number){
        if(this.currOperandTextElement.innerHTML.includes('.')&&number==='.') return 
        this.currOperandTextElement.innerHTML = this.currOperandTextElement.innerHTML.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currOperandTextElement.innerHTML === '' ) return;
        if(this.prevOperandTextElement.innerHTML !== ''){
            this.compute();
        }
        this.operation = operation;
        this.prevOperandTextElement.innerHTML = this.currOperandTextElement.innerHTML+operation;
        this.currOperandTextElement.innerHTML = '';
    }
    compute(){
        let computation;
        const prev = parseFloat(this.prevOperandTextElement.innerHTML);
        const curr = parseFloat(this.currOperandTextElement.innerHTML);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                computation = prev + curr; break;
            case '-':
                computation = prev - curr; break;
            case '÷':
                computation = prev / curr; break;
            case '*':
                computation = prev * curr; break;  
            default:
                return;  
        }
        this.currOperandTextElement.innerHTML = computation;
        this.operation = undefined;
        this.prevOperandTextElement.innerHTML = '';
    }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const prevOperandTextElement = document.querySelector('[data-prev-output]');
const currOperandTextElement = document.querySelector('[data-curr-output]');

const calculator = new Calculator(prevOperandTextElement,currOperandTextElement);
numberBtn.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerHTML);
    });
});
operationBtn.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.chooseOperation(button.innerHTML);
    });
});
equalsBtn.addEventListener('click',button =>{
    calculator.compute();
});
allClearBtn.addEventListener('click',button =>{
    calculator.clear();
});
deleteBtn.addEventListener('click',button =>{
    calculator.delete();
});
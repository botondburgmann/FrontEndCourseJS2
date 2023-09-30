
function add(numOne, numTwo) {
    return Math.round((numOne + numTwo) * 100)/100;
}
function subtract(numOne, numTwo) {
    return Math.round((numOne - numTwo) * 100)/100;
}
function multiply(numOne, numTwo) {
    return Math.round((numOne  * numTwo) * 100)/100;
}
function divide(numOne, numTwo) {
    if (numTwo === 0) {
        throw new Error("Error: trying to divide by 0");
    }
    return Math.round((numOne / numTwo * 100))/100;
}

function operate(numOne, operator, numTwo) {
    switch (operator) {
        case '+':
            return add(numOne, numTwo)
        case '-':
            return subtract(numOne, numTwo)
        case '*':
            return multiply(numOne, numTwo)
        case '/':
            return divide(numOne, numTwo)
        default:
            throw new Error("Error: operator doesn't exist");
    }
}
const numbers = document.getElementsByClassName("number"); 
const operators = document.getElementsByClassName("operator");
const equalButton = document.getElementById("equal");
const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const periodButton = document.getElementById("period");
const backspaceButton = document.getElementById("backspace");
const negativeButton = document.getElementById("negative")


const operation = [];


for (const number of numbers) {
    number.addEventListener("click", () => {
        if (display.textContent === '' || operation[operation.length-1] === '+' || operation[operation.length-1] === '-' || operation[operation.length-1] === '*' || operation[operation.length-1] === '/' ) {
            display.textContent = '';
        }
        display.textContent += number.innerText



    });

}

for (const operator of operators) {
    operator.addEventListener('click', () => {
try {
            if (display.textContent !== '') {
                operation.push(Number(display.textContent));
            }
            if (operation.length === 3) {
                const result = operate(operation[0], operation[1], operation[2]);
                display.textContent = result;
                operation.splice(0,3,result);
            }

            operation.push(operator.innerText);
        } catch (error) {
            alert(error.message)
            operation.pop();
        }
    });
}


equalButton.addEventListener('click', () =>{
    console.log(operation);
    try {
        if (display.textContent !== '') {
            operation.push(Number(display.textContent));
            display.textContent = '';
        }
        if (operation.length === 3) {
            const result = operate(operation[0], operation[1], operation[2]);
            display.textContent = result;
            operation.splice(0,3);
        }
        else{
            throw new Error("Error: not enough numbers")
        }
    } catch (error) {
        alert(error.message);
        operation.splice(0,2);
        
    }
})


clearButton.addEventListener('click', () =>{
    operation.splice(0,3);
    display.textContent = '';
})

periodButton.addEventListener('click', () => {
    if (display.textContent.includes('.')) {
        alert("Error: Invalid format");
    }
    else{
        display.textContent += '.';
    }
})

backspaceButton.addEventListener('click', ()=>{
    display.textContent = '';
})

negativeButton.addEventListener('click', () =>{
    if (operation.length === 0) {
        display.textContent = '-'
    }
    else{
        display.textContent *= -1;
    }
})
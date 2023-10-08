
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
        
        if (display.textContent !== '' && (operation[operation.length-1] === '+' || operation[operation.length-1] === '-'  || operation[operation.length-1] === '*' || operation[operation.length-1] === '/')) {
            display.textContent = '';
        }
        else{
            operation.pop();
        }
        display.textContent += number.innerText
        operation.push(Number(display.textContent))
    });

}

for (const operator of operators) {
    operator.addEventListener('click', () => {
        try {
            if (operation.length <1)
            throw new Error("Error: Please give me a number first")
            periodButton.disabled = false;
            if (operation.length === 3) {
                const result = operate(operation[0], operation[1], operation[2])
                operation.splice(0,3,result);
                display.textContent = result;
            }
            operation.push(operator.innerText)
        } catch (error) {
            display.textContent = '';
            alert(error.message);
        }

    });
}


equalButton.addEventListener('click', () =>{
    if (operation.length !== 3) {
        alert("Error: Not enough numbers to make the calculation");
    }
    else{
        try {
            const result = operate(operation[0], operation[1], operation[2])
            operation.splice(0,3,result);
            display.textContent = result; 
        } catch (error) {
            alert(error.message);
            display.textContent = '';
            periodButton.disabled = true;
        }
    }

})


clearButton.addEventListener('click', () =>{
    operation.splice(0,3);
    display.textContent = '';
    periodButton.disabled = false;

})

periodButton.addEventListener('click', () => {
    if (display.textContent.includes('.')) {
        alert("Error: Invalid format");
    }
    else{
        display.textContent += '.';
        periodButton.disabled = true;
    }
})

backspaceButton.addEventListener('click', ()=>{
    display.textContent = '';
    periodButton.disabled = false;

})

negativeButton.addEventListener('click', () =>{
    if(display.textContent === ''){
        display.textContent = '-';
    }
    else{
        display.textContent *= -1;
        operation.pop();
        operation.push(Number(display.textContent))
    }
})

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key) || key === ".") {
        if (display.textContent !== '' && (operation[operation.length - 1] === '+' || operation[operation.length - 1] === '-' || operation[operation.length - 1] === '*' || operation[operation.length - 1] === '/')) {
            display.textContent = '';
        } else {
            operation.pop();
        }
        display.textContent += key;
        operation.push(Number(display.textContent));
    }

    if (key === "+" || key === "-" || key === "*" || key === "/") {
        try {
            if (operation.length <1)
                throw new Error("Error: Please give me a number first")
            periodButton.disabled = false;
            if (operation.length === 3) {
                const result = operate(operation[0], operation[1], operation[2]);
                operation.splice(0, 3, result);
                display.textContent = result;
            }
            operation.push(key);
        } catch (error) {
            display.textContent = '';
            alert(error.message);
        }
    }

    if (key === "Enter") {
        if (operation.length !== 3) {
            alert("Error: Not enough numbers to make the calculation");
        } else {
            try {
                const result = operate(operation[0], operation[1], operation[2]);
                operation.splice(0, 3, result);
                display.textContent = result;
            } catch (error) {
                alert(error.message);
                display.textContent = '';
                periodButton.disabled = true;
            }
        }
        
    }

    if (key === "Backspace") {
        display.textContent = '';
        periodButton.disabled = false;
    }

});
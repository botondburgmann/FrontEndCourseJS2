
function add(numOne, numTWo) {
    return Math.round(numOne + numTWo);
}
function subtract(numOne, numTWo) {
    return Math.round(numOne - numTWo);
}
function multiply(numOne, numTWo) {
    return Math.round(numOne  * numTWo);
}
function divide(numOne, numTWo) {
    if (numTWo === 0) {
        throw new Error("Error: trying to divide by 0");
    }
    return Math.round(numOne / numTWo);
}

function operate(numOne, operator, numTWo) {
    switch (operator) {
        case '+':
            return add(numOne, numTWo)
        case '-':
            return subtract(numOne, numTWo)
        case '*':
            return multiply(numOne, numTWo)
        case '/':
            return divide(numOne, numTWo)
        default:
            throw new Error("Error: operator doesn't exist");
    }
}

//Function for disabling operator and = buttons.
function disableButtons() {
    for (const operator of operators)
        operator.disabled = true;
    equalButton.disabled = true;
}


const numbers = document.getElementsByClassName("number"); 
const operators = document.getElementsByClassName("operator");
const equalButton = document.getElementById("equal");
const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const periodButton = document.getElementById("period");
const backspaceButton = document.getElementById("backspace");
const negativeButton = document.getElementById("negative")

disableButtons();
const currentOperation = []; // Array for storing the operation
let concatedNum = '' // 


for (const number of numbers) {
    number.addEventListener("click", () => {
        if (periodButton.disabled) {
            if (concatedNum === '') {
                concatedNum = '0'
            }
            concatedNum = concatedNum.concat(number.innerText) // While the user pressing numbers it gets concatenated (e.g. 1, 12, 123)
        }
        else{
            concatedNum = concatedNum.concat(number.innerText) // While the user pressing numbers it gets concatenated (e.g. 1, 12, 123)
        }
        console.log(concatedNum);
        currentOperation.push(concatedNum) // Push the concatenated number (as string into the array)
        display.textContent = concatedNum;
        // If the array of operations has 3 elements, one of which is an operator, enable the = button
        if(currentOperation.length === 3 && (currentOperation.includes('+') || currentOperation.includes('-') || currentOperation.includes('*') || currentOperation.includes('/'))) // If the array for the operation has 3 
            equalButton.disabled = false;
        
        // Enable the operator buttons
        for (const operator of operators)
            operator.disabled = false   
    });

}

for (const operator of operators) {
    operator.addEventListener('click', () => {

    // Disable operator and = buttons until the user presses a number again
    disableButtons();

    //Enable the period button
    periodButton.disabled = false;

    /*  If the array of operations has 3 at elements, one of which is an operator, 
        evaluate the first pair of numbers and store the result as the first element of the array 
    */
    if ((currentOperation.includes('+') || currentOperation.includes('-') || currentOperation.includes('*') || currentOperation.includes('/')) && currentOperation.length >= 3){
        try {
            currentOperation.splice(2,(currentOperation.length-2), Number(currentOperation[currentOperation.length-1]) )
            const result = operate(currentOperation[0], currentOperation[1], currentOperation[2]);
            display.textContent = result;
            currentOperation.splice(0,currentOperation.length, result)
        } catch (error) {
            alert(error.message)
        }
    }

    // Otherwise it deletes all the elements so far, and replaces it with the last element after converting (So, e.g.: ['1', '12', '123'] will be [123])
    else
        currentOperation.splice(0,currentOperation.length, Number(currentOperation[currentOperation.length-1]) );

    // Then append the operator to the end and reset the variable for concatenating the numbers
    currentOperation.push(operator.innerText);
    concatedNum = '';


    });
}


// When clicking on the = button, do the calculation, and reset everything
equalButton.addEventListener('click', () =>{
    try {
        currentOperation.splice(2,(currentOperation.length-2), Number(currentOperation[currentOperation.length-1]) )
        const result = operate(currentOperation[0], currentOperation[1], currentOperation[2]);
        display.textContent = result;
    } catch (error) {
        alert(error.message)
    }

})


clearButton.addEventListener('click', () =>{
    currentOperation.splice(0,currentOperation.length)
    concatedNum = '';
    display.textContent = '';

})

periodButton.addEventListener('click', () => {
    periodButton.disabled = true;
    display.textContent = display.textContent + '.';
    concatedNum = concatedNum + '.'
})

backspaceButton.addEventListener('click', ()=>{
    concatedNum = ''
    display.textContent = '';

})

negativeButton.addEventListener('click', () =>{

})
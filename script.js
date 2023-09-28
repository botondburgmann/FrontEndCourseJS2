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
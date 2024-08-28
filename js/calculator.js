const resultDOM = document.getElementById('result-value');
let result = 0;
let prevValue = 0;
let activeOperator = null;
let prevActiveOperator = null;

function updateResult(number) {
    result = number;
    resultDOM.innerText = result;
}
function activateOperator(operator) {
    activeOperator = operator;
}
function deactivateOperator() {
    prevActiveOperator = activeOperator;
    activeOperator = null;
}

updateResult(0);

function handleClickNumber(number) {
    if (result !== 0) {
        prevValue = result;
        updateResult(number);
        deactivateOperator();

        return;
    } else {
        calculate();
    }
    updateResult(number);
}
function handleClickOperator(operator) {
    activateOperator(operator);
}
function calculate() {
    if (prevActiveOperator === 'plus') {
        updateResult(prevValue + result);
    } else if (prevActiveOperator === 'minus') {
        updateResult(prevValue - result);
    }
}

const zeroDOM = document.querySelector('button#zero');
const oneDOM = document.querySelector('button#one');
const twoDOM = document.querySelector('button#two');
const threeDOM = document.querySelector('button#three');
const fourDOM = document.querySelector('button#four');
const fiveDOM = document.querySelector('button#five');
const sixDOM = document.querySelector('button#six');
const sevenDOM = document.querySelector('button#seven');
const eightDOM = document.querySelector('button#eight');
const nineDOM = document.querySelector('button#nine');
const plusDOM = document.querySelector('button#plus');
const minusDOM = document.querySelector('button#minus');
const equalDOM = document.querySelector('button#equal');

zeroDOM.addEventListener('click', () => handleClickNumber(0));
oneDOM.addEventListener('click', () => handleClickNumber(1));
twoDOM.addEventListener('click', () => handleClickNumber(2));
threeDOM.addEventListener('click', () => handleClickNumber(3));
fourDOM.addEventListener('click', () => handleClickNumber(4));
fiveDOM.addEventListener('click', () => handleClickNumber(5));
sixDOM.addEventListener('click', () => handleClickNumber(6));
sevenDOM.addEventListener('click', () => handleClickNumber(7));
eightDOM.addEventListener('click', () => handleClickNumber(8));
nineDOM.addEventListener('click', () => handleClickNumber(9));
plusDOM.addEventListener('click', () => handleClickOperator('plus'));
minusDOM.addEventListener('click', () => handleClickOperator('minus'));
equalDOM.addEventListener('click', () => handleClickOperator('equal'));


resultDOM.value = '0';
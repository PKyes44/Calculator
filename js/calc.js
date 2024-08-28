const numItems = Array.from(document.getElementsByClassName('num-item'));
const acBtn = document.querySelector('button#ac');
const absBtn = document.querySelector('button#abs');
const percentBtn = document.querySelector('button#percent');
const plusBtn = document.querySelector('button#plus');
const minusBtn = document.querySelector('button#minus');
const multiplyBtn = document.querySelector('button#multiply');
const divideBtn = document.querySelector('button#divide');
const equalBtn = document.querySelector('button#equal');
const decimalPointBtn = document.querySelector('button#decimal-point');
const input = document.querySelector('.calc-input input');
const signList = ['+', '-', '*', '/', '='];

let prevInput = '';
let inputList = [];

// AllClear 버튼 클릭 이벤트
acBtn.addEventListener('click', (e) => {
    clearInput(0);
})
// 부호 변경 클릭 이벤트
absBtn.addEventListener('click', (e) => {
    // 현재 입력된 값 부호 변경
    const absNum = Number(input.value) * -1;
    // 화면에 출력
    setInput(absNum);
})
// 백분위 변경 클릭 이벤트
percentBtn.addEventListener('click', (e) => {
    // 백분율로 변경
    const percentNum = Number(input.value) * (1 / 100);
    // 화면에 출력
    setInput(percentNum);
})
// 소수점 입력 클릭 이벤트
decimalPointBtn.addEventListener('click', (e) => {
    // 현재 입력값에 소수점 이어붙이기
    const decimal = input.value + '.';
    // 화면에 출력
    setInput(decimal);
    // 입력키를 저장
    prevInput = '.';
})
// 덧셈 클릭 이벤트
plusBtn.addEventListener('click', (e) => {
    // 중복 클릭 예외처리
    if (prevInput === '+') {
        return;
    }

    // 부호 중복입력 확인 후 업데이트
    const isDuplicateSign = updateSign('+');
    if (isDuplicateSign) {
        return;
    }

    // 이전 숫자값 저장 및 부호 저장
    addPrevAtList(input.value, '+');
    // 입력키 저장
    prevInput = '+';
})
// 뺄셈 클릭 이벤트
minusBtn.addEventListener('click', (e) => {
    // 중복 클릭 예외처리
    if (prevInput === '-') {
        return;
    }

    // 부호 중복입력 확인 후 업데이트
    const isDuplicateSign = updateSign('-');
    if (isDuplicateSign) {
        return;
    }

    // 이전 숫자값 저장 및 부호 저장
    addPrevAtList(input.value, '-');
    // 입력키 저장
    prevInput = '-';
})
// 곱셈 클릭 이벤트
multiplyBtn.addEventListener('click', (e) => {
    // 중복 클릭 예외처리
    if (prevInput === '*') {
        return;
    }

    // 부호 중복입력 확인 후 업데이트
    const isDuplicateSign = updateSign('*');
    if (isDuplicateSign) {
        return;
    }

    // 이전 숫자값 저장 및 부호 저장
    addPrevAtList(input.value, '*');
    // 입력키 저장
    prevInput = '*';
})
// 나눗셈 클릭 이벤트
divideBtn.addEventListener('click', (e) => {
    // 중복 클릭 예외처리
    if (prevInput === '/') {
        return;
    }

    // 부호 중복입력 확인 후 업데이트
    const isDuplicateSign = updateSign('/');
    if (isDuplicateSign) {
        return;
    }

    // 이전 숫자값 저장 및 부호 저장
    addPrevAtList(input.value, '/');
    // 입력키 저장
    prevInput = '/';
})
// 계산 클릭 이벤트
equalBtn.addEventListener('click', (e) => {
    // 중복 클릭 예외 처리
    if (prevInput === '=') {
        return;
    }

    // 결과값 계산 및 처리
    getResult(inputList, prevInput);
    // 입력키 저장
    prevInput = '=';
})
// 숫자 입력키 이벤트 바인딩
numItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        // 클릭된 버튼의 숫자값 저장
        const clickedTxt = e.currentTarget.innerText;
        // 이전에 게산을 했었다면 저장된 숫자 제거
        if (prevInput === '=') {
            clearInput(Number(clickedTxt));
        }
        // 이전에 소수점 입력했을 시 소수점 이어붙이기
        else if (prevInput === '.') {
            setInput(input.value + clickedTxt);
        }
        // 숫자 이어 붙이기
        else if (!(signList.includes(prevInput) || prevInput === '')) {
            setInput(input.value + clickedTxt);
        }
        // 이전에 부호를 입력했다면 새로운 값 출력
        else {
            setInput(Number(clickedTxt));
        }
        // 클릭된 숫자값 저장
        prevInput = clickedTxt;
    })
});

// 계산기 초기화    
function initCalc() {
    inputList = [0];
}
// input 초기화
function clearInput(number) {
    input.value = `${number}`;
    inputList = [];
}
// 입력값 출력
function setInput(number) {
    input.value = number;
}
// 현재까지의 입력값 저장
function addPrevAtList(inputValue, sign) {
    inputList.push(inputValue);
    inputList.push(sign);
    return inputList;
}
// 부호 중복 입력시 이전 부호 제거
function updateSign(sign) {
    prevInput = sign;
    if (signList.includes(inputList[inputList.length - 1])) {
        inputList[inputList.length - 1] = sign;
        return true;
    }
    return false;
}
// 결과값 계산
function getResult(numbers, prevValue) {
    // 현재 입력된 값 추가
    if (!(prevValue === '+' || prevValue === '-')) {
        numbers = addPrevAtList(input.value, '=');
    }

    // 지금까지의 입력값을 토대로 계산
    const [firstNumber, ...calcList] = numbers;
    let prevSign = '';
    let result = calcList.reduce((total, value) => {
        // 부호일 경우 저장
        if (signList.includes(value)) {
            prevSign = value;
            return total;
        }
        // 숫자일 경우 계산
        else {
            switch (prevSign) {
                case '+': return Number(total) + Number(value);
                case '-': return Number(total) - Number(value);
                case '*': return Number(total) * Number(value);
                case '/': return Number(total) / Number(value);
            }
        }
    }, firstNumber);
    if (!Number.isInteger(result)) {
        result = Math.round(result * 100) / 100;
    }
    processResult(result);
}
// 계산 이후 처리
function processResult(result) {
    input.value = result;
    inputList = [];
}
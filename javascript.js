// ALl the need functions
let lowerDisplay = document.querySelector('#displaylower');
let upperDisplay = document.querySelector('#displayupper');
let number = document.querySelectorAll('.number');
let symbols = document.querySelectorAll('.symbol');
let showFinalAnswer = document.querySelector('.equalto');
let clearButton = document.querySelector('.clear');
let percentButton = document.querySelector('#percent');
let backButton = document.querySelector('.back');
let hideButton = document.querySelector('.hideButton');

let sum = (a,b) => a + b;

let multiply = (a,b) => a * b;

let minus = (a,b) => a - b;

let divide = (a,b) => {
    return a / b;
};

let percent = (a,b) => (a / 100) * b;

let operate = (a,b,operator) => {
    let answer = 0;
    a = Number(a);
    b = Number(b);    
    if (operator === '+') {
        answer = sum(a,b);
        
    };
    if (operator === '-') {
        answer = minus(a,b);
    };
    if (operator === '/') {
        if (b === 0) {
            return 'got zero';
        }
        else {
            answer = divide(a,b);   
        }; 
    };
    if (operator === 'x') {
        answer = multiply(a,b);
    };
    if (operator === '%') {
        answer = percent(a,b);
    };
    return answer;

};

let firstNum = 0;
let secondNum = 0;
let currentStoredNumber = 0;
let upperDisplayContent = '';
let operationToPerform = '';
let userTypingFirstTime = true;
let userTypingSecondNum = false;
let userJustClickedEqualTo = false;


let clearAllContent = () => {
    firstNum = 0;
    secondNum = 0;
    currentStoredNumber = 0;
    upperDisplayContent = '';
    operationToPerform = '';
    userTypingFirstTime = true;
    userTypingSecondNum = false;
    upperDisplay.innerText = upperDisplayContent;
    lowerDisplay.innerText = '';
};

// func to hide the upper display
let hideLowerDisplay = () => {
    if (upperDisplay.style.display === 'none') {
        upperDisplay.style.display = 'block';
        hideButton.style.color = 'white';
        
    }
    else {
        hideButton.style.color = 'red';
        upperDisplay.style.display = 'none';
    }
};

// function to concat two numbers
let concatNum = (a,b) => {
    let sumString = `${a.toString()}${b.toString()}`;
    return Number(sumString);
};

// calculate and changes the vars
// change the numone to total and second num to 0
let calculateTheCurrentNums = () => {
    let ans = operate(firstNum,secondNum,operationToPerform);
    if (ans === 'got zero') {
        clearAllContent();
        alert("you can't divide by zero");
    }
    else {
        firstNum = operate(firstNum,secondNum,operationToPerform);
        secondNum = 0;
    };
};


// function to store the numbers the user is typing
let storeUserTYpingNumbers = (e) => {
    let userTypedNum = e.target.innerText;
    // if the user is typing the first num we will store it in firstNum var
    if (userTypingFirstTime) {
        if (firstNum === 0) {
            firstNum = userTypedNum;
        }
        else {
            firstNum = concatNum(firstNum,userTypedNum);
        };
        currentStoredNumber = firstNum;
        upperDisplayContent = firstNum;
        upperDisplay.innerText = upperDisplayContent;
    }
    // if the user is typing second num that is after clicking operator
    else if (userTypingSecondNum) {

        if (secondNum === 0) {
            secondNum = userTypedNum;
        }
        else {
            secondNum = concatNum(secondNum,userTypedNum);
        };
        currentStoredNumber = secondNum;
        userJustClickedEqualTo = false;

    };

    lowerDisplay.innerText = currentStoredNumber;
};

// this func will change the operator and if user has first num and then + then don't do any calculation
let changeTheOperator = (e) => {
    if (operationToPerform === '') {
        console.log('first time')
    }
    else {
        // do some calculation operation
        if (!userJustClickedEqualTo) {
            upperDisplayContent += `  ${operationToPerform} ${secondNum}`;
        };
        calculateTheCurrentNums();
    };
    upperDisplay.innerText = upperDisplayContent;
    operationToPerform = e.target.innerText;
    userTypingFirstTime = false;
    userTypingSecondNum = true;
    userJustClickedEqualTo = false;
  

};

let removeLastNum = (str) => {
    return str.slice(0,str.length - 1);
};

let BackUpOneStep = () => {

    let newNumber = 0;
    if (userTypingFirstTime) {
         newNumber = removeLastNum(currentStoredNumber.toString());
         currentStoredNumber = newNumber;
         firstNum = newNumber;
         lowerDisplay.innerText = newNumber;
         upperDisplayContent = newNumber;
         upperDisplay.innerText = newNumber;
     }
     else {
         newNumber = removeLastNum(currentStoredNumber.toString());
         currentStoredNumber = newNumber;
         secondNum = newNumber;
         lowerDisplay.innerText = newNumber;
     };
};


// I need to do the current opration and then show the result
let displayTheCurrentFinalAnswer = () => {
    if (!userJustClickedEqualTo) {
        console.log(currentStoredNumber);
        upperDisplayContent += `  ${operationToPerform} ${currentStoredNumber}`;
        upperDisplay.innerText = upperDisplayContent;
    };
    calculateTheCurrentNums();
    lowerDisplay.innerText = firstNum;
    userJustClickedEqualTo = true;
};



symbols.forEach(symbol => {
    symbol.addEventListener('click', changeTheOperator);
});
percentButton.addEventListener('click', changeTheOperator);


// when user click a number we will save it in one of two var
number.forEach(number => {
    number.addEventListener('click', storeUserTYpingNumbers);
});

showFinalAnswer.addEventListener('click', displayTheCurrentFinalAnswer);

clearButton.addEventListener('click', clearAllContent);

backButton.addEventListener('click', BackUpOneStep);

hideButton.addEventListener('click', hideLowerDisplay);
let equalSignPressed; 

function changeDisplay(buttonText) {
    const display = document.querySelector(".display"); 

    let inputCheck = 0; 
    inputCheck = checkValidInput(buttonText, display); 

    if (inputCheck === 0) {

        if (display.textContent === "Undefined") {
            display.textContent = "0"; 
        }

        if (buttonText === "=") {
            equalSignPressed = true; 
            getAnswer(display);  
            return; 
        }

        // Erase previous answer if new integer selected, else allow operations
        // to take place on prev answer.  
        if (equalSignPressed) {
            if (!(checkContentIncludesOperator(buttonText))) {
                display.textContent = ""; 
            } 
            equalSignPressed = false; 
        }

        if (buttonText === "CE") {
            display.textContent = "0"
            return; 
        }

        if (checkContentIncludesOperator(buttonText)) {
            buttonText = " " + buttonText + " "; 
        } else if (!(checkContentIncludesOperator(buttonText))) {
            if (!(checkContentIncludesOperator(display.textContent)) && display.textContent === "0") {
                display.textContent = ""; 
            }   
        }
    
        display.textContent += buttonText; 
    } else if (inputCheck === 1) { 
        console.log("WARNING: multiple operators pressed.");
    } else if (inputCheck === 2) {
        console.log("WARNING: division by zero.");
        display.textContent = "Undefined";
    } else if (inputCheck === 3) {
        console.log("WARNING: tried to append multiple decimals to the same number. ")
    }
}

function createOnClickEvents() {
    const buttons = Array.from(document.querySelectorAll("button")); 

    buttons.forEach((button) => button.addEventListener("click", () => {
        addEmphasis(button); 
        changeDisplay(button.textContent); 
    })); 
}

function addEmphasis(button) {
    const display = document.querySelector(".display"); 

    display.style.border = "1px solid rgb(0, 110, 255)";

    if (button.textContent === "=") {
        button.style.border = "1px solid black"; 
    } else {
        button.style.border = "1px solid gray"; 
    }

    setTimeout(() => {
        button.style.border = "1px solid transparent"; 
        display.style.border = "1px solid rgb(207, 207, 207)";
    }, 120); 
}

function getAnswer(display) {
    let displayArr = splitContent(display); 

    // Possible make getting x and y values more secure/robust
    // Note: + operator converts strings to ints/floats
    let x = +(displayArr[0]);
    let y = +(displayArr[2]); 

    displayArr.forEach((element) => {
        switch(element) {
            case "/":
                divide(x, y, display);
                break;
            case "x":
                multiply(x, y, display);
                break;
            case "-":
                subtract(x, y, display); 
                break;
            case "+":
                add(x, y, display); 
                break;
        }
    }); 
}

// FIX: check size of answer, if answer is too large, then
// use scientific notation. 
// FIX: error calculating floats (ex: 3.0 - 3.3 = 2.99...)
function divide(x, y, display) {
    display.textContent = x / y; 
}

function multiply(x, y, display) {
    display.textContent = x * y; 
}

function subtract(x, y, display) {
    display.textContent = x - y; 
}

function add(x, y, display) {
    display.textContent = x + y; 
}

// WARNINGS:
// 0 : none
// 1 : multiple operators pressed
// 2 : divide by 0 
// 3 : "." check (only one allowed per x and y value)
// ? : y value not found (no functionality currently)

// checks if the next input is valid, i.e. cannot put "+" after "="
function checkValidInput(buttonText, display) {
    let displayArr = splitContent(display); 

    let displayArrCheck = checkContentIncludesOperator(displayArr);
    let buttonTextCheck = checkContentIncludesOperator(buttonText);

    if (displayArrCheck === true && buttonTextCheck === true) {
        return 1;
    }

    if (buttonText === "=" && displayArr[1] === "/" && displayArr[2] === "0") {
        return 2;  
    }

    if (buttonText === ".") {
        if (displayArr.length === 1 && displayArr[0].includes(".")) {
            return 3; 
        } else if (displayArr.length === 3) {
            if (displayArr[2].includes(".")) {
                return 3; 
            }
        }
    }

    // Add negative sign functionality 

    return 0; 

}

function splitContent(display) {
    const displayContent = display.textContent;
    
    return displayContent.split(" ");
}

function checkContentIncludesOperator(content) {
    if (typeof content === "string") {
        return ["/", "x", "-", "+"].includes(content); 
    }

    for (let element of content) {
        if (["/", "x", "-", "+"].includes(element)) {
            return true; 
        }
    }
    return false; 
}

function main() {
    createOnClickEvents(); 
}

main(); 

/* CURRENT BUGS: 
    - No negative sign functionality
    - If "=" pressed after operation, then display resets. Instead, it 
    should wait for a y value
    - Round answers using scientific notation if they are a certain
    size
    - Round off error in calculations including mixed numbers, i.e 
    "3.0 - 3.3 = -0.299..98" instead of " = -0.3"
    - 



*/

let equalSignPressed; 

function changeDisplay(buttonText) {
    const display = document.querySelector(".display"); 

    let inputCheck = 0; 
    inputCheck = checkValidInput(buttonText, display); 

    if (inputCheck === 0) {
        // BUG: if equal sign pressed after operation, display is erased.
        // Correct functionality should not change display at all.
        // (This will be fixed with y value check in checkValidInput function.) 
        if (buttonText === "=") {
            equalSignPressed = true; 
            getAnswer(display);  
            return; 
        }

        // BUG: equal sign is pressed and then an operation comes after it,
        // then 0 is not appended before the operator
        if (equalSignPressed) {
            display.textContent = ""; 
            equalSignPressed = false; 
        }

        if (buttonText === "CE") {
            display.textContent = "0"
            return; 
        }
    
        if (display.textContent === "0") {
            display.textContent = ""; 
        }

        // Treat operators differently than numbers. The spaces make 
        // them more visually appealing. 
        let operatorCheck = checkContentIncludesOperator(buttonText); 
        if (operatorCheck === true) {
            // If there is no given x value, than it is assumed that 
            // the x value should be 0. 
            if (buttonText === "0") {
                buttonText = "0" + " " + buttonText + " "; 
            } else {
                buttonText = " " + buttonText + " ";
            }
        }
    
        display.textContent += buttonText; 
    } else if (inputCheck === 1) { 
        console.log("WARNING: multiple operators pressed.");
    } else if (inputCheck === 2) {
        console.log("WARNING: Y value not given.");
    }
    // } else {
    //     console.log("ERROR: invalid input in changeDisplay"); 
    // }

}

function createOnClickEvents() {
    const buttons = Array.from(document.querySelectorAll("button")); 

    buttons.forEach((button) => button.addEventListener("click", () => {
        addEmphasis(button); 
        changeDisplay(button.textContent); 
    })); 
}

// add check for button type 
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
            // default:
            //     console.log("ERROR: " + element + "not recognized as " +
            //         "an operator.");
        }
    }); 
}

// do all of the x and y values need to be converted to ints before operations happen?
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
// 2 : y value not found

// checks if the next input is valid. Ex: cannot put "+" after "="
function checkValidInput(buttonText, display) {
    let displayArr = splitContent(display); 

    let displayArrCheck = checkContentIncludesOperator(displayArr);
    let buttonTextCheck = checkContentIncludesOperator(buttonText);

    if (displayArrCheck === true && buttonTextCheck === true) {
        return 1;
    }

    // Check for correct number of values needs to be more secure. 
    // Possibly convert first and third values to ints, and then
    // check if array contains an operator and two ints (and an
    // equal sign)

    // } else if (displayArrCheck === true && displayArr.length != 3) {
    //     return 2; 
    // }

    // Check for multiple "."
    // Allow a single . per number
    return 0; 

}

function splitContent(display) {
    const displayContent = display.textContent; 

    return displayArr = displayContent.split(" ");
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
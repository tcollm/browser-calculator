function changeDisplay(buttonText) {
    const display = document.querySelector(".display"); 

    let inputCheck = 0; 
    inputCheck = checkValidInput(buttonText, display); 

    if (inputCheck === 0) {
        if (buttonText === "CE") {
            display.textContent = "0"
            return; 
        }
    
        if (buttonText === "=") {
            getAnswer(display);  
            return; 
        }
    
        if (display.textContent === "0") {
            display.textContent = ""; 
        }

        // Treat operators differently than numbers. The spaces make 
        // them more visually appealing. 
        let operatorCheck = checkContentIncludesOperator(buttonText); 
        if (operatorCheck === true) {
            // check if there is an x value, if not then set 0 to the x
            // value and append the operator
            buttonText = " " + buttonText + " "; 
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

    displayArr.forEach((element) => {
        switch(element) {
            case "/":
                divide(display);
                break;
            case "x":
                multiply(display);
                break;
            case "-":
                subtract(display); 
                break;
            case "+":
                add(display); 
                break;
            default:
                console.log("ERROR: " + element + "not recognized as " +
                    "an operator.");
        }
    }); 
}

// do all of the x and y values need to be converted to ints before operations happen?
function divide(x, y, display) {
    console.log("Division operation: " + (x / y)); 
    // display.textContent = x / y; 
}

function multiply(x, y, display) {
    console.log("Division operation: " + (x * y)); 
    // display.textContent = x * y; 
}

function subtract(x, y, display) {
    console.log("Division operation: " + (x - y)); 
    // display.textContent = x - y; 
}

function add(x, y, display) {
    console.log("Division operation: " + (x + y)); 
    // display.textContent = x + y; 
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
    } else if (displayArrCheck === true && buttonText === "=") {
        return 2; 
    }
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
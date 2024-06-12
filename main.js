function changeDisplay(buttonText) {
    const display = document.querySelector(".display"); 

    let inputCheck = 0; 
    inputCheck = checkValidInput(buttonText, display); 

    console.log("Input check: " + inputCheck); 
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

        let operatorCheck = checkContentIncludesOperator(buttonText); 
        if (operatorCheck === true) {
            buttonText = " " + buttonText + " "; 
        }
    
        display.textContent += buttonText; 
    } else if (inputCheck === 1) { 
        console.log("WARNING: mult ops pressed");
    } else if (inputCheck === 2) {
        console.log("WARNING: no y value");
    }
    // } else {
    //     console.log("ERROR: invalid input in changeDisplay"); 
    // }

}

function createOnClickEvents() {
    const buttons = Array.from(document.querySelectorAll("button")); 

    buttons.forEach((button) => button.addEventListener("click", () => {
        emphasizeButton(button); 
        changeDisplay(button.textContent); 
    })); 
}

// add check for button type 
function emphasizeButton(button) {

    if (button.textContent === "=") {
        button.style.border = "1px solid black"; 
    } else {
        button.style.border = "1px solid gray"; 
    }

    setTimeout(() => {
        button.style.border = "1px solid transparent"; 
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

    // console.log("display contains operator: " + displayArrCheck
    //     + "\n\n" + "button contains operator: " + buttonTextCheck); 

    if (displayArrCheck === true && buttonTextCheck === true) {
        // console.log("Returned warning");
        return 1;
    } else if (displayArrCheck === true && buttonText === "=") {
        return 2; 
    }
    // console.log("Returned true")
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
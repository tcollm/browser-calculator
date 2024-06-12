function changeDisplay(buttonText) {
    const display = document.querySelector(".display"); 

    let inputCheck = checkValidInput(buttonText, display); 

    if (inputCheck) {
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
    
        // if operator called add spaces before and after 
        // ALSO check if an operator has been called before
        let operatorCheck = checkContentIncludesOperator(buttonText); 
        if (operatorCheck === true) {
            buttonText = " " + buttonText + " "; 
        }
    
        display.textContent += buttonText; 
    } else if (inputCheck === "WARNING: multiple operators pressed") { 
        console.log("WARNING: mult ops pressed");
    } else {
        console.log("ERROR: invalid input in changeDisplay"); 
    }

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

// checks if the next input is valid. Ex: cannot put "+" after "="
function checkValidInput(buttonText, display) {
    let displayArr = splitContent(display); 

    let displayArrCheck = checkContentIncludesOperator(displayArr);
    let buttonTextCheck = checkContentIncludesOperator(buttonText);

    if (displayArrCheck === true && buttonTextCheck === true) {
        return "WARNING: multiple operators pressed";
    // x value should always be found
    } else if (displayArrCheck === true && buttonText === "=") {
        return "WARNING: y value not found"; 
    }  

    return true; 

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
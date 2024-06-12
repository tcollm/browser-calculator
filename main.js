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
        if (buttonText === "/" || buttonText === "x" || buttonText === "-" || 
            buttonText === "+") 
        {
            buttonText = " " + buttonText + " "; 
        }
    
        display.textContent += buttonText; 
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

    // check if multiple operators pressed 
    if () {
        return "multiple operators pressed";

    // check if there are x, y, and an operator values before pressing "="
    } else if () {
        return "x value not found"; 
        return "y value not found"; 
    }  

    return true; 

}

function splitContent(display) {
    const displayContent = display.textContent; 

    return displayArr = displayContent.split(" ");
}

function main() {
    createOnClickEvents(); 
}

main(); 
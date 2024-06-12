function changeDisplay(buttonText) {
    const display = document.querySelector(".display"); 

    if (buttonText === "CE") {
        display.textContent = "0"
        return; 
    }

    if (buttonText === "=") {
        getAnswer(display);  
    }

    if (display.textContent === "0") {
        display.textContent = ""; 
    }

    display.textContent += buttonText; 
    // checkValidInput(currDisplayContent, contentToAdd); 
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
    const displayContent = display.textContent; 

    // turn display content into an array
    let displayArr = displayContent.split(" ");

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
// function checkValidInput() {
// }


function main() {
    createOnClickEvents(); 
}

main(); 
function changeDisplay(buttonText) {
    const display = document.querySelector(".display"); 

    if (buttonText === "CE") {
        display.textContent = "0"
        return; 
    }

    if (display.textContent === "0") {
        display.textContent = ""; 
    }

    display.textContent += buttonText; 
    // checkValidInput(currentDisplayContent, contentToAdd); 
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

// checks if the next input is valid. Ex: cannot put "+" after "="
// function checkValidInput() {
// }


function main() {
    createOnClickEvents(); 
}

main(); 
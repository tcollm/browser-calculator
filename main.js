function changeDisplay(displayContent) {
    const display = document.querySelector(".display"); 
    if (display.textContent === "0") {
        display.textContent = ""; 
    }

    display.textContent += displayContent; 
    // checkValidInput(currentDisplayContent, contentToAdd); 
}

function createOnClickEvents() {
    const buttons = Array.from(document.querySelectorAll("button")); 

    buttons.forEach((button) => button.addEventListener("click", () => {
        emphasizeButton(button); 
        changeDisplay(button.textContent); 
    })); 
}

function emphasizeButton(button) {
    button.style.border = "2px solid black"; 

    setTimeout(() => {
        button.style.border = "2px solid transparent"; 
    }, 300); 
}

// checks if the next input is valid. Ex: cannot put "+" after "="
// function checkValidInput() {
// }


function main() {
    createOnClickEvents(); 
}

main(); 
function changeDisplay(displayContent) {
    const display = document.querySelector(".display"); 

    display.textContent += displayContent; 
}

function createOnClickEvents() {
    const buttons = Array.from(document.querySelectorAll("button")); 

    buttons.forEach((button) => button.addEventListener("click", () => {
        changeDisplay(button.textContent); 
    })); 
}


function main() {
    createOnClickEvents(); 
}

main(); 
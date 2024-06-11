// create onclick event for all buttons
function createOnClickEvents() {
    const buttons = Array.from(document.querySelectorAll("button")); 

    buttons.forEach((button) => button.addEventListener("click", (event) => {
        console.log(event.textContent); 
    })); 
}


function main() {
    createOnClickEvents(); 
}

main(); 
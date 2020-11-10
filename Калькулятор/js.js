const calc = document.querySelector(".calc");

calc.addEventListener('mousedown', function(event) {
    if (event.target.className.includes('button')) {
        event.target.classList.add("pressed");
    }
});

calc.addEventListener('mouseup', function(event) {
    if (event.target.className.includes('button')) {
        event.target.classList.remove("pressed");
    }
});
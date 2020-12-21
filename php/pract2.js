document.querySelector(".send").addEventListener("click", function (e) {
    e.preventDefault();
    fetch("pract2.php", {
        body: JSON.stringify([1, 2, 3]), method: 'POST', headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response);
            console.log(response.name);
            document.querySelector(".enter-name").innerHTML = response.name;
        })
});

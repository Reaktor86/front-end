fetch("pract2.php")
    .then((response) => {
        return response.json();
    })
    .then((response) =>  {
        console.log(response);
        document.querySelector(".enter-name").innerHTML = response.name;
    })
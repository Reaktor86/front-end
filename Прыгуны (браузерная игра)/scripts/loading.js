function messageLoading() {
    console.log("Загрузка");
    let loading = document.createElement("div");
    loading.classList.add("loading");
    document.querySelector(".field").append(loading);
    loading = document.querySelector(".loading");
    let p = document.createElement("p");
    p.innerHTML = "Загрузка";
    loading.append(p);
    p = document.createElement("img");
    p.setAttribute("src", "img/loading.gif");
    loading.append(p);
}
messageLoading();

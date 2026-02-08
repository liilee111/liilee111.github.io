fetch("../../navbar.html")
    .then(res => res.text())
    .then(data => {
    document.getElementById("navbar").innerHTML = data;

    const s = document.createElement("script");
    s.src = "assets/js/script.js";
    document.body.appendChild(s);
    });
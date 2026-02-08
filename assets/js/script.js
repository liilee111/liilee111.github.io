const menu = document.querySelector(".navbar__toggle")
const menuLinks = document.querySelector(".navbar__menu")

menu.addEventListener("click", function(){
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");

    const isOpen = menu.classList.toggle("active");

    menu.textContent = isOpen ? "✕" : "☰";
    menu.setAttribute("aria-expanded", isOpen);
});




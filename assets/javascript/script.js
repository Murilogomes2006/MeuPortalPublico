const nav = document.querySelector("nav"),
    toggleBtn = nav.querySelector(".toggle-btn");

// Função para salvar a posição no localStorage
function savePosition(top, left) {
    localStorage.setItem("iconTop", top);
    localStorage.setItem("iconLeft", left);
}

// Função para recuperar a posição do localStorage
function loadPosition(property, defaultValue) {
    const savedValue = localStorage.getItem(property);
    return savedValue || defaultValue;
}

// Carregar a posição ao carregar a página
const savedTop = loadPosition("iconTop", "50%");
const savedLeft = loadPosition("iconLeft", "50%");
toggleBtn.style.top = savedTop;
toggleBtn.style.left = savedLeft;

toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    savePosition(toggleBtn.style.top, toggleBtn.style.left); // Salvar a posição após a ação
});

function onDrag({ movementY, movementX }) {
    const navStyle = window.getComputedStyle(nav),
        navTop = parseInt(navStyle.top),
        navLeft = parseInt(navStyle.left),
        navHeight = parseInt(navStyle.height),
        navWidth = parseInt(navStyle.width),
        windHeight = window.innerHeight,
        windWidth = window.innerWidth;

    const newTop = navTop + movementY;
    const newLeft = navLeft + movementX;

    nav.style.top = `${Math.min(Math.max(newTop, 0), windHeight - navHeight)}px`;
    nav.style.left = `${Math.min(Math.max(newLeft, 0), windWidth - navWidth)}px`;
}

nav.addEventListener("mousedown", () => {
    nav.addEventListener("mousemove", onDrag);
});

nav.addEventListener("mouseup", () => {
    nav.removeEventListener("mousemove", onDrag);
});

nav.addEventListener("mouseleave", () => {
    nav.removeEventListener("mousemove", onDrag);
});

const submenuTrigger = document.querySelector(".submenu-trigger"),
    submenu = document.getElementById("submenu");

submenuTrigger.addEventListener("click", () => {
    submenu.classList.toggle("show");
});



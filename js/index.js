const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const btnToTop = document.querySelector('.btn-to-top');
const revealElements = document.querySelectorAll('.reveal');

// variables de js
let sppinerStatus = true;

document.addEventListener("DOMContentLoaded", () => {
    wellcome.classList.add("wellcome--opacity");
});

iconNav.addEventListener("click", () => {
    nav.classList.toggle("nav__enlaces__visible");
});

opacityTransitionElement(imgPerfil);
opacityElement(imgPerfil);

xp.forEach((element) => {
    opacityTransitionElement(element);
    opacityElement(element);
});

spinner.forEach((element) => {
    opacityTransitionElement(element);
});

function opacityElement(element) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            element.style.opacity = "1";

            if (element.classList.contains("article__experiencia")) {
                hiddenShowSpinner();
                sppinerStatus = false;
                return;
            }
        } else {
            element.style.opacity = "0";
        }
    });

    observer.observe(element);
}

// FUNCIONES
function opacityTransitionElement(element) {
    element.classList.add("opacityElement");
}

function hiddenShowSpinner() {
    if (sppinerStatus) {
        spinnerStyle(spinner, "opacity", "1");
        spinnerStyle(spinner, "display", "block");

        spinnerStyle(spinnerDB1, "animationPlayState", "running");
        spinnerStyle(spinnerDB2, "animationPlayState", "running");

        setTimeout(() => {
            spinnerStyle(spinner, "opacity", "0");

            spinnerStyle(spinnerDB1, "animationPlayState", "paused");
            spinnerStyle(spinnerDB2, "animationPlayState", "paused");

            setTimeout(() => {
                spinner.forEach((e) => e.remove());
            }, 2000);
        }, 2000);
    }
}

function spinnerStyle(element, styleCustom, valueCustom) {
    element.forEach((e) => (e.style[styleCustom] = `${valueCustom}`));
}

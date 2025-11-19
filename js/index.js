<<<<<<< HEAD
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const btnToTop = document.querySelector('.btn-to-top');
const revealElements = document.querySelectorAll('.reveal');

// variables de js
let sppinerStatus = true;
=======
// Animaciones y UX para el portafolio
>>>>>>> actualizar

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Activar animación de entrada del body
    if (body.classList.contains("wellcome")) {
        body.classList.add("wellcome--opacity");
    }

    setupMobileNav();
    setupScrollReveal();
    setupNavHighlight();
    setupBackToTop();
});

/**
 * Menú hamburguesa en móvil
 */
function setupMobileNav() {
    const iconNav = document.querySelector(".nav_enlace_icon");
    const nav = document.querySelector(".nav__enlaces");

    if (!iconNav || !nav) return;

    iconNav.addEventListener("click", () => {
        nav.classList.toggle("nav__enlaces--open");
        iconNav.classList.toggle("is-open");
    });

    // Cerrar menú al hacer click en un enlace
    nav.querySelectorAll(".nav__enlace").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("nav__enlaces--open");
            iconNav.classList.remove("is-open");
        });
    });
}

/**
 * Animación de aparición al hacer scroll
 */
function setupScrollReveal() {
    const elements = document.querySelectorAll(
        ".section, .acercade, .habilidades, .experiencia, #contacto, .article__experiencia"
    );

    if (!elements.length) return;

    // Si el navegador no soporta IntersectionObserver, mostramos todo sin animación
    if (!("IntersectionObserver" in window)) {
        elements.forEach((el) => el.classList.add("reveal--visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal--visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.25,
        }
    );

    elements.forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}

/**
 * Resalta el enlace de navegación de la sección visible
 */
function setupNavHighlight() {
    const links = document.querySelectorAll(".nav__enlace[href^='#']");
    if (!links.length) return;

    const sections = Array.from(links)
        .map((link) => {
            const id = link.getAttribute("href");
            const section = document.querySelector(id);
            return section ? { link, section } : null;
        })
        .filter(Boolean);

    const clearActive = () => {
        links.forEach((l) => l.classList.remove("nav__enlace--active"));
    };

    const onScroll = () => {
        const scrollPos = window.scrollY + 110; // un poco debajo de la navbar
        let currentLink = null;

        sections.forEach(({ link, section }) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {
                currentLink = link;
            }
        });

        clearActive();
        if (currentLink) {
            currentLink.classList.add("nav__enlace--active");
        }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
}

/**
 * Botón "volver arriba"
 */
function setupBackToTop() {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            btn.classList.add("back-to-top--visible");
        } else {
            btn.classList.remove("back-to-top--visible");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

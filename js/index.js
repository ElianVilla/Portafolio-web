const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const btnToTop = document.querySelector('.btn-to-top');
const revealElements = document.querySelectorAll('.reveal');

// Navbar scroll state
const handleNavbarAppearance = () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// Intersection Observer for reveal animations and active nav links
const observerOptions = {
    threshold: 0.15,
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            activeLink?.classList.add('active');
        }
    });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach((el) => revealObserver.observe(el));

// Back to top
const toggleBackToTop = () => {
    if (window.scrollY > 400) {
        btnToTop.classList.add('show');
    } else {
        btnToTop.classList.remove('show');
    }
};

btnToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Collapse navbar on link click (mobile)
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        const collapse = document.getElementById('navbarNav');
        if (collapse?.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(collapse) || new bootstrap.Collapse(collapse);
            bsCollapse.hide();
        }
    });
});

handleNavbarAppearance();
toggleBackToTop();
window.addEventListener('scroll', () => {
    handleNavbarAppearance();
    toggleBackToTop();
});

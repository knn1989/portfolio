// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation menu toggle for mobile (if needed)
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => navObserver.observe(section));

// Fade-in animation on scroll
const fadeObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, fadeObserverOptions);

// Apply to sections
document.querySelectorAll('.section').forEach(section => {
    fadeObserver.observe(section);
});

// Add fade-in class to CSS dynamically if needed, but better to add to initial styles
// Assuming it will be added, this just triggers the class addition

// Back to top button (optional enhancement)
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.display = 'none';
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Styling for back to top button
const style = document.createElement('style');
style.innerHTML = `
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #5a67d8;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .back-to-top:hover {
        background-color: #4c51bf;
    }
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s, transform 0.6s;
    }
`;
document.head.appendChild(style);

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
let darkMode = localStorage.getItem('darkMode') === 'true';

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').className = 'fas fa-sun';
    localStorage.setItem('darkMode', 'true');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    darkModeToggle.querySelector('i').className = 'fas fa-moon';
    localStorage.setItem('darkMode', 'false');
}

if (darkMode) {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

// Typing effect for about section
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    element.innerHTML = '';
    type();
}

const aboutText = "Machine Learning Engineer with extensive research and practical experience in Artificial Intelligence, Machine Learning, and Edge Device Systems. Proficient in building and deploying AI solutions in Wireless Communications, Wireless Sensing, and Wi-Fi Technologies. Skilled in frameworks like TensorFlow and PyTorch, with a strong ability to manage projects independently and deliver impactful results.";

window.addEventListener('load', () => {
    typeWriter(document.getElementById('about-text'), aboutText, 50);
});

// Particles.js for background (simple initialization)
if (window.particlesJS) {
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded');
    });
}

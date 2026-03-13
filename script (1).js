document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initRevealAnimations();
    initCounterAnimation();
    initTypewriterEffect();
    initMobileMenu();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === id);
            });
        });
    }, {
        threshold: 0.45
    });

    sections.forEach(section => observer.observe(section));
}

function initRevealAnimations() {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(element => observer.observe(element));
}

function initCounterAnimation() {
    const numbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            numbers.forEach(number => animateCounter(number));
            currentObserver.disconnect();
        });
    }, { threshold: 0.6 });

    const statsBlock = document.querySelector('.about-stats');
    if (statsBlock) observer.observe(statsBlock);
}

function animateCounter(element) {
    const original = element.textContent.trim();
    const target = parseInt(original, 10);
    const suffix = original.replace(/[0-9]/g, '');
    const duration = 1200;
    const start = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - start) / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = `${value}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = `${target}${suffix}`;
        }
    }

    requestAnimationFrame(update);
}

function initTypewriterEffect() {
    const element = document.querySelector('.typing-text');
    if (!element) return;

    const text = 'Ryan Queiroz';
    let index = 0;
    element.textContent = '';

    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.marginLeft = '4px';
    cursor.style.opacity = '0.8';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index += 1;
            setTimeout(type, 85);
        } else {
            element.appendChild(cursor);
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '0.8' : '0';
            }, 500);
        }
    }

    type();
}

function initMobileMenu() {
    const button = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!button || !sidebar) return;

    button.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 980) {
                sidebar.classList.remove('open');
                document.body.classList.remove('menu-open');
            }
        });
    });
}

console.log('%cPortfólio Ryan Queiroz carregado com sucesso.', 'color: #00d1ff; font-weight: bold; font-size: 14px;');

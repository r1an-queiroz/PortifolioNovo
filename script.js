/* ============================================================================
   PORTFOLIO JAVASCRIPT
   
   Funcionalidades:
   - NavegaÃ§Ã£o suave entre seÃ§Ãµes
   - AnimaÃ§Ãµes ao scroll
   - Interatividade com hover
   - Efeitos de parallax
   - Contador de nÃºmeros
   - Efeito de mÃ¡quina de escrever no tÃ­tulo
   ============================================================================ */

// ============================================================================
// CONFIGURAÃ‡ÃƒO INICIAL
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initInteractiveElements();
    initCounterAnimation();
    initParallaxEffect();
    initTypewriterEffect();
});

// ============================================================================
// NAVEGAÃ‡ÃƒO
// ============================================================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Atualizar nav link ativo ao clicar
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remover classe ativa de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adicionar classe ativa ao link clicado
            link.classList.add('active');
            
            // Scroll suave para a seÃ§Ã£o
            const sectionId = link.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Atualizar nav link ativo ao fazer scroll
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 300) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================================================
// ANIMAÃ‡Ã•ES AO SCROLL
// ============================================================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos com animaÃ§Ã£o
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .education-item, .stat-card'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ============================================================================
// ELEMENTOS INTERATIVOS
// ============================================================================

function initInteractiveElements() {
    // Adicionar efeito ripple aos botÃµes
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRipple(e, button);
        });
    });

    // Adicionar efeito glow aos cards ao hover
    const cards = document.querySelectorAll('.project-card, .stat-card, .contact-method');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 40px rgba(0, 217, 255, 0.4)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });

    // Efeito de digitaÃ§Ã£o serÃ¡ inicializado em initTypewriterEffect()
}

// ============================================================================
// EFEITO RIPPLE
// ============================================================================

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Remover ripple anterior se existir
    const existingRipple = element.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Adicionar estilos para ripple
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================================================
// EFEITO DE DIGITAÃ‡ÃƒO
// ============================================================================

function initTypewriterEffect() {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        typeWriter(typingText, 'Ryan Queiroz', 80);
    }
}

function typeWriter(element, text, speed) {
    let index = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid #b366ff';
    element.style.paddingRight = '5px';
    element.style.animation = 'blink 0.7s infinite';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            element.style.animation = 'none';
            element.style.borderRight = 'none';
        }
    }

    type();
}

// ============================================================================
// ANIMAÃ‡ÃƒO DE CONTADOR
// ============================================================================

function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(number => {
                    animateCounter(number);
                });
            }
        });
    }, observerOptions);

    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 30;
    const duration = 1000;
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        current = Math.floor(target * progress);
        
        // Manter o formato original (ex: "2+")
        const originalText = element.textContent;
        const suffix = originalText.replace(/[0-9]/g, '');
        
        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();
}

// ============================================================================
// EFEITO PARALLAX
// ============================================================================

function initParallaxEffect() {
    const heroVisual = document.querySelector('.hero-visual');
    const codeBlock = document.querySelector('.code-block');
    
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const parallaxValue = scrollY * 0.5;
            
            heroVisual.style.transform = `translateY(${parallaxValue}px)`;
        });

        // Efeito de movimento do mouse
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 20;
            const y = (e.clientY / window.innerHeight) * 20;
            
            heroVisual.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        });
    }
    
    // Efeito de movimento 3D no bloco de cÃ³digo
    if (codeBlock) {
        codeBlock.addEventListener('mousemove', (e) => {
            const rect = codeBlock.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateX = ((y / rect.height) - 0.5) * 15;
            const rotateY = ((x / rect.width) - 0.5) * 15;
            
            codeBlock.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            codeBlock.style.boxShadow = `0 20px 60px rgba(179, 102, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)`;
        });
        
        codeBlock.addEventListener('mouseleave', () => {
            codeBlock.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            codeBlock.style.boxShadow = '0 0 20px rgba(179, 102, 255, 0.3)';
            codeBlock.style.transition = 'all 0.6s ease-out';
        });
        
        codeBlock.addEventListener('mouseenter', () => {
            codeBlock.style.transition = 'none';
        });
    }
}

// ============================================================================
// SMOOTH SCROLL BEHAVIOR
// ============================================================================

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

// ============================================================================
// EFEITO DE GLOW DINÃ‚MICO
// ============================================================================

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Atualizar posiÃ§Ã£o do gradiente de fundo
    const sections = document.querySelectorAll('.section::before');
    sections.forEach(section => {
        section.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    });
});

// ============================================================================
// LAZY LOADING DE IMAGENS
// ============================================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================================
// DETECÃ‡ÃƒO DE PREFERÃŠNCIA DE MOVIMENTO REDUZIDO
// ============================================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Desabilitar animaÃ§Ãµes
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================================================
// TRATAMENTO DE ERROS DE LINKS
// ============================================================================

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Verificar se o link Ã© um placeholder
        if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
            e.preventDefault();
            console.log('Link placeholder clicado');
        }
    });
});

// ============================================================================
// PERFORMANCE: DEBOUNCE PARA EVENTOS DE SCROLL
// ============================================================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================================================
// INICIALIZAÃ‡ÃƒO DE TOOLTIPS
// ============================================================================

const tooltips = document.querySelectorAll('[title]');
tooltips.forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('title');
        tooltip.style.cssText = `
            position: absolute;
            background: #00d9ff;
            color: #0a0e27;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.85rem;
            white-space: nowrap;
            pointer-events: none;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    });

    element.addEventListener('mouseleave', function() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(t => t.remove());
    });
});

// ============================================================================
// CONSOLE MESSAGE
// ============================================================================

console.log('%cðŸš€ Bem-vindo ao portfÃ³lio de Ryan Queiroz!', 'color: #00d9ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 217, 255, 0.8);');
console.log('%cDesenvolvido com HTML5, CSS3 e JavaScript puro', 'color: #39ff14; font-size: 14px;');
console.log('%cEntre em contato: ryanqueiroz4568@gmail.com', 'color: #e0e0e0; font-size: 12px;');

// ============================================================================
// ANIMAÃ‡ÃƒO DE PISCAR DO CURSOR - MÃQUINA DE ESCREVER
// ============================================================================

const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
    @keyframes blink {
        0%, 49% {
            border-right-color: #b366ff;
        }
        50%, 100% {
            border-right-color: transparent;
        }
    }
`;
document.head.appendChild(blinkStyle);
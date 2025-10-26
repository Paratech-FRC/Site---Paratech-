// Arquivo principal do JavaScript
import Navigation from './modules/navigation.js';
import Animations from './modules/animations.js';
import Store from './modules/store.js';

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar módulos
    new Navigation();
    new Animations();
    new Store();

    // Funções globais necessárias
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Carousel das temporadas (se existir)
    initSeasonCarousel();
    
    // Projetos expandíveis (se existir)
    initProjectToggle();
});

// Carousel das temporadas
function initSeasonCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.season-slide');
    
    if (slides.length === 0) return;

    window.changeSlide = function(direction) {
        slides[currentSlide].classList.remove('active');
        currentSlide += direction;
        
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
    };

    // Auto-play do carousel
    setInterval(() => {
        if (typeof window.changeSlide === 'function') {
            window.changeSlide(1);
        }
    }, 5000);
}

// Toggle de projetos
function initProjectToggle() {
    document.querySelectorAll('.project-header').forEach(header => {
        header.addEventListener('click', function() {
            const projectItem = this.parentElement;
            const content = projectItem.querySelector('.project-content');
            
            projectItem.classList.toggle('active');
            
            if (projectItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
}

// Função para loading states
window.showLoading = function(element) {
    element.classList.add('loading');
};

window.hideLoading = function(element) {
    element.classList.remove('loading');
};

// Utility functions
window.ParaTechUtils = {
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format currency
    formatCurrency: function(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
};
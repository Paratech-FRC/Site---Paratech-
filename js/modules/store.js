// Funcionalidades da Loja
class Store {
    constructor() {
        this.init();
    }

    init() {
        this.initSizeSelection();
        this.initProductInteractions();
    }

    initSizeSelection() {
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', function() {
                // Remove seleção anterior
                this.parentElement.querySelectorAll('.size-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Adiciona seleção atual
                this.classList.add('selected');
            });
        });
    }

    initProductInteractions() {
        // Hover effects para produtos
        document.querySelectorAll('.store-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Click nos botões de compra
        document.querySelectorAll('.store-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#contato') {
                    e.preventDefault();
                    document.querySelector('#contato').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

export default Store;
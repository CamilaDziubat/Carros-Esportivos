// Seletores
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const container = document.querySelector('.container');
const items = container.querySelectorAll('.list .item');
const indicator = document.querySelector('.indicators');
const dots = indicator.querySelectorAll('ul li');

let active = 0;
const firstPosition = 0;
const lastPosition = items.length - 1;

// Função para atualizar o indicador
function updateIndicator() {
    const numberElement = indicator.querySelector('.number');
    if (numberElement) {
        numberElement.textContent = `0${active + 1}`;
    }
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === active);
    });
}

// Função para atualizar o slider
function updateSlider() {
    items.forEach(item => item.classList.remove('active'));
    if (items[active]) {
        items[active].classList.add('active');
    }
    updateIndicator();
}

// Navegação anterior
prevButton.onclick = () => {
    active = (active - 1 < firstPosition) ? lastPosition : active - 1;
    updateSlider();
};

// Navegação seguinte
nextButton.onclick = () => {
    active = (active + 1 > lastPosition) ? firstPosition : active + 1;
    updateSlider();
};

// Inicializar o slider ao carregar a página
updateSlider();

// Seletores do modal
const contactModal = document.getElementById('contact-modal');
const contactForm = document.getElementById('contact-form');
const confirmationMessage = document.getElementById('confirmation-message');
const closeButton = document.querySelector('.close-button');

// Função para fechar o modal
function closeModal() {
    if (contactModal) {
        contactModal.style.display = 'none';
    }
    if (confirmationMessage) {
        confirmationMessage.classList.add('hidden');
    }
}

// Abre o modal ao clicar em "Fale Conosco"
document.querySelector('.menu-item:nth-child(3)').onclick = () => {
    if (contactModal) {
        contactModal.style.display = 'flex';
    }
};

// Fecha o modal ao clicar no botão de fechar ou fora do conteúdo
if (closeButton) {
    closeButton.onclick = closeModal;
}
window.onclick = (event) => {
    if (contactModal && event.target === contactModal) {
        closeModal();
    }
};

// Lida com a submissão do formulário de contato
if (contactForm) {
    contactForm.onsubmit = function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Validações
        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name.length === 0 || name.length > 50) {
            alert("O nome deve ter no máximo 50 caracteres.");
            return;
        }

        const phonePattern = /^[0-9]{10,15}$/;
        if (!phonePattern.test(contact)) {
            alert("Por favor, insira um número de telefone válido (10 a 15 dígitos).");
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        if (message.length === 0 || message.length > 300) {
            alert("A mensagem deve ter no máximo 300 caracteres.");
            return;
        }

        // Se todas as validações passarem
        confirmationMessage.classList.remove("hidden");
        contactForm.reset();

        // Fechar a mensagem de confirmação após 3 segundos
        setTimeout(() => {
            confirmationMessage.classList.add("hidden");
        }, 3000);
    };
}

// Função para inicializar o Google Maps
function initMap() {
    const location = { lat: -23.5505, lng: -46.6333 }; // Substitua pelas coordenadas da sua loja

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    });

    new google.maps.Marker({
        position: location,
        map: map,
        title: 'Localização da Loja'
    });
}



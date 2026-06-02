// --- MANEJO DEL MENÚ RESPONSIVE ---
function openMenu() {
    const menuUl = document.querySelector('#menu > div:first-child > ul');
    if (menuUl) {
        menuUl.style.left = '0';
    }
}

function closeMenu() {
    const menuUl = document.querySelector('#menu > div:first-child > ul');
    if (menuUl) {
        menuUl.style.left = '-100%';
    }
}

// --- MANEJO DE LA VENTANA MODAL INTERACTIVA ---
function openModal(element) {
    const modal = document.getElementById('modal');
    
    // Extracción de datos del elemento que disparó el click
    const targetImg = element.querySelector('img');
    const targetCaption = element.querySelector('figcaption');

    if (modal && targetImg && targetCaption) {
        // Clonación de la información hacia dentro de la estructura modal
        modal.querySelector('img').src = targetImg.src;
        modal.querySelector('img').alt = targetImg.alt;
        modal.querySelector('figcaption').innerHTML = targetCaption.innerHTML;
        
        // Cambio de propiedad visual para mostrarlo en pantalla
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}
// --- INTERACTIVIDAD DEL BUSCADOR ---
function toggleSearch() {
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    
    searchBox.classList.toggle('active');
    
    // Si se activa, pone automáticamente el foco en el input para escribir
    if (searchBox.classList.contains('active')) {
        searchInput.focus();
    }
}

// --- INTERACTIVIDAD DEL CARRITO LATERAL ---
function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('open');
}

// --- LÓGICA DE SIMULACIÓN DEL CARRITO ---
// Estructura de datos para guardar los elementos seleccionados temporalmente
let cart = [];

function updateCartUI() {
    const cartBadge = document.getElementById('cartBadge');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    
    // Actualizar número del badge superior
    cartBadge.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartItemsContainer.innerHTML = '';
        cartTotalAmount.textContent = '0€';
    } else {
        emptyCartMessage.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.quantity}x - ${item.price}€</p>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        
        cartTotalAmount.textContent = total + '€';
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function proceedToCheckout() {
    if(cart.length === 0) {
        alert("Your cart is empty. Add some tickets or store items first!");
    } else {
        alert("Redirecting to secure checkout platform...");
        cart = [];
        updateCartUI();
        toggleCart();
    }
}
// --- CERRAR MODAL AL HACER CLIC FUERA DE LA IMAGEN (EN EL FONDO) ---
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    
    if (modal) {
        modal.addEventListener('click', function(event) {
            // event.target es el elemento exacto donde el usuario hizo clic.
            // Si el clic es en el contenedor '#modal' (el fondo oscuro) 
            // y NO dentro de '.modal-content' (la caja de la imagen), se cierra.
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});
// =========================================================================
// NUEVA INTERACTIVIDAD: RETORNO AL INICIO Y MENÚ DE HAMBURGUESA RESPOSIVE
// =========================================================================

/**
 * Realiza un scroll suave automático hasta la parte superior de la ventana web
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Controla la apertura/cierre dinámico del menú de hamburguesa en entorno móvil
 */
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    
    if (navMenu && hamburgerBtn) {
        navMenu.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');
    }
}

// Escuchador para cerrar el menú del móvil si se pincha en un enlace de sección interno
document.addEventListener('DOMContentLoaded', () => {
    const mobileLinks = document.querySelectorAll('.nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburgerBtn.classList.remove('open');
            }
        });
    });
});
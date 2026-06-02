/**
 * PROJECT: Tomorrowland Festival Web Component
 * FILE: js/tickets.js
 * DESCRIPTION: Gestión interactiva de la cabecera (buscador, carrito) y validación de formulario.
 */

// Estructura de datos global para almacenar los productos del carrito
let shoppingCart = [];

// Esperar a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el escuchador del formulario de tickets
    const ticketForm = document.getElementById('ticket-form');
    if (ticketForm) {
        ticketForm.addEventListener('submit', handleTicketSubmission);
    }
    
    // Sincronizar el estado visual inicial del carrito
    updateCartUI();
});

// =========================================================================
// 1. INTERACTIVIDAD DEL HEADER (BUSCADOR Y DROPDOWN)
// =========================================================================

/**
 * Despliega u oculta la barra de búsqueda animada del header
 */
function toggleSearch() {
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBox) {
        searchBox.classList.toggle('active');
        // Si se abre, ponemos el foco automáticamente en el campo de texto
        if (searchBox.classList.contains('active') && searchInput) {
            searchInput.focus();
        }
    }
}

/**
 * Abre o cierra el panel lateral (Sidebar) del carrito de compras
 */
function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    if (cartPanel) {
        cartPanel.classList.toggle('open');
    }
}

// =========================================================================
// 2. LOGICA Y VALIDACIÓN DEL FORMULARIO DE ENTRADAS
// =========================================================================

/**
 * Valida el formulario y procesa la adición al carrito
 */
function handleTicketSubmission(event) {
    event.preventDefault(); // Evita que la página se refresque
    
    // Obtención de elementos del DOM
    const ticketTypeSelect = document.getElementById('ticket-type');
    const quantityInput = document.getElementById('ticket-quantity');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const confirmationMessage = document.getElementById('confirmation-message');
    
    // Variables de control de validación
    let isValid = true;
    let errorList = [];
    
    // Ocultar mensaje previo de éxito si existiera
    if (confirmationMessage) confirmationMessage.style.display = 'none';

    // Validación: Tipo de ticket seleccionado
    if (ticketTypeSelect.value === "") {
        errorList.push("Debes seleccionar un tipo de pase/entrada.");
        isValid = false;
    }

    // Validación: Cantidad coherente (entre 1 y 10)
    const quantity = parseInt(quantityInput.value, 10);
    if (isNaN(quantity) || quantity < 1 || quantity > 10) {
        errorList.push("La cantidad de entradas debe ser un número entre 1 y 10.");
        isValid = false;
    }

    // Validación: Nombre y Apellidos mínimos
    if (nameInput.value.trim().length < 4) {
        errorList.push("Por favor, introduce tu nombre y apellidos completos (mínimo 4 caracteres).");
        isValid = false;
    }

    // Validación: Correo electrónico estructurado correctamente (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        errorList.push("El formato del correo electrónico no es válido.");
        isValid = false;
    }

    // Procesar resultado de las validaciones
    if (!isValid) {
        // Alertas nativas limpias tal como solicita el manejo de errores básico
        alert("Por favor, corrige los siguientes errores antes de continuar:\n\n" + errorList.join("\n"));
    } else {
        // SI ES VÁLIDO: Extraemos los datos comerciales del ticket
        const selectedOption = ticketTypeSelect.options[ticketTypeSelect.selectedIndex].text;
        const ticketName = selectedOption.split(' - ')[0]; // Nombre legible
        
        // Determinar precio unitario según el tipo seleccionado
        let unitPrice = 150;
        if (ticketTypeSelect.value === 'vip') unitPrice = 350;
        if (ticketTypeSelect.value === 'ultimate') unitPrice = 800;

        // Añadir el objeto estructurado al carrito global
        addItemToCart(ticketName, quantity, unitPrice);

        // Mostrar feedback visual de éxito en la página
        if (confirmationMessage) {
            confirmationMessage.style.display = 'block';
        }

        // Resetear el formulario para permitir nuevas compras
        document.getElementById('ticket-form').reset();
        
        // Efecto interactivo: Abrir el carrito automáticamente para mostrar el ítem añadido
        setTimeout(() => {
            const cartPanel = document.getElementById('cartPanel');
            if (cartPanel && !cartPanel.classList.contains('open')) {
                cartPanel.classList.add('open');
            }
        }, 300);
    }
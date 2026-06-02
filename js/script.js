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

function openModal(element) {
    const modal = document.getElementById('modal');
    
    const targetImg = element.querySelector('img');
    const targetCaption = element.querySelector('figcaption');

    if (modal && targetImg && targetCaption) {
        modal.querySelector('img').src = targetImg.src;
        modal.querySelector('img').alt = targetImg.alt;
        modal.querySelector('figcaption').innerHTML = targetCaption.innerHTML;
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}
function toggleSearch() {
    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    
    searchBox.classList.toggle('active');
    
    if (searchBox.classList.contains('active')) {
        searchInput.focus();
    }
}

function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('open');
}

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
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    
    if (navMenu && hamburgerBtn) {
        navMenu.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');
    }
}

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
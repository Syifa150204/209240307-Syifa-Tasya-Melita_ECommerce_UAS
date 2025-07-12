// Syifa Tasya Melita
// 209240307
// ABI 20/2022 

// Data produk
const products = [
  { 
    id: 1, 
    name: "Modern Elegant Dress", 
    price: 299000, 
    image: "images/abdul-raheem-kannath-SZbVjTh3klw-unsplash (1).jpg",
    description: "Modern dress with elegant design for a stunning look."
  },
  { 
    id: 2, 
    name: "Dress Casual Chic", 
    price: 225000, 
    image: "images/beyza-yilmaz-8A5T6welTPQ-unsplash.jpg",
    description: "A casual dress with a chic style that is suitable for various occasions."
  },
  { 
    id: 3, 
    name: "Hijab Premium Silk", 
    price: 150000, 
    image: "images/raamin-ka-SHLjuQ7LX84-unsplash.jpg",
    description: "Premium hijab made from the highest quality silk."
  },
  { 
    id: 4, 
    name: "Batik Modern Tunic", 
    price: 185000, 
    image: "images/naseebo-dTHec4jUT2s-unsplash.jpg",
    description: "A batik tunic with an elegant modern touch."
  },
  { 
    id: 5, 
    name: "Kaftan Luxury", 
    price: 350000, 
    image: "images/khalid-boutchich-xLjbcj8iz5U-unsplash.jpg",
    description: "A luxury kaftan with beautiful details and quality materials."
  },
  { 
    id: 6, 
    name: "Premium Satin Veil", 
    price: 125000, 
    image: "images/ospan-ali-ue9wiyU842k-unsplash.jpg",
    description: "Premium satin veil with a soft and comfortable texture."
  },
  { 
    id: 7, 
    name: "Abaya Black Elegant", 
    price: 425000, 
    image: "images/abaya_black_elegant.jpg",
    description: "An elegant black abaya with a perfect cut. Ideal for formal occasions."
  },
  { 
    id: 8, 
    name: "Brooch", 
    price: 275000, 
    image: "images/parisa-safaei-yDL2B4KKDcA-unsplash.jpg",
    description: "Brooch with diamond details that adds a luxurious touch to your outfit."
  }
];

// Variabel global
let filteredProducts = [...products];
let cart = [];
let heartCount = 0;
const likedProducts = new Set();

// Utility Functions
function formatRupiah(angka) {
  return 'Rp' + angka.toLocaleString('id-ID');
}

// Render produk
function renderProducts(productsToRender = filteredProducts) {
  const productContainer = document.getElementById('produk-container');
  const noResults = document.getElementById('no-results');
  
  // Clear container
  productContainer.innerHTML = '';
  
  // Check if no products found
  if (productsToRender.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  
  // Hide no results message
  noResults.style.display = 'none';
  
  // Render each product
  productsToRender.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('produk-card');
    productCard.innerHTML = `
      <i class="fa-regular fa-heart icon-heart" data-id="${product.id}"></i>
      <img src="${product.image}" alt="${product.name}">
      <div class="produk-card-content">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="price">${formatRupiah(product.price)}</span>
        <a href="checkout.html" class="btn-beli" onclick="addToCart(${product.id})">Shop Now</a>
      </div>
    `;
    productContainer.appendChild(productCard);
  });
}

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  
  searchInput.addEventListener('input', function(e) {
    const keyword = e.target.value.toLowerCase().trim();
    
    if (keyword === '') {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
      );
    }
    
    renderProducts(filteredProducts);
  });
}

// Profile dropdown functionality
function initializeProfileDropdown() {
  const profileIcon = document.getElementById('profile-icon');
  const dropdownMenu = document.getElementById('dropdown-menu');

  profileIcon.addEventListener('click', function() {
    dropdownMenu.classList.toggle('hidden');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!profileIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.add('hidden');
    }
  });
}

// Like/Heart functionality
function initializeLikeFeature() {
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('icon-heart')) {
      const productId = e.target.getAttribute('data-id');
      
      if (e.target.classList.contains('liked')) {
        // Remove like
        e.target.classList.remove('liked');
        e.target.classList.replace('fa-solid', 'fa-regular');
        likedProducts.delete(productId);
        heartCount--;
      } else {
        // Add like
        e.target.classList.add('liked');
        e.target.classList.replace('fa-regular', 'fa-solid');
        likedProducts.add(productId);
        heartCount++;
      }
      
      console.log('Produk disukai:', heartCount);
      console.log('Daftar produk yang disukai:', Array.from(likedProducts));
    }
  });
}

// Cart functionality
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  if (product) {
    cart.push(product);
    updateCartBadge();
    console.log('Produk ditambahkan ke keranjang:', product.name);
    console.log('Total item di keranjang:', cart.length);
    
    // Show success message (optional)
    showNotification(`${product.name} Successfully added to cart`);
  }
}

function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge');
  cartBadge.textContent = cart.length;
}

// Notification system (optional)
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 1rem 2rem;
    border-radius: 5px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
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
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  renderProducts();
  initializeSearch();
  initializeProfileDropdown();
  initializeLikeFeature();
  initializeSmoothScrolling();
  
  // Initial cart badge update
  updateCartBadge();
  
  console.log('Gamis Cantik website loaded successfully!');
  console.log('Total produk:', products.length);
});

// Additional CSS for notifications (added dynamically)
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Export functions for external use (if needed)
window.GamisCantik = {
  products,
  addToCart,
  renderProducts,
  formatRupiah
};

function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (username === 'syifa' && password === '123') {
      localStorage.setItem('loggedIn', 'true');
      document.getElementById('login-page').classList.add('hidden');
      showMainContent(true);
    } else {
      alert('Username atau password salah!');
    }
  }

  function showMainContent(show) {
    const elements = ['header', 'main', 'footer', '.about-section', '.categories-section'];
    elements.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.style.display = show ? '' : 'none';
    });
  }

  // Logout
  document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.querySelector('.dropdown-item[href="#logout"]');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('loggedIn');
        document.getElementById('login-page').classList.remove('hidden');
        showMainContent(false);
      });
    }

    // On load, check login state
    if (localStorage.getItem('loggedIn') === 'true') {
      showMainContent(true);
      document.getElementById('login-page').classList.add('hidden');
    } else {
      showMainContent(false);
      document.getElementById('login-page').classList.remove('hidden');
    }
  });

  // Get elements
const modal = document.getElementById("checkoutModal");
const openBtn = document.getElementById("openCheckoutBtn");
const closeBtn = document.querySelector(".close-btn");

// Open modal
openBtn.onclick = function () {
  modal.style.display = "block";
};

// Close modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Form submit alert
document.getElementById("payment-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const selected = document.querySelector('input[name="payment"]:checked');
  if (selected) {
    alert(`: ${selected.value}`);
    modal.style.display = "none";
  }
});


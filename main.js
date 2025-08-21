// ---------- Config & refs ----------
const WA_PHONE = "6281389868594";
const DANA_NUMBER = "081389868594";
const DANA_NAME = "Muhammad Haris Nugroho";
const BANK_NUMBER = "0058168424";
const BANK_NAME = "Muhammad Haris Nugroho";
const MY_EMAIL = "mhdharisn21@gmail.com";
const CC_EMAIL = "muhammad_nugroho@app.co.id"; // Email CC yang tidak diketahui user
const DANA_QR_CODE_PATH = "QR-Dana.jpeg"; // Path ke gambar QR Code DANA Anda

// DOM Elements
const container = document.getElementById("menu-container");
const cartCount = document.getElementById("cart-count");
const wishlistCount = document.getElementById("wishlist-count");
const notif = document.getElementById("notif");
const kategoriButtons = document.querySelectorAll(".category-card");
const overlay = document.getElementById("overlay");
const darkToggle = document.getElementById('darkToggle');
const darkModeIcon = darkToggle.querySelector('.toggle-icon');

// Modals
const cartModal = document.getElementById("cart-modal");
const editCartModal = document.getElementById("edit-cart-modal");
const confirmDeleteModal = document.getElementById("confirm-delete-modal");
const wishlistModal = document.getElementById("wishlist-modal");
const paymentModal = document.getElementById("payment-modal");
const infoModal = document.getElementById("info-modal");
const searchModal = document.getElementById("search-modal");
const orderEventModal = document.getElementById("order-event-modal");
const reportBugModal = document.getElementById("report-bug-modal");

// Badges
const copiedBadge = document.getElementById("copied");
const sentBadge = document.getElementById("sent");
const loginSuccessBadge = document.getElementById("login-success-badge");

// Search elements
const searchInput = document.getElementById("search-input");
const doSearchBtn = document.getElementById("do-search");
const closeSearchBtn = document.getElementById("close-search");

// Contact elements
const whatsappContactBtn = document.getElementById("whatsapp-contact-btn");
const emailContactBtn = document.getElementById("email-contact-btn");
const whatsappDropdownContent = document.getElementById("whatsapp-dropdown-content");
const emailDropdownContent = document.getElementById("email-dropdown-content");

// Order Event Form elements
const orderNameInput = document.getElementById("order-name");
const orderWaInput = document.getElementById("order-wa");
const orderEventNameInput = document.getElementById("order-event-name");
const orderDateInput = document.getElementById("order-date");
const orderAddressInput = document.getElementById("order-address");
const submitOrderEventBtn = document.getElementById("submit-order-event");

// Report Bug Form elements
const bugTitleInput = document.getElementById("bug-title");
const bugDescriptionInput = document.getElementById("bug-description");
const bugCharCount = document.getElementById("bug-char-count");
const submitReportBugBtn = document.getElementById("submit-report-bug");

// QR Code element
const danaQrCodeImg = document.getElementById("dana-qr-code");

// Back to Top button
const backToTopBtn = document.getElementById("back-to-top");

// ---------- Data ----------
const productList = [
  { name: "Lemper", price: 3000, kategori: "Karbohidrat" },
  { name: "Sosis Solo", price: 3000, kategori: "Karbohidrat" },
  { name: "Sus", price: 3000, kategori: "Manis" },
  { name: "Pie Buah", price: 3000, kategori: "Manis" },
  { name: "Risol Mayonais", price: 3000, kategori: "Gorengan" },
  { name: "Pastel Bihun", price: 3000, kategori: "Gorengan" },
  { name: "Cente Manis / Hunkwe", price: 3000, kategori: "Manis" },
  { name: "Nasi Uduk", price: 8000, kategori: "Karbohidrat" },
  { name: "Nasi Kuning", price: 7000, kategori: "Karbohidrat" },
];

// Cart & Wishlist state
const cart = {};
const wishlist = {};
let currentEditItem = null;
let currentDeleteItem = null;
let currentDeleteType = null;
let modalStack = [];
let currentPaymentMethod = '';
let currentOrderData = {};
let currentContactActionType = ''; // 'whatsapp' or 'email'
let currentContactAction = ''; // 'order-event' or 'report-bug'

// ---------- Utility Functions ----------
function showNotif(text) {
  notif.textContent = text;
  gsap.killTweensOf(notif); // Stop any ongoing animations
  gsap.set(notif, { opacity: 0, y: -10, display: "block" }); // Ensure it's visible for animation
  gsap.to(notif, { duration: 0.28, opacity: 1, y: 0, ease: "power2.out" });
  gsap.to(notif, {
    delay: 1.6,
    duration: 0.28,
    opacity: 0,
    y: -10,
    ease: "power2.in",
    onComplete: () => {
      gsap.set(notif, { display: "none" }); // Hide it completely after animation
    },
  });
}

function showBadge(badge, text) {
  badge.textContent = text;
  gsap.killTweensOf(badge); // Stop any ongoing animations
  gsap.set(badge, { opacity: 0, scale: 0.8, display: "block" }); // Ensure it's visible for animation
  gsap.to(badge, { duration: 0.3, opacity: 1, scale: 1, ease: "back.out" });
  gsap.to(badge, {
    delay: 1.5,
    duration: 0.3,
    opacity: 0,
    scale: 0.8,
    ease: "back.in",
    onComplete: () => {
      gsap.set(badge, { display: "none" }); // Hide it completely after animation
    },
  });
}

// ---------- Modal Management ----------
function openModal(modal) {
  if (!modalStack.includes(modal)) {
    modalStack.push(modal);
  }
  gsap.set(overlay, { display: "block" }); // Ensure overlay is block before animating
  gsap.to(overlay, { duration: 0.25, opacity: 1, ease: "power2.out", onComplete: () => {
    overlay.setAttribute("aria-hidden", "false");
    overlay.style.pointerEvents = "auto";
  }});

  gsap.set(modal, { display: "block", scale: 0.8, opacity: 0 }); // Ensure modal is block before animating
  gsap.to(modal, { duration: 0.3, opacity: 1, scale: 1, ease: "power2.out", onComplete: () => {
    modal.setAttribute("aria-hidden", "false");
    modal.focus();
  }});
}

function closeModal(modal) {
  const index = modalStack.indexOf(modal);
  if (index > -1) {
    modalStack.splice(index, 1);
  }

  gsap.to(modal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
    gsap.set(modal, { display: "none" });
    modal.setAttribute("aria-hidden", "true");
    if (modalStack.length === 0) {
      gsap.to(overlay, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
        gsap.set(overlay, { display: "none" });
        overlay.setAttribute("aria-hidden", "true");
        overlay.style.pointerEvents = "none";
      }});
    } else {
      // If there are other modals in stack, show the previous one
      const previousModal = modalStack[modalStack.length - 1];
      gsap.set(previousModal, { display: "block", opacity: 1, scale: 1 });
      previousModal.setAttribute("aria-hidden", "false");
      previousModal.focus();
    }
  }});
  
  // New: Hide QR code when closing info modal
  if (modal.id === 'info-modal') {
    danaQrCodeImg.classList.add('hidden');
    danaQrCodeImg.src = ''; // Clear src
  }
}

function goBackToPreviousModal() {
  if (modalStack.length <= 1) {
    closeAllModals();
    return;
  }
  const currentModal = modalStack[modalStack.length - 1];
  const previousModal = modalStack[modalStack.length - 2];
  
  gsap.to(currentModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
    gsap.set(currentModal, { display: "none" });
    currentModal.setAttribute("aria-hidden", "true");
    modalStack.pop(); // Remove current modal from stack
    
    gsap.set(previousModal, { display: "block", opacity: 0, scale: 0.8 });
    gsap.to(previousModal, { duration: 0.3, opacity: 1, scale: 1, ease: "power2.out", onComplete: () => {
      previousModal.setAttribute("aria-hidden", "false");
      previousModal.focus();
    }});
  }});

  // New: Hide QR code if going back from info modal
  if (currentModal.id === 'info-modal') {
    danaQrCodeImg.classList.add('hidden');
    danaQrCodeImg.src = ''; // Clear src
  }
}

function closeAllModals() {
  modalStack.forEach((modal) => {
    gsap.to(modal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
      gsap.set(modal, { display: "none" });
      modal.setAttribute("aria-hidden", "true");
    }});
  });
  modalStack = [];
  gsap.to(overlay, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
    gsap.set(overlay, { display: "none" });
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.pointerEvents = "none";
  }});
  // New: Hide QR code when closing all modals
  danaQrCodeImg.classList.add('hidden');
  danaQrCodeImg.src = ''; // Clear src
}

// ---------- Cart Functions ----------
function updateCartCount() {
  const count = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = count;
  const mobileCartCountEl = document.getElementById('cart-count-mobile');
  if (mobileCartCountEl) {
    mobileCartCountEl.textContent = count;
    if (count > 0) {
      gsap.from(mobileCartCountEl, { scale: 1.5, duration: 0.3, ease: "back.out" });
    }
  }
  if (count > 0) {
    gsap.from(cartCount, { scale: 1.5, duration: 0.3, ease: "back.out" });
  }
}

function updateCartTotal() {
  const total = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);
  document.getElementById("cart-total").textContent = "Rp " + total.toLocaleString("id-ID");
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";
  
  if (Object.keys(cart).length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center text-gray-500 py-8">
        Keranjang kosong 🛒<br>
        <small>Silakan tambahkan produk!</small>
      </div>`;
    return;
  }

  Object.entries(cart).forEach(([key, item]) => {
    const wrap = document.createElement("div");
    wrap.className = "flex justify-between items-center bg-gray-50 p-3 rounded-lg";
    
    wrap.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="https://via.placeholder.com/50?text=${encodeURIComponent(item.name)}" 
             class="w-10 h-10 rounded-lg">
        <div>
          <p class="font-medium text-sm">${item.name}</p>
          <p class="text-xs text-gray-500">Rp ${item.price.toLocaleString("id-ID")} x ${item.qty}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="edit-cart-btn" onclick="openEditCartModal('${item.name}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete-item-btn" onclick="deleteCartItem('${item.name}')">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
    
    cartItemsContainer.appendChild(wrap);
  });
}

function openEditCartModal(itemName) {
  currentEditItem = itemName;
  const item = cart[itemName];
  
  document.getElementById("edit-item-name").textContent = item.name;
  document.getElementById("edit-item-price").textContent = `Rp ${item.price.toLocaleString("id-ID")}`;
  document.getElementById("edit-item-image").src = "https://via.placeholder.com/50?text=" + encodeURIComponent(item.name);
  document.getElementById("edit-qty-display").textContent = item.qty;
  
  updateEditButtons(item.qty);
  
  // Close cart modal first, then open edit modal
  gsap.to(cartModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
    gsap.set(cartModal, { display: "none" });
    cartModal.setAttribute("aria-hidden", "true");
    openModal(editCartModal);
  }});
}

function updateEditButtons(qty) {
  const minusBtn = document.getElementById("edit-minus-btn");
  minusBtn.disabled = qty <= 1;
  minusBtn.className = qty <= 1 ? "qty-btn minus-gray" : "qty-btn minus-red";
}

function deleteCartItem(itemName) {
  currentDeleteItem = itemName;
  currentDeleteType = 'item';
  document.getElementById("confirm-delete-message").textContent = `Hapus "${itemName}" dari keranjang?`;
  
  // Close cart modal first, then open confirm delete modal
  gsap.to(cartModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
    gsap.set(cartModal, { display: "none" });
    cartModal.setAttribute("aria-hidden", "true");
    openModal(confirmDeleteModal);
  }});
}

// ---------- Wishlist Functions ----------
function updateWishlistCount() {
  const count = Object.keys(wishlist).length;
  wishlistCount.textContent = count;
  const mobileWishlistCountEl = document.getElementById('wishlist-count-mobile');
  if (mobileWishlistCountEl) {
    mobileWishlistCountEl.textContent = count;
    if (count > 0) {
      gsap.from(mobileWishlistCountEl, { scale: 1.5, duration: 0.3, ease: "back.out" });
    }
  }
  if (count > 0) {
    gsap.from(wishlistCount, { scale: 1.5, duration: 0.3, ease: "back.out" });
  }
}

function updateWishlistButtonsState() {
  document.querySelectorAll('.btn-wishlist').forEach(button => {
    const itemName = button.getAttribute('data-name');
    if (wishlist[itemName]) {
      button.classList.add("wishlist-active");
    } else {
      button.classList.remove("wishlist-active");
    }
  });
}

function renderWishlist() {
  const wishlistItemsContainer = document.getElementById("wishlist-items");
  wishlistItemsContainer.innerHTML = "";
  
  if (Object.keys(wishlist).length === 0) {
    wishlistItemsContainer.innerHTML = `
      <div class="text-center text-gray-500 py-8">
        Wishlist kosong 😔<br>
        <small>Tambahkan produk favorit Anda!</small>
      </div>`;
    return;
  }

  Object.entries(wishlist).forEach(([key, item]) => {
    const card = document.createElement("div");
    card.className = "bg-gray-50 p-3 rounded-lg flex items-center gap-3";
    
    card.innerHTML = `
      <img src="https://via.placeholder.com/60?text=${encodeURIComponent(item.name)}" 
           class="w-12 h-12 rounded-lg">
      <div class="flex-1">
        <p class="font-medium text-sm">${item.name}</p>
        <p class="text-xs text-gray-500">Rp ${item.price.toLocaleString("id-ID")}</p>
        <p class="text-xs text-blue-600">${item.kategori}</p>
      </div>
      <div class="flex flex-col gap-1">
        <button onclick="addToCartFromWishlist('${item.name}')" 
                class="bg-orange-500 text-white text-xs px-3 py-1 rounded-full hover:bg-orange-600">
          <i class="fas fa-shopping-cart mr-1"></i>Pesan
        </button>
        <button onclick="removeFromWishlist('${item.name}')"
                class="bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600">
          <i class="fas fa-trash-alt mr-1"></i>Hapus
        </button>
      </div>
    `;
    
    wishlistItemsContainer.appendChild(card);
  });
}

function addToCartFromWishlist(itemName) {
  const item = wishlist[itemName];
  if (cart[itemName]) {
    cart[itemName].qty++;
  } else {
    cart[itemName] = { name: itemName, price: item.price, qty: 1 };
  }
  updateCartCount();
  showNotif(`${item.name} ditambahkan ke keranjang`);
}

function removeFromWishlist(itemName) {
  delete wishlist[itemName];
  updateWishlistCount();
  updateWishlistButtonsState();
  renderWishlist();
  showNotif(`${itemName} dihapus dari wishlist`);
}

// ---------- Display Functions ----------
function displayProducts(list) {
  container.innerHTML = "";
  if (!list || !list.length) {
    const msg = document.createElement("div");
    msg.className = "col-span-full text-center py-8 text-gray-500";
    msg.innerHTML = `Maaf yang anda cari tidak/belum tersedia. 😔`;
    container.appendChild(msg);
    gsap.fromTo(msg, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.36, ease: "power2.out" });
    return;
  }

  list.forEach((item) => {
    const card = document.createElement("div");
    card.className = "product-card";
    
    const image = document.createElement("img");
    image.src = "https://via.placeholder.com/120?text=" + encodeURIComponent(item.name);
    image.className = "w-full h-32 object-cover rounded-lg mb-3";
    
    const title = document.createElement("h4");
    title.className = "font-semibold text-base mb-1";
    title.textContent = item.name;
    
    const price = document.createElement("p");
    price.className = "text-sm text-green-600 mb-2";
    price.textContent = "Rp " + item.price.toLocaleString("id-ID");
    
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "product-actions"; /* Menggunakan class product-actions */
    
    const wishlistButton = document.createElement("button");
    wishlistButton.className = "btn-wishlist";
    wishlistButton.innerHTML = `
      <i class="fas fa-heart"></i>
      <span>Wishlist</span>
    `;
    wishlistButton.setAttribute("data-name", item.name);
    wishlistButton.setAttribute("data-price", item.price);
    wishlistButton.setAttribute("data-kategori", item.kategori);
    
    if (wishlist[item.name]) {
      wishlistButton.classList.add("wishlist-active");
    }
    
    const orderButton = document.createElement("button");
    orderButton.className = "btn-pesan bg-orange-500 text-white text-sm px-4 py-1.5 rounded-full hover:bg-orange-600 transition-all flex-1";
    orderButton.textContent = "Pesan";
    orderButton.setAttribute("data-name", item.name);
    orderButton.setAttribute("data-price", item.price);
    
    buttonContainer.append(wishlistButton, orderButton);
    card.append(image, title, price, buttonContainer);
    container.appendChild(card);
  });
  
  gsap.fromTo(
    container.children,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.36, stagger: 0.06, ease: "power2.out" }
  );
}

function renderMenu(kategori = "all") {
  const filtered = kategori === "all" ? productList : productList.filter((item) => item.kategori === kategori);
  displayProducts(filtered);
}

// ---------- Payment Functions ----------
function generateOrderMessage() {
  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  
  let message = `🛒 *PESANAN BARU*\n\n`;
  message += `📍 *KEDAI MAS HARIS*\n`;
  message += `⏰ ${new Date().toLocaleString('id-ID')}\n\n`;
  message += `📋 *Detail Pesanan:*\n`;
  
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   ${item.qty} x Rp ${item.price.toLocaleString('id-ID')} = Rp ${(item.qty * item.price).toLocaleString('id-ID')}\n\n`;
  });
  
  message += `💰 *Total: Rp ${total.toLocaleString('id-ID')}*\n\n`;
  message += `💳 *Metode Pembayaran: ${currentPaymentMethod}*\n\n`;
  message += `Terima kasih! 🙏`;
  
  return message;
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showBadge(copiedBadge, "Nomor disalin");
    }).catch(() => {
      // Fallback if writeText fails (e.g., not in a secure context)
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showBadge(copiedBadge, "Nomor disalin");
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showBadge(copiedBadge, "Nomor disalin");
  }
}

function sendToWhatsApp() {
  const message = generateOrderMessage();
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WA_PHONE}?text=${encodedMessage}`;
  
  Object.keys(cart).forEach(key => delete cart[key]);
  updateCartCount();
  
  showBadge(sentBadge, "Pesanan terkirim");
  closeAllModals();
  
  window.open(whatsappUrl, '_blank');
}

// ---------- Event Listeners ----------
document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollToPlugin
  gsap.registerPlugin(ScrollToPlugin);

  // Dark mode initialization
  let currentTheme = 'light';
  try {
    currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      document.body.classList.add('dark');
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun');
    } else {
      document.body.classList.remove('dark');
      darkModeIcon.classList.remove('fa-sun');
      darkModeIcon.classList.add('fa-moon');
    }
  } catch (e) {
    darkModeIcon.classList.add('fa-moon');
  }

  // Search handlers
  document.getElementById("search-trigger").addEventListener("click", () => {
    openModal(searchModal);
    searchInput.value = "";
    setTimeout(() => searchInput.focus(), 100);
  });

  closeSearchBtn.addEventListener("click", closeAllModals);

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      renderMenu();
    } else {
      const filtered = productList.filter(item =>
        item.name.toLowerCase().includes(query)
      );
      displayProducts(filtered);
    }
  });

  doSearchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      renderMenu();
    } else {
      const filtered = productList.filter(item =>
        item.name.toLowerCase().includes(query)
      );
      displayProducts(filtered);
    }
    closeAllModals();
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearchBtn.click();
  });

  // Category buttons
  kategoriButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      kategoriButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderMenu(btn.dataset.kategori);
    });
  });

  // Cart button
  document.getElementById("cart-btn").addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
      showNotif("Keranjang kosong");
      return;
    }
    renderCart();
    updateCartTotal();
    openModal(cartModal);
  });

  // Wishlist button
  document.getElementById("wishlist-btn").addEventListener("click", () => {
    renderWishlist();
    openModal(wishlistModal);
  });

  document.getElementById("close-wishlist").addEventListener("click", closeAllModals);

  // Edit cart handlers
  document.getElementById("edit-minus-btn").addEventListener("click", () => {
    if (currentEditItem && cart[currentEditItem] && cart[currentEditItem].qty > 1) {
      cart[currentEditItem].qty--;
      document.getElementById("edit-qty-display").textContent = cart[currentEditItem].qty;
      updateEditButtons(cart[currentEditItem].qty);
      showNotif(`Jumlah ${currentEditItem} berkurang`);
    }
  });

  document.getElementById("edit-plus-btn").addEventListener("click", () => {
    if (currentEditItem && cart[currentEditItem]) {
      cart[currentEditItem].qty++;
      document.getElementById("edit-qty-display").textContent = cart[currentEditItem].qty;
      updateEditButtons(cart[currentEditItem].qty);
      showNotif(`Jumlah ${currentEditItem} bertambah`);
    }
  });

  document.getElementById("save-edit-cart").addEventListener("click", () => {
    updateCartCount();
    updateCartTotal();
    
    // Close edit modal and open cart modal
    gsap.to(editCartModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
      gsap.set(editCartModal, { display: "none" });
      editCartModal.setAttribute("aria-hidden", "true");
      renderCart(); // Re-render cart to show updated quantities
      openModal(cartModal); // Open cart modal again
    }});
    showNotif("Perubahan disimpan");
  });

  document.getElementById("cancel-edit-cart").addEventListener("click", goBackToPreviousModal);

  // Clear cart and confirm delete handlers
  document.getElementById("clear-cart-btn").addEventListener("click", () => {
    currentDeleteType = 'all';
    document.getElementById("confirm-delete-message").textContent = "Hapus semua item dari keranjang?";
    
    // Close cart modal first, then open confirm delete modal
    gsap.to(cartModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
      gsap.set(cartModal, { display: "none" });
      cartModal.setAttribute("aria-hidden", "true");
      openModal(confirmDeleteModal);
    }});
  });

  document.getElementById("confirm-delete-yes").addEventListener("click", () => {
    if (currentDeleteType === 'item' && currentDeleteItem) {
      delete cart[currentDeleteItem];
      showNotif(`${currentDeleteItem} dihapus dari keranjang`);
      currentDeleteItem = null;
    } else if (currentDeleteType === 'all') {
      Object.keys(cart).forEach(key => delete cart[key]);
      showNotif("Semua item berhasil dihapus");
    }
    
    updateCartCount();
    updateCartTotal();
    
    // Close confirm delete modal and open cart modal
    gsap.to(confirmDeleteModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
      gsap.set(confirmDeleteModal, { display: "none" });
      confirmDeleteModal.setAttribute("aria-hidden", "true");
      renderCart(); // Re-render cart to show updated state
      openModal(cartModal); // Open cart modal again
    }});
    
    currentDeleteType = null;
  });

  document.getElementById("confirm-delete-no").addEventListener("click", () => {
    currentDeleteItem = null;
    currentDeleteType = null;
    goBackToPreviousModal();
  });

  // Checkout handler
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
      showNotif("Keranjang kosong");
      closeModal(cartModal);
      return;
    }
    
    // Close cart modal first, then open payment modal
    gsap.to(cartModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
      gsap.set(cartModal, { display: "none" });
      cartModal.setAttribute("aria-hidden", "true");
      openModal(paymentModal);
    }});
  });

  // Payment method handlers
  document.getElementById("pay-cash").addEventListener("click", () => {
    currentPaymentMethod = "Tunai";
    currentOrderData = {
      method: "cash",
      info: "Pembayaran tunai saat pengambilan pesanan"
    };
    
    document.getElementById("info-title").textContent = "Pembayaran Tunai";
    document.getElementById("info-content").innerHTML = `
      
      <div class="text-center py-4">
        <div class="text-6xl mb-3">
          <i class="fas fa-money-bill-wave text-green-500"></i>
        </div>
        <p class="text-gray-600 mb-2">Siapkan uang tunai saat pengambilan pesanan</p>
        <p class="font-semibold text-lg">Total: Rp ${Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0).toLocaleString('id-ID')}</p>
      </div>
    `;
    // Hide QR code for cash payment
    danaQrCodeImg.classList.add('hidden');
    danaQrCodeImg.src = '';

    // Close payment modal first, then open info modal
    gsap.to(paymentModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
      gsap.set(paymentModal, { display: "none" });
      paymentModal.setAttribute("aria-hidden", "true");
      openModal(infoModal);
    }});
  });

  document.getElementById("pay-dana").addEventListener("click", () => {
    currentPaymentMethod = "DANA";
    currentOrderData = {
      method: "dana",
      number: DANA_NUMBER,
      name: DANA_NAME
    };
    
    document.getElementById("info-title").textContent = "Pembayaran DANA";
    document.getElementById("info-content").innerHTML = `
      <div class="space-y-3">
        <div class="info-item">
          <span class="info-left">Nomor DANA:</span>
          <span class="info-right">
            ${DANA_NUMBER}
            <button class="copy-btn-inline" onclick="copyToClipboard(\`${DANA_NUMBER}\`)">
              <i class="fas fa-copy"></i>
            </button>
          </span>
        </div>
        <div class="info-item">
          <span class="info-left">Atas Nama:</span>
          <span class="info-right">${DANA_NAME}</span>
        </div>
        <div class="info-item">
          <span class="info-left">Total Bayar:</span>
          <span class="info-right">Rp ${Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0).toLocaleString('id-ID')}</span>
        </div>
        <p class="text-sm text-center text-gray-500 dark:text-gray-300">Silakan scan QR Code atau transfer ke nomor DANA di atas, lalu klik "Kirim WA" untuk konfirmasi pesanan</p>
      </div>
    `;
    // Show QR code for DANA payment
    danaQrCodeImg.src = DANA_QR_CODE_PATH;
    danaQrCodeImg.classList.remove('hidden');

    // Close payment modal first, then open info modal
    gsap.to(paymentModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
      gsap.set(paymentModal, { display: "none" });
      paymentModal.setAttribute("aria-hidden", "true");
      openModal(infoModal);
    }});
  });

  document.getElementById("pay-transfer").addEventListener("click", () => {
    currentPaymentMethod = "Transfer Bank";
    currentOrderData = {
      method: "transfer",
      number: BANK_NUMBER,
      name: BANK_NAME
    };
    
    document.getElementById("info-title").textContent = "Transfer Bank";
    document.getElementById("info-content").innerHTML = `
      <div class="space-y-3">
        <div class="info-item">
          <span class="info-left">No. Rekening:</span>
          <span class="info-right">
            ${BANK_NUMBER}
            <button class="copy-btn-inline" onclick="copyToClipboard(\`${BANK_NUMBER}\`)">
              <i class="fas fa-copy"></i>
            </button>
          </span>
        </div>
        <div class="info-item">
          <span class="info-left">Atas Nama:</span>
          <span class="info-right">${BANK_NAME}</span>
        </div>
        <div class="info-item">
          <span class="info-left">Total Bayar:</span>
          <span class="info-right">Rp ${Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0).toLocaleString('id-ID')}</span>
        </div>
        <p class="text-sm text-center text-gray-500 dark:text-gray-300">Silakan transfer ke rekening di atas, lalu klik "Kirim WA" untuk konfirmasi pesanan</p>
      </div>
    `;
    // Hide QR code for bank transfer
    danaQrCodeImg.classList.add('hidden');
    danaQrCodeImg.src = '';

    // Close payment modal first, then open info modal
    gsap.to(paymentModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
      gsap.set(paymentModal, { display: "none" });
      paymentModal.setAttribute("aria-hidden", "true");
      openModal(infoModal);
    }});
  });

  // Info modal handlers
  document.getElementById("send-wa").addEventListener("click", sendToWhatsApp);
  document.getElementById("close-info").addEventListener("click", closeAllModals);

  // Dark mode toggle (Desktop)
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    if (theme === 'dark') {
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun');
    } else {
      document.body.classList.remove('dark');
      darkModeIcon.classList.remove('fa-sun');
      darkModeIcon.classList.add('fa-moon');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // If localStorage is not available, continue without saving
    }
  });

  // Overlay click handler
  overlay.addEventListener("click", () => {
    if (mobileMenuOpen) {
      hamburger.click();
    } else {
      if (modalStack.length > 0) {
        closeModal(modalStack[modalStack.length - 1]);
      }
    }
  });

  // Dynamic product buttons
  container.addEventListener("click", (e) => {
    const target = e.target;
    const orderButton = target.closest('.btn-pesan');
    const wishlistButton = target.closest('.btn-wishlist');

    if (orderButton) {
      const name = orderButton.dataset.name;
      const price = Number(orderButton.dataset.price);
      if (cart[name]) {
        cart[name].qty++;
      } else {
        cart[name] = { name, price, qty: 1 };
      }
      updateCartCount();
      showNotif(`${name} ditambahkan ke keranjang`);
    }
    
    if (wishlistButton) {
      const name = wishlistButton.dataset.name;
      const price = Number(wishlistButton.dataset.price);
      const kategori = wishlistButton.dataset.kategori;
      
      if (wishlist[name]) {
        delete wishlist[name];
        showNotif(`${name} dihapus dari wishlist`);
      } else {
        wishlist[name] = { name, price, kategori };
        showNotif(`${name} ditambahkan ke wishlist`);
      }
      updateWishlistCount();
      updateWishlistButtonsState();
    }
  });

  // Initialize Swiper
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  
  // Fungsi Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let mobileMenuOpen = false;

  hamburger.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    hamburger.classList.toggle('open', mobileMenuOpen);
    
    if (mobileMenuOpen) {
      gsap.set(mobileMenu, { display: 'block', y: -20, opacity: 0 }); // Set initial state
      gsap.to(mobileMenu, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(mobileMenu, {
        y: -20, opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => { 
          gsap.set(mobileMenu, { display: 'none' }); // Hide completely after animation
        }
      });
    }
  });

  // Sinkronisasi badge
  const cartCountMobile = document.getElementById('cart-count-mobile');
  const wishlistCountMobile = document.getElementById('wishlist-count-mobile');
  function syncMobileCounts() {
    if (cartCountMobile) {
      cartCountMobile.textContent = document.getElementById('cart-count').textContent;
    }
    if (wishlistCountMobile) {
      wishlistCountMobile.textContent = document.getElementById('wishlist-count').textContent;
    }
  }
  syncMobileCounts();
  

// Auto-close mobile menu when resizing to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024 && mobileMenuOpen) {
    mobileMenuOpen = false;
    hamburger.classList.remove('open');
    gsap.set(mobileMenu, { display: 'none', y: -100, opacity: 0 }); // Ensure it's hidden
  }
  // Ensure mobile menu items are removed/added based on screen size
  updateMobileMenuItems();
});

setInterval(syncMobileCounts, 500);

  // Mobile menu navigation
  document.getElementById('mobile-wishlist').addEventListener('click', () => {
    renderWishlist();
    openModal(wishlistModal);
    hamburger.click(); // Close hamburger menu after opening modal
  });
  
  document.querySelectorAll('.mobile-menu a.nav-link-mobile').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      smoothScrollTo(target);
      hamburger.click(); // Close hamburger menu after navigation
    });
  });
  
  const headerEl = document.querySelector("header");

  function updateHeaderOnScroll() {
    if (window.scrollY > 0) {
      headerEl.classList.add("scrolled");
      headerEl.classList.remove("top");
    } else {
      headerEl.classList.add("top");
      headerEl.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeaderOnScroll);
  window.addEventListener("load", updateHeaderOnScroll);

  renderMenu();

  function smoothScrollTo(target) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const headerHeight = document.querySelector('header').offsetHeight;
    const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    gsap.to(window, {
      duration: 1, // Durasi animasi scroll
      scrollTo: {
        y: offsetPosition,
        autoKill: true
      },
      ease: "power2.inOut", // Animasi smooth
    });

    gsap.fromTo(targetElement,
      { backgroundColor: "rgba(249, 115, 22, 0.15)" },
      {
        backgroundColor: "transparent",
        duration: 1.5,
        ease: "power1.out",
        clearProps: "backgroundColor"
      }
    );
  }

  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');

      if(mobileMenuOpen) {
        hamburger.click(); // Close mobile menu
        // Add a small delay if needed for the menu to close before scrolling
        setTimeout(() => smoothScrollTo(target), 300); 
      } else {
        smoothScrollTo(target);
      }
    });
  });

  if(window.location.hash) {
    setTimeout(() => {
      smoothScrollTo(window.location.hash);
    }, 100);
  }

  let isScrolling;
  window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      updateHeaderOnScroll();
    }, 100);
  }, false);

  // --- New Contact Modals Logic ---

  // Toggle dropdowns
  whatsappContactBtn.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click from closing immediately
    whatsappDropdownContent.style.display = whatsappDropdownContent.style.display === 'block' ? 'none' : 'block';
    emailDropdownContent.style.display = 'none'; // Close other dropdown
  });

  emailContactBtn.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click from closing immediately
    emailDropdownContent.style.display = emailDropdownContent.style.display === 'block' ? 'none' : 'block';
    whatsappDropdownContent.style.display = 'none'; // Close other dropdown
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(event) {
    if (!whatsappContactBtn.contains(event.target) && !whatsappDropdownContent.contains(event.target)) {
      whatsappDropdownContent.style.display = 'none';
    }
    if (!emailContactBtn.contains(event.target) && !emailDropdownContent.contains(event.target)) {
      emailDropdownContent.style.display = 'none';
    }
  });

  // Handle dropdown item clicks
  document.querySelectorAll('.contact-dropdown-content a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const action = this.dataset.action;
      
      // Close all dropdowns
      whatsappDropdownContent.style.display = 'none';
      emailDropdownContent.style.display = 'none';

      if (action === 'order-event-wa') {
        currentContactActionType = 'whatsapp';
        currentContactAction = 'order-event';
        openModal(orderEventModal);
        resetOrderEventForm();
      } else if (action === 'report-bug-wa') {
        currentContactActionType = 'whatsapp';
        currentContactAction = 'report-bug';
        openModal(reportBugModal);
        resetReportBugForm();
      } else if (action === 'order-event-email') {
        currentContactActionType = 'email';
        currentContactAction = 'order-event';
        // Simulate Google login success
        showBadge(loginSuccessBadge, "Berhasil Login!");
        setTimeout(() => {
          openModal(orderEventModal);
          resetOrderEventForm();
        }, 1000); // Delay to show login success badge
      } else if (action === 'report-bug-email') {
        currentContactActionType = 'email';
        currentContactAction = 'report-bug';
        // Simulate Google login success
        showBadge(loginSuccessBadge, "Berhasil Login!");
        setTimeout(() => {
          openModal(reportBugModal);
          resetReportBugForm(); // Fixed: should be resetReportBugForm
        }, 1000); // Delay to show login success badge
      }
    });
  });

  // Order Event Modal Logic
  submitOrderEventBtn.addEventListener('click', () => {
    const name = orderNameInput.value.trim();
    const wa = orderWaInput.value.trim();
    const eventName = orderEventNameInput.value.trim();
    const date = orderDateInput.value;
    const address = orderAddressInput.value.trim();

    if (!name || !wa || !eventName || !date || !address) {
      showNotif("Harap lengkapi semua kolom!");
      return;
    }

    const formattedDate = new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    if (currentContactActionType === 'whatsapp') {
      const message = `Halo Kedai Mas Haris, saya ingin memesan untuk acara:\n\n` +
                      `Nama Pemesan: ${name}\n` +
                      `No. WA: ${wa}\n` +
                      `Acara: ${eventName}\n` +
                      `Dipesan untuk Tanggal: ${formattedDate}\n` +
                      `Alamat Dituju: ${address}\n\n` +
                      `Mohon konfirmasi pesanan ini. Terima kasih!`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${WA_PHONE}?text=${encodedMessage}`, '_blank');
      showBadge(sentBadge, "Pesanan acara terkirim!");
    } else if (currentContactActionType === 'email') {
      const subject = `Order Acara: ${eventName} oleh ${name}`;
      const body = `Yth. Kedai Mas Haris,\n\n` +
                   `Saya ingin memesan produk untuk acara berikut:\n\n` +
                   `Nama Pemesan: ${name}\n` +
                   `No. WA: ${wa}\n` +
                   `Acara: ${eventName}\n` +
                   `Dipesan untuk Tanggal: ${formattedDate}\n` +
                   `Alamat Dituju: ${address}\n\n` +
                   `Mohon konfirmasi pesanan ini. Terima kasih.\n\n` +
                   `Hormat saya,\n${name}`;
      
      // Simulate sending email via mailto with CC
      const mailtoLink = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${encodeURIComponent(CC_EMAIL)}`;
      window.location.href = mailtoLink; // This will open the user's default email client
      showBadge(sentBadge, "Email pesanan terkirim!");
    }
    closeAllModals();
  });

  document.getElementById("close-order-event-modal").addEventListener('click', closeAllModals);

  function resetOrderEventForm() {
    orderNameInput.value = '';
    orderWaInput.value = '';
    orderEventNameInput.value = '';
    orderDateInput.value = '';
    orderAddressInput.value = '';
  }

  // Report Bug Modal Logic
  bugDescriptionInput.addEventListener('input', () => {
    const currentLength = bugDescriptionInput.value.length;
    bugCharCount.textContent = `${currentLength}/500`;
  });

  submitReportBugBtn.addEventListener('click', () => {
    const title = bugTitleInput.value.trim();
    const description = bugDescriptionInput.value.trim();

    if (!title || !description) {
      showNotif("Judul dan Deskripsi bug harus diisi!");
      return;
    }

    if (currentContactActionType === 'whatsapp') {
      const message = `Laporan Bug:\n\n` +
                      `Judul: ${title}\n` +
                      `Deskripsi: ${description}\n\n` +
                      `Terima kasih atas perhatiannya.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${WA_PHONE}?text=${encodedMessage}`, '_blank');
      showBadge(sentBadge, "Laporan bug terkirim!");
    } else if (currentContactActionType === 'email') {
      const subject = `Laporan Bug: ${title}`;
      const body = `Yth. Admin Kedai Mas Haris,\n\n` +
                   `Saya ingin melaporkan bug yang saya temukan:\n\n` +
                   `Judul Bug: ${title}\n` +
                   `Deskripsi Bug:\n${description}\n\n` +
                   `Mohon segera ditindaklanjuti. Terima kasih.\n\n` +
                   `Hormat saya,\n[Nama Anda (opsional)]`;
      
      const mailtoLink = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${encodeURIComponent(CC_EMAIL)}`;
      window.location.href = mailtoLink;
      showBadge(sentBadge, "Email laporan bug terkirim!");
    }
    closeAllModals();
  });

  document.getElementById("close-report-bug-modal").addEventListener('click', closeAllModals);

  function resetReportBugForm() {
    bugTitleInput.value = '';
    bugDescriptionInput.value = '';
    bugCharCount.textContent = '0/500';
  }

  // Function to update mobile menu items based on screen size
  function updateMobileMenuItems() {
    // This function is intentionally left empty or minimal based on previous instructions
    // to remove search, cart, and dark mode from the mobile menu.
    // If you wish to re-add them conditionally, this is where the logic would go.
  }

  // Initial call to set up mobile menu items
  updateMobileMenuItems();

  // Back to Top button logic
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { // Show button after scrolling 200px
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    gsap.to(window, {
      duration: 1, // Durasi animasi scroll
      scrollTo: {
        y: 0, // Scroll ke paling atas
        autoKill: true
      },
      ease: "power2.inOut" // Animasi smooth
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const headerOffset = document.querySelector('header')?.offsetHeight || 60;
  function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: headerOffset },
        ease: "power2.inOut"
      });
    }
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith("#")) {
      link.addEventListener('click', function(e) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          scrollToSection(href);
        }
      });
    }
  });
});

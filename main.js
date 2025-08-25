// ---------- Config & refs ----------
const WA_PHONE = "6281389868594";
const DANA_NUMBER = "081389868594";
const DANA_NAME = "Muhammad Haris Nugroho";
const BANK_NUMBER = "0058168424";
const BANK_NAME = "Muhammad Haris Nugroho";
const MY_EMAIL = "mhdharisn21@gmail.com";
const CC_EMAIL = "muhammad_nugroho@app.co.id"; // Email CC yang tidak diketahui user
const DANA_QR_CODE_PATH = "QR-Dana.jpeg"; // Path ke gambar QR Code DANA Anda

// New: Cooldown for update modal
const UPDATE_MODAL_COOLDOWN_KEY = 'updateModalCooldown';
const UPDATE_MODAL_COOLDOWN_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const LAST_SEEN_UPDATE_VERSION_KEY = 'lastSeenUpdateVersion'; // Key for storing last seen version

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
const updateModal = document.getElementById("update-modal"); // New: Update Modal
const productDetailModal = document.getElementById("product-detail-modal"); // New: Product Detail Modal

// Badges
const copiedBadge = document.getElementById("copied");
const sentBadge = document.getElementById("sent");
const loginSuccessBadge = document.getElementById("login-success-badge");

// Search elements
const searchInput = document.getElementById("search-input");
const doSearchBtn = document.getElementById("do-search");
// const closeSearchBtn = document.getElementById("close-search"); // Removed: Replaced by universal close button

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

// New: Update Modal Elements
const updateContent = document.getElementById("update-content");
const promoText = document.getElementById("promo-text");
// const closeUpdateModalBtn = document.getElementById("close-update-modal"); // Removed: Replaced by universal close button
const dontShowAgainCheckbox = document.getElementById("dont-show-again"); // New: Checkbox
const dispersionCanvas = document.getElementById("dispersion-canvas");

// Promo elements
const promoCodeInput = document.getElementById("promo-code-input");
const applyPromoBtn = document.getElementById("apply-promo-btn");
const promoMessage = document.getElementById("promo-message");
const promoPriceDisplay = document.getElementById("promo-price-display"); // New: Promo Price Display
const originalTotalSpan = document.getElementById("original-total"); // New: Original Total Span
const discountedTotalSpan = document.getElementById("discounted-total"); // New: Discounted Total Span

// Product Detail Modal Elements
const productDetailTitle = document.getElementById("product-detail-title");
const productDetailImagesContainer = document.getElementById("product-detail-images");
const productDetailDescription = document.getElementById("product-detail-description");
const productDetailPrice = document.getElementById("product-detail-price");
const detailMinusBtn = document.getElementById("detail-minus-btn");
const detailPlusBtn = document.getElementById("detail-plus-btn");
const detailQtyDisplay = document.getElementById("detail-qty-display");
const addToCartDetailBtn = document.getElementById("add-to-cart-detail-btn");
const addToWishlistDetailBtn = document.getElementById("add-to-wishlist-detail-btn");
const productVariantsContainer = document.getElementById("product-variants-container");
const productVariantsOptions = document.getElementById("product-variants-options");
const productToppingsContainer = document.getElementById("product-toppings-container"); // New: Toppings Container
const productToppingsOptions = document.getElementById("product-toppings-options"); // New: Toppings Options
const relatedProductsModalList = document.getElementById("related-products-modal-list");
const relatedProductsSection = document.getElementById("related-products-section");
const relatedProductsContainer = document.getElementById("related-products-container");

// Global variables for product detail modal
let currentProductDetail = null;
let currentProductDetailQty = 1;
let selectedVariant = null;
let selectedToppings = {};


// ---------- Data ----------
const productList = [
  {
    name: "Lemper",
    price: 3000,
    kategori: "Karbohidrat",
    description: "Lemper ketan isi ayam suwir gurih, dibungkus daun pisang.",
    images: ["https://via.placeholder.com/120?text=Lemper+1", "https://via.placeholder.com/120?text=Lemper+2", "https://via.placeholder.com/120?text=Lemper+3"]
  },
  {
    name: "Sosis Solo",
    price: 3000,
    kategori: "Gorengan",
    description: "Sosis Solo dengan isian daging ayam cincang yang lezat, dibalut kulit tipis nan lembut.",
    images: ["https://via.placeholder.com/120?text=Sosis+Solo+1", "https://via.placeholder.com/120?text=Sosis+Solo+2", "https://via.placeholder.com/120?text=Sosis+Solo+3"]
  },
  {
    name: "Sus",
    price: 3000,
    kategori: "Manis",
    description: "Kue sus lembut dengan isian vla manis dan creamy.",
    images: ["https://via.placeholder.com/120?text=Sus+1", "https://via.placeholder.com/120?text=Sus+2", "https://via.placeholder.com/120?text=Sus+3"]
  },
  {
    name: "Pie Buah",
    price: 3000,
    kategori: "Manis",
    description: "Pie renyah dengan vla lembut dan topping buah-buahan segar.",
    images: ["https://via.placeholder.com/120?text=Pie+Buah+1", "https://via.placeholder.com/120?text=Pie+Buah+2", "https://via.placeholder.com/120?text=Pie+Buah+3"]
  },
  {
    name: "Risol Mayonais",
    price: 3000,
    kategori: "Gorengan",
    description: "Risol renyah dengan isian sosis, telur, dan mayonais creamy.",
    images: ["https://via.placeholder.com/120?text=Risol+Mayonais+1", "https://via.placeholder.com/120?text=Risol+Mayonais+2", "https://via.placeholder.com/120?text=Risol+Mayonais+3"]
  },
  {
    name: "Pastel Bihun",
    price: 3000,
    kategori: "Gorengan",
    description: "Pastel gurih dengan isian bihun dan sayuran.",
    images: ["https://via.placeholder.com/120?text=Pastel+Bihun+1", "https://via.placeholder.com/120?text=Pastel+Bihun+2", "https://via.placeholder.com/120?text=Pastel+Bihun+3"]
  },
  {
    name: "Cente Manis / Hunkwe",
    price: 3000,
    kategori: "Manis",
    description: "Kue tradisional Cente Manis atau Hunkwe, kenyal dan manis.",
    images: ["https://via.placeholder.com/120?text=Cente+Manis+1", "https://via.placeholder.com/120?text=Cente+Manis+2", "https://via.placeholder.com/120?text=Cente+Manis+3"]
  },
  {
    name: "Nasi Uduk",
    price: 8000,
    kategori: "Karbohidrat",
    description: "Nasi uduk gurih dengan aroma rempah khas, cocok untuk sarapan atau makan siang.",
    images: ["https://via.placeholder.com/120?text=Nasi+Uduk+1", "https://via.placeholder.com/120?text=Nasi+Uduk+2", "https://via.placeholder.com/120?text=Nasi+Uduk+3"],
    variants: [
      { name: "Polos", price: 0, description: "Nasi, Orek, Bihun, Sambal" }
    ],
    toppings: [
      { name: "Telor ½ Bulet Balado", price: 2000 },
      { name: "Telor Bulet Balado", price: 4000 },
      { name: "Telor Dadar", price: 4000 },
      { name: "Telor Ceplok", price: 4000 },
      { name: "Bakwan", price: 1000 },
      { name: "Tempe Orek", price: 2000 },
      { name: "Bihun Goreng", price: 2000 }
    ]
  },
  {
    name: "Nasi Kuning",
    price: 8000,
    kategori: "Karbohidrat",
    description: "Nasi kuning harum dengan lauk pelengkap, hidangan istimewa untuk berbagai acara.",
    images: ["https://via.placeholder.com/120?text=Nasi+Kuning+1", "https://via.placeholder.com/120?text=Nasi+Kuning+2", "https://via.placeholder.com/120?text=Nasi+Kuning+3"],
    variants: [
      { name: "Polos", price: 0, description: "Nasi, Orek, Bihun, Sambal" }
    ],
    toppings: [
      { name: "Telor ½ Bulet Balado", price: 2000 },
      { name: "Telor Bulet Balado", price: 4000 },
      { name: "Telor Dadar", price: 4000 },
      { name: "Telor Ceplok", price: 4000 },
      { name: "Bakwan", price: 1000 },
      { name: "Tempe Orek", price: 2000 },
      { name: "Bihun Goreng", price: 2000 }
    ]
  },
];

// New: Update Log Data
const updateLog = [
  {
    version: "1.0.3",
    date: "2025-08-25",
    changes: [
      "Kode promo diperpanjang hingga 29 Agustus 2025 pukul 17.00",
      "Fix bug button kode promo",
      "Adding button back/exit pada setiap menu.",
      "Fix animasi pada (Menu di Kategori yang anda suka)"
    ]
  },
  {
    version: "1.0.2",
    date: "2025-08-24",
    changes: [
      "Penambahan Menu Nasi Uduk/Kuning dengan disediakan all topping",
      "Fix bug kode promo",
      "Perbaikan animasi di semua layout."
    ]
  },
  {
    version: "1.0.1",
    date: "2025-08-21",
    changes: [
      "Perbaikan tombol 'Pesan' pada setiap menu untuk pengguna handphone.",
      "Penambahan tombol 'back to the top'.",
      "Perbaikan animasi.",
      "Penambahan kode promo terbatas."
    ]
  },
  {
    version: "1.0.0",
    date: "2025-08-20",
    changes: [
      "Aplikasi eCatalog Kedai Mas Haris resmi diluncurkan!",
      "Fitur keranjang belanja, wishlist, search produk tersedia.",
      "Mode terang dan gelap untuk kenyamanan pengguna.",
      "6 Menu tersedia (Lemper, Sosis Solo, Sus, Pie Buah, Cente Manis / Hunkwe / Risol Mayonais / Pastel Bihun)."
    ]
  }
];

const currentPromo = {
  code: "DISKON10", // Kode promo yang Anda inginkan
  discountPercentage: 0.10, // 10% diskon
  minPurchase: 20000, // Minimal pembelian Rp 20.000
  startDate: new Date("2025-08-21T20:00:00"), // Kamis, 21 Agustus 2025 pukul 20.00
  endDate: new Date("2025-08-29T17:00:00"), // Selasa, 29 Agustus 2025 pukul 17.00
  text: "Dapatkan diskon 10% untuk pembelian minimal Rp 20.000! Diperpanjang berlaku hingga 29 Agustus 2025 pukul 17.00 dengan kode promo: DISKON10."
};

// Cart & Wishlist state
let cart = {}; // Changed to let for re-assignment from localStorage
let wishlist = {}; // Changed to let for re-assignment from localStorage
let usedPromoCodes = new Set(); // New: To store used promo codes
let currentEditItem = null;
let currentDeleteItem = null;
let currentDeleteType = null;
let modalStack = [];
let currentPaymentMethod = '';
let currentOrderData = {};
let currentContactActionType = ''; // 'whatsapp' or 'email'
let currentContactAction = ''; // 'order-event' or 'report-bug'
let promoApplied = false; // Status apakah promo sedang diterapkan pada keranjang saat ini
let finalDiscountedPrice = 0; // New: To store the final price after discount

// New: Promo usage tracking per user (stored in localStorage)
const PROMO_USAGE_KEY = 'promoUsage';
const MAX_PROMO_USAGE = 3; // Max 3 times per user
let promoUsage = {}; // { 'DISKON10': { count: 0, currentTransactionId: null } }

// New: Unique ID for current transaction (to track promo usage within a single transaction)
let currentTransactionId = null;

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
  // Reset product detail modal state
  if (modal.id === 'product-detail-modal') {
    currentProductDetail = null;
    currentProductDetailQty = 1;
    selectedVariant = null;
    selectedToppings = {}; // Reset selected toppings
    // Destroy Swiper instance if it exists
    if (productDetailModal.swiper) {
      productDetailModal.swiper.destroy(true, true);
      productDetailModal.swiper = null;
    }
  }
}

function goBackToPreviousModal() {
  if (modalStack.length <= 1) {
    closeAllModals(); // If only one modal left, close all
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
  // Reset product detail modal state if going back from it
  if (currentModal.id === 'product-detail-modal') {
    currentProductDetail = null;
    currentProductDetailQty = 1;
    selectedVariant = null;
    selectedToppings = {}; // Reset selected toppings
    if (productDetailModal.swiper) {
      productDetailModal.swiper.destroy(true, true);
      productDetailModal.swiper = null;
    }
  }
}

function closeAllModals() {
  // Iterate through a copy of the stack to avoid issues with pop()
  [...modalStack].reverse().forEach((modal) => {
    gsap.to(modal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
      gsap.set(modal, { display: "none" });
      modal.setAttribute("aria-hidden", "true");
    }});
  });
  modalStack = []; // Clear the stack
  gsap.to(overlay, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
    gsap.set(overlay, { display: "none" });
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.pointerEvents = "none";
  }});
  // New: Hide QR code when closing all modals
  danaQrCodeImg.classList.add('hidden');
  danaQrCodeImg.src = ''; // Clear src

  // Reset product detail modal state
  currentProductDetail = null;
  currentProductDetailQty = 1;
  selectedVariant = null;
  selectedToppings = {}; // Reset selected toppings
  if (productDetailModal.swiper) {
    productDetailModal.swiper.destroy(true, true);
    productDetailModal.swiper = null;
  }

  // Reset promo state when all modals are closed (e.g., after a successful transaction)
  // IMPORTANT: Only reset promoApplied and input value here.
  // The usedPromoCodes set should NOT be cleared here, as it tracks used codes across transactions.
  promoApplied = false;
  promoCodeInput.value = '';
  promoMessage.classList.add('hidden');
  updateCartTotal(); // Ensure total is reset
}

// ---------- Persistensi Data (New) ----------
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

function saveWishlistToLocalStorage() {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function loadWishlistFromLocalStorage() {
  const storedWishlist = localStorage.getItem('wishlist');
  if (storedWishlist) {
    wishlist = JSON.parse(storedWishlist);
  }
}

// New: Save/Load used promo codes (this is for the global `usedPromoCodes` set, not the `promoUsage` object)
function saveUsedPromoCodes() {
  localStorage.setItem('usedPromoCodes', JSON.stringify(Array.from(usedPromoCodes)));
}

function loadUsedPromoCodes() {
  const storedUsedPromoCodes = localStorage.getItem('usedPromoCodes');
  if (storedUsedPromoCodes) {
    usedPromoCodes = new Set(JSON.parse(storedUsedPromoCodes));
  }
}

// New: Save/Load promo usage data
function savePromoUsage() {
    localStorage.setItem(PROMO_USAGE_KEY, JSON.stringify(promoUsage));
}

function loadPromoUsage() {
    const storedPromoUsage = localStorage.getItem(PROMO_USAGE_KEY);
    if (storedPromoUsage) {
        promoUsage = JSON.parse(storedPromoUsage);
    }
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
  saveCartToLocalStorage(); // Save to localStorage on update
}

function updateCartTotal() {
  let total = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);
  let originalTotal = total; // Store original total before discount

  // Apply promo if active
  if (promoApplied) {
    finalDiscountedPrice = originalTotal * (1 - currentPromo.discountPercentage);
    promoPriceDisplay.classList.remove('hidden');
    originalTotalSpan.textContent = `Rp ${originalTotal.toLocaleString("id-ID")}`;
    discountedTotalSpan.textContent = `Rp ${finalDiscountedPrice.toLocaleString("id-ID")}`;
    document.getElementById("cart-total").style.display = 'none'; // Hide regular total
  } else {
    finalDiscountedPrice = originalTotal; // If no promo, final price is original total
    promoPriceDisplay.classList.add('hidden');
    document.getElementById("cart-total").style.display = 'block'; // Show regular total
  }

  document.getElementById("cart-total").textContent = "Rp " + originalTotal.toLocaleString("id-ID");
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
    promoMessage.classList.add('hidden'); // Hide promo message if cart is empty
    promoCodeInput.value = ''; // Clear promo input
    promoApplied = false; // Reset promo status
    updateCartTotal(); // Recalculate total
    return;
  }

  Object.entries(cart).forEach(([key, item]) => {
    const wrap = document.createElement("div");
    wrap.className = "flex justify-between items-center bg-gray-50 p-3 rounded-lg";

    let itemDetails = item.name;
    if (item.variant) {
      itemDetails += ` (${item.variant})`;
    }
    if (item.toppings && item.toppings.length > 0) {
      // Display toppings with their quantities
      const toppingStrings = item.toppings.map(t => `${t.name} (${t.qty})`);
      itemDetails += ` + ${toppingStrings.join(', ')}`;
    }

    wrap.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${item.images ? item.images[0] : `https://via.placeholder.com/50?text=${encodeURIComponent(item.name)}`}"
             class="w-10 h-10 object-cover rounded-lg">
        <div>
          <p class="font-medium text-sm">${itemDetails}</p>
          <p class="text-xs text-gray-500">Rp ${item.price.toLocaleString("id-ID")} x ${item.qty}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="edit-cart-btn" onclick="openEditCartModal('${key}')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete-item-btn" onclick="deleteCartItem('${key}')">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(wrap);
  });

  // Update cart total after rendering items
  updateCartTotal();
}

function openEditCartModal(itemKey) { // itemKey now includes variant if applicable
  currentEditItem = itemKey;
  const item = cart[itemKey];

  let itemDetails = item.name;
  if (item.variant) {
    itemDetails += ` (${item.variant})`;
  }
  if (item.toppings && item.toppings.length > 0) {
    const toppingStrings = item.toppings.map(t => `${t.name} (${t.qty})`);
    itemDetails += ` + ${toppingStrings.join(', ')}`;
  }

  document.getElementById("edit-item-name").textContent = itemDetails;
  document.getElementById("edit-item-price").textContent = `Rp ${item.price.toLocaleString("id-ID")}`;
  document.getElementById("edit-item-image").src = item.images ? item.images[0] : "https://via.placeholder.com/50?text=" + encodeURIComponent(item.name);
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

function deleteCartItem(itemKey) { // itemKey now includes variant if applicable
  currentDeleteItem = itemKey;
  currentDeleteType = 'item';
  const item = cart[itemKey];

  let itemDetails = item.name;
  if (item.variant) {
    itemDetails += ` (${item.variant})`;
  }
  if (item.toppings && item.toppings.length > 0) {
    const toppingStrings = item.toppings.map(t => `${t.name} (${t.qty})`);
    itemDetails += ` + ${toppingStrings.join(', ')}`;
  }

  document.getElementById("confirm-delete-message").textContent = `Hapus "${itemDetails}" dari keranjang?`;

  // Close cart modal first, then open confirm delete modal
  gsap.to(cartModal, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.in", onComplete: () => {
    gsap.set(cartModal, { display: "none" });
    cartModal.setAttribute("aria-hidden", "true");
    openModal(confirmDeleteModal);
  }});
}

// ---------- Fixed Promo Logic ----------
function applyPromoCode() {
  const inputCode = promoCodeInput.value.trim().toUpperCase();
  
  // Check if input is empty
  if (!inputCode) {
    showNotif("Masukkan kode promo terlebih dahulu");
    return;
  }

  const totalPriceInCart = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);
  const today = new Date();

  // Ensure a transaction ID exists for the current session
  if (!currentTransactionId) {
      currentTransactionId = Date.now().toString(); // Simple unique ID for the current session
  }

  // Get promo usage for the current promo code
  let promoData = promoUsage[inputCode] || { count: 0, currentTransactionId: null };
  const remainingUses = MAX_PROMO_USAGE - promoData.count;

  if (inputCode === currentPromo.code) {
      // Scenario 1: Promo already applied for this transaction
      if (promoApplied && promoData.currentTransactionId === currentTransactionId) {
          showNotif(`Maaf kode promo (${inputCode} - tersisa ${remainingUses}/${MAX_PROMO_USAGE}) sudah dipakai untuk transaksi ini, silahkan selesaikan terlebih dahulu baru bisa menggunakan kembali.`);
          return;
      }

      // Scenario 2: Promo usage limit reached
      if (remainingUses <= 0) {
          promoApplied = false;
          promoMessage.textContent = `Maaf kode promo yang anda masukkan sudah mencapai limit. Terima kasih 🙏`;
          promoMessage.classList.remove('hidden');
          updateCartTotal();
          return;
      }

      // Scenario 3: Promo not yet active
      if (today < currentPromo.startDate) {
          promoMessage.textContent = "Kode promo belum aktif.";
          promoMessage.classList.remove('hidden');
          promoApplied = false;
      }
      // Scenario 4: Promo expired
      else if (today > currentPromo.endDate) {
          promoMessage.textContent = "Maaf, kode promo sudah kadaluarsa.";
          promoMessage.classList.remove('hidden');
          promoApplied = false;
      }
      // Scenario 5: Minimum purchase not met
      else if (totalPriceInCart < currentPromo.minPurchase) {
          promoMessage.textContent = `Promo "${inputCode}" belum memenuhi syarat (minimal pembelian Rp ${currentPromo.minPurchase.toLocaleString("id-ID")}).`;
          promoMessage.classList.remove('hidden');
          promoApplied = false;
      }
      // Scenario 6: Promo successfully applied
      else {
          promoApplied = true;
          promoMessage.textContent = `Kode promo berhasil diterapkan! Anda mendapatkan diskon 10%! 🎉 (Sisa penggunaan: ${remainingUses})`;
          promoMessage.classList.remove('hidden');

          // Mark promo as used for this transaction
          promoData.currentTransactionId = currentTransactionId;
          promoUsage[inputCode] = promoData;
          savePromoUsage(); // Save updated usage to localStorage
      }
  } else {
      // Scenario 7: Invalid promo code
      promoMessage.textContent = "Kode promo tidak valid.";
      promoMessage.classList.remove('hidden');
      promoApplied = false;
  }
  updateCartTotal();
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
  saveWishlistToLocalStorage(); // Save to localStorage on update
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
  // Also update the detail modal wishlist button
  if (currentProductDetail) {
    if (wishlist[currentProductDetail.name]) {
      addToWishlistDetailBtn.classList.add("wishlist-active");
    } else {
      addToWishlistDetailBtn.classList.remove("wishlist-active");
    }
  }
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
      <img src="${item.images ? item.images[0] : `https://via.placeholder.com/60?text=${encodeURIComponent(item.name)}`}"
           class="w-12 h-12 object-cover rounded-lg">
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
  const item = productList.find(p => p.name === itemName); // Get full product data
  if (!item) return;

  const itemKey = item.name; // For simple products, key is just name
  if (cart[itemKey]) {
    cart[itemKey].qty++;
  } else {
    cart[itemKey] = {
      name: item.name,
      price: item.price,
      qty: 1,
      images: item.images ? item.images : []
    };
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
function displayProducts(list, targetContainer = container) {
  targetContainer.innerHTML = "";
  if (!list || !list.length) {
    const msg = document.createElement("div");
    msg.className = "col-span-full text-center py-8 text-gray-500";
    msg.innerHTML = `Maaf yang anda cari tidak/belum tersedia. 😔`;
    targetContainer.appendChild(msg);
    gsap.fromTo(msg, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.36, ease: "power2.out" });
    return;
  }

  list.forEach((item) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-name", item.name); // Add data-name for click listener

    const image = document.createElement("img");
    image.src = item.images && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/120?text=" + encodeURIComponent(item.name);
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

    if (wishlist[item.name]) {
      wishlistButton.classList.add("wishlist-active");
    }

    const orderButton = document.createElement("button");
    orderButton.className = "btn-pesan bg-orange-500 text-white text-sm px-4 py-1.5 rounded-full hover:bg-orange-600 transition-all flex-1";
    orderButton.textContent = "Pesan";
    orderButton.setAttribute("data-name", item.name);

    buttonContainer.append(wishlistButton, orderButton);
    card.append(image, title, price, buttonContainer);
    targetContainer.appendChild(card);
  });

  gsap.fromTo(
    targetContainer.children,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.36, stagger: 0.06, ease: "power2.out" }
  );
  updateWishlistButtonsState(); // Ensure wishlist state is updated after rendering products
}

function renderMenu(kategori = "all") {
  const filtered = kategori === "all" ? productList : productList.filter((item) => item.kategori === kategori);
  displayProducts(filtered);
  renderRelatedProducts(filtered); // Render related products on menu page
}

// ---------- Product Detail Modal Functions (New) ----------
function openProductDetailModal(itemName) {
  const product = productList.find(p => p.name === itemName);
  if (!product) return;

  currentProductDetail = product;
  currentProductDetailQty = 1;
  selectedVariant = null; // Reset selected variant
  selectedToppings = {}; // Reset selected toppings (object for quantities)

  productDetailTitle.textContent = product.name;
  productDetailDescription.textContent = product.description;
  detailQtyDisplay.textContent = currentProductDetailQty;
  updateDetailButtons(currentProductDetailQty);

  // Render images for Swiper
  productDetailImagesContainer.innerHTML = '';
  product.images.forEach((imgSrc, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    // Placeholder text for images
    // Changed background to white for light mode, and #1F2937 for dark mode
    slide.innerHTML = `<div class="flex items-center justify-center w-full h-48 bg-white dark:bg-gray-900 rounded-lg text-gray-600 dark:text-gray-300 text-lg font-semibold">Gambar ${index + 1}</div>`;
    productDetailImagesContainer.appendChild(slide);
  });

  // Initialize Swiper for product detail images
  // Destroy existing Swiper instance if it exists
  if (productDetailModal.swiper) {
    productDetailModal.swiper.destroy(true, true);
  }
  productDetailModal.swiper = new Swiper(".product-detail-swiper", {
    loop: true,
    autoplay: {
      delay: 2500, // Auto-scroll every 2.5 seconds
      disableOnInteraction: false, // Keep auto-scrolling even after user interaction
    },
    pagination: {
      el: ".product-detail-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        // Use text "Gambar X" as bullets
        return `<span class="${className} flex items-center justify-center"><span class="text-sm">Gambar ${index + 1}</span></span>`;
      },
    },
  });

  // Handle variants
  if (product.variants && product.variants.length > 0) {
    productVariantsContainer.classList.remove('hidden');
    productVariantsOptions.innerHTML = '';
    product.variants.forEach((variant, index) => {
      const variantId = `variant-${product.name.replace(/\s/g, '-')}-${index}`;
      const div = document.createElement('div');
      div.className = 'variant-option p-2 rounded-md flex items-center justify-between'; // Added class for styling
      div.innerHTML = `
        <label for="${variantId}" class="flex items-center gap-2 cursor-pointer flex-1">
          <input type="radio" id="${variantId}" name="product-variant" value="${variant.name}" data-price-offset="${variant.price}" class="form-radio text-orange-500">
          <span class="text-sm">${variant.name} (${variant.description})</span>
        </label>
        <span class="text-sm font-medium">${variant.price > 0 ? `+ Rp ${variant.price.toLocaleString("id-ID")}` : ''}</span>
      `;
      productVariantsOptions.appendChild(div);
    });

    // Add event listener for variant selection
    productVariantsOptions.querySelectorAll('input[name="product-variant"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        selectedVariant = {
          name: e.target.value,
          priceOffset: Number(e.target.dataset.priceOffset)
        };
        updateProductDetailPrice();
      });
    });
    // Select the first variant ("Polos") by default and update price
    const defaultVariantRadio = productVariantsOptions.querySelector('input[name="product-variant"][value="Polos"]');
    if (defaultVariantRadio) {
      defaultVariantRadio.checked = true;
      selectedVariant = {
        name: defaultVariantRadio.value,
        priceOffset: Number(defaultVariantRadio.dataset.priceOffset)
      };
    } else { // Fallback if "Polos" not found, select first
      productVariantsOptions.querySelector('input[name="product-variant"]').checked = true;
      selectedVariant = {
        name: product.variants[0].name,
        priceOffset: product.variants[0].price
      };
    }
    updateProductDetailPrice(); // Call to update price based on initial selection

  } else {
    productVariantsContainer.classList.add('hidden');
    productVariantsOptions.innerHTML = '';
    updateProductDetailPrice(); // Call to update price for products without variants
  }

  // Handle toppings (New)
  if (product.toppings && product.toppings.length > 0) {
    productToppingsContainer.classList.remove('hidden');
    productToppingsOptions.innerHTML = '';
    product.toppings.forEach((topping, index) => {
      const toppingId = `topping-${topping.name.replace(/\s/g, '-')}-${index}`;
      const div = document.createElement('div');
      div.className = 'topping-item p-2 rounded-md flex items-center justify-between'; // Added class for styling
      div.innerHTML = `
        <div class="flex items-center gap-2 flex-1">
          <span class="text-sm">${topping.name}</span>
          <span class="text-sm font-medium">${topping.price > 0 ? `(+ Rp ${topping.price.toLocaleString("id-ID")})` : ''}</span>
        </div>
        <div class="topping-controls flex items-center gap-2">
          <button type="button" class="qty-btn minus-red" data-topping-name="${topping.name}" data-action="minus-topping">
            <i class="fas fa-minus"></i>
          </button>
          <span class="topping-qty text-sm font-bold" id="topping-qty-${topping.name.replace(/\s/g, '-')}" data-topping-name="${topping.name}">0</span>
          <button type="button" class="qty-btn plus" data-topping-name="${topping.name}" data-action="plus-topping">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      `;
      productToppingsOptions.appendChild(div);

      // Initialize topping quantity to 0
      selectedToppings[topping.name] = { qty: 0, price: topping.price };
    });

    // Add event listeners for topping quantity buttons
    productToppingsOptions.querySelectorAll('.qty-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const toppingName = e.currentTarget.dataset.toppingName;
        const action = e.currentTarget.dataset.action;
        const toppingQtySpan = document.getElementById(`topping-qty-${toppingName.replace(/\s/g, '-')}`);

        if (action === 'plus-topping') {
          selectedToppings[toppingName].qty++;
        } else if (action === 'minus-topping' && selectedToppings[toppingName].qty > 0) {
          selectedToppings[toppingName].qty--;
        }
        toppingQtySpan.textContent = selectedToppings[toppingName].qty;
        updateProductDetailPrice();
        updateToppingButtonsState(toppingName);
      });
    });
    // Initial state for topping buttons
    product.toppings.forEach(topping => updateToppingButtonsState(topping.name));

  } else {
    productToppingsContainer.classList.add('hidden');
    productToppingsOptions.innerHTML = '';
  }

  // Update wishlist button state
  updateWishlistButtonsState(); // Call this to update the button in the modal

  renderRelatedProductsInModal(product); // Render related products in modal

  openModal(productDetailModal);
}

function updateToppingButtonsState(toppingName) {
  const qty = selectedToppings[toppingName].qty;
  const minusBtn = productToppingsOptions.querySelector(`button[data-topping-name="${toppingName}"][data-action="minus-topping"]`);
  if (minusBtn) {
    minusBtn.disabled = qty <= 0;
    minusBtn.className = qty <= 0 ? "qty-btn minus-gray" : "qty-btn minus-red";
  }
}

function updateProductDetailPrice() {
  let basePrice = currentProductDetail.price;
  if (currentProductDetail.variants && selectedVariant) {
    basePrice += selectedVariant.priceOffset;
  }
  // Add price of selected toppings based on their quantities
  for (const toppingName in selectedToppings) {
    basePrice += selectedToppings[toppingName].price * selectedToppings[toppingName].qty;
  }
  productDetailPrice.textContent = `Rp ${basePrice.toLocaleString("id-ID")}`;
}

function updateDetailButtons(qty) {
  detailMinusBtn.disabled = qty <= 1;
  detailMinusBtn.className = qty <= 1 ? "qty-btn minus-gray" : "qty-btn minus-red";
}

// ---------- Related Products Functions (New) ----------
function renderRelatedProducts(excludeProduct = null, targetContainer = relatedProductsContainer) {
  const allProducts = [...productList];
  let filteredProducts = allProducts;

  if (excludeProduct) {
    filteredProducts = allProducts.filter(p => p.name !== excludeProduct.name);
  }

  // Shuffle products and take a few (e.g., 4)
  const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
  const recommended = shuffled.slice(0, 4);

  if (recommended.length > 0) {
    relatedProductsSection.classList.remove('hidden');
    displayProducts(recommended, targetContainer); // Use displayProducts to render with full product-card style
  } else {
    relatedProductsSection.classList.add('hidden');
    targetContainer.innerHTML = '';
  }
}

function renderRelatedProductsInModal(currentProduct) {
  const allProducts = [...productList];
  const filteredProducts = allProducts.filter(p => p.name !== currentProduct.name);

  // Shuffle products and take a few (e.g., 2 for modal)
  const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
  const recommended = shuffled.slice(0, 2);

  relatedProductsModalList.innerHTML = '';
  if (recommended.length > 0) {
    recommended.forEach(item => {
      const card = document.createElement("div");
      // Use the same product-card class for consistency
      card.className = "product-card cursor-pointer"; // Added cursor-pointer for clickability
      card.setAttribute("data-name", item.name);
      card.innerHTML = `
        <img src="${item.images && item.images.length > 0 ? item.images[0] : `https://via.placeholder.com/120?text=${encodeURIComponent(item.name)}`}"
             class="w-full h-32 object-cover rounded-lg mb-3">
        <h4 class="font-semibold text-base mb-1">${item.name}</h4>
        <p class="text-sm text-green-600 mb-2">Rp ${item.price.toLocaleString("id-ID")}</p>
      `;
      card.addEventListener('click', () => {
        closeModal(productDetailModal); // Close current modal
        openProductDetailModal(item.name); // Open new modal for related product
      });
      relatedProductsModalList.appendChild(card);
    });
  } else {
    relatedProductsModalList.innerHTML = '<p class="text-center text-gray-500 text-sm col-span-2">Tidak ada rekomendasi.</p>';
  }
}


// ---------- Payment Functions ----------
function generateOrderMessage() {
  const items = Object.values(cart);
  let totalOriginal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  let totalAfterDiscount = finalDiscountedPrice; // Use the globally stored final discounted price

  let message = `🛒 *PESANAN BARU*\n\n`;
  message += `📍 *KEDAI MAS HARIS*\n`;
  message += `⏰ ${new Date().toLocaleString('id-ID')}\n\n`;
  message += `📋 *Detail Pesanan:*\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}`;
    if (item.variant) {
      message += ` (${item.variant})`;
    }
    if (item.toppings && item.toppings.length > 0) {
      const toppingStrings = item.toppings.map(t => `${t.name} (${t.qty})`);
      message += ` + ${toppingStrings.join(', ')}`;
    }
    message += `\n`;
    message += `   ${item.qty} x Rp ${item.price.toLocaleString('id-ID')} = Rp ${(item.qty * item.price).toLocaleString('id-ID')}\n\n`;
  });

  if (promoApplied) {
    message += `\n🎉 *PROMO DITERAPKAN!* 🎉\n`;
    message += `Menggunakan Kode Promo: *${currentPromo.code}*\n`;
    message += `Mendapatkan potongan ${currentPromo.discountPercentage * 100}% 💰\n`; // Emote diskon
    message += `Harga Asli: Rp ${totalOriginal.toLocaleString('id-ID')}\n`;
    message += `Diskon: Rp ${(totalOriginal - totalAfterDiscount).toLocaleString('id-ID')}\n`;
  }

  message += `💰 *Total Bayar: Rp ${totalAfterDiscount.toLocaleString('id-ID')}*\n\n`;
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

  // Update promo usage count if promo was applied for this transaction
  if (promoApplied && promoUsage[currentPromo.code] && promoUsage[currentPromo.code].currentTransactionId === currentTransactionId) {
      promoUsage[currentPromo.code].count++;
      promoUsage[currentPromo.code].currentTransactionId = null; // Reset transaction ID
      savePromoUsage(); // Save updated usage to localStorage
  }

  // Clear cart after sending order
  Object.keys(cart).forEach(key => delete cart[key]);
  updateCartCount();

  showBadge(sentBadge, "Pesanan terkirim");
  closeAllModals(); // This will also reset promoApplied and promoCodeInput.value

  // Generate a new transaction ID for the next potential transaction
  currentTransactionId = Date.now().toString();

  window.open(whatsappUrl, '_blank');
}

// ---------- New: Update Notification Modal Functions ----------
function renderUpdateModalContent() {
  updateContent.innerHTML = '';
  updateLog.forEach(log => {
    const updateItem = document.createElement('div');
    updateItem.className = 'update-item';

    const title = document.createElement('h4');
    title.textContent = `Versi ${log.version}`;
    updateItem.appendChild(title);

    // Mengubah format tanggal menjadi "Diperbarui pada [tanggal]"
    const dateElement = document.createElement('p');
    dateElement.className = 'update-date'; // Menambahkan kelas untuk styling
    dateElement.textContent = `Diperbarui pada ${new Date(log.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    updateItem.appendChild(dateElement);

    const ul = document.createElement('ul');
    ul.className = 'list-disc list-inside text-sm';
    log.changes.forEach(change => {
      const li = document.createElement('li');
      li.textContent = change;
      ul.appendChild(li);
    });
    updateItem.appendChild(ul);

    updateContent.appendChild(updateItem);
  });

  promoText.textContent = currentPromo.text;
}

function showUpdateModal() {
  renderUpdateModalContent();

  // Get the latest version from your updateLog data
  const latestVersion = updateLog[0].version;

  // Check if the latest version has been seen
  const lastSeenVersion = localStorage.getItem(LAST_SEEN_UPDATE_VERSION_KEY);

  // Check cooldown
  const lastShownTime = localStorage.getItem(UPDATE_MODAL_COOLDOWN_KEY);
  const currentTime = new Date().getTime();
  const isInCooldown = lastShownTime && (currentTime - parseInt(lastShownTime, 10) < UPDATE_MODAL_COOLDOWN_DURATION);

  // Only show if it's a new version OR if it's not in cooldown
  if (lastSeenVersion !== latestVersion || !isInCooldown) {
    openModal(updateModal);
    // Store the latest version as seen
    localStorage.setItem(LAST_SEEN_UPDATE_VERSION_KEY, latestVersion);
    // Reset checkbox state
    dontShowAgainCheckbox.checked = false;
  } else {
    console.log('Update modal is in cooldown or already seen. Not showing.');
  }
}

// ---------- New: Dispersion Effect with Three.js ----------
let scene, camera, renderer, mesh, material, geometry;
let uniforms;
let animationFrameId;

function initDispersionEffectWithTexture(canvasTextureSource, width, height, x, y) {
    // Set canvas size and position
    dispersionCanvas.width = window.innerWidth;
    dispersionCanvas.height = window.innerHeight;
    dispersionCanvas.style.display = 'block'; // Show canvas

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.OrthographicCamera(
        -window.innerWidth / 2, window.innerWidth / 2,
        window.innerHeight / 2, -window.innerHeight / 2,
        1, 1000
    );
    camera.position.z = 1;

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: dispersionCanvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const texture = new THREE.CanvasTexture(canvasTextureSource);

    // Shader Uniforms
    uniforms = {
        u_texture: { value: texture },
        u_progress: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_mouse: { value: new THREE.Vector2(x + width / 2, window.innerHeight - (y + height / 2)) }, // Center of modal
        u_time: { value: 0.0 }
    };

    // Shader Material
    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D u_texture;
            uniform float u_progress;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform float u_time;
            varying vec2 vUv;

            void main() {
                vec2 uv = vUv;
                vec2 mouse_uv = u_mouse / u_resolution; // Mouse position in UV space

                // Simple dispersion based on distance from mouse/center
                float dist = distance(uv, mouse_uv);
                float strength = smoothstep(0.0, 0.5, dist) * u_progress; // Dispersion strength increases with progress

                vec2 displaced_uv = uv + normalize(uv - mouse_uv) * strength * 0.1; // Displace UVs

                // Add some noise for a more organic look
                float noise = fract(sin(dot(uv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
                displaced_uv += noise * strength * 0.05;

                vec4 color = texture2D(u_texture, displaced_uv);

                // Fade out effect
                color.a *= (1.0 - u_progress);

                gl_FragColor = color;
            }
        `,
        transparent: true
    });

    // Plane Geometry (covering the modal area)
    geometry = new THREE.PlaneGeometry(width, height);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x + width / 2 - window.innerWidth / 2, window.innerHeight / 2 - (y + height / 2), 0); // Position in orthographic camera space
    scene.add(mesh);

    animateDispersion();
}

function animateDispersion() {
    uniforms.u_time.value += 0.05;
    uniforms.u_progress.value += 0.02; // Increase progress for dispersion
    if (uniforms.u_progress.value < 1.0) {
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animateDispersion);
    } else {
        cancelAnimationFrame(animationFrameId);
        dispersionCanvas.style.display = 'none'; // Hide canvas after animation
        // Clean up Three.js resources
        if (mesh) scene.remove(mesh);
        if (geometry) geometry.dispose();
        if (material) material.dispose();
        if (uniforms.u_texture.value) uniforms.u_texture.value.dispose();
        scene = null;
        camera = null;
        renderer = null;
        mesh = null;
        material = null;
        geometry = null;
        uniforms = null;
    }
}

function startDispersionEffect(modalElement) {
    // Temporarily show the modal to capture its content
    // Ensure modal is visible for html2canvas to capture it correctly
    modalElement.style.display = 'block';
    modalElement.setAttribute("aria-hidden", "false");
    modalElement.style.opacity = '1'; // Ensure it's fully opaque for capture
    modalElement.style.transform = 'translate(-50%, -50%) scale(1)'; // Ensure it's at its final size for capture

    html2canvas(modalElement, {
        backgroundColor: null, // Important for transparency
        useCORS: true // If there are images from other domains
    }).then(canvas => {
        // Hide the original HTML modal after capturing the image
        modalElement.style.display = 'none';
        modalElement.setAttribute("aria-hidden", "true");
        modalElement.style.opacity = '0'; // Reset opacity
        modalElement.style.transform = 'translate(-50%, -50%) scale(0.8)'; // Reset transform

        // Get the bounding box of the modal from the original element for screen positioning
        const rect = modalElement.getBoundingClientRect();
        const width = canvas.width; // Use canvas dimensions for texture
        const height = canvas.height;
        const x = rect.left;
        const y = rect.top;

        // Initialize Three.js with the captured canvas as a texture
        initDispersionEffectWithTexture(canvas, width, height, x, y);

        // Ensure overlay is also closed after dispersion starts
        gsap.to(overlay, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
            gsap.set(overlay, { display: "none" });
            overlay.setAttribute("aria-hidden", "true");
            overlay.style.pointerEvents = "none";
        }});

    }).catch(error => {
        console.error("Error capturing modal with html2canvas:", error);
        // Fallback: Directly hide the modal if capture fails
        modalElement.style.display = 'none';
        modalElement.setAttribute("aria-hidden", "true");
        // Ensure overlay is also closed
        gsap.to(overlay, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
            gsap.set(overlay, { display: "none" });
            overlay.setAttribute("aria-hidden", "true");
            overlay.style.pointerEvents = "none";
        }});
    });
}


// ---------- Event Listeners ----------
document.addEventListener('DOMContentLoaded', () => {
  // Load data from localStorage
  loadCartFromLocalStorage();
  loadWishlistFromLocalStorage();
  loadUsedPromoCodes(); // New: Load used promo codes (this is for the global `usedPromoCodes` set, not the `promoUsage` object)
  loadPromoUsage(); // New: Load promo usage data

  // Generate a new transaction ID on page load
  currentTransactionId = Date.now().toString();

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
    closeAllModals(); // Close search modal after search
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

  // Cart button - FIXED: Reset promo state properly when opening cart
  document.getElementById("cart-btn").addEventListener("click", () => {
    // Reset promo input and message when opening cart
    promoCodeInput.value = '';
    promoMessage.classList.add('hidden');
    promoApplied = false; // Reset promo status completely when opening cart
    updateCartTotal(); // Ensure total is recalculated without any promo

    if (Object.keys(cart).length === 0) {
      showNotif("Keranjang kosong");
      return; // Do not open modal if cart is empty
    }
    renderCart();
    openModal(cartModal);
  });

  // Promo code handlers
  applyPromoBtn.addEventListener('click', applyPromoCode);
  promoCodeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      applyPromoCode();
    }
  });

  // Wishlist button
  document.getElementById("wishlist-btn").addEventListener("click", () => {
    renderWishlist();
    openModal(wishlistModal);
  });

  // Edit cart handlers
  document.getElementById("edit-minus-btn").addEventListener("click", () => {
    if (currentEditItem && cart[currentEditItem] && cart[currentEditItem].qty > 1) {
      cart[currentEditItem].qty--;
      document.getElementById("edit-qty-display").textContent = cart[currentEditItem].qty;
      updateEditButtons(cart[currentEditItem].qty);
      showNotif(`Jumlah ${cart[currentEditItem].name} berkurang`);
      updateCartTotal(); // Update total after quantity change
    }
  });

  document.getElementById("edit-plus-btn").addEventListener("click", () => {
    if (currentEditItem && cart[currentEditItem]) {
      cart[currentEditItem].qty++;
      document.getElementById("edit-qty-display").textContent = cart[currentEditItem].qty;
      updateEditButtons(cart[currentEditItem].qty);
      showNotif(`Jumlah ${cart[currentEditItem].name} bertambah`);
      updateCartTotal(); // Update total after quantity change
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
        <p class="font-semibold text-lg">Total: Rp ${finalDiscountedPrice.toLocaleString('id-ID')}</p>
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
          <span class="info-right">Rp ${finalDiscountedPrice.toLocaleString('id-ID')}</span>
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

    document.getElementById("info-title").textContent = "Pembayaran Transfer Bank";
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
          <span class="info-right">Rp ${finalDiscountedPrice.toLocaleString('id-ID')}</span>
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
    updateWishlistButtonsState(); // Update wishlist button colors on theme change
  });

  // Overlay click handler
  overlay.addEventListener("click", () => {
    const currentTopModal = modalStack[modalStack.length - 1];
    if (mobileMenuOpen) {
      hamburger.click();
    } else if (currentTopModal) {
      // If the top modal is the update modal, trigger dispersion
      if (currentTopModal === updateModal) {
        startDispersionEffect(updateModal);
        modalStack.pop(); // Remove from stack after starting dispersion
        // Overlay will be closed by startDispersionEffect
      } else {
        closeAllModals(); // Close all modals when clicking overlay
      }
    }
  });

  // Dynamic product buttons (for quick add to cart from menu grid)
  container.addEventListener("click", (e) => {
    const target = e.target;
    const orderButton = target.closest('.btn-pesan');
    const wishlistButton = target.closest('.btn-wishlist');
    const productCard = target.closest('.product-card'); // For opening detail modal

    if (orderButton) {
      const name = orderButton.dataset.name;
      const product = productList.find(p => p.name === name);
      if (!product) return;

      // If product has variants or toppings, open detail modal instead of direct add to cart
      if ((product.variants && product.variants.length > 0) || (product.toppings && product.toppings.length > 0)) {
        openProductDetailModal(name);
        return;
      }

      const itemKey = product.name;
      if (cart[itemKey]) {
        cart[itemKey].qty++;
      } else {
        cart[itemKey] = {
          name: product.name,
          price: product.price,
          qty: 1,
          images: product.images ? product.images : []
        };
      }
      updateCartCount();
      showNotif(`${name} ditambahkan ke keranjang`);
    }

    if (wishlistButton) {
      const name = wishlistButton.dataset.name;
      const product = productList.find(p => p.name === name);
      if (!product) return;

      if (wishlist[name]) {
        delete wishlist[name];
        showNotif(`${name} dihapus dari wishlist`);
      } else {
        wishlist[name] = {
          name: product.name,
          price: product.price,
          kategori: product.kategori,
          images: product.images ? product.images : []
        };
        showNotif(`${name} ditambahkan ke wishlist`);
      }
      updateWishlistCount();
      updateWishlistButtonsState();
    }

    // Open product detail modal when clicking on the card itself (excluding buttons)
    if (productCard && !orderButton && !wishlistButton) {
      const name = productCard.dataset.name;
      openProductDetailModal(name);
    }
  });

  // Product Detail Modal Event Listeners (New)
  detailMinusBtn.addEventListener("click", () => {
    if (currentProductDetailQty > 1) {
      currentProductDetailQty--;
      detailQtyDisplay.textContent = currentProductDetailQty;
      updateDetailButtons(currentProductDetailQty);
    }
  });

  detailPlusBtn.addEventListener("click", () => {
    currentProductDetailQty++;
    detailQtyDisplay.textContent = currentProductDetailQty;
    updateDetailButtons(currentProductDetailQty);
  });

  addToCartDetailBtn.addEventListener("click", () => {
    if (!currentProductDetail) return;

    let itemPrice = currentProductDetail.price;
    let itemName = currentProductDetail.name;
    let itemVariant = null;
    let itemToppings = []; // Array to store selected topping objects {name, qty, price}
    let itemToppingsPrice = 0;

    if (currentProductDetail.variants && selectedVariant) {
      itemPrice += selectedVariant.priceOffset;
      itemVariant = selectedVariant.name;
    }

    // Calculate topping price and prepare topping array for cart
    for (const toppingName in selectedToppings) {
      const toppingData = selectedToppings[toppingName];
      if (toppingData.qty > 0) {
        itemToppings.push({ name: toppingName, qty: toppingData.qty, price: toppingData.price });
        itemToppingsPrice += toppingData.price * toppingData.qty;
      }
    }
    itemPrice += itemToppingsPrice;

    // Construct a unique key for the cart item, including variant and toppings
    let itemKey = currentProductDetail.name;
    if (itemVariant) itemKey += `-${itemVariant}`;
    if (itemToppings.length > 0) {
      // Sort toppings by name for consistent key generation
      const sortedToppings = [...itemToppings].sort((a, b) => a.name.localeCompare(b.name));
      itemKey += `-${sortedToppings.map(t => `${t.name}_${t.qty}`).join('-')}`;
    }

    if (cart[itemKey]) {
      cart[itemKey].qty += currentProductDetailQty;
    } else {
      cart[itemKey] = {
        name: currentProductDetail.name,
        price: itemPrice, // This price now includes variant and topping prices
        qty: currentProductDetailQty,
        images: currentProductDetail.images ? currentProductDetail.images : [],
        variant: itemVariant,
        toppings: itemToppings // Store selected topping objects
      };
    }
    updateCartCount();
    let notifText = `${currentProductDetail.name}`;
    if (itemVariant) notifText += ` (${itemVariant})`;
    if (itemToppings.length > 0) {
      const toppingStrings = itemToppings.map(t => `${t.name} (${t.qty})`);
      notifText += ` + ${toppingStrings.join(', ')}`;
    }
    notifText += ` ditambahkan ke keranjang`;
    showNotif(notifText);
    closeModal(productDetailModal);
  });

  addToWishlistDetailBtn.addEventListener("click", () => {
    if (!currentProductDetail) return;

    const name = currentProductDetail.name;
    if (wishlist[name]) {
      delete wishlist[name];
      showNotif(`${name} dihapus dari wishlist`);
    } else {
      wishlist[name] = {
        name: currentProductDetail.name,
        price: currentProductDetail.price,
        kategori: currentProductDetail.kategori,
        images: currentProductDetail.images ? currentProductDetail.images : []
      };
      showNotif(`${name} ditambahkan ke wishlist`);
    }
    updateWishlistCount();
    updateWishlistButtonsState();
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

  renderMenu(); // Initial render of menu and related products

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
                   `Hormat saya,\n[Nama Anda (opsional)]`;

      // Simulate sending email via mailto with CC
      const mailtoLink = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&cc=${encodeURIComponent(CC_EMAIL)}`;
      window.location.href = mailtoLink; // This will open the user's default email client
      showBadge(sentBadge, "Email pesanan terkirim!");
    }
    closeAllModals();
  });

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

  // New: Update Notification Modal Logic
  // Checkbox event listener
  dontShowAgainCheckbox.addEventListener('change', () => {
    if (dontShowAgainCheckbox.checked) {
      // Set cooldown timestamp in localStorage
      localStorage.setItem(UPDATE_MODAL_COOLDOWN_KEY, new Date().getTime().toString());
    } else {
      // Remove cooldown timestamp from localStorage
      localStorage.removeItem(UPDATE_MODAL_COOLDOWN_KEY);
    }
  });

  // Initial call to show update modal on page load
  // Added a small delay to ensure all DOM elements are rendered and GSAP is ready
  setTimeout(showUpdateModal, 1000);

  // Initial update of cart and wishlist counts
  updateCartCount();
  updateWishlistCount();
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

  // --- New: Universal Modal Close and Back Buttons ---
  // Get all modals
  const allModals = document.querySelectorAll('.modal');

  allModals.forEach(modal => {
    // Add event listener for the "X" close button
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        // Special handling for updateModal with dispersion effect
        if (modal.id === 'update-modal') {
          startDispersionEffect(modal);
          // Remove from modalStack after starting dispersion, as closeModal won't be called directly
          modalStack = modalStack.filter(m => m !== modal);
        } else {
          closeAllModals(); // Close all modals
        }
      });
    }

    // Add event listener for the "Kembali" back button
    const backBtn = modal.querySelector('.modal-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        goBackToPreviousModal();
      });
    }
  });
});

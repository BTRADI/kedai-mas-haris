// ---------- Config & refs ----------
const WA_PHONE = "6281389868594";
const DANA_NUMBER = "081389868594";
const DANA_NAME = "Muhammad Haris Nugroho";
const BANK_NUMBER = "0058168424"; // default / Sinarmas
const BANK_NAME = "Muhammad Haris Nugroho";
const BANKS = {
  sinarmas: { number: "0058168424", name: "Muhammad Haris Nugroho", label: "Bank Sinarmas" },
  bca:      { number: "1093201390", name: "Muhammad Haris Nugroho", label: "Bank BCA" },
  bni:      { number: "1856732591", name: "Muhammad Haris Nugroho", label: "Bank BNI" }
};
const MY_EMAIL = "mhdharisn21@gmail.com";
const CC_EMAIL = "muhammad_nugroho@app.co.id"; // Email CC yang tidak diketahui user
const DANA_QR_CODE_PATH = "QR-KDH.jpeg"; // Path ke gambar QR Code QRIS KDH terbaru

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


// ---------- Area: Socia Garden (Sus/Pie/Talam/Cente = Rp 3.500) ----------
const currentArea = "socia";
const AREA_LABEL = "Socia Garden";

// ---------- Data ----------
const productList = [
  {
    name: "Lemper",
    price: 3500,
    kategori: "Karbohidrat",
    description: "Lemper ketan isi ayam suwir gurih, dibungkus daun pisang.",
    images: ["https://via.placeholder.com/120?text=Lemper+1", "https://via.placeholder.com/120?text=Lemper+2", "https://via.placeholder.com/120?text=Lemper+3"]
  },
  {
    name: "Sosis Solo",
    price: 3500,
    kategori: "Asin",
    description: "Sosis Solo dengan isian daging ayam cincang yang lezat, dibalut kulit tipis nan lembut.",
    images: ["Soslo1.PNG", "Soslo2.png", "Soslo3.png"]
  },
  {
    name: "Sus",
    price: 3500,
    kategori: "Manis",
    description: "Kue sus lembut dengan isian vla manis dan creamy.",
    images: ["https://via.placeholder.com/120?text=Sus+1", "https://via.placeholder.com/120?text=Sus+2", "https://via.placeholder.com/120?text=Sus+3"]
  },
  {
    name: "Pie Buah",
    price: 3500,
    kategori: "Manis",
    description: "Pie renyah dengan vla lembut dan topping buah-buahan segar.",
    images: ["https://via.placeholder.com/120?text=Pie+Buah+1", "https://via.placeholder.com/120?text=Pie+Buah+2", "https://via.placeholder.com/120?text=Pie+Buah+3"]
  },
  {
    name: "Risol Mayonais",
    price: 3500,
    kategori: "Asin",
    description: "Risol renyah dengan isian sosis, telur, dan mayonais creamy.",
    images: ["https://via.placeholder.com/120?text=Risol+Mayonais+1", "https://via.placeholder.com/120?text=Risol+Mayonais+2", "https://via.placeholder.com/120?text=Risol+Mayonais+3"]
  },
  {
    name: "Pastel Bihun",
    price: 3500,
    kategori: "Asin",
    description: "Pastel gurih dengan isian bihun dan sayuran.",
    images: ["https://via.placeholder.com/120?text=Pastel+Bihun+1", "https://via.placeholder.com/120?text=Pastel+Bihun+2", "https://via.placeholder.com/120?text=Pastel+Bihun+3"]
  },
  {
    name: "Pastel Mayonais",
    price: 3500,
    kategori: "Asin",
    description: "Pastel renyah dengan isian sayur, sosis, dan mayonais creamy yang lezat.",
    images: ["https://via.placeholder.com/120?text=Pastel+Mayonais+1", "https://via.placeholder.com/120?text=Pastel+Mayonais+2", "https://via.placeholder.com/120?text=Pastel+Mayonais+3"]
  },
  {
    name: "Cente Manis / Hunkwe",
    price: 3500,
    kategori: "Manis",
    description: "Kue tradisional Cente Manis atau Hunkwe, kenyal dan manis.",
    images: ["https://via.placeholder.com/120?text=Cente+Manis+1", "https://via.placeholder.com/120?text=Cente+Manis+2", "https://via.placeholder.com/120?text=Cente+Manis+3"]
  },
  {
    name: "Talam",
    price: 3500,
    kategori: "Manis",
    description: "Kue talam tradisional lembut dengan rasa manis legit khas, cocok sebagai camilan.",
    images: ["https://via.placeholder.com/120?text=Talam+1", "https://via.placeholder.com/120?text=Talam+2", "https://via.placeholder.com/120?text=Talam+3"]
  },
  {
    name: "Nasi Uduk",
    price: 10000,
    kategori: "Karbohidrat",
    description: "Nasi uduk gurih dengan aroma rempah khas, cocok untuk sarapan atau makan siang.",
    images: ["https://via.placeholder.com/120?text=Nasi+Uduk+1", "https://via.placeholder.com/120?text=Nasi+Uduk+2", "https://via.placeholder.com/120?text=Nasi+Uduk+3"],
    variants: [
      { name: "Polos", price: 0, description: "Nasi, Orek, Bihun, Sambal" }
    ],
    toppings: [
      { name: "Telor ½ Bulet Balado", price: 3000 },
      { name: "Telor Bulet Balado", price: 6000 },
      { name: "Telor Dadar", price: 6000 },
      { name: "Telor Ceplok", price: 6000 },
      { name: "Bakwan", price: 2000 },
      { name: "Tempe Orek", price: 3000 },
      { name: "Bihun Goreng", price: 3000 }
    ]
  },
  {
    name: "Nasi Kuning",
    price: 10000,
    kategori: "Karbohidrat",
    description: "Nasi kuning harum dengan lauk pelengkap, hidangan istimewa untuk berbagai acara.",
    images: ["https://via.placeholder.com/120?text=Nasi+Kuning+1", "https://via.placeholder.com/120?text=Nasi+Kuning+2", "https://via.placeholder.com/120?text=Nasi+Kuning+3"],
    variants: [
      { name: "Polos", price: 0, description: "Nasi, Orek, Bihun, Sambal" }
    ],
    toppings: [
      { name: "Telor ½ Bulet Balado", price: 3000 },
      { name: "Telor Bulet Balado", price: 6000 },
      { name: "Telor Dadar", price: 6000 },
      { name: "Telor Ceplok", price: 6000 },
      { name: "Bakwan", price: 2000 },
      { name: "Tempe Orek", price: 3000 },
      { name: "Bihun Goreng", price: 3000 }
    ]
  },
];

// New: Update Log Data
const updateLog = [
  {
    version: "1.1.1",
    date: "2026-08-05",
    changes: [
      "Konfirmasi sebelum membuka WhatsApp.",
      "Qty +/− langsung di keranjang (tanpa modal edit).",
      "Status operasional: PO H-1 setiap hari, batas order jam 19.00.",
      "Banner status buka/tutup PO di halaman utama."
    ]
  },
  {
    version: "1.1.0",
    date: "2026-08-01",
    changes: [
      "Rebuilt website ke versi terbaru 1.1.0 (1 Agustus 2026).",
      "Penyesuaian harga menu mengikuti kenaikan harga bahan global.",
      "Update menu Kue Talam.",
      "Kode promo baru: HIDUPINDO81 (diskon 10%, 5–31 Agustus 2026).",
      "Perbaikan bug menyeluruh (modal, checkout, QRIS, WA).",
      "Rapikan kontras teks mode terang & gelap.",
      "Haluskan UX tombol X dan Kembali pada alur modal."
    ]
  },
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
  code: "HIDUPINDO81",
  discountPercentage: 0.10, // 10% diskon
  minPurchase: 20000, // Minimal pembelian Rp 20.000
  startDate: new Date("2026-08-05T00:00:00"), // 5 Agustus 2026
  endDate: new Date("2026-08-31T23:59:59"), // 31 Agustus 2026
  text: "Dapatkan diskon 10% untuk pembelian minimal Rp 20.000! Berlaku 5–31 Agustus 2026 dengan kode promo: HIDUPINDO81."
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
let promoUsage = {}; // { 'HIDUPINDO81': { count: 0, currentTransactionId: null } }

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
  gsap.set(overlay, { display: "block" });
  gsap.to(overlay, { duration: 0.25, opacity: 1, ease: "power2.out", onComplete: () => {
    overlay.setAttribute("aria-hidden", "false");
    overlay.style.pointerEvents = "auto";
  }});

  // Hanya animasi opacity — posisi diatur penuh oleh CSS agar selalu center
  gsap.set(modal, { display: "block", opacity: 0 });
  // Paksa clear transform dari GSAP sebelumnya supaya CSS translate(-50%,-50%) bekerja
  modal.style.transform = "";
  gsap.to(modal, {
    duration: 0.3,
    opacity: 1,
    ease: "power2.out",
    onComplete: () => {
      modal.setAttribute("aria-hidden", "false");
      modal.focus();
    }
  });
}

function closeModal(modal) {
  const index = modalStack.indexOf(modal);
  if (index > -1) {
    modalStack.splice(index, 1);
  }

  gsap.to(modal, { duration: 0.3, opacity: 0, ease: "power2.in", onComplete: () => {
    gsap.set(modal, { display: "none" });
    modal.style.transform = "";
    modal.setAttribute("aria-hidden", "true");
    if (modalStack.length === 0) {
      gsap.to(overlay, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
        gsap.set(overlay, { display: "none" });
        overlay.setAttribute("aria-hidden", "true");
        overlay.style.pointerEvents = "none";
      }});
    } else {
      const previousModal = modalStack[modalStack.length - 1];
      gsap.set(previousModal, { display: "block", opacity: 1 });
      previousModal.style.transform = "";
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
    closeAllModals();
    return;
  }
  const currentModal = modalStack[modalStack.length - 1];
  const previousModal = modalStack[modalStack.length - 2];

  gsap.to(currentModal, { duration: 0.3, opacity: 0, ease: "power2.in", onComplete: () => {
    gsap.set(currentModal, { display: "none" });
    currentModal.style.transform = "";
    currentModal.setAttribute("aria-hidden", "true");
    modalStack.pop();

    gsap.set(previousModal, { display: "block", opacity: 0 });
    previousModal.style.transform = "";
    gsap.to(previousModal, { duration: 0.3, opacity: 1, ease: "power2.out", onComplete: () => {
      previousModal.setAttribute("aria-hidden", "false");
      previousModal.focus();
    }});
  }});

  // Hapus blur khusus konfirmasi WA
  if (currentModal.id === "confirm-wa-modal") {
    clearConfirmWaBackdrop();
  }
  // Hide QR code if going back from info modal
  if (currentModal.id === 'info-modal') {
    danaQrCodeImg.classList.add('hidden');
    danaQrCodeImg.src = '';
  }
  // Reset product detail modal state if going back from it
  if (currentModal.id === 'product-detail-modal') {
    currentProductDetail = null;
    currentProductDetailQty = 1;
    selectedVariant = null;
    selectedToppings = {};
    if (productDetailModal.swiper) {
      productDetailModal.swiper.destroy(true, true);
      productDetailModal.swiper = null;
    }
  }
  // Reset bank options when returning to payment modal
  if (previousModal && previousModal.id === 'payment-modal') {
    const bankOpts = document.getElementById("bank-options");
    if (bankOpts) bankOpts.classList.add("hidden");
    ["pay-cash","pay-dana","pay-transfer","pay-qris"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove("hidden");
    });
    const title = document.getElementById("payment-title");
    if (title) title.textContent = "Pilih Metode Pembayaran";
  }
}

function closeAllModals() {
  [...modalStack].reverse().forEach((modal) => {
    gsap.to(modal, { duration: 0.3, opacity: 0, ease: "power2.in", onComplete: () => {
      gsap.set(modal, { display: "none" });
      modal.style.transform = "";
      modal.setAttribute("aria-hidden", "true");
    }});
  });
  modalStack = [];
  clearConfirmWaBackdrop();
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
function getCartStorageKey() {
  return `cart_${currentArea}`;
}
function getWishlistStorageKey() {
  return `wishlist_${currentArea}`;
}
function getOrderHistoryKey() {
  return `orderHistory_${currentArea}`;
}

let cartPanelMode = "cart"; // "cart" | "history"
let historySearchQuery = "";

function loadOrderHistory() {
  try {
    const raw = localStorage.getItem(getOrderHistoryKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveOrderHistoryList(list) {
  try {
    // Simpan semua riwayat (tanpa potong) — batasi hanya jika storage penuh
    localStorage.setItem(getOrderHistoryKey(), JSON.stringify(list));
  } catch (e) {
    // Fallback: jika storage penuh, simpan tanpa 20% data terlama
    try {
      const trimmed = list.slice(0, Math.max(1, Math.floor(list.length * 0.8)));
      localStorage.setItem(getOrderHistoryKey(), JSON.stringify(trimmed));
    } catch (e2) {}
  }
}

function saveCurrentOrderToHistory() {
  if (!Object.keys(cart).length) return;

  const entryItems = {};
  Object.entries(cart).forEach(([key, item]) => {
    entryItems[key] = {
      name: item.name,
      price: item.price,
      qty: item.qty,
      variant: item.variant || null,
      toppings: item.toppings ? JSON.parse(JSON.stringify(item.toppings)) : [],
      images: item.images ? [...item.images] : []
    };
  });

  const customerName = (document.getElementById("checkout-name")?.value || "").trim();
  const customerAddress = (document.getElementById("checkout-address")?.value || "").trim();

  const history = loadOrderHistory();
  history.unshift({
    id: Date.now().toString(),
    date: new Date().toISOString(),
    customerName: customerName || "Tanpa nama",
    customerAddress: customerAddress || "",
    total: typeof finalDiscountedPrice === "number" ? finalDiscountedPrice : Object.values(cart).reduce((s, i) => s + i.qty * i.price, 0),
    paymentMethod: currentPaymentMethod || "-",
    area: AREA_LABEL,
    items: entryItems
  });
  saveOrderHistoryList(history);
}

function setCartChromeVisible(visible) {
  const promoBox = document.querySelector("#cart-modal .promo-input-container");
  const promoMsg = document.getElementById("promo-message");
  const totalRow = document.querySelector("#cart-modal .flex.justify-between.items-center.font-semibold");
  const promoPrice = document.getElementById("promo-price-display");
  const checkoutBtn = document.getElementById("checkout-btn");
  const clearBtn = document.getElementById("clear-cart-btn");
  const title = document.getElementById("cart-title");

  if (promoBox) promoBox.style.display = visible ? "" : "none";
  if (promoMsg && !visible) promoMsg.classList.add("hidden");
  if (totalRow) totalRow.style.display = visible ? "" : "none";
  if (promoPrice && !visible) promoPrice.classList.add("hidden");
  if (checkoutBtn) checkoutBtn.style.display = visible ? "" : "none";
  if (clearBtn) clearBtn.style.display = visible ? "" : "none";
  if (title) title.textContent = visible ? "Keranjang" : "Riwayat Pesanan";
}

function showCartHistoryView() {
  cartPanelMode = "history";
  historySearchQuery = "";
  setCartChromeVisible(false);
  renderOrderHistoryPanel();
}

function showCartNormalView() {
  cartPanelMode = "cart";
  historySearchQuery = "";
  setCartChromeVisible(true);
  renderCart();
}

function formatHistoryDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric"
    }) + " · " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return iso || "-";
  }
}

function filterOrderHistory(history, query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return history;
  return history.filter((order) => {
    const name = (order.customerName || "").toLowerCase();
    const addr = (order.customerAddress || "").toLowerCase();
    const pay = (order.paymentMethod || "").toLowerCase();
    const items = Object.values(order.items || {}).map((i) => (i.name || "").toLowerCase()).join(" ");
    const dateStr = formatHistoryDate(order.date).toLowerCase();
    return name.includes(q) || addr.includes(q) || pay.includes(q) || items.includes(q) || dateStr.includes(q);
  });
}

function onHistorySearchInput(value) {
  historySearchQuery = value || "";
  renderOrderHistoryPanel(true);
}
window.onHistorySearchInput = onHistorySearchInput;

function renderOrderHistoryPanel(keepSearchFocus) {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;
  const history = loadOrderHistory();
  const filtered = filterOrderHistory(history, historySearchQuery);
  const prevScroll = cartItemsContainer.scrollTop;

  if (!history.length) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon"><i class="fas fa-clock-rotate-left"></i></div>
        <p class="cart-empty-title">Belum ada riwayat</p>
        <p class="cart-empty-desc">Pesanan yang berhasil dikirim lewat WA akan muncul di sini, lengkap dengan nama pemesan.</p>
      </div>`;
    return;
  }

  const listHtml = filtered.length ? filtered.map((order) => {
    const itemCount = Object.values(order.items || {}).reduce((s, i) => s + (i.qty || 0), 0);
    const names = Object.values(order.items || {}).map((i) => {
      let n = i.name;
      if (i.qty > 1) n += ` ×${i.qty}`;
      return n;
    }).slice(0, 3).join(", ");
    const more = Object.keys(order.items || {}).length > 3 ? "…" : "";
    const dateStr = formatHistoryDate(order.date);
    const cust = order.customerName || "Tanpa nama";
    return `
      <div class="history-card">
        <div class="history-card-top">
          <span class="history-customer"><i class="fas fa-user"></i> ${cust}</span>
          <span class="history-total">Rp ${(order.total || 0).toLocaleString("id-ID")}</span>
        </div>
        <p class="history-date"><i class="far fa-calendar-alt"></i> ${dateStr}</p>
        <p class="history-items-preview">${names}${more}</p>
        <div class="history-card-meta">
          <span>${itemCount} item · ${order.paymentMethod || "-"}</span>
          <button type="button" class="history-reorder-btn" onclick="reorderFromHistory('${order.id}')">
            <i class="fas fa-redo-alt"></i> Pesan lagi
          </button>
        </div>
      </div>`;
  }).join("") : `
    <div class="history-no-result">
      <i class="fas fa-search"></i>
      <p>Tidak ada pesanan untuk “${historySearchQuery.replace(/</g, "")}”</p>
    </div>`;

  cartItemsContainer.innerHTML = `
    <div class="history-panel">
      <div class="history-search-wrap">
        <i class="fas fa-search history-search-icon"></i>
        <input type="search" id="history-search-input" class="history-search-input"
          placeholder="Cari nama pemesan, menu, tanggal…"
          value="${(historySearchQuery || "").replace(/"/g, "&quot;")}"
          oninput="onHistorySearchInput(this.value)" />
      </div>
      <p class="history-hint">${filtered.length} dari ${history.length} pesanan tersimpan di perangkat ini</p>
      <div class="history-list">${listHtml}</div>
    </div>`;

  if (keepSearchFocus) {
    const inp = document.getElementById("history-search-input");
    if (inp) {
      inp.focus();
      const len = inp.value.length;
      try { inp.setSelectionRange(len, len); } catch (e) {}
    }
    cartItemsContainer.scrollTop = prevScroll;
  }
}

function reorderFromHistory(orderId) {
  const history = loadOrderHistory();
  const order = history.find((o) => o.id === orderId);
  if (!order || !order.items) {
    showNotif("Riwayat tidak ditemukan");
    return;
  }
  Object.entries(order.items).forEach(([key, item]) => {
    if (cart[key]) {
      cart[key].qty += item.qty || 1;
    } else {
      cart[key] = {
        name: item.name,
        price: item.price,
        qty: item.qty || 1,
        variant: item.variant || null,
        toppings: item.toppings || [],
        images: item.images || []
      };
    }
  });
  try { migrateStoredPrices(); } catch (e) {}
  saveCartToLocalStorage();
  updateCartCount();
  showCartNormalView();
  const who = order.customerName ? ` (${order.customerName})` : "";
  showNotif(`Pesanan${who} ditambahkan ke keranjang`);
}

window.showCartHistoryView = showCartHistoryView;
window.showCartNormalView = showCartNormalView;
window.reorderFromHistory = reorderFromHistory;

function saveCartToLocalStorage() {
  localStorage.setItem(getCartStorageKey(), JSON.stringify(cart));
}

function recalculateCartItemUnitPrice(item) {
  const product = productList.find(p => p.name === item.name);
  if (!product) return item.price;

  // Hitung ulang dari harga katalog saat ini + variant/topping
  let unit = product.price;
  if (item.variant && product.variants) {
    const v = product.variants.find(x => x.name === item.variant);
    if (v) unit += (v.price || 0);
  }
  if (item.toppings && item.toppings.length > 0 && product.toppings) {
    item.toppings.forEach(t => {
      const tp = product.toppings.find(x => x.name === t.name);
      if (tp) unit += (tp.price || 0) * (t.qty || 1);
    });
  }
  return unit;
}

function migrateStoredPrices() {
  let cartChanged = false;
  Object.keys(cart).forEach(key => {
    const item = cart[key];
    if (!item || !item.name) return;
    // Sinkronkan harga Nasi (dan item lain) ke harga katalog terbaru
    if (item.name === "Nasi Uduk" || item.name === "Nasi Kuning") {
      const newPrice = recalculateCartItemUnitPrice(item);
      if (item.price !== newPrice) {
        item.price = newPrice;
        cartChanged = true;
      }
    } else {
      // Produk sederhana tanpa variant/topping: ikut harga katalog
      const product = productList.find(p => p.name === item.name);
      if (product && !item.variant && (!item.toppings || item.toppings.length === 0) && item.price !== product.price) {
        item.price = product.price;
        cartChanged = true;
      }
    }
  });
  if (cartChanged) saveCartToLocalStorage();

  let wishlistChanged = false;
  Object.keys(wishlist).forEach(key => {
    const item = wishlist[key];
    if (!item || !item.name) return;
    const product = productList.find(p => p.name === item.name);
    if (product && item.price !== product.price) {
      item.price = product.price;
      wishlistChanged = true;
    }
  });
  if (wishlistChanged) saveWishlistToLocalStorage();
}

function loadCartFromLocalStorage() {
  // Prioritas key per-area; fallback ke 'cart' lama lalu migrasi
  let storedCart = localStorage.getItem(getCartStorageKey());
  if (!storedCart && currentArea === "socia") {
    storedCart = localStorage.getItem('cart');
  }
  if (storedCart) {
    cart = JSON.parse(storedCart);
    saveCartToLocalStorage();
  }
}

function saveWishlistToLocalStorage() {
  localStorage.setItem(getWishlistStorageKey(), JSON.stringify(wishlist));
}

function loadWishlistFromLocalStorage() {
  let storedWishlist = localStorage.getItem(getWishlistStorageKey());
  if (!storedWishlist && currentArea === "socia") {
    storedWishlist = localStorage.getItem('wishlist');
  }
  if (storedWishlist) {
    wishlist = JSON.parse(storedWishlist);
    saveWishlistToLocalStorage();
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
    const historyCount = loadOrderHistory().length;
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon"><i class="fas fa-shopping-basket"></i></div>
        <p class="cart-empty-title">Keranjangmu masih kosong</p>
        <p class="cart-empty-desc">Yuk pilih camilan favorit, atau cek riwayat pesanan di perangkat ini.</p>
        <div class="cart-empty-actions">
          <button type="button" class="cart-empty-btn cart-empty-btn-primary" onclick="closeAllModals(); document.getElementById('menu-section')?.scrollIntoView({behavior:'smooth'})">
            <i class="fas fa-utensils"></i> Lihat Menu
          </button>
          <button type="button" class="cart-empty-btn cart-empty-btn-secondary" onclick="showCartHistoryView()">
            <i class="fas fa-clock-rotate-left"></i> Riwayat Pesanan${historyCount ? ` (${historyCount})` : ""}
          </button>
        </div>
      </div>`;
    promoMessage.classList.add('hidden');
    promoCodeInput.value = '';
    promoApplied = false;
    updateCartTotal();
    // Sembunyikan promo & checkout saat kosong (tetap bisa buka riwayat)
    const promoBox = document.querySelector("#cart-modal .promo-input-container");
    const checkoutBtn = document.getElementById("checkout-btn");
    const clearBtn = document.getElementById("clear-cart-btn");
    if (promoBox) promoBox.style.display = "none";
    if (checkoutBtn) checkoutBtn.style.display = "none";
    if (clearBtn) clearBtn.style.display = "none";
    return;
  }

  // Ada item: tampilkan chrome normal
  setCartChromeVisible(true);
  cartPanelMode = "cart";

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
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <img src="${item.images ? item.images[0] : `https://via.placeholder.com/50?text=${encodeURIComponent(item.name)}`}"
             class="w-10 h-10 object-cover rounded-lg flex-shrink-0">
        <div class="min-w-0">
          <p class="font-medium text-sm truncate">${itemDetails}</p>
          <p class="text-xs muted-text">Rp ${item.price.toLocaleString("id-ID")} · subtotal Rp ${(item.price * item.qty).toLocaleString("id-ID")}</p>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <div class="cart-qty-controls">
          <button type="button" class="cart-qty-btn" onclick="changeCartQty('${key}', -1)" aria-label="Kurangi">−</button>
          <span class="cart-qty-num">${item.qty}</span>
          <button type="button" class="cart-qty-btn" onclick="changeCartQty('${key}', 1)" aria-label="Tambah">+</button>
        </div>
        <button class="delete-item-btn" onclick="deleteCartItem('${key}')" aria-label="Hapus">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(wrap);
  });

  // Update cart total after rendering items
  updateCartTotal();
}

function changeCartQty(itemKey, delta) {
  if (!cart[itemKey]) return;
  cart[itemKey].qty += delta;
  if (cart[itemKey].qty <= 0) {
    delete cart[itemKey];
    showNotif("Item dihapus dari keranjang");
  }
  saveCartToLocalStorage();
  updateCartCount();
  // Jika qty berubah, cek ulang syarat promo
  if (promoApplied) {
    const totalPriceInCart = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);
    if (totalPriceInCart < currentPromo.minPurchase) {
      promoApplied = false;
      if (promoMessage) {
        showPromoMessage("Promo dibatalkan: total di bawah minimal pembelian.", "info");
      }
    }
  }
  renderCart();
}
window.changeCartQty = changeCartQty;

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

  // Sembunyikan cart, buka edit (cart tetap di stack)
  gsap.to(cartModal, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
    gsap.set(cartModal, { display: "none" });
    cartModal.style.transform = "";
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

  // Sembunyikan cart, buka konfirmasi (cart tetap di stack)
  gsap.to(cartModal, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
    gsap.set(cartModal, { display: "none" });
    cartModal.style.transform = "";
    cartModal.setAttribute("aria-hidden", "true");
    openModal(confirmDeleteModal);
  }});
}

// ---------- Fixed Promo Logic ----------
function showPromoMessage(text, type = "info") {
  if (!promoMessage) return;
  promoMessage.textContent = text;
  promoMessage.className = `promo-applied-text promo-msg--${type}`;
}

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
          showPromoMessage(`Maaf kode promo yang anda masukkan sudah mencapai limit. Terima kasih 🙏`, "error");
          updateCartTotal();
          return;
      }

      // Scenario 3: Promo not yet active
      if (today < currentPromo.startDate) {
          showPromoMessage("Kode promo belum aktif.", "error");
          promoApplied = false;
      }
      // Scenario 4: Promo expired
      else if (today > currentPromo.endDate) {
          showPromoMessage("Maaf, kode promo sudah kadaluarsa.", "error");
          promoApplied = false;
      }
      // Scenario 5: Minimum purchase not met
      else if (totalPriceInCart < currentPromo.minPurchase) {
          showPromoMessage(`Promo "${inputCode}" belum memenuhi syarat (minimal pembelian Rp ${currentPromo.minPurchase.toLocaleString("id-ID")}).`, "info");
          promoApplied = false;
      }
      // Scenario 6: Promo successfully applied
      else {
          promoApplied = true;
          showPromoMessage(`Kode promo berhasil diterapkan! Anda mendapatkan diskon 10%! 🎉 (Sisa penggunaan: ${remainingUses})`, "success");

          // Mark promo as used for this transaction
          promoData.currentTransactionId = currentTransactionId;
          promoUsage[inputCode] = promoData;
          savePromoUsage(); // Save updated usage to localStorage
      }
  } else {
      // Scenario 7: Invalid promo code
      showPromoMessage("Kode promo tidak valid.", "error");
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
      <div class="empty-state-text text-center py-8">
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
        <p class="text-xs muted-text">Rp ${item.price.toLocaleString("id-ID")}</p>
        <p class="text-xs text-blue-600 dark:text-blue-400">${item.kategori}</p>
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
    msg.className = "col-span-full text-center py-8 empty-state-text";
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
    price.className = "text-sm product-price mb-2";
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
    // Produk dengan variant/topping: label "Pilih" (buka detail), lainnya "Pesan"
    const needsConfig = (item.variants && item.variants.length > 0) || (item.toppings && item.toppings.length > 0);
    orderButton.textContent = needsConfig ? "Pilih" : "Pesan";
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

  // Render images for Swiper (gambar asli)
  productDetailImagesContainer.innerHTML = '';
  const productImages = (product.images && product.images.length > 0)
    ? product.images
    : [`https://via.placeholder.com/400?text=${encodeURIComponent(product.name)}`];

  productImages.forEach((imgSrc, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <img src="${imgSrc}"
           alt="${product.name} ${index + 1}"
           class="product-detail-main-img w-full h-full object-cover rounded-lg cursor-pointer"
           data-full-src="${imgSrc}"
           loading="lazy"
           onerror="this.src='https://via.placeholder.com/400?text=${encodeURIComponent(product.name)}'" />
    `;
    productDetailImagesContainer.appendChild(slide);
  });

  // Initialize Swiper: no loop, navigation, thumbnail bullets
  if (productDetailModal.swiper) {
    productDetailModal.swiper.destroy(true, true);
    productDetailModal.swiper = null;
  }
  productDetailModal.swiper = new Swiper(".product-detail-swiper", {
    loop: true,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    spaceBetween: 8,
    navigation: {
      nextEl: ".product-detail-swiper .swiper-button-next",
      prevEl: ".product-detail-swiper .swiper-button-prev",
    },
    pagination: {
      el: ".product-detail-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        const thumbSrc = productImages[index] || "";
        return `<span class="${className}" role="button" aria-label="Gambar ${index + 1}">
          <img src="${thumbSrc}" alt="Thumb ${index + 1}" loading="lazy"
               onerror="this.style.display='none'" />
        </span>`;
      },
    },
  });

  // Klik gambar besar → perbesar (reuse enlarge overlay)
  productDetailImagesContainer.querySelectorAll(".product-detail-main-img").forEach(img => {
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      const src = img.getAttribute("data-full-src") || img.src;
      if (typeof window.openQrEnlarge === "function") {
        window.openQrEnlarge(src);
      }
    });
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
        <p class="text-sm product-price mb-2">Rp ${item.price.toLocaleString("id-ID")}</p>
      `;
      card.addEventListener('click', () => {
        closeModal(productDetailModal); // Close current modal
        openProductDetailModal(item.name); // Open new modal for related product
      });
      relatedProductsModalList.appendChild(card);
    });
  } else {
    relatedProductsModalList.innerHTML = '<p class="empty-state-text text-center text-sm col-span-2">Tidak ada rekomendasi.</p>';
  }
}


// ---------- Payment Functions ----------
function generateOrderMessage() {
  const items = Object.values(cart);
  let totalOriginal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  let totalAfterDiscount = finalDiscountedPrice;

  const checkoutName = (document.getElementById("checkout-name")?.value || "").trim();
  const checkoutAddress = (document.getElementById("checkout-address")?.value || "").trim();

  let message = `🛒 *PESANAN BARU*\n\n`;
  message += `📍 *KEDAI MAS HARIS*\n`;
  message += `🏘️ Area: *${AREA_LABEL}*\n`;
  message += `⏰ ${new Date().toLocaleString('id-ID')}\n\n`;

  message += `👤 *Data Pemesan:*\n`;
  message += `Nama: ${checkoutName}\n`;
  message += `Alamat Pengantaran: ${checkoutAddress}\n\n`;

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
    message += `Mendapatkan potongan ${currentPromo.discountPercentage * 100}% 💰\n`;
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

function isDeliveryFormValid() {
  const name = (document.getElementById("checkout-name")?.value || "").trim();
  const address = (document.getElementById("checkout-address")?.value || "").trim();
  return name.length > 0 && address.length > 0;
}

function updateSendWaButtonState() {
  const sendWaBtn = document.getElementById("send-wa");
  const hint = document.getElementById("delivery-form-hint");
  if (!sendWaBtn) return;

  const valid = isDeliveryFormValid();
  sendWaBtn.disabled = !valid;
  if (hint) {
    if (valid) {
      hint.classList.add("hidden");
    } else {
      hint.classList.remove("hidden");
    }
  }
}

function resetDeliveryForm() {
  const nameInput = document.getElementById("checkout-name");
  const addressInput = document.getElementById("checkout-address");
  if (nameInput) nameInput.value = "";
  if (addressInput) addressInput.value = "";
  updateSendWaButtonState();
}

function clearConfirmWaBackdrop() {
  if (overlay) {
    overlay.classList.remove("overlay-blur");
    overlay.style.zIndex = "";
  }
  document.querySelectorAll(".modal.modal-behind-blur").forEach((m) => {
    m.classList.remove("modal-behind-blur");
  });
}

function applyConfirmWaBackdrop() {
  // Overlay naik di atas modal sebelumnya, di bawah konfirmasi WA → blur terlihat
  if (overlay) {
    overlay.classList.add("overlay-blur", "show");
    overlay.style.zIndex = "1050";
    overlay.style.display = "block";
    overlay.style.pointerEvents = "auto";
    overlay.setAttribute("aria-hidden", "false");
    gsap.set(overlay, { opacity: 1, display: "block" });
  }
  // Modal di belakang (info/payment/dll) diblur & tidak bisa diklik
  modalStack.forEach((m) => {
    if (m && m.id !== "confirm-wa-modal") {
      m.classList.add("modal-behind-blur");
    }
  });
}

function fillConfirmWaSummary() {
  const summaryBox = document.getElementById("confirm-wa-summary");
  const listEl = document.getElementById("confirm-wa-items");
  const totalEl = document.getElementById("confirm-wa-total");

  // Pastikan total terbaru (jangan gagalkan fill jika elemen cart-total hilang)
  try { updateCartTotal(); } catch (e) {}

  const items = Object.values(cart || {});
  let computedTotal = 0;
  let itemsHtml = "";

  if (!items.length) {
    itemsHtml = `<li class="confirm-wa-item"><span class="confirm-wa-item-name">Keranjang kosong</span></li>`;
  } else {
    items.forEach((item) => {
      if (!item) return;
      let label = item.name || "Item";
      if (item.variant) label += ` (${item.variant})`;
      if (item.toppings && item.toppings.length > 0) {
        label += " + " + item.toppings.map((t) => `${t.name} (${t.qty})`).join(", ");
      }
      const qty = Number(item.qty) || 0;
      const price = Number(item.price) || 0;
      const line = price * qty;
      computedTotal += line;
      itemsHtml += `
        <li class="confirm-wa-item">
          <span class="confirm-wa-item-name">${label}</span>
          <span class="confirm-wa-item-meta">${qty}× · Rp ${line.toLocaleString("id-ID")}</span>
        </li>`;
    });
  }

  const total = (typeof finalDiscountedPrice === "number" && finalDiscountedPrice > 0)
    ? finalDiscountedPrice
    : computedTotal;

  // Rebuild struktur ringkasan agar selalu tampil
  if (summaryBox) {
    summaryBox.style.display = "block";
    summaryBox.hidden = false;
    summaryBox.innerHTML = `
      <p class="confirm-wa-summary-label">Pesanan Anda</p>
      <ul id="confirm-wa-items" class="confirm-wa-items">${itemsHtml}</ul>
      <div class="confirm-wa-total-row">
        <span>Total</span>
        <strong id="confirm-wa-total">Rp ${total.toLocaleString("id-ID")}</strong>
      </div>`;
  } else if (listEl && totalEl) {
    listEl.innerHTML = itemsHtml;
    totalEl.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  }
}

function requestSendToWhatsApp() {
  if (!isDeliveryFormValid()) {
    showNotif("Harap isi nama dan alamat pengantaran!");
    updateSendWaButtonState();
    const nameInput = document.getElementById("checkout-name");
    if (nameInput && !nameInput.value.trim()) nameInput.focus();
    else document.getElementById("checkout-address")?.focus();
    return;
  }
  const confirmWaModal = document.getElementById("confirm-wa-modal");
  if (confirmWaModal) {
    fillConfirmWaSummary();
    applyConfirmWaBackdrop();
    openModal(confirmWaModal);
    requestAnimationFrame(() => fillConfirmWaSummary());
    setTimeout(() => fillConfirmWaSummary(), 50);
  } else {
    sendToWhatsApp();
  }
}


function sendToWhatsApp() {
  if (!isDeliveryFormValid()) {
    showNotif("Harap isi nama dan alamat pengantaran!");
    return;
  }

  const message = generateOrderMessage();
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WA_PHONE}?text=${encodedMessage}`;

  // Buka WhatsApp DULU (harus langsung dari user click agar tidak diblokir browser)
  const waWindow = window.open(whatsappUrl, '_blank');
  if (!waWindow) {
    window.location.href = whatsappUrl;
  }

  if (promoApplied && promoUsage[currentPromo.code] && promoUsage[currentPromo.code].currentTransactionId === currentTransactionId) {
      promoUsage[currentPromo.code].count++;
      promoUsage[currentPromo.code].currentTransactionId = null;
      savePromoUsage();
  }

  // Simpan ke riwayat sebelum keranjang dikosongkan
  try { saveCurrentOrderToHistory(); } catch (e) {}

  Object.keys(cart).forEach(key => delete cart[key]);
  updateCartCount();
  saveCartToLocalStorage();

  showBadge(sentBadge, "Pesanan terkirim");
  resetDeliveryForm();
  closeAllModals();

  currentTransactionId = Date.now().toString();
}

function updatePoStatusBanner() {
  const el = document.getElementById("po-status-banner");
  if (!el) return;

  // Waktu lokal perangkat user (real-time)
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const openAt = 8 * 60;   // 08.00 — tidak diumumkan di teks chip
  const closeAt = 19 * 60; // 19.00

  const isOpen = minutes >= openAt && minutes < closeAt;

  if (isOpen) {
    el.className = "po-chip po-open";
    el.innerHTML = `<i class="fas fa-store po-chip-icon" aria-hidden="true"></i> PO H-1 · Buka · Batas 19.00 · Antar besok`;
  } else {
    el.className = "po-chip po-closed";
    el.innerHTML = `<i class="fas fa-ban po-chip-icon" aria-hidden="true"></i> PO ditutup · Silahkan order hari besok`;
  }
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

  // Check cooldown (only applies when user previously checked "jangan tampilkan 10 menit")
  const lastShownTime = localStorage.getItem(UPDATE_MODAL_COOLDOWN_KEY);
  const currentTime = new Date().getTime();
  const isInCooldown = lastShownTime && (currentTime - parseInt(lastShownTime, 10) < UPDATE_MODAL_COOLDOWN_DURATION);

  // Show if: (new version) OR (cooldown already expired / never set)
  // Do NOT show only when same version AND still inside the 10-minute cooldown
  if (lastSeenVersion === latestVersion && isInCooldown) {
    console.log('Update modal is in cooldown. Not showing.');
    return;
  }

  openModal(updateModal);
  // Store the latest version as seen
  localStorage.setItem(LAST_SEEN_UPDATE_VERSION_KEY, latestVersion);
  // Reset checkbox state every time modal is shown
  if (dontShowAgainCheckbox) {
    dontShowAgainCheckbox.checked = false;
  }
}

// Safe close for update modal (normal close only, no dispersion effect)
function closeUpdateModalSafely() {
  // Apply cooldown if checkbox is checked at the moment of closing
  if (dontShowAgainCheckbox && dontShowAgainCheckbox.checked) {
    localStorage.setItem(UPDATE_MODAL_COOLDOWN_KEY, new Date().getTime().toString());
  } else {
    localStorage.removeItem(UPDATE_MODAL_COOLDOWN_KEY);
  }

  // Remove from stack
  modalStack = modalStack.filter(m => m !== updateModal);

  // Normal close animation
  gsap.to(updateModal, {
    duration: 0.3,
    opacity: 0,
    ease: "power2.in",
    onComplete: () => {
      gsap.set(updateModal, { display: "none" });
      updateModal.style.transform = "";
      updateModal.setAttribute("aria-hidden", "true");
    }
  });
  gsap.to(overlay, {
    duration: 0.25,
    opacity: 0,
    ease: "power2.in",
    onComplete: () => {
      gsap.set(overlay, { display: "none" });
      overlay.setAttribute("aria-hidden", "true");
      overlay.style.pointerEvents = "none";
    }
  });
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
  // Tandai area harga di title (membantu bedakan 2 link)
  try {
    document.title = "KEDAI MAS HARIS";
  } catch (e) {}

  // Load data from localStorage
  loadCartFromLocalStorage();
  loadWishlistFromLocalStorage();
  loadUsedPromoCodes(); // New: Load used promo codes (this is for the global `usedPromoCodes` set, not the `promoUsage` object)
  loadPromoUsage(); // New: Load promo usage data
  // Sinkronkan harga lama (mis. Nasi 3.500 → 10.000) ke katalog terbaru
  migrateStoredPrices();

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

  // Cart button — buka selalu (kosong = empty state + akses riwayat)
  document.getElementById("cart-btn").addEventListener("click", () => {
    promoCodeInput.value = '';
    promoMessage.classList.add('hidden');
    promoApplied = false;
    updateCartTotal();
    cartPanelMode = "cart";
    setCartChromeVisible(true);
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
    renderCart();
    showNotif("Perubahan disimpan");
    // Kembali ke cart (hapus edit dari stack, tampilkan cart)
    goBackToPreviousModal();
  });

  // Clear cart and confirm delete handlers
  document.getElementById("clear-cart-btn").addEventListener("click", () => {
    currentDeleteType = 'all';
    document.getElementById("confirm-delete-message").textContent = "Hapus semua item dari keranjang?";

    // Sembunyikan cart, buka konfirmasi (cart tetap di stack)
    gsap.to(cartModal, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
      gsap.set(cartModal, { display: "none" });
      cartModal.style.transform = "";
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
    renderCart();
    currentDeleteType = null;
    // Kembali ke cart
    goBackToPreviousModal();
  });

  // Checkout handler
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
      showNotif("Keranjang kosong");
      closeModal(cartModal);
      return;
    }

    // Sembunyikan cart, buka payment (cart tetap di stack agar Kembali bisa kembali)
    gsap.to(cartModal, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
      gsap.set(cartModal, { display: "none" });
      cartModal.style.transform = "";
      cartModal.setAttribute("aria-hidden", "true");
      // Reset sub-pilihan bank
      const bo = document.getElementById("bank-options");
      if (bo) bo.classList.add("hidden");
      ["pay-cash","pay-dana","pay-transfer","pay-qris"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("hidden");
      });
      const title = document.getElementById("payment-title");
      if (title) title.textContent = "Pilih Metode Pembayaran";
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
        <p class="info-hint mb-2">Siapkan uang tunai saat pengambilan pesanan</p>
        <p class="font-semibold text-lg">Total: Rp ${finalDiscountedPrice.toLocaleString('id-ID')}</p>
      </div>
    `;
    // Hide QR code for cash payment
    danaQrCodeImg.classList.add('hidden');
    danaQrCodeImg.src = '';

    // Close payment modal first, then open info modal
    gsap.to(paymentModal, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
      gsap.set(paymentModal, { display: "none" });
      paymentModal.style.transform = "";
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
        <p class="info-hint text-sm text-center">Silakan scan QR Code atau transfer ke nomor DANA di atas, lalu klik "Kirim WA" untuk konfirmasi pesanan</p>
      </div>
    `;
    // Show QR code for DANA payment
    danaQrCodeImg.src = DANA_QR_CODE_PATH;
    danaQrCodeImg.classList.remove('hidden');

    // Close payment modal first, then open info modal
    gsap.to(paymentModal, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
      gsap.set(paymentModal, { display: "none" });
      paymentModal.style.transform = "";
      paymentModal.setAttribute("aria-hidden", "true");
      openModal(infoModal);
    }});
  });

  // Helper: tampilkan / sembunyikan sub-pilihan bank
  const bankOptionsEl = document.getElementById("bank-options");
  const mainPayButtons = [
    document.getElementById("pay-cash"),
    document.getElementById("pay-dana"),
    document.getElementById("pay-transfer"),
    document.getElementById("pay-qris")
  ];

  function showBankOptions() {
    mainPayButtons.forEach(btn => { if (btn) btn.classList.add("hidden"); });
    if (bankOptionsEl) bankOptionsEl.classList.remove("hidden");
    document.getElementById("payment-title").textContent = "Pilih Bank";
  }

  function hideBankOptions() {
    mainPayButtons.forEach(btn => { if (btn) btn.classList.remove("hidden"); });
    if (bankOptionsEl) bankOptionsEl.classList.add("hidden");
    document.getElementById("payment-title").textContent = "Pilih Metode Pembayaran";
  }

  // Klik Transfer Bank → tampilkan 3 pilihan bank
  document.getElementById("pay-transfer").addEventListener("click", () => {
    showBankOptions();
  });

  // Helper: buka info modal untuk transfer bank
  function openBankTransferInfo(bankKey) {
    const bank = BANKS[bankKey];
    if (!bank) return;

    currentPaymentMethod = bank.label;
    currentOrderData = {
      method: "transfer",
      bank: bank.label,
      number: bank.number,
      name: bank.name
    };

    document.getElementById("info-title").textContent = `Pembayaran ${bank.label}`;
    document.getElementById("info-content").innerHTML = `
      <div class="space-y-3">
        <div class="info-item">
          <span class="info-left">Bank:</span>
          <span class="info-right">${bank.label}</span>
        </div>
        <div class="info-item">
          <span class="info-left">No. Rekening:</span>
          <span class="info-right">
            ${bank.number}
            <button class="copy-btn-inline" onclick="copyToClipboard(\`${bank.number}\`)">
              <i class="fas fa-copy"></i>
            </button>
          </span>
        </div>
        <div class="info-item">
          <span class="info-left">Atas Nama:</span>
          <span class="info-right">${bank.name}</span>
        </div>
        <div class="info-item">
          <span class="info-left">Total Bayar:</span>
          <span class="info-right">Rp ${finalDiscountedPrice.toLocaleString('id-ID')}</span>
        </div>
        <p class="info-hint text-sm text-center">Silakan transfer ke rekening di atas, lalu klik "Kirim WA" untuk konfirmasi pesanan</p>
      </div>
    `;
    danaQrCodeImg.classList.add('hidden');
    danaQrCodeImg.src = '';

    // Reset bank options sebelum tutup
    hideBankOptions();

    gsap.to(paymentModal, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
      gsap.set(paymentModal, { display: "none" });
      paymentModal.style.transform = "";
      paymentModal.setAttribute("aria-hidden", "true");
      // Hapus payment modal dari stack karena kita ganti ke info modal
      openModal(infoModal);
    }});
  }

  document.getElementById("pay-sinarmas").addEventListener("click", () => openBankTransferInfo("sinarmas"));
  document.getElementById("pay-bca").addEventListener("click", () => openBankTransferInfo("bca"));
  document.getElementById("pay-bni").addEventListener("click", () => openBankTransferInfo("bni"));

  document.getElementById("pay-qris").addEventListener("click", () => {
    currentPaymentMethod = "QRIS";
    currentOrderData = {
      method: "qris",
      name: "KEDAI MAS HARIS"
    };

    document.getElementById("info-title").textContent = "Pembayaran QRIS";
    document.getElementById("info-content").innerHTML = `
      <div class="space-y-3">
        <div class="info-item">
          <span class="info-left">Nama Toko:</span>
          <span class="info-right">KEDAI MAS HARIS</span>
        </div>
        <div class="info-item">
          <span class="info-left">Total Bayar:</span>
          <span class="info-right">Rp ${finalDiscountedPrice.toLocaleString('id-ID')}</span>
        </div>
        <p class="info-hint text-sm text-center mt-2 mb-3">Scan QR Code di bawah ini untuk melakukan pembayaran</p>
      </div>
    `;

    // Re-append the QR image (because innerHTML removed it) and show it
    const infoContent = document.getElementById("info-content");
    danaQrCodeImg.src = DANA_QR_CODE_PATH;
    danaQrCodeImg.classList.remove('hidden');
    danaQrCodeImg.alt = "QR Code QRIS KEDAI MAS HARIS";
    infoContent.appendChild(danaQrCodeImg);

    // Add the important note below the QR
    const noteEl = document.createElement("p");
    noteEl.className = "info-hint text-sm text-center mt-4 px-1";
    noteEl.innerHTML = `⚠️ Jika sudah melakukan pembayaran, harap melampirkan <strong>bukti pembayaran berhasil</strong> ke WhatsApp.`;
    infoContent.appendChild(noteEl);

    // Add hint text above QR so users know they can enlarge
    const enlargeHint = document.createElement("p");
    enlargeHint.className = "text-xs text-center text-orange-500 dark:text-orange-400 mb-2 font-medium";
    enlargeHint.innerHTML = `<i class="fas fa-search-plus mr-1"></i> Ketuk gambar QR untuk memperbesar agar mudah di-scan`;
    infoContent.insertBefore(enlargeHint, danaQrCodeImg);

    // Close payment modal first, then open info modal
    gsap.to(paymentModal, { duration: 0.25, opacity: 0, ease: "power2.in", onComplete: () => {
      gsap.set(paymentModal, { display: "none" });
      paymentModal.style.transform = "";
      paymentModal.setAttribute("aria-hidden", "true");
      openModal(infoModal);
    }});
  });

  // ---------- QR Code Enlarge Feature ----------
  const qrEnlargeOverlay = document.getElementById("qr-enlarge-overlay");
  const qrEnlargeImg = document.getElementById("qr-enlarge-img");
  const qrEnlargeClose = document.getElementById("qr-enlarge-close");

  function openQrEnlarge(src) {
    if (!src || !qrEnlargeOverlay) return;
    qrEnlargeImg.src = src;
    qrEnlargeOverlay.classList.remove("hidden");
    // Force reflow then show
    void qrEnlargeOverlay.offsetWidth;
    qrEnlargeOverlay.classList.add("show");
    qrEnlargeOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  // Expose globally agar bisa dipanggil dari openProductDetailModal
  window.openQrEnlarge = openQrEnlarge;

  function closeQrEnlarge() {
    if (!qrEnlargeOverlay) return;
    qrEnlargeOverlay.classList.remove("show");
    setTimeout(() => {
      qrEnlargeOverlay.classList.add("hidden");
      qrEnlargeImg.src = "";
      qrEnlargeOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }, 250);
  }
  window.closeQrEnlarge = closeQrEnlarge;

  // Click on QR image to enlarge
  if (danaQrCodeImg) {
    danaQrCodeImg.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!danaQrCodeImg.classList.contains("hidden") && danaQrCodeImg.src) {
        openQrEnlarge(danaQrCodeImg.src);
      }
    });
  }

  // Close enlarge overlay
  if (qrEnlargeClose) {
    qrEnlargeClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeQrEnlarge();
    });
  }
  if (qrEnlargeOverlay) {
    qrEnlargeOverlay.addEventListener("click", (e) => {
      // Close only if clicking the dark background (not the image itself)
      if (e.target === qrEnlargeOverlay) {
        closeQrEnlarge();
      }
    });
  }
  // ESC key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && qrEnlargeOverlay && qrEnlargeOverlay.classList.contains("show")) {
      closeQrEnlarge();
    }
  });

  // Info modal handlers
  document.getElementById("send-wa").addEventListener("click", requestSendToWhatsApp);

  const confirmWaYes = document.getElementById("confirm-wa-yes");
  if (confirmWaYes) {
    confirmWaYes.addEventListener("click", () => {
      sendToWhatsApp();
    });
  }

  // Status PO H-1
  updatePoStatusBanner();
  // Refresh status setiap menit (jika lewat jam 19.00)
  setInterval(updatePoStatusBanner, 60000);

  // Validasi form pengantaran → aktifkan/nonaktifkan tombol Kirim WA
  const checkoutNameInput = document.getElementById("checkout-name");
  const checkoutAddressInput = document.getElementById("checkout-address");
  if (checkoutNameInput) {
    checkoutNameInput.addEventListener("input", updateSendWaButtonState);
  }
  if (checkoutAddressInput) {
    checkoutAddressInput.addEventListener("input", updateSendWaButtonState);
  }
  // Pastikan tombol WA disabled saat awal
  updateSendWaButtonState();

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
      return;
    }
    if (!currentTopModal) return;
    // Konfirmasi WA: klik di luar dinonaktifkan (hanya X / Batal)
    if (currentTopModal.id === "confirm-wa-modal") {
      return;
    }
    if (currentTopModal === updateModal) {
      closeUpdateModalSafely();
    } else {
      closeAllModals();
    }
  });

  // Debounce anti double-tap tombol Pesan (mobile)
  let lastPesanClickAt = 0;
  const PESAN_DEBOUNCE_MS = 500;

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

      // Debounce: cegah qty dobel dari double-tap
      const now = Date.now();
      if (now - lastPesanClickAt < PESAN_DEBOUNCE_MS) return;
      lastPesanClickAt = now;

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
        // Special handling for updateModal – always use safe close
        if (modal.id === 'update-modal') {
          closeUpdateModalSafely();
        } else if (modalStack.length > 1) {
          // Modal bertingkat: X = kembali satu tingkat (sama seperti Kembali)
          if (modal.id === 'payment-modal') {
            const bankOpts = document.getElementById("bank-options");
            if (bankOpts && !bankOpts.classList.contains("hidden")) {
              bankOpts.classList.add("hidden");
              ["pay-cash","pay-dana","pay-transfer","pay-qris"].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove("hidden");
              });
              document.getElementById("payment-title").textContent = "Pilih Metode Pembayaran";
              return;
            }
          }
          goBackToPreviousModal();
        } else {
          // Modal root: tutup semua
          closeAllModals();
        }
      });
    }

    // Add event listener for the "Kembali" back button
    const backBtn = modal.querySelector('.modal-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (modal.id === 'update-modal') {
          closeUpdateModalSafely();
        } else if (modal.id === 'payment-modal') {
          // Jika sedang di sub-pilihan bank, kembali ke metode pembayaran
          const bankOpts = document.getElementById("bank-options");
          if (bankOpts && !bankOpts.classList.contains("hidden")) {
            bankOpts.classList.add("hidden");
            ["pay-cash","pay-dana","pay-transfer","pay-qris"].forEach(id => {
              const el = document.getElementById(id);
              if (el) el.classList.remove("hidden");
            });
            document.getElementById("payment-title").textContent = "Pilih Metode Pembayaran";
          } else {
            goBackToPreviousModal();
          }
        } else if (modal.id === 'cart-modal' && cartPanelMode === 'history') {
          // Dari riwayat → kembali ke tampilan keranjang (bukan tutup modal)
          showCartNormalView();
        } else {
          goBackToPreviousModal();
        }
      });
    }
  });
});

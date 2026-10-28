const motorItems = Array.from(document.querySelectorAll(".motor-item"));
const searchInput = document.getElementById("searchMotor");
const sortSelect = document.getElementById("sortPrice");
const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const emptyState = document.getElementById("emptyState");
let activeFilter = "semua";
let selectedPrice = 0;

document.getElementById("year").textContent = new Date().getFullYear();

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleItems = [];
  motorItems.forEach(item => {
    const name = (item.dataset.name || "").toLowerCase();
    const matchesSearch = name.includes(query);
    const matchesFilter = activeFilter === "semua" || item.dataset.type === activeFilter;
    const show = matchesSearch && matchesFilter;
    item.classList.toggle("d-none", !show);
    if (show) visibleItems.push(item);
  });
  if (sortSelect.value !== "default") {
    visibleItems.sort((a, b) => {
      const priceA = Number(a.dataset.price);
      const priceB = Number(b.dataset.price);
      return sortSelect.value === "low" ? priceA - priceB : priceB - priceA;
    });
    const grid = document.getElementById("motorGrid");
    visibleItems.forEach(item => grid.appendChild(item));
  }
  emptyState.classList.toggle("d-none", visibleItems.length !== 0);
}
searchInput.addEventListener("input", applyFilters);
sortSelect.addEventListener("change", applyFilters);
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));
    applyFilters();
  });
});

const bookingModalElement = document.getElementById("bookingModal");
const bookingModal = new bootstrap.Modal(bookingModalElement);
const bookingToast = bootstrap.Toast.getOrCreateInstance(document.getElementById("bookingToast"));
const bikeInput = document.getElementById("bikeInput");
const rentDate = document.getElementById("rentDate");
const rentDays = document.getElementById("rentDays");
const totalPrice = document.getElementById("totalPrice");
const rupiah = value => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

function updateTotal() {
  const days = Math.max(1, Number(rentDays.value) || 1);
  totalPrice.textContent = rupiah(selectedPrice * days);
}
document.querySelectorAll(".btn-rent").forEach(button => {
  button.addEventListener("click", () => {
    const bike = button.dataset.bike;
    selectedPrice = Number(button.dataset.price);
    document.getElementById("selectedBike").textContent = bike;
    document.getElementById("selectedPrice").textContent = `${rupiah(selectedPrice)}/hari`;
    bikeInput.value = bike;
    rentDays.value = 1;
    updateTotal();
    bookingModal.show();
  });
});
rentDays.addEventListener("input", updateTotal);

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
rentDate.min = localToday;
rentDate.value = localToday;

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const bike = bikeInput.value;
  const date = rentDate.value;
  const days = Math.max(1, Number(rentDays.value) || 1);
  const total = rupiah(selectedPrice * days);
  document.getElementById("toastMessage").textContent =
    `${name}, ringkasan pesanan: ${bike}, mulai ${date}, durasi ${days} hari, estimasi ${total}. Ini hanya demo; hubungi admin untuk konfirmasi karena data belum disimpan.`;
  bookingModal.hide();
  bookingModalElement.addEventListener("hidden.bs.modal", () => bookingToast.show(), { once: true });
});

const businessWhatsappNumber = "447709721192";

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

const properties = [
  {
    id: "1",
    title: "Premium Shared Apartment",
    state: "Lagos",
    area: "Yaba",
    university: "Near UNILAG",
    type: "Apartment",
    price: 280000,
    priceText: "₦280,000 / year",
    badge: "Verified Property",
    badgeClass: "verified",
    imageClass: "img-one",
    location: "Lagos State • Yaba • Near UNILAG",
    description: "A clean and modern shared apartment in Yaba, suitable for students who want easy access to UNILAG and nearby study areas.",
    features: ["✔ WiFi available", "✔ 24/7 security access", "✔ Furnished shared living space", "✔ Close to UNILAG", "✔ Kitchen access", "✔ Water and electricity access"],
    gallery: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80", "images/room1.jpg", "images/room2.jpg"]
  },
  {
    id: "2",
    title: "Private Student Studio",
    state: "FCT Abuja",
    area: "Gwarinpa",
    university: "Near University of Abuja",
    type: "Studio",
    price: 450000,
    priceText: "₦450,000 / year",
    badge: "Featured Property",
    badgeClass: "featured",
    imageClass: "img-two",
    location: "Abuja • Gwarinpa • Near University of Abuja",
    description: "A private student studio in Abuja with a quiet environment, secure access, and essential amenities.",
    features: ["✔ Private room", "✔ Bills included", "✔ Secure building", "✔ Near University of Abuja", "✔ Clean bathroom access", "✔ Suitable for focused study"],
    gallery: ["images/room1.jpg", "images/room2.jpg", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"]
  },
  {
    id: "3",
    title: "Affordable Student Hostel",
    state: "Enugu",
    area: "UNEC Area",
    university: "Near UNEC",
    type: "Hostel",
    price: 180000,
    priceText: "₦180,000 / year",
    badge: "Verified Property",
    badgeClass: "verified",
    imageClass: "img-three",
    location: "Enugu State • Near UNEC",
    description: "An affordable student hostel near UNEC with simple facilities, secure access, and student-friendly pricing.",
    features: ["✔ Affordable yearly rent", "✔ Secure hostel access", "✔ Student-friendly environment", "✔ Close to UNEC", "✔ Water access", "✔ Shared facilities"],
    gallery: ["images/room2.jpg", "images/room1.jpg", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80"]
  },
  {
    id: "4",
    title: "Modern Campus Room",
    state: "Rivers",
    area: "Port Harcourt",
    university: "Close to University",
    type: "Shared Room",
    price: 220000,
    priceText: "₦220,000 / year",
    badge: "Available Now",
    badgeClass: "available",
    imageClass: "img-four",
    location: "Rivers State • Port Harcourt • Close to University",
    description: "A modern campus room in Port Harcourt with access to water, power, and a student-friendly environment.",
    features: ["✔ Shared room option", "✔ Water access", "✔ Power access", "✔ Close to university", "✔ Student environment", "✔ Affordable rent"],
    gallery: ["https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=1600&q=80", "images/room1.jpg", "images/room2.jpg"]
  },
  {
    id: "5",
    title: "Clean Shared Student Flat",
    state: "Kano",
    area: "Kano City",
    university: "Near Bayero University",
    type: "Shared Room",
    price: 200000,
    priceText: "₦200,000 / year",
    badge: "Verified Property",
    badgeClass: "verified",
    imageClass: "img-five",
    location: "Kano State • Near Bayero University",
    description: "A clean shared student flat in Kano with a calm surrounding and secure gate access.",
    features: ["✔ Shared flat", "✔ Kitchen access", "✔ Secure gate", "✔ Quiet environment", "✔ Student-friendly space", "✔ Affordable yearly rent"],
    gallery: ["https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1600&q=80", "images/room2.jpg", "images/room1.jpg"]
  },
  {
    id: "6",
    title: "Furnished Student Apartment",
    state: "Lagos",
    area: "Lekki",
    university: "Premium Location",
    type: "Apartment",
    price: 650000,
    priceText: "₦650,000 / year",
    badge: "Featured Property",
    badgeClass: "featured",
    imageClass: "img-six",
    location: "Lagos State • Lekki • Premium Location",
    description: "A furnished student apartment in a premium Lagos location with strong security, comfortable interiors, and access to key facilities.",
    features: ["✔ Fully furnished apartment", "✔ Air conditioning", "✔ 24/7 security", "✔ Premium Lagos location", "✔ Kitchen access", "✔ Comfortable study space"],
    gallery: ["https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1600&q=80", "images/room1.jpg", "images/room2.jpg"]
  }
];

function getPropertyById() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "1";
  return properties.find((p) => p.id === id) || properties[0];
}

/* HERO SEARCH → REDIRECT TO LISTINGS */

const heroSearchBtn = document.getElementById("heroSearchBtn");

if (heroSearchBtn) {
  heroSearchBtn.addEventListener("click", () => {
    const search = document.getElementById("heroSearchInput")?.value || "";
    const state = document.getElementById("heroStateFilter")?.value || "";
    const type = document.getElementById("heroTypeFilter")?.value || "";
    const budget = document.getElementById("heroBudgetFilter")?.value || "";

    const params = new URLSearchParams();

    if (search.trim()) params.set("q", search.trim());
    if (state) params.set("state", state);
    if (type) params.set("type", type);
    if (budget) params.set("budget", budget);

    window.location.href = `listings.html?${params.toString()}`;
  });
}

/* LISTINGS FILTER */
const searchInput = document.getElementById("searchInput");
const stateFilter = document.getElementById("stateFilter");
const typeFilter = document.getElementById("typeFilter");
const budgetFilter = document.getElementById("budgetFilter");
const resetFilters = document.getElementById("resetFilters");
const propertyCards = document.querySelectorAll(".property-card");
const propertyCount = document.getElementById("propertyCount");
const resultsText = document.getElementById("resultsText");
const noResults = document.getElementById("noResults");

function matchesBudget(price, budgetValue) {
  if (!budgetValue) return true;
  const budget = Number(budgetValue);
  if (budget === 150000) return price < 150000;
  if (budget === 400000) return price >= 150000 && price <= 400000;
  if (budget === 800000) return price > 400000 && price <= 800000;
  if (budget === 800001) return price > 800000;
  return true;
}

function applyQueryFilters() {
  const params = new URLSearchParams(window.location.search);

  const q = params.get("q") || "";
  const state = params.get("state") || "";
  const type = params.get("type") || "";
  const budget = params.get("budget") || "";

  if (searchInput) searchInput.value = q;
  if (stateFilter) stateFilter.value = state;
  if (typeFilter) typeFilter.value = type;
  if (budgetFilter) budgetFilter.value = budget;
}

function filterListings() {
  if (!propertyCards.length) return;

  const searchValue = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const selectedState = stateFilter ? stateFilter.value : "";
  const selectedType = typeFilter ? typeFilter.value : "";
  const selectedBudget = budgetFilter ? budgetFilter.value : "";

  let visibleCount = 0;

  propertyCards.forEach((card) => {
    const cardState = card.dataset.state || "";
    const cardType = card.dataset.type || "";
    const cardPrice = Number(card.dataset.price || 0);
    const cardKeywords = (card.dataset.keywords || "").toLowerCase();

    const searchMatch =
      !searchValue ||
      cardKeywords.includes(searchValue) ||
      cardState.toLowerCase().includes(searchValue) ||
      cardType.toLowerCase().includes(searchValue);

    const stateMatch = !selectedState || cardState === selectedState;
    const typeMatch = !selectedType || cardType === selectedType;
    const budgetMatch = matchesBudget(cardPrice, selectedBudget);

    const isVisible = searchMatch && stateMatch && typeMatch && budgetMatch;
    const wrap = card.closest(".property-card-wrap");

    if (wrap) wrap.style.display = isVisible ? "" : "none";
    else card.style.display = isVisible ? "" : "none";

    if (isVisible) visibleCount++;
  });

  if (propertyCount) propertyCount.textContent = visibleCount;

  if (resultsText) {
    resultsText.textContent =
      visibleCount === propertyCards.length
        ? "Showing verified student housing options across Nigeria."
        : visibleCount === 1
        ? "Showing 1 matching accommodation option."
        : `Showing ${visibleCount} matching accommodation options.`;
  }

  if (noResults) {
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }
}

function resetListingFilters() {
  if (searchInput) searchInput.value = "";
  if (stateFilter) stateFilter.value = "";
  if (typeFilter) typeFilter.value = "";
  if (budgetFilter) budgetFilter.value = "";
  window.history.replaceState({}, document.title, "listings.html");
  filterListings();
}

if (searchInput) searchInput.addEventListener("input", filterListings);
if (stateFilter) stateFilter.addEventListener("change", filterListings);
if (typeFilter) typeFilter.addEventListener("change", filterListings);
if (budgetFilter) budgetFilter.addEventListener("change", filterListings);
if (resetFilters) resetFilters.addEventListener("click", resetListingFilters);

applyQueryFilters();
filterListings();

/* SAVE PROPERTY */
function getSavedProperties() {
  return JSON.parse(localStorage.getItem("savedProperties")) || [];
}

function setSavedProperties(ids) {
  localStorage.setItem("savedProperties", JSON.stringify(ids));
}

function toggleSavedProperty(id) {
  let saved = getSavedProperties();

  if (saved.includes(id)) saved = saved.filter((item) => item !== id);
  else saved.push(id);

  setSavedProperties(saved);
  updateSaveButtons();
}

function updateSaveButtons() {
  const saved = getSavedProperties();

  document.querySelectorAll(".save-property-btn").forEach((btn) => {
    const id = btn.dataset.saveId;

    if (saved.includes(id)) {
      btn.classList.add("saved");
      btn.textContent = "♥";
    } else {
      btn.classList.remove("saved");
      btn.textContent = "♡";
    }
  });

  const detailBtn = document.getElementById("savePropertyDetailBtn");
  if (detailBtn) {
    const property = getPropertyById();

    if (saved.includes(property.id)) {
      detailBtn.classList.add("saved");
      detailBtn.textContent = "♥ Saved Property";
    } else {
      detailBtn.classList.remove("saved");
      detailBtn.textContent = "♡ Save Property";
    }
  }
}

document.querySelectorAll(".save-property-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavedProperty(btn.dataset.saveId);
  });
});

const savePropertyDetailBtn = document.getElementById("savePropertyDetailBtn");

if (savePropertyDetailBtn) {
  savePropertyDetailBtn.addEventListener("click", () => {
    toggleSavedProperty(getPropertyById().id);
  });
}

updateSaveButtons();

/* PROPERTY PAGE */
let activePropertyGallery = [];
let activeGalleryIndex = 0;

function loadPropertyPage() {
  const propertyTitle = document.getElementById("propertyTitle");
  if (!propertyTitle) return;

  const property = getPropertyById();

  activePropertyGallery = property.gallery || [];

  document.title = `${property.title} | Afro Student Living`;

  propertyTitle.textContent = property.title;

  const propertyLocation = document.getElementById("propertyLocation");
  const propertyPrice = document.getElementById("propertyPrice");
  const sidePrice = document.getElementById("sidePrice");
  const propertyDescription = document.getElementById("propertyDescription");
  const propertyFeatures = document.getElementById("propertyFeatures");
  const propertyTypeText = document.getElementById("propertyTypeText");
  const bookingLink = document.getElementById("bookingLink");
  const whatsappLink = document.getElementById("whatsappLink");
  const propertyImage = document.getElementById("propertyImage");
  const propertyBadge = document.getElementById("propertyBadge");
  const requestViewingBtn = document.getElementById("requestViewingBtn");

  if (propertyLocation) propertyLocation.textContent = property.location;
  if (propertyPrice) propertyPrice.textContent = property.priceText;
  if (sidePrice) sidePrice.textContent = property.priceText;
  if (propertyDescription) propertyDescription.textContent = property.description;
  if (propertyTypeText) propertyTypeText.textContent = property.type;
  if (propertyImage) propertyImage.className = `gallery-main ${property.imageClass}`;

  if (propertyBadge) {
    propertyBadge.className = `badge ${property.badgeClass} animated-hero-text`;
    propertyBadge.textContent = property.badge;
  }

  if (propertyFeatures) {
    propertyFeatures.innerHTML = property.features.map((f) => `<li>${f}</li>`).join("");
  }

  if (bookingLink) bookingLink.href = `booking-request.html?id=${property.id}`;

  if (whatsappLink) {
    const msg = encodeURIComponent(
      `Hello Afro Student Living,\n\nI'm interested in this property:\n\nProperty: ${property.title}\nLocation: ${property.location}\nPrice: ${property.priceText}\n\nPlease confirm availability.`
    );
    whatsappLink.href = `https://wa.me/${businessWhatsappNumber}?text=${msg}`;
  }

  if (requestViewingBtn) {
    requestViewingBtn.addEventListener("click", () => {
      const text = encodeURIComponent(
        `Hello Afro Student Living,\n\nI would like to request a viewing for this property:\n\nProperty: ${property.title}\nLocation: ${property.location}\nPrice: ${property.priceText}\n\nPlease confirm available viewing dates and times.`
      );
      window.open(`https://wa.me/${businessWhatsappNumber}?text=${text}`, "_blank");
    });
  }

  updateSaveButtons();
}

loadPropertyPage();

/* GALLERY */
const galleryModal = document.getElementById("galleryModal");
const galleryModalImage = document.getElementById("galleryModalImage");
const galleryCounter = document.getElementById("galleryCounter");
const openGalleryBtn = document.getElementById("openGalleryBtn");
const closeGalleryBtn = document.getElementById("closeGalleryBtn");
const prevGalleryBtn = document.getElementById("prevGalleryBtn");
const nextGalleryBtn = document.getElementById("nextGalleryBtn");

function renderGalleryModal() {
  if (!galleryModalImage || !galleryCounter || !activePropertyGallery.length) return;
  galleryModalImage.src = activePropertyGallery[activeGalleryIndex];
  galleryCounter.textContent = `${activeGalleryIndex + 1} / ${activePropertyGallery.length}`;
}

function openGallery(index = 0) {
  if (!galleryModal || !activePropertyGallery.length) return;
  activeGalleryIndex = index;
  renderGalleryModal();
  galleryModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  if (!galleryModal) return;
  galleryModal.classList.remove("active");
  document.body.style.overflow = "";
}

function nextGallery() {
  activeGalleryIndex = (activeGalleryIndex + 1) % activePropertyGallery.length;
  renderGalleryModal();
}

function prevGallery() {
  activeGalleryIndex = (activeGalleryIndex - 1 + activePropertyGallery.length) % activePropertyGallery.length;
  renderGalleryModal();
}

if (openGalleryBtn) openGalleryBtn.addEventListener("click", () => openGallery(0));
if (closeGalleryBtn) closeGalleryBtn.addEventListener("click", closeGallery);
if (nextGalleryBtn) nextGalleryBtn.addEventListener("click", nextGallery);
if (prevGalleryBtn) prevGalleryBtn.addEventListener("click", prevGallery);

document.querySelectorAll("[data-gallery-index]").forEach((item) => {
  item.addEventListener("click", () => openGallery(Number(item.dataset.galleryIndex || 0)));
});

/* BOOKING PAGE */
function loadBookingPage() {
  const bookingPropertyTitle = document.getElementById("bookingPropertyTitle");
  if (!bookingPropertyTitle) return;

  const property = getPropertyById();

  bookingPropertyTitle.textContent = property.title;

  const bookingPropertyImage = document.getElementById("bookingPropertyImage");
  const bookingPropertyLocation = document.getElementById("bookingPropertyLocation");
  const bookingPropertyPrice = document.getElementById("bookingPropertyPrice");
  const bookingMessage = document.getElementById("bookingMessage");

  if (bookingPropertyLocation) bookingPropertyLocation.textContent = property.location;
  if (bookingPropertyPrice) bookingPropertyPrice.textContent = property.priceText;
  if (bookingPropertyImage) bookingPropertyImage.className = `property-img ${property.imageClass} summary-img`;
  if (bookingMessage) bookingMessage.value = `Hello, I would like to request booking for ${property.title} in ${property.location}.`;
}

loadBookingPage();

const bookingWhatsappBtn = document.getElementById("bookingWhatsappBtn");

if (bookingWhatsappBtn) {
  bookingWhatsappBtn.addEventListener("click", () => {
    const property = getPropertyById();

    const name = document.getElementById("studentName")?.value || "";
    const phone = document.getElementById("studentPhone")?.value || "";
    const email = document.getElementById("studentEmail")?.value || "";
    const university = document.getElementById("studentUniversity")?.value || "";
    const moveDate = document.getElementById("moveDate")?.value || "";
    const message = document.getElementById("bookingMessage")?.value || "";

    const text = encodeURIComponent(
      `Hello Afro Student Living,\n\nI want to request booking for:\n\nProperty: ${property.title}\nLocation: ${property.location}\nPrice: ${property.priceText}\n\nStudent Details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nUniversity: ${university}\nMove-in Date: ${moveDate}\n\nMessage: ${message}\n\nPlease confirm availability.`
    );

    window.open(`https://wa.me/${businessWhatsappNumber}?text=${text}`, "_blank");
  });
}

/* SUBMIT PROPERTY LOCAL PREVIEW */
const propertyImagesInput = document.getElementById("propertyImages");
const imagePreview = document.getElementById("imagePreview");
let uploadedPropertyImages = [];

if (propertyImagesInput && imagePreview) {
  propertyImagesInput.addEventListener("change", () => {
    uploadedPropertyImages = [];
    imagePreview.innerHTML = "";

    Array.from(propertyImagesInput.files).slice(0, 6).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        uploadedPropertyImages.push(e.target.result);
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Uploaded property preview";
        imagePreview.appendChild(img);
      };

      reader.readAsDataURL(file);
    });
  });
}

const submitPropertyForm = document.getElementById("submitPropertyForm");

if (submitPropertyForm) {
  submitPropertyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submission = {
      id: Date.now(),
      propertyName: document.getElementById("propertyName")?.value || "",
      state: document.getElementById("propertyState")?.value || "",
      type: document.getElementById("propertyType")?.value || "",
      price: document.getElementById("propertyPrice")?.value || "",
      ownerName: document.getElementById("ownerName")?.value || "",
      whatsapp: document.getElementById("ownerWhatsapp")?.value || "",
      area: document.getElementById("propertyArea")?.value || "",
      description: document.getElementById("propertyDescriptionInput")?.value || "",
      images: uploadedPropertyImages,
      status: "Pending Review"
    };

    const submissions = JSON.parse(localStorage.getItem("propertySubmissions")) || [];
    submissions.push(submission);
    localStorage.setItem("propertySubmissions", JSON.stringify(submissions));

    const text = encodeURIComponent(
      `New property submission for Afro Student Living:\n\nProperty: ${submission.propertyName}\nState: ${submission.state}\nType: ${submission.type}\nPrice: ${submission.price}\nArea / University: ${submission.area}\n\nOwner Details:\nName: ${submission.ownerName}\nWhatsApp: ${submission.whatsapp}\n\nDescription:\n${submission.description}\n\nStatus: Pending Admin Review`
    );

    alert("Property submitted for admin review. WhatsApp will open with the submission details.");
    window.open(`https://wa.me/${businessWhatsappNumber}?text=${text}`, "_blank");

    submitPropertyForm.reset();
    uploadedPropertyImages = [];
    if (imagePreview) imagePreview.innerHTML = "";
  });
}

/* ADMIN DASHBOARD */
const adminSubmissionsTable = document.getElementById("adminSubmissionsTable");
const submissionCount = document.getElementById("submissionCount");
const clearSubmissionsBtn = document.getElementById("clearSubmissionsBtn");

function renderAdminSubmissions() {
  if (!adminSubmissionsTable) return;

  const submissions = JSON.parse(localStorage.getItem("propertySubmissions")) || [];
  if (submissionCount) submissionCount.textContent = submissions.length;

  adminSubmissionsTable.innerHTML = submissions.length
    ? submissions.map((item) => {
        const firstImage =
          item.images && item.images.length
            ? `<img src="${item.images[0]}" alt="Property" class="admin-thumb">`
            : `<span class="no-image">No image</span>`;

        return `
          <tr>
            <td>${firstImage}</td>
            <td><strong>${item.propertyName}</strong><br><small>${item.area}</small></td>
            <td>${item.state}</td>
            <td>${item.type}</td>
            <td>${item.price}</td>
            <td>${item.ownerName}</td>
            <td>${item.whatsapp}</td>
            <td><span class="table-badge pending">${item.status}</span></td>
          </tr>
        `;
      }).join("")
    : `<tr><td colspan="8">No property submissions yet.</td></tr>`;
}

renderAdminSubmissions();

if (clearSubmissionsBtn) {
  clearSubmissionsBtn.addEventListener("click", () => {
    if (!confirm("Clear all preview property submissions?")) return;
    localStorage.removeItem("propertySubmissions");
    renderAdminSubmissions();
  });
}

/* REVEAL */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < triggerBottom) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
revealOnScroll();

/* SCROLL TO TOP */
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 150) scrollBtn.classList.add("show");
    else scrollBtn.classList.remove("show");
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
/* SUBMIT PROPERTY → SAVE TO SUPABASE */

const submitForm = document.getElementById("submitPropertyForm");

if (submitForm) {
  submitForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("propertyName").value;
    const state = document.getElementById("propertyState").value;
    const type = document.getElementById("propertyType").value;
    const price = document.getElementById("propertyPrice").value;
    const area = document.getElementById("propertyArea").value;
    const description = document.getElementById("propertyDescriptionInput").value;

    const { error } = await supabase
      .from("property_submissions")
      .insert([
        {
          name,
          state,
          type,
          price,
          area,
          description,
          status: "pending"
        }
      ]);

    if (error) {
      alert("Error submitting property");
      console.error(error);
      return;
    }

    alert("Property submitted successfully. Waiting for admin approval.");
    submitForm.reset();
  });
}
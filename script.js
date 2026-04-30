const businessWhatsappNumber = "447709721192";

const ADMIN_EMAILS = [
  "anwar_hejazy@hotmail.com",
  "ygr08100@gmail.com"
];

/* =========================
   MOBILE MENU
========================= */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* =========================
   GLOBAL PROPERTY DATA
   100% dynamic from Supabase
========================= */
let properties = [];
let livePropertiesLoaded = false;
let selectedPropertyFiles = [];

function getSupabaseClientSafe() {
  if (window.supabaseClient) return window.supabaseClient;
  if (typeof supabaseClient !== "undefined") return supabaseClient;
  return null;
}

function cleanText(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeProperty(p, index = 0) {
  const imageClasses = ["img-one", "img-two", "img-three", "img-four", "img-five", "img-six"];
  const area = p.area || p.city || "";
  const priceNumber = Number(p.price || 0);
  const imageUrls = Array.isArray(p.image_urls) ? p.image_urls : [];

  return {
    id: String(p.id),
    submission_id: p.submission_id || "",
    title: p.title || "Student Accommodation",
    state: p.state || "",
    area,
    city: p.city || area,
    university: p.university || "",
    type: p.type || "Apartment",
    price: priceNumber,
    priceText: `₦${priceNumber.toLocaleString()} / year`,
    badge: p.badge || "Verified Property",
    badgeClass: p.badgeClass || "verified",
    imageClass: p.imageClass || imageClasses[index % imageClasses.length],
    image_urls: imageUrls,
    mainImage: imageUrls[0] || "",
    location: p.location || `${p.state || ""}${area ? " • " + area : ""}${p.university ? " • " + p.university : ""}`,
    description: p.description || "Student accommodation submitted and approved by Afro Student Living admin.",
    features: p.features || ["✔ Admin approved", "✔ Student-friendly location", "✔ Contact available", "✔ Suitable for students"],
    gallery: imageUrls.length ? imageUrls : ["images/room1.jpg", "images/room2.jpg"]
  };
}

function getPropertyById() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "";
  return properties.find((p) => String(p.id) === String(id)) || properties[0] || null;
}

function generatePropertyDescription({ title, state, type, priceRaw, city, university }) {
  const propertyName = title || "This student accommodation";
  const propertyType = type || "student accommodation";
  const location = city || state || "a convenient student area";
  const nearby = university || city || "nearby institutions";
  const priceText = priceRaw ? `The listed price is ${priceRaw}.` : "Pricing is clearly listed for student planning.";

  return `${propertyName} is a ${propertyType.toLowerCase()} located in ${location}, designed for students who want a comfortable, safe, and convenient place to stay.

The property is suitable for students looking for easy access to ${nearby}, transport links, shops, and essential daily services. It offers a practical living environment for study, rest, and everyday student life.

Key benefits include a student-friendly location, clear pricing, access to nearby amenities, and a secure accommodation setup. ${priceText}

This property is ideal for students who want reliable accommodation with a smooth request and admin-reviewed approval process through Afro Student Living.`;
}

/* =========================
   HERO SEARCH
========================= */
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

/* =========================
   LISTINGS FILTER
========================= */
const searchInput = document.getElementById("searchInput");
const stateFilter = document.getElementById("stateFilter");
const typeFilter = document.getElementById("typeFilter");
const budgetFilter = document.getElementById("budgetFilter");
const resetFilters = document.getElementById("resetFilters");
const propertyCount = document.getElementById("propertyCount");
const resultsText = document.getElementById("resultsText");
const noResults = document.getElementById("noResults");

function getPropertyCards() {
  return document.querySelectorAll(".property-card");
}

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
  const propertyCards = getPropertyCards();
  if (!propertyCards.length) {
    if (propertyCount) propertyCount.textContent = 0;
    return;
  }

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

/* =========================
   LIVE LISTINGS FROM SUPABASE
========================= */
function findListingsContainer() {
  return (
    document.getElementById("listingsContainer") ||
    document.getElementById("propertyGrid") ||
    document.getElementById("propertiesGrid") ||
    document.getElementById("listingsGrid") ||
    document.querySelector("[data-live-listings]") ||
    document.querySelector(".property-grid") ||
    document.querySelector(".properties-grid") ||
    document.querySelector(".listings-grid") ||
    document.querySelector(".property-card-wrap")?.parentElement
  );
}

function renderLiveListings(liveProperties) {
  const container = findListingsContainer();
  if (!container) return;

  if (!liveProperties.length) {
    container.innerHTML = `<p class="small-note">No approved properties available yet.</p>`;
    if (propertyCount) propertyCount.textContent = 0;
    return;
  }

  container.innerHTML = liveProperties
    .map((property) => {
      const keywords = `${property.title} ${property.state} ${property.area} ${property.city} ${property.university} ${property.type}`.toLowerCase();
      const imageStyle = property.mainImage ? `style="background-image: url('${cleanText(property.mainImage)}');"` : "";

      return `
        <div class="property-card-wrap">
          <button class="save-property-btn" data-save-id="${cleanText(property.id)}" type="button">♡</button>

          <a href="property.html?id=${encodeURIComponent(property.id)}"
             class="property-card"
             data-state="${cleanText(property.state)}"
             data-type="${cleanText(property.type)}"
             data-price="${Number(property.price || 0)}"
             data-keywords="${cleanText(keywords)}">

            <div class="property-img ${cleanText(property.imageClass)}" ${imageStyle}></div>

            <div class="property-content">
              <span class="badge ${cleanText(property.badgeClass)}">${cleanText(property.badge)}</span>
              <h3>${cleanText(property.title)}</h3>
              <p>${cleanText(property.location)}</p>

              <ul class="mini-features">
                <li>${cleanText(property.type)}</li>
                <li>${cleanText(property.state)}</li>
                <li>Approved</li>
              </ul>

              <strong>${cleanText(property.priceText)}</strong>
            </div>
          </a>
        </div>
      `;
    })
    .join("");

  updateSaveButtons();
  filterListings();
}

async function fetchLivePropertiesFromSupabase() {
  const db = getSupabaseClientSafe();
  if (!db) return [];

  const { data, error } = await db
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Live properties error:", error);
    return [];
  }

  return (data || []).map((item, index) => normalizeProperty(item, index));
}

async function loadLivePropertiesFromSupabase() {
  if (livePropertiesLoaded) return properties;

  properties = await fetchLivePropertiesFromSupabase();
  livePropertiesLoaded = true;

  if (window.location.pathname.includes("listings") || findListingsContainer()) {
    renderLiveListings(properties);
  }

  return properties;
}

/* =========================
   SAVE PROPERTY
========================= */
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

    if (!btn.dataset.boundSave) {
      btn.dataset.boundSave = "true";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSavedProperty(btn.dataset.saveId);
      });
    }
  });

  const detailBtn = document.getElementById("savePropertyDetailBtn");

  if (detailBtn) {
    const property = getPropertyById();
    if (!property) return;

    if (saved.includes(property.id)) {
      detailBtn.classList.add("saved");
      detailBtn.textContent = "♥ Saved Property";
    } else {
      detailBtn.classList.remove("saved");
      detailBtn.textContent = "♡ Save Property";
    }
  }
}

const savePropertyDetailBtn = document.getElementById("savePropertyDetailBtn");

if (savePropertyDetailBtn) {
  savePropertyDetailBtn.addEventListener("click", () => {
    const property = getPropertyById();
    if (property) toggleSavedProperty(property.id);
  });
}

updateSaveButtons();

/* =========================
   PROPERTY PAGE
========================= */
let activePropertyGallery = [];
let activeGalleryIndex = 0;

function loadPropertyPage() {
  const propertyTitle = document.getElementById("propertyTitle");
  if (!propertyTitle) return;

  const property = getPropertyById();

  if (!property) {
    propertyTitle.textContent = "Property not found";
    return;
  }

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

  if (propertyImage) {
    propertyImage.className = `gallery-main ${property.imageClass}`;
    if (property.mainImage) propertyImage.style.backgroundImage = `url('${property.mainImage}')`;
  }

  if (propertyBadge) {
    propertyBadge.className = `badge ${property.badgeClass} animated-hero-text`;
    propertyBadge.textContent = property.badge;
  }

  if (propertyFeatures) {
    propertyFeatures.innerHTML = property.features.map((f) => `<li>${cleanText(f)}</li>`).join("");
  }

  if (bookingLink) {
    bookingLink.href = `booking-request.html?id=${property.id}`;
  }

  if (whatsappLink) {
    const msg = encodeURIComponent(
      `Hello Afro Student Living,\n\nI'm interested in this property:\n\nProperty: ${property.title}\nLocation: ${property.location}\nPrice: ${property.priceText}\n\nPlease confirm availability.`
    );

    whatsappLink.href = `https://wa.me/${businessWhatsappNumber}?text=${msg}`;
  }

  if (requestViewingBtn && !requestViewingBtn.dataset.boundViewing) {
    requestViewingBtn.dataset.boundViewing = "true";
    requestViewingBtn.addEventListener("click", () => {
      const text = encodeURIComponent(
        `Hello Afro Student Living,\n\nI would like to request a viewing for this property:\n\nProperty: ${property.title}\nLocation: ${property.location}\nPrice: ${property.priceText}\n\nPlease confirm available viewing dates and times.`
      );

      window.open(`https://wa.me/${businessWhatsappNumber}?text=${text}`, "_blank");
    });
  }

  updateSaveButtons();
}

/* =========================
   GALLERY
========================= */
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
  activeGalleryIndex =
    (activeGalleryIndex - 1 + activePropertyGallery.length) % activePropertyGallery.length;

  renderGalleryModal();
}

if (openGalleryBtn) openGalleryBtn.addEventListener("click", () => openGallery(0));
if (closeGalleryBtn) closeGalleryBtn.addEventListener("click", closeGallery);
if (nextGalleryBtn) nextGalleryBtn.addEventListener("click", nextGallery);
if (prevGalleryBtn) prevGalleryBtn.addEventListener("click", prevGallery);

document.querySelectorAll("[data-gallery-index]").forEach((item) => {
  item.addEventListener("click", () => {
    openGallery(Number(item.dataset.galleryIndex || 0));
  });
});

/* =========================
   BOOKING PAGE
========================= */
function loadBookingPage() {
  const bookingPropertyTitle = document.getElementById("bookingPropertyTitle");
  if (!bookingPropertyTitle) return;

  const property = getPropertyById();
  if (!property) return;

  bookingPropertyTitle.textContent = property.title;

  const bookingPropertyImage = document.getElementById("bookingPropertyImage");
  const bookingPropertyLocation = document.getElementById("bookingPropertyLocation");
  const bookingPropertyPrice = document.getElementById("bookingPropertyPrice");
  const bookingMessage = document.getElementById("bookingMessage");

  if (bookingPropertyLocation) bookingPropertyLocation.textContent = property.location;
  if (bookingPropertyPrice) bookingPropertyPrice.textContent = property.priceText;

  if (bookingPropertyImage) {
    bookingPropertyImage.className = `property-img ${property.imageClass} summary-img`;
    if (property.mainImage) bookingPropertyImage.style.backgroundImage = `url('${property.mainImage}')`;
  }

  if (bookingMessage) {
    bookingMessage.value = `Hello, I would like to request booking for ${property.title} in ${property.location}.`;
  }
}

const bookingWhatsappBtn = document.getElementById("bookingWhatsappBtn");

if (bookingWhatsappBtn) {
  bookingWhatsappBtn.addEventListener("click", () => {
    const property = getPropertyById();
    if (!property) return;

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

/* =========================
   IMAGE PREVIEW + UPLOAD
========================= */
const propertyImagesInput = document.getElementById("propertyImages");
const imagePreview = document.getElementById("imagePreview");

if (propertyImagesInput && imagePreview) {
  propertyImagesInput.addEventListener("change", () => {
    imagePreview.innerHTML = "";
    selectedPropertyFiles = Array.from(propertyImagesInput.files || []).slice(0, 8);

    selectedPropertyFiles.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Uploaded property preview";
        imagePreview.appendChild(img);
      };

      reader.readAsDataURL(file);
    });
  });
}

async function uploadPropertyImages(files) {
  const db = getSupabaseClientSafe();
  if (!db || !files || !files.length) return [];

  const uploadedUrls = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;

    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    const filePath = `submissions/${Date.now()}-${Math.random().toString(16).slice(2)}-${safeName}`;

    const { error } = await db.storage
      .from("property-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      console.error("Image upload error:", error);
      continue;
    }

    const { data } = db.storage.from("property-images").getPublicUrl(filePath);
    if (data?.publicUrl) uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}

/* =========================
   AUTO DESCRIPTION
========================= */
const autoDescriptionBtn = document.getElementById("autoDescriptionBtn");

if (autoDescriptionBtn) {
  autoDescriptionBtn.addEventListener("click", () => {
    const title = document.getElementById("propertyName")?.value.trim() || "";
    const state = document.getElementById("propertyState")?.value.trim() || "";
    const type = document.getElementById("propertyType")?.value.trim() || "";
    const priceRaw = document.getElementById("propertyPrice")?.value.trim() || "";
    const city = document.getElementById("propertyArea")?.value.trim() || "";
    const university = document.getElementById("propertyArea")?.value.trim() || "";
    const descriptionInput = document.getElementById("propertyDescriptionInput");

    if (descriptionInput) {
      descriptionInput.value = generatePropertyDescription({ title, state, type, priceRaw, city, university });
    }
  });
}

/* =========================
   SUBMIT PROPERTY → SUPABASE
========================= */
const submitForm = document.getElementById("submitPropertyForm");

if (submitForm) {
  submitForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const db = getSupabaseClientSafe();

    if (!db) {
      alert("Supabase is not connected. Please check supabase.js is loaded before script.js.");
      return;
    }

    const submitButton = submitForm.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    const title = document.getElementById("propertyName")?.value.trim() || "";
    const state = document.getElementById("propertyState")?.value.trim() || "";
    const type = document.getElementById("propertyType")?.value.trim() || "";
    const priceRaw = document.getElementById("propertyPrice")?.value.trim() || "";
    const city = document.getElementById("propertyArea")?.value.trim() || "";
    const university = document.getElementById("propertyArea")?.value.trim() || "";
    let description = document.getElementById("propertyDescriptionInput")?.value.trim() || "";
    const ownerName = document.getElementById("ownerName")?.value.trim() || "";
    const ownerWhatsapp = document.getElementById("ownerWhatsapp")?.value.trim() || "";

    if (!description) {
      description = generatePropertyDescription({ title, state, type, priceRaw, city, university });
    }

    const priceNumber = Number(priceRaw.replace(/[^\d]/g, "")) || 0;
    const imageUrls = await uploadPropertyImages(selectedPropertyFiles);

    const { error } = await db
      .from("property_submissions")
      .insert([
        {
          title,
          state,
          city,
          university,
          price: priceNumber,
          type,
          description,
          owner_name: ownerName,
          owner_whatsapp: ownerWhatsapp,
          image_urls: imageUrls,
          status: "pending"
        }
      ]);

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit for Admin Review";
    }

    if (error) {
      console.error("Supabase submit error:", error);
      alert("Error submitting property. Check the console and your Supabase table columns.");
      return;
    }

    alert("Property submitted successfully. Waiting for admin approval.");
    submitForm.reset();
    selectedPropertyFiles = [];

    if (imagePreview) imagePreview.innerHTML = "";
  });
}

/* =========================
   ADMIN DASHBOARD
========================= */
const adminSubmissionsTable = document.getElementById("adminSubmissionsTable");
const submissionCount = document.getElementById("submissionCount");
const clearSubmissionsBtn = document.getElementById("clearSubmissionsBtn");

async function renderAdminSubmissions() {
  if (!adminSubmissionsTable) return;

  const db = getSupabaseClientSafe();

  if (!db) {
    adminSubmissionsTable.innerHTML = `<tr><td colspan="8">Supabase is not connected.</td></tr>`;
    return;
  }

  const { data, error } = await db
    .from("property_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin submissions error:", error);
    adminSubmissionsTable.innerHTML = `<tr><td colspan="8">Could not load submissions. Check Supabase table name, columns, and admin login.</td></tr>`;
    return;
  }

  const submissions = data || [];

  if (submissionCount) submissionCount.textContent = submissions.length;

  adminSubmissionsTable.innerHTML = submissions.length
    ? submissions
        .map((item) => {
          const images = Array.isArray(item.image_urls) ? item.image_urls : [];
          const firstImage = images[0];

          return `
            <tr>
              <td>
                ${firstImage ? `<img src="${cleanText(firstImage)}" alt="Property" style="width:70px;height:55px;object-fit:cover;border-radius:12px;">` : `<span class="no-image">Pending</span>`}
              </td>
              <td><strong>${cleanText(item.title)}</strong><br><small>${cleanText(item.city)}</small></td>
              <td>${cleanText(item.state)}</td>
              <td>${cleanText(item.type)}</td>
              <td>₦${Number(item.price || 0).toLocaleString()}</td>
              <td>${cleanText(item.owner_name)}</td>
              <td>${cleanText(item.owner_whatsapp)}</td>
              <td>
                <span class="table-badge pending">${cleanText(item.status || "pending")}</span>
                <br><br>
                <button onclick="approveProperty('${item.id}')" class="btn btn-primary">
                  Approve
                </button>
                <br><br>
                <button onclick="deletePropertySubmission('${item.id}')" class="btn btn-accent">
                  Delete
                </button>
              </td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="8">No property submissions yet.</td></tr>`;
}

renderAdminSubmissions();

async function approveProperty(id) {
  const db = getSupabaseClientSafe();

  if (!db) {
    alert("Supabase not connected");
    return;
  }

  const { data, error } = await db
    .from("property_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    alert("Error fetching property");
    return;
  }

  await db.from("properties").delete().eq("submission_id", id);

  const { error: insertError } = await db
    .from("properties")
    .insert([
      {
        title: data.title,
        state: data.state,
        city: data.city,
        university: data.university,
        type: data.type,
        price: data.price,
        description: data.description,
        image_urls: data.image_urls || [],
        submission_id: data.id
      }
    ]);

  if (insertError) {
    console.error(insertError);
    alert("Error publishing property");
    return;
  }

  await db
    .from("property_submissions")
    .update({ status: "approved" })
    .eq("id", id);

  alert("Property approved 🚀");
  renderAdminSubmissions();
}

async function deletePropertySubmission(id) {
  const db = getSupabaseClientSafe();

  if (!db) {
    alert("Supabase not connected");
    return;
  }

  const confirmDelete = confirm(
    "Delete this property from admin and live listings?"
  );

  if (!confirmDelete) return;

  const { data, error: fetchError } = await db
    .from("property_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error(fetchError);
    alert("Error finding property submission");
    return;
  }

  const { error: deletePublishedError } = await db
    .from("properties")
    .delete()
    .eq("submission_id", id);

  if (deletePublishedError) {
    console.warn("Could not delete linked published property:", deletePublishedError);
  }

  // Fallback cleanup for older records created before submission_id existed
  await db
    .from("properties")
    .delete()
    .eq("title", data.title)
    .eq("state", data.state)
    .eq("city", data.city)
    .eq("price", data.price);

  const { error: deleteSubmissionError } = await db
    .from("property_submissions")
    .delete()
    .eq("id", id);

  if (deleteSubmissionError) {
    console.error(deleteSubmissionError);
    alert("Error deleting submission");
    return;
  }

  alert("Property deleted 🗑️");
  renderAdminSubmissions();
}

if (clearSubmissionsBtn) {
  clearSubmissionsBtn.addEventListener("click", () => {
    alert("Submissions are stored in Supabase. Use the Delete button or Supabase Table Editor if needed.");
  });
}

async function logoutAdmin() {
  const db = getSupabaseClientSafe();

  if (!db) return;

  await db.auth.signOut();
  window.location.href = "login.html";
}

/* =========================
   REVEAL ANIMATION
========================= */
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

/* =========================
   SCROLL TO TOP
========================= */
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* =========================
   START APP
========================= */
loadLivePropertiesFromSupabase().then(() => {
  loadPropertyPage();
  loadBookingPage();
});

// AUTO DESCRIPTION GENERATOR
const autoBtn = document.getElementById("autoDescriptionBtn");

if (autoBtn) {
  autoBtn.addEventListener("click", () => {
    const name = document.getElementById("propertyName")?.value || "";
    const state = document.getElementById("propertyState")?.value || "";
    const type = document.getElementById("propertyType")?.value || "";
    const area = document.getElementById("propertyArea")?.value || "";

    if (!name || !state || !type || !area) {
      alert("Please fill property name, state, type, and area first.");
      return;
    }

    const description = `${name} is a well-located ${type.toLowerCase()} situated in ${area}, ${state}. 

This property is ideal for students looking for safe and comfortable accommodation close to their university.

Key features include:
• Good access to transport
• Secure environment
• Suitable for student living

This property offers convenience, comfort, and a student-friendly environment.`;

    document.getElementById("propertyDescriptionInput").value = description;
  });
}
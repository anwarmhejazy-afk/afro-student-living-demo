const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* =========================
   PROPERTY DATA
========================= */

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
    description:
      "A clean and modern shared apartment in Yaba, suitable for students who want easy access to UNILAG and nearby study areas. The apartment is designed for comfort, security, and convenient student living.",
    features: [
      "✔ WiFi available",
      "✔ 24/7 security access",
      "✔ Furnished shared living space",
      "✔ Close to UNILAG",
      "✔ Kitchen access",
      "✔ Water and electricity access"
    ]
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
    description:
      "A private student studio in Abuja with a quiet environment, secure access, and essential amenities. Suitable for students who want privacy, comfort, and a peaceful study-friendly space.",
    features: [
      "✔ Private room",
      "✔ Bills included",
      "✔ Secure building",
      "✔ Near University of Abuja",
      "✔ Clean bathroom access",
      "✔ Suitable for focused study"
    ]
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
    description:
      "An affordable student hostel near UNEC with simple facilities, secure access, and student-friendly pricing. A good choice for students looking for practical accommodation on a budget.",
    features: [
      "✔ Affordable yearly rent",
      "✔ Secure hostel access",
      "✔ Student-friendly environment",
      "✔ Close to UNEC",
      "✔ Water access",
      "✔ Shared facilities"
    ]
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
    description:
      "A modern campus room in Port Harcourt with access to water, power, and a student-friendly environment. Suitable for students who want affordable accommodation close to university areas.",
    features: [
      "✔ Shared room option",
      "✔ Water access",
      "✔ Power access",
      "✔ Close to university",
      "✔ Student environment",
      "✔ Affordable rent"
    ]
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
    description:
      "A clean shared student flat in Kano with a calm surrounding and secure gate access. Suitable for students looking for simple, safe, and affordable shared accommodation.",
    features: [
      "✔ Shared flat",
      "✔ Kitchen access",
      "✔ Secure gate",
      "✔ Quiet environment",
      "✔ Student-friendly space",
      "✔ Affordable yearly rent"
    ]
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
    description:
      "A furnished student apartment in a premium Lagos location with strong security, comfortable interiors, and access to key facilities. Suitable for students who want a higher-standard accommodation option.",
    features: [
      "✔ Fully furnished apartment",
      "✔ Air conditioning",
      "✔ 24/7 security",
      "✔ Premium Lagos location",
      "✔ Kitchen access",
      "✔ Comfortable study space"
    ]
  }
];

function getPropertyById() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "1";
  return properties.find((property) => property.id === id) || properties[0];
}

function formatWhatsappMessage(property) {
  return encodeURIComponent(
    `Hello, I'm interested in this property on Afro Student Living.\n\n` +
    `Property: ${property.title}\n` +
    `Location: ${property.location}\n` +
    `Price: ${property.priceText}\n\n` +
    `Please confirm availability.`
  );
}

/* =========================
   LISTINGS FILTER SYSTEM
========================= */

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

    card.style.display = isVisible ? "" : "none";

    if (isVisible) visibleCount += 1;
  });

  if (propertyCount) {
    propertyCount.textContent = visibleCount;
  }

  if (resultsText) {
    if (visibleCount === propertyCards.length) {
      resultsText.textContent = "Showing verified student housing options across Nigeria.";
    } else if (visibleCount === 1) {
      resultsText.textContent = "Showing 1 matching accommodation option.";
    } else {
      resultsText.textContent = `Showing ${visibleCount} matching accommodation options.`;
    }
  }

  if (noResults) {
    if (visibleCount === 0) {
      noResults.style.display = "block";

      if (selectedState) {
        const displayState = selectedState === "FCT Abuja" ? "Abuja" : selectedState;

        noResults.innerHTML = `
          <h3>No properties available in ${displayState} yet</h3>
          <p>We are expanding quickly. Try one of these popular locations:</p>
          <p><strong>Lagos • Abuja • Enugu • Rivers • Kano</strong></p>
          <button class="btn btn-accent" onclick="resetListingFilters()">Reset Filters</button>
        `;
      } else {
        noResults.innerHTML = `
          <h3>No properties found</h3>
          <p>Try another state, property type, or budget range.</p>
          <button class="btn btn-accent" onclick="resetListingFilters()">Reset Filters</button>
        `;
      }
    } else {
      noResults.style.display = "none";
    }
  }
}

function resetListingFilters() {
  if (searchInput) searchInput.value = "";
  if (stateFilter) stateFilter.value = "";
  if (typeFilter) typeFilter.value = "";
  if (budgetFilter) budgetFilter.value = "";

  filterListings();
}

if (searchInput) searchInput.addEventListener("input", filterListings);
if (stateFilter) stateFilter.addEventListener("change", filterListings);
if (typeFilter) typeFilter.addEventListener("change", filterListings);
if (budgetFilter) budgetFilter.addEventListener("change", filterListings);
if (resetFilters) resetFilters.addEventListener("click", resetListingFilters);

filterListings();

/* =========================
   DYNAMIC PROPERTY PAGE
========================= */

function loadPropertyPage() {
  const propertyTitle = document.getElementById("propertyTitle");
  if (!propertyTitle) return;

  const property = getPropertyById();

  const propertyImage = document.getElementById("propertyImage");
  const propertyBadge = document.getElementById("propertyBadge");
  const propertyLocation = document.getElementById("propertyLocation");
  const propertyPrice = document.getElementById("propertyPrice");
  const sidePrice = document.getElementById("sidePrice");
  const propertyDescription = document.getElementById("propertyDescription");
  const propertyFeatures = document.getElementById("propertyFeatures");
  const propertyTypeText = document.getElementById("propertyTypeText");
  const bookingLink = document.getElementById("bookingLink");
  const whatsappLink = document.getElementById("whatsappLink");

  document.title = `${property.title} | Afro Student Living`;

  propertyTitle.textContent = property.title;
  propertyLocation.textContent = property.location;
  propertyPrice.textContent = property.priceText;

  if (sidePrice) sidePrice.textContent = property.priceText;
  if (propertyDescription) propertyDescription.textContent = property.description;
  if (propertyTypeText) propertyTypeText.textContent = property.type;

  if (propertyImage) {
    propertyImage.className = `gallery-main ${property.imageClass}`;
  }

  if (propertyBadge) {
    propertyBadge.className = `badge ${property.badgeClass}`;
    propertyBadge.textContent = property.badge;
  }

  if (propertyFeatures) {
    propertyFeatures.innerHTML = property.features
      .map((feature) => `<li>${feature}</li>`)
      .join("");
  }

  if (bookingLink) bookingLink.href = `booking-request.html?id=${property.id}`;
  if (whatsappLink) whatsappLink.href = `https://wa.me/2340000000000?text=${formatWhatsappMessage(property)}`;
}

loadPropertyPage();

/* =========================
   DYNAMIC BOOKING PAGE
========================= */

function loadBookingPage() {
  const bookingPropertyTitle = document.getElementById("bookingPropertyTitle");
  if (!bookingPropertyTitle) return;

  const property = getPropertyById();

  const bookingPropertyImage = document.getElementById("bookingPropertyImage");
  const bookingPropertyLocation = document.getElementById("bookingPropertyLocation");
  const bookingPropertyPrice = document.getElementById("bookingPropertyPrice");
  const bookingMessage = document.getElementById("bookingMessage");

  document.title = `Request Booking - ${property.title} | Afro Student Living`;

  bookingPropertyTitle.textContent = property.title;
  bookingPropertyLocation.textContent = property.location;
  bookingPropertyPrice.textContent = property.priceText;

  if (bookingPropertyImage) {
    bookingPropertyImage.className = `property-img ${property.imageClass} summary-img`;
  }

  if (bookingMessage) {
    bookingMessage.value =
      `Hello, I would like to request booking for ${property.title} in ${property.location}.`;
  }
}

loadBookingPage();

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < triggerBottom) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* SCROLL TO TOP BUTTON */

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (!scrollBtn) return;

  if (window.scrollY > 400) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* Listings Filter System */

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

  if (budget === 150000) {
    return price < 150000;
  }

  if (budget === 400000) {
    return price >= 150000 && price <= 400000;
  }

  if (budget === 800000) {
    return price > 400000 && price <= 800000;
  }

  if (budget === 800001) {
    return price > 800000;
  }

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
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }
}

function resetListingFilters() {
  if (searchInput) searchInput.value = "";
  if (stateFilter) stateFilter.value = "";
  if (typeFilter) typeFilter.value = "";
  if (budgetFilter) budgetFilter.value = "";

  filterListings();
}

if (searchInput) {
  searchInput.addEventListener("input", filterListings);
}

if (stateFilter) {
  stateFilter.addEventListener("change", filterListings);
}

if (typeFilter) {
  typeFilter.addEventListener("change", filterListings);
}

if (budgetFilter) {
  budgetFilter.addEventListener("change", filterListings);
}

if (resetFilters) {
  resetFilters.addEventListener("click", resetListingFilters);
}

filterListings();
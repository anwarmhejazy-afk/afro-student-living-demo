// ======================
// GLOBAL
// ======================
const supabase = supabaseClient;
const ADMIN_PHONE = "447709721192";

// ======================
// LOAD PROPERTIES (LISTINGS)
// ======================
async function loadProperties() {
  const container = document.getElementById("propertiesContainer");
  if (!container) return;

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  container.innerHTML = "";

  if (!data.length) {
    container.innerHTML = "<p>No properties found</p>";
    return;
  }

  data.forEach((p) => {
    container.innerHTML += `
      <div class="property-card">
        <img src="${p.image_url}" />
        <h3>${p.title}</h3>
        <p>${p.city} • ${p.state}</p>
        <p>₦${p.price} / year</p>
        <a href="property.html?id=${p.id}">View</a>
      </div>
    `;
  });
}

// ======================
// LOAD SINGLE PROPERTY
// ======================
async function loadPropertyDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  document.getElementById("propertyTitle").innerText = data.title;
  document.getElementById("propertyPrice").innerText =
    "₦" + data.price + " / year";
  document.getElementById("propertyLocation").innerText =
    data.city + " • " + data.state;

  document.getElementById("mainImage").src = data.image_url;

  window.currentProperty = data;
}

// ======================
// SUBMIT PROPERTY
// ======================
async function submitProperty(e) {
  e.preventDefault();

  const file = document.getElementById("image").files[0];
  const fileName = Date.now() + "-" + file.name;

  // upload
  const { error: uploadError } = await supabase.storage
    .from("properties")
    .upload(fileName, file);

  if (uploadError) {
    alert("Upload failed");
    return;
  }

  const imageUrl =
    "https://mgtzyzltfddumfquujmh.supabase.co/storage/v1/object/public/properties/" +
    fileName;

  const { error } = await supabase.from("property_submissions").insert([
    {
      title: document.getElementById("title").value,
      state: document.getElementById("state").value,
      city: document.getElementById("city").value,
      university: document.getElementById("university").value,
      price: document.getElementById("price").value,
      type: document.getElementById("type").value,
      description: document.getElementById("description").value,
      image_url: imageUrl,
      owner_name: document.getElementById("ownerName").value,
      owner_whatsapp: document.getElementById("ownerPhone").value,
    },
  ]);

  if (!error) {
    alert("Submitted for admin review");
  }
}

// ======================
// ADMIN LOAD
// ======================
async function loadSubmissions() {
  const container = document.getElementById("adminContainer");
  if (!container) return;

  const { data } = await supabase
    .from("property_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  container.innerHTML = "";

  data.forEach((p) => {
    container.innerHTML += `
      <div class="admin-card">
        <img src="${p.image_url}" />
        <h3>${p.title}</h3>
        <p>${p.city} • ${p.state}</p>
        <button onclick="approve('${p.id}')">Approve</button>
      </div>
    `;
  });
}

// ======================
// APPROVE PROPERTY
// ======================
async function approve(id) {
  const { data } = await supabase
    .from("property_submissions")
    .select("*")
    .eq("id", id)
    .single();

  await supabase.from("properties").insert([
    {
      title: data.title,
      state: data.state,
      city: data.city,
      university: data.university,
      price: data.price,
      type: data.type,
      image_url: data.image_url,
    },
  ]);

  await supabase.from("property_submissions").delete().eq("id", id);

  alert("Approved!");
  loadSubmissions();
}

// ======================
// BOOKING (WHATSAPP + DB)
// ======================
async function sendBooking() {
  const p = window.currentProperty;

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  await supabase.from("booking_requests").insert([
    {
      property_id: p.id,
      name,
      phone,
      property_title: p.title,
      property_price: p.price,
      property_location: p.city + " " + p.state,
    },
  ]);

  const msg = encodeURIComponent(
    `Hello Afro Student Living,%0A%0A` +
      `Booking Request:%0A` +
      `Property: ${p.title}%0A` +
      `Location: ${p.city}%0A` +
      `Price: ₦${p.price}%0A%0A` +
      `Name: ${name}%0APhone: ${phone}`
  );

  window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`, "_blank");
}

// ======================
// VIEWING REQUEST
// ======================
async function requestViewing() {
  const p = window.currentProperty;

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  await supabase.from("viewing_requests").insert([
    {
      property_id: p.id,
      name,
      phone,
      property_title: p.title,
      property_location: p.city,
    },
  ]);

  const msg = encodeURIComponent(
    `Viewing Request:%0A${p.title}%0A${p.city}%0A%0A${name}%0A${phone}`
  );

  window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`, "_blank");
}

// ======================
// INIT
// ======================
loadProperties();
loadSubmissions();
loadPropertyDetails();
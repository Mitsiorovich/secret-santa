/* ---------- STATE ---------- */

const cards = {
  me: null,
  target: null
};

/* =========================================================
   CARD DETAILS MODAL (BIG CARD VIEW)
   ========================================================= */

const cardModal = document.getElementById("card-modal");
const cardModalBody = cardModal.querySelector(".modal-body");
const cardModalClose = cardModal.querySelector(".close-modal");

cardModalClose.onclick = closeCardModal;
cardModal.onclick = e => {
  if (e.target === cardModal) closeCardModal();
};

function openCardModal(char) {
  cardModalBody.innerHTML = `
    <img src="${char.image}">
    <h3>${char.name}</h3>
    <div class="location">📍 ${char.location}</div>
    <p>${char.description}</p>
  `;
  cardModal.classList.remove("hidden");
}

function closeCardModal() {
  cardModal.classList.add("hidden");
}

/* =========================================================
   MESSAGE MODAL (ERRORS / INFO)
   ========================================================= */

const messageModal = document.getElementById("message-modal");
const messageTitle = document.getElementById("message-title");
const messageText = document.getElementById("message-text");
const messageOk = document.getElementById("message-ok");
const messageClose = messageModal.querySelector(".close-modal");

messageOk.onclick = closeMessage;
messageClose.onclick = closeMessage;

function showMessage(title, text) {
  messageTitle.textContent = title;
  messageText.textContent = text;
  messageModal.classList.remove("hidden");
}

function closeMessage() {
  messageModal.classList.add("hidden");
}

/* =========================================================
   SUCCESS MODAL
   ========================================================= */

const successModal = document.getElementById("success-modal");
const successBtn = document.getElementById("success-continue");
let successRedirectUrl = null;

successBtn.onclick = () => {
  successModal.classList.add("hidden");
  window.location.href = successRedirectUrl;
};

/* =========================================================
   CARD LOGIC WITH IMAGE PRELOADING
   ========================================================= */

async function reveal(type) {
  if (cards[type]) return;

  const res = await fetch(`/draw?type=${type}`);

  if (!res.ok) {
    showMessage(
      "Δεν υπάρχουν κάρτες",
      "Όλες οι διαθέσιμες κάρτες για αυτή την επιλογή έχουν ήδη δοθεί."
    );
    return;
  }

  const char = await res.json();
  cards[type] = char;

  // Preload the image before flipping
  const img = new Image();
  img.src = char.image;
  
  // Wait for image to load (or fail)
  await new Promise((resolve) => {
    img.onload = resolve;
    img.onerror = resolve;
    setTimeout(resolve, 30000);
  });

  const card = document.getElementById(type);
  const back = card.querySelector(".card-back");

  // Set the HTML content
  back.innerHTML = `
    <img src="${char.image}">
    <h3>${char.name}</h3>
    <div class="location">📍 ${char.location}</div>
    <p>${char.description}</p>
  `;

  // THEN flip the card
  card.classList.add("revealed");

  if (cards.me && cards.target) {
    document.getElementById("finish").disabled = false;
  }
}

/* CLICK BEHAVIOR:
   - first click → reveal
   - second click → open modal
*/
function handleCardClick(type) {
  if (!cards[type]) {
    reveal(type);
  } else {
    openCardModal(cards[type]);
  }
}

document.getElementById("me").onclick = () => handleCardClick("me");
document.getElementById("target").onclick = () => handleCardClick("target");

/* =========================================================
   RESET STATE (ALLOW REDRAW)
   ========================================================= */

function resetCards() {
  ["me", "target"].forEach(type => {
    const card = document.getElementById(type);
    card.classList.remove("revealed");
    card.querySelector(".card-back").innerHTML = "";
    cards[type] = null;
  });

  document.getElementById("finish").disabled = true;
}

/* =========================================================
   FINISH
   ========================================================= */

document.getElementById("finish").onclick = async () => {
  const res = await fetch("/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      me: cards.me,
      target: cards.target
    })
  });

  if (!res.ok) {
    const errorText = await res.text();

    showMessage(
      "Κάτι πήγε στραβά",
      `${errorText} Δοκίμασε ξανά.`
    );

    // 🔁 allow redraw
    resetCards();
    return;
  }

  // 🎉 success
  successRedirectUrl = res.url;
  successModal.classList.remove("hidden");
};
route("/gallery", "gallery", async ({ characters }) => {
  // If characters already exist, do NOTHING
  if (characters && characters.length) {
    attachGalleryPreview(characters);
    return;
  }

  let data = [];

  try {
    data = await api.get("/api/characters");
  } catch {
    data = [];
  }

  // Navigate ONCE with data (router will render correctly)
  navigate("/gallery", { characters: data });
});

/* =========================
   PREVIEW MODAL LOGIC
   ========================= */

function attachGalleryPreview(characters) {
  const modal = document.getElementById("card-preview-modal");
  if (!modal) return;

  const img = document.getElementById("preview-img");
  const nameEl = document.getElementById("preview-name");
  const locEl = document.getElementById("preview-location");
  const descEl = document.getElementById("preview-description");

  const closeBtn = document.getElementById("preview-close");
  const closeBtn2 = document.getElementById("preview-close-secondary");

  const close = () => modal.classList.add("hidden");

  if (closeBtn) closeBtn.onclick = close;
  if (closeBtn2) closeBtn2.onclick = close;

  document.querySelectorAll(".gallery-card").forEach(cardEl => {
    cardEl.onclick = () => {
      const id = Number(cardEl.dataset.id);
      const card = characters.find(c => c.id === id);
      if (!card) return;

      if (img) img.src = card.image;
      if (nameEl) nameEl.textContent = card.name;
      if (locEl) locEl.textContent = card.location;
      if (descEl) descEl.textContent = card.description;

      modal.classList.remove("hidden");
    };
  });
}

route("/pick", "pick", async ({ name }) => {
  if (!name) return navigate("/"); // refresh safety

  let me = null;
  let target = null;

  const meCard = document.getElementById("me");
  const targetCard = document.getElementById("target");
  const finishBtn = document.getElementById("finish");

async function draw(type, cardEl) {
  let card;

  try {
    card = await api.get(`/api/draw?type=${type}`);
  } catch (e) {
    const modal = document.getElementById("no-cards-modal");
    modal.classList.remove("hidden");

    document.getElementById("no-cards-ok").onclick = () => {
      modal.classList.add("hidden");
    };

    return null;
  }

  cardEl.classList.add("revealed");
  const back = cardEl.querySelector(".card-back");
  back.innerHTML = `
    <img src="${card.image}" alt="${card.name}">
    <h3>${card.name}</h3>
    <div class="location">${card.location}</div>
    <p>${card.description}</p>
  `;

  return card;
}


  meCard.onclick = async () => {
    if (me) return;
    try { me = await draw("me", meCard); } catch (e) { alert(e.message); }
    if (me && target) finishBtn.disabled = false;
  };

targetCard.onclick = async () => {
  if (target) return;

  const drawn = await draw("target", targetCard);
  if (!drawn) return; // covers no-cards modal case

  // 🚫 SELF-GIFT CHECK
  if (me && drawn.id === me.id) {
    // reset target card UI
    targetCard.classList.remove("revealed");
    targetCard.querySelector(".card-back").innerHTML = "";
    target = null;

    // show modal
    const modal = document.getElementById("same-person-modal");
    modal.classList.remove("hidden");

    document.getElementById("same-person-ok").onclick = () => {
      modal.classList.add("hidden");
    };

    return;
  }

  target = drawn;
  if (me && target) finishBtn.disabled = false;
};


finishBtn.onclick = async () => {
  let result;

  try {
    result = await api.post("/api/save", { name, me, target });
  } catch (err) {
    if (err.message.includes("όνομα")) {
      const modal = document.getElementById("duplicate-name-modal");
      modal.classList.remove("hidden");

      document.getElementById("duplicate-name-ok").onclick = () => {
        modal.classList.add("hidden");
      };
      return;
    }

    alert(err.message); // fallback for unexpected errors
    return;
  }

  const modal = document.getElementById("success-modal");
  modal.classList.remove("hidden");

  document.getElementById("success-continue").onclick = () => {
    modal.classList.add("hidden");
    navigate(`/result/${result.code}`, result);
  };
};

function attachPreview(cardEl, getter) {
  cardEl.addEventListener("click", () => {
    const card = getter();
    if (!card) return;
    if (!cardEl.classList.contains("revealed")) return;

    const modal = document.getElementById("card-preview-modal");

    document.getElementById("preview-img").src = card.image;
    document.getElementById("preview-img").alt = card.name;
    document.getElementById("preview-name").textContent = card.name;
    document.getElementById("preview-location").textContent = card.location;
    document.getElementById("preview-description").textContent = card.description;

    modal.classList.remove("hidden");

   document.getElementById("preview-close").onclick = () => {
  modal.classList.add("hidden");
};
document.getElementById("preview-close-btn").onclick = () => {
  modal.classList.add("hidden");
};
  });
}
attachPreview(meCard, () => me);
attachPreview(targetCard, () => target);

});

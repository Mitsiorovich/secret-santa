(function initGlobalEffects() {
  initSnow();
  initMusic();
})();

/* ❄ SNOW */

function initSnow() {
  if (document.querySelector(".snowflakes")) return;

  const snow = document.createElement("div");
  snow.className = "snowflakes";
  snow.setAttribute("aria-hidden", "true");

  snow.innerHTML = Array.from({ length: 12 })
    .map(() => `
      <div class="snowflake">
        <div class="inner">❅</div>
      </div>
    `)
    .join("");

  document.body.appendChild(snow);
}

/* 🎵 MUSIC */

function initMusic() {
  if (document.getElementById("bg-music")) return;

  const audio = document.createElement("audio");
  audio.id = "bg-music";
  audio.loop = true;
  audio.volume = 0.25;

  audio.innerHTML = `
    <source src="/audio/christmas.mp3" type="audio/mpeg">
  `;

  document.body.appendChild(audio);

  const player = document.createElement("div");
  player.id = "music-player";
  player.className = "music-player hidden";
  player.innerHTML = `<button id="music-toggle">🎵</button>`;

  document.body.appendChild(player);

  let started = false;

  document.addEventListener("click", function startOnce() {
    if (started) return;

    audio.play().then(() => {
      started = true;
      player.classList.remove("hidden");
      player.classList.add("playing");
    }).catch(() => {});

    document.removeEventListener("click", startOnce);
  });

  document.getElementById("music-toggle").onclick = e => {
    e.stopPropagation();

    if (audio.paused) {
      audio.play();
      player.classList.add("playing");
      e.target.textContent = "🎵";
    } else {
      audio.pause();
      player.classList.remove("playing");
      e.target.textContent = "🔇";
    }
  };
}

route("/mission", "mission", () => {
  const form = document.getElementById("mission-form");

  form.onsubmit = async e => {
    e.preventDefault();

    const code = form.code.value.trim();
    if (!code) return;

    try {
      const data = await api.post("/api/mission", { code });
      navigate(`/result/${code}`, { data, code });
    } catch {
      const modal = document.getElementById("invalid-code-modal");
      modal.classList.remove("hidden");

      document.getElementById("invalid-code-ok").onclick = () => {
        modal.classList.add("hidden");
      };
    }
  };
});

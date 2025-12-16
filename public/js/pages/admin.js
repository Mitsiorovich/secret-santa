route("/admin", "admin", async () => {
  let data;

  try {
    data = await api.get(`/api/admin?token=${localStorage.token}`);
  } catch (err) {
    alert(err.message);
    return navigate("/admin-login");
  }

  // render ONCE with real data
  const res = await fetch("/templates/pages/admin.hbs");
  const source = await res.text();
  const tpl = Handlebars.compile(source);
  document.getElementById("app").innerHTML = tpl(data);

  // DELETE HANDLERS
  document.querySelectorAll("[data-code]").forEach(btn => {
    btn.onclick = async () => {
      const code = btn.dataset.code;
      if (!confirm("Σίγουρα θέλεις να διαγράψεις αυτή τη συμμετοχή;")) return;

      await api.del(`/api/admin/${code}?token=${localStorage.token}`);
      navigate("/admin");
    };
  });

  // EXPORT PDF
// EXPORT PDF
const exportBtn = document.getElementById("export-pdf");
if (exportBtn) {
  exportBtn.onclick = () => {
    const el = document.getElementById("admin-export");
    
    // Add class to hide buttons
    el.classList.add("pdf-export");
    
    html2pdf()
      .set({
        margin: 10,
        filename: "secret-santa-assignments.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .from(el)
      .save()
      .then(() => {
        // Remove class after export
        el.classList.remove("pdf-export");
      });
  };
}
});

route("/admin-login", "admin-login", () => {
  document.getElementById("admin-login").onsubmit = async e => {
    e.preventDefault();
    const token = (await api.post("/api/admin/login", {
      password: e.target.password.value
    })).token;

    localStorage.token = token;
    navigate("/admin");
  };
});

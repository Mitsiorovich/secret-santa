route("/", "home", () => {
  document.getElementById("start-form").onsubmit = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    navigate("/pick", { name });
  };
});

route("/result/:code", "result", async ({ code, data, params }) => {
  const finalCode = code || params?.code;

  // If we arrived without data (refresh), fetch it:
  if (!data && finalCode) {
    try {
      const res = await api.get(`/api/result/${finalCode}`);
      navigate(`/result/${finalCode}`, res); // re-render with data
    } catch (e) {
      alert(e.message);
      navigate("/");
    }
  }
});

// assets/greeting.js
(function () {
  const h = new Date().getHours();
  let g = "Hello";

  if (h < 12) g = "Good morning";
  else if (h < 18) g = "Good afternoon";
  else g = "Good evening";

  const el = document.getElementById("greeting");
  if (el) el.textContent = `${g} — I’m Yash.`;
})();

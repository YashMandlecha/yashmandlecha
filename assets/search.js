// assets/search.js
document.getElementById("site-search")?.addEventListener("input", function () {
  const q = this.value.toLowerCase();
  document.querySelectorAll("main *").forEach(el => {
    if (!el.textContent) return;
    el.style.display =
      el.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});

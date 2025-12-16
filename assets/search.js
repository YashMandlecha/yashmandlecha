// assets/search.js

const toggle = document.getElementById("search-toggle");
const input = document.getElementById("site-search");

if (toggle && input) {
  toggle.addEventListener("click", () => {
    input.classList.toggle("active");
    if (input.classList.contains("active")) {
      input.focus();
    } else {
      input.value = "";
    }
  });

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll("main *").forEach(el => {
      if (!el.textContent) return;
      el.style.display =
        el.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      input.classList.remove("active");
      input.value = "";
    }
  });
}

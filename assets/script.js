// assets/script.js
(function(){
  // mark active nav link based on current file
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  // smooth scroll for #hash links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:"smooth", block:"start"});
      history.replaceState(null, "", `#${id}`);
    });
  });

  // set footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

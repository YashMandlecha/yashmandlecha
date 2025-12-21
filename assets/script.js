// assets/script.js
(function () {
  /* ===============================
     ACTIVE NAV LINK
  =============================== */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.getAttribute("href") === path) {
      a.classList.add("active");
    }
  });

  /* ===============================
     SMOOTH SCROLL FOR HASH LINKS
  =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  });

  /* ===============================
     FOOTER YEAR
  =============================== */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ===============================
     SAFE GOOGLE ANALYTICS HELPER
  =============================== */
  function safeGtag(eventName, params = {}) {
    if (typeof window.gtag === "function") {
      gtag("event", eventName, params);
    }
  }

  /* ===============================
     ARTWORK CLICK TRACKING
  =============================== */
  document.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;

    safeGtag("artwork_click", {
      event_category: "Art",
      event_label: img.getAttribute("src") || "unknown"
    });
  });

  /* ===============================
     SCROLL DEPTH TRACKING (50%)
  =============================== */
  let scrollFired = false;

  window.addEventListener("scroll", () => {
    if (scrollFired) return;

    const scrollTop = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollTop >= pageHeight * 0.5) {
      scrollFired = true;
      safeGtag("scroll_50_percent", {
        event_category: "Engagement",
        event_label: path
      });
    }
  });
})();

  /* ===============================
     OUTBOUND LINK TRACKING
  =============================== */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || !a.href) return;

    // Ignore same-page anchors and internal links
    if (a.hostname === location.hostname) return;

    // Safe GA call
    if (typeof window.gtag === "function") {
      gtag("event", "outbound_click", {
        event_category: "Engagement",
        event_label: a.href,
        transport_type: "beacon"
      });
    }
  });

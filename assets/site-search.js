(() => {
  const toggle = document.getElementById("search-toggle");
  const input = document.getElementById("site-search");
  const resultsBox = document.getElementById("search-results");

  if (!toggle || !input || !resultsBox) return;

  let index = [];

  async function loadIndex() {
    try {
      const res = await fetch("assets/search-index.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      index = await res.json();
    } catch (err) {
      console.error("Search index failed to load:", err);
      resultsBox.style.display = "block";
      resultsBox.innerHTML =
        `<div class="search-item"><strong>Search unavailable</strong><br><span>Run the site via http:// (not file://)</span></div>`;
    }
  }

  loadIndex();

  function openSearch() {
    input.style.display = "inline-block";
    input.focus();
  }

  function closeSearch() {
    input.value = "";
    input.style.display = "none";
    resultsBox.style.display = "none";
    resultsBox.innerHTML = "";
  }

  toggle.addEventListener("click", () => {
    const isHidden = getComputedStyle(input).display === "none";
    if (isHidden) openSearch();
    else closeSearch();
  });

  // close on Escape
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
  });

  // close when clicking outside results/search
  document.addEventListener("click", (e) => {
    if (!resultsBox.contains(e.target) && e.target !== input && e.target !== toggle) {
      resultsBox.style.display = "none";
    }
  });

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    resultsBox.innerHTML = "";

    if (!q) {
      resultsBox.style.display = "none";
      return;
    }

    const matches = index
      .map((item) => {
        const text = (item.content || "").toLowerCase();
        const pos = text.indexOf(q);
        return pos === -1 ? null : { ...item, pos, text };
      })
      .filter(Boolean)
      .slice(0, 12);

    if (!matches.length) {
      resultsBox.innerHTML =
        `<div class="search-item"><strong>No results</strong><br><span>Try a different keyword.</span></div>`;
      resultsBox.style.display = "block";
      return;
    }

    matches.forEach((item) => {
      const snippetStart = Math.max(0, item.pos - 35);
      const snippet = item.text.substring(snippetStart, snippetStart + 90).replace(/\s+/g, " ");

      const div = document.createElement("div");
      div.className = "search-item";
      div.innerHTML = `
        <strong>${item.title}</strong>
        <span>Found in ${item.url.replace(".html","")}</span>

        <span>${snippet}…</span>
      `;

      div.addEventListener("click", () => {
        // pass query via ?q= so the destination page can highlight it
        window.location.href = `${item.url}?q=${encodeURIComponent(q)}`;
      });

      resultsBox.appendChild(div);
    });

    resultsBox.style.display = "block";
  });
})();

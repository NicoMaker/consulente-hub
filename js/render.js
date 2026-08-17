/* ==========================================================================
   RENDER — costruisce l'HTML di home e dettaglio a partire da data.js
   ========================================================================== */

function renderIdentity() {
  document.querySelectorAll("[data-monogram]").forEach(el => el.textContent = SITE_CONFIG.monogram);
  document.querySelectorAll("[data-name]").forEach(el => el.textContent = SITE_CONFIG.name);
  document.querySelectorAll("[data-role]").forEach(el => el.textContent = SITE_CONFIG.role);
}

function renderHome() {
  const hero = document.getElementById("hero");
  hero.querySelector(".hero-eyebrow-text").textContent = SITE_CONFIG.heroEyebrow;
  hero.querySelector(".hero-title").innerHTML =
    escapeHtml(SITE_CONFIG.heroTitleBefore) +
    "<em>" + escapeHtml(SITE_CONFIG.heroTitleEmphasis) + "</em>" +
    escapeHtml(SITE_CONFIG.heroTitleAfter);
  hero.querySelector(".hero-sub").textContent = SITE_CONFIG.heroSub;
  document.getElementById("sectionLabelText").textContent = SITE_CONFIG.sectionLabel;

  const grid = document.getElementById("areaGrid");
  grid.innerHTML = AREAS.map((area, i) => `
    <button class="area-card accent-${area.accent}" data-area="${area.id}" style="animation-delay:${i * 70}ms">
      <div class="area-icon">${icon(area.icon)}</div>
      <div>
        <div class="area-card-label">${escapeHtml(area.label)}</div>
        <div class="area-card-desc">${escapeHtml(area.description)}</div>
      </div>
      <div class="area-card-count">
        <span>${area.links.length} link</span>
        ${icon("arrowRight")}
      </div>
    </button>
  `).join("");

  grid.querySelectorAll(".area-card").forEach(card => {
    card.addEventListener("click", () => goToArea(card.dataset.area));
  });

  // Ripristina vista home salvata
  const savedView = localStorage.getItem("consulente-hub-home-view") || "grid";
  if (savedView === "list") {
    grid.classList.add("list-view");
    document.getElementById("homeViewListBtn")?.setAttribute("aria-pressed", "true");
    document.getElementById("homeViewGridBtn")?.setAttribute("aria-pressed", "false");
  } else {
    grid.classList.remove("list-view");
    document.getElementById("homeViewGridBtn")?.setAttribute("aria-pressed", "true");
    document.getElementById("homeViewListBtn")?.setAttribute("aria-pressed", "false");
  }
}

function renderDetail(areaId) {
  const area = AREAS.find(a => a.id === areaId);
  if (!area) return goHome();
  document.getElementById("detailTitle").textContent = area.label;
  document.getElementById("detailDesc").textContent = area.description;
  const areaTagName = document.getElementById("areaTagName");
  if (areaTagName) areaTagName.textContent = area.label;

  const list = document.getElementById("linkList");
  list.innerHTML = area.links.map((link, i) => {
    const external = /^https?:\/\//.test(link.url);
    return `
      <a class="link-card" href="${escapeAttr(link.url)}" style="animation-delay:${i * 55}ms"
         ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
        <div class="link-icon">${icon(link.icon)}</div>
        <div class="link-body">
          <div class="link-title">${escapeHtml(link.label)}</div>
          <div class="link-desc">${escapeHtml(link.desc)}</div>
        </div>
        <div class="link-go">${icon("externalLink")}</div>
      </a>
    `;
  }).join("");

  // Ripristina vista dettaglio salvata
  const savedView = localStorage.getItem("consulente-hub-detail-view") || "list";
  if (savedView === "grid") {
    list.classList.add("grid-view");
    document.getElementById("detailViewGridBtn")?.setAttribute("aria-pressed", "true");
    document.getElementById("detailViewListBtn")?.setAttribute("aria-pressed", "false");
  } else {
    list.classList.remove("grid-view");
    document.getElementById("detailViewListBtn")?.setAttribute("aria-pressed", "true");
    document.getElementById("detailViewGridBtn")?.setAttribute("aria-pressed", "false");
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}
function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}
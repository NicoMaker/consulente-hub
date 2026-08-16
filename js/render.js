/* ==========================================================================
   RENDER — costruisce l'HTML di home e dettaglio a partire da data.js
   ========================================================================== */

function renderIdentity() {
  document.querySelectorAll("[data-monogram]").forEach((el) => {
    el.textContent = SITE_CONFIG.monogram;
  });
  document.querySelectorAll("[data-name]").forEach((el) => {
    el.textContent = SITE_CONFIG.name;
  });
  document.querySelectorAll("[data-role]").forEach((el) => {
    el.textContent = SITE_CONFIG.role;
  });
}

function renderHome() {
  const hero = document.getElementById("hero");
  hero.querySelector(".hero-eyebrow-text").textContent = SITE_CONFIG.heroEyebrow;
  hero.querySelector(".hero-title").innerHTML =
    escapeHtml(SITE_CONFIG.heroTitleBefore) +
    "<em>" +
    escapeHtml(SITE_CONFIG.heroTitleEmphasis) +
    "</em>" +
    escapeHtml(SITE_CONFIG.heroTitleAfter);
  hero.querySelector(".hero-sub").textContent = SITE_CONFIG.heroSub;

  const cta = hero.querySelector(".cta-btn");
  cta.href = SITE_CONFIG.ctaUrl;
  cta.querySelector(".cta-label").textContent = SITE_CONFIG.ctaLabel;
  if (/^https?:\/\//.test(SITE_CONFIG.ctaUrl)) {
    cta.target = "_blank";
    cta.rel = "noopener noreferrer";
  }

  document.getElementById("sectionLabelText").textContent = SITE_CONFIG.sectionLabel;

  const grid = document.getElementById("areaGrid");
  grid.innerHTML = AREAS.map(
    (area, i) => `
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
  `
  ).join("");

  grid.querySelectorAll(".area-card").forEach((card) => {
    card.addEventListener("click", () => goToArea(card.dataset.area));
  });
}

function renderDetail(areaId) {
  const area = AREAS.find((a) => a.id === areaId);
  if (!area) return goHome();

  document.getElementById("detailTitle").textContent = area.label;
  document.getElementById("detailDesc").textContent = area.description;

  const areaTagName = document.getElementById("areaTagName");
  if (areaTagName) areaTagName.textContent = area.label;

  const list = document.getElementById("linkList");
  list.innerHTML = area.links
    .map((link, i) => {
      const external = /^https?:\/\//.test(link.url);
      return `
      <a
        class="link-card"
        href="${escapeAttr(link.url)}"
        style="animation-delay:${i * 55}ms"
        ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}
      >
        <div class="link-icon">${icon(link.icon)}</div>
        <div class="link-body">
          <div class="link-title">${escapeHtml(link.label)}</div>
          <div class="link-desc">${escapeHtml(link.desc)}</div>
        </div>
        <div class="link-go">${icon("externalLink")}</div>
      </a>
    `;
    })
    .join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}

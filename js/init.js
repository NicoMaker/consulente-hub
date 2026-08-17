/* ==========================================================================
   INIT — punto di ingresso: carica data.json, poi avvia render e animazioni
   ========================================================================== */

async function loadSiteData() {
  try {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const json = await res.json();
    SITE_CONFIG = json.siteConfig;
    AREAS = json.areas;
    return true;
  } catch (err) {
    console.error("Impossibile caricare data.json:", err);
    return false;
  }
}

function showDataError() {
  document.getElementById("introSplash")?.remove();
  const header = document.querySelector(".hub-header");
  if (header) header.style.display = "none";
  const home = document.getElementById("screenHome");
  if (home) home.classList.remove("is-active");
  const detail = document.getElementById("screenDetail");
  if (detail) detail.classList.remove("is-active");
  const errorScreen = document.getElementById("dataError");
  if (errorScreen) errorScreen.style.display = "flex";
}

// Carica preferenze da localStorage
function loadPreferences() {
  // Tema
  const theme = localStorage.getItem("consulente-hub-theme");
  if (theme === "light") {
    document.body.classList.add("light-theme");
    document.getElementById("themeToggleIcon").textContent = "☀️";
  } else {
    document.body.classList.remove("light-theme");
    document.getElementById("themeToggleIcon").textContent = "🌙";
  }

  // Vista HOME (aree) — chiave separata, default "grid"
  const homeView = localStorage.getItem("consulente-hub-home-view") || "grid";
  const areaGrid = document.getElementById("areaGrid");
  if (areaGrid) {
    if (homeView === "list") {
      areaGrid.classList.add("list-view");
      document.getElementById("homeViewListBtn")?.setAttribute("aria-pressed", "true");
      document.getElementById("homeViewGridBtn")?.setAttribute("aria-pressed", "false");
    } else {
      areaGrid.classList.remove("list-view");
      document.getElementById("homeViewGridBtn")?.setAttribute("aria-pressed", "true");
      document.getElementById("homeViewListBtn")?.setAttribute("aria-pressed", "false");
    }
  }

  // Vista DETAIL (link) — chiave separata, default "list"
  const detailView = localStorage.getItem("consulente-hub-detail-view") || "list";
  const linkList = document.getElementById("linkList");
  if (linkList) {
    if (detailView === "grid") {
      linkList.classList.add("grid-view");
      document.getElementById("detailViewGridBtn")?.setAttribute("aria-pressed", "true");
      document.getElementById("detailViewListBtn")?.setAttribute("aria-pressed", "false");
    } else {
      linkList.classList.remove("grid-view");
      document.getElementById("detailViewListBtn")?.setAttribute("aria-pressed", "true");
      document.getElementById("detailViewGridBtn")?.setAttribute("aria-pressed", "false");
    }
  }
}

function setTheme(theme) {
  const icon = document.getElementById("themeToggleIcon");
  if (theme === "light") {
    document.body.classList.add("light-theme");
    icon.textContent = "☀️";
    localStorage.setItem("consulente-hub-theme", "light");
  } else {
    document.body.classList.remove("light-theme");
    icon.textContent = "🌙";
    localStorage.setItem("consulente-hub-theme", "dark");
  }
}

// Imposta la vista home (aree)
function setHomeView(view) {
  const areaGrid = document.getElementById("areaGrid");
  if (!areaGrid) return;
  const gridBtn = document.getElementById("homeViewGridBtn");
  const listBtn = document.getElementById("homeViewListBtn");

  if (view === "list") {
    areaGrid.classList.add("list-view");
    listBtn?.setAttribute("aria-pressed", "true");
    gridBtn?.setAttribute("aria-pressed", "false");
    localStorage.setItem("consulente-hub-home-view", "list");
  } else {
    areaGrid.classList.remove("list-view");
    gridBtn?.setAttribute("aria-pressed", "true");
    listBtn?.setAttribute("aria-pressed", "false");
    localStorage.setItem("consulente-hub-home-view", "grid");
  }
}

// Imposta la vista dettaglio (link)
function setDetailView(view) {
  const linkList = document.getElementById("linkList");
  if (!linkList) return;
  const gridBtn = document.getElementById("detailViewGridBtn");
  const listBtn = document.getElementById("detailViewListBtn");

  if (view === "grid") {
    linkList.classList.add("grid-view");
    gridBtn?.setAttribute("aria-pressed", "true");
    listBtn?.setAttribute("aria-pressed", "false");
    localStorage.setItem("consulente-hub-detail-view", "grid");
  } else {
    linkList.classList.remove("grid-view");
    listBtn?.setAttribute("aria-pressed", "true");
    gridBtn?.setAttribute("aria-pressed", "false");
    localStorage.setItem("consulente-hub-detail-view", "list");
  }
}

// Espongo le funzioni globalmente per render.js
window.setHomeView = setHomeView;
window.setDetailView = setDetailView;

document.addEventListener("DOMContentLoaded", async () => {
  const ok = await loadSiteData();

  if (!ok) {
    showDataError();
    return;
  }

  renderIdentity();
  renderHome();
  initRouteFromHash();
  loadPreferences();

  // Event listener tema
  document.getElementById("themeToggle").addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    setTheme(isLight ? "dark" : "light");
  });

  // Event listener vista home
  document.getElementById("homeViewGridBtn").addEventListener("click", () => setHomeView("grid"));
  document.getElementById("homeViewListBtn").addEventListener("click", () => setHomeView("list"));

  // Event listener vista dettaglio
  document.getElementById("detailViewGridBtn").addEventListener("click", () => setDetailView("grid"));
  document.getElementById("detailViewListBtn").addEventListener("click", () => setDetailView("list"));

  document.getElementById("backBtn").addEventListener("click", () => goHome());

  runIntro(() => {
    initGrowthChart();
  });
});
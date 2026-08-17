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
  const theme = localStorage.getItem("consulente-hub-theme");
  if (theme === "light") {
    document.body.classList.add("light-theme");
    document.getElementById("themeToggleIcon").textContent = "☀️";
  } else {
    document.body.classList.remove("light-theme");
    document.getElementById("themeToggleIcon").textContent = "🌙";
  }

  const view = localStorage.getItem("consulente-hub-view") || "list";
  const linkList = document.getElementById("linkList");
  if (linkList) {
    if (view === "grid") {
      linkList.classList.add("grid-view");
      document.getElementById("viewGridBtn")?.setAttribute("aria-pressed", "true");
      document.getElementById("viewListBtn")?.setAttribute("aria-pressed", "false");
    } else {
      linkList.classList.remove("grid-view");
      document.getElementById("viewListBtn")?.setAttribute("aria-pressed", "true");
      document.getElementById("viewGridBtn")?.setAttribute("aria-pressed", "false");
    }
  }
}

// Imposta il tema
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

// Imposta la vista
function setView(view) {
  const linkList = document.getElementById("linkList");
  if (!linkList) return;
  const gridBtn = document.getElementById("viewGridBtn");
  const listBtn = document.getElementById("viewListBtn");

  if (view === "grid") {
    linkList.classList.add("grid-view");
    gridBtn?.setAttribute("aria-pressed", "true");
    listBtn?.setAttribute("aria-pressed", "false");
    localStorage.setItem("consulente-hub-view", "grid");
  } else {
    linkList.classList.remove("grid-view");
    listBtn?.setAttribute("aria-pressed", "true");
    gridBtn?.setAttribute("aria-pressed", "false");
    localStorage.setItem("consulente-hub-view", "list");
  }
}

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

  // Event listener per il tema
  document.getElementById("themeToggle").addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    setTheme(isLight ? "dark" : "light");
  });

  // Event listener per i pulsanti vista
  document.getElementById("viewGridBtn").addEventListener("click", () => setView("grid"));
  document.getElementById("viewListBtn").addEventListener("click", () => setView("list"));

  document.getElementById("backBtn").addEventListener("click", () => goHome());

  runIntro(() => {
    initGrowthChart();
  });
});
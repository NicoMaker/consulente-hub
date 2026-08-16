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

document.addEventListener("DOMContentLoaded", async () => {
  const ok = await loadSiteData();

  if (!ok) {
    showDataError();
    return;
  }

  renderIdentity();
  renderHome();
  initRouteFromHash();

  document.getElementById("backBtn").addEventListener("click", () => goHome());

  runIntro(() => {
    initGrowthChart();
  });
});

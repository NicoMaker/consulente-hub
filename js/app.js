/* ==========================================================================
   APP — punto di ingresso: carica data.json, poi monta i componenti.
   Ogni componente vive nella cartella js/components/ ed è responsabile di
   una sola parte dell'interfaccia (icone, identità, hero, aree, link,
   tema, viste, animazioni, errore dati). Questo file li mette in ordine.
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

document.addEventListener("DOMContentLoaded", async () => {
  const ok = await loadSiteData();

  if (!ok) {
    showDataError();
    return;
  }

  renderIdentity();
  renderHero();
  AreaGrid.render();
  initRouteFromHash();

  ThemeToggle.init();
  document.getElementById("backBtn").addEventListener("click", () => goHome());

  runIntro(() => {
    initGrowthChart();
  });
});

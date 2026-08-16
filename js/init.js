/* ==========================================================================
   INIT — punto di ingresso
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderIdentity();
  renderHome();
  initRouteFromHash();

  document.getElementById("backBtn").addEventListener("click", () => goHome());

  runIntro(() => {
    initGrowthChart();
  });
});

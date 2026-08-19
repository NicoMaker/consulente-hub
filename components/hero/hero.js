/* ==========================================================================
   COMPONENT: Hero
   Riempie il testo della sezione hero (home) con i valori di SITE_CONFIG.
   Il tracciato animato è gestito dal componente GrowthChart.
   ========================================================================== */

function renderHero() {
  const hero = document.getElementById("hero");
  hero.querySelector(".hero-eyebrow-text").textContent =
    SITE_CONFIG.heroEyebrow;
  hero.querySelector(".hero-title").innerHTML =
    escapeHtml(SITE_CONFIG.heroTitleBefore) +
    "<em>" +
    escapeHtml(SITE_CONFIG.heroTitleEmphasis) +
    "</em>" +
    escapeHtml(SITE_CONFIG.heroTitleAfter);
  hero.querySelector(".hero-sub").textContent = SITE_CONFIG.heroSub;
  document.getElementById("sectionLabelText").textContent =
    SITE_CONFIG.sectionLabel;
}

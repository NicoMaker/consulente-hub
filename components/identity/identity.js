/* ==========================================================================
   COMPONENT: Identity
   Popola monogramma/logo, nome e ruolo nell'header e nello splash iniziale.
   Se in data.json è impostato "logo" (percorso o URL immagine, anche
   un'immagine, es. logo aziendale), viene mostrato al posto delle
   iniziali testuali.
   ========================================================================== */

function renderIdentity() {
  const hasLogo = Boolean(SITE_CONFIG.logo);
  document.querySelectorAll("[data-monogram]").forEach((el) => {
    el.classList.toggle("has-logo", hasLogo);
    if (hasLogo) {
      el.innerHTML = `<img src="${escapeAttr(SITE_CONFIG.logo)}" alt="${escapeAttr(SITE_CONFIG.name)}" />`;
    } else {
      el.textContent = SITE_CONFIG.monogram;
    }
  });
  document
    .querySelectorAll("[data-name]")
    .forEach((el) => (el.textContent = SITE_CONFIG.name));
  document
    .querySelectorAll("[data-role]")
    .forEach((el) => (el.textContent = SITE_CONFIG.role));
}

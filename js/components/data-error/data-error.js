/* ==========================================================================
   COMPONENT: DataError
   Schermata di fallback mostrata quando data.json non può essere caricato
   (tipicamente perché la pagina è aperta come file:// invece che via server).
   ========================================================================== */

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

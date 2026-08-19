/* ==========================================================================
   COMPONENT: IntroSplash
   Breve animazione di apertura con monogramma/logo, mostrata una volta ad
   ogni caricamento. Rispetta prefers-reduced-motion.
   ========================================================================== */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function runIntro(onDone) {
  const splash = document.getElementById("introSplash");

  if (prefersReducedMotion || !splash) {
    if (splash) splash.remove();
    onDone();
    return;
  }

  requestAnimationFrame(() => splash.classList.add("is-drawing"));

  setTimeout(() => {
    splash.classList.add("is-hidden");
    onDone();
    setTimeout(() => splash.remove(), 550);
  }, 1250);
}

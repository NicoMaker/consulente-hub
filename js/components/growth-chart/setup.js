/* ==========================================================================
   COMPONENT: GrowthChart — inizializzazione
   Punto di ingresso del componente: recupera gli elementi SVG del
   tracciato, gestisce il caso "prefers-reduced-motion" (tracciato mostrato
   già completo, senza animazione) e per tutti gli altri casi avvia il
   loop di animazione definito in animate.js.
   ========================================================================== */

function initGrowthChart() {
  const path = document.getElementById("chartPath");
  const fill = document.getElementById("chartPathFill");
  const marker = document.getElementById("chartMarker");
  if (!path) return;

  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;

  if (prefersReducedMotion) {
    path.style.strokeDashoffset = "0";
    if (fill) fill.style.opacity = "0.5";
    if (marker) {
      const end = path.getPointAtLength(length);
      marker.setAttribute("cx", end.x);
      marker.setAttribute("cy", end.y);
    }
    return;
  }

  animateGrowthChart({ path, fill, marker, length });
}

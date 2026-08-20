/* ==========================================================================
   COMPONENT: GrowthChart — animazione
   Loop di animazione (requestAnimationFrame) che disegna il tracciato in
   loop lento, con marker e riempimento sincronizzati. Richiamato da
   setup.js dopo l'inizializzazione, solo quando l'utente non ha richiesto
   "prefers-reduced-motion".
   ========================================================================== */

function animateGrowthChart({ path, fill, marker, length }) {
  const duration = 3400;
  const pause = 1400;
  let start = null;

  function frame(ts) {
    if (start === null) start = ts;
    const elapsed = ts - start;
    const cycle = duration + pause;
    const t = elapsed % cycle;
    const progress = Math.min(t / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    path.style.strokeDashoffset = `${length * (1 - eased)}`;
    if (fill) fill.style.opacity = `${0.5 * eased}`;

    if (marker) {
      const point = path.getPointAtLength(length * eased);
      marker.setAttribute("cx", point.x);
      marker.setAttribute("cy", point.y);
      marker.style.opacity = progress < 1 ? "1" : "0.85";
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

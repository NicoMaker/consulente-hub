/* ==========================================================================
   COMPONENT: GrowthChart
   Disegna un tracciato "di crescita" nell'header della hero e lo anima in
   loop lento: il segno distintivo dell'hub, al posto di orbi/rumore.
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

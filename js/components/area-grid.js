/* ==========================================================================
   COMPONENT: AreaGrid
   Costruisce le card delle aree in home a partire da AREAS e gestisce il
   passaggio al dettaglio al click. La vista griglia/elenco è delegata al
   componente ViewToggle condiviso.
   ========================================================================== */

const AreaGrid = {
  toggle: null,

  render() {
    const grid = document.getElementById("areaGrid");
    grid.innerHTML = AREAS.map(
      (area, i) => `
      <button class="area-card accent-${area.accent}" data-area="${area.id}" style="animation-delay:${i * 70}ms">
        <div class="area-icon">${icon(area.icon)}</div>
        <div>
          <div class="area-card-label">${escapeHtml(area.label)}</div>
          <div class="area-card-desc">${escapeHtml(area.description)}</div>
        </div>
        <div class="area-card-count">
          <span class="area-card-count-text">${area.links.length} link</span>
          <span class="area-card-go">${icon("arrowRight")}</span>
        </div>
      </button>
    `,
    ).join("");

    grid.querySelectorAll(".area-card").forEach((card) => {
      card.addEventListener("click", () => goToArea(card.dataset.area));
    });

    if (!this.toggle) {
      this.toggle = ViewToggle.create({
        container: grid,
        gridBtnId: "homeViewGridBtn",
        listBtnId: "homeViewListBtn",
        storageKey: "consulente-hub-home-view",
        defaultView: "grid",
        activeClass: "list-view",
      });
    }
    this.toggle.restore();
  },
};

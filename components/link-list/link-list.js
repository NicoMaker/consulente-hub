/* ==========================================================================
   COMPONENT: LinkList
   Costruisce le card dei link nella pagina di dettaglio di un'area. La
   vista griglia/elenco è delegata al componente ViewToggle condiviso.
   ========================================================================== */

const LinkList = {
  toggle: null,

  render(areaId) {
    const area = AREAS.find((a) => a.id === areaId);
    if (!area) return goHome();

    document.getElementById("detailTitle").textContent = area.label;
    document.getElementById("detailDesc").textContent = area.description;
    const areaTagName = document.getElementById("areaTagName");
    if (areaTagName) areaTagName.textContent = area.label;

    const list = document.getElementById("linkList");
    list.innerHTML = area.links
      .map((link, i) => {
        const external = /^https?:\/\//.test(link.url);
        return `
        <a class="link-card" href="${escapeAttr(link.url)}" style="animation-delay:${i * 55}ms"
           ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
          <div class="link-icon">${icon(link.icon)}</div>
          <div class="link-body">
            <div class="link-title">${escapeHtml(link.label)}</div>
            <div class="link-desc">${escapeHtml(link.desc)}</div>
          </div>
          <div class="link-go">${icon("externalLink")}</div>
        </a>
      `;
      })
      .join("");

    if (!this.toggle) {
      this.toggle = ViewToggle.create({
        container: list,
        gridBtnId: "detailViewGridBtn",
        listBtnId: "detailViewListBtn",
        storageKey: "consulente-hub-detail-view",
        defaultView: "list",
        activeClass: "grid-view",
      });
    }
    this.toggle.restore();
  },
};

/* ==========================================================================
   COMPONENT: ViewToggle
   Interruttore riutilizzabile griglia/elenco. Usato sia in home (AreaGrid)
   sia nel dettaglio (LinkList), con una chiave di localStorage propria per
   ciascun contesto così le due preferenze restano indipendenti.

   Uso:
     ViewToggle.create({
       container: document.getElementById("areaGrid"),
       gridBtnId: "homeViewGridBtn",
       listBtnId: "homeViewListBtn",
       storageKey: "consulente-hub-home-view",
       defaultView: "grid",
       activeClass: "list-view", // classe applicata quando la vista è "list"
     });
   ========================================================================== */

const ViewToggle = {
  create({ container, gridBtnId, listBtnId, storageKey, defaultView, activeClass }) {
    const gridBtn = document.getElementById(gridBtnId);
    const listBtn = document.getElementById(listBtnId);

    const apply = (view) => {
      if (!container) return;
      const isList = view === "list";
      container.classList.toggle(activeClass, isList);
      gridBtn?.setAttribute("aria-pressed", String(!isList));
      listBtn?.setAttribute("aria-pressed", String(isList));
      localStorage.setItem(storageKey, isList ? "list" : "grid");
    };

    const restore = () => {
      const saved = localStorage.getItem(storageKey) || defaultView;
      apply(saved);
    };

    gridBtn?.addEventListener("click", () => apply("grid"));
    listBtn?.addEventListener("click", () => apply("list"));

    return { apply, restore };
  },
};

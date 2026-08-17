/* ==========================================================================
   NAVIGATION — passaggio home ↔ dettaglio, con hash condivisibile (#area=id)
   ========================================================================== */

function goToArea(areaId, pushHash = true) {
  const area = AREAS.find((a) => a.id === areaId);
  if (!area) return;

  renderDetail(areaId);

  document.getElementById("screenHome").classList.remove("is-active");
  document.getElementById("screenDetail").classList.add("is-active");

  document.getElementById("backBtn").style.display = "inline-flex";
  const areaTag = document.getElementById("areaTag");
  areaTag.style.display = "inline-flex";
  document.getElementById("areaTagDot").style.background =
    area.accent === "emerald" ? "var(--emerald-bright)" : "var(--gold-bright)";

  if (pushHash) {
    history.pushState({ area: areaId }, "", `#${areaId}`);
  }

  window.scrollTo({ top: 0, behavior: "auto" });
}

function goHome(pushHash = true) {
  document.getElementById("screenDetail").classList.remove("is-active");
  document.getElementById("screenHome").classList.add("is-active");

  document.getElementById("backBtn").style.display = "none";
  document.getElementById("areaTag").style.display = "none";

  if (pushHash) {
    history.pushState(
      {},
      "",
      window.location.pathname + window.location.search,
    );
  }

  window.scrollTo({ top: 0, behavior: "auto" });
}

function initRouteFromHash() {
  const id = window.location.hash.replace("#", "");
  if (id && AREAS.some((a) => a.id === id)) {
    goToArea(id, false);
  } else {
    goHome(false);
  }
}

window.addEventListener("popstate", () => {
  initRouteFromHash();
});
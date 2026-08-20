/* ==========================================================================
   COMPONENT: ThemeToggle
   Gestisce il tema chiaro/scuro: applica la classe sul body, aggiorna
   l'icona e salva la preferenza in localStorage.
   ========================================================================== */

const ThemeToggle = {
  storageKey: "consulente-hub-theme",

  apply(theme) {
    const icon = document.getElementById("themeToggleIcon");
    if (theme === "light") {
      document.body.classList.add("light-theme");
      if (icon) icon.textContent = "☀️";
    } else {
      document.body.classList.remove("light-theme");
      if (icon) icon.textContent = "🌙";
    }
    localStorage.setItem(this.storageKey, theme === "light" ? "light" : "dark");
  },

  loadSaved() {
    const saved = localStorage.getItem(this.storageKey);
    this.apply(saved === "light" ? "light" : "dark");
  },

  init() {
    this.loadSaved();
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      const isLight = document.body.classList.contains("light-theme");
      this.apply(isLight ? "dark" : "light");
    });
  },
};

/* ==========================================================================
   COMPONENT: Utils
   Funzioni di supporto condivise da tutti gli altri componenti.
   ========================================================================== */

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

const escapeAttr = (str) => escapeHtml(str).replace(/"/g, "&quot;");

// Trasforma un testo libero in uno slug adatto a essere usato come id area
// (es. "Mercati & Ricerca" -> "mercati-ricerca"). Garantisce unicità
// rispetto a un elenco di id già esistenti.
function slugify(text, existingIds = []) {
  const base =
    String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "area";

  if (!existingIds.includes(base)) return base;
  let i = 2;
  while (existingIds.includes(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

// Genera un identificativo breve e univoco, utile per elementi di lista
// nell'editor (react-key style) prima che vengano salvati.
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

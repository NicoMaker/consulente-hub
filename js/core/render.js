/* ==========================================================================
   COMPONENT: IconRegistry — rendering
   Usa i dati definiti in icons.js (deve essere caricato PRIMA di questo
   file) per decidere cosa mostrare al posto di un'icona:
     - isImageIcon()  riconosce se una stringa è un URL/percorso immagine
     - icon(name)     restituisce il markup pronto (SVG predefinito o <img>)
   ========================================================================== */

// Riconosce se il valore passato è un'icona del set predefinito oppure
// il percorso/URL di un'immagine (logo o icona personalizzata) da usare al suo posto.
// In data.json basta scrivere il percorso dell'immagine al posto del nome
// dell'icona, es: "icon": "img/logo-cliente.png" oppure un URL completo.
function isImageIcon(name) {
  if (typeof name !== "string") return false;
  return (
    /^(https?:)?\/\//i.test(name) ||
    name.startsWith("data:image") ||
    /\.(png|jpe?g|svg|webp|gif|avif)(\?.*)?$/i.test(name)
  );
}

const icon = (name) => {
  if (isImageIcon(name)) {
    const safeSrc = String(name).replace(/"/g, "&quot;");
    return `<img class="icon-img" src="${safeSrc}" alt="" loading="lazy" />`;
  }
  return ICONS[name] || ICONS.arrowRight;
};

Questa cartella è pensata come posto comodo dove mettere immagini "a file"
(logo, icone personalizzate) se preferisci NON incorporarle come base64
tramite il pannello admin (admin/index.html).

Per usarle: copia qui il file (es. img/logo.png) e in data.json — o nel
pannello admin, tab "Da URL" del selettore icona — scrivi il percorso
relativo, es:

  "logo": "img/logo.png"
  "icon": "img/icona-crm.svg"

Il sito riconosce automaticamente che si tratta di un'immagine e la mostra
al posto dell'icona predefinita o del monogramma testuale.

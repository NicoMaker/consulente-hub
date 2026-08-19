# Consulente Hub — Bacheca Personale

Bacheca privata di collegamenti rapidi (CRM, mercati, produttività,
normativa...), organizzata in categorie con link. **Solo HTML, CSS e
JavaScript puro — nessun framework, nessuna build, nessuna dipendenza da
installare.**

## Avvio rapido

I browser bloccano la lettura di `data.json` se apri `index.html`
direttamente come file (`file://`). Serve un piccolo server locale:

```bash
python3 -m http.server 8000
```

poi apri `http://localhost:8000` nel browser.

## Struttura del progetto

```
consulente-hub/
├── index.html              punto d'ingresso del sito
├── data.json                contenuti: nome, testi, categorie, link, icone
├── css/
│   ├── base/                 fondamenta condivise da tutto il sito
│   │   ├── tokens.css          design token: colori, font, radius, tema chiaro
│   │   ├── reset.css           azzeramento stili browser + primitive globali
│   │   └── layout.css          contenitore di pagina condiviso
│   ├── components/            un file per ogni parte dell'interfaccia
│   │   ├── header.css          barra superiore, badge privato, pulsante indietro
│   │   ├── identity.css        monogramma/logo, nome, ruolo
│   │   ├── theme-toggle.css    interruttore tema chiaro/scuro
│   │   ├── intro-splash.css    animazione di apertura
│   │   ├── hero.css            testo della sezione hero
│   │   ├── growth-chart.css    tracciato animato nella hero
│   │   ├── icon-registry.css   stile per icone-immagine
│   │   ├── view-toggle.css     interruttore griglia/elenco
│   │   ├── area-grid.css       griglia categorie in home
│   │   ├── link-list.css       elenco link nel dettaglio di una categoria
│   │   └── data-error.css      schermata di errore se data.json non si carica
│   └── animations.css        transizioni di pagina, riduzione movimento (trasversale)
└── js/
    ├── app.js                punto di ingresso: carica data.json, monta i componenti
    ├── router.js             navigazione home ↔ dettaglio (hash condivisibile, trasversale)
    ├── state.js               variabili di stato condivise (SITE_CONFIG, AREAS)
    └── components/            un file per ogni parte dell'interfaccia
        ├── icon-registry.js   libreria icone SVG + riconoscimento immagini
        ├── utils.js           escape HTML, slugify, id univoci
        ├── identity.js        monogramma/logo, nome, ruolo
        ├── hero.js            testo della sezione hero
        ├── theme-toggle.js    interruttore tema chiaro/scuro
        ├── view-toggle.js     interruttore griglia/elenco (riutilizzabile)
        ├── area-grid.js       griglia categorie in home
        ├── link-list.js       elenco link nel dettaglio di una categoria
        ├── intro-splash.js    animazione di apertura
        ├── growth-chart.js    tracciato animato nella hero
        └── data-error.js      schermata di errore se data.json non si carica
```

Ogni componente — sia in `css/components/` sia in `js/components/` — è
responsabile di **una sola parte** dell'interfaccia, con lo **stesso nome**
su entrambi i lati quando esiste una controparte visiva (es.
`hero.css`/`hero.js`, `area-grid.css`/`area-grid.js`). I file in
`css/base/` e i due file trasversali `router.js`/`animations.css` non
appartengono a un singolo componente ma coordinano l'insieme, esattamente
come `app.js`.

## Modificare i contenuti

Tutto il contenuto (nome, testi, categorie, link, icone) sta in
`data.json`. Non serve toccare il codice JavaScript.

### Icone e immagini

Ogni categoria e ogni link hanno un campo `"icon"`. Può essere:

- il **nome di un'icona** della libreria integrata (vedi
  `js/components/icon-registry.js` per l'elenco completo: `chart`, `crm`,
  `mail`, `coin`, `bank`, `target`, `handshake`, `star`, `users`, `gear`,
  ecc.);
- oppure il **percorso o URL di un'immagine** — in tal caso viene mostrata
  al posto dell'icona:

```json
{ "icon": "img/logo-cliente.png" }
{ "icon": "https://esempio.com/icona.svg" }
{ "icon": "data:image/png;base64,iVBORw0KGgoAAAANS..." }
```

Lo stesso vale per `"logo"` in `siteConfig` (mostrato al posto del
monogramma testuale nell'header).

La cartella `img/` è pensata apposta per ospitare queste immagini locali.

### Colori di accento disponibili

`gold`, `emerald`, `sapphire`, `ruby` — impostabili per ogni categoria nel
campo `"accent"` di `data.json`.

### Esempio di categoria

```json
{
  "id": "mercati",
  "label": "Mercati & Ricerca",
  "icon": "chart",
  "accent": "emerald",
  "description": "Quotazioni, report, analisi",
  "links": [
    {
      "label": "Bloomberg",
      "desc": "Notizie e dati di mercato",
      "url": "https://www.bloomberg.com",
      "icon": "externalLink"
    }
  ]
}
```

## Note

- Tema chiaro/scuro e vista griglia/elenco sono salvati in `localStorage`
  del browser.
- La pagina rispetta `prefers-reduced-motion` per chi preferisce meno
  animazioni.

# Bacheca personale di link — Consulente Finanziario

Bacheca **ad uso strettamente personale**: raccoglie i link che usi tu ogni
giorno per lavorare (CRM, portali, mercati, produttività, normativa). Non è
una pagina pensata per essere mostrata a clienti: niente contatti pubblici,
niente descrizioni di servizi, niente pulsanti "prenota una consulenza". In
testata compare un'etichetta "Privato" a ricordarlo.

## Struttura del progetto

```
index.html
data.json           → ⭐ QUI SI PERSONALIZZA: nome, testi, aree e link
css/
  styles.css        → design tokens (colori, font), layout, componenti
  animations.css    → transizioni pagina, grafico ambientale, reduced-motion
js/
  data.js            → dichiara solo lo stato, i contenuti sono in data.json
  icons.js           → libreria icone SVG
  render.js          → costruisce l'HTML a partire dai dati caricati
  navigation.js       → passaggio home ↔ dettaglio (con #hash condivisibile)
  animations.js        → intro + grafico "di crescita" animato in loop
  init.js               → avvio: carica data.json, poi disegna la pagina
```

## Come personalizzarlo

Apri **`data.json`** con un editor di testo qualsiasi (anche il Blocco
Note) e modifica:

1. `siteConfig` → nome, ruolo, monogramma (iniziali) e testo della hero.
2. `areas` → le categorie mostrate in home (Strumenti di Lavoro, Mercati &
   Ricerca, Produttività, Normativa & Formazione). Puoi aggiungere,
   rimuovere o rinominare aree e singoli link: ogni link ha `label`, `desc`,
   `url` e un'`icon` (i nomi delle icone disponibili sono elencati in
   `js/icons.js`).

Sostituisci gli url segnaposto `"#"` con gli indirizzi reali dei tuoi
strumenti (CRM, gestionale, portale della casa mandante, webmail, drive...).

⚠️ **Attenzione alla sintassi JSON**: ogni voce va tra virgolette doppie
`"così"`, e non deve esserci una virgola dopo l'ultimo elemento di una
lista/oggetto. Se sbagli qualcosa, la pagina mostrerà un errore invece dei
tuoi link — in quel caso controlla di non aver lasciato virgole in più o
virgolette dimenticate. Puoi anche incollare il contenuto su
[jsonlint.com](https://jsonlint.com) per farlo controllare automaticamente.

## Come usarla — serve un piccolo server locale

Da quando i contenuti sono in `data.json`, la pagina li legge con una
richiesta (`fetch`) che i browser bloccano se apri `index.html` con un
semplice doppio click (protocollo `file://`): è una misura di sicurezza
standard, non un difetto del sito. Se capita, la pagina stessa mostra un
messaggio con la soluzione. In pratica:

1. Apri un terminale nella cartella del progetto
2. Esegui: `python3 -m http.server 8000`
3. Apri `http://localhost:8000` nel browser

Da quel momento puoi anche salvare l'indirizzo nei preferiti: finché il
terminale resta aperto, la pagina resta raggiungibile in locale.

### Alternative comode
- **VS Code**: installa l'estensione "Live Server" e fai clic destro su
  `index.html` → "Open with Live Server". Nessun comando da digitare.
- **Uso da più dispositivi**: pubblica la cartella su un hosting con
  protezione tramite password (es. Netlify, anche nel piano gratuito) così
  puoi aprirla da telefono o da un altro computer restando privata. Evita
  di pubblicarla su un dominio pubblico senza protezione, perché — come
  qualsiasi pagina web pubblica — sarebbe comunque raggiungibile da
  chiunque ne conoscesse l'indirizzo.

## Note tecniche

- Nessuna dipendenza esterna a parte i font Google (Fraunces, Manrope,
  JetBrains Mono), caricati via `<link>` in `index.html`.
- Routing leggero via `#hash` (es. `#normativa`) per link diretti a una
  singola area.
- Rispetta `prefers-reduced-motion`: se hai disattivato le animazioni nel
  sistema, l'intro e il grafico animato vengono disattivati.

# Hub di link — Consulente Finanziario

Sito statico "hub di link" (stile link-in-bio ma con schermata home ad aree +
dettaglio, ispirato nella struttura al progetto PalminoMotors ma con palette,
tipografia e contenuti completamente diversi, pensati per un consulente
finanziario). Nessun footer con dati commerciali/legali, come richiesto.

## Struttura del progetto

```
index.html
css/
  styles.css       → design tokens (colori, font), layout, componenti
  animations.css    → transizioni pagina, grafico ambientale, reduced-motion
js/
  data.js           → ⭐ QUI SI PERSONALIZZA: nome, testi, aree e link
  icons.js           → libreria icone SVG
  render.js           → costruisce l'HTML da data.js
  navigation.js        → passaggio home ↔ dettaglio (con #hash condivisibile)
  animations.js         → intro + grafico "di crescita" animato in loop
  init.js                → avvio
```

## Come personalizzarlo

Apri **`js/data.js`** e modifica:

1. `SITE_CONFIG` → nome, ruolo, monogramma (iniziali), testo della hero e
   URL del pulsante "Prenota una consulenza" (es. link Calendly/Google
   Calendar).
2. `AREAS` → le 4 categorie mostrate in home (Contatti, Servizi, Risorse,
   Presenza Online). Puoi aggiungere/rimuovere aree o singoli link: ogni
   link ha `label`, `desc`, `url` e un'`icon` (vedi i nomi disponibili in
   `js/icons.js`).

Ricorda di sostituire:
- `tel:+390000000000` → il tuo numero di telefono
- `https://wa.me/390000000000` → il tuo numero WhatsApp (senza `+` né spazi)
- `mailto:info@tuodominio.it` → la tua email
- i link social/segnaposto `#` → i tuoi profili reali

Il `<title>` e il favicon si trovano nell'`<head>` di `index.html`.

## Come vederlo in locale

Basta aprire `index.html` nel browser. Se preferisci un piccolo server
locale (utile per evitare limitazioni del browser sui moduli):

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Come pubblicarlo gratis (GitHub Pages)

1. Crea un nuovo repository su GitHub e carica questi file.
2. Vai in **Settings → Pages**, scegli il branch `main` e cartella `/root`.
3. Il sito sarà online su `https://<tuo-utente>.github.io/<nome-repo>/`.

In alternativa puoi trascinare la cartella su Netlify o Vercel per una
pubblicazione altrettanto rapida.

## Note tecniche

- Nessuna dipendenza esterna a parte i font Google (Fraunces, Manrope,
  JetBrains Mono), caricati via `<link>` in `index.html`.
- Routing leggero via `#hash` (es. `#servizi`) per link diretti e
  condivisibili a una singola area.
- Rispetta `prefers-reduced-motion`: se l'utente ha disattivato le
  animazioni nel sistema, l'intro e il grafico animato vengono disattivati.

# Bacheca personale di link — Consulente Finanziario

Bacheca **ad uso strettamente personale**: raccoglie i link che usi tu ogni
giorno per lavorare (CRM, portali, mercati, produttività, normativa). Non è
una pagina pensata per essere mostrata a clienti: niente contatti pubblici,
niente descrizioni di servizi, niente pulsanti "prenota una consulenza". In
testata compare un'etichetta "Privato" a ricordarlo.

Se in futuro la ospiti online, ricordati che qualunque pagina pubblicata su
un dominio pubblico è comunque raggiungibile da chi conosce l'indirizzo:
per tenerla davvero privata usa un hosting con protezione tramite password,
oppure tienila solo in locale sul tuo computer (vedi sotto).

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

1. `SITE_CONFIG` → nome, ruolo, monogramma (iniziali) e testo della hero.
2. `AREAS` → le 4 categorie mostrate in home (Strumenti di Lavoro, Mercati &
   Ricerca, Produttività, Normativa & Formazione). Puoi aggiungere,
   rimuovere o rinominare aree e singoli link: ogni link ha `label`, `desc`,
   `url` e un'`icon` (i nomi disponibili sono in `js/icons.js`).

Sostituisci gli url segnaposto `#` con gli indirizzi reali dei tuoi
strumenti (CRM, gestionale, portale della casa mandante, webmail, drive...).

Il `<title>` e il favicon si trovano nell'`<head>` di `index.html`.

## Come usarla in locale (consigliato per uso solo personale)

Il modo più semplice e più privato: apri direttamente `index.html` con
doppio click nel browser. Nessun server, nessuna pubblicazione online,
resta solo sul tuo computer.

Se preferisci un piccolo server locale (utile per evitare limitazioni del
browser sui moduli):

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Se invece vuoi accedervi anche da telefono/altri dispositivi

Puoi salvarla su un tuo cloud privato (es. una cartella su Google
Drive/iCloud sincronizzata) e aprirla da lì, oppure pubblicarla su un
hosting con protezione tramite password (molti hosting gratuiti come
Netlify offrono la protezione con password anche nel piano free). Evita di
pubblicarla su un dominio pubblico senza protezione, perché — come qualsiasi
pagina web pubblica — sarebbe comunque raggiungibile da chiunque ne
conoscesse l'indirizzo.

## Note tecniche

- Nessuna dipendenza esterna a parte i font Google (Fraunces, Manrope,
  JetBrains Mono), caricati via `<link>` in `index.html`.
- Routing leggero via `#hash` (es. `#normativa`) per link diretti a una
  singola area.
- Rispetta `prefers-reduced-motion`: se hai disattivato le animazioni nel
  sistema, l'intro e il grafico animato vengono disattivati.

/* ==========================================================================
   DATA — PERSONALIZZA QUI
   Questo è l'unico file da modificare per adattare l'hub al tuo profilo:
   nome, monogramma, testi della hero e tutte le aree con i relativi link.
   ========================================================================== */

const SITE_CONFIG = {
  name: "Marco Ferrari",
  role: "Consulente Finanziario Indipendente",
  monogram: "MF",

  heroEyebrow: "Hub personale",
  heroTitleBefore: "Pianifichiamo insieme il tuo ",
  heroTitleEmphasis: "domani finanziario",
  heroTitleAfter: "",
  heroSub:
    "Consulenza indipendente su investimenti, previdenza e protezione del patrimonio. Scegli qui sotto come contattarmi o cosa vuoi approfondire.",

  ctaLabel: "Prenota una consulenza gratuita",
  ctaUrl: "https://calendly.com/tuo-link", // sostituisci con il tuo link di prenotazione

  sectionLabel: "Esplora",
};

/* Ogni area diventa una card in home. Cliccandola si apre l'elenco di link.
   accent: "gold" oppure "emerald" — alterna i due per dare ritmo alla griglia. */
const AREAS = [
  {
    id: "contatti",
    label: "Contatti Diretti",
    icon: "phone",
    accent: "gold",
    description: "Scegli il canale più comodo per parlare con me",
    links: [
      {
        label: "Chiama ora",
        desc: "Dal lunedì al venerdì, 9:00–18:00",
        url: "tel:+390000000000",
        icon: "phone",
      },
      {
        label: "Scrivi su WhatsApp",
        desc: "Risposta entro 24 ore lavorative",
        url: "https://wa.me/390000000000",
        icon: "whatsapp",
      },
      {
        label: "Invia una email",
        desc: "Per richieste dettagliate o documenti",
        url: "mailto:info@tuodominio.it",
        icon: "mail",
      },
      {
        label: "Prenota un appuntamento",
        desc: "Scegli data e ora sul calendario online",
        url: "https://calendly.com/tuo-link",
        icon: "calendar",
      },
    ],
  },
  {
    id: "servizi",
    label: "Consulenza & Servizi",
    icon: "briefcase",
    accent: "emerald",
    description: "Le aree in cui posso affiancarti",
    links: [
      {
        label: "Pianificazione Finanziaria",
        desc: "Un percorso su misura per i tuoi obiettivi",
        url: "#",
        icon: "chart",
      },
      {
        label: "Investimenti e Risparmio Gestito",
        desc: "Strategie coerenti con il tuo profilo di rischio",
        url: "#",
        icon: "trend",
      },
      {
        label: "Previdenza Integrativa",
        desc: "Costruire la pensione che vuoi davvero",
        url: "#",
        icon: "shield",
      },
      {
        label: "Protezione del Patrimonio",
        desc: "Tutelare te e la tua famiglia da imprevisti",
        url: "#",
        icon: "umbrella",
      },
      {
        label: "Passaggio Generazionale",
        desc: "Pianificare il futuro del patrimonio familiare",
        url: "#",
        icon: "family",
      },
    ],
  },
  {
    id: "risorse",
    label: "Risorse Gratuite",
    icon: "book",
    accent: "gold",
    description: "Materiali utili per iniziare a orientarti",
    links: [
      {
        label: "Guida: le basi degli investimenti",
        desc: "PDF gratuito, circa 10 minuti di lettura",
        url: "#",
        icon: "download",
      },
      {
        label: "Newsletter mensile",
        desc: "Mercati e consigli pratici via email",
        url: "#",
        icon: "mail",
      },
      {
        label: "Blog e articoli",
        desc: "Approfondimenti aggiornati",
        url: "#",
        icon: "article",
      },
      {
        label: "Domande frequenti",
        desc: "Le risposte alle domande più comuni",
        url: "#",
        icon: "help",
      },
    ],
  },
  {
    id: "social",
    label: "Presenza Online",
    icon: "globe",
    accent: "emerald",
    description: "Seguimi sui miei canali",
    links: [
      { label: "Sito Web", desc: "Tutti i servizi in un unico posto", url: "#", icon: "globe" },
      { label: "LinkedIn", desc: "Aggiornamenti professionali", url: "#", icon: "linkedin" },
      {
        label: "Instagram",
        desc: "Contenuti quotidiani su finanza personale",
        url: "#",
        icon: "instagram",
      },
      { label: "Facebook", desc: "Community e aggiornamenti", url: "#", icon: "facebook" },
      {
        label: "YouTube",
        desc: "Video guide ed episodi settimanali",
        url: "#",
        icon: "youtube",
      },
    ],
  },
];

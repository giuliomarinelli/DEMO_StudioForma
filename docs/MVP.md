# MVP - Studio Forma

## Prodotto
Sito dimostrativo per uno studio di architettura fittizio. Funzionalita' distintiva: questionario guidato che genera una bozza di richiesta preliminare di progetto, da copiare, senza invio reale.

## Pagine
Home; Studio; Servizi; Portfolio di progetti fittizi con schede; Contatti; Richiedi un progetto.

## Flusso verticale prioritario
Questionario multi-step: tipologia intervento, immobile, superficie indicativa, obiettivi, stile, budget facoltativo, tempistiche, descrizione. Validazione, riepilogo modificabile e testo finale copiabile; nessuna trasmissione di dati.

## Criteri di accettazione
Navigazione responsive; almeno tre schede progetto fittizie; questionario funzionante con validazioni e ripristino; nessuna richiesta di dati personali obbligatori; messaggio esplicito demo.

## Vincoli di scope
- Niente backend business separato, credenziali, integrazioni terze reali, pagamenti o comunicazioni spedite; Pages Functions per SSR consentite.
- Dati mock mantenuti nel codice e identificati come tali.
- Esperienza completa via SSR Cloudflare Pages; le interazioni dimostrative funzionano in locale nel browser senza servizi business esterni. Non richiedere una build statica o funzionamento offline.
- Design originale, non copia di siti reali; contenuto leggibile e funzionante, non placeholder generici.
- Deploy futuro: Cloudflare Pages; master produzione, preview staging da proteggere con Access; develop senza promozione automatica.


## Requisito architetturale vincolante: SSR
- Framework: Qwik + Qwik City; TypeScript strict, Tailwind CSS.
- Cloudflare Pages con adapter Qwik City `cloudflare-pages` e SSR tramite Pages Functions; Vite è solo la toolchain interna al progetto Qwik. 
- L'HTML della prima risposta, incluse le rotte interne, deve contenere il contenuto significativo della pagina anche senza eseguire JavaScript nel browser.
- Impostare metadati SEO per le pagine e verificare la build SSR con richiesta HTTP diretta a una rotta interna in ambiente compatibile con Pages.
- Dati applicativi dimostrativi locali; nessun database o backend business separato. Le funzioni serverless dell'adapter SSR sono ammesse.
- Non implementare una SPA React e non abilitare SSG in sostituzione dell'SSR senza autorizzazione.

## Checklist della prima milestone
- [ ] Scaffold Qwik/Qwik City con SSR, adapter Cloudflare Pages, TypeScript strict e Tailwind configurato.
- [ ] Navigazione, layout responsive, tema e componenti base.
- [ ] Typecheck, lint, test essenziale e build.
- [ ] README e documentazione iniziale aggiornati.
- [ ] Nessun deploy remoto o modifica a servizi esterni.

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
- Niente backend, credenziali, integrazioni terze reali, pagamenti o comunicazioni spedite.
- Dati mock mantenuti nel codice e identificati come tali.
- Esperienza completa e dimostrabile anche offline dopo build statico.
- Design originale, non copia di siti reali; contenuto leggibile e funzionante, non placeholder generici.
- Deploy futuro: Cloudflare Pages; master produzione, preview staging da proteggere con Access; develop senza promozione automatica.

## Checklist della prima milestone
- [ ] Scaffold React/Vite/TypeScript strict/Tailwind configurato.
- [ ] Navigazione, layout responsive, tema e componenti base.
- [ ] Typecheck, lint, test essenziale e build.
- [ ] README e documentazione iniziale aggiornati.
- [ ] Nessun deploy remoto o modifica a servizi esterni.

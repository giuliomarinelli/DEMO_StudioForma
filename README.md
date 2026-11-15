# Studio Forma

Demo di uno studio di architettura fittizio. Milestone 4A: collaudo del generatore di brief
architettonici, identità grafite/cemento/blu e tre schede di progetto concettuale.
Studio, contenuti e operazioni sono simulati; nessuna richiesta viene inviata.

## Avvio locale

Baseline verificata: Node 22.16.0, npm 10.9.2. Non servono credenziali o file di
ambiente. Dalla radice del repository:

```powershell
npm ci
npm run dev
```

Aprire l'URL locale stampato da Vite. Il dev server usa il rendering SSR di Qwik
City; Vite è la toolchain del framework, non uno scaffold SPA.

## Verifiche e produzione locale

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npm run serve
```

Con il server acceso, in un secondo terminale:

```powershell
npm run test.ssr
```

La build di produzione è servita da Wrangler su http://127.0.0.1:8794, con worker
SSR e asset client generati dall'adapter ufficiale Cloudflare Pages. Nessun
login o deployment. `npm run preview` avvia lo stesso runtime locale. Arrestare
con Ctrl+C; prima di reinstallare dipendenze su Windows fermare i processi locali
di questa app per evitare lock di esbuild.

## Stack e struttura

Qwik + Qwik City 1.20.4, TypeScript strict, Tailwind CSS 4, Vite 7 integrato,
adapter Cloudflare Pages, npm e lockfile versionato. Nessun React, backend
business, database, autenticazione o servizio esterno applicativo.

- `src/routes/`: routing file-based, layout, sei pagine principali e tre schede.
- `src/components/`: layout, head SEO, primitive UI e componenti delle schede.
- `src/lib/projects.ts`: dati dimostrativi tipizzati condivisi tra archivio e schede.
- `src/components/brief/` e `src/lib/brief.ts`: questionario Qwik, validazioni e documento locale.
- `src/global.css`: token e design responsive; `src/media/`: asset originali.
- `adapters/cloudflare-pages/`: configurazione SSR di produzione.
- `tests/ssr.test.mjs`: verifica HTTP senza eseguire JavaScript client.

Rotte: `/`, `/studio/`, `/servizi/`, `/portfolio/`, `/contatti/`,
`/richiedi-un-progetto/`, `/portfolio/corte-01/`, `/portfolio/officina-02/`,
`/portfolio/interno-03/`; pagina 404 per URL inesistenti. Titoli, descrizioni e
canonical vengono emessi nel primo HTML. I collegamenti usano vere destinazioni
HTTP; il menu mobile usa stato Qwik e supporta Escape.

## Perimetro e stato

Homepage tipografica con tavola architettonica, tre SVG originali e pagine complete.
Corte 01, Officina 02 e Interno 03 presentano contesto, superficie ipotetica,
programma, domanda, criteri e materiali. Il questionario raccoglie intervento,
immobile, superficie, obiettivi, stile, budget facoltativo, tempi e descrizione.
Riepilogo modificabile, documento strutturato, copia e ripristino con conferma.
Nessun contatto operativo, dato personale richiesto o invio reale.

Le risposte restano in memoria nella pagina: avanti/indietro e modifiche le
conservano; ricaricare o lasciare la pagina le elimina. Nessun localStorage,
sessionStorage o database. La copia richiede il supporto/permesso Clipboard del
browser; se negato compare un testo selezionabile da copiare manualmente.

L'audit npm segnala advisory transitivi dello stack stabile: dettaglio e limiti
in [DEPENDENCY_AUDIT](docs/DEPENDENCY_AUDIT.md). Il collaudo sulla build SSR locale
copre nove rotte più 404 a 1440/768/390/320 px, percorso reale e tastiera.
Catture e report sono in [evidence/4a](docs/evidence/4a/); proposte editoriali in
[CONTENT_AUDIT](docs/CONTENT_AUDIT.md). La consegna non è una certificazione di sicurezza
o accessibilità né una pubblicazione remota.

## Documentazione

- [MVP e criteri di accettazione](docs/MVP.md)
- [Direzione del brand, palette e voce editoriale](docs/BRAND_DIRECTION.md)
- [Architettura, rendering, asset e licenze](docs/ARCHITECTURE.md)
- [Comandi, artefatti, riproduzione e rollback](docs/DEPLOYMENT.md)
- [Decisioni, operazioni e risultati delle verifiche](docs/WORKLOG.md)
- [Caso studio e attività residue](docs/CASE_STUDY.md)
- [Audit dei contenuti per pagina](docs/CONTENT_AUDIT.md)
- [Rilevanza degli advisory e rischio residuo](docs/DEPENDENCY_AUDIT.md)

Git flow: `develop` integra, `preview` è staging, `master` è produzione.
Questa milestone è su `feature/mvp-foundation`, senza merge o rebase. Deploy,
provisioning e modifiche ai servizi Cloudflare sono riservati al proprietario.

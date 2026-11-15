# Studio Forma

Demo di uno studio di architettura fittizio. Milestone 1: fondamenta applicative,
identità visiva e struttura iniziale del sito. Studio, contenuti e operazioni sono
simulati; nessuna richiesta viene inviata.

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

- `src/routes/`: routing file-based, layout e sei pagine pubbliche.
- `src/components/`: header, footer, head SEO e due primitive UI condivise.
- `src/global.css`: token e design responsive; `src/media/`: asset originali.
- `adapters/cloudflare-pages/`: configurazione SSR di produzione.
- `tests/ssr.test.mjs`: verifica HTTP senza eseguire JavaScript client.

Rotte: `/`, `/studio/`, `/servizi/`, `/portfolio/`, `/contatti/`,
`/richiedi-un-progetto/`; pagina 404 per URL inesistenti. Titoli, descrizioni e
canonical vengono emessi nel primo HTML. I collegamenti usano vere destinazioni
HTTP; il menu mobile usa stato Qwik e supporta Escape.

## Perimetro e stato

Homepage presentabile, identità visiva originale, illustrazione architettonica
SVG inclusa, introduzioni alle pagine e messaggio demo esplicito. Le tre schede
progetto complete e il questionario non sono implementati: appartengono alle
milestone 2 e 3. Nessun contatto operativo, form o invio reale.

L'audit npm segnala advisory transitivi dello stack stabile: dettaglio e limiti
in [WORKLOG](docs/WORKLOG.md). La consegna non è una certificazione di sicurezza
o accessibilità né una pubblicazione remota.

## Documentazione

- [MVP e criteri di accettazione](docs/MVP.md)
- [Architettura, rendering, asset e licenze](docs/ARCHITECTURE.md)
- [Comandi, artefatti, riproduzione e rollback](docs/DEPLOYMENT.md)
- [Decisioni, operazioni e risultati delle verifiche](docs/WORKLOG.md)
- [Caso studio e attività residue](docs/CASE_STUDY.md)

Git flow: `develop` integra, `preview` è staging, `master` è produzione.
Questa milestone è su `feature/mvp-foundation`, senza merge o rebase. Deploy,
provisioning e modifiche ai servizi Cloudflare sono riservati al proprietario.

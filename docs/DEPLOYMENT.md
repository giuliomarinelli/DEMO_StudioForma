# Build e verifica locale — nessun deployment eseguito

## Stato e confini

L'adapter Cloudflare Pages ufficiale di Qwik City è configurato nel codice.
Nessun progetto Cloudflare è stato creato o collegato: non sono stati eseguiti
login, provisioning, deployment, modifiche DNS, Access, secrets, CI o billing.
Non è presente uno script `deploy` nel package.json.

Questo progetto richiede SSR. Non pubblicare soltanto gli asset tramite un server
statico e non sostituire l'adapter con una build SSG.

## Prerequisiti

Node 22.16.0 o successivo compatibile con le dipendenze, npm e Git. La baseline
verificata usa Node 22.16.0 e npm 10.9.2; npm 11.6.2 è stato utilizzato tramite npx
solo per risolvere un errore Arborist durante l'aggiornamento del lockfile.
Non servono account Cloudflare, credenziali, file `.env`, binding o database.
Installazione npm e primo download del runtime locale richiedono rete.

## Procedura riproducibile

Eseguire dalla radice del repository. Fermare prima eventuali processi locali
di questa applicazione, soprattutto su Windows dove esbuild può restare bloccato.

```powershell
npm ci
npm run typecheck
npm run lint
npm test
npm run build
```

Il comando `build` ufficiale Qwik esegue build.types, build.client, build.server e
lint. L'output atteso comprende:

- `dist/build/`: moduli client Qwik.
- `dist/assets/` e `dist/q-manifest.json`: stili e manifest client.
- `server/`: moduli SSR intermedi.
- `dist/_worker.js`: worker Pages di produzione.
- `dist/_routes.json`: regole di instradamento al worker.
- `dist/404.html`: fallback generato dall'adapter; le rotte pubbliche non sono SSG.

In un terminale avviare la build di produzione in locale:

```powershell
npm run serve
```

Il comando esegue `wrangler pages dev ./dist`, con bind a `127.0.0.1:8794`,
compatibility date `2026-11-15` e flag `nodejs_als` richiesto dall'integrazione.
Tutte le risorse sono locali. Non viene usata l'opzione `--remote`.
`npm run preview` è un alias della stessa verifica Cloudflare, non di una preview
SPA o di un differente adapter Node.

In un secondo terminale:

```powershell
npm run test.ssr
```

Il test verifica artefatti, assenza di homepage prerenderizzata, HTTP 200 delle
nove rotte, contenuti leggibili, lingua italiana, H1, titolo, descrizione,
canonical, dichiarazione demo e HTTP 404 per una rotta inesistente.
Legge l'HTML della risposta ed elimina gli script prima delle asserzioni:
non esegue JavaScript client-side. Per un'ispezione manuale:

```powershell
curl.exe http://127.0.0.1:8794/
curl.exe http://127.0.0.1:8794/studio/
curl.exe http://127.0.0.1:8794/portfolio/corte-01/
```

Se si cambia porta, aggiornare lo script `serve` oppure lanciare Wrangler con la
porta scelta e impostare `SSR_TEST_ORIGIN` solo nel terminale dei test. Non usare
un'origine remota per questi controlli. Arrestare il server con Ctrl+C.

## Problemi noti e recupero

- `EPERM` su esbuild durante `npm ci`: fermare esclusivamente i server/test di
  questo repository e ripetere `npm ci`. Non disabilitare antivirus né terminare
  indiscriminatamente tutti i processi Node.
- Errore npm `Cannot read properties of null (reading 'edgesOut')` durante un
  aggiornamento Vitest: verificare lo stato del lockfile e usare
  `npx --yes npm@11.6.2 install`. Non è necessaria una modifica globale di npm.
  Per la riproduzione ordinaria usare `npm ci` sul lockfile versionato.
- Durante una build Qwik può stampare `Starting Qwik City SSG`: con questa
  configurazione riguarda esclusivamente il fallback 404. Il test HTTP e
  l'assenza di `dist/index.html` proteggono il requisito SSR pubblico.
- Gli advisory transitivi rimasti sono elencati nel worklog. Non eseguire
  `npm audit fix --force` senza una verifica di compatibilità.

## Futuro hosting, riservato al proprietario

Solo dopo autorizzazione esplicita si potranno valutare un progetto Pages, il
comando build `npm run build`, output `dist`, runtime Node e dominio reali.
`master` sarà produzione, `preview` staging da proteggere con Access;
`develop` e `feature/*` non devono essere promossi automaticamente. La semplice
creazione di un branch non deve attivare deploy automatici. Questa fase non
predispone CI, integrazioni Git di Cloudflare o configurazione Access.

## Rollback

Non esiste un deployment da ripristinare. Il riferimento di partenza è
`develop` a `b5059dd`. Per scartare il lavoro di sviluppo senza perdere modifiche,
prima assicurarsi che il working tree sia pulito e conservare il branch feature;
poi selezionare `develop` con `git switch develop`. Non usare reset/clean e non
riscrivere la cronologia pubblicata. Un eventuale annullamento dei commit tramite
`git revert` è una successiva operazione da concordare, non eseguita qui.

Per confrontare la sola revisione visuale/contenuti della milestone 2 con la
foundation, il riferimento precedente è `c90f439`. Non è stato eseguito alcun
rollback. Le dipendenze e l'adapter sono invariati in questa milestone.

## Riferimenti ufficiali

- [Qwik City Cloudflare Pages adapter](https://qwik.dev/docs/deployments/cloudflare-pages/)
- [Cloudflare Pages: sviluppo locale delle Functions](https://developers.cloudflare.com/pages/functions/local-development/)
- [Tailwind CSS con Qwik](https://tailwindcss.com/docs/installation/framework-guides/qwik)

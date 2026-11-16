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
Dalla milestone 3 verifica anche i campi iniziali SSR del questionario, il
messaggio noscript e l’assenza di form HTML inviabili.
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
- Fermare Wrangler prima di ricostruire e riavviarlo dopo la build: durante la
  cancellazione temporanea di dist può continuare a servire il worker precedente.
  Per confrontare correzioni e screenshot non affidarsi a una ricompilazione
  mentre il vecchio runtime è ancora acceso.

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
rollback. Le dipendenze e l’adapter sono invariati nelle milestone 2 e 3.

## Riferimenti ufficiali

- [Qwik City Cloudflare Pages adapter](https://qwik.dev/docs/deployments/cloudflare-pages/)
- [Cloudflare Pages: sviluppo locale delle Functions](https://developers.cloudflare.com/pages/functions/local-development/)
- [Tailwind CSS con Qwik](https://tailwindcss.com/docs/installation/framework-guides/qwik)

## Verifica manuale del generatore / milestone 3

Sulla build locale di produzione aprire /richiedi-un-progetto/. Provare Continua
senza risposte: messaggi comprensibili e focus al riepilogo errori. Compilare:

1. Ristrutturazione; Appartamento; “Appartamento esistente con ambienti separati.”;
   superficie “95,50”. Verificare il rifiuto di zero o valori negativi.
2. Riorganizzare gli spazi e Integrare lavoro e abitare; Da esplorare insieme.
   Indietro e Continua devono mantenere le risposte.
3. Lasciare budget Non indicato; tempi Da definire; descrizione di almeno 20
   caratteri, senza dati personali. Raggiungere il riepilogo.
4. Modificare la prima sezione, portare la superficie a 120, confermare e verificare
   il valore nel riepilogo. Generare il documento e controllare tutte le sezioni,
   budget facoltativo non indicato e dichiarazione dimostrativa.
5. Copiare il brief. Se il browser lo consente, incollare in un editor per verificare
   il testo. Se il permesso è negato, verificare il messaggio e la copia manuale
   dalla textarea readonly. Non interpretare un blocco del browser come successo.
6. Provare Ricomincia da zero: prima mantenere le risposte, poi confermare il reset.
   Verificare stato vuoto, primo passaggio e nessun documento precedente.

Ripetere con tastiera (Tab, frecce per radio, Space per checkbox, Enter sui
pulsanti) e schermo stretto. Verificare che nessuna risposta sia inviata come
richiesta POST o parametro URL. Le risposte non sopravvivono a un reload:
questa è una scelta esplicita di stato locale, non un salvataggio automatico.
Il generatore richiede JavaScript; l’HTML e le istruzioni rimangono disponibili
via SSR e nessun invio nativo è possibile anche senza JavaScript.

Baseline per confrontare la milestone 3: commit caad2a4. Nessun rollback o
pubblicazione eseguiti. Il report dei controlli effettivi è nel worklog.

## Collaudo browser riproducibile / milestone 4A

Dopo build e avvio di Wrangler aprire http://127.0.0.1:8794. Ripetere per tutte le
nove rotte elencate nel README e per /pagina-inesistente/ a 1440, 768, 390 e
320 px, zoom 100%. Scorrere fino al footer per attivare anche le immagini lazy.
Controllare assenza di scorrimento orizzontale, titoli integri, testi leggibili,
immagini caricate, spaziature, ordine dei contenuti e destinazioni dei link.

Su mobile aprire Menu con Enter, Tab al primo link, Escape e ritorno del focus
al pulsante; riaprire e seguire Servizi. In Contatti aprire le FAQ con Enter.
Usare Tab iniziale e Vai al contenuto per raggiungere il main.

Per il brief seguire la procedura precedente e provare anche:

- Superfici 0, -1, 100001, 1e2, 95,123 rifiutate; 0,01 e 100000 accettate.
- Caratteristiche di 9 caratteri rifiutate, 10 accettate; massimo 400.
  Descrizione 19 rifiutata, 20 accettata; massimo 2000. Provare soli spazi.
- Nessun obiettivo/stile/tempo: errore comprensibile, aria-invalid e focus al
  riepilogo. Radio con frecce, checkbox con Space, pulsanti con Enter.
- Modifica dal riepilogo: pulsante Conferma la modifica e ritorno diretto alla
  revisione. Verificare che tutte le risposte modificate compaiano nel documento.
- Tutti i passaggi e documento finale nei quattro viewport, testo lungo incluso.
- Reset: focus iniziale su Mantieni le risposte; annullamento conserva i dati,
  conferma azzera e riporta al titolo iniziale. Reload elimina lo stato.
- In DevTools Network controllare che le risposte non producano POST, query URL
  o invii; il caricamento dei chunk Qwik tramite GET è normale.

Gli harness `tests/browser-audit.mjs` e `tests/browser-layout-audit.mjs` esportano
`runBrowserAudit(page)` e `runLayoutAudit(page)` per un host Playwright già
disponibile. Creano e chiudono soltanto una propria scheda, scrivono report e
catture in docs/evidence/4a e non installano browser o pacchetti. Esempio per un
host Node ESM che fornisce una Page:

```js
import { runBrowserAudit } from './tests/browser-audit.mjs';
import { runLayoutAudit } from './tests/browser-layout-audit.mjs';
const brief = await runBrowserAudit(page);
const layout = await runLayoutAudit(page);
if (brief.status !== 'passed' || layout.status !== 'passed') {
  throw new Error('Collaudo non superato: leggere i report');
}
```

Per riprendere solo il questionario senza ripetere le pagine già verificate,
usare `runBrowserAudit(page, { skipPublicPages: true })`. Per il percorso da
tastiera, copia e reset a 320 px usare `runBrowserAudit(page, { keyboardOnly: true })`:
scrive keyboard-report.json separato. Nella ripresa esclusiva della 4A il primo
report contiene 37 controlli superati e un timeout di azione sul click Copia;
il secondo è interamente superato. Non rietichettare il primo come passed.

Nella sessione 4A l'host MCP non supporta import dinamici nel suo contesto VM:
è stato eseguito il corpo delle stesse funzioni, fornendo origine e percorso
catture; i report restituiti sono stati salvati dal processo locale. Questa
limitazione dell'host non richiede modifiche alle dipendenze del progetto.
Se il servizio browser non risponde, fermarsi al primo blocco e usare la checklist
manuale; non dichiarare superati controlli non eseguiti. Salvare esiti e catture
con data, browser e viewport. Un timeout di un'asserzione con browser operativo
va distinto dall'indisponibilità del servizio.

Il controllo cromatico dell'harness considera testo HTML visibile e fondi CSS
uniformi, con composizione alpha e soglie 4,5:1/3:1. Esclude SVG/immagini e non
valuta pseudo-elementi, gradienti, bordi dei controlli o tutti gli stati dinamici:
non sostituisce un audit WCAG. La copia positiva conferma writeText, non una
rilettura degli appunti; verificare manualmente l'incolla nell'editor desiderato.
Baseline rollback 4A: `698f1a1`; nessun rollback effettuato.

## Verifica degli elaborati — milestone 4B

Baseline di confronto e rollback: `ee22cf3`. Nessuna configurazione di hosting,
dipendenza o comando di build cambia. Eseguire typecheck, lint, npm test e build
con la procedura ordinaria; avviare solo il runtime locale del progetto e usare
il test HTTP SSR già esistente. Non occorre Playwright né un test E2E.

Verificare le tre schede con richieste dirette e controllare nell'HTML della
prima risposta: id lettura-progettuale, problema/ipotesi/soluzione, figcaption,
annotazioni, alt, aria-describedby e dichiarazione non in scala. Interno 03
deve avere le due tavole 03.02 e 03.03. In Studio controllare il link
/portfolio/corte-01/#lettura-progettuale. Non servono dati personali o credenziali.

Per esaminare i vettoriali senza automazione browser, dalla radice del repository
usare XML nativo PowerShell e Sharp già presente nella toolchain di Miniflare:

```powershell
$drawings = @('corte-01-pianta','officina-02-sezione','interno-03-aperto','interno-03-separato')
foreach ($drawing in $drawings) {
  $svg = [xml](Get-Content -LiteralPath "src/media/$drawing.svg" -Raw)
  $svg.DocumentElement.GetAttribute('viewBox')
}
@'
const fs = require('node:fs/promises');
const path = require('node:path');
const { createRequire } = require('node:module');
const sharp = createRequire(path.resolve('node_modules/miniflare/package.json'))('sharp');
const drawings = ['corte-01-pianta','officina-02-sezione','interno-03-aperto','interno-03-separato'];
(async () => {
  await fs.mkdir('.wrangler/qa-4b', { recursive: true });
  for (const drawing of drawings) {
    for (const width of [640, 280]) {
      await sharp(await fs.readFile(`src/media/${drawing}.svg`))
        .resize({ width }).png().toFile(`.wrangler/qa-4b/${drawing}-${width}.png`);
    }
  }
})();
'@ | node
```

Aprire le otto PNG locali per controllare geometrie, frecce e sovrapposizioni.
Le immagini a 280 px simulano la riduzione del solo vettoriale, non il layout
della pagina né un viewport browser. Le annotazioni lunghe si leggono in HTML.
Questi passaggi non installano Sharp o librerie grafiche nell'applicazione.
Per un successivo controllo manuale delle pagine, verificare soprattutto la
disposizione in colonna sotto 800 px e il confronto delle due configurazioni;
non interpretare la rasterizzazione come collaudo responsive completo.

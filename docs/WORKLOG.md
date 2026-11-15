# Registro di lavoro — Studio Forma

## 2026-11-15 — Milestone 1: fondamenta Qwik City SSR

### Autorizzazione e controlli iniziali

Lavoro limitato alla prima milestone. Letti integralmente `AGENTS.md` e
`docs/MVP.md` aggiornati, che richiedono Qwik City SSR e l'adapter Cloudflare
Pages. Nessuna modifica a questi due file. Un'unica sessione, nessun subagente,
worktree o lavoro su altri repository.

Controlli eseguiti:

```powershell
git status --short --branch
git branch -vv
git rev-parse develop origin/develop HEAD
git ls-remote origin refs/heads/develop refs/heads/feature/mvp-foundation
git switch -c feature/mvp-foundation develop
```

Working tree inizialmente pulito. `develop`, `origin/develop` e il riferimento
GitHub remoto coincidevano a `b5059dde2eea941dba094209633acd3044ee42f6`.
Nessun branch feature omonimo era presente. Nessun merge o rebase.

### Operazioni e decisioni

1. Consultate le documentazioni ufficiali Qwik, Tailwind e Cloudflare per
   l'integrazione SSR. Verificate nel registry npm le versioni stabili e le
   dipendenze compatibili. Qwik e Qwik City sono entrambi 1.20.4, Vite resta a
   7.3.7 perché Qwik City dichiara il vincolo `>=5 <8`.
2. Generato lo starter ufficiale in una cartella temporanea nel repository:
   `npx --yes create-qwik@1.20.4 empty .qwik-scaffold`. La CLI non ha inizializzato
   Git. Trasferiti solo sorgenti, public e configurazioni applicative; preservate
   specifiche e `.git`. La cartella temporanea è esclusa da Git e dalla build.
3. Eseguito `npm install`. Aggiunte le integrazioni ufficiali tramite
   `node node_modules/@builder.io/qwik/qwik-cli.cjs add cloudflare-pages --skipConfirmation=true`
   e lo stesso comando con `tailwind`. La CLI chiamata direttamente ha tentato
   un'installazione automatica con pnpm, non disponibile: l'aggiornamento dei
   file è riuscito; le dipendenze sono state installate esclusivamente con npm.
   Non è stato installato né usato pnpm come package manager del progetto.
4. Semplificata la configurazione Vite mantenendo `qwikCity`, `qwikVite`, alias
   TypeScript e plugin Tailwind. TypeScript strict esteso ad adapter e test, con
   `noUncheckedIndexedAccess`. ESLint applicato anche alla configurazione Vite e
   all'adapter, senza escludere i test.
5. Configurato l'adapter ufficiale con `build.ssr: true`, entry Cloudflare e
   piano delle rotte. Non aggiunti generatori statici alle pagine. Aggiornato
   Wrangler dalla major 3 proposta dallo starter alla stabile 4.162.0. Rimossi
   lo script di deployment e la preview Node alternativa; preview e serve usano
   il medesimo runtime locale Cloudflare.
6. Creati tema avorio/verde, wordmark, favicon e illustrazione SVG originale.
   Nessun font remoto, foto di terzi o dipendenza UI. La homepage comprende
   hero, manifesto, tre ambiti di progetto e invito al primo passo. Testi e
   illustrazioni dichiarano la natura fittizia.
7. Aggiunti layout condiviso, navigazione desktop/mobile, footer, skip link,
   focus visibile e riduzione del movimento. Menu Qwik con `useSignal`, stato
   ARIA, chiusura alla selezione e con Escape. Anchor HTTP reali, senza router
   SPA aggiuntivi. Estratti solo componenti effettivamente condivisi.
8. Aggiunte le sei rotte pubbliche e una 404. Le pagine interne contengono
   introduzioni essenziali. Il portfolio ha un concept illustrato, non tre
   schede complete. La richiesta progetto spiega che il questionario non è
   attivo: nessun campo, invio o flusso verticale anticipato.
9. Aggiunti `DocumentHead` specifici, canonical senza query/fragment e lingua
   italiana nell'HTML SSR. Nessun dominio pubblico o credenziale configurato.
10. Aggiunti due test di navigazione con `createDOM` e otto verifiche HTTP su
    produzione locale: artefatti, sei rotte pubbliche e 404. I test rimuovono gli
    script prima di verificare contenuti e SEO.
11. Scritta documentazione italiana riproducibile: README, architettura,
    deployment locale/rollback e caso studio. I comandi di formattazione sono
    limitati ai file applicativi, per preservare le specifiche preesistenti.

### Problemi incontrati e correzioni

- Il primo lint segnalava riferimenti letterali alle immagini locali. Spostato
  l'SVG in `src/media` e importato con ESM `?url`, conservando un asset vettoriale
  originale senza introdurre elaborazione raster o override di Sharp.
- Il primo test unitario non risolveva `@qwik-city-sw-register`. Aggiunto il
  plugin Qwik City alla configurazione Vitest e reso inline il pacchetto City
  nel runtime di test. Successivamente i due test sono passati.
- Vitest 3 dello sviluppo iniziale introduceva advisory critici tramite
  Tinypool. Sostituito con Vitest 4.1.12, compatibile con Vite 7 e senza quella
  dipendenza. npm 10 ha incontrato un errore Arborist `edgesOut` durante questo
  aggiornamento. `npx --yes npm@11.6.2 install` ha aggiornato il lockfile senza
  modificare npm globale né usare `--legacy-peer-deps` o `--force`.
- Un `npm ci` con Wrangler ancora attivo è fallito con `EPERM` sull'eseguibile
  esbuild. Fermato il server di questa sessione, poi ripetuto `npm ci` con esito
  positivo. Non modificati antivirus o permessi del sistema.
- La prima asserzione sul titolo SSR presupponeva `<title>` senza attributi;
  Qwik emette correttamente `<title q:head>`. Corretto il test per leggere il
  contenuto del titolo mantenendo il controllo esatto del testo.
- Il comando build dell'adapter stampa una fase SSG per il solo fallback 404.
  Verificata separatamente l'assenza di `dist/index.html` e la presenza del
  worker: non è un ripiego CSR/SSG per le pagine pubbliche.
- Alcuni comandi PowerShell hanno incontrato un errore di avvio del processo
  (`Accesso negato`); proseguito con shell cmd e percorsi di lavoro espliciti.
  Una prima pulizia ricorsiva della cartella temporanea è stata rifiutata
  automaticamente: non ripetuta; la cartella generata è rimasta ignorata.

### Verifiche finali

| Verifica eseguita | Esito |
| --- | --- |
| `npm ci` con server fermo | Superato, installazione dal lockfile con npm 10.9.2 |
| `npm run typecheck` | Superato, TypeScript strict |
| `npm run lint` | Superato, zero errori e warning |
| `npm test` | Superato, 2 test di navigazione Qwik |
| `npm run fmt.check` | Superato, formattazione applicativa coerente |
| `npm run build` | Superato, client + server SSR + tipi + lint |
| `npm run serve` | Worker compilato da Wrangler 4.162.0 e avviato in locale su 127.0.0.1:8794 |
| `npm run test.ssr` | Superato, 8 test: artefatti, 6 pagine e 404 |
| Browser Playwright su build di produzione locale | Superato, come dettagliato sotto |
| `npm audit` | Non pulito: 12 advisory, 8 moderate e 4 high, nessun critical |
| `git diff -- AGENTS.md docs/MVP.md` | Nessuna modifica alle specifiche |

La build genera `dist/build`, `dist/assets`, `dist/q-manifest.json`, moduli
intermedi in `server`, `dist/_worker.js`, `dist/_routes.json` e il fallback
`dist/404.html`. Non genera `dist/index.html`. Le sei richieste dirette a
`/`, `/studio/`, `/servizi/`, `/portfolio/`, `/contatti/` e
`/richiedi-un-progetto/` restituiscono HTTP 200, `q:render="ssr"`, un H1,
contenuti utili, lingua italiana, titolo e descrizione specifici, canonical e
dichiarazione demo. Una rotta inesistente restituisce HTTP 404. Gli script sono
rimossi dal documento prima delle asserzioni: prova sull'HTML HTTP reale della
build di produzione, non simulazione CSR e non solo dev server.

Nel browser, in una scheda dedicata, eseguiti i seguenti controlli:

1. Viewport 390×844: aprire Menu; controllare `aria-expanded=true`; portare il
   focus al link Studio e premere Escape; controllare chiusura e ritorno del
   focus al pulsante. Riaprire e selezionare Studio: verificare URL, H1 e menu
   chiuso dopo la navigazione HTTP. Tutto superato.
2. Visitare tutte le sei rotte a larghezze 320, 390, 768 e 1440 px: verificare
   `document.documentElement.scrollWidth <= innerWidth`, H1 unico e caricamento
   delle immagini. Tutte le 24 combinazioni superate.
3. Ricaricare la home e premere Tab: focus sullo skip link con outline visibile;
   Enter porta il focus a `main`. Superato.
4. Nessun evento `pageerror` nella scheda durante questi controlli. Catture full
   page della home a 1440×1000 e 390×844, aperte e ispezionate visivamente:
   [desktop](evidence/home-desktop.png), [mobile](evidence/home-mobile.png).

Una prima prova browser non è stata conteggiata come superata (connessione
interrotta/timeout sul viewport della scheda condivisa). L'ambiente non consente
la creazione di un nuovo browser context; la verifica completata ha usato una
nuova scheda nello stesso browser, chiusa al termine. Non sono state installate
alternative di automazione native. Le prove riguardano il browser disponibile
tramite Playwright, non dimostrano copertura Safari/Firefox o screen reader.

Gli advisory high sono ereditati da `@builder.io/qwik-city` attraverso
`vite-imagetools`/`sharp` e `zod`; gli altri sono nella catena ESLint/TypeScript
tramite `minimatch`. Le cardinalità includono pacchetti propagatori, non dodici
vulnerabilità indipendenti. Non vengono elaborate immagini caricate dall'utente
né validati input esterni in questa milestone, ma non si rivendica assenza di
rischio. L'audit rimane un residuo da valutare prima di pubblicare. Gli avvisi
di deprecazione dello starter e il warning ambientale NO_COLOR/FORCE_COLOR non
impediscono build o test. Nessuna modifica di configurazione globale.

Le ultime modifiche a `vite.config.ts` e `src/lib/navigation.ts` dopo la build
sono esclusivamente di formattazione Prettier (virgolette e disposizione delle
righe); nessuna variazione di configurazione o comportamento. Il server Wrangler
di questa sessione è stato arrestato al termine delle verifiche.

### Residui e prossimo passo

- Milestone 2: contenuti completi e almeno tre schede di progetti fittizi.
- Milestone 3: questionario, validazioni, riepilogo modificabile, ripristino e
  testo copiabile, senza invio e senza dati personali obbligatori.
- Milestone 4: audit esteso di accessibilità, compatibilità browser e
  preparazione finale alla pubblicazione, sempre senza deploy automatico.
- Prima di pubblicare, rivalutare gli advisory transitivi dello stack stabile.
  Nessun override a major incompatibili di Zod/Sharp e nessun downgrade di Qwik
  City è stato applicato per azzerare artificialmente il report npm.

Queste attività residue non sono state avviate. Nessun deploy o cambiamento ai
servizi Cloudflare, nessun merge/rebase/force push; commit e push limitati al
branch `feature/mvp-foundation`, con firma GPG disabilitata solo per ciascun
comando `git -c commit.gpgsign=false commit`.

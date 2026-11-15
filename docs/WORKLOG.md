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

## 2026-11-15 — Milestone 2: identità tecnica e contenuti

### Perimetro e stato iniziale

Prosecuzione autorizzata sul branch esistente `feature/mvp-foundation`, partendo
da `c90f4399bfe735ae279ee1bf756993d8b946955d`. Working tree pulito e riferimento
remoto del branch coincidente, verificati con `git status --short --branch`,
`git log -3 --oneline` e `git ls-remote origin refs/heads/feature/mvp-foundation`.
Letti AGENTS, MVP e tutti i documenti della foundation. Nessuna modifica a
`AGENTS.md` o `docs/MVP.md`, nessun nuovo branch, subagente o worktree.

Obiettivo: nuova identità contemporanea, rigorosa e sperimentale, contenuti
completi, tre schede e preparazione visuale della richiesta. Nessun questionario
interattivo, backend business o servizio aggiuntivo.

### Interventi e motivazioni

1. Definita la direzione in `docs/BRAND_DIRECTION.md`: grafite `#171C20`, cemento
   `#EAE9E4`, blu tecnico `#2F59C4`, acciaio `#86919A`; titoli sans-serif,
   griglie, registri, numerazioni e cartigli. Il testo secondario usa neutri
   più scuri dell'acciaio per mantenere leggibilità sul fondo chiaro.
2. Sostituito il design system in `src/global.css`, preservando Tailwind e i
   token `@theme`. Eliminati verde/lime e corsivo serif. Aggiornati favicon,
   manifest e theme-color, senza cambiare dipendenze o configurazione SSR.
3. Ricomposta la homepage: registro, titolo ampio a tutta larghezza, descrizione
   sintetica, tavola volumetrica, posizione dello studio, archivio, ambiti e
   introduzione alla richiesta. Non sono stati consultati o modificati altri siti.
4. Realizzate tre tavole SVG originali per Corte 01, Officina 02 e Interno 03.
   La vecchia illustrazione verde è stata rimossa dai sorgenti. I riferimenti
   X/Y/Z sono coordinate locali astratte; le tavole sono schemi non in scala.
   Nessun asset esterno o font da scaricare; provenienza e uso sono documentati.
5. Introdotto `src/lib/projects.ts` con tre record tipizzati. Estratti soltanto
   `ProjectCard` e `ProjectDetail`, riusati da homepage, archivio e schede. Le
   tre pagine hanno rotte esplicite in `src/routes/portfolio/`, senza API o
   caricamento dati remoto. Un helper produce i metadati delle singole schede.
6. Completate le schede con contesto, programma, superficie ipotetica, domanda,
   ipotesi, tre scelte, materiali e navigazione al progetto successivo. Lista e
   dettaglio dichiarano il carattere concettuale/fittizio; nessuna realizzazione,
   commessa, misura certificata o prestazione viene presentata come reale.
7. Completate Studio, Servizi e Contatti. Metodo e ambiti sono specifici;
   gli elaborati restano concettuali. Contatti usa collegamenti utili e FAQ
   native `details/summary`, senza recapiti, team o riconoscimenti inventati.
8. Preparata Richiedi un progetto con tre nuclei informativi e un facsimile
   statico riconoscibile. Nessun campo, step interattivo, generazione, copia,
   salvataggio o invio. Riferimenti alle milestone sono confinati ai documenti,
   mentre l'interfaccia descrive chiaramente ciò che è disponibile.
9. Preservato il menu Qwik e aggiunto `aria-current="location"` a Portfolio
   nelle schede figlie. Esteso il test di navigazione per questo comportamento.
   Aggiornati i test HTTP a nove pagine, verificando contenuti delle schede,
   collegamenti dall'archivio e assenza di controlli del questionario.
10. Aggiornati README, ARCHITECTURE, DEPLOYMENT e CASE_STUDY. Conservate le
    catture della foundation come storia e aggiunte catture distinte `m2-*`.

### Comandi e verifiche

Dipendenze già presenti e input di installazione invariati: non è stata
necessaria una nuova installazione. Non modificati package.json o lockfile.
Comandi eseguiti dalla radice del repository:

```powershell
npm run fmt
npm run typecheck
npm run lint
npm test
npm run build
npm run serve
npm run test.ssr
```

Il server di verifica usa esclusivamente Wrangler locale e la build di
produzione su `127.0.0.1:8794`. Nessun login o deploy. Esiti finali e controlli
browser:

| Verifica | Risultato finale |
| --- | --- |
| `npm run typecheck` | Superato, TypeScript strict |
| `npm run lint` | Superato, zero errori/warning |
| `npm test` | Superato, 3 test del menu e della posizione nel portfolio |
| `npm run build` | Superato, client e server SSR, tipi e lint |
| `npm run test.ssr` | Superato, 11 test sulla build di produzione in Wrangler |
| `npm run fmt.check` | Superato |
| Browser Playwright | Superato, 36 combinazioni pagina/larghezza e interazioni sotto elencate |
| Diff specifiche, dipendenze e adapter | Nessuna modifica |

Le richieste HTTP dirette coprono le nove pagine e verificano contenuti utili,
titoli, descrizioni, canonical, lingua, H1 unico e dichiarazione demo dopo aver
rimosso gli script dal documento. Le schede espongono i dati di progetto e il
carattere fittizio già nell'HTML SSR. Verificati anche gli artefatti worker/client,
l'assenza di homepage SSG, la 404 e l'assenza di form o controlli del questionario.
La seconda esecuzione dei test SSR, dopo le correzioni visuali, è passata.

Controllo browser in una scheda dedicata della sessione Playwright, chiusa alla
fine, sempre contro la build di produzione locale:

- Nove pagine a 320, 390, 768 e 1440 px: nessun overflow orizzontale, un H1,
  immagini caricate e nessun campo/form. Tutte le 36 combinazioni superate.
- Primo Tab sullo skip link, outline visibile, Enter con focus sul main.
- Apertura menu, Escape con ritorno del focus e navigazione reale
  archivio → Corte 01. Link Portfolio riconosciuto come posizione corrente.
- CTA attiva di richiesta nel menu mobile: testo `rgb(234, 233, 228)` sul
  fondo blu, non dello stesso colore del fondo.
- Apertura delle FAQ native in Contatti.
- Nessun evento `pageerror` nel contesto delle verifiche.

Catture full page aggiornate dopo le correzioni, aperte e controllate:

- [Home desktop 1440×1000](evidence/m2-home-desktop.png)
- [Home mobile 390×844](evidence/m2-home-mobile.png)
- [Portfolio desktop](evidence/m2-portfolio-desktop.png)
- [Scheda Corte 01 mobile](evidence/m2-project-mobile.png)
- [Anteprima richiesta desktop](evidence/m2-request-desktop.png)

Il browser disponibile tramite Playwright non costituisce una matrice
Safari/Firefox né una prova con screen reader. Nessuna certificazione WCAG
completa o metrica prestazionale viene dedotta da questi controlli. Nessun
nuovo audit npm eseguito: gli advisory riportati nella sezione foundation sono
storici; dipendenze e lockfile sono invariati in questa milestone.

### Problemi rilevati e correzioni

- Il DOM leggero del test runner Qwik restituisce `undefined` per un selettore
  senza risultati, anziché `null`: la nuova asserzione sul link attivo è stata
  adattata all'assenza dell'elemento. I test sono stati rieseguiti con successo.
- La prima cattura mobile mostrava un'area insufficiente per la freccia nel
  cartiglio della hero. Aumentata l'altezza minima e portato il bersaglio del
  link a 44×44 px, senza modificare l'ordine dei contenuti.
- La revisione dei selettori responsive ha individuato una sovrapposizione tra
  colore del link attivo e fondo della CTA di richiesta. Reso esplicito il
  testo cemento sul fondo blu nel menu mobile.

### Residui

La milestone 3 resta da avviare. La revisione estesa di accessibilità e browser
resta alla milestone 4. Le dipendenze e gli advisory della foundation non sono
stati oggetto di aggiornamento o remediation in questo intervento.
Nessun merge, rebase, force push, deployment o modifica ai servizi Cloudflare.
Server locale della sessione arrestato dopo le verifiche. Commit e push
limitati al branch esistente, con GPG disabilitato soltanto per il comando di
commit, senza modifica permanente della configurazione Git.

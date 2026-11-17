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

## 2026-11-15 — Milestone 3: generatore di brief architettonici

### Perimetro e stato iniziale

Lavoro sul branch esistente `feature/mvp-foundation`, a partire da
`caad2a47b8502d7e42561eed0177cb40efa310b3`. Working tree inizialmente pulito;
`git ls-remote origin refs/heads/feature/mvp-foundation` confermava lo stesso
commit. Letti integralmente AGENTS e MVP, e la documentazione tecnica e visuale
esistente. Nessun nuovo branch, subagente, worktree o lavoro su altri repository.

Obiettivo: trasformare l'anteprima in un percorso locale funzionante, mantenendo
Qwik City SSR e l'identità architettonica. Nessuna modifica a specifiche, adapter,
configurazione di hosting, dipendenze o lockfile.

### Implementazione e decisioni

1. Creato `src/lib/brief.ts`: modello, opzioni, stato iniziale indipendente,
   validazioni per passaggio e controllo completo prima della generazione.
   Superficie con punto/virgola, >0 e <=100.000 m², massimo due decimali;
   caratteristiche 10–400 caratteri e descrizione 20–2.000 dopo trim. Budget
   per fasce facoltativo, almeno un obiettivo, opzioni controllate.
2. Implementato `BriefBuilder` con `useStore`, `useSignal` e gestori `$` Qwik.
   Quattro passaggi: immobile, obiettivi/stile, risorse/tempi/descrizione e
   riepilogo. `ChoiceGroup` è l'unica astrazione di campo condivisa, usata per
   i gruppi radio. Nessuna libreria di form o componente React.
3. Avanti/indietro preservano le risposte. Dal riepilogo ogni sezione è
   modificabile e torna alla revisione dopo la validazione, senza ripetere i
   passaggi successivi. Il controllo completo impedisce brief incompleti.
4. Documento con cartiglio, codice SF—BP, sezioni strutturate e dichiarazione
   demo/non inviato. Riepilogo, documento e testo copiato usano la stessa
   sorgente di sezioni. I testi liberi sono escapati da Qwik e mantengono
   gli a capo; non sono interpretati come HTML.
5. Copia con Clipboard API dopo click, annuncio di successo solo a Promise
   risolta. Rifiuto o API assente mostrano testo readonly e selezione manuale.
   Un contatore invalida gli esiti di copie precedenti dopo modifica/reset.
6. Ripristino inline con scelta Mantieni/Azzera. Le risposte restano soltanto
   nella pagina: nessun localStorage, sessionStorage, backend o invio. Reload
   o uscita le perdono; questa durata è dichiarata prima della compilazione.
   Non si chiedono dati personali e i testi di aiuto invitano a non inserirli.
7. Conservati palette e linguaggio delle tavole. Aggiunti layout responsive,
   progresso, scelte, messaggi e documento finale; rosso scuro solo per errori.
   Aggiornati i rimandi in home, footer e FAQ perché non descrivano più
   un'anteprima inattiva.
8. Accessibilità: fieldset/legend, label, campi obbligatori espliciti,
   aria-invalid/describedby, riepilogo errori con role=alert, stato della copia
   con role=status e gestione del focus nel codice. Il contenitore role=form
   non è un form HTML: nessun submit nativo è possibile, nemmeno senza JS.
   Noscript spiega il requisito JavaScript per il generatore.
9. Aggiornati README, ARCHITECTURE, BRAND_DIRECTION, DEPLOYMENT e CASE_STUDY.
   La procedura manuale completa è in DEPLOYMENT. La milestone 4 non è avviata.

### Verifiche effettivamente eseguite

Dipendenze già installate e invariate; nessuna reinstallazione necessaria.
Comandi dalla radice del repository:

```powershell
npm run fmt
npm run typecheck
npm run lint
npm test
npm run fmt.check
npm run build
npm run serve
npm run test.ssr
```

| Controllo | Esito |
| --- | --- |
| Typecheck strict | Superato |
| Lint | Superato, zero errori/warning |
| Unit test e DOM Qwik | Superati, 27 test in 3 file |
| Formattazione | Superata |
| Build produzione | Superata, client e server SSR, tipi e lint |
| Runtime locale Wrangler | Worker compilato e servito su 127.0.0.1:8794 |
| Verifiche HTTP SSR | Superate, 11 test sulle 9 pagine, artefatti e 404 |
| Browser Playwright | Bloccato dal servizio MCP; non superato né conteggiato |

I test puri coprono superficie valida/non valida e limiti, trim dei testi,
obiettivi, scelte sconosciute, budget assente/presente, documento incompleto,
normalizzazione, aggiornamento e stato iniziale indipendente.

Il test del componente Qwik esegue errori iniziali, compilazione, selezioni,
avanti/indietro con conservazione, modifica dal riepilogo, generazione, copia
simulata positiva/negata, testo manuale e reset mantenuto/confermato. Un secondo
test verifica label, required, riferimenti aria-describedby, aria-invalid,
riepilogo errori e assenza di submit nativo. Questi test usano il DOM leggero
Qwik: requestAnimationFrame è simulato senza eseguire il focus; Clipboard è
simulata. Non dimostrano focus, tastiera o appunti del sistema reale.

Le richieste HTTP alla build di produzione verificano contenuti, SEO, lingua,
H1 e dichiarazione demo senza eseguire JS. Dalla milestone 3 la pagina del
generatore deve contenere passaggio iniziale e campi con label già via SSR,
noscript e nessun form HTML o pulsante submit. Le altre pagine mantengono i
controlli della milestone 2. Non è stata usata una build CSR o SSG sostitutiva.

### Limite della verifica browser

Tentati `playwright/browser_navigate` e un controllo in una scheda dedicata con
`playwright/browser_run_code_unsafe`. Entrambi hanno restituito:

```text
timed out awaiting tools/call after 300s
```

Il timeout riguarda la chiamata al servizio MCP, non un'asserzione del percorso.
Il runtime HTTP locale ha risposto regolarmente ai test. Non sono stati
installati browser o sostituti di automazione nativi. Non sono state create
catture visuali della milestone 3 e non sono riutilizzate quelle precedenti come
prova del nuovo questionario. Restano da eseguire controllo visuale responsive,
focus effettivo, navigazione completa da tastiera e copia reale nel browser.
Non vengono dichiarate conformità WCAG o compatibilità cross-browser complete.

### Residui e confini

Funzionalità della milestone implementate; limite aperto sulla verifica browser
per indisponibilità del servizio. Procedura manuale pronta in DEPLOYMENT.
Nessun nuovo audit npm: gli advisory della foundation rimangono storici e le
dipendenze non sono cambiate. Nessun merge, rebase, force push, deployment,
provisioning o modifica ai servizi Cloudflare. Commit/push sul branch corrente,
con firma GPG disattivata soltanto per ciascun comando commit.
Server Wrangler della sessione arrestato al termine; nessun processo locale
lasciato in esecuzione da questa attività.

## 2026-11-15 — Milestone 4A e ripresa esclusiva Playwright

### Risultato e perimetro

Collaudata la build Qwik City SSR con Wrangler locale, senza pubblicazione.
Corrette due anomalie circoscritte del questionario: focus sugli elementi
condizionali ed etichetta del pulsante durante la modifica dal riepilogo.
Nessun restyling, nuova funzione, dipendenza o modifica alle specifiche.

La successiva richiesta di esecuzione Playwright esclusiva ha limitato la ripresa
ai controlli mancanti. Non sono state ripetute le 40 combinazioni delle pagine
già esaminate. Completati i passaggi intermedi responsive e la sequenza da
tastiera con copia/reset. Rimane non conclusivo un click automatizzato a 320 px:
il risultato parziale è conservato, non dichiarato interamente superato.

| Controllo | Esito effettivo ed evidenza |
| --- | --- |
| Typecheck strict e lint | Superati dopo le correzioni; lint senza warning |
| Unit test e DOM Qwik | 27 test superati in 3 file |
| Build di produzione | Superata: client, server SSR, tipi e lint |
| HTTP senza JavaScript client | 11 test superati: nove rotte, artefatti e 404 |
| Pagine responsive | Home, Studio, Servizi, Portfolio, Contatti, Richiedi un progetto, tre schede e 404 esaminate a 1440/768/390/320 px; nessun overflow riprodotto, H1 unico, immagini caricate dopo scroll |
| Contrasto HTML e menu | Report layout superato su 40 combinazioni; menu con Enter/Tab/Escape a 768/390/320, destinazione Servizi e FAQ con Enter |
| Questionario nella ripresa esclusiva | 37 controlli superati prima del timeout dell'azione mouse; report complessivo correttamente `failed` |
| Tastiera, copia e reset a 320 px | Report separato `passed`, 8 controlli; tutti i passaggi raggiunti con Tab/Space/frecce/Enter, nessun invio mutante all'origine locale o pageerror |
| Clipboard | writeText reale risolto positivamente; negazione simulata separatamente, testo completo selezionabile e focus verificati. Nessuna rilettura dagli appunti del sistema |
| Audit dipendenze | 12 pacchetti segnalati: 4 high, 8 moderate, 0 critical. Nessun aggiornamento forzato; analisi in DEPENDENCY_AUDIT |

I numeri del browser sono asserzioni dell'harness, non test Vitest aggiuntivi.
Non si sommano le esecuzioni ripetute per presentare un unico test interamente
verde. Il dettaglio è in [evidence/4a/README.md](evidence/4a/README.md).

### Controlli iniziali e continuità Git

Letti AGENTS, MVP, BRAND_DIRECTION e documentazione esistente. All'inizio della
4A il working tree era pulito, sul branch feature/mvp-foundation; HEAD e remoto
coincidevano a `698f1a1548b1336d18f40201a8ffd25b72ac1994` (milestone 3).
Verificati con `git status --short --branch`, `git rev-parse HEAD` e
`git ls-remote origin refs/heads/feature/mvp-foundation`.

Alla ripresa esclusiva il working tree conteneva le modifiche di questa stessa
4A non ancora committate: sono state preservate. Nessun cambio branch, subagente,
worktree, merge o rebase. AGENTS.md, docs/MVP.md, package.json e lockfile invariati.

### Difetti applicativi riprodotti e correzioni

1. Continua senza risposte mostrava role=alert, ma document.activeElement restava
   sul pulsante Continua. Il requestAnimationFrame poteva anticipare il rendering
   Qwik dell'elemento condizionale. Sostituito con richiesta di focus via signal
   e un useVisibleTask$ dopo il rendering; stesso meccanismo per conferma/reset
   e titolo dei passaggi. Il segnale iniziale è vuoto: nessun focus rubato al
   caricamento. Eccezione ESLint limitata a quell'effetto DOM; compromesso sul
   caricamento client documentato in ARCHITECTURE. Verificati focus errori,
   Mantieni le risposte e ritorno al comando di reset nel browser reale.
2. Modifica Intervento e immobile tornava ai campi corretti, ma il pulsante
   manteneva il testo Continua pur confermando direttamente la revisione.
   Aggiunta una key per passaggio/modalità al pulsante primario. Il controllo
   browser per nome accessibile Conferma la modifica ora raggiunge la revisione
   aggiornata (95,50 → 95,5 m²), senza ripetere i passaggi successivi.
3. Rimossi dai test DOM gli stub requestAnimationFrame non più utilizzati.
   I test DOM continuano a simulare Clipboard e non sostituiscono le prove browser.

Nessun cambiamento ulteriore al codice applicativo durante la ripresa esclusiva.
Non ripetuti typecheck, lint, 27 test e build già superati sulla stessa versione
applicativa: modificati soltanto harness e documentazione. Rieseguiti con esito
positivo `node --check` sui due harness, `npm run fmt.check` e `git diff --check`.

### Operazioni locali e comandi

Baseline Node 22.16.0, npm 10.9.2; dipendenze già installate e invariate.
Eseguiti nella 4A, prima e dopo le correzioni secondo necessità:

```powershell
npm run typecheck
npm run lint
npm test
npm run fmt
npm run build
npm run fmt.check
npm run serve
npm run test.ssr
npm audit --json
npm ls sharp zod minimatch vite-imagetools
npm explain sharp --json
```

Wrangler 4.162.0, origine 127.0.0.1:8794, compatibility date 2026-11-15 e
nodejs_als, script serve esistente. Nessun --remote o login. Prima della ripresa
Playwright verificata via Invoke-WebRequest la rotta /richiedi-un-progetto/:
HTTP 200, contenuti Studio Forma e Intervento e immobile nell'HTML.
Riutilizzato il runtime di questa sessione, senza creare un'istanza concorrente.

Durante le ricostruzioni sono rimasti due processi Wrangler figli dopo la
chiusura del wrapper PowerShell con Ctrl+C. Individuati tramite porta, PID,
parentela e comando contenente il percorso esatto di questo repository;
arrestati soltanto gli alberi identificati come avviati da questa attività.
Il runtime finale è stato avviato a build conclusa e controllato sulla porta del
progetto. Nessun processo browser condiviso terminato,
riavviato o riconfigurato. La procedura ordinaria è aggiornata in DEPLOYMENT.

Gli harness ricevono una Page Playwright, creano una scheda propria e la chiudono
in finally. Nella ripresa controllati origine, pathname e viewport prima delle
sequenze. La prima esecuzione mirata usa skipPublicPages; quella successiva
keyboardOnly. Nessun browser o pacchetto di automazione installato nel progetto.
La VM MCP non supporta import dinamici: eseguito il corpo delle funzioni, con
percorso catture locale; report restituiti salvati dal processo Node locale.

### Prove funzionali e visuali

Verificati errori iniziali e focus, radio con frecce, campo caratteristiche sotto
il minimo e al massimo di 400, superfici 0/-1/100001/1e2/95,123 rifiutate,
0,01 e 100000 accettate, conservazione avanti/indietro, obiettivi/stile richiesti,
budget omesso, tempi richiesti, descrizione 19 rifiutata/20 accettata e massimo
2000. Riepilogo modificabile, budget presente, normalizzazione della superficie
e testo contenente markup reso letterale senza esecuzione di script.

Passaggi obiettivi, risorse, riepilogo e documento finale senza overflow ai
quattro viewport. Catture rappresentative desktop/mobile di home, archivio,
scheda, Studio, Servizi, Contatti, stati del questionario e copia manuale.
Ispezionate anche le composizioni delle dieci pagine ai quattro viewport tramite
catture locali di confronto; nel repository conservata una selezione di 20 PNG
più la cattura diagnostica del click non conclusivo. Testo libero lungo senza
spazi contenuto correttamente nel riepilogo.

La prova esclusiva da tastiera a 320 px completa tutti i passaggi, copia,
fallback su rifiuto simulato, selezione integrale, reset annullato e confermato,
focus e perdita dello stato al reload. Nessuna richiesta non-GET/HEAD all'origine
locale durante tale prova. L'osservazione non riguarda tutto il traffico del
browser host, che può includere estensioni o software esterno all'applicazione.

### Problemi dell'automazione distinti dai difetti applicativi

- Un'immagine lazy non è necessariamente decodificata al primo load della pagina:
  il controllo dell'harness ora include lo scroll prima di verificarla.
- Alcune asserzioni immediate dopo input/click correvano prima del rendering
  reattivo. Aggiunte attese sulla condizione DOM attesa, senza timeout arbitrari
  o modifica delle regole di validazione. Il menu attende anche il nav visibile
  prima del Tab, non soltanto aria-expanded.
- L'ultimo tentativo generale precedente all'esclusività si è fermato su
  scrollIntoViewIfNeeded della tavola Officina 02: attesa di stabilità di circa
  8 secondi. Conservato browser-attempt-before-exclusivity.json, con 27 delle
  40 combinazioni raggiunte. Non conteggiato come esecuzione generale superata.
- Nella ripresa esclusiva browser-report.json raggiunge 37 controlli e si ferma
  su Copia il brief a 320 px: locator.click, attesa visible/enabled/stable,
  timeout 8000 ms. Il pulsante è presente nella cattura; causa dell'attesa non
  accertata. Non è stato ripetuto o forzato quel click. La distinta modalità
  tastiera conclude copia e reset, come documentato in keyboard-report.json.
- Questi sono timeout di azione con servizio MCP che restituisce un risultato,
  non i timeout tools/call da 300 secondi della milestone 3. Nessun pageerror
  rilevato nelle prove del questionario. Non attribuita senza prova la causa
  ad altre sessioni o a un difetto CSS; nessuna correzione speculativa.

### Audit e documentazione

Creati CONTENT_AUDIT per tutte le pagine e DEPENDENCY_AUDIT per catene Sharp,
Zod e Minimatch. Priorità editoriale: ulteriori tavole esplicative nelle tre
schede, metodo dimostrato con un caso, CTA del brief più uniformi; proposte
registrate, non implementate. Analizzati 68 moduli JS finali client/server e
registrati hash/import/marcatori: nessun marcatore dei tre pacchetti rilevato.
Analisi statica circoscritta, non attestazione di assenza di vulnerabilità.
README, ARCHITECTURE, DEPLOYMENT e CASE_STUDY aggiornati mantenendo lo storico.

### Residui e chiusura

Restano: eventuale prova manuale del click mouse/touch a 320 px nel browser
desiderato, incolla in un editor per rileggere gli appunti, screen reader e
compatibilità Safari/Firefox. Il contrasto HTML calcolato non include testi negli
SVG, bordi, pseudo-elementi o tutti gli stati dinamici; nessuna certificazione
WCAG. Advisory dipendenze ancora aperti, da rivalutare prima di pubblicare.

Chiuse le schede create in esclusiva e rilasciato Playwright MCP al termine
delle prove; nessuna ulteriore chiamata browser durante documentazione e Git.
Arrestato l'albero del runtime avviato nella ripresa (root Node 64300, CLI 32000),
verificandone comando e parentela prima della chiusura. Dopo l'arresto sulla
porta 8794 risulta ancora un'istanza precedente dello stesso repository
(workerd 45416, parent 64924, avvio 17:01): proprietà non accertata, quindi non
terminata. Non vengono dichiarati spenti tutti i processi del repository.
Nessun intervento su browser o altri progetti. Commit e push sul solo branch corrente
con `git -c commit.gpgsign=false commit`, senza modificare la configurazione Git.
Nessun merge, rebase, force push, deployment o modifica a servizi Cloudflare.
Non avviate attività successive alla 4A.

## 2026-11-16 — Milestone 4B: letture architettoniche dei progetti

### Risultato e perimetro

Consegnati quattro SVG originali nelle tre schede esistenti, con spiegazioni
di problema, ipotesi e soluzione, didascalie e annotazioni HTML. Studio collega
il metodo alla pianta di Corte 01 con un rimando puntuale. Nessuna nuova rotta,
interazione, libreria grafica applicativa o modifica al generatore di brief.

Letti AGENTS.md, MVP, BRAND_DIRECTION, CONTENT_AUDIT, dati dei progetti e worklog.
Working tree inizialmente pulito. Branch corrente feature/mvp-foundation;
HEAD e remoto coincidevano a `ee22cf3af9fa02bd1f4cbb99b550c360996ba89b`.
Verificati con git status, rev-parse e ls-remote. Nessun subagente, worktree,
nuovo branch, merge o rebase. AGENTS.md e docs/MVP.md preservati.

### Elaborati e decisioni

1. **Corte 01 / 01.02:** pianta schematica a U. Il percorso blu entra nel filtro
   laterale, cambia direzione verso la corte e si dirama verso giorno e notte.
   La diramazione tratteggiata distingue la stanza più interna. Le tre note
   spiegano ingresso, centro distributivo e soglie; non sostituiscono uno studio
   dimensionale o esecutivo.
2. **Officina 02 / 02.02:** sezione trasversale con telaio a doppia falda in
   grafite e nuovi laboratori blu tratteggiati. Il vuoto sopra i laboratori,
   l'arretramento dai pilastri e la dorsale centrale esprimono conservazione,
   separazione e inserimento. Il segno di distacco non è una quota misurata;
   il telaio non costituisce una verifica strutturale.
3. **Interno 03 / 03.02–03.03:** due piante con identici perimetro, nucleo e
   arredi. I pannelli raccolti aprono la relazione tra comune e lavoro;
   distesi ne segnano il limite. Frecce e tratteggio distinguono movimento e uso.
   Nessuna promessa di isolamento acustico o prestazione certificata.
4. Esteso il modello Project con study tipizzato: motivazioni, tavole e note.
   ProjectDetail mantiene contenuti e immagini introduttive, aggiungendo una
   section con dl e figure/figcaption. La numerazione della materia passa a 04.
   Nessun nuovo livello architetturale o stato client.
5. Layout circoscritto ai nuovi elaborati: disegno/didascalia affiancati per le
   tavole singole, confronto a due colonne per Interno; una colonna sotto 800 px.
   SVG con dimensioni intrinseche, alt specifico e aria-describedby alla didascalia.
   Le annotazioni estese sono testo HTML leggibile, anche quando il disegno
   viene ridotto su mobile. Ogni SVG ha inoltre title/desc per uso autonomo.
6. Studio aggiunge un solo esempio sintetico e link a
   /portfolio/corte-01/#lettura-progettuale, senza duplicare la scheda.
7. Provenienza, inventario e limiti in ASSETS.md. Aggiornati README, ARCHITECTURE,
   CASE_STUDY, DEPLOYMENT e il riscontro dell'audit contenuti. Le altre proposte
   della 4A non vengono implementate in questa milestone.

Tutti gli elaborati mantengono grafite, cemento, blu tecnico e griglie. Progetti
concettuali, fittizi e non realizzati; schemi non in scala, misure e superfici
ipotetiche. Nessuna prestazione tecnica certificata. Sorgenti originali disegnati
nel repository, senza asset o font remoti; dipendenze e lockfile invariati.

### Verifiche effettivamente eseguite

Baseline locale Node/npm del progetto, dipendenze già installate. Dalla radice:

```powershell
npm run fmt
npm run typecheck
npm run lint
npm test
npm run build
npm run fmt.check
npm run serve
npm run test.ssr
git diff --check
```

| Controllo | Esito |
| --- | --- |
| Typecheck TypeScript strict | Superato |
| Lint Qwik | Superato, senza warning |
| Test locali esistenti | 27 superati in 3 file, inclusa regressione del brief |
| Build | Superata, client e server SSR dell'adapter ufficiale |
| Formattazione | Superata |
| HTTP SSR esistente | 11 controlli superati sulle nove rotte, artefatti e 404 |
| Contenuti 4B nelle risposte dirette | HTTP 200, nuove figure 1/1/2 nelle tre schede; altrettante associazioni aria-describedby, testi e dichiarazione presenti senza eseguire JS |
| Rimando Studio | Link alla nuova ancora Corte 01 presente nell'HTML SSR |
| Asset della build | Tutti e quattro i payload SVG delle immagini SSR coincidono byte per byte con i sorgenti finali |
| SVG XML | Quattro documenti validi, viewBox 0 0 640 600, title/desc presenti |
| Ispezione dei vettoriali | Rasterizzazioni locali a 640 e 280 px dei quattro SVG esaminate visivamente |
| Browser / E2E | Non eseguiti, come richiesto; nessuna chiamata Playwright MCP e nessun nuovo test E2E |

La verifica visuale ha rilevato sovrapposizioni iniziali di scritte con arredi e
travi: spostate le etichette e la diramazione tratteggiata di Corte 01, separato
il titolo del telaio dalla struttura di Officina. Aggiunta la stessa apertura
del nucleo nelle due piante di Interno e uniformata la lunghezza rappresentata
dei pannelli raccolti. Riesaminate le rasterizzazioni dopo le correzioni; la
build e i controlli HTTP usano gli SVG finali, verificati anche nei payload.

La rasterizzazione usa Sharp già installato nella toolchain di Miniflare,
solo come strumento locale di verifica. Non viene introdotto nell'app. Le otto
PNG e lo script temporaneo sono nella directory ignorata .wrangler/qa-4b;
procedura autonoma di riproduzione in DEPLOYMENT. Non sono screenshot del sito
e non dimostrano la resa delle pagine nei viewport browser.

Wrangler avviato soltanto dopo la build, su 127.0.0.1:8794 tramite lo script
serve esistente. Prima dell'avvio non risultavano listener né CLI Pages di
questo repository. Identificati i processi creati (root Node 60808, CLI 57568)
e arrestato solo il loro albero dopo i controlli. Nessun browser condiviso o
processo di altri progetti modificato. Nessun binding remoto o servizio Cloudflare
utilizzato o modificato; nessun deployment.
Confermato il rilascio della porta 8794 dopo la chiusura.

Durante i controlli finali il lanciatore shell ha restituito CreateProcess /
Accesso negato prima dell'esecuzione. Completati i controlli Git e la consegna
invocando direttamente la CLI Git da Node locale, con gli stessi argomenti e
directory di lavoro; nessuna modifica a permessi o configurazioni di sistema.
I comandi Git restano riproducibili da un normale terminale nel repository.

### Limiti, riproduzione e chiusura

Un eventuale collaudo manuale delle nuove pagine nel browser rimane distinto
dal controllo dei vettoriali: in questa milestone non viene attestato. I limiti
storici della 4A e gli advisory già documentati non sono riaperti né dichiarati
risolti. Nessuna modifica alla logica del questionario, al routing o all'adapter.
Baseline per confronto/rollback: ee22cf3; non eseguiti rollback o riscritture.
Commit e push sul solo branch esistente, GPG signing disattivato nel singolo
comando commit. Consegna limitata alla 4B; nessuna attività successiva avviata.

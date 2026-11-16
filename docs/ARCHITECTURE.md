# Architettura — Studio Forma

## Perimetro dopo la milestone 4B

Applicazione Qwik City con rendering server a ogni richiesta alle pagine pubbliche.
Lo studio, i tre progetti concettuali e i servizi sono fittizi. La milestone 2
ha completato contenuti, portfolio e identità visiva; la milestone 3 aggiunge
il generatore interattivo di brief con stato locale.
La milestone 4B arricchisce le schede con quattro tavole vettoriali annotate e
collega Studio alla lettura distributiva di Corte 01, senza nuove interazioni.
Non esistono database, autenticazione, CMS, invii o API
business. Le Pages Functions sono esclusivamente il runtime del rendering SSR.

## Stack e motivazioni

- Qwik e Qwik City 1.20.4, stessa versione stabile, starter ufficiale `empty`.
- Vite 7.3.7 come toolchain Qwik: Qwik City richiede Vite `>=5 <8`.
- TypeScript 5.4.5, `strict` e `noUncheckedIndexedAccess`; JSX risolto da
  `jsxImportSource: @builder.io/qwik`. Il nome dell'opzione TypeScript `react-jsx`
  indica il formato di trasformazione JSX automatico, non una dipendenza da React.
- Tailwind CSS 4 con plugin Vite ufficiale, token in `src/global.css` (`@theme`).
  Utility per composizione semplice, classi condivise per tipografia, layout e
  disegni CSS. Nessuna libreria UI o gestione di stato aggiuntiva.
- Adapter `cloudflarePagesAdapter` fornito da Qwik City; Wrangler 4.162.0 per
  esecuzione locale del risultato di produzione.
- ESLint 9 e plugin Qwik; Vitest 4.1.12 per test delle componenti con `createDOM`.
  Test HTTP SSR con il test runner nativo Node, senza browser né esecuzione JS.

Le versioni effettivamente risolte sono in `package-lock.json`. Non aggiornare Vite
a 8 senza verificare prima la compatibilità ufficiale Qwik City.

## Struttura

```text
adapters/cloudflare-pages/vite.config.ts  # build SSR dell'adapter ufficiale
public/                                 # marchio, manifest e direttive asset
src/
  entry.dev.tsx                         # sviluppo con SSR Vite/Qwik
  entry.ssr.tsx                         # renderToStream, lingua italiana
  entry.cloudflare-pages.tsx            # createQwikCity, export fetch
  root.tsx                              # provider, head e RouterOutlet
  global.css                            # tema, layout, responsive e focus
  lib/navigation.ts                     # destinazioni condivise
  lib/projects.ts                       # tre studi tipizzati, dati mock locali
  lib/brief.ts                          # modello, validazione e formato del brief
  lib/brief.test.tsx                     # test delle regole e del documento
  media/{corte-01,officina-02,interno-03}.svg # tavole originali locali
  components/
    header/                             # disclosure menu e test
    footer/                             # navigazione e dichiarazione demo
    router-head/                        # SEO Qwik City
    ui/                                 # freccia e introduzione pagine
    projects/                           # card archivio e scheda condivisa
    brief/                              # questionario Qwik e gruppi di scelta
  routes/
    layout.tsx                          # header/main/footer e skip link
    index.tsx                           # homepage
    studio/index.tsx
    servizi/index.tsx
    portfolio/index.tsx
    portfolio/{corte-01,officina-02,interno-03}/index.tsx
    contatti/index.tsx
    richiedi-un-progetto/index.tsx
    404.tsx
tests/ssr.test.mjs                       # richieste dirette al runtime locale
```

## Percorso di una richiesta

Il client richiede `/studio/`; il worker generato dall'adapter inoltra la richiesta
a `createQwikCity`, che risolve la rotta file-based e chiama `renderToStream`.
La risposta contiene già layout, titolo, descrizione e contenuti. Lo stato Qwik
serializzato permette di riprendere le interazioni nel browser senza rifare il
rendering iniziale. Non sono impostati `onStaticGenerate` né prerender delle pagine.
L'adapter produce anche una pagina 404 statica di fallback: non sostituisce l'SSR
delle nove rotte pubbliche.

I collegamenti sono normali anchor con URL reali: funzionano con navigazione HTTP
e non richiedono un router SPA. Il menu mobile usa `component$`, `useSignal` e
gestori `$`; `Escape` lo chiude e riporta il focus al pulsante. È un disclosure
inline, non un dialogo modale. La navigazione a piè di pagina resta disponibile
anche senza JavaScript. Non sono usate persistenza o richieste verso servizi
terzi nel codice applicativo. La milestone 4A aggiunge un solo `useVisibleTask$`
al questionario per applicare il focus dopo il rendering degli elementi condizionali.

## SEO e accessibilità iniziale

Ogni rotta esporta un `DocumentHead` con titolo e descrizione specifici.
`RouterHead` genera canonical dall'origine e dal pathname della richiesta,
escludendo query e frammenti. Nessun dominio pubblico è inventato o configurato;
alla futura pubblicazione il proprietario dovrà validare origine e canonical.
La 404 dichiara `noindex`.

Documento in italiano, un H1 per pagina, landmark semantici, skip link, menu con
`aria-expanded`, `aria-controls` e `aria-current`, SVG decorativi nascosti agli
screen reader, testo alternativo per le tavole e focus visibile. Nelle schede
figlie il link Portfolio usa `aria-current="location"`. Il tema
rispetta `prefers-reduced-motion`. La verifica iniziale non equivale a una
certificazione WCAG; audit esteso e prove assistive appartengono alla milestone 4.

## Asset e licenze

Le tre tavole `src/media/corte-01.svg`, `officina-02.svg`, `interno-03.svg`, la
favicon `public/forma.svg`, l'icona freccia e il marchio sono stati realizzati
per questa demo. La precedente illustrazione verde è stata sostituita. Non riproducono opere
o marchi reali e non incorporano immagini di terzi. Le loro fonti sono i file
versionati; non richiedono attribuzioni esterne. I font sono quelli di sistema,
senza download. Lo scaffold deriva dal progetto Qwik, distribuito con licenza MIT;
le licenze delle dipendenze restano nei rispettivi pacchetti npm. Non viene
attribuita automaticamente una licenza generale all'intero repository.

La milestone 4B aggiunge corte-01-pianta.svg, officina-02-sezione.svg,
interno-03-aperto.svg e interno-03-separato.svg. Inventario, provenienza e limiti
in [ASSETS.md](ASSETS.md). Le tavole precedenti restano in apertura delle schede.
La proprietà tipizzata study di Project raccoglie problema, ipotesi, soluzione,
immagini e annotazioni. ProjectDetail la rende con section, dl, figure/figcaption
e liste; img ha alt e aria-describedby. Non è introdotto un renderer grafico,
un modello di stato o una nuova astrazione UI.

Le tavole singole affiancano disegno e didascalia su desktop; le configurazioni
di Interno 03 sono affiancate per confronto. Sotto 800 px entrambi i layout si
dispongono in una colonna. Le annotazioni restano HTML leggibile; le dimensioni
intrinseche degli SVG riservano lo spazio prima del caricamento lazy.
L'ancora #lettura-progettuale permette il rimando puntuale dalla pagina Studio.
Routing, adapter, componenti del brief e relative validazioni sono invariati.

## Contenuti e identità della milestone 2

`src/lib/projects.ts` è la sorgente dei tre progetti: metadati, tavola SVG,
domanda, ipotesi, materiali e scelte. `ProjectCard` serve homepage e archivio;
`ProjectDetail` evita duplicazioni nelle tre schede. Le pagine sono rotte
file-based esplicite; non servono endpoint, loader business o lookup dinamici.
Ogni pagina esporta il proprio head SSR. Superfici e contesti sono ipotetici e
il carattere concettuale è dichiarato anche nell'HTML iniziale.

Tema e voce editoriale sono definiti in [BRAND_DIRECTION.md](BRAND_DIRECTION.md).
La pagina Richiedi un progetto ospita ora il generatore della milestone 3.

## Generatore di brief / milestone 3

Quattro passaggi: intervento/immobile, obiettivi/stile, budget/tempi/descrizione,
riepilogo. Dopo la revisione si genera un documento strutturato. Il componente
Qwik usa useStore per risposte/errori e useSignal per passaggio, revisione,
risultato, conferma di reset e stato della copia. I gestori QRL eseguono solo
operazioni locali; nessuna action, routeLoader business, fetch o richiesta di
invio. Non sono aggiunte dipendenze.

`src/lib/brief.ts` contiene opzioni tipizzate, stato iniziale, validazioni pure,
sezioni del riepilogo e generatore di testo. Ogni passaggio valida i propri
campi; la generazione ripete il controllo completo. Le stesse sezioni alimentano
riepilogo, documento visibile e testo degli appunti, evitando versioni divergenti.
Le modifiche dal riepilogo conservano gli altri campi e tornano direttamente alla
revisione dopo la validazione. Il reset richiede una conferma inline.

Vincoli: caratteristiche 10–400 caratteri dopo trim; descrizione 20–2.000;
superficie maggiore di zero e fino a 100.000 m², massimo due decimali con virgola
o punto, senza notazione esponenziale. Almeno un obiettivo; scelte verificate
contro le opzioni. Budget facoltativo per fasce, non stima di costo. Stile può
essere “Da esplorare insieme” e tempi “Da definire”. I testi liberi sono resi come
nodi testuali escapati, mai HTML; nel documento mantengono gli a capo.

Persistenza limitata al componente nella pagina. Navigazione interna al percorso
conserva i valori; ricaricare/lasciare la pagina li perde. Non si usa storage del
browser. Le risposte non sono mai serializzate verso il server: l'HTML SSR contiene
solo lo stato iniziale vuoto. Nessun dato personale viene richiesto; i campi liberi
invitano a non inserire nomi, recapiti o indirizzi.

I controlli sono fieldset/legend e label native, con riepilogo errori annunciato,
aria-invalid/describedby, focus al titolo del passaggio e progresso leggibile.
Il contenitore ha role=form ma non è un elemento form HTML: non può effettuare
un invio nativo, neppure con Enter o JavaScript disattivato. Tutti i pulsanti sono
type=button; noscript spiega il requisito JavaScript. La pagina e le altre rotte
restano SSR. Il reset e gli errori hanno gestione esplicita del focus.

Il collaudo 4A ha riprodotto un focus perso: requestAnimationFrame poteva precedere
l'inserimento del riepilogo errori o della conferma di reset. Un segnale di richiesta
del focus è ora osservato da un `useVisibleTask$` dopo il rendering. Nessun focus
automatico all'apertura: il segnale iniziale è vuoto. L'effetto richiede codice
client all'avvio del questionario; è un compromesso circoscritto per la gestione
DOM, con eccezione ESLint locale e motivata, senza disabilitare la regola globale.
Riferimento: [ciclo dei task Qwik](https://qwik.dev/docs/core/tasks/).
La chiave del pulsante primario distingue passaggio/modalità di modifica: evita
il riuso del testo “Continua” osservato al ritorno dal riepilogo, pur con la
conferma già operativa. La regressione è verificata sulla build SSR nel browser.

Copia con navigator.clipboard.writeText, solo dopo azione dell'utente. Errori o API
assente mostrano una textarea readonly con il testo completo e il comando per
selezionarlo. Il successo viene annunciato soltanto dopo la risoluzione della
Promise. Un contatore invalida copie pendenti quando si torna a modificare o si
azzera, evitando annunci riferiti a una revisione precedente. Nessun fallback
deprecato execCommand o permesso richiesto all'apertura della pagina.

Riferimenti: [stato Qwik](https://qwik.dev/docs/core/state/) e
[eventi Qwik](https://qwik.dev/docs/core/events/). Le API sono quelle del pacchetto
Qwik 1 installato, non di Qwik 2.


## Limiti e dipendenze

Lo starter stabile porta dipendenze transitive con advisory npm: vedere il worklog
per il risultato dell'audit e i limiti della verifica. Non sono stati applicati
override a major incompatibili di Zod o downgrade di Qwik City suggeriti da
`npm audit fix --force`. Nessun caricamento di immagini utente, form validato con
Zod o dati esterni è presente nella milestone. Prima di un deploy va rivalutata la
catena dipendenze; la classificazione `devDependency` non basta a stabilire se un
modulo finisce nel worker.

L'analisi aggiornata di catene, artefatti e rischio residuo è in
[DEPENDENCY_AUDIT.md](DEPENDENCY_AUDIT.md). Gli harness browser in `tests/` ricevono
una Page Playwright dall'ambiente di test; non aggiungono dipendenze applicative.

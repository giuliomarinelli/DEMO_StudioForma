# Architettura — Studio Forma

## Perimetro dopo la milestone 2

Applicazione Qwik City con rendering server a ogni richiesta alle pagine pubbliche.
Lo studio, i tre progetti concettuali e i servizi sono fittizi. La milestone 2
completa i contenuti e il portfolio, rinnova identità visiva e layout e prepara
un'anteprima statica della richiesta. Non implementa il questionario.
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
  media/{corte-01,officina-02,interno-03}.svg # tavole originali locali
  components/
    header/                             # disclosure menu e test
    footer/                             # navigazione e dichiarazione demo
    router-head/                        # SEO Qwik City
    ui/                                 # freccia e introduzione pagine
    projects/                           # card archivio e scheda condivisa
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
anche senza JavaScript. Non sono usati `useVisibleTask$`, persistenza o richieste
verso servizi terzi nel codice applicativo.

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

## Contenuti e identità della milestone 2

`src/lib/projects.ts` è la sorgente dei tre progetti: metadati, tavola SVG,
domanda, ipotesi, materiali e scelte. `ProjectCard` serve homepage e archivio;
`ProjectDetail` evita duplicazioni nelle tre schede. Le pagine sono rotte
file-based esplicite; non servono endpoint, loader business o lookup dinamici.
Ogni pagina esporta il proprio head SSR. Superfici e contesti sono ipotetici e
il carattere concettuale è dichiarato anche nell'HTML iniziale.

Tema e voce editoriale sono definiti in [BRAND_DIRECTION.md](BRAND_DIRECTION.md).
La pagina Richiedi un progetto è statica: nuclei informativi e facsimile,
senza campi, gestione di step, dati salvati, generazione, copia o invio.

## Limiti e dipendenze

Lo starter stabile porta dipendenze transitive con advisory npm: vedere il worklog
per il risultato dell'audit e i limiti della verifica. Non sono stati applicati
override a major incompatibili di Zod o downgrade di Qwik City suggeriti da
`npm audit fix --force`. Nessun caricamento di immagini utente, form validato con
Zod o dati esterni è presente nella milestone. Prima di un deploy va rivalutata la
catena dipendenze; la classificazione `devDependency` non basta a stabilire se un
modulo finisce nel worker.

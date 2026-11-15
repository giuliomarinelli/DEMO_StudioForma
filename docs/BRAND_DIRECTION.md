# Studio Forma — Direzione del brand

## Posizionamento della milestone 2

Studio di architettura contemporanea, rigoroso e sperimentale. L'autorevolezza
deriva dalla chiarezza del metodo e dalla qualità delle rappresentazioni, non da
premi, clienti, titoli professionali o risultati inventati. Studio Forma e tutti
i progetti restano esplicitamente fittizi.

La direzione sostituisce l'avorio/verde e l'accento serif della foundation. Le
catture della milestone 1 restano nel registro storico; non sono il riferimento
visivo attuale.

## Palette

| Colore | Valore | Impiego |
| --- | --- | --- |
| Grafite | `#171C20` | Testi principali, tavole scure, footer, CTA primarie |
| Cemento | `#EAE9E4` | Fondo generale, testo sui fondi scuri |
| Blu tecnico | `#2F59C4` | Accenti, indici, evidenziazioni, stato attivo e focus |
| Acciaio | `#86919A` | Linee di costruzione, griglie e parti secondarie delle tavole |

Le superfici di supporto e le linee usano derivazioni neutre della palette.
Il testo secondario su cemento usa un grigio più scuro (`#46515A`/`#53606A`):
l'acciaio non viene impiegato come colore del piccolo testo corrente su fondo
chiaro. I token sono dichiarati in `src/global.css` tramite `@theme` Tailwind.
Favicon, manifest e theme-color adottano la stessa identità.

## Tipografia

- Sans-serif di sistema: Helvetica Neue, Helvetica, Arial. Nessun font remoto.
- Titoli a peso 500, corpo regolare; niente corsivi editoriali o serif.
- Titoli ampi con interlinea compatta e tracking controllato; ridimensionamento
  e ritorni a capo specifici per schermi piccoli.
- Monospaziato di sistema per numerazioni, codici di tavola e metadati. I codici
  danno struttura, non sostituiscono le informazioni leggibili.
- Testi correnti con interlinea ampia e larghezza limitata. Colore blu riservato
  a elementi distintivi e relazioni di navigazione.

## Griglia e composizione

La homepage si apre con un registro tecnico e un titolo a tutta larghezza:
«Spazio, materia, trasformazione». Descrizione e accesso al portfolio precedono
una tavola volumetrica orizzontale. Questa gerarchia sostituisce il precedente
hero diviso tra testo e immagine affiancata.

Linguaggio grafico: bordi netti, griglie, crocini, codici SF, registri e numeri di
sezione. Nessuna scheda arrotondata, ombra decorativa o animazione continua.
L'asimmetria segue una gerarchia: margine di riferimento per i numeri e colonna
principale per i contenuti. Il portfolio dà maggiore spazio al primo progetto,
poi affianca gli altri due. Su mobile l'ordine torna lineare.

## Tavole e progetti

Tre SVG originali, realizzati nel repository per questa milestone:

| Progetto | Tavola | Tema |
| --- | --- | --- |
| Corte 01 | `src/media/corte-01.svg` | Volumi a U e corte, vista assonometrica |
| Officina 02 | `src/media/officina-02.svg` | Telai esistenti e nuovi innesti |
| Interno 03 | `src/media/interno-03.svg` | Nucleo centrale e distribuzione in pianta |

Le coordinate X/Y/Z sono riferimenti locali astratti, non coordinate geografiche.
I disegni sono schemi concettuali non in scala. Superfici e programmi sono ipotesi
narrative: non rappresentano misure certificate, realizzazioni o prestazioni
verificate. Ogni scheda presenta categoria, superficie di studio, contesto,
programma, domanda, ipotesi, tre scelte e materiali. Il carattere fittizio è
dichiarato nella lista e nella pagina dedicata.

Gli SVG, il marchio e i dettagli grafici sono originali del progetto, senza
immagini o font di terzi. I file sorgente costituiscono la provenienza degli
asset. Non sono necessarie attribuzioni esterne; le licenze delle dipendenze
restano quelle dei rispettivi pacchetti. Non viene introdotta una licenza
generale dell'intero repository.

## Voce editoriale

Professionale, sintetica, specifica. Descrivere che cosa cambia e con quale
criterio: «Il nucleo centrale raccoglie i servizi», «I nuovi volumi si fermano
sotto la copertura». Evitare superlativi, promesse di prestazione, testimonianze,
slogan generici e metafore prive di contenuto progettuale.

Nessuna sede, recapito, biografia o certificazione inventata. Contatti e Servizi
chiariscono che non è disponibile una prestazione professionale reale.

## Richiesta preliminare / dalla milestone 3

Il generatore segue quattro passaggi: immobile, obiettivi, risorse e riepilogo.
La colonna di registro espone numeri e avanzamento; l'area principale presenta
scelte, istruzioni e validazioni. Lo stile conserva bordi netti, accenti blu,
corpo leggibile e metadati monospaziati. Il rosso scuro è un colore funzionale
riservato agli errori, sempre accompagnati da testo.

Il documento finale mantiene cartiglio grafite, codice SF—BP, gerarchia delle
sezioni e dichiarazione «DEMO / NON INVIATO». Il contenuto deriva dalle risposte,
non dal precedente facsimile. Il riepilogo è modificabile e il testo può essere
copiato. Se la copia automatica è negata, si offre la selezione manuale.

Nessun invio reale o dato personale richiesto. La permanenza in memoria e la
perdita delle risposte all'uscita/ricarica sono dichiarate. Il ripristino richiede
conferma e non è confuso con l'azione di navigazione indietro.

## Criteri di continuità

Conservare Qwik City SSR, navigazione HTTP reale, metadati per rotta, focus
visibile, stato ARIA del menu e rispetto di reduced motion. Verificare tutte le
rotte e i progetti su desktop e mobile. Il report di controllo è in
[WORKLOG.md](WORKLOG.md); le prove locali non costituiscono certificazione WCAG
o verifica su ogni browser.

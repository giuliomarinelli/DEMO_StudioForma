# Studio Forma — Caso studio dimostrativo

## Obiettivo e stato

Rappresentare uno studio di architettura contemporanea, rigoroso e sperimentale
attraverso un archivio editoriale di progetti fittizi. La milestone 1 ha preparato
Qwik City SSR e la struttura del sito. La milestone 2 completa identità e contenuti.
La milestone 3 aggiunge il generatore di brief, con stato locale e nessun invio.
La milestone 4A collauda la build SSR nel runtime Cloudflare locale e corregge
focus del questionario e testo del pulsante di conferma in modifica.
La milestone 4B approfondisce le tre presentazioni con elaborati originali e
letture progettuali, senza modificare il generatore o introdurre interazioni.

## Evoluzione dell'identità

La foundation utilizzava avorio, verde e un accento serif. La direzione approvata
per la milestone 2 li sostituisce con grafite #171C20, cemento #EAE9E4, blu tecnico
#2F59C4 e acciaio #86919A. Sans-serif modernista, numerazioni monospaziate,
linee di costruzione e cartigli organizzano le informazioni come tavole di studio.
Il riferimento operativo è [BRAND_DIRECTION.md](BRAND_DIRECTION.md).

La homepage ora ha un titolo a tutta larghezza e una tavola volumetrica sotto
il registro introduttivo. La gerarchia è prevalentemente tipografica; il disegno
rende concreto il campo di ricerca. La composizione abbandona lo schema con
hero testuale affiancato a un'illustrazione domestica della foundation.

## Tre progetti, tre temi

- **Corte 01:** architettura residenziale. Una corte aperta organizza volumi,
  accessi e soglie. Tavola assonometrica con linee di costruzione.
- **Officina 02:** recupero di un involucro produttivo ipotetico. Telai ripetuti
  e nuovi volumi autonomi rendono leggibile la relazione tra esistente e innesti.
- **Interno 03:** architettura degli interni. Un nucleo centrale raccoglie i
  servizi, mentre una partizione rende separabile lo spazio di lavoro.

Ogni progetto ha una vera rotta SSR, metadati specifici, dati di studio, domanda,
ipotesi, tre criteri e materiali. Superfici e programmi sono ipotetici; tutti i
progetti sono concettuali, fittizi e non realizzati. Le tre tavole SVG sono
originali e incluse nel repository, senza immagini o font remoti.

## Contenuti e richiesta preliminare

### Approfondimenti della milestone 4B

Le schede conservano le tavole introduttive e aggiungono una lettura distinta
del rapporto tra problema, ipotesi e soluzione nello schema:

- Corte 01: una pianta a U segue il passaggio dall'ingresso laterale alla corte
  e alle soglie degli ambienti. Le frecce distinguono la sequenza d'arrivo dalle
  diramazioni verso lo spazio giorno e l'ala privata.
- Officina 02: una sezione trasversale sovrappone telaio conservato e laboratori
  nuovi. Grafite, blu e tratteggio distinguono le parti; il vuoto superiore e
  l'arretramento dai pilastri mostrano il criterio di autonomia degli innesti.
- Interno 03: due piante con identici nucleo e arredi confrontano pannelli raccolti
  e distesi. Cambia la relazione fra studio e spazio comune, senza attribuire
  alla partizione prestazioni acustiche o costruttive non verificate.

Titoli, annotazioni numerate e descrizioni sono disponibili anche in HTML.
Le figure si dispongono in colonna su schermi stretti; il confronto dell'interno
è affiancato su desktop. Un breve rimando nella pagina Studio collega il metodo
alla pianta di Corte 01 senza ripeterne l'intera spiegazione.
Progetti fittizi e non realizzati, schemi non in scala e misure ipotetiche sono
dichiarati accanto agli elaborati. Provenienza e fonti in [ASSETS.md](ASSETS.md).

### Percorso locale di richiesta

Studio presenta pratica, metodo e criteri. Servizi esplicita ambiti ed elaborati
concettuali con collegamenti ai progetti. Contatti fornisce orientamento e FAQ,
chiarendo l'assenza di recapiti operativi. Non sono inventati clienti, premi,
titoli o testimonianze.

Il generatore raccoglie intervento, immobile, superficie, obiettivi, stile,
budget facoltativo, tempi e descrizione. Quattro passaggi separano raccolta e
revisione. Messaggi espliciti guidano la correzione; tornare indietro o modificare
una sezione non cancella le altre risposte.

Il documento finale riprende il linguaggio delle tavole: cartiglio grafite,
metadati monospaziati, sezioni e dichiarazione dimostrativa. La generazione è
deterministica e locale, senza AI remota. La copia usa gli appunti del browser;
se non disponibile si offre un testo selezionabile. Nessun successo simulato
viene mostrato dopo un errore della Clipboard API.

Le risposte sono conservate soltanto nella pagina e vengono perse al reload o
all'uscita. Il ripristino è intenzionale e richiede conferma. Non sono richiesti
nomi o recapiti, né sono presenti invii o persistenza. L'utente può ordinare le
esigenze e ottenere una traccia, senza trasformarla in preventivo o consulenza.

## Architettura e prove

Qwik City, rendering SSR, routing e adapter Cloudflare Pages sono preservati.
I dati dei progetti sono locali e tipizzati; due componenti condivisi servono
archivio e schede. Non sono state aggiunte dipendenze, API business o servizi. Validazioni e formato
del documento sono separati dal componente Qwik e verificati con test locali.

TypeScript strict, ESLint Qwik, 27 test unitari/DOM e 11 test HTTP del worker
locale verificano l'implementazione. Nella 4A il browser è disponibile: nove
rotte più 404 controllate ai quattro viewport, menu mobile, FAQ e percorso reale
del questionario, anche interamente da tastiera. Screenshot iniziali, errori,
riepilogo e risultato sono in [evidence/4a](evidence/4a/). Il focus perso sugli
elementi condizionali è stato corretto con un effetto Qwik dopo il rendering.
La scrittura Clipboard ha restituito successo; non è stata riletta dagli appunti
del sistema. Il rifiuto dei permessi è simulato separatamente per verificare la
copia manuale. Il blocco browser della milestone 3 resta nel registro storico.
Esiti e limiti sono nel [WORKLOG.md](WORKLOG.md). I risultati locali non attestano
deploy remoto, prestazioni misurate, Safari/Firefox o conformità WCAG completa.

## Attività residue

Verifiche della 4B: typecheck, lint, 27 test locali e build di produzione
superati; 11 controlli HTTP SSR esistenti superati nel runtime locale Wrangler.
Nelle tre risposte HTML sono presenti quattro nuove figure complessive, con
annotazioni e descrizioni accessibili. Gli SVG della build coincidono con i
sorgenti. Controllati XML e rasterizzazioni a 640/280 px; nessun Playwright MCP,
nuovo test E2E o collaudo browser delle pagine eseguito nella 4B.

Prove disponibili della 4A concluse; resta non conclusivo il click automatizzato
su Copia a 320 px per attesa di stabilità, mentre la copia da tastiera riesce.
La 4B consegna l'arricchimento delle tavole proposto nell'audit. Restano prove
assistive con screen reader e browser diversi e armonizzazione editoriale delle CTA:
[CONTENT_AUDIT.md](CONTENT_AUDIT.md). Gli advisory sono ancora presenti, con catene
e rilevanza documentate in [DEPENDENCY_AUDIT.md](DEPENDENCY_AUDIT.md).
Nessun aggiornamento forzato, pubblicazione o avvio automatico di ulteriori milestone.

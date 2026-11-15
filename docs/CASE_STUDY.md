# Studio Forma — Caso studio dimostrativo

## Obiettivo e stato

Rappresentare uno studio di architettura contemporanea, rigoroso e sperimentale
attraverso un archivio editoriale di progetti fittizi. La milestone 1 ha preparato
Qwik City SSR e la struttura del sito. La milestone 2 completa identità e contenuti.
La milestone 3 aggiunge il generatore di brief, con stato locale e nessun invio.

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

TypeScript strict, ESLint Qwik, test della navigazione e test HTTP del worker
locale verificano l'implementazione. Le catture desktop/mobile di archivio,
scheda e facsimile documentano la milestone 2. Il controllo browser della
milestone 3 è bloccato da due timeout del servizio Playwright MCP; non sono
attestati focus, resa visuale o copia reale negli appunti. I test del componente
Qwik non eseguono il focus e simulano la Clipboard API. Esiti, comandi e catture sono nel
[WORKLOG.md](WORKLOG.md). I risultati locali non attestano un deploy remoto,
prestazioni misurate o conformità WCAG completa.

## Attività residue

Funzionalità della milestone 3 implementate; resta la verifica browser
bloccata dal servizio MCP. Milestone 4:
audit esteso di accessibilità, compatibilità browser e preparazione finale al
deploy. Gli advisory della catena dipendenze già registrati nella foundation
restano da rivalutare prima di pubblicare. La milestone 4 non è stata avviata.

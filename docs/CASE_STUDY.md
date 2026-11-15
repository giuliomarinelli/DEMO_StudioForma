# Studio Forma — Caso studio dimostrativo

## Obiettivo e stato

Rappresentare uno studio di architettura contemporanea, rigoroso e sperimentale
attraverso un archivio editoriale di progetti fittizi. La milestone 1 ha preparato
Qwik City SSR e la struttura del sito. La milestone 2 completa identità e contenuti.
Il questionario che produrrà una bozza preliminare copiabile resta alla milestone 3.

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

La richiesta preliminare anticipa i temi del futuro percorso e mostra un
facsimile statico. Non contiene campi, step interattivi, persistenza, generazione,
copia o invio. La dichiarazione di indisponibilità del questionario è esplicita.

## Architettura e prove

Qwik City, rendering SSR, routing e adapter Cloudflare Pages sono preservati.
I dati dei progetti sono locali e tipizzati; due componenti condivisi servono
archivio e schede. Non sono state aggiunte dipendenze, API business o servizi.

TypeScript strict, ESLint Qwik, test della navigazione e test HTTP del worker
locale verificano l'implementazione. Il controllo visuale comprende desktop,
mobile, archivio, scheda e facsimile. Esiti, comandi e catture sono nel
[WORKLOG.md](WORKLOG.md). I risultati locali non attestano un deploy remoto,
prestazioni misurate o conformità WCAG completa.

## Attività residue

Milestone 3: questionario con validazioni, riepilogo modificabile, ripristino e
testo copiabile, senza invio e senza dati personali obbligatori. Milestone 4:
audit esteso di accessibilità, compatibilità browser e preparazione finale al
deploy. Gli advisory della catena dipendenze già registrati nella foundation
restano da rivalutare prima di pubblicare. Nessuna milestone successiva avviata.

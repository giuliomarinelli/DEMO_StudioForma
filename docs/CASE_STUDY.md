# Studio Forma — Caso studio dimostrativo

## Obiettivo

Presentare uno studio di architettura fittizio attraverso un'esperienza editoriale
riconoscibile. Il tratto distintivo dell'MVP completo sarà un questionario che
trasforma le esigenze del visitatore in una bozza preliminare copiabile, senza
trasmissione di dati. Questa prima milestone costruisce le fondamenta.

## Risultato della milestone 1

Homepage con messaggio «Lo spazio, dalla tua parte», concept architettonico
originale, manifesto e introduzione ai tre ambiti. Header, footer e struttura
responsive condividono una navigazione completa. Studio, Servizi, Portfolio,
Contatti e Richiedi un progetto sono vere rotte SSR, con contenuti introduttivi e
metadati specifici. La pagina di richiesta spiega chiaramente che il questionario
non è attivo. Nessuna falsa testimonianza, progetto realizzato, recapito o sede.

## Scelte progettuali

La palette avorio e verde profondo, la griglia asimmetrica, la tipografia ampia e
l'accento serif distinguono il sito da un catalogo immobiliare. Un'illustrazione
vettoriale locale di volumi e terrazze sostituisce fotografie di edifici reali:
il racconto rimane coerente con la natura fittizia dello studio e le fonti degli
asset sono interamente verificabili nel repository.

Qwik City consente di servire già nella prima risposta i contenuti pubblici e il
relativo SEO. Il menu usa primitive reattive Qwik senza librerie di stato o
componenti UI aggiuntive. Le Pages Functions eseguono il solo SSR. L'assenza di
backend business mantiene la demo riproducibile e limita il costo architetturale.

## Evidenze e limiti

La validazione tecnica comprende TypeScript strict, ESLint con regole Qwik,
test del menu e richieste HTTP al worker di produzione eseguito localmente da
Wrangler. Esiti, problemi incontrati e verifica visuale sono registrati in
[WORKLOG.md](WORKLOG.md). Una build locale non equivale a un deployment o a una
verifica sull'infrastruttura Cloudflare remota.

Il portfolio presenta un solo studio visivo, non le tre schede richieste dall'MVP
completo. Il questionario, le sue validazioni, il ripristino e la copia della
bozza sono esclusi da questa consegna. Audit completo di accessibilità,
compatibilità tra browser e revisione finale del deploy restano alle successive
milestone, che non sono state avviate. Gli advisory della catena dipendenze vanno
rivalutati prima della pubblicazione. Non sono rivendicati risultati commerciali,
metriche prestazionali o conformità WCAG non misurati.

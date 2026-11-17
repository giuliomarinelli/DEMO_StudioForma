# Asset originali — Studio Forma

## Provenienza

Tutte le tavole sono SVG disegnati nel repository per questa demo, senza foto,
font remoti, opere di terzi o librerie grafiche applicative. I sorgenti versionati
costituiscono la provenienza. Le nuove tavole della milestone 4B sono state
tracciate direttamente come geometrie vettoriali e testo; non derivano da
planimetrie reali. Non richiedono attribuzioni esterne. Non viene assegnata una
licenza generale al repository; le dipendenze mantengono le rispettive licenze.

## Inventario delle tavole

| File in src/media | Tavola | Decisione rappresentata |
| --- | --- | --- |
| corte-01.svg | 01.01 | Assonometria del sistema di volumi a U, già presente dalla milestone 2 |
| officina-02.svg | 02.01 | Telaio e innesti in assonometria, già presente |
| interno-03.svg | 03.01 | Pianta distributiva generale, già presente |
| [corte-01-pianta.svg](../src/media/corte-01-pianta.svg) | 01.02 | Ingresso laterale, corte distributiva e diramazioni verso giorno e notte |
| [officina-02-sezione.svg](../src/media/officina-02-sezione.svg) | 02.02 | Telaio conservato, distacco superiore e nuovi laboratori autonomi |
| [interno-03-aperto.svg](../src/media/interno-03-aperto.svg) | 03.02 | Pannelli raccolti, varco aperto tra studio e spazio comune |
| [interno-03-separato.svg](../src/media/interno-03-separato.svg) | 03.03 | Stessa pianta con pannelli distesi e ambito di lavoro distinto |

Marchio, freccia, favicon public/forma.svg e dettagli CSS sono anch'essi originali.
Le quattro nuove tavole usano viewBox 0 0 640 600 e dimensioni intrinseche 640×600.
Le due configurazioni di Interno 03 mantengono identici perimetro, nucleo e arredi:
cambiano partizione, verso delle frecce e campitura dello studio.

## Linguaggio e lettura

Grafite #171C20 per parti fisse/esistenti, cemento #EAE9E4 per il fondo,
blu #2F59C4 per relazioni e interventi, acciaio #86919A per il registro grafico.
Il colore non è l'unico codice: frecce, tratteggi, spessori, numeri e descrizioni
HTML distinguono percorsi, distacchi e partizioni. In Officina il simbolo centrale
localizza la dorsale longitudinale vista di taglio; non indica una quota.

Gli SVG hanno title e desc per la consultazione autonoma. Nel sito sono immagini
con alt specifico e aria-describedby alla figcaption; annotazioni numerate e
descrizioni estese sono testo HTML. La trascrizione evita di affidare informazioni
essenziali ai piccoli cartigli del disegno quando ridotto su mobile.

I file sono importati con ESM ?url, come le tavole esistenti. Nessun contenuto
SVG viene inserito tramite HTML non controllato. Nessuno script, link esterno,
foreignObject, font incorporato o risorsa remota nei nuovi file.

## Limiti rappresentativi

Progetti concettuali, fittizi e non realizzati. Schemi non in scala; contesti,
misure e superfici ipotetici. Le aperture e gli arredi esprimono relazioni d'uso,
non elaborati esecutivi. Non sono attestate fattibilità, prestazioni strutturali,
acustiche, energetiche o conformità tecniche. I segni di distacco e scorrimento
non forniscono dimensionamenti o dettagli costruttivi certificati.

## Verifica locale senza browser

La milestone 4B verifica XML e rasterizza temporaneamente le quattro nuove tavole
a 640 e 280 px, con Sharp già installato nella toolchain locale di Miniflare.
Nessuna dipendenza è aggiunta all'app. La procedura riproducibile è in
[DEPLOYMENT.md](DEPLOYMENT.md#verifica-degli-elaborati--milestone-4b).
Le PNG di controllo restano nella directory ignorata .wrangler/qa-4b; i file
consegnati e usati dal sito sono gli SVG sorgente.

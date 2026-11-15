# Audit dei contenuti — Milestone 4A

## Metodo e risultato

Verifica del 15 novembre 2026 sulla build Qwik City SSR locale, baseline Git
`698f1a1`, con le correzioni circoscritte registrate nel worklog. Esaminate le
nove pagine pubbliche e la 404 a 1440, 768, 390 e 320 px, testi sorgente,
gerarchia dei titoli, collegamenti e catture browser. Evidenze in
[evidence/4a](evidence/4a/), esiti e limiti nel relativo indice. I conteggi parole
del [tentativo generale parziale](evidence/4a/browser-attempt-before-exclusivity.json)
riguardano il main visibile e non misurano qualità o copertura totale.

Nessuna pagina richiede riempitivi per soddisfare l'MVP. L'opportunità principale
è rendere più dimostrabile il ragionamento progettuale: le schede hanno testi
specifici, ma una sola tavola ciascuna. Queste proposte sono un backlog editoriale,
non nuove funzionalità né contenuti implementati nella 4A.

## Valutazione per pagina

| Pagina | Ulteriori contenuti? | Osservazione e proposta concreta | Priorità |
| --- | --- | --- | --- |
| Home `/` | Facoltativi | Presentazione, tavola, metodo, tre progetti, ambiti e accesso al brief sono sufficienti. Corte 01 appare nella hero e subito nell'archivio: in una revisione futura dare alle due occorrenze didascalie con scopi distinti, evitando di ripetere il medesimo messaggio. | Bassa |
| Studio `/studio/` | Consigliati | Pratica, tre fasi e tre principi danno un profilo credibile, ma restano prevalentemente dichiarativi. Collegare un criterio a una scelta precisa di Corte 01, con una lettura annotata della tavola, renderebbe verificabile il metodo. Nessuna biografia, premio o team inventato. | Media |
| Servizi `/servizi/` | Consigliati | Tre ambiti, elaborati e rimandi al portfolio sono completi. La sequenza descrizione/lista/link è ripetitiva. Un esempio sintetico di domanda iniziale e relativo elaborato per ambito chiarirebbe la differenza fra gli approcci; non aggiungere tariffe o prestazioni reali. | Media |
| Portfolio `/portfolio/` | Non necessari | Tre studi distinti e dichiarazione concettuale; l'archivio è volutamente breve. Un'eventuale riga per card potrebbe anticipare il vincolo decisivo, senza duplicare le schede o introdurre filtri inutili per tre elementi. | Bassa |
| Corte 01 `/portfolio/corte-01/` | Consigliati | Domanda, ipotesi, tre scelte e materiali sono specifici. Una pianta schematica della sequenza ingresso–corte–stanze mostrerebbe meglio le soglie descritte rispetto alla sola assonometria. Dichiarare schema non in scala, contesto e misure ipotetici. | Alta editoriale |
| Officina 02 `/portfolio/officina-02/` | Consigliati | Il rapporto fra telai e innesti è chiaro. Una sezione o sovrapposizione esistente/nuovo con annotazioni su altezza e dorsale dimostrerebbe il criterio di non saturazione; evitare prestazioni non verificate. | Alta editoriale |
| Interno 03 `/portfolio/interno-03/` | Consigliati | La pianta comunica il nucleo centrale; il testo cita due configurazioni d'uso senza illustrarle. Due schemi annotati aperto/separato chiarirebbero il ruolo della partizione scorrevole. Restano ipotesi fittizie, senza promessa di fattibilità. | Alta editoriale |
| Contatti `/contatti/` | Non necessari | Stato fittizio, orientamento e FAQ sono adeguati; la brevità evita falsi recapiti. La CTA “Preparare un primo quadro” può essere più esplicita sul brief copiabile. Utile eventualmente un solo esempio di informazione da preparare, senza allungare le dichiarazioni demo. | Bassa |
| Richiedi un progetto `/richiedi-un-progetto/` | Non necessari al flusso | Istruzioni, limiti, perdita delle risposte, riepilogo e risultato sono completi. A 320 px introduzione e avanzamento precedono un percorso lungo ma leggibile. Un futuro esempio breve di descrizione utile potrebbe ridurre l'incertezza; non aggiungere sezioni promozionali prima dei campi. | Media, da valutare con utenti |
| 404 | Non necessari | Messaggio comprensibile e ritorno alla home. La brevità è appropriata a una pagina di recupero. Il footer conserva anche le altre destinazioni. | Nessuna |

## Ripetizioni e CTA

- Le tre schede condividono i titoli “La domanda di progetto”, “Tre scelte, un
  sistema” e “Materiali e carattere”. La struttura facilita il confronto; i futuri
  elaborati devono distinguere la dimostrazione di ogni progetto.
- Il metodo compare in home, Studio e Servizi. Home dovrebbe restare sintesi,
  Studio dimostrazione, Servizi associazione fra domanda ed elaborato.
- In home la sezione blu del brief è seguita dal footer che invita allo stesso
  percorso: due CTA ravvicinate, particolarmente evidenti su mobile. Valutare in
  una futura revisione editoriale una sola azione dominante in quel tratto.
- “Richiedi un progetto”, “Richiesta preliminare”, “Prepara il brief” e “Preparare
  un primo quadro” conducono alla stessa rotta funzionante. “Prepara il brief”
  descrive meglio l'esito locale; una futura uniformazione deve mantenere
  esplicita la natura dimostrativa e l'assenza di invio.
- I metadati molto piccoli nelle tavole su mobile sono elementi di registro.
  I dati essenziali hanno equivalenti HTML nelle schede. Ulteriori annotazioni
  dovranno avere anch'esse una trascrizione leggibile.

## Confini della consegna

Nessun testo di prodotto, asset, CTA o layout è stato riscritto per applicare
queste proposte. La milestone 4A corregge solo i difetti funzionali riprodotti.
Eventuali arricchimenti richiedono una successiva attività concordata.

# Dipendenze — verifica della milestone 4A

Audit eseguito il 15 novembre 2026, Node 22.16.0 e npm 10.9.2, sul lockfile
invariato dalla foundation. Comandi: `npm audit --json`,
`npm ls sharp zod minimatch vite-imagetools`, `npm explain sharp --json`.
Il comando audit termina con codice 1 perché le segnalazioni restano presenti.
Il [report npm](evidence/4a/npm-audit.json) registra 12 pacchetti interessati:
4 high, 8 moderate, 0 critical. Non sono dodici vulnerabilità indipendenti:
molte voci propagano gli stessi advisory lungo la catena delle dipendenze.

## Catene e rilevanza effettiva

| Catena installata | Segnalazioni | Esposizione osservata nella demo e decisione |
| --- | --- | --- |
| Qwik City 1.20.4 → vite-imagetools 9.0.3 → sharp 0.34.5 | Tre advisory high relativi a libvips, libheif e librsvg; propagazione high a imagetools e City | Toolchain immagini. Le tavole sono SVG locali versionati, importati con `?url`; nessun upload, URL immagine utente o elaboratore immagini nel worker. Il codice vulnerabile può riguardare la macchina di build se in futuro si elaborano asset non fidati. Nessuna evidenza di esposizione HTTP attuale; advisory mantenuti aperti. |
| Qwik City 1.20.4 → zod 3.25.48 | High, consumo di memoria nella validazione di collezioni sovradimensionate | Il questionario usa validazioni pure locali, non Zod. Non esistono routeAction, endpoint business o parsing server delle risposte. Nessun percorso di input della demo raggiunge uno schema Zod individuato nell'ispezione. Il vincolo City non va sostituito arbitrariamente con Zod 4. |
| typescript-eslint 8.72.2 → typescript-estree → minimatch 10.2.6 | Moderate, amplificazione dei pattern; propagazione a parser, utils, type-utils, eslint-plugin, typescript-eslint ed eslint-plugin-qwik | Riguarda lint/analisi dei file. Il caso segnalato richiede pattern controllabili dall'attaccante e optimizationLevel ≥ 2. Non è un percorso HTTP della demo; i pattern di lint sono nel repository. Non modificare major transitive per azzerare il contatore. |

La copia Sharp 0.35.5 usata da Wrangler → Miniflare è distinta dalla 0.34.5 di
imagetools ed è fuori dagli intervalli di questi tre advisory. Minimatch 3.1.5
di ESLint/Vite non rientra nell'intervallo di questo specifico advisory;
questa osservazione non è una garanzia generale su tutti i suoi possibili difetti.

Fonti primarie consultate:

- [Sharp/libvips: versioni precedenti a 0.35.0](https://github.com/advisories/GHSA-f88m-g3jw-g9cj).
- [Sharp/libheif: versioni precedenti a 0.35.4](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c).
- [Sharp/librsvg: versioni precedenti a 0.35.5](https://github.com/advisories/GHSA-wq5f-xc86-pv6w).
- [Zod: intervallo segnalato < 4.6.6](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5).
- [Minimatch: intervallo ≥ 7 e < 11.0.1](https://github.com/advisories/GHSA-g3hv-75wg-m249).

## Controllo degli artefatti

Ispezionati 68 file JavaScript generati in `server/` e `dist/build/`, import
statici e marcatori Zod/ZodObject/sharp/minimatch/imagetools. Nessuna occorrenza
di questi marcatori; i moduli SSR importano i chunk locali generati. Hash SHA-256,
dimensioni, import e hash del lockfile sono in
[dependency-artifacts.json](evidence/4a/dependency-artifacts.json).
`dist/_worker.js` è solo l'entry che importa `../server/entry.cloudflare-pages`:
ispezionare esclusivamente quel piccolo file sarebbe insufficiente.

Questa è evidenza statica coerente con la separazione toolchain/runtime e con
il tree shaking osservato, non una prova formale di assenza di ogni codice
vulnerabile o una verifica di sfruttabilità. La classificazione devDependency
non è stata usata come giustificazione sufficiente. Non eseguiti payload di
attacco né test distruttivi di esaurimento risorse.

## Residuo e procedura futura

Nessun aggiornamento, override o `npm audit fix --force`. Il suggerimento npm
di sostituire City con 0.0.128 non conserva lo stack corrente; le major Zod,
Sharp e Minimatch richiedono una verifica dei rispettivi consumer.

Prima di una futura pubblicazione, rieseguire audit e albero, cercare release
compatibili dei pacchetti a monte, valutare gli advisory allora correnti e
ripetere build, test SSR e percorso browser in un'attività dedicata. Rivalutare
subito l'esposizione se si introducono action server, immagini esterne, upload
o pattern provenienti da utenti. Questa milestone non chiude l'audit di sicurezza.

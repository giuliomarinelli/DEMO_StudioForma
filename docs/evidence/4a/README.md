# Evidenze locali — Milestone 4A

Data: 15 novembre 2026. Baseline Git `698f1a1` più le correzioni della 4A.
Build Qwik City SSR con adapter ufficiale, Wrangler 4.162.0 su
http://127.0.0.1:8794. Browser Windows, user agent Chrome 157; viewport nominali
1440, 768, 390 e 320 px, altezza 1000. Nessun deploy remoto.

## Come leggere i report

| File | Esito e perimetro |
| --- | --- |
| [layout-report.json](layout-report.json) | `passed`: 40 combinazioni (nove rotte + 404 × quattro viewport), controllo del contrasto HTML; menu mobile e FAQ. Non è una certificazione WCAG. |
| [browser-report.json](browser-report.json) | `failed` per timeout dell'azione mouse su Copia il brief a 320 px; **37 controlli precedenti superati**, inclusi limiti, focus errori, revisione, markup letterale e passaggi intermedi ai quattro viewport. Nessun pageerror; non presentare l'intera esecuzione come superata. |
| [keyboard-report.json](keyboard-report.json) | `passed`: 8 controlli a 320 px, con intero percorso da tastiera, copia reale, ripiego su negazione simulata, reset annullato/confermato e reload. writeText risolto; nessuna rilettura degli appunti. |
| [browser-attempt-before-exclusivity.json](browser-attempt-before-exclusivity.json) | Tentativo precedente `failed`: 27 combinazioni raggiunte, poi timeout di stabilità durante scroll della tavola Officina 02. Contiene metriche e conteggi parziali; non prova il superamento di tutte le 40 combinazioni. |
| [npm-audit.json](npm-audit.json) | Audit npm del lockfile invariato, 12 pacchetti segnalati. Interpretazione in [DEPENDENCY_AUDIT](../../DEPENDENCY_AUDIT.md). |
| [dependency-artifacts.json](dependency-artifacts.json) | Hash del lockfile e di 68 moduli JS finali client/server, import statici e marcatori controllati. Ispezione statica, non prova formale di assenza di vulnerabilità. |

Il browser ha restituito regolarmente i report dei timeout di azione: non sono
timeout del servizio MCP. La prova da tastiera è una sequenza distinta, non un
click forzato. I controlli già eseguiti sulle pagine pubbliche non sono stati
ripetuti nella ripresa esclusiva. Gli esiti tecnici e la cronologia sono nel
[WORKLOG](../../WORKLOG.md); procedure e limiti in [DEPLOYMENT](../../DEPLOYMENT.md).

## Catture rappresentative

| Contenuto | Desktop/tablet | Mobile |
| --- | --- | --- |
| Homepage | [1440](home-1440.png) | [390](home-390.png), [320](home-320.png) |
| Portfolio e scheda | [Archivio 1440](portfolio-1440.png) | [Corte 01 a 390](project-390.png) |
| Pagine interne | [Studio 768](studio-768.png) | [Servizi 320](servizi-320.png), [Contatti 390](contatti-390.png) |
| Questionario iniziale | [1440](brief-initial-1440.png) | [390](brief-initial-390.png), [320](brief-initial-320.png) |
| Errori e passaggi intermedi | [Errori 1440](brief-errors-1440.png) | [Obiettivi](brief-goals-390.png), [Risorse](brief-resources-390.png), [Riepilogo con valori limite](brief-review-390.png) a 390 |
| Documento finale | [1440](brief-result-1440.png), [768](brief-result-768.png) | [390](brief-result-390.png), [320](brief-result-320.png) |
| Copia manuale | — | [Negazione simulata, 320](brief-copy-fallback-320.png) |

[failure.png](failure.png) è la cattura diagnostica della sequenza mouse fermata
su Copia, non un'ulteriore schermata di successo. I testi ripetuti e il markup
letterale nelle catture sono dati di test dei limiti, non contenuti editoriali.

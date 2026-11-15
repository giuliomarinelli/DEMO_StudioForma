# AGENTS.md - Studio Forma

## Scopo
Sito dimostrativo per uno studio di architettura fittizio. Funzionalita' distintiva: questionario guidato che genera una bozza di richiesta preliminare di progetto, da copiare, senza invio reale.

## Regole operative Codex
- Una sola sessione agente in questa repository; non avviare subagenti, non usare worktree, non orchestrare altri progetti.
- Leggi AGENTS.md e docs/MVP.md prima di lavorare. Implementa una milestone per volta su feature/* derivato da develop.
- Git flow: develop integra, preview e' staging, master e' produzione. Nessun merge su preview/master senza richiesta esplicita.
- Stack preferito: React, Vite, TypeScript strict, Tailwind CSS; sito statico su Cloudflare Pages.
- Nessun backend, database, servizio a pagamento o integrazione di invio reale nella prima versione.
- La demo deve dichiarare che azienda, informazioni e operazioni sono simulate.
- Non modificare DNS, Cloudflare, Access, secrets, CI o billing e non distribuire pubblicamente senza autorizzazione.
- Documenta ogni milestone in docs/WORKLOG.md: modifiche, motivazioni, comandi, test, problemi e passi successivi.
- Mantieni aggiornati README.md, docs/ARCHITECTURE.md, docs/DEPLOYMENT.md, docs/CASE_STUDY.md; documenta procedure riproducibili e rollback, mai credenziali.
- Esegui typecheck, lint, test pertinenti, build e comunica i risultati. Responsive, accessibile da tastiera, semantico, focus visibile.
- Usa immagini e asset con licenza verificabile e attribuzioni quando necessarie.
- A fine task riporta branch, commit, verifiche, comportamento ottenuto e blocchi.

## Sequenza milestone
1. Scaffold e identita' visiva distintiva.
2. Pagine e contenuti dimostrativi.
3. Interazione verticale come da docs/MVP.md.
4. Test, accessibilita', documentazione, preparazione al deploy; non distribuire.

# AGENTS.md - Studio Forma

## Scopo
Sito dimostrativo per uno studio di architettura fittizio. Funzionalita' distintiva: questionario guidato che genera una bozza di richiesta preliminare di progetto, da copiare, senza invio reale.

## Regole operative Codex
- Una sola sessione agente in questa repository; non avviare subagenti, non usare worktree, non orchestrare altri progetti.
- Leggi AGENTS.md e docs/MVP.md prima di lavorare. Implementa una milestone per volta su feature/* derivato da develop.
- Git flow: develop integra, preview e' staging, master e' produzione. Nessun merge su preview/master senza richiesta esplicita.
- Stack obbligatorio: Qwik + Qwik City con SSR (server-side rendering) per le pagine pubbliche, routing Qwik City, TypeScript strict e Tailwind CSS. Vite è ammesso solo come toolchain integrata di Qwik, non come scaffold React SPA. Usa l'adapter ufficiale Qwik City Cloudflare Pages e Pages Functions per SSR; evita backend applicativo separato, database, autenticazione e servizi a pagamento.
- Nessun backend applicativo separato, database, servizio a pagamento o integrazione di invio reale nella prima versione; le Pages Functions per SSR sono consentite.
- La demo deve dichiarare che azienda, informazioni e operazioni sono simulate.
- Non modificare DNS, Cloudflare, Access, secrets, CI o billing e non distribuire pubblicamente senza autorizzazione.
- Documenta ogni milestone in docs/WORKLOG.md: modifiche, motivazioni, comandi, test, problemi e passi successivi.
- Mantieni aggiornati README.md, docs/ARCHITECTURE.md, docs/DEPLOYMENT.md, docs/CASE_STUDY.md; documenta procedure riproducibili e rollback, mai credenziali.
- Esegui typecheck, lint, test pertinenti, build e comunica i risultati. Responsive, accessibile da tastiera, semantico, focus visibile.
- Usa immagini e asset con licenza verificabile e attribuzioni quando necessarie.
- A fine task riporta branch, commit, verifiche, comportamento ottenuto e blocchi.

- Per questa fase non eseguire merge o rebase. Crea commit atomici e inviali con push al solo branch di lavoro; disattiva GPG signing solo per il singolo comando commit (es. `git -c commit.gpgsign=false commit ...`) senza modificare impostazioni globali o repository permanenti.

## Rendering e hosting obbligatori
- Qwik City con SSR abilitato e Cloudflare Pages adapter: la risposta HTTP iniziale per ogni pagina pubblica deve contenere HTML utile, contenuti e metadati SEO (titolo, descrizione, canonical quando configurato).
- Verifica il rendering SSR anche sulla build di produzione, richiedendo direttamente almeno una rotta interna (non basarti soltanto sul risultato di `vite dev`). Le interazioni verticali possono funzionare con stato locale nel browser.
- Non trasformare il progetto in una SPA React/Vite e non sostituire SSR con una build SSG statica senza approvazione esplicita.
- Le Pages Functions richieste da SSR sono permesse; sono vietati backend business separati, database e servizi a pagamento nella demo.
- Il deployment reale e la configurazione Cloudflare Access sono riservati al proprietario.

## Sequenza milestone
1. Scaffold e identita' visiva distintiva.
2. Pagine e contenuti dimostrativi.
3. Interazione verticale come da docs/MVP.md.
4. Test, accessibilita', documentazione, preparazione al deploy; non distribuire.

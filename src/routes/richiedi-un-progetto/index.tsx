import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import { Arrow } from "~/components/ui/arrow";

export default component$(() => (
  <>
    <PageIntro
      number="05 /"
      label="Richiesta preliminare"
      title="Definire il quadro di partenza."
      description="Un percorso per trasformare le informazioni iniziali in una bozza leggibile. Questa anteprima presenta struttura, temi e risultato atteso del futuro questionario."
    >
      <p class="availability-note">
        <span class="blue-square" />
        Anteprima del percorso — il questionario non è ancora attivo.
      </p>
    </PageIntro>
    <section class="shell request-overview" aria-labelledby="request-structure">
      <div>
        <p class="eyebrow">05.1 / Struttura prevista</p>
        <h2 id="request-structure">
          Dalle condizioni
          <br />
          alle priorità.
        </h2>
        <p class="body-copy">
          Le informazioni saranno raccolte per temi, con un riepilogo
          modificabile. Il budget sarà facoltativo e non saranno richiesti dati
          personali obbligatori.
        </p>
        <ol class="request-stages">
          <li>
            <span class="eyebrow">01 / Inquadrare</span>
            <h3>Intervento e immobile</h3>
            <p>
              Tipologia, caratteristiche dello spazio e superficie indicativa.
            </p>
          </li>
          <li>
            <span class="eyebrow">02 / Orientare</span>
            <h3>Obiettivi e vincoli</h3>
            <p>
              Esigenze, riferimenti di stile, budget facoltativo e tempistiche.
            </p>
          </li>
          <li>
            <span class="eyebrow">03 / Rileggere</span>
            <h3>Descrizione e sintesi</h3>
            <p>Una bozza da controllare, modificare e copiare. Nessun invio.</p>
          </li>
        </ol>
      </div>
      <aside class="brief-preview" aria-labelledby="preview-title">
        <div class="brief-preview-bar">
          <span>SF / BRIEF PRELIMINARE</span>
          <span>FACSIMILE</span>
        </div>
        <div class="brief-preview-body">
          <p class="eyebrow">Esempio interamente fittizio</p>
          <h2 id="preview-title">
            Riorganizzazione
            <br />
            di un appartamento.
          </h2>
          <dl>
            <div>
              <dt>Intervento</dt>
              <dd>Architettura degli interni</dd>
            </div>
            <div>
              <dt>Superficie indicativa</dt>
              <dd>95 m² — dato di esempio</dd>
            </div>
            <div>
              <dt>Obiettivo</dt>
              <dd>
                Separare lo spazio di lavoro mantenendo una zona comune
                continua.
              </dd>
            </div>
            <div>
              <dt>Tempistiche</dt>
              <dd>Da definire</dd>
            </div>
          </dl>
          <p class="brief-preview-note">
            Questa è una composizione statica di esempio. Nessun dato è stato
            raccolto o generato.
          </p>
          <span class="technical-label">
            DOCUMENTO DIMOSTRATIVO / NON INVIATO
          </span>
        </div>
      </aside>
    </section>
    <section class="shell editorial-section" aria-labelledby="request-limits">
      <p class="eyebrow">05.2 / Il risultato</p>
      <div>
        <h2 id="request-limits">Una traccia preliminare.</h2>
        <p class="body-copy">
          La futura bozza servirà a ordinare le esigenze. Non sarà un
          preventivo, una valutazione di fattibilità o una proposta
          professionale. Il testo resterà nel browser e potrà essere copiato
          dall'utente, senza comunicazioni automatiche.
        </p>
        <p class="project-disclaimer">
          Questa anteprima è statica. Non è ancora possibile compilare, salvare,
          generare o copiare una richiesta. Nessun dato viene raccolto.
        </p>
        <a href="/portfolio/interno-03/" class="text-link">
          Consulta lo studio Interno 03
          <Arrow />
        </a>
      </div>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "Richiedi un progetto — Studio Forma",
  meta: [
    {
      name: "description",
      content:
        "Anteprima della richiesta preliminare Studio Forma: struttura prevista, informazioni e facsimile statico. Questionario non attivo, nessun dato raccolto o invio reale.",
    },
  ],
};

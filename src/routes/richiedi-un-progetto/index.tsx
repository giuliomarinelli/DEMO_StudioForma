import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import { Arrow } from "~/components/ui/arrow";

export default component$(() => (
  <>
    <PageIntro
      number="05 /"
      label="Richiedi un progetto"
      title="Diamo un inizio alla tua idea."
      description="Il primo passo sarà un percorso guidato per raccogliere esigenze, priorità e desideri. Una traccia da rileggere, modificare e copiare con calma."
    />
    <section class="detail-section shell">
      <div class="detail-grid">
        <h2>
          Prima di disegnare,
          <br />
          mettiamo a fuoco.
        </h2>
        <div class="body-copy">
          <p>
            Tipologia di intervento, spazi, obiettivi, stile e tempi: il futuro
            questionario aiuterà a trasformare un'intuizione in una bozza di
            richiesta preliminare.
          </p>
          <aside class="availability-note">
            <strong>Il questionario non è ancora attivo.</strong>
            <br />
            Questa prima versione prepara la struttura del sito. Il percorso
            guidato sarà implementato nella terza milestone e produrrà solo
            testo copiabile, senza invii reali o dati personali obbligatori.
          </aside>
          <a href="/servizi/" class="text-link mt-6">
            Intanto, esplora gli ambiti di progetto
            <Arrow />
          </a>
        </div>
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
        "Introduzione al futuro percorso guidato di Studio Forma. Questionario non ancora attivo; la demo non invia richieste reali.",
    },
  ],
};

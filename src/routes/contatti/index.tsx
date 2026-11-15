import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import { Arrow } from "~/components/ui/arrow";

export default component$(() => (
  <>
    <PageIntro
      number="04 /"
      label="I contatti"
      title="Il dialogo è il primo disegno."
      description="Un progetto comincia dal mettere a fuoco un desiderio. In questa demo puoi esplorare il modo in cui uno studio potrebbe accompagnare quel primo passo."
    />
    <section class="detail-section shell">
      <div class="detail-grid">
        <h2>Uno spazio per orientarsi.</h2>
        <div class="body-copy">
          <p>
            Che cosa vorresti cambiare? Quali ambienti vivi di più? Quale
            sensazione cerchi quando torni a casa? Sono le domande da cui
            partire per raccontare un'idea.
          </p>
          <a href="/richiedi-un-progetto/" class="text-link">
            Il punto di partenza del progetto
            <Arrow />
          </a>
          <aside class="availability-note">
            Non esistono una sede, un numero telefonico o un indirizzo email
            operativo di Studio Forma. Non sono disponibili invii o appuntamenti
            reali. Nessun dato viene richiesto in questa fase.
          </aside>
        </div>
      </div>
    </section>
  </>
));

export const head: DocumentHead = {
  title: "Contatti — Studio Forma",
  meta: [
    {
      name: "description",
      content:
        "Come iniziare a raccontare un progetto nella demo Studio Forma. Nessuna sede o contatto operativo, nessun invio reale.",
    },
  ],
};

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";

export default component$(() => (
  <>
    <PageIntro
      number="02 /"
      label="I servizi"
      title="Un pensiero d'insieme. Attenzione a ogni parte."
      description="Tre ambiti che dialogano tra loro, dalla scala dell'edificio al dettaglio di una stanza. Una prima introduzione ai servizi immaginari dello studio."
    />
    <section
      class="detail-section shell"
      aria-label="Ambiti di progetto dimostrativi"
    >
      <ul class="content-list">
        <li>
          <span class="eyebrow">01</span>
          <div>
            <h2>Architettura</h2>
            <p class="body-copy">
              Nuove configurazioni abitative, relazioni tra interno ed esterno e
              distribuzione degli spazi. Il punto di partenza è leggere il
              contesto e trasformare le esigenze in un'idea coerente.
            </p>
          </div>
        </li>
        <li>
          <span class="eyebrow">02</span>
          <div>
            <h2>Interni</h2>
            <p class="body-copy">
              Luce, materiali e arredi come parti dello stesso racconto.
              Ambienti pensati intorno alle abitudini, con una particolare
              attenzione alle proporzioni e all'uso quotidiano.
            </p>
          </div>
        </li>
        <li>
          <span class="eyebrow">03</span>
          <div>
            <h2>Riqualificazione</h2>
            <p class="body-copy">
              Ripensare l'esistente conservandone il carattere. Esplorare nuove
              possibilità d'uso e valorizzare gli elementi che rendono
              riconoscibile un luogo.
            </p>
          </div>
        </li>
      </ul>
      <p class="body-copy">
        Questi ambiti sono descritti a scopo dimostrativo. Nessuna prestazione
        professionale è offerta attraverso il sito.
      </p>
    </section>
  </>
));

export const head: DocumentHead = {
  title: "Servizi — Studio Forma",
  meta: [
    {
      name: "description",
      content:
        "Architettura, interni e riqualificazione: introduzione agli ambiti dimostrativi di Studio Forma. Nessuna prestazione reale.",
    },
  ],
};

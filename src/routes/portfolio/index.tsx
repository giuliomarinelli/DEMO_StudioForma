import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import casaCorte from "~/media/casa-corte.svg?url";

export default component$(() => (
  <>
    <PageIntro
      number="03 /"
      label="Il portfolio"
      title="Esercizi di spazio. Possibilità di vita."
      description="Un taccuino di architetture immaginarie. La luce e il rapporto tra pieni e vuoti guidano il primo studio visivo della demo."
    />
    <section
      class="detail-section shell concept-panel"
      aria-labelledby="concept-title"
    >
      <img
        src={casaCorte}
        width="1000"
        height="1100"
        alt="Studio volumetrico originale: casa a corte con vetrate, terrazza e ulivo."
      />
      <div>
        <p class="eyebrow">Taccuino / 01 — Concept fittizio</p>
        <h2 id="concept-title">Casa della luce</h2>
        <p class="body-copy">
          Volumi essenziali si raccolgono intorno a uno spazio aperto. Una
          terrazza a gradoni diventa una soglia lenta tra la casa e il
          paesaggio.
        </p>
        <aside class="availability-note">
          Questa illustrazione è un concept originale, non un edificio
          realizzato. Le tre schede di progetto complete previste dall'MVP
          saranno sviluppate nella milestone dedicata ai contenuti.
        </aside>
      </div>
    </section>
  </>
));

export const head: DocumentHead = {
  title: "Portfolio — Studio Forma",
  meta: [
    {
      name: "description",
      content:
        "Il taccuino di Studio Forma: Casa della luce, primo concept architettonico originale e fittizio. Struttura iniziale del portfolio demo.",
    },
  ],
};

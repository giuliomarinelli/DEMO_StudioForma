import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import { BriefBuilder } from "~/components/brief/brief-builder";

export default component$(() => (
  <>
    <PageIntro
      number="05 /"
      label="Richiesta preliminare"
      title="Definire il quadro di partenza."
      description="Raccogli intervento, caratteristiche dello spazio e priorità. Rileggi le risposte e genera un brief architettonico preliminare da copiare, senza inviare alcuna richiesta."
    >
      <p class="availability-note">
        <span class="blue-square" />
        Strumento dimostrativo / Nessun dato personale richiesto
      </p>
    </PageIntro>
    <BriefBuilder />
  </>
));
export const head: DocumentHead = {
  title: "Richiedi un progetto — Studio Forma",
  meta: [
    {
      name: "description",
      content:
        "Generatore dimostrativo di brief architettonici: questionario guidato, riepilogo modificabile e documento copiabile. Nessun dato personale richiesto o invio reale.",
    },
  ],
};

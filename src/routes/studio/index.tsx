import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import { Arrow } from "~/components/ui/arrow";

export default component$(() => (
  <>
    <PageIntro
      number="01 /"
      label="Lo studio"
      title="Prima le persone. Poi le forme."
      description="Studio Forma è un'idea di studio di architettura: un luogo dove l'ascolto incontra il disegno e ogni scelta torna alla vita di chi abita gli spazi."
    />
    <section class="detail-section shell">
      <div class="detail-grid">
        <h2>Progettare è prestare attenzione.</h2>
        <div class="body-copy">
          <p>
            All'orientamento di una stanza, alle tracce di un edificio, ai
            percorsi di ogni giorno. Il nostro approccio immaginario parte da
            qui: leggere ciò che esiste, capire ciò che serve, dare forma a ciò
            che può diventare.
          </p>
          <p>
            Materiali sinceri, proporzioni misurate e luce naturale sono il filo
            che tiene insieme questa esplorazione.
          </p>
          <a href="/servizi/" class="text-link">
            I nostri ambiti di progetto
            <Arrow />
          </a>
          <aside class="availability-note">
            Studio Forma è uno studio fittizio creato per questa demo. Non
            rappresenta professionisti, una sede o un'attività realmente
            operativa.
          </aside>
        </div>
      </div>
    </section>
  </>
));

export const head: DocumentHead = {
  title: "Lo studio — Studio Forma",
  meta: [
    {
      name: "description",
      content:
        "Luce, materia e ascolto: la filosofia di Studio Forma, studio di architettura interamente fittizio. Contenuti dimostrativi.",
    },
  ],
};

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import { Arrow } from "~/components/ui/arrow";

export default component$(() => (
  <>
    <PageIntro
      number="01 /"
      label="Profilo dello studio"
      title="Metodo prima della forma."
      description="Studio Forma è uno studio di architettura fittizio dedicato al rapporto tra spazio, struttura e modi d'uso. Questo sito ne costruisce l'identità attraverso una ricerca progettuale interamente concettuale."
    />
    <section class="shell editorial-section" aria-labelledby="practice-title">
      <p class="eyebrow">01.1 / La pratica</p>
      <div>
        <h2 id="practice-title">
          L'architettura come
          <br />
          lettura e trasformazione.
        </h2>
        <p class="body-copy">
          La ricerca si concentra su architettura residenziale, interni e
          recupero dell'esistente. Ogni studio parte da una lettura: che cosa è
          presente, quali relazioni funzionano, dove un nuovo uso richiede una
          modifica.
        </p>
        <p class="body-copy">
          La forma è il risultato di queste decisioni. Piante, sezioni e
          assonometrie servono a rendere esplicite le ipotesi, confrontarle e
          riconoscere ciò che resta da approfondire.
        </p>
      </div>
    </section>
    <section class="method-section">
      <div class="shell">
        <div class="section-heading">
          <p class="eyebrow">01.2 / Il metodo</p>
          <h2>Tre passaggi di lavoro.</h2>
        </div>
        <ol class="decision-grid">
          {[
            {
              id: "01",
              title: "Leggere",
              text: "Raccogliere vincoli, usi e caratteri del contesto. Distinguere le condizioni esistenti dalle ipotesi ancora da verificare.",
            },
            {
              id: "02",
              title: "Mettere in relazione",
              text: "Confrontare distribuzione, struttura, luce e materiali. Costruire alternative comprensibili, evitando che ogni scelta proceda da sola.",
            },
            {
              id: "03",
              title: "Rappresentare",
              text: "Tradurre l’ipotesi in un sistema di tavole. Rendere leggibili le decisioni, i passaggi e il livello di definizione raggiunto.",
            },
          ].map((item) => (
            <li key={item.id}>
              <span class="eyebrow">{item.id}</span>
              <h3>{item.title}</h3>
              <p class="body-copy">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
    <section class="shell editorial-section" aria-labelledby="principles-title">
      <p class="eyebrow">01.3 / Criteri</p>
      <div>
        <h2 id="principles-title">
          Continuità, precisione,
          <br />
          possibilità d'uso.
        </h2>
        <div class="principle-list">
          <div>
            <h3>Continuità con il contesto</h3>
            <p class="body-copy">
              Riconoscere le proporzioni e gli elementi che danno carattere a un
              luogo. L'intervento non parte da una superficie vuota.
            </p>
          </div>
          <div>
            <h3>Precisione della materia</h3>
            <p class="body-copy">
              Usare il materiale per distinguere struttura, involucro e
              dettaglio. La sua presenza deve sostenere la logica del progetto.
            </p>
          </div>
          <div>
            <h3>Chiarezza delle relazioni</h3>
            <p class="body-copy">
              Valutare come le parti si connettono e come gli ambienti possono
              accogliere usi differenti.
            </p>
          </div>
        </div>
        <a href="/portfolio/" class="text-link">
          Leggi i tre studi di progetto
          <Arrow />
        </a>
        <p class="project-disclaimer">
          Nessun team, titolo professionale, premio o incarico reale è
          rappresentato da questa demo. Studio Forma non è un'attività
          operativa.
        </p>
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
        "Profilo e metodo di Studio Forma: lettura del contesto, relazione tra struttura e usi, rappresentazione. Studio di architettura fittizio, demo editoriale.",
    },
  ],
};

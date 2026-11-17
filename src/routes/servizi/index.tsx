import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import { Arrow } from "~/components/ui/arrow";
import { projects } from "~/lib/projects";

export default component$(() => (
  <>
    <PageIntro
      number="02 /"
      label="Ambiti di progetto"
      title="Tre ambiti. Un metodo di progetto."
      description="Architettura, interni e recupero richiedono scale di lettura diverse. Il metodo resta comune: definire il problema, mettere in relazione le parti, rendere l'ipotesi leggibile."
    />
    <div class="shell services-catalogue">
      {[
        {
          id: "01",
          title: "Architettura",
          subtitle: "Organizzare volumi, usi e contesto.",
          text: "Studi di nuove configurazioni abitative e rapporti tra edificio e spazi aperti. L’attenzione è rivolta a impianto, distribuzione e leggibilità della struttura.",
          items: [
            "Lettura del contesto e del programma",
            "Alternative volumetriche e distributive",
            "Tavole di concept e criteri materici",
          ],
          project: projects[0],
        },
        {
          id: "02",
          title: "Interni",
          subtitle: "Progettare lo spazio alla scala quotidiana.",
          text: "Riorganizzazione degli ambienti e relazione tra parti fisse, arredi e percorsi. Luce e materia sono considerate insieme al programma d’uso.",
          items: [
            "Studio dei percorsi e delle adiacenze",
            "Configurazioni di arredo e contenimento",
            "Palette materica e schemi di dettaglio",
          ],
          project: projects[2],
        },
        {
          id: "03",
          title: "Recupero dell’esistente",
          subtitle: "Riconoscere ciò che resta. Definire ciò che cambia.",
          text: "Ipotesi di riuso per edifici e spazi che accolgono un nuovo programma. La relazione tra elementi conservati e nuovi innesti diventa il tema centrale.",
          items: [
            "Lettura dei caratteri dell’involucro",
            "Compatibilità spaziale del nuovo programma",
            "Schema degli interventi e degli innesti",
          ],
          project: projects[1],
        },
      ].map((service) => (
        <section
          key={service.id}
          id={"ambito-" + service.id}
          class="service-detail"
          aria-labelledby={"service-" + service.id}
        >
          <p class="eyebrow">Ambito / {service.id}</p>
          <div>
            <h2 id={"service-" + service.id}>{service.title}</h2>
            <p class="service-subtitle">{service.subtitle}</p>
            <p class="body-copy">{service.text}</p>
            <h3 class="eyebrow mt-8">Elaborati concettuali</h3>
            <ul class="deliverables">
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              href={"/portfolio/" + service.project.slug + "/"}
              class="text-link"
            >
              Studio correlato: {service.project.title}
              <Arrow />
            </a>
          </div>
        </section>
      ))}
    </div>
    <section class="shell service-boundary">
      <p class="eyebrow">Perimetro della demo</p>
      <p class="body-copy">
        Gli ambiti e gli elaborati descrivono il lavoro di uno studio
        immaginario. Il sito non offre prestazioni, preventivi, consulenze o
        verifiche professionali reali. Le schede del portfolio mostrano il
        livello concettuale delle ipotesi.
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
        "Architettura, interni e recupero dell’esistente: ambiti, criteri ed elaborati concettuali dello studio fittizio Studio Forma. Nessuna prestazione reale.",
    },
  ],
};

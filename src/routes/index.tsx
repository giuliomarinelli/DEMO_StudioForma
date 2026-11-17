import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Arrow } from "~/components/ui/arrow";
import { ProjectCard } from "~/components/projects/project-card";
import { projects } from "~/lib/projects";

export default component$(() => (
  <>
    <section class="hero shell" aria-labelledby="hero-title">
      <div class="hero-register">
        <p class="eyebrow">
          <span class="blue-square" />
          Studio Forma / Architettura contemporanea
        </p>
        <span class="technical-label">Indice di ricerca / 2026</span>
      </div>
      <h1 id="hero-title">
        Spazio, materia,
        <br />
        <span>trasformazione.</span>
      </h1>
      <div class="hero-baseline">
        <span class="hero-cross" aria-hidden="true">
          +
        </span>
        <p>
          Architettura, interni e recupero dell'esistente.
          <br />
          Un metodo di lettura. Tre ipotesi di progetto.
        </p>
        <a href="/portfolio/" class="button button-dark">
          Esplora i progetti
          <Arrow diagonal />
        </a>
      </div>
      <figure class="hero-plate">
        <img
          src={projects[0].drawing}
          width="1200"
          height="660"
          alt={projects[0].drawingAlt}
          fetchPriority="high"
        />
        <figcaption>
          <span>SF—01 / Corte 01</span>
          <span>Studio volumetrico · Progetto fittizio</span>
          <a href="/portfolio/corte-01/" aria-label="Apri la scheda Corte 01">
            <Arrow diagonal />
          </a>
        </figcaption>
        <div class="plate-index" aria-hidden="true">
          F<span>01—03</span>
        </div>
      </figure>
    </section>
    <section class="shell editorial-section" aria-labelledby="practice-title">
      <p class="eyebrow">01 / Posizione</p>
      <div>
        <h2 id="practice-title">
          Leggere il contesto.
          <br />
          Costruire una risposta.
        </h2>
        <div class="editorial-bottom">
          <p class="body-copy">
            Lo spazio si definisce attraverso struttura, usi e materia. Studio
            Forma indaga queste relazioni con disegni, modelli concettuali e
            scelte verificabili nella rappresentazione. Un archivio di ricerca,
            interamente dimostrativo.
          </p>
          <a href="/studio/" class="text-link">
            Profilo e metodo
            <Arrow />
          </a>
        </div>
      </div>
    </section>
    <section class="selected-projects" aria-labelledby="projects-title">
      <div class="shell">
        <div class="section-heading">
          <div>
            <p class="eyebrow">02 / Archivio dei progetti</p>
            <h2 id="projects-title">
              Tre contesti.
              <br />
              Tre trasformazioni.
            </h2>
          </div>
          <a href="/portfolio/" class="text-link">
            L'archivio completo
            <Arrow />
          </a>
        </div>
        <div class="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
    <section class="shell scope-section" aria-labelledby="scope-title">
      <div class="section-heading">
        <p class="eyebrow">03 / Campi di lavoro</p>
        <h2 id="scope-title">Dall'edificio al dettaglio.</h2>
      </div>
      <div class="scope-list">
        {[
          {
            id: "01",
            title: "Architettura",
            text: "Volumi, distribuzione, rapporto con il contesto.",
          },
          {
            id: "02",
            title: "Interni",
            text: "Organizzazione degli usi, luce, materia e arredo.",
          },
          {
            id: "03",
            title: "Recupero",
            text: "Lettura dell’esistente, nuovi programmi, innesti.",
          },
        ].map((item) => (
          <a key={item.id} href={"/servizi/#ambito-" + item.id}>
            <span class="eyebrow">{item.id}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Arrow diagonal />
          </a>
        ))}
      </div>
    </section>
    <section class="brief-band">
      <div class="shell brief-band-inner">
        <p class="eyebrow">04 / Richiesta preliminare</p>
        <div>
          <h2>
            Definire il progetto,
            <br />
            prima del progetto.
          </h2>
          <p>
            Un percorso per ordinare contesto, esigenze e priorità. Compila il
            questionario e prepara una bozza da rileggere e copiare.
          </p>
          <a class="text-link" href="/richiedi-un-progetto/">
            Prepara il brief
            <Arrow />
          </a>
        </div>
        <span class="brief-band-number" aria-hidden="true">
          04
        </span>
      </div>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "Studio Forma — Architettura, materia, metodo",
  meta: [
    {
      name: "description",
      content:
        "Architettura contemporanea, interni e recupero: tre studi concettuali di Studio Forma. Un archivio dimostrativo di progetti interamente fittizi.",
    },
  ],
};

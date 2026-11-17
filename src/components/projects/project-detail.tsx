import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { Project } from "~/lib/projects";
import { Arrow } from "../ui/arrow";

export function projectHead(project: Project): DocumentHead {
  return {
    title: `${project.title} — Studio Forma`,
    meta: [
      {
        name: "description",
        content: `${project.summary} Studio concettuale fittizio, non realizzato.`,
      },
    ],
  };
}

export const ProjectDetail = component$<{ project: Project; next: Project }>(
  ({ project, next }) => (
    <article class="project-detail">
      <header class="shell project-intro">
        <a href="/portfolio/" class="back-link">
          ← Tutti i progetti
        </a>
        <div class="project-heading">
          <div>
            <p class="eyebrow">
              SF / 2026 / {project.id} — {project.category}
            </p>
            <h1>{project.title}</h1>
          </div>
          <p class="project-subtitle">{project.subtitle}</p>
        </div>
        <p class="concept-label">
          Studio concettuale · Progetto fittizio · Non realizzato
        </p>
      </header>
      <figure class="shell project-figure">
        <img
          src={project.drawing}
          width="1200"
          height="660"
          alt={project.drawingAlt}
          fetchPriority="high"
        />
        <figcaption>
          <span>Tavola {project.id}.01</span>
          <span>{project.drawingLabel}</span>
        </figcaption>
      </figure>
      <div class="shell">
        <dl class="project-facts">
          <div>
            <dt>Ambito</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Superficie di studio</dt>
            <dd>
              {project.area} <small>(ipotetica)</small>
            </dd>
          </div>
          <div>
            <dt>Contesto</dt>
            <dd>{project.context}</dd>
          </div>
          <div>
            <dt>Programma</dt>
            <dd>{project.programme}</dd>
          </div>
        </dl>
        <section
          class="editorial-section project-brief"
          aria-labelledby="project-brief-title"
        >
          <p class="eyebrow">01 / Impostazione</p>
          <div>
            <h2 id="project-brief-title">La domanda di progetto.</h2>
            <p class="body-copy">{project.question}</p>
            <h2 class="secondary-heading">L'ipotesi.</h2>
            <p class="body-copy">{project.hypothesis}</p>
          </div>
        </section>
        <section class="project-decisions" aria-labelledby="decisions-title">
          <div class="section-heading">
            <p class="eyebrow">02 / Criteri</p>
            <h2 id="decisions-title">Tre scelte, un sistema.</h2>
          </div>
          <ol class="decision-grid">
            {project.decisions.map((decision, index) => (
              <li key={decision.title}>
                <span class="eyebrow">0{index + 1}</span>
                <h3>{decision.title}</h3>
                <p class="body-copy">{decision.text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          class="project-study"
          id="lettura-progettuale"
          aria-labelledby="study-title"
        >
          <div class="section-heading">
            <p class="eyebrow">03 / Lettura progettuale</p>
            <h2 id="study-title">{project.study.title}</h2>
          </div>
          <dl class="study-reasoning">
            <div>
              <dt>Problema</dt>
              <dd>{project.study.problem}</dd>
            </div>
            <div>
              <dt>Ipotesi</dt>
              <dd>{project.study.hypothesis}</dd>
            </div>
            <div>
              <dt>Soluzione nello schema</dt>
              <dd>{project.study.solution}</dd>
            </div>
          </dl>
          <div
            class={[
              "study-drawings",
              { "study-drawings-pair": project.study.drawings.length > 1 },
            ]}
          >
            {project.study.drawings.map((drawing, index) => (
              <figure class="study-figure" key={drawing.number}>
                <img
                  src={drawing.asset}
                  width="640"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  alt={drawing.alt}
                  aria-describedby={`study-caption-${index}`}
                />
                <figcaption id={`study-caption-${index}`}>
                  <p class="eyebrow">
                    Tavola {drawing.number} / Schema non in scala
                  </p>
                  <h3>{drawing.title}</h3>
                  <p class="body-copy">{drawing.description}</p>
                  <ol class="study-annotations">
                    {drawing.annotations.map((annotation) => (
                      <li key={annotation.number}>
                        <span class="study-marker" aria-hidden="true">
                          {annotation.number}
                        </span>
                        <div>
                          <h4>{annotation.title}</h4>
                          <p>{annotation.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </figcaption>
              </figure>
            ))}
          </div>
          <p class="project-disclaimer">
            Elaborati concettuali originali. Progetto fittizio e non realizzato;
            schemi non in scala, misure e superfici ipotetiche. Nessuna
            prestazione tecnica certificata.
          </p>
        </section>
        <section class="editorial-section" aria-labelledby="materials-title">
          <p class="eyebrow">04 / Materia</p>
          <div>
            <h2 id="materials-title">Materiali e carattere.</h2>
            <p class="body-copy">{project.materials}</p>
            <p class="project-disclaimer">
              Progetto interamente fittizio. Contesto, programma e superfici
              sono ipotesi narrative. Le tavole sono schemi concettuali non in
              scala; non rappresentano un edificio realizzato, un incarico reale
              o prestazioni tecniche verificate.
            </p>
          </div>
        </section>
        <nav class="project-next" aria-label="Navigazione progetti">
          <span class="eyebrow">Progetto successivo / {next.id}</span>
          <a href={`/portfolio/${next.slug}/`}>
            {next.title}
            <Arrow diagonal />
          </a>
        </nav>
      </div>
    </article>
  ),
);

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import { ProjectCard } from "~/components/projects/project-card";
import { projects } from "~/lib/projects";

export default component$(() => (
  <>
    <PageIntro
      number="03 /"
      label="Archivio dei progetti"
      title="Tre contesti. Tre trasformazioni."
      description="Una casa a corte, un involucro industriale, un appartamento urbano. Tre studi autonomi indagano come struttura, distribuzione e materia possono rispondere a programmi diversi."
    />
    <section
      class="shell portfolio-archive"
      aria-label="Tre progetti concettuali"
    >
      <div class="archive-register">
        <span class="eyebrow">Archivio / 01—03</span>
        <span class="technical-label">
          Studi concettuali · Fittizi · Non realizzati
        </span>
      </div>
      <div class="project-grid portfolio-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <p class="project-disclaimer">
        Tutti i progetti sono stati ideati per questa demo. Superfici, contesti
        e programmi sono ipotetici. I disegni sono schemi originali non in scala
        e non documentano incarichi reali.
      </p>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "Portfolio — Studio Forma",
  meta: [
    {
      name: "description",
      content:
        "Corte 01, Officina 02 e Interno 03: tre schede architettoniche con tavole originali, dati di studio e scelte progettuali. Progetti concettuali interamente fittizi.",
    },
  ],
};

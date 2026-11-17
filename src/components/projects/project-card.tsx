import { component$ } from "@builder.io/qwik";
import type { Project } from "~/lib/projects";
import { Arrow } from "../ui/arrow";

export const ProjectCard = component$<{ project: Project }>(({ project }) => (
  <article class="project-card">
    <a href={`/portfolio/${project.slug}/`} class="project-card-link">
      <div class="project-card-image">
        <img
          src={project.drawing}
          width="1200"
          height="660"
          alt={project.drawingAlt}
          loading="lazy"
        />
        <span class="drawing-corner" aria-hidden="true">
          SF—{project.id}
        </span>
      </div>
      <div class="project-card-meta">
        <span>{project.category}</span>
        <span>{project.area} / Ipotesi</span>
      </div>
      <div class="project-card-title">
        <h3>{project.title}</h3>
        <Arrow diagonal />
      </div>
      <p>{project.subtitle}</p>
      <span class="concept-label">Studio concettuale · Progetto fittizio</span>
    </a>
  </article>
));

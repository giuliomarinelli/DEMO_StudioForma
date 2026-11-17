import { component$ } from "@builder.io/qwik";
import {
  ProjectDetail,
  projectHead,
} from "~/components/projects/project-detail";
import { projects } from "~/lib/projects";

export default component$(() => (
  <ProjectDetail project={projects[2]} next={projects[0]} />
));
export const head = projectHead(projects[2]);

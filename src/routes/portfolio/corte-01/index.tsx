import { component$ } from "@builder.io/qwik";
import {
  ProjectDetail,
  projectHead,
} from "~/components/projects/project-detail";
import { projects } from "~/lib/projects";

export default component$(() => (
  <ProjectDetail project={projects[0]} next={projects[1]} />
));
export const head = projectHead(projects[0]);

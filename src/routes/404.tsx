import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import { Arrow } from "~/components/ui/arrow";

export default component$(() => (
  <PageIntro
    number="404 /"
    label="Fuori dal disegno"
    title="Questo spazio non c'è."
    description="La pagina cercata non esiste. Torna alla homepage per riprendere l'esplorazione."
  >
    <a href="/" class="button button-dark">
      Torna alla home
      <Arrow />
    </a>
  </PageIntro>
));
export const head: DocumentHead = {
  title: "Pagina non trovata — Studio Forma",
  meta: [
    { name: "robots", content: "noindex" },
    {
      name: "description",
      content:
        "La pagina cercata non esiste. Torna alla homepage di Studio Forma.",
    },
  ],
};

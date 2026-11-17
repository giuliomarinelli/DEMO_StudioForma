import { component$, Slot } from "@builder.io/qwik";

export const PageIntro = component$<{
  number: string;
  label: string;
  title: string;
  description: string;
}>((props) => (
  <section class="page-intro shell">
    <div class="eyebrow">
      <span class="index-number">{props.number}</span>
      {props.label}
    </div>
    <h1>{props.title}</h1>
    <p class="intro-description">{props.description}</p>
    <Slot />
  </section>
));

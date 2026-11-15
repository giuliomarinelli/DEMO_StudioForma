import { component$, Slot } from "@builder.io/qwik";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";

export default component$(() => (
  <>
    <a class="skip-link" href="#contenuto">
      Vai al contenuto
    </a>
    <div class="demo-banner">
      Uno studio immaginario. Un modo concreto di pensare lo spazio.
      <span> Esperienza demo</span>
    </div>
    <Header />
    <main id="contenuto" tabIndex={-1}>
      <Slot />
    </main>
    <Footer />
  </>
));

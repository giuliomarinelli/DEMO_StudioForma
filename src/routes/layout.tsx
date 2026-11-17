import { component$, Slot } from "@builder.io/qwik";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";

export default component$(() => (
  <>
    <a class="skip-link" href="#contenuto">
      Vai al contenuto
    </a>
    <div class="demo-banner">
      <span>SF / DEMO</span> Studio di architettura fittizio. Progetti
      concettuali, nessun invio reale.
    </div>
    <Header />
    <main id="contenuto" tabIndex={-1}>
      <Slot />
    </main>
    <Footer />
  </>
));

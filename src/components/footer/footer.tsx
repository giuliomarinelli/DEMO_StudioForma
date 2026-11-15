import { component$ } from "@builder.io/qwik";
import { navigation } from "~/lib/navigation";
import { Arrow } from "../ui/arrow";

export const Footer = component$(() => (
  <footer class="site-footer">
    <div class="shell">
      <div class="footer-top">
        <div>
          <p class="eyebrow">Ogni spazio ha un inizio</p>
          <p class="footer-title">
            Facciamo spazio
            <br />
            alle idee.
          </p>
        </div>
        <a class="button button-light" href="/richiedi-un-progetto/">
          Il tuo punto di partenza
          <Arrow diagonal />
        </a>
      </div>
      <div class="footer-bottom">
        <a href="/" class="footer-wordmark" aria-label="Studio Forma, homepage">
          studio forma.
        </a>
        <nav
          aria-label="Navigazione a piè di pagina"
          class="flex flex-wrap gap-x-5 gap-y-3"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <span class="text-xs">Architettura, in forma di demo.</span>
      </div>
      <p class="demo-note">
        <span class="demo-dot" aria-hidden="true" />
        Sito dimostrativo. Studio, informazioni e progetti sono fittizi. Nessuna
        richiesta viene inviata.
      </p>
    </div>
  </footer>
));

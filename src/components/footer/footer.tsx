import { component$ } from "@builder.io/qwik";
import { navigation } from "~/lib/navigation";
import { Arrow } from "../ui/arrow";

export const Footer = component$(() => (
  <footer class="site-footer">
    <div class="shell">
      <div class="footer-top">
        <div>
          <p class="eyebrow">Studio Forma / Architettura e ricerca</p>
          <p class="footer-title">
            Metodo.
            <br />
            Materia. Forma.
          </p>
        </div>
        <div class="footer-action">
          <p>
            Organizza le esigenze del progetto in un brief preliminare. Compila,
            rileggi e copia il documento. Nessun invio reale.
          </p>
          <a class="button button-light" href="/richiedi-un-progetto/">
            Richiesta preliminare
            <Arrow diagonal />
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <a href="/" class="footer-wordmark" aria-label="Studio Forma, homepage">
          studio forma<span>.</span>
        </a>
        <nav
          aria-label="Navigazione a piè di pagina"
          class="flex flex-wrap gap-x-6 gap-y-3"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <span class="technical-label">SF / Edizione dimostrativa 2026</span>
      </div>
      <p class="demo-note">
        <span class="demo-dot" aria-hidden="true" />
        Sito dimostrativo. Studio, informazioni e progetti sono fittizi. Nessuna
        richiesta viene inviata.
      </p>
    </div>
  </footer>
));

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Arrow } from "~/components/ui/arrow";
import casaCorte from "~/media/casa-corte.svg?url";

export default component$(() => (
  <>
    <section class="hero shell" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">
          <span class="tiny-cross" aria-hidden="true">
            +
          </span>
          Architettura · Interni · Paesaggio
        </p>
        <h1 id="hero-title">
          Lo spazio,
          <br />
          dalla tua
          <br />
          <em>parte.</em>
        </h1>
        <p class="hero-description">
          Luoghi da vivere, prima che da guardare.
          <br class="hidden sm:block" /> Immaginiamo architetture che mettono al
          centro
          <br class="hidden xl:block" /> le persone, la luce e le possibilità.
        </p>
        <a href="/studio/" class="button button-dark">
          Entra nello studio
          <Arrow diagonal />
        </a>
        <div class="hero-footnote">
          <span class="small-rule" />
          Uno sguardo attento. Una forma essenziale.
        </div>
      </div>
      <figure class="hero-figure">
        <div class="hero-image-wrap">
          <img
            src={casaCorte}
            width="1000"
            height="1100"
            alt="Illustrazione originale di una casa a corte: volumi chiari, grandi vetrate e un ulivo su una terrazza a gradoni."
            fetchPriority="high"
          />
          <span class="image-tag">Taccuino di architettura — 01</span>
          <span class="image-coordinate" aria-hidden="true">
            F / 01
          </span>
        </div>
        <figcaption>
          <div>
            <strong>Casa della luce</strong>
            <span>Studio di volumi · Concept fittizio</span>
          </div>
          <a href="/portfolio/" aria-label="Esplora il portfolio dimostrativo">
            <Arrow diagonal />
          </a>
        </figcaption>
      </figure>
    </section>
    <section class="manifesto shell" aria-labelledby="manifesto-title">
      <p class="eyebrow">
        <span class="index-number">01 /</span>Il nostro sguardo
      </p>
      <div>
        <h2 id="manifesto-title">
          Non solo metri quadri.
          <br />
          <span class="text-muted">Modi di stare bene.</span>
        </h2>
        <div class="manifesto-bottom">
          <p>
            Una finestra orientata al mattino. Un materiale che migliora con il
            tempo. Un passaggio che diventa incontro. Per noi, il progetto
            comincia dalle piccole cose che cambiano il quotidiano.
          </p>
          <a href="/studio/" class="text-link">
            La filosofia dello studio
            <Arrow />
          </a>
        </div>
      </div>
    </section>
    <section class="services-section" aria-labelledby="services-title">
      <div class="shell">
        <div class="section-heading">
          <div>
            <p class="eyebrow">02 / Cosa immaginiamo</p>
            <h2 id="services-title">Dall'idea, all'abitare.</h2>
          </div>
          <a href="/servizi/" class="text-link">
            Esplora i servizi
            <Arrow />
          </a>
        </div>
        <div class="service-grid">
          {[
            {
              number: "01",
              title: "Architettura",
              text: "Dare una nuova prospettiva a un edificio. Progettare relazioni tra spazi, persone e contesto.",
              shape: "architecture",
            },
            {
              number: "02",
              title: "Interni",
              text: "Trovare un equilibrio tra materia e gesti quotidiani. Con luce, proporzioni e dettagli su misura.",
              shape: "interiors",
            },
            {
              number: "03",
              title: "Riqualificazione",
              text: "Riconoscere ciò che merita di restare. Immaginare una seconda vita per gli spazi esistenti.",
              shape: "renewal",
            },
          ].map((service) => (
            <a key={service.number} href="/servizi/" class="service-item">
              <div class="service-top">
                <span>{service.number}</span>
                <Arrow diagonal />
              </div>
              <div class={["volume-sketch", service.shape]} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
    <section class="starting-point shell">
      <p class="eyebrow">03 / Il primo passo</p>
      <div>
        <h2>
          Le idee hanno bisogno
          <br />
          di un po' di spazio.
        </h2>
        <p>
          Una ristrutturazione, una casa da ripensare, un'esigenza ancora da
          mettere a fuoco. Ogni progetto comincia da una domanda.
        </p>
        <a class="text-link" href="/richiedi-un-progetto/">
          Scopri da dove iniziare
          <Arrow />
        </a>
      </div>
      <span class="large-asterisk" aria-hidden="true">
        ✳
      </span>
    </section>
  </>
));

export const head: DocumentHead = {
  title: "Studio Forma — Architettura per abitare",
  meta: [
    {
      name: "description",
      content:
        "Architettura, interni e riqualificazione: scopri Studio Forma, uno studio fittizio che mette al centro persone, luce e modi di abitare. Esperienza demo.",
    },
  ],
};

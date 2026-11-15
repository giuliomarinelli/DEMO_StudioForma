import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PageIntro } from "~/components/ui/page-intro";
import { Arrow } from "~/components/ui/arrow";

export default component$(() => (
  <>
    <PageIntro
      number="04 /"
      label="Contatti e orientamento"
      title="Un confronto comincia dai dati di partenza."
      description="Tipo di intervento, caratteri dell'immobile e obiettivi permettono di impostare una prima conversazione di progetto. Questa pagina chiarisce il perimetro dimostrativo e indica come orientarsi nel sito."
    />
    <section class="shell contact-panel" aria-labelledby="contact-status">
      <div class="contact-status">
        <span class="eyebrow">SF / Stato dello studio</span>
        <h2 id="contact-status">
          Studio fittizio.
          <br />
          Nessun recapito operativo.
        </h2>
        <p>
          Non sono disponibili sede, email, telefono o appuntamenti reali.
          Nessuna comunicazione viene trasmessa attraverso questo sito.
        </p>
        <span class="status-label">DEMO / Nessun invio</span>
      </div>
      <div class="contact-directions">
        <h2>Per orientare la richiesta.</h2>
        <p class="body-copy">
          Prima di descrivere un intervento, individua il tipo di spazio e il
          cambiamento che vorresti ottenere. Non servono dati personali per
          esplorare questa demo.
        </p>
        <ul>
          {[
            {
              title: "Conoscere il metodo",
              text: "Profilo dello studio e criteri di lettura.",
              href: "/studio/",
            },
            {
              title: "Confrontare gli ambiti",
              text: "Architettura, interni e recupero.",
              href: "/servizi/",
            },
            {
              title: "Preparare un primo quadro",
              text: "Anteprima della futura richiesta preliminare.",
              href: "/richiedi-un-progetto/",
            },
          ].map((item) => (
            <li key={item.href}>
              <a href={item.href}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <Arrow diagonal />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <section class="shell editorial-section" aria-labelledby="contact-faq">
      <p class="eyebrow">04.1 / Domande frequenti</p>
      <div>
        <h2 id="contact-faq">Come funziona la demo.</h2>
        <div class="faq-list">
          <details>
            <summary>Posso contattare davvero lo studio?</summary>
            <p>
              Studio Forma non è uno studio operativo. Non sono presenti canali
              di contatto, richieste spedite o prenotazioni.
            </p>
          </details>
          <details>
            <summary>Le opere del portfolio sono state realizzate?</summary>
            <p>
              No. Tutte e tre le schede descrivono studi concettuali fittizi,
              con contesti e misure ipotetici.
            </p>
          </details>
          <details>
            <summary>Il percorso di richiesta è già disponibile?</summary>
            <p>
              La struttura è consultabile nella pagina Richiedi un progetto. Il
              percorso interattivo non è ancora disponibile: questa versione
              mostra soltanto un'anteprima.
            </p>
          </details>
        </div>
      </div>
    </section>
  </>
));
export const head: DocumentHead = {
  title: "Contatti — Studio Forma",
  meta: [
    {
      name: "description",
      content:
        "Contatti e orientamento nella demo Studio Forma: nessuna sede o recapito operativo, nessun invio reale. Indicazioni per consultare servizi, metodo e richiesta preliminare.",
    },
  ],
};

import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Arrow } from "../ui/arrow";
import { ChoiceGroup } from "./choice-group";
import {
  briefDisclaimer,
  briefSections,
  briefSteps,
  budgets,
  buildBriefText,
  choiceLabel,
  emptyBrief,
  goalOptions,
  interventions,
  properties,
  styles,
  timings,
  validateBrief,
  validateBriefStep,
} from "~/lib/brief";
import type {
  AnswerStep,
  BriefAnswers,
  BriefErrors,
  BriefStep,
} from "~/lib/brief";

export const BriefBuilder = component$(() => {
  const answers = useStore<BriefAnswers>(emptyBrief());
  const errors = useStore<BriefErrors>({});
  const step = useSignal<BriefStep>(0);
  const generated = useSignal(false);
  const editing = useSignal(false);
  const confirmReset = useSignal(false);
  const copyStatus = useSignal<"idle" | "pending" | "success" | "failed">(
    "idle",
  );
  const copyAttempt = useSignal(0);
  const heading = useSignal<HTMLHeadingElement>();
  const errorSummary = useSignal<HTMLDivElement>();
  const manualText = useSignal<HTMLTextAreaElement>();
  const resetButton = useSignal<HTMLButtonElement>();
  const keepButton = useSignal<HTMLButtonElement>();
  const focusRequest = useSignal<{
    target: "heading" | "errors" | "keep" | "reset";
  }>();

  // Conditional error/reset elements must exist before focus is applied.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    ({ track }) => {
      const request = track(() => focusRequest.value);
      if (!request) return;
      const target =
        request.target === "errors"
          ? errorSummary.value
          : request.target === "keep"
            ? keepButton.value
            : request.target === "reset"
              ? resetButton.value
              : heading.value;
      target?.focus();
    },
    { strategy: "document-ready" },
  );

  const clearErrors$ = $(() => {
    for (const field of Object.keys(errors) as (keyof BriefAnswers)[])
      delete errors[field];
  });
  const move$ = $(async (target: BriefStep) => {
    await clearErrors$();
    copyAttempt.value++;
    copyStatus.value = "idle";
    generated.value = false;
    confirmReset.value = false;
    step.value = target;
    focusRequest.value = { target: "heading" };
  });
  const showErrors$ = $(async (nextErrors: BriefErrors) => {
    await clearErrors$();
    Object.assign(errors, nextErrors);
    focusRequest.value = { target: "errors" };
  });
  const advance$ = $(async () => {
    if (step.value === 3) {
      const allErrors = validateBrief(answers);
      if (Object.keys(allErrors).length) {
        const first =
          ([0, 1, 2] as const).find(
            (index) => Object.keys(validateBriefStep(answers, index)).length,
          ) ?? 0;
        await move$(first);
        await showErrors$(validateBriefStep(answers, first));
        return;
      }
      await clearErrors$();
      generated.value = true;
      copyStatus.value = "idle";
      focusRequest.value = { target: "heading" };
      return;
    }
    const nextErrors = validateBriefStep(answers, step.value);
    if (Object.keys(nextErrors).length) {
      await showErrors$(nextErrors);
      return;
    }
    const target = editing.value ? 3 : ((step.value + 1) as BriefStep);
    editing.value = false;
    await move$(target);
  });
  const edit$ = $(async (target: AnswerStep) => {
    editing.value = true;
    await move$(target);
  });
  const copy$ = $(async () => {
    const attempt = ++copyAttempt.value;
    copyStatus.value = "pending";
    try {
      const text = buildBriefText(answers);
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      if (copyAttempt.value === attempt && generated.value)
        copyStatus.value = "success";
    } catch {
      if (copyAttempt.value === attempt && generated.value)
        copyStatus.value = "failed";
    }
  });

  return (
    <section
      class="shell brief-tool"
      aria-label="Generatore di brief architettonici"
    >
      <aside class="brief-sidebar" aria-label="Avanzamento del brief">
        <p class="eyebrow">SF / Brief preliminare</p>
        <p class="brief-progress" aria-live="polite" aria-atomic="true">
          {generated.value
            ? "Documento pronto"
            : `Passaggio ${step.value + 1} di 4`}
        </p>
        <progress
          value={generated.value ? 4 : step.value + 1}
          max={4}
          aria-label="Avanzamento del questionario"
        />
        <ol class="brief-step-list">
          {briefSteps.map((item, index) => (
            <li
              key={item.short}
              aria-current={
                !generated.value && step.value === index ? "step" : undefined
              }
              class={{ "is-complete": generated.value || index < step.value }}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {item.short}
            </li>
          ))}
        </ol>
        <div class="brief-local-note">
          <span class="blue-square" />
          <p>
            Nessun invio.
            <br />
            Nessun dato personale richiesto.
          </p>
        </div>
        <p class="brief-memory-note">
          Le risposte restano in questa pagina durante il percorso.
          Ricaricandola o lasciandola verranno perse.
        </p>
        <button
          ref={resetButton}
          type="button"
          class="brief-reset-link"
          onClick$={() => {
            confirmReset.value = true;
            focusRequest.value = { target: "keep" };
          }}
        >
          Ricomincia da zero
        </button>
      </aside>

      <div class="brief-panel">
        <noscript>
          <p class="brief-error-summary">
            Per compilare e generare il brief occorre abilitare JavaScript.
            Nessuna risposta viene inviata al server.
          </p>
        </noscript>
        {confirmReset.value && (
          <div
            class="brief-reset-confirm"
            role="group"
            aria-labelledby="reset-title"
          >
            <h3 id="reset-title">Azzerare tutte le risposte?</h3>
            <p>
              Il contenuto del percorso e il brief verranno cancellati.
              L'operazione non può essere annullata.
            </p>
            <div>
              <button
                ref={keepButton}
                type="button"
                class="button button-outline"
                onClick$={() => {
                  confirmReset.value = false;
                  focusRequest.value = { target: "reset" };
                }}
              >
                Mantieni le risposte
              </button>
              <button
                type="button"
                class="button button-dark"
                onClick$={async () => {
                  Object.assign(answers, emptyBrief());
                  editing.value = false;
                  await move$(0);
                }}
              >
                Azzera e ricomincia
              </button>
            </div>
          </div>
        )}
        <div class="brief-panel-register">
          <p class="eyebrow">
            {generated.value
              ? "SF / Documento dimostrativo"
              : `Tavola 05.0${step.value + 1}`}
          </p>
          <span class="technical-label">Nessuna richiesta spedita</span>
        </div>
        <h2 id="brief-panel-title" ref={heading} tabIndex={-1}>
          {generated.value
            ? "Il brief preliminare."
            : briefSteps[step.value].title}
        </h2>
        <p class="brief-panel-description">
          {generated.value
            ? "Il documento riporta le risposte inserite. Puoi copiarlo o tornare al riepilogo per modificarle."
            : briefSteps[step.value].description}
        </p>

        {Object.keys(errors).length > 0 && (
          <div
            ref={errorSummary}
            class="brief-error-summary"
            role="alert"
            tabIndex={-1}
          >
            <p>
              <strong>Controlla le informazioni prima di continuare.</strong>
            </p>
            <ul>
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        )}

        {!generated.value && step.value < 3 && (
          <div
            class="brief-fields"
            role="form"
            aria-labelledby="brief-panel-title"
          >
            <p class="brief-required-note">
              Tutti i campi sono obbligatori, salvo il budget.
            </p>
            {step.value === 0 && (
              <>
                <ChoiceGroup
                  name="intervention"
                  legend="Tipologia di intervento"
                  options={interventions}
                  value={answers.intervention}
                  error={errors.intervention}
                  onSelect$={(value) => {
                    answers.intervention = value;
                    delete errors.intervention;
                  }}
                />
                <ChoiceGroup
                  name="property"
                  legend="Tipo di immobile"
                  options={properties}
                  value={answers.property}
                  error={errors.property}
                  onSelect$={(value) => {
                    answers.property = value;
                    delete errors.property;
                  }}
                />
                <div class="brief-field">
                  <label for="brief-characteristics">
                    Caratteristiche dell'immobile
                  </label>
                  <p id="characteristics-help" class="field-help">
                    Stato attuale, distribuzione e condizioni da considerare.
                    10–400 caratteri; non indicare indirizzi o recapiti.
                  </p>
                  <textarea
                    id="brief-characteristics"
                    rows={3}
                    maxLength={400}
                    value={answers.characteristics}
                    aria-required="true"
                    aria-invalid={errors.characteristics ? "true" : undefined}
                    aria-describedby={
                      errors.characteristics
                        ? "characteristics-help characteristics-error"
                        : "characteristics-help"
                    }
                    onInput$={(_, element) => {
                      answers.characteristics = element.value;
                      delete errors.characteristics;
                    }}
                  />
                  {errors.characteristics && (
                    <p class="field-error" id="characteristics-error">
                      {errors.characteristics}
                    </p>
                  )}
                </div>
                <div class="brief-field surface-field">
                  <label for="brief-surface">Superficie indicativa (m²)</label>
                  <p id="surface-help" class="field-help">
                    Un valore maggiore di 0 e fino a 100.000 m². Sono ammessi
                    virgola o punto e due decimali.
                  </p>
                  <input
                    id="brief-surface"
                    type="text"
                    inputMode="decimal"
                    maxLength={10}
                    value={answers.surface}
                    aria-required="true"
                    aria-invalid={errors.surface ? "true" : undefined}
                    aria-describedby={
                      errors.surface
                        ? "surface-help surface-error"
                        : "surface-help"
                    }
                    onInput$={(_, element) => {
                      answers.surface = element.value;
                      delete errors.surface;
                    }}
                  />
                  {errors.surface && (
                    <p class="field-error" id="surface-error">
                      {errors.surface}
                    </p>
                  )}
                </div>
              </>
            )}
            {step.value === 1 && (
              <>
                <fieldset
                  class="brief-fieldset"
                  aria-describedby={
                    errors.goals ? "goals-help goals-error" : "goals-help"
                  }
                >
                  <legend>
                    Obiettivi del progetto{" "}
                    <span class="field-required">(almeno uno)</span>
                  </legend>
                  <p id="goals-help" class="field-help">
                    Puoi selezionare più priorità.
                  </p>
                  <div class="choice-grid">
                    {goalOptions.map((goal) => (
                      <label
                        key={goal.value}
                        class={[
                          "choice-item",
                          { "is-selected": answers.goals.includes(goal.value) },
                        ]}
                      >
                        <input
                          type="checkbox"
                          name="goals"
                          value={goal.value}
                          checked={answers.goals.includes(goal.value)}
                          aria-invalid={errors.goals ? "true" : undefined}
                          onChange$={(_, element) => {
                            answers.goals = element.checked
                              ? [
                                  ...answers.goals.filter(
                                    (value) => value !== goal.value,
                                  ),
                                  goal.value,
                                ]
                              : answers.goals.filter(
                                  (value) => value !== goal.value,
                                );
                            delete errors.goals;
                          }}
                        />
                        <span>{goal.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.goals && (
                    <p class="field-error" id="goals-error">
                      {errors.goals}
                    </p>
                  )}
                </fieldset>
                <ChoiceGroup
                  name="style"
                  legend="Preferenza estetica"
                  options={styles}
                  value={answers.style}
                  error={errors.style}
                  onSelect$={(value) => {
                    answers.style = value;
                    delete errors.style;
                  }}
                />
              </>
            )}
            {step.value === 2 && (
              <>
                <div class="brief-field">
                  <label for="brief-budget">
                    Budget orientativo{" "}
                    <span class="field-required">(facoltativo)</span>
                  </label>
                  <p class="field-help" id="budget-help">
                    Una fascia di disponibilità, non una stima dei costi del
                    progetto. Puoi lasciare “Non indicato”.
                  </p>
                  <select
                    id="brief-budget"
                    value={answers.budget}
                    aria-invalid={errors.budget ? "true" : undefined}
                    aria-describedby={
                      errors.budget ? "budget-help budget-error" : "budget-help"
                    }
                    onChange$={(_, element) => {
                      answers.budget = element.value;
                      delete errors.budget;
                    }}
                  >
                    <option value="">Non indicato</option>
                    {budgets.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <p class="field-error" id="budget-error">
                      {errors.budget}
                    </p>
                  )}
                </div>
                <ChoiceGroup
                  name="timing"
                  legend="Tempistiche previste"
                  options={timings}
                  value={answers.timing}
                  error={errors.timing}
                  onSelect$={(value) => {
                    answers.timing = value;
                    delete errors.timing;
                  }}
                />
                <div class="brief-field">
                  <label for="brief-description">
                    Descrizione del progetto
                  </label>
                  <p id="description-help" class="field-help">
                    Esigenze, relazioni tra gli ambienti e vincoli conosciuti.
                    20–2.000 caratteri; evita nomi, email e altri dati
                    personali.
                  </p>
                  <textarea
                    id="brief-description"
                    rows={6}
                    maxLength={2000}
                    value={answers.description}
                    aria-required="true"
                    aria-invalid={errors.description ? "true" : undefined}
                    aria-describedby={
                      errors.description
                        ? "description-help description-error"
                        : "description-help"
                    }
                    onInput$={(_, element) => {
                      answers.description = element.value;
                      delete errors.description;
                    }}
                  />
                  <span class="field-counter">
                    {answers.description.length} / 2.000
                  </span>
                  {errors.description && (
                    <p class="field-error" id="description-error">
                      {errors.description}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {(step.value === 3 || generated.value) && (
          <article
            class={["brief-review", { "brief-document": generated.value }]}
            aria-label={
              generated.value
                ? "Brief architettonico preliminare"
                : "Riepilogo modificabile"
            }
          >
            {generated.value && (
              <header class="brief-document-header">
                <div class="brief-document-bar">
                  <span>STUDIO FORMA / BRIEF PRELIMINARE</span>
                  <span>DEMO / NON INVIATO</span>
                </div>
                <div>
                  <p class="eyebrow">Documento di sintesi / SF—BP</p>
                  <h3>{choiceLabel(interventions, answers.intervention)}</h3>
                  <p>
                    {choiceLabel(properties, answers.property)} · Superficie
                    indicativa {briefSections(answers)[0]?.rows[3]?.value}
                  </p>
                </div>
              </header>
            )}
            {briefSections(answers).map((section) => (
              <section class="brief-review-section" key={section.title}>
                <header>
                  <h3>{section.title}</h3>
                  {!generated.value && (
                    <button
                      type="button"
                      class="brief-edit"
                      aria-label={"Modifica " + section.title.slice(5)}
                      onClick$={() => edit$(section.step)}
                    >
                      Modifica
                      <Arrow />
                    </button>
                  )}
                </header>
                <dl>
                  {section.rows.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
            <p class="brief-document-disclaimer">{briefDisclaimer}</p>
          </article>
        )}

        {generated.value ? (
          <div class="brief-result-actions">
            <div class="brief-buttons">
              <button
                type="button"
                class="button button-dark"
                disabled={copyStatus.value === "pending"}
                onClick$={copy$}
              >
                {copyStatus.value === "pending"
                  ? "Copia in corso…"
                  : "Copia il brief"}
                <Arrow />
              </button>
              <button
                type="button"
                class="button button-outline"
                onClick$={() => move$(3)}
              >
                Modifica le risposte
              </button>
            </div>
            <p class="brief-copy-status" role="status" aria-live="polite">
              {copyStatus.value === "success"
                ? "Brief copiato negli appunti. Nessuna richiesta è stata inviata."
                : copyStatus.value === "failed"
                  ? "Copia non riuscita. Puoi selezionare e copiare manualmente il testo qui sotto."
                  : ""}
            </p>
            {copyStatus.value === "failed" && (
              <div class="brief-manual-copy">
                <label for="brief-copy-text">
                  Testo del brief da copiare manualmente
                </label>
                <textarea
                  id="brief-copy-text"
                  ref={manualText}
                  rows={12}
                  readOnly
                  value={buildBriefText(answers)}
                />
                <button
                  type="button"
                  class="text-link"
                  onClick$={() => {
                    manualText.value?.focus();
                    manualText.value?.select();
                  }}
                >
                  Seleziona tutto il testo
                </button>
              </div>
            )}
          </div>
        ) : (
          <div class="brief-buttons brief-navigation">
            {step.value > 0 && (
              <button
                type="button"
                class="button button-outline"
                onClick$={() => {
                  editing.value = false;
                  return move$((step.value - 1) as BriefStep);
                }}
              >
                Indietro
              </button>
            )}
            <button
              key={`${step.value}-${editing.value ? "edit" : "advance"}`}
              type="button"
              class="button button-dark"
              onClick$={advance$}
            >
              {step.value === 3
                ? "Genera il brief"
                : editing.value
                  ? "Conferma la modifica"
                  : "Continua"}
              <Arrow />
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import type { Choice } from "~/lib/brief";

export const ChoiceGroup = component$<{
  name: string;
  legend: string;
  options: readonly Choice[];
  value: string;
  error?: string;
  onSelect$: PropFunction<(value: string) => void>;
}>((props) => (
  <fieldset
    class="brief-fieldset"
    aria-describedby={props.error ? props.name + "-error" : undefined}
  >
    <legend>
      {props.legend} <span class="field-required">(obbligatorio)</span>
    </legend>
    <div class="choice-grid">
      {props.options.map((option) => (
        <label
          key={option.value}
          class={[
            "choice-item",
            { "is-selected": props.value === option.value },
          ]}
        >
          <input
            type="radio"
            name={props.name}
            value={option.value}
            checked={props.value === option.value}
            required
            aria-invalid={props.error ? "true" : undefined}
            onChange$={() => props.onSelect$(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
    {props.error && (
      <p id={props.name + "-error"} class="field-error">
        {props.error}
      </p>
    )}
  </fieldset>
));

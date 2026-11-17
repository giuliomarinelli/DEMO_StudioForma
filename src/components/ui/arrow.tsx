import { component$ } from "@builder.io/qwik";

export const Arrow = component$(
  ({ diagonal = false }: { diagonal?: boolean }) => (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      class="shrink-0"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        stroke-width="1.5"
      />
    </svg>
  ),
);

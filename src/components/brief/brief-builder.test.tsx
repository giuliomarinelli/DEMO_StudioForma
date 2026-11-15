import { createDOM } from "@builder.io/qwik/testing";
import { afterEach, expect, test, vi } from "vitest";
import { BriefBuilder } from "./brief-builder";

afterEach(() => vi.unstubAllGlobals());

test("campi iniziali e messaggi hanno nomi e associazioni accessibili, senza invio nativo", async () => {
  vi.stubGlobal("requestAnimationFrame", () => 0);
  const { screen, render, userEvent } = await createDOM();
  await render(<BriefBuilder />);
  expect(screen.querySelector("form")).toBeFalsy();
  expect(
    screen.querySelector('[role="form"]')?.getAttribute("aria-labelledby"),
  ).toBe("brief-panel-title");
  for (const button of Array.from(screen.querySelectorAll("button")))
    expect(button.getAttribute("type")).toBe("button");
  for (const input of Array.from(
    screen.querySelectorAll('input[type="radio"]'),
  )) {
    expect(input.parentElement?.tagName).toBe("LABEL");
    expect(input.hasAttribute("required")).toBe(true);
  }
  for (const id of ["brief-characteristics", "brief-surface"]) {
    expect(screen.querySelector(`label[for="${id}"]`)).toBeTruthy();
    expect(screen.querySelector("#" + id)?.getAttribute("aria-required")).toBe(
      "true",
    );
  }
  const next = Array.from(screen.querySelectorAll("button")).find(
    (button) => button.textContent?.trim() === "Continua",
  );
  await userEvent(next!, "click");
  expect(screen.querySelector('[role="alert"]')).toBeTruthy();
  for (const field of Array.from(
    screen.querySelectorAll("[aria-describedby]"),
  )) {
    for (const id of field.getAttribute("aria-describedby")!.split(" "))
      expect(screen.querySelector("#" + id), id).toBeTruthy();
  }
  expect(
    screen.querySelector("#brief-surface")?.getAttribute("aria-invalid"),
  ).toBe("true");
});

test("percorso: errori, avanti/indietro, modifica, copia, fallback e ripristino", async () => {
  // Il DOM Qwik non è un browser: il focus viene verificato separatamente in Playwright.
  vi.stubGlobal("requestAnimationFrame", () => 0);
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", { clipboard: { writeText } });
  const { screen, render, userEvent } = await createDOM();
  await render(<BriefBuilder />);
  const click = async (text: string) => {
    const button = Array.from(screen.querySelectorAll("button")).find(
      (item) => item.textContent?.trim() === text,
    );
    expect(button, text).toBeTruthy();
    await userEvent(button!, "click");
  };
  const fill = async (selector: string, value: string) => {
    const input = screen.querySelector(selector) as HTMLInputElement;
    input.value = value;
    await userEvent(input, "input");
  };
  await click("Continua");
  expect(screen.querySelector('[role="alert"]')?.textContent).toContain(
    "Scegli la tipologia",
  );
  await userEvent('input[name="intervention"][value="renovation"]', "change");
  await userEvent('input[name="property"][value="apartment"]', "change");
  await fill("#brief-characteristics", "Appartamento con ambienti separati.");
  await fill("#brief-surface", "95,50");
  await click("Continua");
  expect(screen.querySelector("h2")?.textContent).toBe(
    "Obiettivi e linguaggio.",
  );
  const goal = screen.querySelector(
    'input[value="layout"]',
  ) as HTMLInputElement;
  goal.checked = true;
  await userEvent(goal, "change");
  await userEvent('input[name="style"][value="essential"]', "change");
  await click("Indietro");
  expect(
    (screen.querySelector("#brief-surface") as HTMLInputElement).value,
  ).toBe("95,50");
  await click("Continua");
  expect(
    (screen.querySelector('input[value="layout"]') as HTMLInputElement).checked,
  ).toBe(true);
  await click("Continua");
  await userEvent('input[name="timing"][value="undefined"]', "change");
  await fill(
    "#brief-description",
    "Separare una zona di lavoro dalla zona giorno.",
  );
  await click("Continua");
  expect(screen.textContent).toContain("Non indicato (facoltativo)");
  await userEvent(
    screen.querySelector(
      'button[aria-label="Modifica Intervento e immobile"]',
    )!,
    "click",
  );
  await fill("#brief-surface", "120");
  await click("Conferma la modifica");
  expect(screen.querySelector("h2")?.textContent).toBe(
    "Rileggi le informazioni.",
  );
  expect(screen.textContent).toContain("120 m²");
  await click("Genera il brief");
  expect(screen.textContent).toContain("DEMO / NON INVIATO");
  await click("Copia il brief");
  expect(writeText).toHaveBeenCalledOnce();
  expect(writeText.mock.calls[0]?.[0]).toContain("120 m²");
  expect(screen.querySelector('[role="status"]')?.textContent).toContain(
    "Brief copiato",
  );
  writeText.mockRejectedValueOnce(new Error("Denied"));
  await click("Copia il brief");
  expect(screen.querySelector('[role="status"]')?.textContent).toContain(
    "Copia non riuscita",
  );
  expect(
    (screen.querySelector("#brief-copy-text") as HTMLTextAreaElement).value,
  ).toContain("120 m²");
  await click("Ricomincia da zero");
  await click("Mantieni le risposte");
  expect(screen.textContent).toContain("120 m²");
  await click("Ricomincia da zero");
  await click("Azzera e ricomincia");
  expect(screen.querySelector("h2")?.textContent).toBe(
    "Intervento e immobile.",
  );
  expect(
    (screen.querySelector("#brief-surface") as HTMLInputElement).value,
  ).toBe("");
  expect(screen.querySelector(".brief-document")).toBeFalsy();
});

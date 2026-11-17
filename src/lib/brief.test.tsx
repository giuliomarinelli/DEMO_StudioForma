import { describe, expect, test } from "vitest";
import {
  briefSections,
  buildBriefText,
  emptyBrief,
  parseSurface,
  validateBrief,
  validateBriefStep,
} from "./brief";
import type { BriefAnswers } from "./brief";

const validAnswers = (): BriefAnswers => ({
  ...emptyBrief(),
  intervention: "renovation",
  property: "apartment",
  characteristics: "Appartamento esistente con ambienti separati.",
  surface: "95,50",
  goals: ["layout", "work"],
  style: "open",
  timing: "undefined",
  description:
    "Riorganizzare la zona giorno e separare uno spazio di lavoro senza introdurre un corridoio.",
});

describe("validazione del percorso", () => {
  test("il budget è facoltativo e le opzioni da definire sono valide", () => {
    expect(validateBrief(validAnswers())).toEqual({});
    expect(buildBriefText(validAnswers())).toContain(
      "Non indicato (facoltativo)",
    );
  });
  test("gli errori del primo passaggio non anticipano i passaggi successivi", () => {
    expect(Object.keys(validateBriefStep(emptyBrief(), 0))).toEqual([
      "intervention",
      "property",
      "characteristics",
      "surface",
    ]);
    expect(Object.keys(validateBriefStep(emptyBrief(), 1))).toEqual([
      "goals",
      "style",
    ]);
    expect(Object.keys(validateBriefStep(emptyBrief(), 2))).toEqual([
      "timing",
      "description",
    ]);
  });
  test.each([
    "",
    "0",
    "-12",
    "Infinity",
    "NaN",
    "1e2",
    "100001",
    "95,123",
    "95.5.1",
    "1 000",
  ])("rifiuta la superficie non valida %s", (value) => {
    expect(parseSurface(value)).toBeUndefined();
  });
  test.each([
    ["95,50", 95.5],
    [" 95.5 ", 95.5],
    ["0,25", 0.25],
    ["100000", 100000],
  ])("accetta e normalizza %s", (value, number) => {
    expect(parseSurface(String(value))).toBe(number);
  });
  test("respinge scelte non previste e obiettivi duplicati", () => {
    const answers = {
      ...validAnswers(),
      intervention: "unknown",
      property: "unknown",
      goals: ["layout", "layout"],
      style: "unknown",
      budget: "unknown",
      timing: "unknown",
    };
    expect(Object.keys(validateBrief(answers))).toEqual([
      "intervention",
      "property",
      "goals",
      "style",
      "budget",
      "timing",
    ]);
    expect(
      validateBrief({ ...validAnswers(), goals: ["unknown"] }),
    ).toHaveProperty("goals");
  });
  test("valida i limiti dei testi dopo il trim", () => {
    for (const characteristics of [
      " ".repeat(20),
      "a".repeat(9),
      "a".repeat(401),
    ])
      expect(
        validateBrief({ ...validAnswers(), characteristics }),
      ).toHaveProperty("characteristics");
    for (const description of [
      " ".repeat(30),
      "a".repeat(19),
      "a".repeat(2001),
    ])
      expect(validateBrief({ ...validAnswers(), description })).toHaveProperty(
        "description",
      );
    expect(
      validateBrief({
        ...validAnswers(),
        characteristics: "a".repeat(400),
        description: "a".repeat(2000),
      }),
    ).toEqual({});
  });
});

describe("documento preliminare", () => {
  test("non genera un brief incompleto", () => {
    expect(() => buildBriefText(emptyBrief())).toThrow("Completa e verifica");
  });
  test("include tutte le informazioni, il budget scelto e la dichiarazione demo", () => {
    const answers = {
      ...validAnswers(),
      budget: "50to100",
      description:
        "  Prima esigenza: zona giorno.\r\nSeconda esigenza: spazio di lavoro.  ",
    };
    const text = buildBriefText(answers);
    expect(text).toContain("STUDIO FORMA / BRIEF ARCHITETTONICO PRELIMINARE");
    expect(text).toContain("DOCUMENTO DIMOSTRATIVO / NON INVIATO");
    expect(text).toContain("Superficie indicativa: 95,5 m²");
    expect(text).toContain(
      "Riorganizzare gli spazi; Integrare lavoro e abitare",
    );
    expect(text).toContain("50.000–100.000 €");
    expect(text).toContain("Tempistiche: Da definire");
    expect(text).toContain(
      "Prima esigenza: zona giorno.\nSeconda esigenza: spazio di lavoro.",
    );
    expect(text).toContain("studio fittizio");
    expect(text).toContain("Nessuna richiesta è stata inviata.");
  });
  test("una modifica si riflette nel nuovo documento e non muta le risposte", () => {
    const answers = validAnswers();
    const original = structuredClone(answers);
    briefSections(answers);
    expect(answers).toEqual(original);
    const revised = buildBriefText({
      ...answers,
      surface: "120",
      style: "technical",
    });
    expect(revised).toContain("120 m²");
    expect(revised).toContain("Tecnico e industriale");
    expect(revised).not.toContain("95,5 m²");
  });
  test("il ripristino crea ogni volta uno stato indipendente", () => {
    const first = emptyBrief();
    first.goals.push("layout");
    first.surface = "95";
    expect(emptyBrief()).toEqual({
      intervention: "",
      property: "",
      characteristics: "",
      surface: "",
      goals: [],
      style: "",
      budget: "",
      timing: "",
      description: "",
    });
  });
});

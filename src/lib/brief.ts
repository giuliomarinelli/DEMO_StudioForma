export interface Choice {
  value: string;
  label: string;
}
export type AnswerStep = 0 | 1 | 2;
export type BriefStep = AnswerStep | 3;
export interface BriefAnswers {
  intervention: string;
  property: string;
  characteristics: string;
  surface: string;
  goals: string[];
  style: string;
  budget: string;
  timing: string;
  description: string;
}
export type BriefErrors = Partial<Record<keyof BriefAnswers, string>>;

export const interventions: readonly Choice[] = [
  { value: "renovation", label: "Ristrutturazione" },
  { value: "new", label: "Nuova costruzione" },
  { value: "interior", label: "Architettura degli interni" },
  { value: "reuse", label: "Recupero e cambio d’uso" },
];
export const properties: readonly Choice[] = [
  { value: "apartment", label: "Appartamento" },
  { value: "house", label: "Casa indipendente" },
  { value: "workplace", label: "Spazio di lavoro o commerciale" },
  { value: "other", label: "Altro immobile" },
];
export const goalOptions: readonly Choice[] = [
  { value: "layout", label: "Riorganizzare gli spazi" },
  { value: "light", label: "Migliorare il rapporto con la luce" },
  { value: "work", label: "Integrare lavoro e abitare" },
  { value: "existing", label: "Valorizzare l’esistente" },
  { value: "functions", label: "Introdurre nuove funzioni" },
  { value: "materials", label: "Definire materiali e arredi" },
];
export const styles: readonly Choice[] = [
  { value: "essential", label: "Essenziale e materico" },
  { value: "natural", label: "Caldo e naturale" },
  { value: "technical", label: "Tecnico e industriale" },
  { value: "open", label: "Da esplorare insieme" },
];
export const budgets: readonly Choice[] = [
  { value: "under50", label: "Meno di 50.000 €" },
  { value: "50to100", label: "50.000–100.000 €" },
  { value: "100to200", label: "100.000–200.000 €" },
  { value: "over200", label: "Oltre 200.000 €" },
  { value: "undefined", label: "Da definire" },
];
export const timings: readonly Choice[] = [
  { value: "six", label: "Entro 6 mesi" },
  { value: "year", label: "Tra 6 e 12 mesi" },
  { value: "later", label: "Oltre 12 mesi" },
  { value: "undefined", label: "Da definire" },
];
export const briefSteps = [
  {
    short: "Immobile",
    title: "Intervento e immobile.",
    description:
      "Definisci il tipo di intervento e le caratteristiche dello spazio, senza indicare indirizzi o altri dati personali.",
  },
  {
    short: "Obiettivi",
    title: "Obiettivi e linguaggio.",
    description:
      "Seleziona le priorità e una preferenza estetica. Puoi lasciare aperta la direzione scegliendo “Da esplorare insieme”.",
  },
  {
    short: "Risorse",
    title: "Risorse, tempi e contesto.",
    description:
      "Il budget è facoltativo. Completa il quadro con un orizzonte temporale e una breve descrizione del progetto.",
  },
  {
    short: "Riepilogo",
    title: "Rileggi le informazioni.",
    description:
      "Controlla le tre sezioni e modifica ciò che serve. Il brief sarà generato qui, senza inviare le risposte.",
  },
] as const;

export function emptyBrief(): BriefAnswers {
  return {
    intervention: "",
    property: "",
    characteristics: "",
    surface: "",
    goals: [],
    style: "",
    budget: "",
    timing: "",
    description: "",
  };
}

const validChoice = (options: readonly Choice[], value: string) =>
  options.some((option) => option.value === value);
export const choiceLabel = (options: readonly Choice[], value: string) =>
  options.find((option) => option.value === value)?.label ?? "Da precisare";

export function parseSurface(value: string): number | undefined {
  const trimmed = value.trim();
  if (!/^\d{1,6}([.,]\d{1,2})?$/.test(trimmed)) return undefined;
  const number = Number(trimmed.replace(",", "."));
  return number > 0 && number <= 100000 ? number : undefined;
}

export function validateBriefStep(
  answers: BriefAnswers,
  step: AnswerStep,
): BriefErrors {
  const errors: BriefErrors = {};
  if (step === 0) {
    if (!validChoice(interventions, answers.intervention))
      errors.intervention = "Scegli la tipologia di intervento.";
    if (!validChoice(properties, answers.property))
      errors.property = "Scegli il tipo di immobile.";
    if (
      answers.characteristics.trim().length < 10 ||
      answers.characteristics.trim().length > 400
    )
      errors.characteristics =
        "Descrivi le caratteristiche dell’immobile con 10–400 caratteri.";
    if (parseSurface(answers.surface) === undefined)
      errors.surface =
        "Inserisci una superficie maggiore di 0 e fino a 100.000 m², con al massimo due decimali.";
  }
  if (step === 1) {
    if (
      !answers.goals.length ||
      answers.goals.some((goal) => !validChoice(goalOptions, goal)) ||
      new Set(answers.goals).size !== answers.goals.length
    )
      errors.goals = "Seleziona almeno un obiettivo tra quelli proposti.";
    if (!validChoice(styles, answers.style))
      errors.style = "Scegli una preferenza estetica o “Da esplorare insieme”.";
  }
  if (step === 2) {
    if (answers.budget && !validChoice(budgets, answers.budget))
      errors.budget =
        "Scegli una fascia valida oppure lascia il budget non indicato.";
    if (!validChoice(timings, answers.timing))
      errors.timing = "Indica una tempistica, anche “Da definire”.";
    if (
      answers.description.trim().length < 20 ||
      answers.description.trim().length > 2000
    )
      errors.description = "Descrivi il progetto con 20–2.000 caratteri.";
  }
  return errors;
}

export function validateBrief(answers: BriefAnswers): BriefErrors {
  return {
    ...validateBriefStep(answers, 0),
    ...validateBriefStep(answers, 1),
    ...validateBriefStep(answers, 2),
  };
}

export function briefSections(answers: BriefAnswers) {
  const surface = parseSurface(answers.surface);
  return [
    {
      step: 0 as const,
      title: "01 / Intervento e immobile",
      rows: [
        {
          label: "Tipologia",
          value: choiceLabel(interventions, answers.intervention),
        },
        { label: "Immobile", value: choiceLabel(properties, answers.property) },
        {
          label: "Caratteristiche",
          value: answers.characteristics.trim() || "Da precisare",
        },
        {
          label: "Superficie indicativa",
          value:
            surface === undefined
              ? "Da precisare"
              : new Intl.NumberFormat("it-IT", {
                  maximumFractionDigits: 2,
                }).format(surface) + " m²",
        },
      ],
    },
    {
      step: 1 as const,
      title: "02 / Obiettivi e linguaggio",
      rows: [
        {
          label: "Obiettivi",
          value:
            goalOptions
              .filter((goal) => answers.goals.includes(goal.value))
              .map((goal) => goal.label)
              .join("; ") || "Da precisare",
        },
        {
          label: "Preferenza estetica",
          value: choiceLabel(styles, answers.style),
        },
      ],
    },
    {
      step: 2 as const,
      title: "03 / Risorse, tempi e descrizione",
      rows: [
        {
          label: "Budget orientativo",
          value: answers.budget
            ? choiceLabel(budgets, answers.budget)
            : "Non indicato (facoltativo)",
        },
        { label: "Tempistiche", value: choiceLabel(timings, answers.timing) },
        {
          label: "Descrizione del progetto",
          value:
            answers.description.trim().replace(/\r\n?/g, "\n") ||
            "Da precisare",
        },
      ],
    },
  ];
}

export const briefDisclaimer =
  "Documento dimostrativo generato per Studio Forma, studio fittizio. Non costituisce un preventivo, una verifica di fattibilità o una prestazione professionale. Nessuna richiesta è stata inviata.";

export function buildBriefText(answers: BriefAnswers): string {
  if (Object.keys(validateBrief(answers)).length)
    throw new Error(
      "Completa e verifica le risposte prima di generare il brief.",
    );
  return [
    "STUDIO FORMA / BRIEF ARCHITETTONICO PRELIMINARE",
    "DOCUMENTO DIMOSTRATIVO / NON INVIATO",
    "",
    ...briefSections(answers).flatMap((section) => [
      section.title,
      ...section.rows.map((row) => row.label + ": " + row.value),
      "",
    ]),
    briefDisclaimer,
  ].join("\n");
}

import corteDrawing from "~/media/corte-01.svg?url";
import officinaDrawing from "~/media/officina-02.svg?url";
import internoDrawing from "~/media/interno-03.svg?url";

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  area: string;
  context: string;
  programme: string;
  drawing: string;
  drawingAlt: string;
  drawingLabel: string;
  summary: string;
  question: string;
  hypothesis: string;
  materials: string;
  decisions: { title: string; text: string }[];
}

export const projects = [
  {
    id: "01",
    slug: "corte-01",
    title: "Corte 01",
    subtitle: "Il vuoto come elemento distributivo.",
    category: "Architettura residenziale",
    area: "240 m²",
    context: "Tessuto urbano compatto, ipotetico",
    programme: "Abitazione intorno a una corte",
    drawing: corteDrawing,
    drawingAlt:
      "Assonometria concettuale di un edificio a U: tre corpi delimitano una corte aperta, con struttura e linee di costruzione in evidenza.",
    drawingLabel: "Assonometria volumetrica / Schema non in scala",
    summary:
      "Un volume compatto si apre verso una corte. Il progetto esplora la relazione tra densità del costruito, luce naturale e progressione degli spazi domestici.",
    question:
      "Come costruire una sequenza di ambienti riconoscibili in un lotto circondato da altri edifici, senza affidare tutta la distribuzione a un corridoio?",
    hypothesis:
      "Tre corpi disposti a U definiscono un vuoto comune. La corte diventa riferimento per gli accessi, affaccio interno e intervallo tra le diverse parti dell’abitazione.",
    materials:
      "Calcestruzzo a vista, intonaco minerale, serramenti metallici. Una palette materiale proposta per distinguere struttura, involucro e soglie.",
    decisions: [
      {
        title: "Una corte centrale",
        text: "Il vuoto organizza il programma e mette in relazione gli ambienti. Le aperture sono orientate verso questo spazio raccolto.",
      },
      {
        title: "Soglie progressive",
        text: "Ingresso, spazio comune e stanze private formano una sequenza. Il passaggio tra gli usi è affidato a profondità e arretramenti.",
      },
      {
        title: "Struttura leggibile",
        text: "Setti e travi definiscono il ritmo delle facciate. La rappresentazione rende visibile il rapporto tra elementi portanti e aperture.",
      },
    ],
  },
  {
    id: "02",
    slug: "officina-02",
    title: "Officina 02",
    subtitle: "Una struttura esistente, un nuovo programma.",
    category: "Recupero e riuso",
    area: "680 m²",
    context: "Edificio produttivo dismesso, ipotetico",
    programme: "Laboratori e spazi di lavoro condivisi",
    drawing: officinaDrawing,
    drawingAlt:
      "Schema assonometrico di una ex officina: telai metallici ripetuti, copertura a doppia falda e nuovi volumi indipendenti a terra.",
    drawingLabel: "Struttura e nuovi innesti / Schema non in scala",
    summary:
      "Una sequenza di telai industriali accoglie laboratori e spazi comuni. Il nuovo intervento mantiene riconoscibile la struttura e lavora per inserimenti autonomi.",
    question:
      "Come cambiare l’uso di un involucro produttivo conservando la continuità e la leggibilità del suo spazio principale?",
    hypothesis:
      "Il sistema di telai rimane il riferimento dell’intervento. Volumi leggeri e distinti ospitano le funzioni che richiedono separazione, lasciando libero il percorso centrale.",
    materials:
      "Acciaio esistente, pannelli lignei e superfici traslucide come ipotesi di progetto. Gli innesti si distinguono dalla struttura originaria.",
    decisions: [
      {
        title: "Conservare il ritmo",
        text: "La maglia strutturale guida la suddivisione dei laboratori. Il passo dei telai resta percepibile lungo tutto il volume.",
      },
      {
        title: "Inserire senza saturare",
        text: "I nuovi ambienti chiusi si fermano sotto la copertura. Lo spazio continuo superiore rende riconoscibile l’involucro industriale.",
      },
      {
        title: "Una dorsale comune",
        text: "Un percorso longitudinale collega ingressi, postazioni e aree condivise. Le attività si affacciano su un unico sistema di distribuzione.",
      },
    ],
  },
  {
    id: "03",
    slug: "interno-03",
    title: "Interno 03",
    subtitle: "Abitare uno spazio, distribuire le possibilità.",
    category: "Architettura degli interni",
    area: "95 m²",
    context: "Appartamento in edificio urbano, ipotetico",
    programme: "Residenza con spazio di lavoro",
    drawing: internoDrawing,
    drawingAlt:
      "Pianta concettuale di un appartamento: nucleo centrale dei servizi, zona giorno aperta e partizioni che separano camere e spazio di lavoro.",
    drawingLabel: "Pianta distributiva / Schema non in scala",
    summary:
      "Il ridisegno di un appartamento studia il rapporto tra lavoro e vita domestica. Un nucleo centrale concentra i servizi e libera il perimetro per gli ambienti abitati.",
    question:
      "Come ricavare uno spazio di lavoro separabile senza moltiplicare corridoi e stanze prive di relazione con la zona giorno?",
    hypothesis:
      "Un nucleo attrezzato raccoglie servizi e contenimento. Intorno a questo elemento si articolano una zona comune continua e due ambiti più raccolti.",
    materials:
      "Legno chiaro, superfici minerali e pannelli scorrevoli metallici. Le finiture sono ipotesi di studio, selezionate per rendere leggibili parti fisse e mobili.",
    decisions: [
      {
        title: "Concentrare i servizi",
        text: "Le funzioni tecniche si raccolgono al centro. Il bordo dell’appartamento rimane disponibile per soggiorno, camere e lavoro.",
      },
      {
        title: "Ridurre i passaggi",
        text: "Il disimpegno è integrato nella sequenza degli ambienti. Le aperture tra le stanze sono studiate insieme agli arredi fissi.",
      },
      {
        title: "Separare quando serve",
        text: "Una partizione scorrevole distingue lo studio dalla zona comune. Due configurazioni d’uso mantengono la stessa struttura distributiva.",
      },
    ],
  },
] as const satisfies readonly Project[];

import corteDrawing from "~/media/corte-01.svg?url";
import officinaDrawing from "~/media/officina-02.svg?url";
import internoDrawing from "~/media/interno-03.svg?url";
import cortePlan from "~/media/corte-01-pianta.svg?url";
import officinaSection from "~/media/officina-02-sezione.svg?url";
import internoOpen from "~/media/interno-03-aperto.svg?url";
import internoSeparated from "~/media/interno-03-separato.svg?url";

interface ProjectStudy {
  title: string;
  problem: string;
  hypothesis: string;
  solution: string;
  drawings: readonly {
    number: string;
    title: string;
    asset: string;
    alt: string;
    description: string;
    annotations: readonly { number: string; title: string; text: string }[];
  }[];
}

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
  study: ProjectStudy;
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
    study: {
      title: "Dall'ingresso agli ambienti, attraverso la corte.",
      problem:
        "Un accesso diretto alle stanze renderebbe indistinta la soglia tra arrivo e vita domestica.",
      hypothesis:
        "Affidare a un filtro laterale l'ingresso e al bordo della corte la relazione tra i tre corpi.",
      solution:
        "La sequenza piega prima di aprirsi sul vuoto: il corpo trasversale accoglie il giorno, l'ala opposta gli ambienti privati.",
      drawings: [
        {
          number: "01.02",
          title: "Pianta delle relazioni",
          asset: cortePlan,
          alt: "Pianta a U: ingresso nell'ala sinistra, corte al centro, giorno in alto e notte a destra; frecce blu indicano le diramazioni.",
          description:
            "Il percorso blu legge una successione di soglie, non un corridoio chiuso. Il passaggio lungo la corte mette in relazione gli ambienti e mantiene riconoscibile il vuoto centrale.",
          annotations: [
            {
              number: "01",
              title: "Entrare nel filtro",
              text: "L'arrivo occupa l'ala laterale e cambia direzione prima di affacciarsi sulla corte.",
            },
            {
              number: "02",
              title: "Riconoscere il centro",
              text: "La corte offre un riferimento comune. Le diramazioni avvengono dal suo margine, lasciandone libero il centro.",
            },
            {
              number: "03",
              title: "Distinguere le soglie",
              text: "Le aperture dell'ala privata si separano dall'accesso allo spazio giorno. Il tratteggio indica la diramazione verso la stanza più interna.",
            },
          ],
        },
      ],
    },
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
    study: {
      title: "Un telaio continuo. Innesti che restano autonomi.",
      problem:
        "Chiudere il volume fino alla copertura cancellerebbe la lettura unitaria dello spazio industriale.",
      hypothesis:
        "Conservare il telaio e collocare i nuovi ambienti sotto di esso, senza farli coincidere con il suo profilo.",
      solution:
        "Due volumi bassi lasciano un intervallo superiore e una dorsale centrale: esistente e inserimenti restano distinguibili in sezione.",
      drawings: [
        {
          number: "02.02",
          title: "Sezione trasversale di confronto",
          asset: officinaSection,
          alt: "Telaio a doppia falda in grafite sopra due laboratori blu tratteggiati, distaccati dai pilastri e dalla copertura; dorsale comune al centro.",
          description:
            "La sezione sovrappone struttura conservata e nuovi volumi. Grafite e linea continua identificano il telaio; blu e tratteggio gli innesti. Il simbolo centrale localizza la dorsale longitudinale vista di taglio.",
          annotations: [
            {
              number: "01",
              title: "Conservare",
              text: "Pilastri e copertura costituiscono il riferimento spaziale esistente. La loro rappresentazione è concettuale, senza verifica strutturale.",
            },
            {
              number: "02",
              title: "Separare",
              text: "L'intervallo fra soffitto dei laboratori e telaio mantiene leggibile il volume superiore. Il segno verticale indica un distacco, non una quota misurata.",
            },
            {
              number: "03",
              title: "Inserire",
              text: "Gli ambienti chiusi hanno un proprio limite e si arretrano dai pilastri. Tra i due innesti rimane il passaggio condiviso.",
            },
          ],
        },
      ],
    },
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
    study: {
      title: "La stessa pianta, due relazioni d'uso.",
      problem:
        "Lo spazio di lavoro deve poter partecipare alla zona comune e, in un altro momento, diventare un ambito distinto.",
      hypothesis:
        "Muovere soltanto la partizione tra studio e spazio comune, mantenendo fissi nucleo dei servizi, distribuzione e arredi.",
      solution:
        "I pannelli raccolti liberano il varco; distesi ne segnano il limite. Cambia la relazione tra gli usi, senza ridisegnare l'appartamento.",
      drawings: [
        {
          number: "03.02",
          title: "A / Configurazione aperta",
          asset: internoOpen,
          alt: "Pianta con pannelli raccolti a destra: una freccia attraversa il varco fra spazio comune e lavoro. Notte e nucleo centrale rimangono fissi.",
          description:
            "La continuità del varco permette allo studio di affacciarsi sulla vita comune. Il nucleo dei servizi resta il punto fisso attorno a cui si distribuiscono gli ambienti.",
          annotations: [
            {
              number: "01",
              title: "Raccogliere i pannelli",
              text: "Il segno blu corto mostra i pannelli accostati. La freccia verticale attraversa l'apertura; quella orizzontale indica il verso di raccolta.",
            },
          ],
        },
        {
          number: "03.03",
          title: "B / Configurazione separata",
          asset: internoSeparated,
          alt: "Stessa pianta con partizione blu distesa fra studio tratteggiato e spazio comune; una freccia indica lo scorrimento verso sinistra.",
          description:
            "La partizione distesa distingue lo studio dalla zona comune. Il tratteggio rende leggibile l'ambito separato; disposizione e arredi coincidono con la configurazione aperta.",
          annotations: [
            {
              number: "02",
              title: "Distendere la partizione",
              text: "I pannelli occupano il varco. Lo schema descrive una separazione d'uso e non attesta isolamento acustico, dettagli costruttivi o prestazioni certificate.",
            },
          ],
        },
      ],
    },
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

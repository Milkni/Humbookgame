import { QuizVariant, StationQuestion, QuestionType } from './types';

export const STATION_DATA: StationQuestion[] = [
  {
    id: 'desk',
    title: 'Deskovky',
    question: 'Kolik deskovek má knihovna?',
    type: QuestionType.MULTIPLE_CHOICE,
    options: ['100', '500', '1000'],
    correctAnswer: '1000',
    rewardWord: 'S',
    wrongReward: 'PES',
  },
  {
    id: 'vr',
    title: 'VR',
    question: 'Kterou aplikaci nebo hru sis vyzkoušel?',
    type: QuestionType.OPEN,
    placeholder: 'Napiš název...',
    rewardWord: 'KNIHOVNOU',
  },
  {
    id: 'ozo',
    title: 'Ozoboti',
    question: 'Znáte nějakou knihu o robotech?',
    type: QuestionType.OPEN,
    placeholder: 'Napiš název...',
    rewardWord: 'NEJSTE',
  },
  {
    id: 'badge',
    title: 'Plackovač',
    question: 'Jak velký je největší špendlík na světě?',
    type: QuestionType.MULTIPLE_CHOICE,
    options: ['0,85 m', '9 m', '24,6 m'],
    correctAnswer: '9 m',
    rewardWord: 'SAMI',
    wrongReward: 'KOČKA',
  },
];

export const YA_QUIZ_VARIANTS: QuizVariant[] = [
  {
    id: 1,
    questions: [
      { id: 1, text: 'Jak se jmenuje hlavní hrdinka knihy Čtvrté křídlo?', options: ['Tessa Grey', 'Violet Sorrengail', 'Feyre Archeron'], correctAnswerIndex: 1 },
      { id: 2, text: 'Kdo je autorkou série Skleněný trůn?', options: ['Leigh Bardugo', 'Holly Black', 'Sarah J. Maas'], correctAnswerIndex: 2 },
      { id: 3, text: 'Jak se jmenuje hlavní hrdinka série Ranhojička?', options: ['Kiva Meridan', 'Elira Dain', 'Seraphina Vale'], correctAnswerIndex: 0 },
      { id: 4, text: 'Kdo je otcem Percyho Jacksona?', options: ['Zeus', 'Poseidón', 'Hermes'], correctAnswerIndex: 1 },
      { id: 5, text: 'Jak se jmenuje škola, do které chodí Harry Potter?', options: ['Stříbrný háj', 'Kouzelnická akademie Salem', 'Bradavice'], correctAnswerIndex: 2 },
      { id: 6, text: 'V jakém světě se odehrává Krutý princ?', options: ['Faerie', 'Avalon', 'Narnia'], correctAnswerIndex: 0 },
      { id: 7, text: 'Jak se jmenuje hlavní hrdinka série Selekce?', options: ['America Singer', 'Celeste Marrow', 'Aspen Leger'], correctAnswerIndex: 0 },
      { id: 8, text: 'Kdo je hlavní hrdinkou Hunger Games?', options: ['Tris Prior', 'Katniss Everdeen', 'Mare Barrow'], correctAnswerIndex: 1 },
      { id: 9, text: 'Jaké povolání má hlavní hrdinka v Doteku zmaru?', options: ['Královna', 'Bohyně podsvětí/Bohyně jara', 'Lovkyně'], correctAnswerIndex: 1 },
    ]
  },
  {
    id: 2,
    questions: [
      { id: 10, text: 'Jak se jmenuje hlavní hrdinka Zmije a křídla noci?', options: ['Oraya', 'Lysandra', 'Meira'], correctAnswerIndex: 0 },
      { id: 11, text: 'Kdo napsal Onyxovou bouři?', options: ['Jennifer L. Armentrout', 'Rebecca Yarros', 'Shelby Mahurin'], correctAnswerIndex: 1 },
      { id: 12, text: 'Jak se jmenuje druhý díl série Čtvrté křídlo?', options: ['Dračí křik', 'Železný plamen', 'Krvavé peří'], correctAnswerIndex: 1 },
      { id: 13, text: 'Jak se jmenuje hlavní hrdinka Půlměsíčního města?', options: ['Aelin Ashryver', 'Nesta Archeron', 'Bryce Quinlan'], correctAnswerIndex: 2 },
      { id: 14, text: 'Kde se odehrává děj knihy Nezkrotná říše?', options: ['Rinsha', 'Nikara', 'Budapešť'], correctAnswerIndex: 2 },
      { id: 15, text: 'Kdo napsal trilogii Griša?', options: ['Tahereh Mafi', 'Leigh Bardugo', 'Marie Lu'], correctAnswerIndex: 1 },
      { id: 16, text: 'Jak se jmenuje hlavní hrdinka série Griša?', options: ['Alina Starkov', 'Nina Zenik', 'Genya Safin'], correctAnswerIndex: 0 },
      { id: 17, text: 'Kdo je po boku Bryce v Půlměsíčním městě?', options: ['Cassian', 'Hunt Athalar', 'Azriel'], correctAnswerIndex: 1 },
      { id: 18, text: 'Jaký je hlavní motiv vztahu ve Zmiji a křídlech noci?', options: ['Zakázaná láska', 'Nepřátelství s otcem', 'Smrtící soutěž a láska'], correctAnswerIndex: 2 },
    ]
  },
  {
    id: 3,
    questions: [
      { id: 19, text: 'Kde je vězněna Kiva na začátku Ranhojičky?', options: ['V Paláci bolesti', 'V Zallindově', 'V Temném chrámu'], correctAnswerIndex: 1 },
      { id: 20, text: 'Jak se jmenuje korunní princ v Selekci?', options: ['Maxon Calix Schreave', 'Mace Valen', 'Thorne Eldridge'], correctAnswerIndex: 0 },
      { id: 21, text: 'Kdo napsal Nezkrotnou říši?', options: ['R. F. Kuang', 'Elizabeth Lim', 'Stacey Brown'], correctAnswerIndex: 2 },
      { id: 22, text: 'Jaké schopnosti má Hades v Doteku zmaru?', options: ['Ovládá sny', 'Vládne ohni', 'Vládne podsvětí'], correctAnswerIndex: 2 },
      { id: 23, text: 'Kdo je nejlepší přítelkyní Bryce?', options: ['Danika Fendyr', 'Lysandra Storm', 'Miryam River'], correctAnswerIndex: 0 },
      { id: 24, text: 'Rhysand vládne kterému Dvoru?', options: ['Jarní dvůr', 'Denní dvůr', 'Noční dvůr'], correctAnswerIndex: 2 },
      { id: 25, text: 'Hlavní hrdinka série Měsíční kroniky Cinder je:', options: ['upírka', 'člověk', 'kyborg'], correctAnswerIndex: 2 },
      { id: 26, text: 'Jak se jmenuje nová kniha o Zaklínači z Rivie?', options: ['Rozcestí krkavců', 'Labyrint', 'Nestvůrné bludiště'], correctAnswerIndex: 0 },
      { id: 27, text: 'Brokolice je:', options: ['jídlo co Violet nesnáší', 'Dainova přezdívka', 'kotě'], correctAnswerIndex: 2 }, // Following prompt spec: 27c
    ]
  }
];
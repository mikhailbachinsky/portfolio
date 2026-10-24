export interface ChapterData {
  id: number;
  numberStr: string;
  title: string;
  pageNumber: number;
  endPageNumber?: number;
  pageDisplay?: string;
  nativeTitle: string; // Селькупское / эвенкийское название
  subtitle: string;
  description: string;
  palette: {
    name: string;
    hex: string;
    contrast: 'dark' | 'light';
  }[];
  patternName: string;
  patternMeaning: string;
  patternType: 'horns' | 'cedar' | 'river' | 'footprint' | 'birch' | 'sun' | 'chum' | 'fish' | 'pine' | 'sable' | 'boat' | 'aurora';
  dictionaryWord: {
    native: string;
    transcription: string;
    translation: string;
    definition: string;
  };
  spreadNote: string;
}

export interface BookSection {
  id: string | number;
  title: string;
  pageNumber: number;
  endPageNumber: number;
  pageDisplay: string;
  isMainChapter: boolean;
  chapterNumber?: number;
  accentColor?: string;
}

export const BOOK_SECTIONS: BookSection[] = [
  {
    id: 'intro',
    title: 'Введение',
    pageNumber: 3,
    endPageNumber: 4,
    pageDisplay: '3–4',
    isMainChapter: false,
    accentColor: '#3E3E3E',
  },
  {
    id: 'legend',
    title: 'Легенда словаря',
    pageNumber: 5,
    endPageNumber: 6,
    pageDisplay: '5–6',
    isMainChapter: false,
    accentColor: '#3E3E3E',
  },
  {
    id: 1,
    title: 'Семья',
    chapterNumber: 1,
    pageNumber: 7,
    endPageNumber: 15,
    pageDisplay: '7',
    isMainChapter: true,
    accentColor: '#8D6E63',
  },
  {
    id: 2,
    title: 'Одежда',
    chapterNumber: 2,
    pageNumber: 16,
    endPageNumber: 33,
    pageDisplay: '16',
    isMainChapter: true,
    accentColor: '#8A7F60',
  },
  {
    id: 3,
    title: 'Жилище',
    chapterNumber: 3,
    pageNumber: 34,
    endPageNumber: 41,
    pageDisplay: '34',
    isMainChapter: true,
    accentColor: '#5D4037',
  },
  {
    id: 4,
    title: 'География',
    chapterNumber: 4,
    pageNumber: 42,
    endPageNumber: 55,
    pageDisplay: '42',
    isMainChapter: true,
    accentColor: '#5D554D',
  },
  {
    id: 5,
    title: 'Флора',
    chapterNumber: 5,
    pageNumber: 56,
    endPageNumber: 64,
    pageDisplay: '56',
    isMainChapter: true,
    accentColor: '#556B2F',
  },
  {
    id: 6,
    title: 'Фауна',
    chapterNumber: 6,
    pageNumber: 65,
    endPageNumber: 76,
    pageDisplay: '65',
    isMainChapter: true,
    accentColor: '#37474F',
  },
  {
    id: 7,
    title: 'Инструменты и материалы',
    chapterNumber: 7,
    pageNumber: 77,
    endPageNumber: 87,
    pageDisplay: '77',
    isMainChapter: true,
    accentColor: '#8C7B38',
  },
  {
    id: 8,
    title: 'Оленеводство',
    chapterNumber: 8,
    pageNumber: 88,
    endPageNumber: 95,
    pageDisplay: '88',
    isMainChapter: true,
    accentColor: '#2E4C40',
  },
  {
    id: 9,
    title: 'Охота',
    chapterNumber: 9,
    pageNumber: 96,
    endPageNumber: 101,
    pageDisplay: '96',
    isMainChapter: true,
    accentColor: '#924A45',
  },
  {
    id: 10,
    title: 'Рыболовство',
    chapterNumber: 10,
    pageNumber: 102,
    endPageNumber: 112,
    pageDisplay: '102',
    isMainChapter: true,
    accentColor: '#455A64',
  },
  {
    id: 11,
    title: 'Традиционные блюда',
    chapterNumber: 11,
    pageNumber: 113,
    endPageNumber: 127,
    pageDisplay: '113',
    isMainChapter: true,
    accentColor: '#7E4E58',
  },
  {
    id: 12,
    title: 'Духовная культура',
    chapterNumber: 12,
    pageNumber: 128,
    endPageNumber: 136,
    pageDisplay: '128',
    isMainChapter: true,
    accentColor: '#514561',
  },
  {
    id: 'conclusion',
    title: 'Заключение',
    pageNumber: 137,
    endPageNumber: 137,
    pageDisplay: '137',
    isMainChapter: false,
    accentColor: '#3E3E3E',
  },
  {
    id: 'appendix',
    title: 'Приложения',
    pageNumber: 138,
    endPageNumber: 140,
    pageDisplay: '138',
    isMainChapter: false,
    accentColor: '#3E3E3E',
  },
  {
    id: 'index',
    title: 'Алфавитно-предметный указатель',
    pageNumber: 141,
    endPageNumber: 144,
    pageDisplay: '141',
    isMainChapter: false,
    accentColor: '#3E3E3E',
  },
  {
    id: 'informants',
    title: 'Список информантов',
    pageNumber: 145,
    endPageNumber: 145,
    pageDisplay: '145',
    isMainChapter: false,
    accentColor: '#3E3E3E',
  },
  {
    id: 'sources',
    title: 'Список источников и литературы',
    pageNumber: 146,
    endPageNumber: 147,
    pageDisplay: '146',
    isMainChapter: false,
    accentColor: '#3E3E3E',
  },
  {
    id: 'about',
    title: 'О проекте и составителях',
    pageNumber: 148,
    endPageNumber: 150,
    pageDisplay: '148',
    isMainChapter: false,
    accentColor: '#3E3E3E',
  },
];

export interface CaseStudyData {
  meta: {
    designerName: string;
    role: string;
    year: string;
    location: string;
    projectType: string;
    title: string;
    subtitle: string;
    institution: string;
    specs: {
      label: string;
      value: string;
    }[];
  };
  context: {
    lead: string;
    paragraphs: string[];
    stats: {
      value: string;
      label: string;
      sub: string;
    }[];
  };
  goals: {
    objectives: {
      number: string;
      title: string;
      text: string;
    }[];
    mainGoal: string;
    designSolution: string;
  };
  identity: {
    coverDescription: string;
    endpaperDescription: string;
    gridDescription: string;
    typography: {
      display: {
        family: string;
        role: string;
        sample: string;
      };
      body: {
        family: string;
        role: string;
        sample: string;
      };
      indigenous: {
        family: string;
        role: string;
        sample: string;
      };
    };
    illustrationsDescription: string;
  };
  chapters: ChapterData[];
  conclusion: {
    lead: string;
    takeaways: {
      title: string;
      text: string;
    }[];
    statusNote: string;
  };
}

export const CASE_STUDY_DATA: CaseStudyData = {
  meta: {
    designerName: "Михаил Бачинский",
    role: "Графический дизайн · Иллюстрация · Арт-дирекшн",
    year: "2026",
    location: "Томск\u00A0— р.\u00A0п.\u00A0Белый Яр (Верхнекетский р-н)",
    projectType: "Детский иллюстрированный словарь-энциклопедия",
    title: "Книга коренных народов Верхнекетья",
    subtitle: "Детский словарь-энциклопедия культуры, языков и\u00A0традиций трёх коренных народов Верхнекетского района:\u00A0селькупов, эвенков и\u00A0кетов",
    institution: "Издательский грантовый проект · МБОУ «Белоярская СОШ №\u00A01»",
    specs: [
      { label: "Формат", value: "книжный формат А4 (210 × 297 мм)" },
      { label: "Объем", value: "150\u00A0полос, 12\u00A0тематических разделов" },
      { label: "Тираж", value: "45\u00A0экземпляров (физический грантовый\u00A0тираж)" },
      { label: "Переплет", value: "Папка-биндер на\u00A04\u00A0разжимных кольцах, матовая ламинация, рельефное\u00A0тиснение" },
      { label: "Бумага", value: "Плотная белая офсетная бумага 130\u00A0г/м²" },
      { label: "Языки", value: "Русский · Южноселькупский · Эвенкийский · Кетский" },
      { label: "Целевая аудитория", value: "Дети 6–14\u00A0лет, педагоги,\u00A0краеведы" }
    ]
  },
  context: {
    lead: "Верхнекетский район\u00A0— край вековой тайги, болот и\u00A0извилистой реки Кеть. Историческая родина южных селькупов, эвенков и\u00A0кетов, чьё культурное и\u00A0языковое наследие сегодня нуждается в\u00A0бережном сохранении.",
    paragraphs: [
      "Языки коренных народов Верхнекетья находятся под\u00A0угрозой исчезновения. Носителей южноселькупского диалекта в\u00A0бассейне Кети и\u00A0Оби остались единицы, а\u00A0дети почти не\u00A0слышат родной речи и\u00A0не\u00A0знают старинных названий птиц, растений и\u00A0таёжных промыслов.",
      "Существующие академические словари изданы мелким шрифтом для\u00A0учёных-лингвистов. Детям и\u00A0школьникам читать их\u00A0трудно и\u00A0неинтересно.",
      "Так родилась идея создать красивую, наглядную и\u00A0понятную книгу, которая заговорит со\u00A0школьниками на\u00A0живом визуальном языке и\u00A0бережно сохранит подлинную культуру\u00A0Севера."
    ],
    stats: [
      {
        value: "12",
        label: "Тематических разделов",
        sub: "Охватывают все сферы материальной и\u00A0духовной жизни"
      },
      {
        value: "350+",
        label: "Аутентичных слов",
        sub: "Селькупская лексика с\u00A0транскрипцией и\u00A0толкованием"
      },
      {
        value: "12",
        label: "Авторских паттернов",
        sub: "Основаны на\u00A0традиционной берестяной резьбе и\u00A0орнаментах"
      },
      {
        value: "100%",
        label: "Авторские иллюстрации",
        sub: "Наглядная графика с\u00A0вниманием к\u00A0историческим деталям"
      }
    ]
  },
  goals: {
    objectives: [
      {
        number: "1",
        title: "Структурирование материала",
        text: "Переработать сложный архив этнографических экспедиций в\u00A012\u00A0логичных и\u00A0увлекательных маршрутов по\u00A0миру Верхнекетья."
      },
      {
        number: "2",
        title: "Собственная палитра разделов",
        text: "Наделить каждую главу персональным визуальным стилем: природной палитрой, фактурой и\u00A0самобытным орнаментом."
      },
      {
        number: "3",
        title: "Баланс традиции и графики",
        text: "Сохранить уважение к\u00A0первоисточникам, объединив народные мотивы с\u00A0чистой современной вёрсткой и\u00A0воздухом."
      },
      {
        number: "4",
        title: "Удобная детская навигация",
        text: "Создать цветовую систему глав, понятные знаки-символы и\u00A0карточки слов, превращающие чтение в\u00A0увлекательное открытие."
      }
    ],
    mainGoal: "Создать иллюстрированный словарь-энциклопедию коренных народов Верхнекетского района, который пробуждает у\u00A0школьников интерес к\u00A0родной земле и\u00A0помогает сохранить исчезающие\u00A0языки.",
    designSolution: "Продуманная дизайн-система книги: сдержанная обложка под\u00A0фактуру таёжного дерева и\u00A012\u00A0самобытных цветных глав, где\u00A0каждая тема раскрывается через геометрический орнамент, природную гамму и\u00A0сюжетную иллюстрацию."
  },
  identity: {
    coverDescription: "Обложка передаёт поэзию сибирской тайги. Плотная крышка оформлена рельефным тиснением, напоминающим затёску на\u00A0дереве, а\u00A0лаконичное название подчёркивает ценность собранных\u00A0знаний.",
    endpaperDescription: "Вводные страницы украшены авторским узором на\u00A0основе традиционных селькупских мотивов речных струй и\u00A0роговидных завитков.",
    gridDescription: "Вёрстка построена на\u00A0модульной сетке с\u00A0широкими полями. Свободное пространство позволяет взгляду отдыхать и\u00A0служит местом для\u00A0звуковых подсказок и\u00A0заметок.",
    typography: {
      display: {
        family: "Kurale (Этнографическая антиква)",
        role: "Титульные надписи, нумерация глав, акцентные цитаты",
        sample: "Челвэл · Родной край"
      },
      body: {
        family: "Geologica (Геометрический гротеск)",
        role: "Основной текст статей, толкования, детские пояснения",
        sample: "Селькупы называли себя солькуп — «таёжный человек». Река Кеть для них была главной дорогой жизни."
      },
      indigenous: {
        family: "Geologica Medium (Фонетика)",
        role: "Транскрипция селькупских фонем, гортанных звуков и ударений",
        sample: "ӄон · [qon] · кедр сибирский"
      }
    },
    illustrationsDescription: "Иллюстрации выполнены в\u00A0технике лаконичной графики с\u00A0выразительным силуэтом и\u00A0мягкими деталями, напоминающими резьбу по\u00A0бересте и\u00A0дереву. Это помогает детям сразу узнавать предмет или\u00A0животное."
  },
  chapters: [
    {
      id: 1,
      numberStr: "1",
      title: "Семья",
      pageNumber: 7,
      endPageNumber: 15,
      pageDisplay: "7",
      nativeTitle: "Ӄумыш энд Со̄лькуп",
      subtitle: "Родственные связи, старшие в\u00A0роду и\u00A0воспитание детей в\u00A0тайге",
      description: "Раздел рассказывает о\u00A0семейном укладе, уважении к\u00A0старшим, традициях передачи знаний и\u00A0воспитания детей коренных народов Кети.",
      palette: [
        { name: "Кетская глубина", hex: "#1C2430", contrast: "dark" },
        { name: "Речной ил", hex: "#424D59", contrast: "dark" },
        { name: "Светлая заводь", hex: "#8DA1B5", contrast: "light" },
        { name: "Речная пена", hex: "#E9EFF4", contrast: "light" }
      ],
      patternName: "Речные струи (Кэ̄т ӱт)",
      patternMeaning: "Символ безостановочного течения жизни и\u00A0преемственности поколений.",
      patternType: "river",
      dictionaryWord: {
        native: "Ӄумыш",
        transcription: "[qumɯʂ]",
        translation: "Семья / Род",
        definition: "Основа таёжного уклада, где\u00A0каждый член общины имеет свои обязанности и\u00A0окружён заботой."
      },
      spreadNote: "Разворот с\u00A0изображением семейного уклада и\u00A0традиционного быта."
    },
    {
      id: 2,
      numberStr: "2",
      title: "Одежда",
      pageNumber: 16,
      endPageNumber: 33,
      pageDisplay: "16",
      nativeTitle: "Па̄рӄа энд Пимы",
      subtitle: "Парка из\u00A0сукна и\u00A0шкур, бисерные узоры, подвески и\u00A0чижи",
      description: "Наряд северян: как\u00A0спасались от\u00A050-градусных морозов, зачем на\u00A0одежду вешали звенящие бронзовые подвески и\u00A0как вышивали бисером.",
      palette: [
        { name: "Суконная полночь", hex: "#1B1C22", contrast: "dark" },
        { name: "Красная ольха", hex: "#68292B", contrast: "dark" },
        { name: "Медный колокольчик", hex: "#BA6F52", contrast: "light" },
        { name: "Белый бисер", hex: "#F3EDE8", contrast: "light" }
      ],
      patternName: "Солнечная розетка (Че̄ль)",
      patternMeaning: "Круговой обережный узор на\u00A0груди парки, защищающий сердце от\u00A0холода.",
      patternType: "sun",
      dictionaryWord: {
        native: "Па̄рӄа",
        transcription: "[paːrqa]",
        translation: "Парка",
        definition: "Традиционная тёплая глухая одежда с\u00A0капюшоном и\u00A0рукавицами из\u00A0меха."
      },
      spreadNote: "Детальный разбор кроя парки с\u00A0раскладкой геометрических швов."
    },
    {
      id: 3,
      numberStr: "3",
      title: "Жилище",
      pageNumber: 34,
      endPageNumber: 41,
      pageDisplay: "34",
      nativeTitle: "Мот энд Карамо",
      subtitle: "Берестяной чум, полуземлянка, очаг и\u00A0уют таёжного дома",
      description: "Устройство традиционного жилища селькупов и\u00A0эвенков: шестовой чум (мот), зимняя полуземлянка (карамо) и\u00A0правила хранения священного огня.",
      palette: [
        { name: "Очажный уголь", hex: "#221E1B", contrast: "dark" },
        { name: "Копченая лиственница", hex: "#5C4B3E", contrast: "dark" },
        { name: "Теплая глина", hex: "#A88365", contrast: "light" },
        { name: "Дым очага", hex: "#EFE8DF", contrast: "light" }
      ],
      patternName: "Чум и очаг (Мот ӱй)",
      patternMeaning: "Треугольный орнамент стойкости дома, защиты семьи от\u00A0свирепого бурана.",
      patternType: "chum",
      dictionaryWord: {
        native: "Мот",
        transcription: "[mot]",
        translation: "Чум / Дом",
        definition: "Коническое жилище из\u00A0жердей, покрываемое летом берестой, а\u00A0зимой\u00A0— шкурами."
      },
      spreadNote: "Схема устройства шестового чума с\u00A0указанием мужской и\u00A0женской зон."
    },
    {
      id: 4,
      numberStr: "4",
      title: "География",
      pageNumber: 42,
      endPageNumber: 55,
      pageDisplay: "42",
      nativeTitle: "Челвэл энд Кэ̄т",
      subtitle: "Топонимика, великая река и\u00A0бескрайние сибирские просторы",
      description: "Раздел знакомит ребёнка с\u00A0географией Верхнекетья, истоками реки Кеть, её\u00A0протоками и\u00A0древними названиями урочищ.",
      palette: [
        { name: "Кетская глубина", hex: "#1C2430", contrast: "dark" },
        { name: "Речной ил", hex: "#424D59", contrast: "dark" },
        { name: "Светлая заводь", hex: "#8DA1B5", contrast: "light" },
        { name: "Речная пена", hex: "#E9EFF4", contrast: "light" }
      ],
      patternName: "Речные струи (Кэ̄т ӱт)",
      patternMeaning: "Символ безостановочного течения реки, кормящей рыбой и\u00A0соединяющей стойбища.",
      patternType: "river",
      dictionaryWord: {
        native: "Кэ̄т",
        transcription: "[kæːt]",
        translation: "Река Кеть",
        definition: "Главная водная артерия южных селькупов, переводящаяся как\u00A0«чистая текущая вода»."
      },
      spreadNote: "Панорамный разворот с\u00A0картой течения Кети и\u00A0силуэтами лодок."
    },
    {
      id: 5,
      numberStr: "5",
      title: "Флора",
      pageNumber: 56,
      endPageNumber: 64,
      pageDisplay: "56",
      nativeTitle: "Мач энд Ӄон",
      subtitle: "Кедр-великан, лиственница, смола и\u00A0лесные духи-хранители",
      description: "Отношение коренных народов к\u00A0лесу как\u00A0к\u00A0живому храму. Почитание вековых кедров, сбор орехов, смолы и\u00A0даров тайги.",
      palette: [
        { name: "Ночная тайга", hex: "#16211A", contrast: "dark" },
        { name: "Кедровая хвоя", hex: "#2C4A38", contrast: "dark" },
        { name: "Лесной мох", hex: "#6A8C69", contrast: "light" },
        { name: "Кедровая скорлупа", hex: "#D6DFD3", contrast: "light" }
      ],
      patternName: "Кедровая шишка (Ӄон пе̄р)",
      patternMeaning: "Ромбический орнамент изобилия и\u00A0вечной жизни таёжного древа.",
      patternType: "cedar",
      dictionaryWord: {
        native: "Ӄон",
        transcription: "[qon]",
        translation: "Кедр сибирский",
        definition: "Священное дерево жизни, дающее сытную шишку и\u00A0прочную древесину."
      },
      spreadNote: "Иллюстрированный гербарий таёжных деревьев Верхнекетья."
    },
    {
      id: 6,
      numberStr: "6",
      title: "Фауна",
      pageNumber: 65,
      endPageNumber: 76,
      pageDisplay: "65",
      nativeTitle: "Мачиль ӄор энд Воргол",
      subtitle: "Хозяин тайги медведь, соболь, лось, олень и\u00A0заяц",
      description: "Животный мир Верхнекетья: повадки зверей, уважение к\u00A0медведю («хозяину леса»), покровители охотников.",
      palette: [
        { name: "Медвежья глушь", hex: "#231B15", contrast: "dark" },
        { name: "Соболиный мех", hex: "#5E3E2B", contrast: "dark" },
        { name: "Оленья замша", hex: "#B88A62", contrast: "light" },
        { name: "Снежный наст", hex: "#F3EDE5", contrast: "light" }
      ],
      patternName: "Оленьи рога (По̄р пар)",
      patternMeaning: "Символ грации, быстроты, связи между земным миром и\u00A0верхними духами.",
      patternType: "horns",
      dictionaryWord: {
        native: "Мачиль ӄор",
        transcription: "[matɕilʲ qor]",
        translation: "Хозяин тайги (Медведь)",
        definition: "Уважительное имя бурого медведя, чьё настоящее имя запрещалось произносить вслух."
      },
      spreadNote: "Сравнительная шкала следов таёжных зверей на\u00A0снегу."
    },
    {
      id: 7,
      numberStr: "7",
      title: "Инструменты и материалы",
      pageNumber: 77,
      endPageNumber: 87,
      pageDisplay: "77",
      nativeTitle: "То̄й энд Ӄон ка̄н",
      subtitle: "Тиснение по\u00A0бересте, туеса, чуманы и\u00A0плетение из\u00A0корней кедра",
      description: "Магия материалов: как\u00A0заготавливали бересту, обрабатывали дерево и\u00A0кость, создавая предметы обихода.",
      palette: [
        { name: "Березовый деготь", hex: "#252018", contrast: "dark" },
        { name: "Кора ольхи", hex: "#5E4A35", contrast: "dark" },
        { name: "Золотая береста", hex: "#C79A63", contrast: "light" },
        { name: "Свежий срез", hex: "#F5ECE0", contrast: "light" }
      ],
      patternName: "Берестяной ромб (То̄й кар)",
      patternMeaning: "Сетка плотности и\u00A0герметичности берестяного сосуда.",
      patternType: "birch",
      dictionaryWord: {
        native: "То̄й",
        transcription: "[toːj]",
        translation: "Береста",
        definition: "Универсальный северный материал для\u00A0изготовления посуды и\u00A0лодок."
      },
      spreadNote: "Пошаговая визуальная инструкция изготовления берестяного туеса."
    },
    {
      id: 8,
      numberStr: "8",
      title: "Оленеводство",
      pageNumber: 88,
      endPageNumber: 95,
      pageDisplay: "88",
      nativeTitle: "По̄р энд Нюде",
      subtitle: "Северный олень, стада, кочевье и\u00A0оленья упряжь",
      description: "Роль северного оленя в\u00A0жизни тайги: транспорт, одежда, жилище и\u00A0основа выживания в\u00A0суровых условиях.",
      palette: [
        { name: "Зимняя тундра", hex: "#1C2026", contrast: "dark" },
        { name: "Олений мех", hex: "#523E32", contrast: "dark" },
        { name: "Ягель", hex: "#9E8B6C", contrast: "light" },
        { name: "Снежный склон", hex: "#F1ECE6", contrast: "light" }
      ],
      patternName: "Олений след (По̄р со̄л)",
      patternMeaning: "Символ неутомимого движения кочевника по\u00A0снежным просторам.",
      patternType: "footprint",
      dictionaryWord: {
        native: "По̄р",
        transcription: "[poːr]",
        translation: "Северный олень",
        definition: "Главный спутник северного человека, дарующий пищу, тепло и\u00A0транспорт."
      },
      spreadNote: "Схема оленьей упряжи и\u00A0устройство нарты."
    },
    {
      id: 9,
      numberStr: "9",
      title: "Охота",
      pageNumber: 96,
      endPageNumber: 101,
      pageDisplay: "96",
      nativeTitle: "Ӄан энд То̄лы",
      subtitle: "Широкие лыжи-подволоки, лук, самострелы и\u00A0таёжные тропы",
      description: "Законы таёжного промысла: никогда не\u00A0брать у\u00A0природы лишнего, уважать зверя, ориентироваться в\u00A0лесу.",
      palette: [
        { name: "Зимняя пороша", hex: "#1E2228", contrast: "dark" },
        { name: "Лосиная шкура", hex: "#4B423A", contrast: "dark" },
        { name: "Охотничья сталь", hex: "#8A8D93", contrast: "light" },
        { name: "Снежная тропа", hex: "#EDEDEE", contrast: "light" }
      ],
      patternName: "Лыжный след (По̄кы со̄л)",
      patternMeaning: "Зигзагообразная линия неутомимого охотничьего пути.",
      patternType: "footprint",
      dictionaryWord: {
        native: "По̄кы",
        transcription: "[poːkɯ]",
        translation: "Широкие лыжи",
        definition: "Охотничьи лыжи, подбитые камусом, чтобы не\u00A0скользить назад."
      },
      spreadNote: "Анатомия охотничьего лука и\u00A0лыж с\u00A0камусом."
    },
    {
      id: 10,
      numberStr: "10",
      title: "Рыболовство",
      pageNumber: 102,
      endPageNumber: 112,
      pageDisplay: "102",
      nativeTitle: "Ӄуле энд Обласок",
      subtitle: "Сети, морды, заколы, стерлядь, нельма и\u00A0лодка-обласок",
      description: "Богатство вод: как\u00A0селькупы мастерили рыболовные снасти, строили заколы и\u00A0управлялись с\u00A0лёгким обласком.",
      palette: [
        { name: "Речной омут", hex: "#15262B", contrast: "dark" },
        { name: "Щучья чешуя", hex: "#2F5862", contrast: "dark" },
        { name: "Глухариное перо", hex: "#7BA1A8", contrast: "light" },
        { name: "Серебряный малек", hex: "#E7F0F2", contrast: "light" }
      ],
      patternName: "Лодка-обласок (Ӱт мач)",
      patternMeaning: "Символ лёгкого движения по\u00A0речным плёсам и\u00A0затонам.",
      patternType: "boat",
      dictionaryWord: {
        native: "Обласок",
        transcription: "[oblɑsok]",
        translation: "Долблёная лодка",
        definition: "Лёгкая лодка-однодеревка, выдолбленная из\u00A0осины или\u00A0кедра."
      },
      spreadNote: "Схема долблёной лодки-обласка и\u00A0рыболовных снастей."
    },
    {
      id: 11,
      numberStr: "11",
      title: "Традиционные блюда",
      pageNumber: 113,
      endPageNumber: 127,
      pageDisplay: "113",
      nativeTitle: "Ма̄н энд Ко̄пчы",
      subtitle: "Юкола, строганина, таёжные ягоды, чай из\u00A0трав и\u00A0угощения",
      description: "Кулинарные традиции Севера: заготовка рыбы впрок, сушка ягоды, целебные чаи из\u00A0дикоросов и\u00A0правила трапезы.",
      palette: [
        { name: "Лиственничный дым", hex: "#23201C", contrast: "dark" },
        { name: "Кедровая щепа", hex: "#5C4A3A", contrast: "dark" },
        { name: "Таёжная ягода", hex: "#B55353", contrast: "light" },
        { name: "Сушеная рыба", hex: "#E6D7C3", contrast: "light" }
      ],
      patternName: "Рыбья чешуя",
      patternMeaning: "Орнамент изобилия и\u00A0сытного рыбного стола.",
      patternType: "fish",
      dictionaryWord: {
        native: "Юкола",
        transcription: "[jukola]",
        translation: "Вяленая рыба",
        definition: "Традиционный способ заготовки рыбы методом вяления на\u00A0ветру и\u00A0солнце без\u00A0соли."
      },
      spreadNote: "Иллюстрации традиционных таёжных блюд и\u00A0способов заготовки."
    },
    {
      id: 12,
      numberStr: "12",
      title: "Духовная культура",
      pageNumber: 128,
      endPageNumber: 136,
      pageDisplay: "128",
      nativeTitle: "Нум энд Иччи",
      subtitle: "Сотворение мира, духи предков, сказки и\u00A0обряды",
      description: "Мифология селькупов: трёхчастное устройство мира, верховный бог неба Нум, сказы, эпос и\u00A0защитники людей.",
      palette: [
        { name: "Мифическая тьма", hex: "#1A1726", contrast: "dark" },
        { name: "Сумеречный туман", hex: "#413659", contrast: "dark" },
        { name: "Северное сияние", hex: "#8971B3", contrast: "light" },
        { name: "Звездная пыль", hex: "#ECE7F5", contrast: "light" }
      ],
      patternName: "Небесные духи (Нум то̄т)",
      patternMeaning: "Символ небесного свода, солнца и\u00A0звёздного пути предков.",
      patternType: "aurora",
      dictionaryWord: {
        native: "Иччи",
        transcription: "[itɕːi]",
        translation: "Богатырь Иччи",
        definition: "Главный герой селькупских преданий, защищающий таёжный\u00A0люд."
      },
      spreadNote: "Разворот мифа о\u00A0сотворении мира и\u00A0духовных традициях."
    }
  ],
  conclusion: {
    lead: "Проект объединил глубокую этнографическую работу и\u00A0передовой графический дизайн, доказав, что\u00A0сохранение наследия коренных малочисленных народов может быть визуально притягательным, современным и\u00A0интересным новому поколению.",
    takeaways: [
      {
        title: "Сохранение редких языков",
        text: "Словарь зафиксировал свыше 350 таёжных слов трёх коренных народов в\u00A0удобной для\u00A0школьников форме с\u00A0яркими зрительными образами."
      },
      {
        title: "Уроки в школьном музее",
        text: "Книга стала постоянным наглядным пособием на\u00A0уроках краеведения и\u00A0внеклассных встречах в\u00A0мини-музее «Затёски» Верхнекетского района."
      },
      {
        title: "Эстетика северной книги",
        text: "Издание показало самобытную таёжную культуру современным графическим языком: чистая вёрстка, выразительные шрифты и\u00A0гармоничные цвета."
      }
    ],
    statusNote: "Книга передана в\u00A0краеведческий мини-музей «Затёски» и\u00A0используется на\u00A0школьных уроках краеведения."
  }
};

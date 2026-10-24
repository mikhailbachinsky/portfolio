import { DeliverableItem, ColorSwatch, QuestionGroup, CaseMetric, StrategicPillarItem, ShiftComparisonItem, ConceptPillar, SpatialFeature, MetaphorItem, VKCommunityData, VKCarouselPost } from '../types';
import { deepFormatTypography } from '../utils/typography';

export const HERO_METRICS: CaseMetric[] = deepFormatTypography([
  {
    label: 'Гостей вечера',
    value: '297',
    change: '100% аншлаг',
    description: 'Полная заполняемость клуба FACE по защищённым VIP-билетам'
  },
  {
    label: 'Носителей айдентики',
    value: '40+',
    change: 'экосистема',
    description: 'Комплект макетов для SMM, афиши, полиграфия и фотозона'
  },
  {
    label: 'Брендов-партнёров',
    value: '5',
    change: 'спонсорский пул',
    description: 'Официальные партнёры с нативной интеграцией в айдентику'
  },
  {
    label: 'Затраты на маркетинг',
    value: '0 ₽',
    change: 'вирусный посев',
    description: 'Ажиотаж за счёт вирусной легенды с Днём рождения Ю.И. Тгушкина'
  }
]);

export const CASE_METRICS: CaseMetric[] = deepFormatTypography([
  {
    label: 'sold out билетов',
    value: 'ЗА 4 ДНЯ',
    change: 'до начала',
    description: 'Полная распродажа всех категорий билетов и брони VIP-столов'
  },
  {
    label: 'Соблюдение дресс-кода',
    value: '~60%',
    change: 'Total Black & Emerald',
    description: 'Гости вечера выдержали обозначенное требование без давления организаторов'
  },
  {
    label: 'Вирусный эффект',
    value: '17 500+',
    change: 'чистая органика',
    description: 'Суммарный охват тизерной промо-кампании в VK'
  },
  {
    label: 'Бюджет на рекламу',
    value: '0 ₽',
    change: 'без платного промо',
    description: 'Ажиотаж за счёт вирусной легенды с Днём рождения Ю.И. Тгушкина'
  }
]);

export const STRATEGIC_CHALLENGES: StrategicPillarItem[] = deepFormatTypography([
  {
    id: 'greenfield',
    number: '01',
    title: 'Айдентика с чистого листа',
    subtitle: 'Отсутствие раннего визуала',
    description: 'До 2024 года событие не имело собственного графического стиля. Оформление создавалось разово и разрозненно. Задачей дизайна было спроектировать цельный визуальный фундамент бренда события с нуля.',
    principle: 'Самостоятельный визуальный язык вместо случайных ежегодных шаблонов'
  },
  {
    id: 'cliche-shift',
    number: '02',
    title: 'Отказ от визуальных клише',
    subtitle: 'Преодоление институциональной инерции',
    description: 'Полный уход от стандартных ассоциаций юридической сферы: синего градиента, тяжелых статуй Фемиды с весами и казенной строгости университетских документов.',
    principle: 'Слияние клубного люкса, поп-арта и академического достоинства ЮИ ТГУ'
  },
  {
    id: 'club-status',
    number: '03',
    title: 'Закрытый клубный статус & интрига',
    subtitle: 'Преодоление протокольности',
    description: 'Задача состояла в преодолении казенной скуки традиционных премий. Событию требовалось придать ауру желанного клубного комьюнити, куда стремятся попасть все студенты института.',
    principle: 'Атмосфера закрытого сообщества и сопричастности вместо обязательного официоза'
  },
  {
    id: 'ecosystem',
    number: '04',
    title: 'Сквозная экосистема носителей',
    subtitle: 'От digital-воронки до физического билета',
    description: 'Единая сквозная сетка объединила тизеры, продажи, вирусные номинации, партнерские интеграции 5 брендов, физические защищенные VIP-билеты с тиснением и оформление площадки.',
    principle: 'Бесшовная связь онлайна с реальным клубным пространством'
  }
]);

export const SHIFT_COMPARISON: ShiftComparisonItem[] = [];

export const CONCEPT_PILLARS: ConceptPillar[] = deepFormatTypography([
  {
    id: 'emerald-city',
    title: 'Томск — Изумрудный город',
    subtitle: 'Литературный & архитектурный код',
    meaning: 'Александр Волков вдохновлялся архитектурой и зелёными крышами старинного Томска, создавая «Волшебника Изумрудного города».',
    detail: 'Глубокий изумрудный цвет стал визуальным якорем, объединившим культурное наследие города с юриспруденцией.',
    tag: 'Наследие местоположения'
  },
  {
    id: 'silver-hallmark',
    title: 'Серебро 925 пробы',
    subtitle: 'Материал и ДНК факультета',
    meaning: 'Серебро — металл, который используется при оформлении айдентики VK сообщества Юридического института ТГУ.',
    detail: 'Металлическое тиснение, серебряная оправа и холодные акценты создают ощущение ювелирной ценности.',
    tag: 'Преемственность дизайна'
  },
  {
    id: 'siberian-frost',
    title: 'Морозное стекло сибирского декабря',
    subtitle: 'Контекст даты 5 декабря (морозный декабрь)',
    meaning: 'Вечеринка проходила в морозный декабрь на улицах Томска перед входом в клуб FACE.',
    detail: 'Текстура инея, словно морозные узоры на стекле, подчёркивает зимний сезон мероприятия.',
    tag: 'Соответствие погодным условиям'
  },
  {
    id: 'mystery-secret',
    title: 'Тайна: сценарий вечеринки-сюрприза',
    subtitle: 'Нарратив молчания и закрытого клуба',
    meaning: 'Заговорщический слоган «Только не проболтайся!» и визуальный жест молчания с кристаллом на губах сформировали атмосферу интриги.',
    detail: 'Кампания вовлекла студентов в сценарий тайного поздравления факультета, создав мощный органический ажиотаж.',
    tag: 'Сценарный нарратив'
  }
]);

export const SPATIAL_FEATURES: SpatialFeature[] = deepFormatTypography([
  {
    id: 'photozone',
    title: 'Фотозона',
    role: 'Эффектная точка входа в клуб',
    description: 'Вместо стандартного баннера с логотипами была разработана тактильная фотозона из струящегося серебряного и изумрудного шёлка с точечным контрастным светом.',
    image: '/assets/spatial_photozone.webp'
  },
  {
    id: 'dresscode',
    title: 'Дресс-код',
    role: 'Визуальное единство комьюнити',
    description: 'Дресс-код события выдержан в трёх цветах: глубокий Total Black как строгая основа вечерних нарядов, акцентный изумрудный (Emerald) в деталях и шёлке, а также сияющее серебро (Silver) в украшениях и металле.',
    image: '/assets/spatial_dresscode.webp'
  },
  {
    id: 'wristbands',
    title: 'Браслет входа',
    role: 'Система доступа',
    description: 'Тканевые сатиновые браслеты с гравированным металлическим фиксатором и индивидуальной серией как премиальная система контроля доступа гостей.',
    image: '/assets/spatial_wristbands.webp'
  },
  {
    id: 'stage-screen',
    title: 'Экран сцены',
    role: '3D-виджеинг',
    description: 'Бесшовный 3D-виджеинг на главном LED-экране клуба FACE. Вращающиеся изумрудные кристаллы, хромированный металл и световые волны задавали визуальный ритм залу всю ночь.',
    image: '/assets/spatial_screen.webp'
  },
  {
    id: 'bar-menu',
    title: 'Барная карта',
    role: 'Редизайн меню вечера',
    description: 'Редизайн физической барной карты клуба FACE под событие. Коктейльное меню с изумрудно-серебряной типографикой связало барную зону с общим визуальным кодом вечеринки.',
    image: '/assets/spatial_barmenu.webp'
  }
]);

export const COLOR_PALETTE: ColorSwatch[] = deepFormatTypography([
  {
    name: 'Velvet Noir',
    role: 'Основной теневой фон',
    hex: '#010e0d',
    rgb: 'RGB (1, 14, 13)',
    cmyk: 'CMYK (93, 0, 7, 95)',
    textColor: '#e2f1f0',
    description: 'Базовое пространство для всех макетов. Задаёт кинематографичную полутьму клубного зала.'
  },
  {
    name: 'Deep Emerald',
    role: 'Фирменный изумрудный тон',
    hex: '#022625',
    rgb: 'RGB (2, 38, 37)',
    cmyk: 'CMYK (95, 0, 3, 85)',
    textColor: '#e2f1f0',
    description: 'Заливка подложек карточек и акцентных плашек. Визуальный маркер Томска как «Изумрудного города».'
  },
  {
    name: 'Sterling Silver 925',
    role: 'Серебряный металл',
    hex: '#d5e6e6',
    rgb: 'RGB (213, 230, 230)',
    cmyk: 'CMYK (7, 0, 0, 10)',
    textColor: '#011413',
    description: 'Контурные рамки и светлый текст.'
  },
  {
    name: 'Hoarfrost Mint',
    role: 'Морозный зимний акцент',
    hex: '#8aa9a9',
    rgb: 'RGB (138, 169, 169)',
    cmyk: 'CMYK (18, 0, 0, 34)',
    textColor: '#011413',
    description: 'Подписи, теги, разделители и текстурные градиенты кристаллического инея на морозном стекле.'
  }
]);

export const DELIVERABLES_DATA: DeliverableItem[] = deepFormatTypography([
  {
    id: 'hero-teaser',
    title: 'Тизер «Только не проболтайся!» (ДР Ю. И. Тгушкина)',
    category: 'campaign',
    categoryLabel: 'Кампания & Продажи',
    description: 'Загадочный тизерный визуал с ювелирной инкрустацией на губах. Запуск интриги о тайной вечеринке-сюрпризе в честь дня рождения Юрия Игоревича Тгушкина за 2 недели до объявления даты без раскрытия локации.',
    specs: '1080 × 1350 px (VK/Insta) + Stories 1080 × 1920 px',
    badge: 'Secret Drop',
    highlightText: 'Только не проболтайся! Секретный день рождения Ю. И. Тгушкина',
    bgGradient: 'from-[#032b29] to-[#011413]',
    features: ['Легенда дня рождения', 'Жест молчания', 'Изумрудный шёлк', 'Морозное стекло']
  },
  {
    id: 'sales-launch',
    title: 'Анонс локации FACE Club & Старт продаж',
    category: 'campaign',
    categoryLabel: 'Кампания & Продажи',
    description: 'Раскрытие секретной локации — легендарный FACE Club Томск, дата 5 декабря, 22:00. Позиционирование закрытого клубного формата и старт продажи билетов.',
    specs: '1080 × 1350 px (4:5 Ratio)',
    badge: 'Location Reveal',
    highlightText: 'Начало продажи билетов ◇ 5/12 22:00 FACE Club',
    bgGradient: 'from-[#063f3c] to-[#021c1a]',
    features: ['Тайминг события', 'Локация FACE Club', '3D-композиция', 'Ограниченная квота']
  },
  {
    id: 'sales-soldout',
    title: 'Триумф: 100% sold out за 4 дня до ивента',
    category: 'campaign',
    categoryLabel: 'Кампания & Продажи',
    description: 'Официальное объявление о досрочном закрытии билетной программы. Все 297 билетов и VIP-столов раскуплены за 4 дня до вечеринки.',
    specs: '1080 × 1350 px',
    badge: '100% sold out',
    highlightText: 'Все билеты проданы за 4 дня до события! Полный аншлаг в FACE Club',
    bgGradient: 'from-[#084845] to-[#011c1b]',
    features: ['Рекордные продажи', 'Закрытие регистрации', 'Абсолютный sold out']
  },
  {
    id: 'nomination-crash',
    title: 'Вирусная номинация «Краш института»',
    category: 'special',
    categoryLabel: 'Спецпроекты & Номинации',
    description: 'Собственная идея арт-директора: вовлечение студентов через выборы лидеров института. «Этот человек завоевал сердца сотен студентов ЮИ ТГУ». Вызвал шквал репостов.',
    specs: '1080 × 1350 px + интерактивные опросы VK',
    badge: 'Viral Engagement',
    highlightText: 'Краш лучшего института Томска',
    bgGradient: 'from-[#021b19] to-[#000a0a]',
    features: ['Живая сцена зала', 'Интерактивные опросы', 'Взрыв комментариев', 'Вирусный охват']
  },
  {
    id: 'nomination-couple',
    title: 'Номинация «Пара 2024 года»',
    category: 'special',
    categoryLabel: 'Спецпроекты & Номинации',
    description: 'Романтический спецпроект для студенческих пар. Голосование в соцсетях LSA с кульминационным награждением победителей прямо на сцене клуба FACE.',
    specs: '1080 × 1350 px',
    badge: 'Romance & Party',
    highlightText: 'Пара 2024 года',
    bgGradient: 'from-[#053d39] to-[#021c1b]',
    features: ['Эмоциональный триггер', 'Университетское комьюнити', 'Награждение на сцене']
  },
  {
    id: 'partner-ecosystem',
    title: 'Спонсорская экосистема: 5 Партнеров',
    category: 'special',
    categoryLabel: 'Спецпроекты & Номинации',
    description: 'Единая графическая сетка для партнерских интеграций (Quua, Studio 17, OnlyTec, Fides, Nyam Cafe). Нативное внедрение айдентики брендов без разрушения изумрудно-серебряного кода.',
    specs: '1080 × 1350 px (Серия из 5 макетов)',
    badge: 'Brand Ecosystem',
    highlightText: 'Официальные партнеры Law Student Awards 2024',
    bgGradient: 'from-[#074744] to-[#021e1d]',
    features: ['Единая бренд-сетка', '5 локальных бизнесов', 'Розыгрыши ценных призов']
  },
  {
    id: 'ticket-vip',
    title: 'Защищённый VIP-билет с корешком',
    category: 'artifacts',
    categoryLabel: 'Айдентика & Носители',
    description: 'Физический коллекционный билет. Плотная дизайнерская бумага 300 г/м², серебряное тиснение фольгой, защита от подделок, номерная серия и перфорированный контрольный корешок.',
    specs: '210 × 100 мм / 300 DPI / Hot Foil Silver Stamping',
    badge: 'Physical Artifact',
    highlightText: 'VIP-билет ◇ FACE Club Томск ◇ 5/12',
    bgGradient: 'from-[#043d3b] via-[#022625] to-[#011717]',
    features: ['Перфорированный корешок', 'Защита от подделок', 'Тиснение серебром', 'Коллекционный статус']
  },
  {
    id: 'branding-covers',
    title: 'Медиа-оформление: ПК и Мобильные обложки',
    category: 'artifacts',
    categoryLabel: 'Айдентика & Носители',
    description: 'Комплект широкоформатных обложек сообщества VK (версия для ПК 1920×768, вертикальные мобильные обложки и превью видеоклипов для экранов смартфонов).',
    specs: '1920 × 768 px (Desktop) + 1080 × 1920 px (Mobile)',
    badge: 'Digital Identity',
    highlightText: 'LSA День юриста 2024 ◇ Комплексная упаковка',
    bgGradient: 'from-[#053a37] to-[#011a19]',
    features: ['Адаптация под все экраны', 'Бесшовный интерфейс', 'Цельная экосистема']
  }
]);

export const METAPHOR_PILLARS: MetaphorItem[] = deepFormatTypography([
  {
    id: 'gesture-secret',
    title: 'Жест тайны',
    tag: 'Нарративный триггер',
    description: 'Интрига дня рождения Ю. И. Тгушкина за две недели до объявления даты и места. Закрытый статус и главный слоган.',
    image: '/assets/metaphor-gesture.webp'
  },
  {
    id: 'emerald-silk',
    title: 'Изумрудная драпировка',
    tag: 'Материальный носитель',
    description: 'Тяжёлые атласные складки ткани для оформления фотозоны в клубе. Мягко преломляют свет и задают вечерний тон.',
    image: '/assets/metaphor-silk.webp'
  },
  {
    id: 'chrome-dog',
    title: 'Хромированные собаки',
    tag: 'Поп-арт объект',
    description: '3D-фигуры из зеркального хрома в стиле Джеффа Кунса. Добавляют иронии, лёгкости и снимают академическую чопорность.',
    image: '/assets/metaphor-gifts.webp'
  },
  {
    id: 'gift-boxes',
    title: 'Подарочные боксы',
    tag: 'Спонсорские дропы',
    description: 'Серебряные коробки с пышными шёлковыми бантами изумрудного цвета. Символизируют бренд-партнёров мероприятия.',
    image: '/assets/metaphor-balloons.webp'
  }
]);

export const ART_DIRECTOR_STATEMENT = deepFormatTypography({
  quote: 'Вопреки тревожному предубеждению, студенческий разгул был облечён в безупречную эстетическую форму. Репутационный деликт не состоялся — визуальный уровень студентов нашего института предстал солиднее многих заезжих звёзд.',
  author: 'Заместитель директора ЮИ ТГУ по воспитательной работе',
  project: 'Law Student Awards 2024 ◇ Юридический институт ТГУ ◇ День юриста',
  roleSummary: 'Единоличная реализация проекта под ключ: креативная стратегия (отказ от формата протокольной премии в пользу закрытого дня рождения-сюрприза Юрия Игоревича Тгушкина со слоганом «Только не проболтайся!»), нейрогенерация, айдентика, SMM-воронка, фотозона с серебряно-изумрудным шёлком, дресс-код и физические защищённые VIP-билеты с серебряным тиснением.',
  stakeholders: 'Дирекция (администрация) ЮИ ТГУ, Профбюро ЮИ ППОС ТГУ, клуб FACE Томск',
  tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Nano Banana']
});

export const VK_COMMUNITY_DATA: VKCommunityData = deepFormatTypography({
  desktopCover: {
    title: 'LSA 2024 ◇ Юридический институт ТГУ',
    subtitle: 'Закрытый день рождения Ю. И. Тгушкина ◇ 5 декабря, 22:00 ◇ FACE Club',
    status: '«Только не проболтайся!» ◇ Все 297 билетов раскуплены. sold out.',
    subscribersCount: '1 280 подписчиков',
    avatarText: 'LSA 2024',
    bgGradient: 'from-[#032e2b] via-[#05423f] to-[#011a19]',
    specs: '1920 × 768 px (Обложка VK)'
  },
  mobileCover: {
    title: 'LSA 2024 | День юриста',
    subtitle: 'FACE Club ◇ 5/12',
    liveVideoLabel: 'Живая мобильная обложка',
    specs: '1080 × 1920 px (Mobile Header)',
    bgGradient: 'from-[#063f3c] via-[#02211f] to-[#011413]'
  },
  menuItems: [
    {
      id: 'menu-tickets',
      title: 'Билеты',
      subtitle: '297/297 sold out',
      iconName: 'Ticket',
      badge: 'sold out'
    },
    {
      id: 'menu-dresscode',
      title: 'Дресс-код',
      subtitle: 'Emerald & Silver',
      iconName: 'Sparkles',
      badge: 'GUIDE'
    },
    {
      id: 'menu-location',
      title: 'Локация',
      subtitle: 'FACE Club Томск',
      iconName: 'MapPin',
      badge: '22:00'
    },
    {
      id: 'menu-nominations',
      title: 'Номинации',
      subtitle: 'Краш & Пара года',
      iconName: 'Trophy',
      badge: 'VOTE'
    },
    {
      id: 'menu-partners',
      title: 'Партнёры',
      subtitle: '5 Спонсоров',
      iconName: 'Gift',
      badge: 'DROPS'
    }
  ]
});

export const VK_CAROUSEL_POSTS: VKCarouselPost[] = deepFormatTypography([
  {
    id: 'carousel-dresscode',
    title: 'Карусель «Гайд по дресс-коду: Emerald & Silver»',
    category: 'SMM-карусель',
    description: 'Интерактивная карусель из 4 слайдов с подробным разбором дресс-кода для гостей и участников Law Student Awards 2024.',
    specs: '1080 × 1350 px (4 слайда)',
    likes: '248',
    comments: '42',
    reposts: '89',
    slides: [
      {
        slideNum: 1,
        title: 'Гайд по дресс-коду',
        subtitle: 'Дресс-код: Emerald, Silver & Black Tie',
        text: 'Главные цвета вечера: глубокий изумрудный, холодное серебро и безупречный черный.',
        badge: 'Слайд 1/4',
        bgGradient: 'from-[#032d2a] to-[#011716]'
      },
      {
        slideNum: 2,
        title: 'Изумрудные вечерние платья',
        subtitle: 'Для девушек',
        text: 'Шёлк, атлас, бархат в изумрудных оттенках. Акценты из серебряных украшений.',
        badge: 'Слайд 2/4',
        bgGradient: 'from-[#053d39] to-[#011f1e]'
      },
      {
        slideNum: 3,
        title: 'Строгие костюмы & Серебро',
        subtitle: 'Для кавалеров',
        text: 'Классический смокинг или тёмный костюм. Запонки, бабочка, серебряный зажим.',
        badge: 'Слайд 3/4',
        bgGradient: 'from-[#074744] to-[#022221]'
      },
      {
        slideNum: 4,
        title: 'Фейсконтроль клуба FACE',
        subtitle: 'Правила входа',
        text: 'Строгий фейсконтроль. Наличие VIP-билета и соблюдение палитры обязательны.',
        badge: 'Слайд 4/4',
        bgGradient: 'from-[#022422] to-[#000f0f]'
      }
    ]
  },
  {
    id: 'carousel-headliners',
    title: 'Карусель «Хедлайнеры & Лайн-ап»',
    category: 'SMM-карусель',
    description: 'Интерактивная визуальная карусель из 6 слайдов с презентацией программы, артистов и локаций.',
    specs: '1080 × 1350 px (6 слайдов)',
    likes: '405',
    comments: '83',
    reposts: '136',
    slides: [
      {
        slideNum: 1,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 1/6',
        bgGradient: 'from-[#084844] to-[#022220]'
      },
      {
        slideNum: 2,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 2/6',
        bgGradient: 'from-[#053d3a] to-[#011b1a]'
      },
      {
        slideNum: 3,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 3/6',
        bgGradient: 'from-[#03312e] to-[#011615]'
      },
      {
        slideNum: 4,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 4/6',
        bgGradient: 'from-[#063f3c] to-[#021f1e]'
      },
      {
        slideNum: 5,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 5/6',
        bgGradient: 'from-[#043330] to-[#011817]'
      },
      {
        slideNum: 6,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 6/6',
        bgGradient: 'from-[#022220] to-[#000e0d]'
      }
    ]
  },
  {
    id: 'carousel-partners',
    title: 'Карусель «Спонсорский дроп & Партнеры»',
    category: 'SMM-карусель',
    description: 'Презентация официальных партнеров премии с анонсом подарков и розыгрышем VIP-боксов.',
    specs: '1080 × 1350 px (7 слайдов)',
    likes: '312',
    comments: '67',
    reposts: '114',
    slides: [
      {
        slideNum: 1,
        title: 'Партнёры Law Student Awards',
        subtitle: 'Спонсорская экосистема',
        text: 'Подарки и подарочные сертификаты от лучших брендов города для каждого гостя.',
        badge: 'Слайд 1/7',
        bgGradient: 'from-[#063f3c] to-[#021d1c]'
      },
      {
        slideNum: 2,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 2/7',
        bgGradient: 'from-[#043330] to-[#011a19]'
      },
      {
        slideNum: 3,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 3/7',
        bgGradient: 'from-[#053d39] to-[#011e1d]'
      },
      {
        slideNum: 4,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 4/7',
        bgGradient: 'from-[#074744] to-[#022221]'
      },
      {
        slideNum: 5,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 5/7',
        bgGradient: 'from-[#032e2b] to-[#011615]'
      },
      {
        slideNum: 6,
        title: '',
        subtitle: '',
        text: '',
        badge: 'Слайд 6/7',
        bgGradient: 'from-[#053935] to-[#011c1b]'
      },
      {
        slideNum: 7,
        title: 'Розыгрыш VIP-боксов',
        subtitle: 'Условия участия в VK',
        text: 'Репост анонса, подписка на группу LSA 2024 и отметка друга в комментариях.',
        badge: 'Слайд 7/7',
        bgGradient: 'from-[#022321] to-[#000d0d]'
      }
    ]
  }
]);

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Layout, BookOpen, Layers, Sparkles, Grid, Columns,
  Users, Home, Shirt, Wrench, Compass, Target, Fish, Utensils,
  Volume2, Bookmark, Tag, Info, Search, Image, FileText, Sliders,
  CheckCircle2, TreePine, MapPin, Feather, HelpCircle,
  Play, Pause, Book, X
} from 'lucide-react';

// Этнографические пиктограммы для тематических разделов
const EthnoIconNetNeedle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C9.5 5.5 9.5 18.5 12 22C14.5 18.5 14.5 5.5 12 2Z" />
    <path d="M12 5V19" />
    <path d="M9.5 9.5H14.5" />
    <path d="M9.5 14.5H14.5" />
  </svg>
);

const EthnoIconBow = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3C13 6 13 18 6 21" />
    <path d="M6 3V21" />
    <path d="M6 12H18" />
    <path d="M14 8.5L18 12L14 15.5" />
  </svg>
);

const EthnoIconScraper = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5H19V8C19 10 17 11.5 15 11.5H13.5V18.5C13.5 19.5 12.8 20 12 20C11.2 20 10.5 19.5 10.5 18.5V11.5H9C7 11.5 5 10 5 8V5Z" />
    <path d="M8 8H16" />
  </svg>
);

const EthnoIconKnife = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20L9.5 14.5" />
    <path d="M9.5 14.5C12 12 15.5 9.5 19.5 8.5C19.5 12.5 16.5 15.5 9.5 14.5Z" />
    <path d="M4 20L2.5 21.5" />
    <path d="M8 16L9.5 17.5" />
  </svg>
);

const EthnoIconChum = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 21H21L12 2Z" />
    <path d="M12 2V21" />
    <path d="M8.5 21L12 13L15.5 21" />
    <path d="M10 2.5L14 2.5" />
  </svg>
);

const EthnoIconNarty = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 19C4.5 19 5.5 19.5 8 19.5H20.5C21.8 19.5 22.5 18 21 16.5L19 14.5" />
    <path d="M4 15.5H20" />
    <path d="M6 15.5V9.5" />
    <path d="M11.5 15.5V9.5" />
    <path d="M17 15.5V9.5" />
    <path d="M4.5 9.5H20.5" />
  </svg>
);

const EthnoIconReindeer = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12C12 12 10 10.5 8 10.5C6.5 10.5 5 11.5 5 13" />
    <path d="M12 12L15 9" />
    <path d="M12 12V18" />
    <path d="M12 18L9.5 21" />
    <path d="M12 18L14.5 21" />
    <path d="M15 9C15 6 13 4 11 2.5" />
    <path d="M15 9C17 7 19 6.5 21 6.5" />
    <path d="M15 9C17 10 19 9 20 7.5" />
    <path d="M11 2.5C9.5 1.5 7.5 2 6.5 3" />
  </svg>
);

const EthnoIconFish = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12C5 6 15 6 20 12C15 18 5 18 2 12Z" />
    <path d="M20 12L22.5 9V15L20 12Z" />
    <circle cx="16.5" cy="10.5" r="1" fill="currentColor" />
    <path d="M9.5 8V16" />
  </svg>
);

const EthnoIconBoat = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 13.5C5 17.5 19 17.5 22 13.5C18.5 11 5.5 11 2 13.5Z" />
    <path d="M13 4.5L7.5 16" />
    <path d="M5.5 16C5.5 17.2 7.2 17.2 7.2 16C7.2 14.8 5.5 14.8 5.5 16Z" />
  </svg>
);

const EthnoIconMalica = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3.5C9 2.1 10.3 1.5 12 1.5C13.7 1.5 15 2.1 15 3.5V5.5H19L21.5 10.5L18.5 11.5V21.5H5.5V11.5L2.5 10.5L5 5.5H9V3.5Z" />
    <path d="M12 5.5V15" />
    <path d="M8.5 21.5V17.5H15.5V21.5" />
  </svg>
);

const EthnoIconDog = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V13.5L7.5 10H11.5L14.5 13.5V19" />
    <path d="M4 19H6.5" />
    <path d="M14.5 19H17" />
    <path d="M11.5 10L13.5 5.5L16.5 4.5L18.5 7L16.5 9.5H14" />
    <path d="M18.5 7L21 7" />
    <path d="M7.5 13.5C5.5 11.5 4 8.5 5 6" />
  </svg>
);

const EthnoIconTree = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L6.5 8.5H9.5L4.5 14.5H8.5L5 19.5H19L15.5 14.5H19.5L14.5 8.5H17.5L12 2Z" />
    <path d="M12 19.5V22" />
  </svg>
);

interface ColorSwatch {
  name?: string;
  role: string;
  cmyk: string;
  hex: string;
  rgb: string;
}

interface ChapterPalette {
  id: string;
  title: string;
  description: string;
  colors: ColorSwatch[];
}

interface FigmaShapeItem {
  id: number;
  title: string;
  path: string;
}

const FIGMA_SHAPES: FigmaShapeItem[] = [
  {
    id: 1,
    title: 'Трёхлепестковый правый гребень',
    path: 'M 36,12 L 530,12 C 615,12 695,65 695,133 C 695,198 640,240 570,255 C 640,270 695,312 695,376 C 695,440 640,482 570,497 C 640,512 695,554 695,619 C 695,687 615,740 530,740 L 36,740 C 22,740 12,730 12,716 L 12,36 C 12,22 22,12 36,12 Z',
  },
  {
    id: 2,
    title: 'Трёхлепестковый левый гребень',
    path: 'M 177,12 L 671,12 C 685,12 695,22 695,36 L 695,716 C 695,730 685,740 671,740 L 177,740 C 92,740 12,687 12,619 C 12,554 67,512 137,497 C 67,482 12,440 12,376 C 12,312 67,270 137,255 C 67,240 12,198 12,133 C 12,65 92,12 177,12 Z',
  },
  {
    id: 3,
    title: 'Дугообразный правый срез',
    path: 'M 36,12 L 350,12 C 550,12 695,160 695,376 C 695,592 550,740 350,740 L 36,740 C 22,740 12,730 12,716 L 12,36 C 12,22 22,12 36,12 Z',
  },
  {
    id: 4,
    title: 'Дугообразный левый срез',
    path: 'M 357,12 L 671,12 C 685,12 695,22 695,36 L 695,716 C 695,730 685,740 671,740 L 357,740 C 157,740 12,592 12,376 C 12,160 157,12 357,12 Z',
  },
  {
    id: 5,
    title: 'Фигура с внутренней дугой сверху и снизу',
    path: 'M 36,12 L 220,12 C 280,12 320,60 353,100 C 386,60 426,12 486,12 L 671,12 C 685,12 695,22 695,36 L 695,716 C 695,730 685,740 671,740 L 486,740 C 426,740 386,692 353,652 C 320,692 280,740 220,740 L 36,740 C 22,740 12,730 12,716 L 12,36 C 12,22 22,12 36,12 Z',
  },
  {
    id: 6,
    title: 'Фигура с боковыми симметричными выемками',
    path: 'M 36,12 L 671,12 C 685,12 695,22 695,36 L 695,220 C 695,280 647,320 607,353 C 647,386 695,426 695,486 L 695,716 C 695,730 685,740 671,740 L 36,740 C 22,740 12,730 12,716 L 12,486 C 12,426 60,386 100,353 C 60,320 12,280 12,220 L 12,36 C 12,22 22,12 36,12 Z',
  },
];

export const DesignSystem: React.FC = () => {
  const [activeSubSection, setActiveSubSection] = useState<string>('ds-card-templates');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // Запрет скролла страницы при открытом модальном окне
  useEffect(() => {
    if (lightboxImage) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [lightboxImage]);

  const isManualScrollRef = useRef<boolean>(false);

  useEffect(() => {
    const sectionIds = [
      'ds-geometry',
      'ds-icons',
      'ds-shapes',
      'ds-card-templates',
      'ds-visual',
      'ds-patterns',
      'ds-textures',
      'ds-half-titles',
      'ds-mascots',
      'ds-cartography'
    ];

    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const triggerY = 220;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            current = id;
          }
        }
      }
      setActiveSubSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setActiveSubSection(id);
    isManualScrollRef.current = true;
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1000);
  };

  const navItems = [
    { id: 'ds-geometry', label: '1. Сетка страниц' },
    { id: 'ds-icons', label: '2. Иконки' },
    { id: 'ds-shapes', label: '3. Фигуры' },
    { id: 'ds-card-templates', label: '4. Карточки' },
    { id: 'ds-visual', label: '5. Колористика' },
    { id: 'ds-patterns', label: '6. Паттерны' },
    { id: 'ds-textures', label: '7. Текстуры' },
    { id: 'ds-half-titles', label: '8. Шмуцтитулы' },
    { id: 'ds-mascots', label: '9. Маскоты' },
    { id: 'ds-cartography', label: '10. Карта' },
  ];

  const chapterPalettes: ChapterPalette[] = [
    {
      id: 'family',
      title: 'Семья',
      description: 'Тёплая терракотово-коричневая палитра родственного очага и родовых традиций Верхнекетья.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '0, 3, 5, 3', hex: '#F7F0EB', rgb: '247, 240, 235' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '0, 4, 6, 6', hex: '#F0E7E1', rgb: '240, 231, 225' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '0, 7, 11, 10', hex: '#E6D6CD', rgb: '230, 214, 205' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '0, 22, 30, 45', hex: '#8D6E63', rgb: '141, 110, 99' },
      ]
    },
    {
      id: 'clothing',
      title: 'Одежда',
      description: 'Охра, ровдуга и\u00A0естественные тона выделанных оленьих шкур и\u00A0ровдужных парок.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '0, 1, 4, 2', hex: '#F9F6EE', rgb: '249, 246, 238' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '0, 2, 7, 5', hex: '#F2EEE2', rgb: '242, 238, 226' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '0, 3, 10, 8', hex: '#EBE4D3', rgb: '235, 228, 211' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '0, 8, 30, 46', hex: '#8A7F60', rgb: '138, 127, 96' },
      ]
    },
    {
      id: 'dwelling',
      title: 'Жилище',
      description: 'Древесно-коричневая гамма традиционных чумов, полуземлянок карамо и берестяных покрытий.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '0, 1, 2, 4', hex: '#F5F2F0', rgb: '245, 242, 240' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '0, 3, 5, 8', hex: '#EBE4DF', rgb: '235, 228, 223' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '0, 5, 7, 13', hex: '#DDD3CD', rgb: '221, 211, 205' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '0, 31, 41, 64', hex: '#5D4037', rgb: '93, 64, 55' },
      ]
    },
    {
      id: 'geography',
      title: 'География',
      description: 'Сланцево-землистые тона сибирских речных плёсов, яров и суровых ландшафтов Кети.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '0, 1, 2, 4', hex: '#F5F4F2', rgb: '245, 244, 242' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '0, 2, 3, 8', hex: '#EBE8E4', rgb: '235, 232, 228' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '0, 3, 5, 13', hex: '#DDD8D3', rgb: '221, 216, 211' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '0, 9, 17, 64', hex: '#5D554D', rgb: '93, 85, 77' },
      ]
    },
    {
      id: 'flora',
      title: 'Флора',
      description: 'Природный травянисто-оливковый оттенок кедровников, брусничников и мхов.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '2, 0, 2, 4', hex: '#F1F5F1', rgb: '241, 245, 241' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '4, 0, 4, 7', hex: '#E5EEE4', rgb: '229, 238, 228' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '5, 0, 6, 10', hex: '#DAE6D8', rgb: '218, 230, 216' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '21, 0, 56, 58', hex: '#556B2F', rgb: '85, 107, 47' },
      ]
    },
    {
      id: 'fauna',
      title: 'Фауна',
      description: 'Графитово-серые и приглушённые оттенки таёжных зверей, птичьих перьев и речных глубин.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '1, 0, 0, 4', hex: '#F2F3F4', rgb: '242, 243, 244' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '3, 0, 0, 10', hex: '#E0E5E6', rgb: '224, 229, 230' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '4, 0, 0, 16', hex: '#CED6D7', rgb: '206, 214, 215' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '30, 10, 0, 69', hex: '#37474F', rgb: '55, 71, 79' },
      ]
    },
    {
      id: 'tools',
      title: 'Инструменты и материалы',
      description: 'Солнечная охра кованого металла, кедрового древа и берестяной утвари.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '0, 1, 8, 2', hex: '#FBF8E8', rgb: '251, 248, 232' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '0, 2, 11, 5', hex: '#F2EED8', rgb: '242, 238, 216' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '0, 3, 15, 8', hex: '#EAE4C8', rgb: '234, 228, 200' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '0, 12, 60, 45', hex: '#8C7B38', rgb: '140, 123, 56' },
      ]
    },
    {
      id: 'reindeer',
      title: 'Оленеводство',
      description: 'Холодные глубинные хвойно-зелёные тона ягельных тундр и оленьих пастбищ.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '2, 0, 1, 4', hex: '#F0F5F3', rgb: '240, 245, 243' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '4, 0, 1, 8', hex: '#E2EBE8', rgb: '226, 235, 232' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '6, 0, 2, 12', hex: '#D3E0DC', rgb: '211, 224, 220' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '39, 0, 16, 70', hex: '#2E4C40', rgb: '46, 76, 64' },
      ]
    },
    {
      id: 'hunting',
      title: 'Охота',
      description: 'Бордовый и терракотовый тон таёжного промысла, капканов и охотничьих следов.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '0, 4, 4, 2', hex: '#F9F0F0', rgb: '249, 240, 240' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '0, 6, 6, 5', hex: '#F1E3E3', rgb: '241, 227, 227' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '0, 8, 8, 9', hex: '#E8D5D5', rgb: '232, 213, 213' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '0, 49, 53, 43', hex: '#924A45', rgb: '146, 74, 69' },
      ]
    },
    {
      id: 'fishing',
      title: 'Рыболовство',
      description: 'Речной сине-серый оттенок вод реки Кети, лодок-обласков и запоров.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '3, 1, 0, 3', hex: '#F0F4F7', rgb: '240, 244, 247' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '6, 3, 0, 6', hex: '#E1EAF0', rgb: '225, 234, 240' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '10, 3, 0, 9', hex: '#D1E0E8', rgb: '209, 224, 232' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '31, 10, 0, 61', hex: '#455A64', rgb: '69, 90, 100' },
      ]
    },
    {
      id: 'dishes',
      title: 'Традиционные блюда',
      description: 'Ягодные и печные тона вяленой рыбы юколы, таёжных ягод и очага.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '0, 3, 2, 2', hex: '#F9F2F4', rgb: '249, 242, 244' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '0, 4, 3, 6', hex: '#F0E6E9', rgb: '240, 230, 233' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '0, 5, 4, 10', hex: '#E6DADD', rgb: '230, 218, 221' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '0, 38, 30, 51', hex: '#7E4E58', rgb: '126, 78, 88' },
      ]
    },
    {
      id: 'spiritual',
      title: 'Духовная культура',
      description: 'Фиолетово-пепельный тон сакрального мира, шаманских атрибутов и обрядов.',
      colors: [
        { name: 'Светлый тон', role: 'Базовый оттенок', cmyk: '1, 2, 0, 4', hex: '#F3F0F5', rgb: '243, 240, 245' },
        { name: 'Мягкая подложка', role: 'Внутренний тон', cmyk: '2, 5, 0, 7', hex: '#EAE3EE', rgb: '234, 227, 238' },
        { name: 'Тон рамки', role: 'Контур элементов', cmyk: '3, 6, 0, 11', hex: '#DDD6E3', rgb: '221, 214, 227' },
        { name: 'Глубокий акцент', role: 'Насыщенный тон', cmyk: '16, 29, 0, 62', hex: '#514561', rgb: '81, 69, 97' },
      ]
    }
  ];

  const systemPalettes = [
    {
      id: 'sys-languages',
      title: 'Языковые слои',
      description: 'Цветовая дифференциация эвенкийского, селькупского и кетского языковых слоёв издания.',
      colors: [
        { name: 'Эвенкийский язык', role: 'Первый языковой слой', cmyk: '100, 31, 36, 12', hex: '#007a8a' },
        { name: 'Селькупский язык', role: 'Второй языковой слой', cmyk: '72, 33, 100, 22', hex: '#4a7a28' },
        { name: 'Кетский язык', role: 'Третий языковой слой', cmyk: '0, 49, 72, 37', hex: '#a0522d' },
      ]
    },
    {
      id: 'sys-cartography',
      title: 'Картографические константы',
      description: 'Основные цвета гидрографии и исторических локаций на\u00A0карте издания.',
      colors: [
        { name: 'Речные русла', role: 'Бассейн реки Кети', cmyk: '71, 40, 13, 0', hex: '#4682b4' },
        { name: 'Стойбища и юрты', role: 'Исторические локации', cmyk: '34, 100, 52, 18', hex: '#9c1b52' },
      ]
    },
    {
      id: 'sys-surfaces',
      title: 'Поверхности полосы',
      description: 'Базовые контрастные тона плашек и текстовых блоков.',
      colors: [
        { name: 'Тёмная плашка', role: 'Основной контрастный текст', cmyk: '0, 0, 0, 89', hex: '#1c1c1c' },
        { name: 'Светлая плашка', role: 'Фон книжной полосы', cmyk: '0, 1, 3, 2', hex: '#f9f7f2' },
      ]
    },
    {
      id: 'sys-neutrals',
      title: 'Нейтральные тона издания',
      description: 'Фоновые оттенки бумаги и подложек для обеспечения читаемости.',
      colors: [
        { name: 'Фоновая подложка', role: 'Карточки и плашки', cmyk: '0, 0, 1, 2', hex: '#faf8f5' },
        { name: 'Белый контраст', role: 'Маски и подложки', cmyk: '0, 0, 0, 0', hex: '#ffffff' },
        { name: 'Печной графит', role: 'Второстепенный текст', cmyk: '0, 9, 17, 64', hex: '#5d554d' },
      ]
    }
  ];


  return (
    <section 
      id="design-system" 
      className="border-t border-[#1C1C1C]/15 relative bg-[#F9F7F2]"
      style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
    >
      <div id="system" className="absolute top-0 left-0 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-8 items-start">

          {/* Левая функциональная колонка: навигация (колонки 1-3) с компактной 2-колоночной сеткой при малой высоте */}
          <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 sticky-sidebar-container pr-1">
            <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
              Правила визуального оформления
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
              Дизайн-система
            </h2>

            <div className="mt-4 space-y-3 text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
              <strong className="font-medium text-[#1C1C1C]">Задача:</strong> собрать правила вёрстки, шрифты и&nbsp;цвета воедино, чтобы все 150&nbsp;страниц читались легко, а&nbsp;внимание ребёнка не&nbsp;рассеивалось.
            </div>

            <nav className="mt-8 pt-6 border-t border-[#1C1C1C]/15 hidden lg:block text-xs font-sans">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div className="space-y-1">
                  {navItems.slice(0, 5).map((item) => {
                    const isActive = activeSubSection === item.id;
                    return (
                      <a 
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        data-tooltip={`Раздел: ${item.label}`}
                        data-tooltip-sub="Перейти к просмотру стандартов визуального языка"
                        data-tooltip-category="Дизайн-система"
                        data-tooltip-icon="navigation"
                        className={`block transition-all duration-200 py-1.5 pl-2.5 border-l-2 select-none truncate ${
                          isActive 
                            ? 'text-[#1C1C1C] font-semibold border-[#1C1C1C]' 
                            : 'text-[#1C1C1C]/50 hover:text-[#1C1C1C] border-transparent hover:border-[#1C1C1C]/30'
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
                <div className="space-y-1">
                  {navItems.slice(5, 10).map((item) => {
                    const isActive = activeSubSection === item.id;
                    return (
                      <a 
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        data-tooltip={`Раздел: ${item.label}`}
                        data-tooltip-sub="Перейти к просмотру стандартов визуального языка"
                        data-tooltip-category="Дизайн-система"
                        data-tooltip-icon="navigation"
                        className={`block transition-all duration-200 py-1.5 pl-2.5 border-l-2 select-none truncate ${
                          isActive 
                            ? 'text-[#1C1C1C] font-semibold border-[#1C1C1C]' 
                            : 'text-[#1C1C1C]/50 hover:text-[#1C1C1C] border-transparent hover:border-[#1C1C1C]/30'
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>

          {/* Мобильная поднавигация с мягким размытием правого края */}
          <nav aria-label="Разделы дизайн-системы" className="lg:hidden col-span-12 -mx-6 px-6 sm:-mx-12 sm:px-12 mt-2 mb-6 overflow-x-auto no-scrollbar flex items-center gap-2 pb-2 border-b border-[#1C1C1C]/10 [mask-image:linear-gradient(to_right,black_calc(100%-48px),transparent)]">
            {navItems.map((item) => {
              const isActive = activeSubSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-pressed={isActive}
                  className={`text-xs px-3 py-1.5 rounded-full shrink-0 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C] ${
                    isActive 
                      ? 'bg-[#1C1C1C] text-white font-medium' 
                      : 'bg-white/80 text-[#1C1C1C]/70 border border-[#1C1C1C]/10 hover:border-[#1C1C1C]/30'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="w-6 shrink-0" aria-hidden="true" />
          </nav>

          {/* Правая функциональная зона: контент (колонки 5-12) */}
          <div className="col-span-12 lg:col-start-5 lg:col-end-13 space-y-16 lg:space-y-20 font-sans">

            {/* 1. Сетка формата A4 */}
            <div id="ds-geometry" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>1</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Сетка страниц</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Сетка страниц
                </h3>
                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-3xl">
                  Поля книжной полосы рассчитаны на&nbsp;свободное чтение словарных карточек и&nbsp;удобный кольцевой переплёт.
                </p>
              </div>

              {/* Схема разворота */}
              <div 
                onClick={() => setLightboxImage({ src: '/spread_schema.webp', title: '«Схема разворота книги»' })}
                className="bg-white border border-[#1C1C1C]/15 rounded-xl p-6 space-y-4 shadow-2xs group cursor-pointer hover:border-[#1C1C1C]/40 transition-all"
              >
                  <div className="text-base sm:text-lg text-[#1C1C1C]" style={{ 
                    fontFamily: 'Kurale, serif',
                    fontSize: '19px',
                    lineHeight: '1.2',
                    fontWeight: 400,
                    fontSynthesis: 'none',
                    WebkitFontSmoothing: 'grayscale',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeSpeed',
                    fontVariantNumeric: 'lining-nums',
                    fontFeatureSettings: '"kern" 1, "liga" 0'
                  }}>
                    Схема разворота
                  </div>

                <div 
                  className="w-full rounded-lg overflow-hidden border border-[#1C1C1C]/15 shadow-sm bg-white m3-image-interactive cursor-pointer group"
                  onClick={() => setLightboxImage({ src: '/spread_schema.webp', title: '«Схема разворота книги»' })}
                >
                  <img 
                    src="/spread_schema.webp" 
                    alt="Схема разворота книги" 
                    className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch" role="region" aria-label="Параметры сетки страниц">
                <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 shadow-2xs flex flex-col justify-between h-full group hover:border-[#1C1C1C]/40 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1C1C1C]/65">
                      <Book className="w-3.5 h-3.5 text-[#1C1C1C]/70 icon-book-format transition-transform duration-300 shrink-0" aria-hidden="true" />
                      <span>Ориентация полосы</span>
                    </div>
                    <div className="text-[#1C1C1C]" style={{ 
                      fontFamily: 'Kurale, serif',
                      fontSize: '19px',
                      lineHeight: '1.2',
                      fontWeight: 400,
                      fontSynthesis: 'none',
                      WebkitFontSmoothing: 'grayscale',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeSpeed',
                      fontVariantNumeric: 'lining-nums',
                      fontFeatureSettings: '"kern" 1, "liga" 0'
                    }}>
                      Книжный формат
                    </div>
                    <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                      Вертикальный формат удобен для&nbsp;чтения сверху вниз и&nbsp;переплёта по&nbsp;длинному краю.
                    </p>
                  </div>
                </article>

                <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 shadow-2xs flex flex-col justify-between h-full group hover:border-[#1C1C1C]/40 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1C1C1C]/65">
                      <Grid className="w-3.5 h-3.5 text-[#1C1C1C]/70 animate-rings-pulse transition-transform duration-300 shrink-0" aria-hidden="true" />
                      <span>Разметка полосы</span>
                    </div>
                    <div className="text-[#1C1C1C]" style={{ 
                      fontFamily: 'Kurale, serif',
                      fontSize: '19px',
                      lineHeight: '1.2',
                      fontWeight: 400,
                      fontSynthesis: 'none',
                      WebkitFontSmoothing: 'grayscale',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeSpeed',
                      fontVariantNumeric: 'lining-nums',
                      fontFeatureSettings: '"kern" 1, "liga" 0'
                    }}>
                      Отступы под кольца
                    </div>
                    <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                      Поле у&nbsp;корешка заложено под&nbsp;люверсы, защищая контент от&nbsp;переплёта.
                    </p>
                  </div>
                </article>

                <article className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 shadow-2xs flex flex-col justify-between h-full group hover:border-[#1C1C1C]/40 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#1C1C1C]/65">
                      <Columns className="w-3.5 h-3.5 text-[#1C1C1C]/70 animate-balance-shift transition-transform duration-300 shrink-0" aria-hidden="true" />
                      <span>Ритм на&nbsp;развороте</span>
                    </div>
                    <div className="text-[#1C1C1C]" style={{ 
                      fontFamily: 'Kurale, serif',
                      fontSize: '19px',
                      lineHeight: '1.2',
                      fontWeight: 400,
                      fontSynthesis: 'none',
                      WebkitFontSmoothing: 'grayscale',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeSpeed',
                      fontVariantNumeric: 'lining-nums',
                      fontFeatureSettings: '"kern" 1, "liga" 0'
                    }}>
                      Баланс иллюстраций
                    </div>
                    <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                      Картинка в&nbsp;карточках чередуется слева и&nbsp;справа для&nbsp;динамики полосы.
                    </p>
                  </div>
                </article>
              </div>
            </div>

            {/* 2. Иконки */}
            <div id="ds-icons" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>2</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Иконки</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Визуальные якоря разделов
                </h3>
                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-3xl">
                  Внутри разделов словарные статьи объединяются в&nbsp;смысловые группы. Заголовок группы сопровождается этно-пиктограммой, которая создаёт единый визуальный стиль для&nbsp;всего раздела.
                </p>
              </div>

              {/* Наглядный скриншот фрагмента страницы с заголовком и пиктограммой */}
              <div className="w-full rounded-xl overflow-hidden border border-[#1C1C1C]/15 bg-[#FAF8F5]">
                <img 
                  src="/group_header_example.jpg" 
                  alt="Образец оформления заголовка смысловой группы" 
                  className="w-full h-auto block object-cover object-top origin-top scale-[1.05] transition-all"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = 'true';
                      target.src = '/roup_header_example.jpg';
                    }
                  }}
                />
              </div>

              {/* Блок 2: Все 14 тематических пиктограмм */}
              <div className="space-y-4">
                <h4 className="text-lg sm:text-xl font-editorial font-normal text-[#1C1C1C]">
                  Тематические пиктограммы разделов
                </h4>

                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {[
                    { file: 'Амулет.png', label: 'Амулет' },
                    { file: 'Игла с нитью.png', label: 'Игла с\u00a0нитью' },
                    { file: 'Карта.png', label: 'Карта' },
                    { file: 'Костёр.png', label: 'Костёр' },
                    { file: 'Листок.png', label: 'Листок' },
                    { file: 'Лук.png', label: 'Лук' },
                    { file: 'Люлька.png', label: 'Люлька' },
                    { file: 'Нож.png', label: 'Нож' },
                    { file: 'Рога.png', label: 'Рога' },
                    { file: 'Рыбы.png', label: 'Рыбы' },
                    { file: 'Следы медведя.png', label: 'Следы медведя' },
                    { file: 'Тарелка.png', label: 'Тарелка' },
                    { file: 'Чай.png', label: 'Чай' },
                    { file: 'Ягоды.png', label: 'Ягоды' },
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white border border-[#1C1C1C]/15 rounded-lg p-2 flex flex-col items-center justify-center text-center gap-1.5 hover:border-[#1C1C1C]/35 transition-all group shadow-2xs cursor-pointer"
                    >
                      <img 
                        src={`/icons/${encodeURIComponent(item.file)}`} 
                        alt={item.label}
                        className="w-8 h-8 object-contain text-[#1C1C1C] animate-nature-hover transition-transform duration-300"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.fallback) {
                            target.dataset.fallback = 'true';
                            target.src = `/icons/${encodeURIComponent(item.file.replace('.png', '.svg'))}`;
                          }
                        }}
                      />
                      <div className="text-[11px] font-sans font-medium text-[#1C1C1C] leading-tight">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            <div id="ds-shapes" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>3</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Фигуры</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Графические маски для иллюстраций
                </h3>
                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-2xl">
                  Формы рамок вдохновлены силуэтами традиционных чумов, берестяных туесов и&nbsp;таёжных узоров, обрамляя рисунки и&nbsp;придавая страницам колорит.
                </p>
              </div>

              {/* 6 фигур: 3 в 2 ряда на мобильных, 6 в 1 ряд на десктопе */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-4 items-start pt-1">
                {FIGMA_SHAPES.map((shape) => (
                  <div 
                    key={shape.id} 
                    className="flex flex-col items-center gap-3 group cursor-pointer"
                  >
                    <div 
                      className="w-full aspect-[707/752] flex items-center justify-center p-2 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 bg-white border border-[#1C1C1C]/15 shadow-2xs group-hover:border-[#1C1C1C]/40 group-hover:bg-[#FAF8F5]"
                    >
                      <svg 
                        viewBox="0 0 707 752" 
                        className="w-full h-full block select-none transition-transform duration-300"
                      >
                        <path
                          d={shape.path}
                          fill="#FFFFFF"
                          stroke="#1C1C1C"
                          strokeWidth="10"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Шаблоны для словарных карточек */}
            <div id="ds-card-templates" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>4</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Карточки</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Чередование тонов
                </h3>
                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-2xl">
                  Чередование светлых и&nbsp;тёмных карточек плавно направляет взгляд<br />ребёнка от&nbsp;страницы к&nbsp;странице и&nbsp;помогает удерживать внимание.
                </p>
              </div>

              {/* Карточки шаблонов: 4 ряда по 1 на мобильных, 4 в ряд на экранах шире */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 items-stretch overflow-visible">

                {/* Шаблон 1: Тёмная карточка */}
                <div className="w-full flex items-center justify-center">
                  <img 
                    src="/card_template_dark.svg" 
                    alt="Шаблон тёмной словарной карточки" 
                    className="w-full h-auto block object-contain"
                  />
                </div>

                {/* Шаблон 2: Светлая карточка */}
                <div className="w-full flex items-center justify-center">
                  <img 
                    src="/card_template_light.svg" 
                    alt="Шаблон светлой словарной карточки" 
                    className="w-full h-auto block object-contain"
                  />
                </div>

                {/* Шаблон 3: Тёмная карточка орнаментов */}
                <div className="w-full h-auto overflow-visible flex items-center justify-center">
                  <img 
                    src="/ornament_template_dark.svg" 
                    alt="Шаблон тёмной карточки орнаментов" 
                    className="w-full h-auto block object-contain overflow-visible"
                  />
                </div>

                {/* Шаблон 4: Светлая карточка орнаментов */}
                <div className="w-full h-auto overflow-visible flex items-center justify-center">
                  <img 
                    src="/ornament_template_light.svg" 
                    alt="Шаблон светлой карточки орнаментов" 
                    className="w-full h-auto block object-contain overflow-visible"
                  />
                </div>

              </div>

              {/* Шаблон страницы для рецептов блюд: текст справа посередине от страницы */}
              <div className="space-y-5 pt-6 border-t border-[#1C1C1C]/10">
                <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start sm:items-center">
                  <div className="w-full sm:col-span-5 lg:col-span-4 flex justify-center sm:justify-start items-center">
                    <div className="w-full max-w-[280px] sm:max-w-none rounded-2xl overflow-hidden border border-[#1C1C1C]/15 bg-white shadow-2xs">
                      <img 
                        src="/recipe_page_template.svg" 
                        alt="Шаблон страницы для рецептов блюд" 
                        className="w-full h-auto object-contain block bg-white"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:col-span-7 lg:col-span-8 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                      Страницы таёжных рецептов
                    </h3>
                    <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans text-pretty">
                      Каждая страница посвящена одному традиционному блюду с&nbsp;наглядным перечнем таёжных ингредиентов и&nbsp;рецептом.
                    </p>
                  </div>
                </div>
              </div>

            </div>


            {/* 5. Колористика */}
            <div id="ds-visual" className="space-y-8">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>5</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Колористика</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              {/* Заглавный блок секции */}
              <div className="space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Природная гамма двенадцати глав
                </h3>
                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-3xl">
                  Каждый тематический раздел обладает собственным характерным тоном (глина очага, речная синева, хвоя или&nbsp;снег), что&nbsp;облегчает визуальную навигацию при&nbsp;перелистывании страниц.
                </p>
              </div>

              {/* Подсекция 1: Системная палитра */}
              <div className="pt-6 border-t border-[#1C1C1C]/15 space-y-6">
                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                    Системная палитра
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1C1C1C]/70 font-sans leading-relaxed">
                    Цветовые константы навигации, типографических слоёв и картографической информации издания.
                  </p>
                </div>

                <div className="space-y-6 sm:space-y-7">
                  {/* Card 1: Языковые слои (полная ширина) */}
                  {(() => {
                    const sys = systemPalettes.find(s => s.id === 'sys-languages');
                    if (!sys) return null;
                    return (
                      <div 
                        key={sys.id} 
                        className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 sm:p-6 space-y-4 transition-all duration-300 shadow-2xs group m3-card-interactive"
                      >
                        <div className="space-y-2">
                          <div className="flex flex-nowrap items-center justify-between gap-3">
                            <div className="text-[#1C1C1C]" style={{ 
                              fontFamily: 'Kurale, serif',
                              fontSize: '19px',
                              lineHeight: '1.2',
                              fontWeight: 400,
                              fontSynthesis: 'none',
                              WebkitFontSmoothing: 'grayscale',
                              MozOsxFontSmoothing: 'grayscale',
                              textRendering: 'optimizeSpeed',
                              fontVariantNumeric: 'lining-nums',
                              fontFeatureSettings: '"kern" 1, "liga" 0'
                            }}>
                              {sys.title}
                            </div>

                            <div 
                              className="flex h-3.5 w-12 sm:w-16 rounded overflow-hidden border border-[#1C1C1C]/20 shrink-0 shadow-2xs relative"
                            >
                              {sys.colors.map((c, i) => (
                                <div 
                                  key={i} 
                                  className="flex-1 h-full" 
                                  style={{ backgroundColor: c.hex }} 
                                />
                              ))}
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed">
                            {sys.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#1C1C1C]/10">
                          <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                            {sys.colors.map((c, i) => (
                              <div 
                                key={i} 
                                className="p-2 sm:p-3 rounded-lg shadow-2xs space-y-1.5 sm:space-y-2 select-none bg-[#FAF8F5] border border-[#1C1C1C]/12"
                              >
                                <div className="w-full h-6 sm:h-8 rounded border border-[#1C1C1C]/10" style={{ backgroundColor: c.hex }} />

                                <div className="font-sans space-y-0.5 min-w-0">
                                  {c.name && (
                                    <div className="text-[11px] sm:text-xs font-medium text-[#1C1C1C] leading-tight truncate">
                                      {c.name}
                                    </div>
                                  )}
                                  {c.role && (
                                    <div className="text-[10px] sm:text-[11px] text-[#1C1C1C]/65 leading-tight truncate">
                                      {c.role}
                                    </div>
                                  )}
                                  <div className="text-[10px] sm:text-xs text-[#1C1C1C]/80 leading-tight pt-0.5 sm:pt-1 flex items-center justify-between">
                                    <span className="text-[9px] sm:text-[11px] hidden xs:inline">cmyk {c.cmyk}</span>
                                    <span className="text-[10px] sm:text-[11px] text-[#1C1C1C]/60">{c.hex.toLowerCase()}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Cards 2 & 3: Картографические константы (слева) и Поверхности полосы (справа) в одной строке */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {['sys-cartography', 'sys-surfaces'].map((sysId) => {
                      const sys = systemPalettes.find(s => s.id === sysId);
                      if (!sys) return null;
                      return (
                        <div 
                          key={sys.id} 
                          className="bg-white border border-[#1C1C1C]/15 rounded-xl p-4 sm:p-5 space-y-3.5 transition-all duration-300 shadow-2xs group m3-card-interactive"
                        >
                          <div className="space-y-1.5">
                            <div className="flex flex-nowrap items-center justify-between gap-2">
                              <div className="text-[#1C1C1C]" style={{ 
                                fontFamily: 'Kurale, serif',
                                fontSize: '19px',
                                lineHeight: '1.2',
                                fontWeight: 400,
                                fontSynthesis: 'none',
                                WebkitFontSmoothing: 'grayscale',
                                MozOsxFontSmoothing: 'grayscale',
                                textRendering: 'optimizeSpeed',
                                fontVariantNumeric: 'lining-nums',
                                fontFeatureSettings: '"kern" 1, "liga" 0'
                              }}>
                                {sys.title}
                              </div>

                              <div 
                                className="flex h-3.5 w-10 sm:w-12 rounded overflow-hidden border border-[#1C1C1C]/20 shrink-0 shadow-2xs relative"
                              >
                                {sys.colors.map((c, i) => (
                                  <div 
                                    key={i} 
                                    className="flex-1 h-full" 
                                    style={{ backgroundColor: c.hex }} 
                                  />
                                ))}
                              </div>
                            </div>

                            <p className="text-xs text-[#1C1C1C]/75 font-sans leading-relaxed">
                              {sys.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#1C1C1C]/10">
                            <div className="grid grid-cols-2 gap-2.5">
                              {sys.colors.map((c, i) => (
                                <div 
                                  key={i} 
                                  className="p-2.5 rounded-lg shadow-2xs space-y-1.5 select-none bg-[#FAF8F5] border border-[#1C1C1C]/12"
                                >
                                  <div className="w-full h-7 rounded border border-[#1C1C1C]/10" style={{ backgroundColor: c.hex }} />

                                  <div className="font-sans space-y-0.5 min-w-0">
                                    {c.name && (
                                      <div className="text-xs font-medium text-[#1C1C1C] leading-tight truncate">
                                        {c.name}
                                      </div>
                                    )}
                                    <div className="text-[11px] text-[#1C1C1C]/65 leading-tight truncate">
                                      cmyk {c.cmyk}
                                    </div>
                                    <div className="text-xs text-[#1C1C1C]/70 leading-tight flex items-center justify-between pt-0.5">
                                      <span className="text-[11px] text-[#1C1C1C]/60">{c.hex.toLowerCase()}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Card 4: Нейтральные тона издания (полная ширина) */}
                  {(() => {
                    const sys = systemPalettes.find(s => s.id === 'sys-neutrals');
                    if (!sys) return null;
                    return (
                      <div 
                        key={sys.id} 
                        className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 sm:p-6 space-y-4 transition-all duration-300 shadow-2xs group m3-card-interactive"
                      >
                        <div className="space-y-2">
                          <div className="flex flex-nowrap items-center justify-between gap-3">
                            <div className="text-[#1C1C1C]" style={{ 
                              fontFamily: 'Kurale, serif',
                              fontSize: '19px',
                              lineHeight: '1.2',
                              fontWeight: 400,
                              fontSynthesis: 'none',
                              WebkitFontSmoothing: 'grayscale',
                              MozOsxFontSmoothing: 'grayscale',
                              textRendering: 'optimizeSpeed',
                              fontVariantNumeric: 'lining-nums',
                              fontFeatureSettings: '"kern" 1, "liga" 0'
                            }}>
                              {sys.title}
                            </div>

                            <div 
                              className="flex h-3.5 w-12 sm:w-16 rounded overflow-hidden border border-[#1C1C1C]/20 shrink-0 shadow-2xs relative"
                            >
                              {sys.colors.map((c, i) => (
                                <div 
                                  key={i} 
                                  className="flex-1 h-full" 
                                  style={{ backgroundColor: c.hex }} 
                                />
                              ))}
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed">
                            {sys.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#1C1C1C]/10">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {sys.colors.map((c, i) => (
                              <div 
                                key={i} 
                                className="p-3 rounded-lg shadow-2xs space-y-2 select-none bg-[#FAF8F5] border border-[#1C1C1C]/12"
                              >
                                <div className="w-full h-8 rounded border border-[#1C1C1C]/10" style={{ backgroundColor: c.hex }} />

                                <div className="font-sans space-y-0.5 min-w-0">
                                  {c.name && (
                                    <div className="text-xs font-medium text-[#1C1C1C] leading-tight truncate">
                                      {c.name}
                                    </div>
                                  )}
                                  <div className="text-[11px] text-[#1C1C1C]/65 leading-tight truncate">
                                    cmyk {c.cmyk}
                                  </div>
                                  <div className="text-xs text-[#1C1C1C]/70 leading-tight flex items-center justify-between pt-0.5">
                                    <span className="text-[11px] text-[#1C1C1C]/60">{c.hex.toLowerCase()}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Подсекция 2: Палитры разделов книги с выразительным дивайдером */}
              <div className="pt-8 sm:pt-10 border-t border-[#1C1C1C]/15 space-y-6">
                <div className="space-y-1">
                  <div className="text-lg sm:text-xl text-[#1C1C1C]" style={{ 
                    fontFamily: 'Kurale, serif',
                    fontSize: '21px',
                    lineHeight: '1.2',
                    fontWeight: 400,
                    fontSynthesis: 'none',
                    WebkitFontSmoothing: 'grayscale',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeSpeed'
                  }}>
                    Палитры разделов книги
                  </div>
                  <p className="text-xs sm:text-sm text-[#1C1C1C]/70 font-sans leading-relaxed">
                    12 природных колористических схем, формирующих атмосферу<br />и&nbsp;мгновенную визуальную идентификацию каждой темы.
                  </p>
                </div>

                {/* Сетка всех 12 разделов с увеличенным внешним отступом между карточками */}
                <div className="grid grid-cols-1 gap-6 sm:gap-7">
                  {chapterPalettes.map((ch) => (
                    <div 
                      key={ch.id} 
                      className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 sm:p-6 space-y-4 transition-all duration-300 shadow-2xs group m3-card-interactive"
                    >
                      {/* Шапка карточки раздела */}
                      <div className="space-y-2">
                        <div className="flex flex-nowrap items-center justify-between gap-3">
                          <div className="text-[#1C1C1C]" style={{ 
                            fontFamily: 'Kurale, serif',
                            fontSize: '19px',
                            lineHeight: '1.2',
                            fontWeight: 400,
                            fontSynthesis: 'none',
                            WebkitFontSmoothing: 'grayscale',
                            MozOsxFontSmoothing: 'grayscale',
                            textRendering: 'optimizeSpeed',
                            fontVariantNumeric: 'lining-nums',
                            fontFeatureSettings: '"kern" 1, "liga" 0'
                          }}>
                            {ch.title}
                          </div>

                          <div 
                            className="flex h-3.5 w-12 sm:w-16 rounded overflow-hidden border border-[#1C1C1C]/20 shrink-0 shadow-2xs relative"
                          >
                            {ch.colors.map((c, i) => (
                              <div 
                                key={i} 
                                className="flex-1 h-full" 
                                style={{ backgroundColor: c.hex }} 
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-[#1C1C1C]/75 font-sans leading-relaxed">
                          {ch.description}
                        </p>
                      </div>

                      {/* Внутренний дивайдер перед цветовыми плашками */}
                      <div className="pt-4 border-t border-[#1C1C1C]/10">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {ch.colors.map((c, i) => (
                            <div 
                              key={i} 
                              className="p-3 rounded-lg shadow-2xs space-y-2 select-none bg-[#FAF8F5] border border-[#1C1C1C]/12"
                            >
                              <div className="w-full h-8 rounded border border-[#1C1C1C]/10" style={{ backgroundColor: c.hex }} />

                              <div className="font-sans space-y-0.5 min-w-0">
                                {c.name && (
                                  <div className="text-xs font-medium text-[#1C1C1C] leading-tight truncate">
                                    {c.name}
                                  </div>
                                )}
                                <div className="text-[11px] text-[#1C1C1C]/65 leading-tight truncate">
                                  cmyk {c.cmyk}
                                </div>
                                <div className="text-xs text-[#1C1C1C]/70 leading-tight flex items-center justify-between pt-0.5">
                                  <span className="text-[11px] text-[#1C1C1C]/60">{c.hex.toLowerCase()}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 6. Паттерны */}
            <div id="ds-patterns" className="space-y-6 pb-2 overflow-visible">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>6</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Паттерны</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Орнаментальная графика 12 глав
                </h3>
                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-none text-pretty">
                  Традиционные мотивы и&nbsp;векторные узоры используются для&nbsp;фонов страниц каждого из&nbsp;разделов.
                </p>
              </div>

              {/* 12 карточек паттернов напрямую в сетке без двойного контейнера */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
                {[
                  { file: 'pattern_4.png', name: 'Семья' },
                  { file: 'pattern_5.png', name: 'Одежда' },
                  { file: 'pattern_7.png', name: 'Жилище' },
                  { file: 'pattern_1.png', name: 'География' },
                  { file: 'pattern_10.png', name: 'Флора' },
                  { file: 'pattern_9.png', name: 'Фауна' },
                  { file: 'pattern_3.png', name: 'Инструменты' },
                  { file: 'pattern_2.png', name: 'Оленеводство' },
                  { file: 'pattern_8.png', name: 'Охота' },
                  { file: 'pattern_12.png', name: 'Рыболовство' },
                  { file: 'pattern_11.png', name: 'Блюда' },
                  { file: 'pattern_6.png', name: 'Духовная культура' },
                ].map((item, idx) => {
                  return (
                    <div 
                      key={idx}
                      className="bg-white border border-[#1C1C1C]/15 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between shadow-2xs group hover:border-[#1C1C1C]/35 transition-all text-[#1C1C1C] cursor-pointer  space-y-2.5"
                    >
                      {/* Внутренний контейнер орнамента без серых отступов и сплошной заливкой */}
                      <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-white flex items-center justify-center">
                        <img 
                          src={`/${item.file}`} 
                          alt={item.name}
                          className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300"
                          loading="eager"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.pattern-placeholder')) {
                              const placeholder = document.createElement('div');
                              placeholder.className = 'pattern-placeholder flex items-center justify-center p-2 w-full h-full bg-[#FAF8F5]';
                              placeholder.innerHTML = `
                                <svg class="w-8 h-8 text-[#1C1C1C]/30 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                                  <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 3" />
                                  <path d="M8 12h8M12 8v8" />
                                </svg>
                              `;
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                      </div>
                      <div className="w-full text-center">
                        <div className="text-xs sm:text-sm font-sans font-medium text-[#1C1C1C] leading-snug">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 7. Текстуры */}
            <div id="ds-textures" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>7</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Текстуры</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Фоновые текстуры словарных карточек
                </h3>
                  <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-2xl">Текстурные подмалёвки служат фоновым оформлением для словарных карточек всех 12 тематических разделов.</p>
              </div>

              {/* 12 горизонтальных карточек текстур: 2 колонки на мобильных, 3 колонки на планшетах и десктопе */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-5">
                {[
                  { file: 'textures/texture_1.jpg', altFile: 'p_1.webp', name: 'Семья', bg: '#DDD7D2' },
                  { file: 'textures/texture_2.jpg', altFile: 'p_2.webp', name: 'Одежда', bg: '#D4E2DE' },
                  { file: 'textures/texture_3.jpg', altFile: 'p_3.webp', name: 'Жилище', bg: '#EBE7CC' },
                  { file: 'textures/texture_4.jpg', altFile: 'p_4.webp', name: 'География', bg: '#E9DAD2' },
                  { file: 'textures/texture_5.jpg', altFile: 'p_5.webp', name: 'Флора', bg: '#EDE7D6' },
                  { file: 'textures/texture_6.jpg', altFile: 'p_6.webp', name: 'Фауна', bg: '#E1DAE7' },
                  { file: 'textures/texture_7.jpg', altFile: 'p_7.webp', name: 'Инструменты', bg: '#DFD5D0' },
                  { file: 'textures/texture_8.jpg', altFile: 'p_8.webp', name: 'Оленеводство', bg: '#EAD9D8' },
                  { file: 'textures/texture_9.jpg', altFile: 'p_9.webp', name: 'Охота', bg: '#D5DCDD' },
                  { file: 'textures/texture_10.jpg', altFile: 'p_10.webp', name: 'Рыболовство', bg: '#DCE8DB' },
                  { file: 'textures/texture_11.jpg', altFile: 'p_11.webp', name: 'Блюда', bg: '#E9DDE1' },
                  { file: 'textures/texture_12.jpg', altFile: 'p_12.webp', name: 'Духовная культура', bg: '#D5E2EA' },
                ].map((item, idx) => {
                  return (
                    <div 
                      key={idx}
                      className="bg-white border border-[#1C1C1C]/15 rounded-xl p-2.5 sm:p-3.5 flex flex-col justify-between shadow-2xs group m3-card-interactive text-[#1C1C1C] cursor-pointer space-y-2 sm:space-y-3"
                    >
                      {/* Горизонтальный контейнер текстуры (альбомный формат 297/210) */}
                      <div 
                        className="w-full aspect-[297/210] relative rounded-lg overflow-hidden border border-[#1C1C1C]/10 flex items-center justify-center"
                        style={{ backgroundColor: item.bg }}
                      >
                        <img 
                          src={`/${item.file}`} 
                          alt={item.name}
                          className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (item.altFile && !target.dataset.altTried) {
                              target.dataset.altTried = 'true';
                              target.src = `/${item.altFile}`;
                              return;
                            }
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.texture-placeholder')) {
                              const placeholder = document.createElement('div');
                              placeholder.className = 'texture-placeholder flex flex-col items-center justify-center p-3 w-full h-full text-center bg-[#FAF8F5]';
                              placeholder.innerHTML = `
                                <div class="w-10 h-12 border border-dashed border-[#1C1C1C]/20 rounded flex items-center justify-center mb-1.5 bg-white/60">
                                  <span class="text-[10px] font-sans font-medium text-[#1C1C1C]/50">png</span>
                                </div>
                                <span class="text-[11px] font-sans font-medium text-[#1C1C1C]/60">Ожидает загрузки</span>
                              `;
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                      </div>
                      <div className="w-full text-center">
                        <div className="text-[11px] sm:text-sm font-sans font-medium text-[#1C1C1C] leading-snug">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 8. Иллюстрированные шмуцтитулы */}
            <div id="ds-half-titles" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>8</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Шмуцтитулы</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Заглавные развороты глав
                </h3>
                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-none">
                  Каждый из 12 тематических разделов открывается авторским шмуцтитулом: крупное название<br />
                  главы окружено этнографической графикой, плавно обтекающей текстовый блок.
                </p>
              </div>

              {/* 12 карточек шмуцтитулов в 3 колонки */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {[
                  { file: '/sections/family.svg', name: 'Семья' },
                  { file: '/sections/clothing.svg', name: 'Одежда' },
                  { file: '/sections/dwelling.svg', name: 'Жилище' },
                  { file: '/sections/geography.svg', name: 'География' },
                  { file: '/sections/flora.svg', name: 'Флора' },
                  { file: '/sections/fauna.svg', name: 'Фауна' },
                  { file: '/sections/tools.svg', name: 'Инструменты и материалы' },
                  { file: '/sections/reindeer.svg', name: 'Оленеводство' },
                  { file: '/sections/hunting.svg', name: 'Охота' },
                  { file: '/sections/fishing.svg', name: 'Рыболовство' },
                  { file: '/sections/dishes.svg', name: 'Традиционные блюда' },
                  { file: '/sections/spiritual.svg', name: 'Духовная культура' },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setLightboxImage({ src: item.file, title: `Шмуцтитул «${item.name}»` })}
                    className="bg-white border border-[#1C1C1C]/15 rounded-xl overflow-hidden shadow-2xs group m3-card-interactive cursor-pointer"
                  >
                    {/* Внутренний контейнер шмуцтитула: заполняет всю карточку */}
                    <div className="w-full aspect-[210/297] relative bg-[#FAF8F3] flex items-center justify-center">
                      <img 
                        src={item.file} 
                        alt={`Шмуцтитул «${item.name}»`}
                        className="w-full h-full object-contain block group-hover:scale-[1.05] transition-transform duration-500"
                        loading="eager"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. Фирменные персонажи */}
            <div id="ds-mascots" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>9</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Маскоты</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                  Герои-путеводители издания
                </h3>
                <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans max-w-3xl">
                  Три персонажа-проводника сопровождают юного читателя по&nbsp;страницам издания,<br />помогая осваивать словарные статьи, природу и&nbsp;традиции сибирской тайги.
                </p>
              </div>

                {/* Сетка анимированных карточек маскотов без чипов, приветствий и реплик */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6" role="region" aria-label="Персонажи-проводники">
                {[
                  { 
                    id: 0,
                    name: 'Аяна', 
                    file: 'ayana.svg', 
                    desc: 'Проводник по&nbsp;истории, культуре и&nbsp;традициям коренных народов.' 
                  },
                  { 
                    id: 1,
                    name: 'Синильга', 
                    file: 'sinilga.svg', 
                    desc: 'Проводник по&nbsp;природе, таёжным тропам и&nbsp;богатствам Верхнекетья.' 
                  },
                  { 
                    id: 2,
                    name: 'Амака', 
                    file: 'amaka.svg', 
                    desc: 'Проводник по&nbsp;древним преданиям, ремёслам и&nbsp;мудрости предков тайги.' 
                  },
                ].map((item) => (
                  <article 
                    key={item.id}
                    className="bg-white border border-[#1C1C1C]/15 rounded-xl p-5 sm:p-6 flex flex-col items-center text-center space-y-4 shadow-2xs group m3-card-interactive relative overflow-hidden select-none"
                  >
                    {/* Фоновый ореол-амулет с плавной медленной вращательной анимацией */}
                    <div className="absolute top-8 w-44 h-44 rounded-full pointer-events-none opacity-20 transition-all duration-500 group-hover:opacity-40 group-hover:scale-110 flex items-center justify-center" aria-hidden="true">
                      <img 
                        src="/amulet.svg" 
                        alt="" 
                        className="w-full h-full object-contain animate-spin-slow"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Слот иллюстрации маскота с реакцией на наведение */}
                    <div className="w-full aspect-square max-h-[220px] sm:max-h-none sm:aspect-[3/4] relative rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#1C1C1C]/12 flex items-center justify-center p-3 sm:p-4 ds-swatch-box shadow-2xs">
                      <img 
                        src={`/mascots/${item.file}`} 
                        alt={`Персонаж-проводник ${item.name}`}
                        className="w-full h-full object-contain block transition-transform duration-500 group-hover:scale-108 group-hover:-rotate-1"
                      />
                    </div>

                    {/* Описание персонажа */}
                    <div className="space-y-1.5 w-full pt-1">
                      <div className="text-[#1C1C1C]" style={{ 
                        fontFamily: 'Kurale, serif',
                        fontSize: '19px',
                        lineHeight: '1.2',
                        fontWeight: 400,
                        fontSynthesis: 'none',
                        WebkitFontSmoothing: 'grayscale',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeSpeed',
                        fontVariantNumeric: 'lining-nums',
                        fontFeatureSettings: '"kern" 1, "liga" 0'
                      }}>
                        {item.name}
                      </div>

                      <p 
                        className="text-xs sm:text-sm text-[#1C1C1C]/80 font-sans leading-relaxed text-pretty pt-1"
                        style={{
                          WebkitFontSmoothing: 'grayscale',
                          MozOsxFontSmoothing: 'grayscale',
                          textRendering: 'optimizeSpeed'
                        }}
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* 10. Карта: вёрстка как в Страницы таёжных рецептов */}
            <div id="ds-cartography" className="space-y-6">
              <div className="flex items-center gap-3 text-xs font-sans text-[#1C1C1C]/70 font-medium tracking-wide">
                <span>10</span>
                <span className="text-[#1C1C1C]/30">/</span>
                <span>Карта</span>
                <div className="flex-1 h-px bg-[#1C1C1C]/15" />
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start sm:items-center">
                <div className="w-full sm:col-span-5 lg:col-span-4 flex justify-center sm:justify-start items-center">
                  <div className="w-full max-w-[280px] sm:max-w-none rounded-2xl overflow-hidden border border-[#1C1C1C]/15 bg-white shadow-2xs">
                    <img 
                      src="/geography_map.svg" 
                      alt="Верхнекетский район" 
                      className="w-full h-auto object-contain block bg-white"
                    />
                  </div>
                </div>
                <div className="w-full sm:col-span-7 lg:col-span-8 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[#1C1C1C] leading-snug">
                    Верхнекетский район
                  </h3>
                  <p className="text-sm sm:text-base text-[#1C1C1C]/80 font-normal leading-relaxed font-sans text-pretty">
                    Полностраничная карта открывает раздел «География» словаря. Она фиксирует ареал расселения трёх коренных народов — селькупов, кетов и эвенков вдоль течения реки Кеть.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {lightboxImage && createPortal(
        <div 
          className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 cursor-pointer"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative flex flex-col items-center justify-center max-w-full max-h-full cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия возвращена прямо к контенту в верхний правый угол */}
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-20 p-2.5 rounded-full bg-[#1C1C1C] hover:bg-neutral-800 text-white transition-all cursor-pointer shadow-xl border border-white/20 active:scale-95"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
            </button>

            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.title}
              className="max-w-[92vw] max-h-[76vh] sm:max-h-[82vh] object-contain rounded-xl bg-white shadow-2xl block border border-white/10"
            />
            {lightboxImage.title && (
              <div className="mt-3.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs sm:text-sm text-white font-sans text-center max-w-md">
                {lightboxImage.title}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Navbar, NAV_ITEMS } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ContextShiftSection } from './components/ContextShiftSection';
import { ConceptPillarsSection } from './components/ConceptPillarsSection';
import { CaseStorySection } from './components/CaseStorySection';
import { DeliverablesGallery } from './components/DeliverablesGallery';
import { IdentitySystem } from './components/IdentitySystem';
import { SpatialClubSection } from './components/SpatialClubSection';
import { ResultsSection } from './components/ResultsSection';
import { ContactSection } from './components/ContactSection';
import { LegalModals } from './components/LegalModals';
import { Footer } from './components/Footer';
import { SilverCursorGlintManager } from './components/SilverCursorGlintManager';
import { CustomCursor } from './components/CustomCursor';
import { SiberianFrostFog } from './components/SiberianFrostFog';
import { LawDayPreloader } from './components/LawDayPreloader';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('context');
  const [copied, setCopied] = useState<boolean>(false);
  const [policyOpen, setPolicyOpen] = useState<boolean>(false);
  const [consentOpen, setConsentOpen] = useState<boolean>(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState<boolean>(true);

  // Scroll spy to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            return;
          }
        }
      }
      
      // If at the very top of page
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    setActiveSection('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopySummary = () => {
    const caseText = `# КЕЙС: «День юриста 2024» — Арт-дирекшн, ювелирный код, серебро 925, морозное стекло и SMM события
Клиент: Дирекция Юридического института ТГУ / Профбюро ЮИ ППОС ТГУ / Law Student Awards (LSA)
Локация: Клуб FACE (FACE Club & Karaoke), Томск
Дата: 5 декабря 2024
Роль: Graphic Designer & Art Director (Единоличная реализация под ключ)
Стек: Figma, Adobe Illustrator, Adobe Photoshop, Blender / 3D
Материалы & Смыслы:
- Изумрудный цвет: Томск — литературный прототип «Изумрудного города» А. Волкова
- 925 Sterling Silver: Традиционный официальный благородный металл ЮИ ТГУ
- Морозное стекло: Кристаллический сибирский иней и морозный контекст декабря
- Стратегия тайны & слоган: Отказ от формата премии в пользу закрытого дня рождения-сюрприза «Юрия Игоревича Тгушкина» (ЮИ ТГУ) со слоганом «Только не проболтайся!»

Дресс-код: Total Black, Emerald & Silver
Оффлайн-среда: Фотозона из серебряного и изумрудного шёлка, защищённые физические VIP-билеты с тиснением серебром
Спонсоры: Quua, Studio 17, OnlyTec, Nyam Cafe, Fides (нативная интеграция без искажения айдентики)
Результаты: 100% sold out билетов за 4 дня до ивента, 297 гостей (полный зал FACE Club), +423 подписчика, 40+ рекламных носителей

Цитата: «Даже самое консервативное институциональное событие можно упаковать как закрытый клуб и показ высокой моды, не теряя академического достоинства.»`;

    navigator.clipboard.writeText(caseText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#010e0d] text-[#e2f1f0] flex flex-col selection:bg-white selection:text-[#011413] relative overflow-x-hidden">
      {/* Minimalist Emerald & Silver Luxury Preloader */}
      <LawDayPreloader onComplete={() => setIsPreloaderActive(false)} />

      {/* 925 Sterling Silver & Emerald Custom Luxury Cursor */}
      <CustomCursor />
      {/* Real-time Cursor Reactive Silver Metal Glint Engine */}
      <SilverCursorGlintManager />

      {/* Siberian Winter Cold Mist & Diamond Dust for Widescreen Flanks */}
      <SiberianFrostFog />

      {/* Top Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onScrollToTop={handleScrollToTop}
      />

      {/* Single-Page Landing Content */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero Section */}
        <div id="hero">
          <HeroSection
            onExploreClick={() => handleNavigate('context')}
            onConceptClick={() => handleNavigate('concept')}
          />
        </div>

        {/* 2. Context & Strategic Challenge */}
        <div id="context" className="scroll-mt-16">
          <ContextShiftSection />
        </div>

        {/* 3. The 4 Concept Pillars */}
        <div id="concept" className="scroll-mt-16">
          <ConceptPillarsSection />
        </div>

        {/* 4. Campaign Storyline & Launch Phases */}
        <div id="story" className="scroll-mt-16">
          <CaseStorySection />
        </div>

        {/* 6. Brand System & Identity */}
        <div id="identity" className="scroll-mt-16">
          <IdentitySystem />
        </div>

        {/* 7. Deliverables & Marketing Media Gallery */}
        <div id="deliverables" className="scroll-mt-16">
          <DeliverablesGallery />
        </div>

        {/* 8. Spatial & Club Atmosphere with Ticket Artifact */}
        <div id="spatial" className="scroll-mt-16">
          <SpatialClubSection />
        </div>

        {/* 10. Results, Metrics & Impact */}
        <div id="results" className="scroll-mt-16">
          <ResultsSection onCopySummary={handleCopySummary} copied={copied} />
        </div>

        {/* 11. Contacts & Project Discussion */}
        <div id="contacts" className="scroll-mt-16">
          <ContactSection 
            onOpenPolicy={() => setPolicyOpen(true)} 
            onOpenConsent={() => setConsentOpen(true)} 
          />
        </div>
      </main>

      {/* Legal Policy and Consent Modals */}
      <LegalModals
        policyOpen={policyOpen}
        consentOpen={consentOpen}
        onClosePolicy={() => setPolicyOpen(false)}
        onCloseConsent={() => setConsentOpen(false)}
      />

      {/* Footer */}
      <Footer 
        onScrollToTop={handleScrollToTop} 
        onOpenPolicy={() => setPolicyOpen(true)}
        onOpenConsent={() => setConsentOpen(true)}
      />
    </div>
  );
};

export default App;

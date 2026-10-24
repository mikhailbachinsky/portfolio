import React, { useState, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SwissEditorialSections } from './components/SwissEditorialSections';
import { UpperketContactSection } from './components/UpperketContactSection';
import { PolicyModal, ConsentModal } from './components/LegalModals';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { CustomTooltipProvider } from './components/CustomTooltip';

const SpreadModal = lazy(() => import('./components/SpreadModal').then(m => ({ default: m.SpreadModal })));
const ContactModal = lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));

export default function App() {
  const [activeSpreadChapterId, setActiveSpreadChapterId] = useState<number | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState<boolean>(false);
  const [isConsentOpen, setIsConsentOpen] = useState<boolean>(false);

  return (
    <CustomTooltipProvider>
      <div className="min-h-screen bg-[#F9F7F2] text-[#1C1C1C] selection:bg-[#1C1C1C] selection:text-[#F9F7F2]">
        {/* Custom Ethnic Museum Cursor */}
        <CustomCursor />

        {/* Minimalist Preloader */}
        <Preloader />

        {/* Header with Museum Brand */}
        <Header
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Main Single-Page Content */}
        <main>
          {/* Hero Section with Interactive Page-Flip Book Reader */}
          <Hero
            onOpenSpread={(chapterId: number) => setActiveSpreadChapterId(chapterId)}
          />

          {/* Swiss Typographic Editorial Sections (Text under Interactive Spread) */}
          <SwissEditorialSections
            onOpenSpread={(chapterId: number) => setActiveSpreadChapterId(chapterId)}
          />

          {/* Контакты и форма обратной связи */}
          <UpperketContactSection
            onOpenPolicy={() => setIsPolicyOpen(true)}
            onOpenConsent={() => setIsConsentOpen(true)}
          />
        </main>

        {/* Museum Footer */}
        <Footer 
          onOpenPolicy={() => setIsPolicyOpen(true)}
          onOpenConsent={() => setIsConsentOpen(true)}
        />

        {/* Legal Modals */}
        <PolicyModal
          isOpen={isPolicyOpen}
          onClose={() => setIsPolicyOpen(false)}
        />
        <ConsentModal
          isOpen={isConsentOpen}
          onClose={() => setIsConsentOpen(false)}
        />

        {/* Modals with Lazy Loading */}
        <Suspense fallback={null}>
          <SpreadModal
            chapterId={activeSpreadChapterId}
            onClose={() => setActiveSpreadChapterId(null)}
            onSelectChapter={(id) => setActiveSpreadChapterId(id)}
          />

          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        </Suspense>
      </div>
    </CustomTooltipProvider>
  );
}

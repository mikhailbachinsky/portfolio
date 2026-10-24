import React, { useEffect } from 'react';
import { X, Shield, FileCheck } from 'lucide-react';

interface LegalModalsProps {
  policyOpen: boolean;
  consentOpen: boolean;
  onClosePolicy: () => void;
  onCloseConsent: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  policyOpen,
  consentOpen,
  onClosePolicy,
  onCloseConsent,
}) => {
  useEffect(() => {
    if (policyOpen || consentOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [policyOpen, consentOpen]);

  return (
    <>
      {/* Модальное окно: Политика конфиденциальности */}
      {policyOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={onClosePolicy}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#021816] text-[#e2f1f0] border border-silver/30 shadow-2xl overflow-hidden flex flex-col silver-contour-subtle"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Хедер модалки */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-silver/20 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-silver-bright border border-silver/30">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="font-serif-luxury text-lg text-white font-semibold">Политика конфиденциальности</h3>
              </div>
              <button
                onClick={onClosePolicy}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Тело модалки */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed font-light font-sans-clean">
              <p>
                Настоящая Политика конфиденциальности действует в отношении всей информации, которую сайт-портфолио Михаила Бачинского может получить о пользователе во время использования сайта.
              </p>
              <h4 className="font-semibold text-white text-sm pt-2">1. Сбор и использование информации</h4>
              <p>
                Мы собираем только те контактные данные (имя, телефон, Telegram, Email), которые пользователь добровольно отправляет через форму обратной связи для обсуждения проектов дизайна, брендинга и визуальных коммуникаций.
              </p>
              <h4 className="font-semibold text-white text-sm pt-2">2. Защита персональных данных</h4>
              <p>
                Персональные данные не передаются третьим лицам и используются исключительно для прямой связи и коммуникации по вопросам оказания дизайнерских услуг.
              </p>
              <h4 className="font-semibold text-white text-sm pt-2">3. Контакты оператора</h4>
              <p>
                По всем вопросам обработки данных вы можете связаться: <br/>
                Email: <span className="text-white font-mono">mikhail.bachinsky2004@gmail.com</span><br/>
                Телефон: <span className="text-white font-mono">+7 (952) 884-24-64</span>
              </p>
            </div>

            {/* Футер модалки */}
            <div className="px-6 py-3 border-t border-silver/20 bg-white/[0.02] flex justify-end">
              <button
                onClick={onClosePolicy}
                className="px-4 py-2 text-xs uppercase tracking-wider bg-white text-[#010e0d] font-semibold hover:bg-white/90 transition-colors"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно: Согласие на обработку персональных данных */}
      {consentOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={onCloseConsent}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#021816] text-[#e2f1f0] border border-silver/30 shadow-2xl overflow-hidden flex flex-col silver-contour-subtle"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Хедер модалки */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-silver/20 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-silver-bright border border-silver/30">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="font-serif-luxury text-lg text-white font-semibold">Согласие на обработку данных</h3>
              </div>
              <button
                onClick={onCloseConsent}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Тело модалки */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed font-light font-sans-clean">
              <p>
                Отправляя форму на сайте, вы даете согласие Михаилу Бачинскому на обработку своих персональных данных в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
              </p>
              <h4 className="font-semibold text-white text-sm pt-2">Цели обработки:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ответ на запрос о разработке дизайна, айдентики или брендинга.</li>
                <li>Предоставление консультаций по проектам.</li>
                <li>Согласование деталей сотрудничества.</li>
              </ul>
              <p className="pt-2 text-white/60">
                Согласие может быть отозвано в любой момент путем отправки письменного уведомления на электронную почту оператора.
              </p>
            </div>

            {/* Футер модалки */}
            <div className="px-6 py-3 border-t border-silver/20 bg-white/[0.02] flex justify-end">
              <button
                onClick={onCloseConsent}
                className="px-4 py-2 text-xs uppercase tracking-wider bg-white text-[#010e0d] font-semibold hover:bg-white/90 transition-colors"
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

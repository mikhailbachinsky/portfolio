import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policyModalTitle"
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5"
    >
      {/* Затемнение фона с блюром */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Окно модалки */}
      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] bg-[#FAF8F5] border border-black/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#181818] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Шапка */}
        <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-black/10 flex items-center justify-between bg-white/70">
          <h3 id="policyModalTitle" className="text-base sm:text-lg font-bold tracking-tight text-[#181818]">
            Политика обработки персональных данных
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть модальное окно"
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#181818]/70 hover:text-[#181818] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Контент с прокруткой */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#181818]/85 leading-relaxed font-normal">
          <h4 className="text-sm sm:text-base font-bold text-[#181818]">1. Общие положения</h4>
          <p>
            <strong>1.1.</strong> Настоящая Политика определяет порядок обработки и&nbsp;защиты персональных данных, предпринимаемые Бачинским Михаилом Михайловичем (ИНН 700401680112, статус: плательщик налога на&nbsp;профессиональный доход) (далее&nbsp;— Оператор), в&nbsp;соответствии с&nbsp;требованиями Федерального закона от&nbsp;27.07.2006 № 152-ФЗ «О&nbsp;персональных данных».
          </p>
          <p>
            <strong>1.2.</strong> Базы данных и&nbsp;серверные мощности, используемые для&nbsp;сбора и&nbsp;хранения персональных данных граждан РФ, размещены на&nbsp;территории Российской Федерации.
          </p>
          <p>
            <strong>1.3.</strong> Оператор не&nbsp;осуществляет массовые рекламные рассылки и&nbsp;сбор персональных данных в&nbsp;маркетинговых целях без&nbsp;отдельного явно выраженного согласия.
          </p>

          <h4 className="text-sm sm:text-base font-bold text-[#181818] pt-2">2. Правовые основания обработки</h4>
          <p><strong>2.1.</strong> Обработка персональных данных осуществляется на&nbsp;основании:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>согласия субъекта персональных данных (п. 1 ч. 1 ст. 6 Федерального закона № 152-ФЗ);</li>
            <li>п. 5 ч. 1 ст. 6 Федерального закона № 152-ФЗ (обработка данных, необходимая для&nbsp;заключения договора по&nbsp;инициативе субъекта персональных данных).</li>
          </ul>

          <h4 className="text-sm sm:text-base font-bold text-[#181818] pt-2">3. Категории обрабатываемых данных</h4>
          <p><strong>3.1.</strong> Через форму обратной связи Оператор собирает:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>имя пользователя;</li>
            <li>контактную информацию (телефон, email, никнейм в&nbsp;Telegram);</li>
            <li>текст пользовательского сообщения / брифа;</li>
            <li>технические данные запроса (IP-адрес, дата и&nbsp;время обращения).</li>
          </ul>

          <h4 className="text-sm sm:text-base font-bold text-[#181818] pt-2">4. Порядок и условия обработки</h4>
          <p>
            <strong>4.1.</strong> Сбор данных осуществляется исключительно в&nbsp;целях коммуникации по&nbsp;вопросам дизайн-услуг, подготовки коммерческих предложений и&nbsp;обратной связи.
          </p>
          <p>
            <strong>4.2.</strong> Данные не&nbsp;передаются третьим лицам, за&nbsp;исключением случаев, предусмотренных законодательством РФ.
          </p>
          <p>
            <strong>4.3.</strong> Пользователь может в&nbsp;любой момент отозвать согласие, направив обращение на&nbsp;электронную почту: <a href="mailto:mikhail.bachinsky@yandex.ru" className="text-[#181818] underline font-medium">mikhail.bachinsky@yandex.ru</a>.
          </p>
        </div>

        {/* Футер */}
        <div className="px-5 sm:px-7 py-3.5 sm:py-4 border-t border-black/10 bg-white/70 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#181818] text-white text-xs sm:text-sm font-medium hover:bg-black transition-colors cursor-pointer"
          >
            Понятно
          </button>
        </div>

      </div>
    </div>
  );
};

export const ConsentModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consentModalTitle"
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5"
    >
      {/* Затемнение фона */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Окно модалки */}
      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] bg-[#FAF8F5] border border-black/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#181818] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Шапка */}
        <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-black/10 flex items-center justify-between bg-white/70">
          <h3 id="consentModalTitle" className="text-base sm:text-lg font-bold tracking-tight text-[#181818]">
            Согласие на обработку персональных данных
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть модальное окно"
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#181818]/70 hover:text-[#181818] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Контент с прокруткой */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#181818]/85 leading-relaxed font-normal">
          <p>
            Настоящим я, действуя свободно, своей волей и&nbsp;в&nbsp;своем интересе, даю согласие Бачинскому Михаилу Михайловичу (ИНН 700401680112, статус: плательщик налога на&nbsp;профессиональный доход) (далее&nbsp;— Оператор) на&nbsp;обработку моих персональных данных со&nbsp;следующими условиями:
          </p>

          <h4 className="text-sm sm:text-base font-bold text-[#181818] pt-1">1. Состав обрабатываемых данных</h4>
          <p>Обработке подлежат персональные данные, предоставленные мной при&nbsp;заполнении формы обратной связи на&nbsp;сайте:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>имя;</li>
            <li>контактная информация (номер телефона, email, идентификатор в&nbsp;Telegram);</li>
            <li>выбранное направление проекта (айдентика, упаковка соцсетей, баннеры, консультация);</li>
            <li>содержание пользовательского обращения (текст сообщения);</li>
            <li>технические данные, автоматически фиксируемые сетевыми службами веб-сервера.</li>
          </ul>

          <h4 className="text-sm sm:text-base font-bold text-[#181818] pt-2">2. Цели обработки</h4>
          <p>Сбор и&nbsp;обработка персональных данных осуществляются исключительно в&nbsp;целях:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>установления обратной связи и&nbsp;обсуждения условий сотрудничества;</li>
            <li>подготовки и&nbsp;направления предварительных расчетов стоимости и&nbsp;сроков реализации дизайн-проектов;</li>
            <li>заключения и&nbsp;исполнения договоров на&nbsp;оказание услуг по&nbsp;дизайну.</li>
          </ul>

          <h4 className="text-sm sm:text-base font-bold text-[#181818] pt-2">3. Срок действия согласия</h4>
          <p>
            Согласие действует с&nbsp;момента его предоставления до&nbsp;момента достижения целей обработки либо до&nbsp;момента отзыва согласия субъектом персональных данных.
          </p>
        </div>

        {/* Футер */}
        <div className="px-5 sm:px-7 py-3.5 sm:py-4 border-t border-black/10 bg-white/70 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#181818] text-white text-xs sm:text-sm font-medium hover:bg-black transition-colors cursor-pointer"
          >
            Принимаю
          </button>
        </div>

      </div>
    </div>
  );
};

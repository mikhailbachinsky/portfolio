import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';

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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-[#161514]/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      <div 
        className="bg-[#F9F7F2] border border-[#1C1C1C]/15 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden select-text"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#1C1C1C]/10 flex items-center justify-between shrink-0 bg-white/70">
          <h3 
            id="policy-modal-title"
            className="text-lg sm:text-xl font-normal text-[#1C1C1C]"
            style={{ fontFamily: 'Kurale, serif' }}
          >
            Политика обработки персональных данных
          </h3>
          <button 
            type="button" 
            onClick={onClose}
            aria-label="Закрыть модальное окно"
            className="p-1.5 rounded-lg text-[#1C1C1C]/60 hover:text-[#1C1C1C] hover:bg-[#1C1C1C]/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#1C1C1C]/80 font-sans leading-relaxed">
          <h4 className="font-semibold text-[#1C1C1C] text-sm sm:text-base">1. Общие положения</h4>
          <p>
            <strong>1.1.</strong> Настоящая Политика определяет порядок обработки и&nbsp;защиты персональных данных, предпринимаемые Бачинским Михаилом Михайловичем (ИНН 700401680112, статус: плательщик налога на&nbsp;профессиональный доход) (далее&nbsp;— Оператор), в&nbsp;соответствии с&nbsp;требованиями Федерального закона от&nbsp;27.07.2006 № 152-ФЗ «О&nbsp;персональных данных».
          </p>
          <p>
            <strong>1.2.</strong> Базы данных и&nbsp;серверные мощности, используемые для&nbsp;сбора и&nbsp;хранения персональных данных граждан РФ, размещены на&nbsp;территории Российской Федерации.
          </p>
          <p>
            <strong>1.3.</strong> Оператор не&nbsp;осуществляет массовые рекламные рассылки и&nbsp;сбор персональных данных в&nbsp;маркетинговых целях без&nbsp;отдельного явно выраженного согласия.
          </p>

          <h4 className="font-semibold text-[#1C1C1C] text-sm sm:text-base pt-2">2. Правовые основания обработки</h4>
          <p>
            <strong>2.1.</strong> Обработка персональных данных осуществляется на&nbsp;основании:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>согласия субъекта персональных данных (п. 1 ч. 1 ст. 6 Федерального закона № 152-ФЗ);</li>
            <li>п. 5 ч. 1 ст. 6 Федерального закона № 152-ФЗ (обработка данных, необходимая для&nbsp;заключения договора по&nbsp;инициативе субъекта персональных данных).</li>
          </ul>

          <h4 className="font-semibold text-[#1C1C1C] text-sm sm:text-base pt-2">3. Категории обрабатываемых данных</h4>
          <p>
            <strong>3.1.</strong> Через форму обратной связи Оператор собирает:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>имя заявителя;</li>
            <li>контактные каналы связи (телефон, email, логин в&nbsp;Telegram);</li>
            <li>сведения о&nbsp;тематике проекта (айдентика, книжный дизайн, полиграфия, консультация);</li>
            <li>текст пользовательского сообщения.</li>
          </ul>
          <p>
            <strong>3.2.</strong> Автоматически при&nbsp;отправке запроса могут фиксироваться технические метаданные сетевого соединения (IP-адрес, временная метка обращения).
          </p>

          <h4 className="font-semibold text-[#1C1C1C] text-sm sm:text-base pt-2">4. Порядок обработки, хранение и&nbsp;конфиденциальность</h4>
          <p>
            <strong>4.1.</strong> Обработка данных осуществляется с&nbsp;использованием средств автоматизации: сбор, запись, систематизация, накопление, хранение на&nbsp;защищенных серверах, уточнение, использование, удаление, уничтожение.
          </p>
          <p>
            <strong>4.2.</strong> Персональные данные не&nbsp;передаются третьим лицам, за&nbsp;исключением случаев передачи провайдерам хостинга (в&nbsp;рамках обеспечения работоспособности веб-сервера) и&nbsp;установленных законом требований уполномоченных органов государственной власти РФ.
          </p>

          <h4 className="font-semibold text-[#1C1C1C] text-sm sm:text-base pt-2">5. Сроки обработки и&nbsp;уничтожение</h4>
          <p>
            <strong>5.1.</strong> Данные обрабатываются до&nbsp;завершения коммуникации по&nbsp;заявке, прекращения обязательств по&nbsp;заключенному соглашению либо&nbsp;до&nbsp;отзыва согласия пользователем.
          </p>
          <p>
            <strong>5.2.</strong> Отзыв согласия направляется на&nbsp;адрес: <strong className="text-[#1C1C1C]">mikhail.bachinsky@yandex.ru</strong>. Срок уничтожения персональных данных при&nbsp;отзыве составляет до&nbsp;30&nbsp;календарных дней.
          </p>
        </div>

        <div className="px-6 py-4 border-t border-[#1C1C1C]/10 bg-white/70 flex justify-end shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#1C1C1C] text-white text-xs sm:text-sm font-medium hover:bg-[#333333] transition-colors cursor-pointer"
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
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-[#161514]/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-modal-title"
    >
      <div 
        className="bg-[#F9F7F2] border border-[#1C1C1C]/15 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden select-text"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#1C1C1C]/10 flex items-center justify-between shrink-0 bg-white/70">
          <h3 
            id="consent-modal-title"
            className="text-lg sm:text-xl font-normal text-[#1C1C1C]"
            style={{ fontFamily: 'Kurale, serif' }}
          >
            Согласие на обработку персональных данных
          </h3>
          <button 
            type="button" 
            onClick={onClose}
            aria-label="Закрыть модальное окно"
            className="p-1.5 rounded-lg text-[#1C1C1C]/60 hover:text-[#1C1C1C] hover:bg-[#1C1C1C]/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#1C1C1C]/80 font-sans leading-relaxed">
          <p>
            Настоящим я, действуя свободно, своей волей и&nbsp;в&nbsp;своем интересе, даю согласие Бачинскому Михаилу Михайловичу (ИНН 700401680112, статус: плательщик налога на&nbsp;профессиональный доход) (далее&nbsp;— Оператор) на&nbsp;обработку моих персональных данных со&nbsp;следующими условиями:
          </p>

          <h4 className="font-semibold text-[#1C1C1C] text-sm sm:text-base pt-2">1. Состав обрабатываемых персональных данных</h4>
          <p>
            Обработке подлежат персональные данные, предоставленные мной при&nbsp;заполнении формы обратной связи на&nbsp;сайте:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>имя;</li>
            <li>контактная информация (номер телефона, и/или адрес электронной почты, и/или идентификатор/логин в&nbsp;мессенджере Telegram);</li>
            <li>выбранное направление проекта (айдентика, книжный дизайн, полиграфия, консультация);</li>
            <li>содержание пользовательского обращения (текст сообщения);</li>
            <li>технические данные, автоматически фиксируемые сетевыми службами веб-сервера при&nbsp;отправке формы (IP-адрес, дата и&nbsp;время отправки запроса).</li>
          </ul>

          <h4 className="font-semibold text-[#1C1C1C] text-sm sm:text-base pt-2">2. Цели обработки</h4>
          <p>
            Сбор и&nbsp;обработка персональных данных осуществляются исключительно в&nbsp;целях:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>обработки входящего обращения;</li>
            <li>проведения первичной консультации;</li>
            <li>подготовки индивидуального коммерческого предложения на&nbsp;оказание дизайнерских услуг;</li>
            <li>коммуникации для&nbsp;возможного заключения договора на&nbsp;разработку дизайна по&nbsp;инициативе субъекта персональных данных.</li>
          </ul>

          <h4 className="font-semibold text-[#1C1C1C] text-sm sm:text-base pt-2">3. Перечень действий и&nbsp;способы обработки</h4>
          <p>
            Обработка персональных данных включает следующие действия: сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (в&nbsp;случаях, предусмотренных законодательством РФ), блокирование, удаление, уничтожение. Обработка осуществляется с&nbsp;использованием средств автоматизации. Хранение персональных данных осуществляется на&nbsp;серверах, расположенных на&nbsp;территории Российской Федерации.
          </p>

          <h4 className="font-semibold text-[#1C1C1C] text-sm sm:text-base pt-2">4. Срок действия согласия и&nbsp;порядок отзыва</h4>
          <p>
            <strong>4.1.</strong> Настоящее согласие действует с&nbsp;момента отправки формы до&nbsp;момента достижения целей обработки либо&nbsp;до&nbsp;момента отзыва согласия.
          </p>
          <p>
            <strong>4.2.</strong> Согласие может быть отозвано в&nbsp;любой момент путем направления письменного заявления на&nbsp;адрес электронной почты Оператора: <strong className="text-[#1C1C1C]">mikhail.bachinsky@yandex.ru</strong> с&nbsp;темой «Отзыв согласия на&nbsp;обработку персональных данных».
          </p>
          <p>
            <strong>4.3.</strong> При&nbsp;получении отзыва Оператор прекращает обработку и&nbsp;уничтожает персональные данные в&nbsp;срок, не&nbsp;превышающий 30&nbsp;(тридцати) календарных дней, за&nbsp;исключением случаев, когда закон допускает обработку без&nbsp;согласия субъекта.
          </p>
        </div>

        <div className="px-6 py-4 border-t border-[#1C1C1C]/10 bg-white/70 flex justify-end shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#1C1C1C] text-white text-xs sm:text-sm font-medium hover:bg-[#333333] transition-colors cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Принимаю</span>
          </button>
        </div>
      </div>
    </div>
  );
};

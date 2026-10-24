import React, { useState } from 'react';
import { Send, Check, Loader2, Phone, Mail, Download } from 'lucide-react';
import { TelegramIcon, VkIcon, MaxIcon, WhatsAppIcon, HeadHunterIcon } from '../../components/SocialIcons';

interface UpperketContactSectionProps {
  onOpenPolicy: () => void;
  onOpenConsent: () => void;
}

export const UpperketContactSection: React.FC<UpperketContactSectionProps> = ({
  onOpenPolicy,
  onOpenConsent
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Книжный дизайн');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const topics = [
    'Книжный дизайн',
    'Айдентика',
    'Полиграфия',
    'Консультация'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !message.trim() || !consent) {
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('https://formsubmit.co/ajax/mikhail.bachinsky@yandex.ru', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Новая заявка со страницы словаря Верхнекетья: ${name}`,
          name: name.trim(),
          contact: contact.trim(),
          topic: selectedTopic,
          message: message.trim(),
          source: 'Кейс словаря Верхнекетья (upperket)'
        })
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setContact('');
        setMessage('');
        setConsent(false);
      } else {
        // Fallback to mailto
        window.location.href = `mailto:mikhail.bachinsky@yandex.ru?subject=${encodeURIComponent(
          `Заявка: ${selectedTopic} от ${name}`
        )}&body=${encodeURIComponent(
          `Имя: ${name}\nКонтакт: ${contact}\nТема: ${selectedTopic}\n\nСообщение:\n${message}`
        )}`;
        setStatus('success');
      }
    } catch {
      // Fallback to mailto
      window.location.href = `mailto:mikhail.bachinsky@yandex.ru?subject=${encodeURIComponent(
        `Заявка: ${selectedTopic} от ${name}`
      )}&body=${encodeURIComponent(
        `Имя: ${name}\nКонтакт: ${contact}\nТема: ${selectedTopic}\n\nСообщение:\n${message}`
      )}`;
      setStatus('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contacts" 
      className="border-t border-[#1C1C1C]/15 relative bg-[#F9F7F2]"
      style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 items-start">
          
          {/* Левая функциональная зона (Колонки 1-4) со sticky-фиксацией */}
          <div className="col-span-12 lg:col-start-1 lg:col-end-4 self-start lg:sticky lg:top-24 sticky-sidebar-container pr-1 space-y-6">
            <div>
              <span className="block text-xs text-[#1C1C1C]/70 mb-2 font-sans font-medium tracking-wide">
                Связь и сотрудничество
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial font-normal tracking-normal text-[#1C1C1C] leading-tight text-balance">
                Контакты
              </h2>
              <div className="mt-4 space-y-3 text-sm text-[#1C1C1C]/75 font-sans leading-relaxed text-pretty">
                <p>
                  Открыт к&nbsp;созданию издательских проектов, айдентики и&nbsp;визуальных систем. Отвечаю в&nbsp;течение суток.
                </p>
              </div>
            </div>

            {/* Прямые каналы связи */}
            <div className="space-y-2.5 pt-2 border-t border-[#1C1C1C]/10 text-xs sm:text-sm font-sans">
              <a 
                href="tel:+79528842464" 
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#1C1C1C]/12 text-[#1C1C1C] hover:border-[#1C1C1C]/35 transition-colors group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#1C1C1C]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#1C1C1C]/70" />
                </div>
                <span className="font-medium">+7 (952) 884-24-64</span>
              </a>

              <a 
                href="mailto:mikhail.bachinsky@yandex.ru" 
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#1C1C1C]/12 text-[#1C1C1C] hover:border-[#1C1C1C]/35 transition-colors group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#1C1C1C]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#1C1C1C]/70" />
                </div>
                <span className="font-medium truncate">mikhail.bachinsky@yandex.ru</span>
              </a>

              <a 
                href="https://t.me/mikhail_bachinsky" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#1C1C1C]/12 text-[#1C1C1C] hover:border-[#1C1C1C]/35 transition-colors group shadow-2xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#1C1C1C]/10 flex items-center justify-center shrink-0">
                  <TelegramIcon className="w-3.5 h-3.5 text-[#1C1C1C]/75" size={14} />
                </div>
                <span className="font-medium">@mikhail_bachinsky</span>
              </a>
            </div>

            {/* Социальные сети: иконки как на главной странице в дизайне кейса */}
            <div className="pt-2">
              <span className="block text-xs text-[#1C1C1C]/60 mb-2.5 font-sans font-medium">
                Профили и портфолио
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a 
                  href="https://t.me/mikhail_bachinsky" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#1C1C1C]/15 hover:border-[#1C1C1C]/40 hover:bg-[#FAF8F5] text-[#1C1C1C] flex items-center justify-center transition-all shadow-2xs m3-interactive-button cursor-pointer"
                  data-tooltip="Telegram"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="w-4 h-4 text-[#1C1C1C]" size={18} />
                </a>
                <a 
                  href="https://vk.ru/mikhail.bachinsky" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#1C1C1C]/15 hover:border-[#1C1C1C]/40 hover:bg-[#FAF8F5] text-[#1C1C1C] flex items-center justify-center transition-all shadow-2xs m3-interactive-button cursor-pointer"
                  data-tooltip="ВКонтакте"
                  aria-label="ВКонтакте"
                >
                  <VkIcon className="w-5 h-3 text-[#1C1C1C]" size={20} />
                </a>
                <a 
                  href="https://max.ru/u/f9LHodD0cOIxxDbYY8BqSWOHz7Al0jZHPysE1_gaohhyp1ktobRKpcJkKBs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#1C1C1C]/15 hover:border-[#1C1C1C]/40 hover:bg-[#FAF8F5] text-[#1C1C1C] flex items-center justify-center transition-all shadow-2xs m3-interactive-button cursor-pointer"
                  data-tooltip="MAX"
                  aria-label="MAX"
                >
                  <MaxIcon className="w-4 h-4 text-[#1C1C1C]" size={18} />
                </a>
                <a 
                  href="https://wa.me/79528842464" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#1C1C1C]/15 hover:border-[#1C1C1C]/40 hover:bg-[#FAF8F5] text-[#1C1C1C] flex items-center justify-center transition-all shadow-2xs m3-interactive-button cursor-pointer"
                  data-tooltip="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#1C1C1C]" size={18} />
                </a>
                <a 
                  href="https://hh.ru/resume/6f2113e5ff1148fafa0039ed1f6e50706a7342" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#1C1C1C]/15 hover:border-[#1C1C1C]/40 hover:bg-[#FAF8F5] text-[#1C1C1C] flex items-center justify-center transition-all shadow-2xs m3-interactive-button cursor-pointer"
                  data-tooltip="HH.ru"
                  aria-label="HeadHunter"
                >
                  <HeadHunterIcon className="w-4 h-3.5 text-[#1C1C1C]" size={18} />
                </a>
              </div>
            </div>

            {/* Скачать резюме */}
            <div className="pt-1">
              <a 
                href="/assets/resume.pdf" 
                download 
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#1C1C1C]/20 bg-white hover:bg-[#FAF8F5] text-xs sm:text-sm font-medium text-[#1C1C1C] transition-colors shadow-2xs"
              >
                <Download className="w-4 h-4 text-[#1C1C1C]/70" />
                <span>Скачать резюме (PDF)</span>
              </a>
            </div>
          </div>

          {/* Правая функциональная зона (Колонки 5-12): Форма */}
          <div className="col-span-12 lg:col-start-5 lg:col-end-13">
            <div className="bg-white border border-[#1C1C1C]/15 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 
                  className="text-xl sm:text-2xl font-normal text-[#1C1C1C]"
                  style={{ fontFamily: 'Kurale, serif' }}
                >
                  Форма обратной связи
                </h3>
                <p className="text-xs sm:text-sm text-[#1C1C1C]/70 font-sans leading-relaxed">
                  Заполните поля ниже&nbsp;— сообщение будет отправлено напрямую на&nbsp;почту.
                </p>
              </div>

              {status === 'success' && (
                <div className="p-4 rounded-xl bg-[#F2F7F2] border border-[#4A7A28]/30 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#4A7A28] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs sm:text-sm text-[#1C1C1C]/90 font-sans leading-relaxed">
                    <strong>Спасибо за обращение!</strong> Ваше сообщение успешно отправлено на&nbsp;mikhail.bachinsky@yandex.ru. Я&nbsp;свяжусь с&nbsp;вами в&nbsp;ближайшее время.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Имя */}
                <div className="space-y-1.5">
                  <label htmlFor="upperket-name" className="block text-xs font-sans font-medium text-[#1C1C1C]/75">
                    Ваше имя
                  </label>
                  <input
                    id="upperket-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Например, Алексей или Анна"
                    className="w-full px-4 py-3 rounded-xl border border-[#1C1C1C]/15 bg-[#FAF8F5] text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:bg-white focus:outline-none focus:border-[#1C1C1C] transition-colors select-text"
                  />
                </div>

                {/* Контакт */}
                <div className="space-y-1.5">
                  <label htmlFor="upperket-contact" className="block text-xs font-sans font-medium text-[#1C1C1C]/75">
                    Контакт для связи
                  </label>
                  <input
                    id="upperket-contact"
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Email, Telegram (@username) или телефон"
                    className="w-full px-4 py-3 rounded-xl border border-[#1C1C1C]/15 bg-[#FAF8F5] text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:bg-white focus:outline-none focus:border-[#1C1C1C] transition-colors select-text"
                  />
                </div>

                {/* Чипы темы */}
                <div className="space-y-2">
                  <span className="block text-xs font-sans font-medium text-[#1C1C1C]/75">
                    Тема проекта
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => {
                      const isSelected = selectedTopic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setSelectedTopic(topic)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#1C1C1C] text-white font-medium shadow-xs'
                              : 'bg-[#FAF8F5] border border-[#1C1C1C]/12 text-[#1C1C1C]/70 hover:border-[#1C1C1C]/35'
                          }`}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Сообщение */}
                <div className="space-y-1.5">
                  <label htmlFor="upperket-message" className="block text-xs font-sans font-medium text-[#1C1C1C]/75">
                    Сообщение
                  </label>
                  <textarea
                    id="upperket-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Опишите задачу, формат книги, сроки или пожелания..."
                    className="w-full px-4 py-3 rounded-xl border border-[#1C1C1C]/15 bg-[#FAF8F5] text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:bg-white focus:outline-none focus:border-[#1C1C1C] transition-colors resize-y select-text"
                  />
                </div>

                {/* Чекбокс согласия */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs font-sans text-[#1C1C1C]/75 select-none">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-[#1C1C1C]/30 text-[#1C1C1C] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                    />
                    <span>
                      Я согласен на{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenConsent();
                        }}
                        className="underline hover:text-[#1C1C1C] transition-colors cursor-pointer"
                      >
                        обработку персональных данных
                      </button>{' '}
                      в&nbsp;соответствии с{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenPolicy();
                        }}
                        className="underline hover:text-[#1C1C1C] transition-colors cursor-pointer"
                      >
                        политикой конфиденциальности
                      </button>
                    </span>
                  </label>
                </div>

                {/* Кнопка отправки */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !consent}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#1C1C1C] hover:bg-[#333333] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Отправить сообщение</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

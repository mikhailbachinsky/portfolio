import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Send, 
  Check,
  Copy,
  CheckCircle2, 
  Loader2, 
  ArrowUpRight, 
  Download,
  MapPin
} from 'lucide-react';
import { TelegramIcon, VkIcon, MaxIcon, WhatsAppIcon, HeadHunterIcon } from './SocialIcons';
import { FlatReveal } from './FlatReveal';

interface ContactSectionProps {
  onOpenPolicy: () => void;
  onOpenConsent: () => void;
  onOpenResume?: () => void;
}

interface AvatarImageProps {
  srcs: string[];
  alt: string;
  fallback: string;
  className?: string;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ 
  srcs, 
  alt, 
  fallback, 
  className = "w-12 h-12 rounded-2xl" 
}) => {
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState(false);

  if (error || attempt >= srcs.length) {
    return (
      <div className={`flex items-center justify-center font-bold text-sm bg-white text-[#181818] ${className}`}>
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={srcs[attempt]}
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => {
        if (attempt + 1 < srcs.length) {
          setAttempt(attempt + 1);
        } else {
          setError(true);
        }
      }}
    />
  );
};

type TopicKey = 'identity' | 'socials' | 'banners' | 'consultation';

const TOPICS: { key: TopicKey; label: string; template: string }[] = [
  { key: 'identity', label: 'Айдентика', template: 'Здравствуйте! Интересует разработка айдентики: ' },
  { key: 'socials', label: 'Упаковка соцсетей', template: 'Здравствуйте! Нужна упаковка соцсетей: ' },
  { key: 'banners', label: 'Баннеры', template: 'Здравствуйте! Требуется дизайн рекламных баннеров: ' },
  { key: 'consultation', label: 'Консультация', template: 'Здравствуйте! Хочу проконсультироваться по проекту: ' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenPolicy,
  onOpenConsent,
  onOpenResume,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const getChannelInfo = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('@') || trimmed.toLowerCase().includes('t.me')) {
      return { label: 'Telegram' };
    }
    if (trimmed.includes('@') && trimmed.includes('.')) {
      return { label: 'Email' };
    }
    if (/^[+\d\s()-]{5,}$/.test(trimmed)) {
      return { label: 'Телефон' };
    }
    return null;
  };

  const channel = getChannelInfo(contact);

  const handleTopicClick = (topic: typeof TOPICS[0]) => {
    if (selectedTopic === topic.key) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(topic.key);
      if (!message || TOPICS.some((t) => message.startsWith(t.template))) {
        setMessage(topic.template);
      }
    }
  };

  const isFormValid = 
    name.trim().length >= 2 &&
    contact.trim().length >= 4 &&
    message.trim().length >= 10 &&
    consent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="contacts-section" className="w-full">
      {/* Единый виндоу-контейнер страницы */}
      <div className="w-full px-3 sm:px-4 lg:px-5 py-8 sm:py-12 lg:py-16">
        
        {/* Eyebrow маркер строго по левой силовой линии */}
        <div className="w-full pl-1 sm:pl-3 mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm text-[#737373] font-normal block font-mono">
            (контакты)
          </span>
        </div>

        {/* Единая карточка секции: Автор + Прямая связь + Форма */}
        <FlatReveal direction="up" delay={80} distance={36} duration={850} className="w-full">
          <div className="w-full rounded-[24px] sm:rounded-[32px] border border-black/10 bg-white/70 shadow-2xs p-6 sm:p-8 lg:p-10 flex flex-col gap-6 sm:gap-8">
            
            {/* Верхний блок: Автор проекта + Кнопка «Скачать резюме» */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#181818] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs overflow-hidden">
                  <AvatarImage
                    srcs={[
                      '/assets/avatar-mikhail.webp',
                      '/assets/avatar-mikhail.png',
                      '/avatar-mikhail.png',
                      '/assets/mikhail.png',
                      '/mikhail.png',
                      '/assets/avatar-mikhail.jpg',
                      '/avatar-mikhail.jpg',
                      '/mikhail.jpg'
                    ]}
                    alt="Михаил Михайлович"
                    fallback="МБ"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#181818] tracking-tight">
                      Михаил Михайлович
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-[#8FE06E]" data-tooltip="Доступен для проектов" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
                    Графический и&nbsp;бренд-дизайнер
                  </p>
                </div>
              </div>

              {/* Кнопка «Скачать резюме» */}
              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  data-tooltip="Открыть резюме автора (PDF)"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#181818] hover:bg-black text-white text-xs font-medium transition-colors duration-200 shadow-2xs flex items-center justify-center gap-2 cursor-pointer shrink-0 group"
                >
                  <div className="w-3.5 h-3.5 relative overflow-hidden flex items-center justify-center shrink-0">
                    <Download className="w-3.5 h-3.5 absolute transition-all duration-500 ease-out group-hover:translate-y-full group-hover:opacity-0" />
                    <Download className="w-3.5 h-3.5 absolute transition-all duration-500 ease-out -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>
                  <span>Скачать резюме</span>
                </button>
              )}
            </div>

            {/* Основной двухколоночный контент: Прямая связь (слева) + Форма (справа) */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              
              {/* =========================================================
                  ЛЕВАЯ КОЛОНКА (5 колонок): Прямая связь, мессенджеры и локация
                  ========================================================= */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  {/* Прямая связь: Телефон и Почта */}
                  <div>
                    <span className="text-[11px] font-mono text-[#737373] block mb-2">
                      (прямая связь)
                    </span>

                    <div className="space-y-2.5">
                      {/* Телефон */}
                      <div className="flex items-center justify-between bg-white rounded-xl border border-black/10 shadow-2xs overflow-hidden h-10">
                        <a
                          href="tel:+79528842464"
                          className="flex-1 px-3 py-2 text-xs font-medium text-[#181818] hover:text-[#FFAD85] transition-colors flex items-center gap-2 truncate"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#737373] shrink-0" />
                          <span className="truncate">+7 (952) 884-24-64</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('+79528842464', 'phone')}
                          data-tooltip={copiedKey === 'phone' ? 'Скопировано!' : 'Скопировать номер'}
                          aria-label="Скопировать номер телефона"
                          className="p-2.5 border-l border-black/10 hover:bg-black/5 text-[#737373] hover:text-[#181818] transition-colors cursor-pointer shrink-0"
                        >
                          {copiedKey === 'phone' ? (
                            <Check className="w-3.5 h-3.5 text-[#8FE06E]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Email */}
                      <div className="flex items-center justify-between bg-white rounded-xl border border-black/10 shadow-2xs overflow-hidden h-10">
                        <a
                          href="mailto:mikhail.bachinsky@yandex.ru"
                          className="flex-1 px-3 py-2 text-xs font-medium text-[#181818] hover:text-[#FFAD85] transition-colors flex items-center gap-2 truncate"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#737373] shrink-0" />
                          <span className="truncate">mikhail.bachinsky@yandex.ru</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('mikhail.bachinsky@yandex.ru', 'email')}
                          data-tooltip={copiedKey === 'email' ? 'Скопировано!' : 'Скопировать e-mail'}
                          aria-label="Скопировать e-mail"
                          className="p-2.5 border-l border-black/10 hover:bg-black/5 text-[#737373] hover:text-[#181818] transition-colors cursor-pointer shrink-0"
                        >
                          {copiedKey === 'email' ? (
                            <Check className="w-3.5 h-3.5 text-[#8FE06E]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Мессенджеры и соцсети */}
                  <div>
                    <span className="text-[11px] font-mono text-[#737373] block mb-2">
                      (мессенджеры и профили)
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {/* Telegram */}
                      <a
                        href="https://t.me/mikhail_bachinsky"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-white hover:bg-[#EBEBEB] border border-black/10 text-xs font-medium text-[#181818] transition-colors duration-150 flex items-center gap-2 shadow-2xs group cursor-pointer"
                      >
                        <TelegramIcon className="w-3.5 h-3.5 text-[#181818]" />
                        <span>Telegram</span>
                        <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                      </a>

                      {/* ВКонтакте */}
                      <a
                        href="https://vk.com/mikhail_bachinsky"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-white hover:bg-[#EBEBEB] border border-black/10 text-xs font-medium text-[#181818] transition-colors duration-150 flex items-center gap-2 shadow-2xs group cursor-pointer"
                      >
                        <VkIcon className="w-4 h-4 text-[#181818]" />
                        <span>ВКонтакте</span>
                        <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                      </a>

                      {/* WhatsApp */}
                      <a
                        href="https://wa.me/79528842464"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-white hover:bg-[#EBEBEB] border border-black/10 text-xs font-medium text-[#181818] transition-colors duration-150 flex items-center gap-2 shadow-2xs group cursor-pointer"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#181818]" />
                        <span>WhatsApp</span>
                        <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                      </a>

                      {/* MAX */}
                      <a
                        href="https://max.im"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-white hover:bg-[#EBEBEB] border border-black/10 text-xs font-medium text-[#181818] transition-colors duration-150 flex items-center gap-2 shadow-2xs group cursor-pointer"
                      >
                        <MaxIcon className="w-3.5 h-3.5 text-[#181818]" />
                        <span>MAX</span>
                        <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                      </a>

                      {/* HeadHunter */}
                      <a
                        href="https://hh.ru"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-white hover:bg-[#EBEBEB] border border-black/10 text-xs font-medium text-[#181818] transition-colors duration-150 flex items-center gap-2 shadow-2xs group cursor-pointer"
                      >
                        <HeadHunterIcon className="w-4 h-3 text-[#181818]" />
                        <span>HeadHunter</span>
                        <ArrowUpRight className="w-3 h-3 text-[#737373]" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Локация обычным текстом */}
                <div className="pt-4 border-t border-black/10 flex items-center gap-2 text-xs sm:text-sm text-[#181818]/70">
                  <MapPin className="w-3.5 h-3.5 text-[#737373] shrink-0" />
                  <span>Томск, Россия (UTC+7)</span>
                </div>
              </div>

              {/* =========================================================
                  ПРАВАЯ КОЛОНКА (7 колонок): Форма для отправки сообщения
                  (БЕЗ лишних заголовков, кнопка слева, * Обязательные поля под полем ввода)
                  ========================================================= */}
              <div className="lg:col-span-7 bg-white/80 rounded-2xl sm:rounded-3xl border border-black/10 p-5 sm:p-7 shadow-2xs">
                {isSubmitted ? (
                  <div className="py-10 sm:py-14 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#8FE06E]/20 text-[#181818] flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-[#181818]" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-[#181818] tracking-tight">
                      Сообщение отправлено
                    </h4>
                    <p className="text-xs sm:text-sm text-[#181818]/70 max-w-md leading-relaxed">
                      Спасибо, {name}! Я получил ваше обращение и отвечу вам в ближайшее время.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setName('');
                        setContact('');
                        setMessage('');
                        setSelectedTopic(null);
                        setConsent(false);
                      }}
                      className="mt-3 px-5 py-2 rounded-xl bg-black/5 hover:bg-black/10 text-xs font-medium text-[#181818] transition-colors cursor-pointer"
                    >
                      Отправить ещё одно сообщение
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                    
                    {/* Поля Имя и Контакт в ряд */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      {/* Имя */}
                      <div>
                        <label htmlFor="contact-form-name" className="block text-xs font-medium text-[#181818] mb-1.5">
                          Ваше имя *
                        </label>
                        <input
                          id="contact-form-name"
                          type="text"
                          required
                          placeholder="Как к вам обращаться?"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 focus:border-[#181818] focus:ring-1 focus:ring-black/10 outline-none text-xs sm:text-sm text-[#181818] transition-all"
                        />
                      </div>

                      {/* Контакт */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label htmlFor="contact-form-info" className="block text-xs font-medium text-[#181818]">
                            Контакт для связи *
                          </label>
                          {channel && (
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 text-[#181818]">
                              {channel.label}
                            </span>
                          )}
                        </div>
                        <input
                          id="contact-form-info"
                          type="text"
                          required
                          placeholder="Email, @Telegram или телефон"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 focus:border-[#181818] focus:ring-1 focus:ring-black/10 outline-none text-xs sm:text-sm text-[#181818] transition-all"
                        />
                      </div>
                    </div>

                    {/* Чипы темы обращения */}
                    <div>
                      <span className="block text-xs font-medium text-[#181818] mb-2">
                        Тема проекта:
                      </span>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {TOPICS.map((topic) => {
                          const isSelected = selectedTopic === topic.key;
                          return (
                            <button
                              key={topic.key}
                              type="button"
                              onClick={() => handleTopicClick(topic)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#181818] text-white font-semibold shadow-xs'
                                  : 'bg-black/5 hover:bg-black/10 text-[#181818]/75'
                              }`}
                            >
                              {topic.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Текстовое поле сообщения */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="contact-form-msg" className="block text-xs font-medium text-[#181818]">
                          Сообщение или задача *
                        </label>
                        <span className="text-[11px] text-[#737373] tabular-nums">
                          {message.length} / 1000
                        </span>
                      </div>
                      <textarea
                        id="contact-form-msg"
                        required
                        rows={3}
                        maxLength={1000}
                        placeholder="Опишите задачу, сроки или формат сотрудничества..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/10 focus:border-[#181818] focus:ring-1 focus:ring-black/10 outline-none text-xs sm:text-sm text-[#181818] transition-all resize-none"
                      />
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[11px] text-[#737373]">
                          * Обязательные поля
                        </span>
                        {message.length > 0 && message.length < 10 && (
                          <span className="text-[11px] text-[#D32F2F]">
                            Минимум 10 символов
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Чекбокс согласия с фирменным зеленым цветом (#8FE06E) */}
                    <div>
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#181818]/80 select-none leading-relaxed group">
                        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 rounded-md border transition-all duration-150 flex items-center justify-center ${
                              consent
                                ? 'bg-[#8FE06E] border-[#8FE06E] text-[#181818]'
                                : 'bg-white border-black/20 group-hover:border-black/40'
                            }`}
                          >
                            {consent && (
                              <Check className="w-3 h-3 text-[#181818] stroke-[3]" />
                            )}
                          </div>
                        </div>
                        <span>
                          Я согласен на{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              onOpenConsent();
                            }}
                            className="text-[#181818] underline font-medium hover:opacity-80 transition-opacity"
                          >
                            обработку персональных данных
                          </button>{' '}
                          в соответствии с{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              onOpenPolicy();
                            }}
                            className="text-[#181818] underline font-medium hover:opacity-80 transition-opacity"
                          >
                            политикой конфиденциальности
                          </button>
                        </span>
                      </label>
                    </div>

                    {/* Кнопка отправки СЛЕВА */}
                    <div className="pt-2 flex justify-start">
                      <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className={`py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                          isFormValid && !isSubmitting
                            ? 'bg-[#181818] text-white hover:bg-black cursor-pointer shadow-sm'
                            : 'bg-black/10 text-black/35 cursor-not-allowed'
                        }`}
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
                )}
              </div>

            </div>

          </div>
        </FlatReveal>

      </div>
    </section>
  );
};

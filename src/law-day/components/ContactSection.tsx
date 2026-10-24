import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Send, 
  Check, 
  Copy, 
  CheckCircle2, 
  Loader2, 
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import { TelegramIcon, VkIcon, MaxIcon, WhatsAppIcon, HeadHunterIcon } from './SocialIcons';

interface ContactSectionProps {
  onOpenPolicy: () => void;
  onOpenConsent: () => void;
}

type TopicKey = 'identity' | 'event' | 'socials' | 'consultation';

const TOPICS: { key: TopicKey; label: string; template: string }[] = [
  { key: 'identity', label: 'Айдентика и бренд', template: 'Здравствуйте! Интересует разработка айдентики: ' },
  { key: 'event', label: 'Ивент-брендинг', template: 'Здравствуйте! Требуется брендинг и оформление события: ' },
  { key: 'socials', label: 'SMM и промо-кампания', template: 'Здравствуйте! Нужна промо-кампания и дизайн для соцсетей: ' },
  { key: 'consultation', label: 'Консультация', template: 'Здравствуйте! Хочу проконсультироваться по проекту: ' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenPolicy,
  onOpenConsent,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !consent) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleTopicClick = (t: { key: TopicKey; label: string; template: string }) => {
    if (selectedTopic === t.key) {
      setSelectedTopic(null);
    } else {
      setSelectedTopic(t.key);
      if (!message || TOPICS.some(item => message.startsWith(item.template))) {
        setMessage(t.template);
      }
    }
  };

  return (
    <section id="contacts" className="relative py-16 sm:py-24 border-t border-white/10 bg-transparent">
      {/* Glow highlight in center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(2, 48, 44, 0.4) 0%, rgba(1, 20, 18, 0.1) 50%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header: Left-aligned matching all other sections */}
        <div className="max-w-3xl mb-6 sm:mb-8 text-left">
          <div className="text-xs uppercase tracking-widest text-silver-bright font-mono mb-2.5 font-medium">
            Контакты
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-white mb-3 leading-tight">
            Обсудить проект
          </h2>
          <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
            Разработка визуальных систем, закрытых ивент-концепций, премиального брендинга и&nbsp;комплексной промо-упаковки под&nbsp;ключ.
          </p>
        </div>

        {/* Grid: Left Column (Author + Contacts + Buttons) and Right Column (Discussion Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Author Card, Direct Contacts & Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4 justify-between">
            
            {/* Author Card */}
            <div className="p-5 sm:p-6 border border-silver/40 frost-card-glass silver-contour shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="w-14 h-14 border border-silver/50 overflow-hidden shadow-lg shrink-0 bg-[#021817]">
                    <img 
                      src="/assets/avatar-mikhail.png" 
                      alt="Михаил Бачинский" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/vk_avatar.webp';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-xl text-white font-normal">Михаил Бачинский</h3>
                    <div className="text-xs text-white/60 font-mono mt-0.5">
                      Graphic Designer & Art Director
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed border-t border-silver/20 pt-3.5 mb-3.5 relative z-10">
                  Специализируюсь на айдентике событий, смелых бренд-метафорах, клубных спецпроектах и сложных оффлайн-носителях.
                </p>
              </div>

              {/* Location indicator embedded in author info */}
              <div className="flex items-center gap-2 pt-3 border-t border-silver/15 text-xs text-white/60 font-mono relative z-10">
                <MapPin className="w-3.5 h-3.5 text-silver-bright shrink-0" />
                <span>Томск • Проекты по всей России</span>
              </div>
            </div>

            {/* Direct Contacts: Email & Phone (Left: Visual Icon, Right: Functional Copy Button) */}
            <div className="space-y-2.5">
              {/* Email Card */}
              <div className="p-3 sm:p-3.5 border border-silver/40 frost-card-glass silver-contour shadow-md flex items-center justify-between gap-3">
                <a 
                  href="mailto:mikhail.bachinsky2004@gmail.com" 
                  className="flex items-center gap-3 min-w-0 flex-1 group"
                >
                  {/* Left: Pure visual category indicator, not an action button */}
                  <div className="w-7 h-7 bg-white/[0.04] border border-white/10 flex items-center justify-center text-silver-bright shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-white/50 font-mono">Email</div>
                    <div className="text-xs sm:text-sm text-white font-medium group-hover:text-silver-bright transition-colors break-all">
                      mikhail.bachinsky2004@gmail.com
                    </div>
                  </div>
                </a>

                {/* Right: Functional Action Button for instant copying */}
                <button
                  type="button"
                  onClick={() => copyToClipboard('mikhail.bachinsky2004@gmail.com', 'email')}
                  className="px-2.5 py-1.5 bg-white/[0.08] hover:bg-white/[0.18] active:scale-95 text-white text-xs font-mono flex items-center gap-1.5 border border-silver/40 hover:border-silver transition-all duration-200 cursor-pointer shadow-sm silver-contour-subtle shrink-0"
                  title="Скопировать почту"
                >
                  {copiedKey === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] text-emerald-300 font-medium">Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-silver-bright shrink-0" />
                      <span className="text-[11px] text-white/80">Скопировать</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-3 sm:p-3.5 border border-silver/40 frost-card-glass silver-contour shadow-md flex items-center justify-between gap-3">
                <a 
                  href="tel:+79528842464" 
                  className="flex items-center gap-3 min-w-0 flex-1 group"
                >
                  {/* Left: Pure visual category indicator, not an action button */}
                  <div className="w-7 h-7 bg-white/[0.04] border border-white/10 flex items-center justify-center text-silver-bright shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-white/50 font-mono">Телефон</div>
                    <div className="text-xs sm:text-sm text-white font-medium group-hover:text-silver-bright transition-colors">
                      +7 (952) 884-24-64
                    </div>
                  </div>
                </a>

                {/* Right: Functional Action Button for instant copying */}
                <button
                  type="button"
                  onClick={() => copyToClipboard('+7 (952) 884-24-64', 'phone')}
                  className="px-2.5 py-1.5 bg-white/[0.08] hover:bg-white/[0.18] active:scale-95 text-white text-xs font-mono flex items-center gap-1.5 border border-silver/40 hover:border-silver transition-all duration-200 cursor-pointer shadow-sm silver-contour-subtle shrink-0"
                  title="Скопировать номер"
                >
                  {copiedKey === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px] text-emerald-300 font-medium">Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-silver-bright shrink-0" />
                      <span className="text-[11px] text-white/80">Скопировать</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Messengers & Social Buttons integrated smoothly in Left Column */}
            <div className="pt-0.5">
              <div className="text-[11px] uppercase tracking-wider text-white/50 font-mono mb-2 flex items-center gap-2">
                <span>Мессенджеры и соцсети</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="https://t.me/mikhail_bachinsky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 sm:px-3.5 bg-white/[0.04] hover:bg-white/[0.12] border border-silver/40 text-white text-xs inline-flex items-center gap-2 transition-all duration-300 silver-contour-subtle shrink-0 group"
                  title="Telegram"
                >
                  <TelegramIcon className="w-3.5 h-3.5 text-silver-bright group-hover:text-white shrink-0" />
                  <span className="font-medium whitespace-nowrap">Telegram</span>
                </a>
                <a
                  href="https://vk.com/mikhail_bachinsky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 sm:px-3.5 bg-white/[0.04] hover:bg-white/[0.12] border border-silver/40 text-white text-xs inline-flex items-center gap-2 transition-all duration-300 silver-contour-subtle shrink-0 group"
                  title="ВКонтакте"
                >
                  <VkIcon className="w-3.5 h-3.5 text-silver-bright group-hover:text-white shrink-0" />
                  <span className="font-medium whitespace-nowrap">ВКонтакте</span>
                </a>
                <a
                  href="https://wa.me/79528842464"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 sm:px-3.5 bg-white/[0.04] hover:bg-white/[0.12] border border-silver/40 text-white text-xs inline-flex items-center gap-2 transition-all duration-300 silver-contour-subtle shrink-0 group"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-silver-bright group-hover:text-white shrink-0" />
                  <span className="font-medium whitespace-nowrap">WhatsApp</span>
                </a>
                <a
                  href="https://max.im"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 sm:px-3.5 bg-white/[0.04] hover:bg-white/[0.12] border border-silver/40 text-white text-xs inline-flex items-center gap-2 transition-all duration-300 silver-contour-subtle shrink-0 group"
                  title="MAX"
                >
                  <MaxIcon className="w-3.5 h-3.5 text-silver-bright group-hover:text-white shrink-0" />
                  <span className="font-medium whitespace-nowrap">MAX</span>
                </a>
                <a
                  href="https://hh.ru/resume/mikhail_bachinsky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 sm:px-3.5 bg-white/[0.04] hover:bg-white/[0.12] border border-silver/40 text-white text-xs inline-flex items-center gap-2 transition-all duration-300 silver-contour-subtle shrink-0 group"
                  title="HeadHunter (hh.ru)"
                >
                  <HeadHunterIcon className="w-3.5 h-3.5 text-silver-bright group-hover:text-white shrink-0" />
                  <span className="font-medium whitespace-nowrap">HeadHunter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Discussion Form - stretched to match bottom of buttons group */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-6 sm:p-7 lg:p-8 border border-silver/40 frost-card-glass silver-contour shadow-2xl flex flex-col justify-between h-full">
              <div className="relative z-10 mb-3.5 sm:mb-4">
                <div className="text-xs uppercase tracking-widest text-silver-bright font-mono mb-1 font-medium">
                  Форма заявки
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
                  Начать сотрудничество
                </h3>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300 relative z-10">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-luxury text-xl text-white font-normal">Сообщение отправлено!</h4>
                  <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto font-light">
                    Спасибо за интерес к проекту. Я свяжусь с вами в ближайшее время для обсуждения деталей.
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
                    className="mt-4 px-6 py-2.5 text-xs uppercase tracking-wider bg-white text-[#010e0d] font-semibold hover:bg-white/90 transition-colors cursor-pointer"
                  >
                    Отправить ещё одно
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-4.5">
                  
                  {/* Topic Selector Chips - High Contrast & Sharp */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white font-mono mb-2 font-medium">
                      Что вас интересует?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TOPICS.map((t) => (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => handleTopicClick(t)}
                          className={`px-3.5 py-2 text-xs transition-all border font-medium cursor-pointer ${
                            selectedTopic === t.key
                              ? 'bg-white text-[#010e0d] border-white font-semibold shadow-lg'
                              : 'bg-[#011e1b] text-white border-silver/50 hover:bg-[#02332e] hover:border-silver'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Contact inputs - High Contrast & Sharp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label htmlFor="input-name" className="block text-xs uppercase tracking-wider text-white font-mono mb-1.5 font-medium">
                        Ваше имя *
                      </label>
                      <input
                        id="input-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Константин"
                        className="w-full px-4 py-2.5 sm:py-3 bg-[#011413] border border-silver/60 text-white placeholder-white/45 text-xs sm:text-sm focus:outline-none focus:border-white focus:bg-[#021f1c] transition-colors shadow-inner"
                      />
                    </div>
                    <div>
                      <label htmlFor="input-contact" className="block text-xs uppercase tracking-wider text-white font-mono mb-1.5 font-medium">
                        Telegram или телефон *
                      </label>
                      <input
                        id="input-contact"
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="@username или +7..."
                        className="w-full px-4 py-2.5 sm:py-3 bg-[#011413] border border-silver/60 text-white placeholder-white/45 text-xs sm:text-sm focus:outline-none focus:border-white focus:bg-[#021f1c] transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Message Field - High Contrast & Sharp */}
                  <div>
                    <label htmlFor="input-message" className="block text-xs uppercase tracking-wider text-white font-mono mb-1.5 font-medium">
                      Описание задачи
                    </label>
                    <textarea
                      id="input-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Расскажите о проекте, сроках и задачах..."
                      className="w-full px-4 py-2.5 sm:py-3 bg-[#011413] border border-silver/60 text-white placeholder-white/45 text-xs sm:text-sm focus:outline-none focus:border-white focus:bg-[#021f1c] transition-colors resize-none shadow-inner"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <input
                      id="consent-checkbox"
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="w-3.5 h-3.5 shrink-0 rounded-none border border-silver/60 text-emerald-500 focus:ring-0 bg-[#011413] cursor-pointer"
                    />
                    <label htmlFor="consent-checkbox" className="text-[11px] sm:text-xs text-white/80 leading-normal cursor-pointer select-none">
                      Согласен с{' '}
                      <button 
                        type="button" 
                        onClick={onOpenPolicy} 
                        className="underline text-white hover:text-silver-bright cursor-pointer"
                      >
                        политикой конфиденциальности
                      </button>{' '}
                      и{' '}
                      <button 
                        type="button" 
                        onClick={onOpenConsent} 
                        className="underline text-white hover:text-silver-bright cursor-pointer"
                      >
                        обработкой персональных данных
                      </button>.
                    </label>
                  </div>

                  {/* Submit button - Sharp Rectangular */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !contact.trim() || !consent}
                    className="w-full py-3.5 px-6 text-xs uppercase tracking-wider bg-white hover:bg-white/90 text-[#010e0d] font-semibold flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <>
                        <span>Отправить запрос</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

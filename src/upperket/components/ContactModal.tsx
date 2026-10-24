import React, { useState, useEffect } from 'react';
import { X, Send, Check } from 'lucide-react';
import { CASE_STUDY_DATA } from '../data/caseStudyData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="w-full max-w-md bg-[#F9F7F2] border border-[#1C1C1C]/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-[#1C1C1C] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#1C1C1C]/15 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-sans tracking-wide text-[#1C1C1C]/60">
              Связь с&nbsp;автором проекта
            </span>
            <h3 id="contact-modal-title" className="text-xl font-editorial font-normal text-[#1C1C1C]">
              {CASE_STUDY_DATA.meta.designerName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно связи"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#1C1C1C]/60 hover:text-[#1C1C1C] hover:bg-[#F3EFE6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
            data-tooltip="Закрыть окно"
            data-tooltip-sub="Нажмите для&nbsp;отмены"
            data-tooltip-category="Форма"
            data-tooltip-icon="action"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {sent ? (
          <div className="py-8 text-center space-y-3 font-sans" role="status" aria-live="polite">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#F9F7F2]">
              <Check className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-base font-editorial font-normal text-[#1C1C1C]">
              Спасибо за&nbsp;интерес к&nbsp;проекту!
            </p>
            <p className="text-xs text-[#1C1C1C]/80 font-sans">
              Сообщение отправлено. Автор свяжется с&nbsp;вами в&nbsp;ближайшее время.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div className="space-y-1">
              <label htmlFor="contact-name" className="text-xs font-sans text-[#1C1C1C]/80 font-medium">
                Ваше имя
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иван Петров"
                autoComplete="name"
                className="w-full p-3 bg-white border border-[#1C1C1C]/15 rounded-lg text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#1C1C1C] focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-email" className="text-xs font-sans text-[#1C1C1C]/80 font-medium">
                Электронная почта
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ivan@domain.ru"
                autoComplete="email"
                className="w-full p-3 bg-white border border-[#1C1C1C]/15 rounded-lg text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#1C1C1C] focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-message" className="text-xs font-sans text-[#1C1C1C]/80 font-medium">
                Сообщение или вопрос
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Интересует тираж книги, сотрудничество или презентация..."
                className="w-full p-3 bg-white border border-[#1C1C1C]/15 rounded-lg text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#1C1C1C] focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 min-h-[44px] bg-[#1C1C1C] text-[#F9F7F2] font-medium rounded-lg hover:bg-[#2B2B2B] transition-colors inline-flex items-center justify-center gap-2 text-xs font-sans cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1C1C1C]"
            >
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Отправить обращение</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

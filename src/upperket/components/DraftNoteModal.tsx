import React, { useState } from 'react';
import { X, Check, Copy, Sparkles } from 'lucide-react';

interface DraftNoteModalProps {
  sectionName: string | null;
  onClose: () => void;
}

export const DraftNoteModal: React.FC<DraftNoteModalProps> = ({
  sectionName,
  onClose,
}) => {
  const [noteText, setNoteText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!sectionName) return null;

  const handleCopyPrompt = () => {
    const textToCopy = `Пожалуйста, доработай текстовое наполнение в блоке «${sectionName}»:\n${noteText || 'Уточнить этнографические формулировки и терминологию'}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#F9F7F2] border border-[#1C1C1C]/20 rounded-xl p-6 space-y-5 shadow-2xl text-[#1C1C1C]">
        <div className="flex items-center justify-between border-b border-[#1C1C1C]/10 pb-3">
          <div className="space-y-0.5">
            <span className="text-[11px] font-sans font-medium text-[#1C1C1C]/60">
              Пошаговая редакция черновика
            </span>
            <h3 className="text-lg font-editorial text-[#1C1C1C]">
              Правка: {sectionName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно редакции черновика"
            className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#1C1C1C]/60 hover:text-[#1C1C1C] hover:bg-[#F3EFE6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <p className="text-xs text-[#1C1C1C]/75 font-normal leading-relaxed">
          В этом окне вы можете сформулировать ваши пожелания или вставить точный текст для блока «{sectionName}». Вы можете скопировать готовое сообщение для следующего шага нашего диалога.
        </p>

        <div className="space-y-2">
          <label htmlFor="draft-note-textarea" className="text-xs font-sans font-medium text-[#1C1C1C]/80 block">
            Ваши комментарии и текст для обновления:
          </label>
          <textarea
            id="draft-note-textarea"
            name="noteText"
            autoComplete="off"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Например: Заменить формулировку на... Добавить селькупское слово... Скорректировать описание..."
            rows={4}
            className="w-full p-3 bg-white border border-[#1C1C1C]/15 rounded-lg text-sm text-[#1C1C1C] placeholder-[#1C1C1C]/40 focus:outline-none focus:border-[#1C1C1C] focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
          />
        </div>

        <div className="flex items-center justify-between pt-2 gap-3">
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="px-4 py-2.5 min-h-[44px] text-xs font-sans font-medium rounded-lg border border-[#1C1C1C]/20 text-[#1C1C1C] hover:bg-[#1C1C1C]/5 inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1C1C]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Скопировано!' : 'Скопировать запрос'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 min-h-[44px] min-w-[88px] text-xs font-medium rounded-lg bg-[#1C1C1C] text-[#F9F7F2] hover:bg-[#1C1C1C]/85 transition-colors inline-flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1C1C1C]"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Download, Printer, Check, Phone, ExternalLink, Award, Layers } from 'lucide-react';
import { CASE_META } from '../data/caseData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const resumeText = `МИХАИЛ БАЧИНСКИЙ
${CASE_META.author.role} • Студент ЮИ ТГУ
Телефон: ${CASE_META.author.phone}
VK: ${CASE_META.author.vkUrl}

О СЕБЕ:
Графический дизайнер.
Разработчик комплексной айдентики и брендбука Тьюторской службы Национального исследовательского Томского государственного университета (НИ ТГУ).

КЛЮЧЕВОЙ КЕЙС:
Тьюторская служба ТГУ (2026):
- Разработка дизайн-концепции айдентики с нуля: смысловая метафора (Маяк + буква «Т» + щит ТГУ).
- Авторская цветовая палитра «Мягкая сила» (#FFAD85, #8FE06E, #F27A93, #181818, #F1F1F1).
- Внедрение вариативного гротеска Geologica.
- Построение библиотеки стилей в Recraft AI для самостоятельной генерации иллюстраций тьюторами.
- Линейка мерча (худи, бейджи, футболки, шоперы, значки) и шаблоны для VK.

ИНСТРУМЕНТЫ:
Figma, Recraft AI, допечатная подготовка (CMYK), типографика, гайдлайны.

ОБРАЗОВАНИЕ:
Томский государственный университет, Юридический институт (ЮИ ТГУ).
`;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mikhail_Bachinsky_Resume.txt';
    link.click();
    URL.revokeObjectURL(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        id="resume-modal" 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-xl border border-[#181818]/15 overflow-hidden flex flex-col text-[#181818]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#181818]/10 bg-[#F1F1F1]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F27A93]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFAD85]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#8FE06E]" />
            <span className="ml-2 text-xs font-normal text-[#181818]">
              Резюме • Михаил Бачинский
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-[#FFAD85] text-[#181818] hover:bg-[#F29C72] transition-colors duration-150 cursor-pointer group"
            >
              <div className="w-4 h-4 relative overflow-hidden flex items-center justify-center shrink-0">
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[#181818] absolute transition-all duration-300 ease-out group-hover:translate-y-full group-hover:opacity-0" />
                    <Download className="w-4 h-4 text-[#181818] absolute transition-all duration-300 ease-out -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </>
                )}
              </div>
              <span>{copied ? 'Скачано' : 'Скачать'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-white text-[#181818] hover:bg-[#EBEBEB] border border-[#181818]/10 transition-colors duration-150 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Печать / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#181818]/60 hover:text-[#181818] hover:bg-[#EBEBEB] transition-colors duration-150 ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#181818]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#181818]/10">
            <div>
              <span className="px-3 py-1 text-xs font-normal bg-[#FFAD85]/20 text-[#181818] rounded-lg inline-block">
                {CASE_META.author.role}
              </span>
              <h2 className="text-2xl font-semibold text-[#181818] mt-2">
                {CASE_META.author.name}
              </h2>
              <p className="text-xs text-[#181818]/70 mt-1 font-normal">
                {CASE_META.author.faculty}
              </p>
            </div>

            <div className="bg-[#F1F1F1] p-3.5 rounded-xl border border-[#181818]/10 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFAD85]" />
                <a href={`tel:${CASE_META.author.phone}`} className="font-normal hover:underline">
                  {CASE_META.author.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#F27A93]" />
                <a href={CASE_META.author.vkUrl} target="_blank" rel="noreferrer" className="font-normal hover:underline">
                  vk.com/{CASE_META.author.vk}
                </a>
              </div>
            </div>
          </div>

          {/* Project Box */}
          <div className="bg-[#F1F1F1] border border-[#181818]/10 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-sm text-[#181818] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#8FE06E]" />
              Дизайн-концепт айдентики Тьюторской службы НИ&nbsp;ТГУ (2026)
            </h3>
            <p className="text-xs text-[#181818]/70 leading-relaxed font-normal">
              Разработка визуальной идентичности с&nbsp;нуля: отказ от&nbsp;сухой академичности
              в&nbsp;пользу дружелюбного «дизайна-антистресс». Создание знака (маяк + «Т»),
              палитры «Мягкая сила», шрифтовой системы, мерча и&nbsp;базы промптов для&nbsp;Recraft AI.
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#181818]/60 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#FFAD85]" />
              Навыки и&nbsp;стек
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['Figma', 'Брендбуки', 'Айдентика с\u00A0нуля', 'Recraft AI', 'Geologica', 'Допечатная подготовка CMYK', 'Мерч', 'Дизайн соцсетей'].map((s) => (
                <span key={s} className="px-2.5 py-1 text-xs bg-[#F1F1F1] border border-[#181818]/10 rounded-lg font-normal text-[#181818]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

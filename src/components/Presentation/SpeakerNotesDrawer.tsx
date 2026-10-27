import React from 'react';
import { X, BookOpen, HelpCircle, CheckCircle2 } from 'lucide-react';
import { SlideData } from '../../types/presentation';

interface NotesDrawerProps {
  slide: SlideData;
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerNotesDrawer: React.FC<NotesDrawerProps> = ({
  slide,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-950 border-l border-slate-800 shadow-2xl z-50 flex flex-col p-5 overflow-y-auto">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
            Presenter Notes & Viva Prep
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 space-y-6">
        {/* Slide Context */}
        <div>
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
            Slide {slide.topicNumber} · {slide.category}
          </span>
          <h4 className="text-base font-semibold text-slate-200 mt-0.5">{slide.title}</h4>
        </div>

        {/* Talk Track */}
        <div>
          <h5 className="text-xs font-mono uppercase text-slate-400 font-bold mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Speaking Flow & Key Emphasis
          </h5>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
            {slide.speakerNotes.map((note, index) => (
              <li key={index} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-mono font-bold shrink-0">{index + 1}.</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Viva Voce / Exam Q&A */}
        <div>
          <h5 className="text-xs font-mono uppercase text-amber-400 font-bold mb-2 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Expected Viva Voce Questions & Answers
          </h5>
          <div className="space-y-3 font-mono text-xs">
            {slide.vivaQuestions.map((viva, idx) => (
              <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="text-amber-300 font-semibold flex items-start gap-1.5">
                  <span className="shrink-0 text-slate-500">Q:</span>
                  <span>{viva.question}</span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed flex items-start gap-1.5 pt-1 border-t border-slate-800/80">
                  <span className="shrink-0 text-emerald-400 font-bold">A:</span>
                  <span>{viva.answer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CubeSat Hardware Role */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
            CubeSat Engineering Role
          </span>
          <p className="text-xs text-slate-400 leading-relaxed">
            {slide.cubeSatApplication}
          </p>
        </div>
      </div>
    </div>
  );
};

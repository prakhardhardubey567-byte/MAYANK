import React from 'react';
import { SlideData } from '../../types/presentation';
import { TeamSputnikBanner } from './TeamSputnikBanner';
import { getTopicImage } from '../../utils/topicImages';
import { Printer, ArrowLeft, Download } from 'lucide-react';

interface PrintableDeckProps {
  slides: SlideData[];
  onBack: () => void;
}

export const PrintableDeck: React.FC<PrintableDeckProps> = ({ slides, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10 font-sans print:p-0 print:bg-white print:text-black">
      {/* Top action bar (hidden in print) */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between no-print border-b border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Presentation Mode
        </button>

        <div className="flex items-center gap-3">
          <a
            href="/CubeSat_Telemetry_Avionics_Team_Sputnik.pdf"
            download="CubeSat_Telemetry_Avionics_Team_Sputnik.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold shadow-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Direct PDF (.pdf)
          </a>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold shadow-lg cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Browser Print / Save to PDF
          </button>
        </div>
      </div>

      {/* Slide Stack */}
      <div className="max-w-5xl mx-auto space-y-12 print:space-y-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-xl print-page-break print:border-none print:shadow-none print:bg-white print:text-black print:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 print:border-black pb-4 mb-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 print:text-blue-700 font-bold uppercase tracking-wider">
                  CubeSat Telemetry & Avionics · Slide {slide.topicNumber}
                </span>
                <h2 className="text-2xl font-bold font-mono text-white print:text-black mt-1">
                  {slide.title}
                </h2>
                <p className="text-sm text-slate-400 print:text-slate-600 mt-0.5">
                  {slide.subtitle}
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded bg-slate-800 print:bg-slate-100 text-slate-300 print:text-black border border-slate-700 print:border-slate-300">
                {slide.category}
              </span>
            </div>

            {/* Separate Cover Page Mission Team Banner for Print Deck */}
            {(slide.id === 0 || slide.topicNumber === '00') && (
              <div className="mb-6">
                <TeamSputnikBanner />
              </div>
            )}

            {/* Topic Reference Image */}
            <div className="mb-6 rounded-xl overflow-hidden border border-slate-800 print:border-slate-300">
              <img
                src={getTopicImage(slide).src}
                alt={slide.title}
                className="w-full h-48 sm:h-64 object-cover object-center"
              />
              <div className="p-2 bg-slate-950/80 print:bg-slate-100 text-[11px] font-mono text-slate-400 print:text-slate-600 border-t border-slate-800 print:border-slate-300">
                {getTopicImage(slide).caption}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-950/60 print:bg-slate-50 p-4 rounded-xl border border-slate-800/80 print:border-slate-200 mb-6 text-sm text-slate-300 print:text-slate-800 leading-relaxed font-mono">
              <strong>Executive Summary: </strong>
              {slide.summary}
            </div>

            {/* Key concepts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {slide.keyConcepts.map((kc, kIdx) => (
                <div key={kIdx} className="space-y-2">
                  <h4 className="text-sm font-bold font-mono text-cyan-300 print:text-blue-800">
                    {kc.heading}
                  </h4>
                  <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed whitespace-pre-line">
                    {kc.details}
                  </p>
                  {kc.highlights && (
                    <ul className="list-disc list-inside text-[11px] text-slate-400 print:text-slate-600 font-mono space-y-1">
                      {kc.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Formulas if present */}
            {slide.formulas && slide.formulas.length > 0 && (
              <div className="mb-6 space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 print:text-black font-bold">
                  Mathematical & Physics Formulas:
                </h4>
                {slide.formulas.map((form, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3 bg-slate-950/80 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300 font-mono text-xs"
                  >
                    <div className="font-bold text-amber-300 print:text-amber-800">{form.title}</div>
                    <div className="text-sm font-bold text-white print:text-black my-1 px-2 py-1 bg-black/40 print:bg-white rounded inline-block">
                      {form.expression}
                    </div>
                    <p className="text-[11px] text-slate-400 print:text-slate-700">{form.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Viva prep footer */}
            <div className="pt-4 border-t border-slate-800 print:border-slate-300 text-xs font-mono text-slate-400 print:text-slate-600 flex justify-between items-center">
              <span>Prototype Role: {slide.cubeSatApplication.slice(0, 80)}...</span>
              <span>Slide {slide.topicNumber} of {slides.length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

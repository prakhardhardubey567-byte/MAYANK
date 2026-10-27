import React from 'react';
import { Presentation, Grid, HelpCircle, Printer, BookOpen, Maximize2, Download } from 'lucide-react';

interface HeaderProps {
  currentSlideIndex: number;
  totalSlides: number;
  onOpenGrid: () => void;
  onOpenQuiz: () => void;
  onOpenPrint: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onSelectCategory: (category: string) => void;
}

export const PresentationHeader: React.FC<HeaderProps> = ({
  currentSlideIndex,
  totalSlides,
  onOpenGrid,
  onOpenQuiz,
  onOpenPrint,
  onToggleFullscreen,
  isFullscreen,
  onSelectCategory
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950 border-b border-slate-800/80 sticky top-0 z-40 select-none">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSelectCategory('All Slides');
        }}
        className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 font-mono"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
        <span>CubeSat Avionics & Telemetry</span>
        <span className="ml-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-400 border border-cyan-500/40 tracking-wider">
          TEAM SPUTNIK
        </span>
      </a>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-xs font-mono font-medium text-slate-400">
        <button
          onClick={onOpenGrid}
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Slide Index ({totalSlides})</span>
        </button>

        <button
          onClick={onOpenQuiz}
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Check</span>
        </button>

        <button
          onClick={onOpenPrint}
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / PDF Deck</span>
        </button>

        <span className="text-slate-600">|</span>

        <span className="text-slate-500 tabular-nums">
          Slide <strong className="text-slate-200">{String(currentSlideIndex + 1).padStart(2, '0')}</strong> of {totalSlides}
        </span>
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <a
          href="/CubeSat_Telemetry_Avionics_Team_Sputnik.pdf"
          download="CubeSat_Telemetry_Avionics_Team_Sputnik.pdf"
          className="px-3 py-1.5 text-xs font-mono font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 rounded-lg hover:bg-emerald-900/60 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          title="Direct Download Generated PDF (7MB)"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="text-[10px] text-emerald-400 font-normal">(7MB)</span>
        </a>

        <button
          onClick={onToggleFullscreen}
          className="px-3.5 py-1.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>{isFullscreen ? 'Exit Fullscreen' : 'Present Deck'}</span>
        </button>
      </div>
    </header>
  );
};

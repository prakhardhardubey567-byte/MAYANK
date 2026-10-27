import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  MousePointer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Keyboard
} from 'lucide-react';

interface ControlsProps {
  currentSlideIndex: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onToggleNotes: () => void;
  showNotes: boolean;
  laserPointerActive: boolean;
  onToggleLaser: () => void;
}

export const SlideControls: React.FC<ControlsProps> = ({
  currentSlideIndex,
  totalSlides,
  onNext,
  onPrev,
  onToggleNotes,
  showNotes,
  laserPointerActive,
  onToggleLaser
}) => {
  // Presentation elapsed timer
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 select-none">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-full shadow-2xl">
        {/* Navigation Previous */}
        <button
          onClick={onPrev}
          disabled={currentSlideIndex === 0}
          title="Previous Slide (← / PageUp)"
          className={`p-2 rounded-full transition-colors ${
            currentSlideIndex === 0
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Numbers */}
        <span className="text-xs font-mono px-2 text-slate-300 tabular-nums">
          <strong className="text-cyan-400 font-bold">{String(currentSlideIndex + 1).padStart(2, '0')}</strong> / {totalSlides}
        </span>

        {/* Navigation Next */}
        <button
          onClick={onNext}
          disabled={currentSlideIndex === totalSlides - 1}
          title="Next Slide (→ / Space / PageDown)"
          className={`p-2 rounded-full transition-colors ${
            currentSlideIndex === totalSlides - 1
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-slate-800 mx-1"></div>

        {/* Timer */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 px-1">
          <span className="tabular-nums font-semibold text-slate-300">{formatTime(seconds)}</span>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="hover:text-white text-slate-500"
            title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
          >
            {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            onClick={() => setSeconds(0)}
            className="hover:text-white text-slate-500"
            title="Reset Timer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        <div className="w-px h-4 bg-slate-800 mx-1"></div>

        {/* Laser pointer tool */}
        <button
          onClick={onToggleLaser}
          title="Laser Pointer (Hotkey: L)"
          className={`p-2 rounded-full transition-colors ${
            laserPointerActive
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <MousePointer className="w-3.5 h-3.5" />
        </button>

        {/* Speaker notes toggle */}
        <button
          onClick={onToggleNotes}
          title="Speaker Notes & Viva Questions (Hotkey: N)"
          className={`p-2 rounded-full transition-colors ${
            showNotes
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
        </button>

        {/* Shortcuts toggle */}
        <div className="relative">
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            title="Keyboard Shortcuts"
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>

          {showShortcuts && (
            <div className="absolute bottom-12 right-0 w-64 bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-2xl font-mono text-xs text-slate-300">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">Keyboard Shortcuts</span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between"><span>Next Slide:</span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-cyan-300">Space / →</kbd></div>
                <div className="flex justify-between"><span>Prev Slide:</span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-cyan-300">←</kbd></div>
                <div className="flex justify-between"><span>Speaker Notes:</span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-cyan-300">N</kbd></div>
                <div className="flex justify-between"><span>Laser Pointer:</span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-cyan-300">L</kbd></div>
                <div className="flex justify-between"><span>Fullscreen:</span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-cyan-300">F</kbd></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

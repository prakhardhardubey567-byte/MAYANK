import React, { useState } from 'react';
import { X, Search, Layers, ChevronRight } from 'lucide-react';
import { SlideData, SlideCategory } from '../../types/presentation';
import { SLIDE_CATEGORIES } from '../../data/slidesData';

interface GridModalProps {
  slides: SlideData[];
  currentSlideIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectSlide: (index: number) => void;
}

export const SlideGridModal: React.FC<GridModalProps> = ({
  slides,
  currentSlideIndex,
  isOpen,
  onClose,
  onSelectSlide
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('All Slides');

  if (!isOpen) return null;

  const filteredSlides = slides.filter((slide) => {
    const matchesSearch =
      slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slide.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slide.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slide.topicNumber.includes(searchTerm);
    const matchesCat = selectedCat === 'All Slides' || slide.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 select-none">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold font-mono text-white">Presentation Slide Index</h3>
            <span className="text-xs text-slate-400 font-mono">{slides.length} Full Avionics Curriculum Modules</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search slides, sensors, formulas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 w-56 sm:w-64 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="px-5 py-2.5 border-b border-slate-800/80 bg-slate-900/40 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          {SLIDE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Slide Cards Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSlides.map((slide, idx) => {
            const actualIndex = slides.findIndex((s) => s.id === slide.id);
            const isCurrent = actualIndex === currentSlideIndex;

            return (
              <button
                key={slide.id}
                onClick={() => {
                  onSelectSlide(actualIndex);
                  onClose();
                }}
                className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between group ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <span className="font-bold text-cyan-400">SLIDE {slide.topicNumber}</span>
                    <span className="text-[10px] text-slate-500">{slide.category}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {slide.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {slide.summary}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{slide.badge}</span>
                  <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Jump <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

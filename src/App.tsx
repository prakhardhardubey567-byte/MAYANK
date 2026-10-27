/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CUBESAT_SLIDES } from './data/slidesData';
import { PresentationHeader } from './components/Presentation/PresentationHeader';
import { SlideCanvas } from './components/Presentation/SlideCanvas';
import { SlideControls } from './components/Presentation/SlideControls';
import { SpeakerNotesDrawer } from './components/Presentation/SpeakerNotesDrawer';
import { SlideGridModal } from './components/Presentation/SlideGridModal';
import { QuizModal } from './components/Presentation/QuizModal';
import { PrintableDeck } from './components/Presentation/PrintableDeck';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showPrint, setShowPrint] = useState<boolean>(false);
  const [laserActive, setLaserActive] = useState<boolean>(false);
  const [laserPos, setLaserPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalSlides = CUBESAT_SLIDES.length;
  const currentSlide = CUBESAT_SLIDES[currentSlideIndex];

  // Navigation handlers
  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleSelectSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          handlePrev();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setShowNotes((prev) => !prev);
          break;
        case 'l':
        case 'L':
        case 'p':
        case 'P':
          e.preventDefault();
          setLaserActive((prev) => !prev);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          handleToggleFullscreen();
          break;
        case 'Escape':
          setShowGrid(false);
          setShowQuiz(false);
          setShowNotes(false);
          setLaserActive(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Laser Pointer Mouse Tracker
  useEffect(() => {
    if (!laserActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setLaserPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [laserActive]);

  // Fullscreen change detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Printable View Mode
  if (showPrint) {
    return (
      <PrintableDeck
        slides={CUBESAT_SLIDES}
        onBack={() => setShowPrint(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Laser Pointer Dot */}
      {laserActive && (
        <div
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${laserPos.x}px`, top: `${laserPos.y}px` }}
        >
          <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_4px_rgba(244,63,94,0.9)] animate-pulse"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      )}

      {/* Top Bar Navigation */}
      <PresentationHeader
        currentSlideIndex={currentSlideIndex}
        totalSlides={totalSlides}
        onOpenGrid={() => setShowGrid(true)}
        onOpenQuiz={() => setShowQuiz(true)}
        onOpenPrint={() => setShowPrint(true)}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
        onSelectCategory={() => setShowGrid(true)}
      />

      {/* Main Slide Content Canvas */}
      <main className="flex-1 overflow-y-auto">
        <SlideCanvas
          slide={currentSlide}
          laserPointerActive={laserActive}
          onOpenNotes={() => setShowNotes(true)}
          onNext={handleNext}
        />
      </main>

      {/* Bottom Floating Slide Controller Bar */}
      <SlideControls
        currentSlideIndex={currentSlideIndex}
        totalSlides={totalSlides}
        onNext={handleNext}
        onPrev={handlePrev}
        onToggleNotes={() => setShowNotes(!showNotes)}
        showNotes={showNotes}
        laserPointerActive={laserActive}
        onToggleLaser={() => setLaserActive(!laserActive)}
      />

      {/* Slide Navigation Index Modal */}
      <SlideGridModal
        slides={CUBESAT_SLIDES}
        currentSlideIndex={currentSlideIndex}
        isOpen={showGrid}
        onClose={() => setShowGrid(false)}
        onSelectSlide={handleSelectSlide}
      />

      {/* Speaker Notes Drawer */}
      <SpeakerNotesDrawer
        slide={currentSlide}
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
      />

      {/* Knowledge Check Quiz Modal */}
      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
      />
    </div>
  );
}

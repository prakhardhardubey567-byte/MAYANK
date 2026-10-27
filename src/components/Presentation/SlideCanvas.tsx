import React, { useState } from 'react';
import { SlideData } from '../../types/presentation';
import { BMP280Lab } from '../InteractiveLabs/BMP280Lab';
import { MPU6050Lab } from '../InteractiveLabs/MPU6050Lab';
import { UARTLab } from '../InteractiveLabs/UARTLab';
import { ADCLab } from '../InteractiveLabs/ADCLab';
import { ThermistorLab } from '../InteractiveLabs/ThermistorLab';
import { BlockDiagramLab } from '../InteractiveLabs/BlockDiagramLab';
import { GroundStationLab } from '../InteractiveLabs/GroundStationLab';
import { BlynkIoTLab } from '../InteractiveLabs/BlynkIoTLab';
import { MotionGyroLab } from '../InteractiveLabs/MotionGyroLab';
import { ESP32Lab } from '../InteractiveLabs/ESP32Lab';
import { MacIpLab } from '../InteractiveLabs/MacIpLab';
import { CeramicAntennaLab } from '../InteractiveLabs/CeramicAntennaLab';
import { NasaOpenMctLab } from '../InteractiveLabs/NasaOpenMctLab';
import { NodeBridgeLab } from '../InteractiveLabs/NodeBridgeLab';
import { TeamSputnikBanner } from './TeamSputnikBanner';
import { getTopicImage } from '../../utils/topicImages';
import { Code2, FunctionSquare, Cpu, Layers, Sparkles, ExternalLink, Image as ImageIcon, Maximize2, X, Download } from 'lucide-react';

interface SlideCanvasProps {
  slide: SlideData;
  laserPointerActive: boolean;
  onOpenNotes: () => void;
  onNext?: () => void;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  laserPointerActive,
  onOpenNotes,
  onNext
}) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const topicImg = getTopicImage(slide);

  const renderInteractiveLab = () => {
    switch (slide.interactiveLabId) {
      case 'bmp280':
        return <BMP280Lab />;
      case 'mpu6050':
        return <MPU6050Lab />;
      case 'uart':
        return <UARTLab />;
      case 'adc':
        return <ADCLab />;
      case 'thermistor':
        return <ThermistorLab />;
      case 'blockDiagram':
        return <BlockDiagramLab />;
      case 'groundStation':
        return <GroundStationLab />;
      case 'blynk':
        return <BlynkIoTLab />;
      case 'motion':
        return <MotionGyroLab />;
      case 'esp32':
        return <ESP32Lab />;
      case 'macIp':
        return <MacIpLab />;
      case 'ceramicAntenna':
        return <CeramicAntennaLab />;
      case 'nasaOpenMct':
        return <NasaOpenMctLab />;
      case 'nodeBridge':
        return <NodeBridgeLab />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full max-w-7xl mx-auto min-h-[calc(100vh-130px)] flex flex-col justify-start py-6 px-4 sm:px-8 pb-24 ${
        laserPointerActive ? 'cursor-crosshair' : ''
      }`}
    >
      {/* Slide Meta Kicker Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/40">
            MODULE {slide.topicNumber}
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>{slide.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300 font-medium">{slide.badge}</span>
          </div>
        </div>

        <button
          onClick={onOpenNotes}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
        >
          <span>Speaker Notes & Viva</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Slide Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-mono text-balance">
          {slide.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-sans mt-1.5 leading-relaxed">
          {slide.subtitle}
        </p>
      </div>

      {/* Main Slide Presentation Body */}
      <div className="space-y-6">
        {/* Dedicated Separate First Page (Slide 00) for Team Sputnik */}
        {(slide.id === 0 || slide.topicNumber === '00') && (
          <div className="space-y-4">
            <TeamSputnikBanner />
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <a
                href="/CubeSat_Telemetry_Avionics_Team_Sputnik.pdf"
                download="CubeSat_Telemetry_Avionics_Team_Sputnik.pdf"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-mono text-xs sm:text-sm font-semibold shadow-md transition-colors"
                title="Direct Download Generated PDF (7MB)"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Full Deck (.PDF)</span>
              </a>

              {onNext && (
                <button
                  onClick={onNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-mono text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Begin Presentation · Module 01</span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Topic-Supporting Technical Aerospace Visual (Replaces live data) */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl group bg-slate-950">
          <div className="relative max-h-[420px] overflow-hidden">
            <img
              src={topicImg.src}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center max-h-[420px] transform group-hover:scale-[1.015] transition-transform duration-700 cursor-zoom-in"
              onClick={() => setZoomedImage(topicImg.src)}
            />
            {/* Top kicker badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-md bg-slate-950/85 backdrop-blur-md text-cyan-300 border border-cyan-500/30 shadow-md">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>TOPIC REFERENCE VISUAL</span>
              </span>
            </div>

            {/* Top-right zoom action */}
            <button
              onClick={() => setZoomedImage(topicImg.src)}
              className="absolute top-3 right-3 p-2 rounded-lg bg-slate-950/80 backdrop-blur-md text-slate-300 hover:text-white border border-slate-700/80 transition-colors opacity-90 group-hover:opacity-100 shadow cursor-pointer"
              title="Click to view full image"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Bottom gradient caption */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-transparent flex items-end p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 w-full">
                <span className="text-xs sm:text-sm font-mono text-slate-200 bg-slate-950/85 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm">
                  {topicImg.caption}
                </span>
                <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                  Click to inspect full resolution
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-slate-200 leading-relaxed font-sans shadow-lg">
          <strong className="text-cyan-400 font-mono text-xs uppercase tracking-wider block mb-1">
            Core Thesis & Definition:
          </strong>
          {slide.summary}
        </div>

        {/* Split Concept Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {slide.keyConcepts.map((concept, index) => (
            <div
              key={index}
              className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <h3 className="text-base font-bold font-mono text-cyan-300 mb-2">
                  {concept.heading}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                  {concept.details}
                </p>
              </div>

              {concept.highlights && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1.5 font-bold">
                    Key Engineering Highlights:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {concept.highlights.map((item, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Specifications Strip if present */}
        {slide.specifications && slide.specifications.length > 0 && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-3">
              Standard Technical Specifications:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {slide.specifications.map((spec, sIdx) => (
                <div key={sIdx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block">{spec.label}</span>
                  <span className="text-slate-200 font-bold tabular-nums mt-0.5 block">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mathematical Formulas Section */}
        {slide.formulas && slide.formulas.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FunctionSquare className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                Avionics Physics & Mathematical Formulations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slide.formulas.map((formula, fIdx) => (
                <div
                  key={fIdx}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold font-mono text-amber-300">
                      {formula.title}
                    </h4>
                    <div className="my-2.5 p-3 rounded-lg bg-black/60 border border-amber-500/20 font-mono text-sm sm:text-base font-bold text-white tracking-wide overflow-x-auto">
                      {formula.expression}
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {formula.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono space-y-1">
                    {formula.variables.map((v, vIdx) => (
                      <div key={vIdx} className="flex items-baseline justify-between text-slate-400">
                        <span><strong className="text-amber-400">{v.symbol}</strong>: {v.meaning}</span>
                        {v.unit && <span className="text-slate-500 text-[10px] ml-2 shrink-0">[{v.unit}]</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Lab Widget (if slide has one) */}
        {slide.interactiveLabId && (
          <div className="pt-2">
            {renderInteractiveLab()}
          </div>
        )}

        {/* Code Snippet if present */}
        {slide.codeSnippet && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
            <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-2 text-cyan-400 font-bold">
                <Code2 className="w-4 h-4" />
                {slide.codeSnippet.title}
              </span>
              <span className="text-[10px] uppercase">{slide.codeSnippet.language}</span>
            </div>
            <pre className="p-4 text-emerald-300 overflow-x-auto text-xs leading-relaxed">
              <code>{slide.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* CubeSat Prototype Application summary box */}
        <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-4 flex items-start gap-3">
          <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs font-mono">
            <span className="text-slate-400 font-bold uppercase block mb-1">
              CubeSat 1U Prototype Mission Role:
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              {slide.cubeSatApplication}
            </p>
          </div>
        </div>
      </div>

      {/* High-Resolution Technical Image Lightbox Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-w-6xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 border-b border-slate-800 bg-slate-900/90">
              <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                {topicImg.caption}
              </span>
              <button
                onClick={() => setZoomedImage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Fullscreen View"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto flex items-center justify-center p-2 bg-black/60">
              <img
                src={zoomedImage}
                alt={slide.title}
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

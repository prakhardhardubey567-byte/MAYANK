import React, { useState, useEffect } from 'react';
import { Layout, Play, Pause, Clock } from 'lucide-react';

export const NasaOpenMctLab: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedTelemetry, setSelectedTelemetry] = useState<string>('alt');

  const [telemetryHistory, setTelemetryHistory] = useState<
    { time: string; alt: number; volt: number; temp: number; pitch: number }[]
  >([
    { time: 'T+00:10', alt: 405.2, volt: 3.98, temp: 24.1, pitch: 1.2 },
    { time: 'T+00:11', alt: 408.0, volt: 3.97, temp: 24.2, pitch: 1.8 },
    { time: 'T+00:12', alt: 411.4, volt: 3.97, temp: 24.2, pitch: 2.1 },
    { time: 'T+00:13', alt: 414.9, volt: 3.96, temp: 24.3, pitch: 0.9 },
    { time: 'T+00:14', alt: 418.3, volt: 3.95, temp: 24.3, pitch: -0.4 }
  ]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTelemetryHistory((prev) => {
        const last = prev[prev.length - 1];
        const nextSec = prev.length + 10;
        const nextTime = `T+00:${String(nextSec).padStart(2, '0')}`;
        const nextAlt = +(last.alt + (Math.random() * 3.5 - 0.5)).toFixed(1);
        const nextVolt = +(Math.max(3.5, last.volt - 0.002)).toFixed(3);
        const nextTemp = +(last.temp + (Math.random() * 0.1 - 0.04)).toFixed(1);
        const nextPitch = +(last.pitch + (Math.random() * 1.8 - 0.9)).toFixed(1);

        const updated = [...prev.slice(-12), { time: nextTime, alt: nextAlt, volt: nextVolt, temp: nextTemp, pitch: nextPitch }];
        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const latest = telemetryHistory[telemetryHistory.length - 1] || {
    alt: 418.3,
    volt: 3.95,
    temp: 24.3,
    pitch: -0.4
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Layout className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            NASA Open MCT Mission Telemetry Architecture Lab
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Mission Elapsed Time:</span>
          <span className="text-cyan-400 font-bold tabular-nums">00:00:14.28</span>
        </div>
      </div>

      {/* Open MCT Layout View */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
        {/* Open MCT Window Bar */}
        <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-wider">NASA OPEN MCT</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">CubeSat Mission Control Workspace</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-0.5 rounded bg-slate-800"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Real-Time Live' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Telemetry Dictionary Tree */}
          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
              Telemetry Dictionary
            </span>
            {[
              { id: 'alt', label: 'cubesat.alt.baro', unit: 'meters' },
              { id: 'volt', label: 'cubesat.power.vbat', unit: 'volts' },
              { id: 'temp', label: 'cubesat.env.temp', unit: '°C' },
              { id: 'pitch', label: 'cubesat.adcs.pitch', unit: 'deg' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTelemetry(item.id)}
                className={`w-full text-left p-1.5 rounded transition-colors text-[11px] truncate block ${
                  selectedTelemetry === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div>{item.label}</div>
                <div className="text-[9px] text-slate-500">[{item.unit}]</div>
              </button>
            ))}
          </div>

          {/* Time Series Telemetry Plot */}
          <div className="md:col-span-3 bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
              <span className="text-cyan-300 font-bold">
                Plot View: cubesat.{selectedTelemetry}
              </span>
              <span className="text-slate-400">
                Latest: <strong className="text-white">
                  {selectedTelemetry === 'alt' && `${latest.alt} m`}
                  {selectedTelemetry === 'volt' && `${latest.volt} V`}
                  {selectedTelemetry === 'temp' && `${latest.temp} °C`}
                  {selectedTelemetry === 'pitch' && `${latest.pitch}°`}
                </strong>
              </span>
            </div>

            {/* Simple visual SVG line plot */}
            <div className="my-3 h-28 w-full flex items-end gap-1.5 pt-4">
              {telemetryHistory.map((pt, idx) => {
                let val = pt.alt;
                let min = 400;
                let max = 440;
                if (selectedTelemetry === 'volt') { val = pt.volt; min = 3.5; max = 4.2; }
                if (selectedTelemetry === 'temp') { val = pt.temp; min = 20; max = 30; }
                if (selectedTelemetry === 'pitch') { val = pt.pitch; min = -10; max = 10; }

                const heightPct = Math.min(100, Math.max(10, ((val - min) / (max - min)) * 100));

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className="w-full bg-cyan-400/80 rounded-t-xs hover:bg-cyan-300 transition-all duration-300"
                      style={{ height: `${heightPct}%` }}
                    ></div>
                    <span className="text-[8px] text-slate-500 hidden sm:inline">{pt.time.slice(2)}</span>
                  </div>
                );
              })}
            </div>

            {/* Open MCT Time Conductor Bar */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                Time Conductor: Fixed 15-Minute Sliding Real-time Window
              </span>
              <span className="text-emerald-400">WebSocket /ws/telemetry Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

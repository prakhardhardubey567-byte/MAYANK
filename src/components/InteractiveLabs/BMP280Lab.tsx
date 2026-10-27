import React, { useState } from 'react';
import { Gauge, ArrowUpRight, Info } from 'lucide-react';

export const BMP280Lab: React.FC = () => {
  const [pressure, setPressure] = useState<number>(1013.25);
  const [seaLevelRef, setSeaLevelRef] = useState<number>(1013.25);

  // Hypsometric Barometric Altitude Formula:
  // h = 44330 * (1 - (P / P0)^(1 / 5.255))
  const altitude = 44330 * (1 - Math.pow(pressure / seaLevelRef, 1 / 5.255));
  const altitudeFeet = altitude * 3.28084;
  const atmosphericDensityApprox = (pressure / 1013.25) * 1.225; // kg/m^3

  const presets = [
    { name: 'Sea Level', p: 1013.25, note: 'Standard Sea Level' },
    { name: 'Denver (1.6 km)', p: 840, note: 'High Altitude City' },
    { name: 'Mt. Blanc (4.8 km)', p: 560, note: 'Mountain Peak' },
    { name: 'Mt. Everest (8.8 km)', p: 330, note: 'Death Zone' },
    { name: 'Near Space Balloon (25 km)', p: 25, note: 'Stratosphere' }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            BMP280 Hypsometric Altitude Calculator
          </h4>
        </div>
        <span className="text-xs font-mono text-cyan-400">Formula: h = 44330 × (1 - (P/P₀)^(1/5.255))</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Controls */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400">Measured Barometric Pressure (P)</span>
              <span className="text-cyan-300 font-bold tabular-nums text-sm">{pressure.toFixed(1)} hPa / mbar</span>
            </div>
            <input
              type="range"
              min="20"
              max="1050"
              step="0.5"
              value={pressure}
              onChange={(e) => setPressure(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>20 hPa (Stratosphere)</span>
              <span>500 hPa (~5.5 km)</span>
              <span>1013.25 hPa (Sea Level)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400">Reference Sea-Level Pressure (P₀)</span>
              <span className="text-slate-300 font-bold tabular-nums">{seaLevelRef.toFixed(1)} hPa</span>
            </div>
            <input
              type="range"
              min="980"
              max="1040"
              step="0.1"
              value={seaLevelRef}
              onChange={(e) => setSeaLevelRef(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
          </div>

          {/* Presets */}
          <div>
            <span className="text-xs text-slate-400 font-mono block mb-2">Atmospheric Presets:</span>
            <div className="flex flex-wrap gap-2">
              {presets.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setPressure(item.p)}
                  className={`text-xs px-2.5 py-1 rounded border font-mono transition-colors ${
                    Math.abs(pressure - item.p) < 1
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Computed Output Card */}
        <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">Calculated Altitude</span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-mono font-bold text-cyan-400 tabular-nums">
                {altitude.toFixed(1)}
              </span>
              <span className="text-xs font-mono text-slate-400">meters</span>
            </div>
            <div className="text-xs font-mono text-slate-500 mt-0.5 tabular-nums">
              ≈ {altitudeFeet.toFixed(0)} ft above sea level
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Air Density:</span>
              <span className="text-slate-200 tabular-nums">{atmosphericDensityApprox.toFixed(3)} kg/m³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Pressure Ratio:</span>
              <span className="text-slate-200 tabular-nums">{(pressure / seaLevelRef).toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">CubeSat Region:</span>
              <span className="text-emerald-400">
                {altitude < 2000 ? 'Troposphere (Low)' : altitude < 12000 ? 'Troposphere (Aviation)' : 'Stratosphere (Balloon)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

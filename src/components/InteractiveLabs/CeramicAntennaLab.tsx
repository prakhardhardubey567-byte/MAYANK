import React, { useState } from 'react';
import { Radio, Wifi, Compass, Layers, RotateCw } from 'lucide-react';

export const CeramicAntennaLab: React.FC = () => {
  const [dielectricConst, setDielectricConst] = useState<number>(25); // typical ceramic eps_r
  const [freqMhz, setFreqMhz] = useState<number>(1575.42); // GPS L1
  const [vswr, setVswr] = useState<number>(1.25);

  const c = 299792458; // m/s
  const freqHz = freqMhz * 1e6;
  const lambda = c / freqHz; // wavelength in meters (in air)
  const lambdaMm = lambda * 1000;

  // Quarter/half wave patch resonant dimension: L approx = c / (2 * f * sqrt(eps_r))
  const patchLengthM = c / (2 * freqHz * Math.sqrt(dielectricConst));
  const patchLengthMm = patchLengthM * 1000;

  // In air (eps_r = 1) equivalent
  const airLengthMm = (c / (2 * freqHz * 1)) * 1000;

  // Reflection coefficient Gamma from VSWR: Gamma = (VSWR - 1) / (VSWR + 1)
  const gamma = (vswr - 1) / (vswr + 1);
  const returnLossDb = -20 * Math.log10(Math.max(gamma, 0.0001));
  const powerTransmittedPct = (1 - gamma * gamma) * 100;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            Ceramic Patch Antenna & RF Dimensioning Lab
          </h4>
        </div>
        <span className="text-xs font-mono text-amber-400">Formula: L ≈ c / (2·f_r·√ε_r)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Controls */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400">Relative Permittivity of Substrate (ε_r)</span>
              <span className="text-amber-300 font-bold tabular-nums text-sm">{dielectricConst}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={dielectricConst}
              onChange={(e) => setDielectricConst(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>ε_r = 1 (Air/Vacuum)</span>
              <span>ε_r = 4.4 (FR4 PCB)</span>
              <span>ε_r = 25–40 (High-K Ceramic Patch)</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1.5">Frequency Band:</span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { name: 'GPS L1 (1575.42 MHz)', f: 1575.42 },
                { name: 'CubeSat S-Band (2400 MHz)', f: 2400 },
                { name: 'UHF Downlink (437 MHz)', f: 437 }
              ].map((b) => (
                <button
                  key={b.name}
                  onClick={() => setFreqMhz(b.f)}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    freqMhz === b.f
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Antenna VSWR (Voltage Standing Wave Ratio)</span>
              <span className="text-cyan-400 font-bold tabular-nums">{vswr.toFixed(2)} : 1</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="3.0"
              step="0.05"
              value={vswr}
              onChange={(e) => setVswr(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Output & Visual Representation */}
        <div className="md:col-span-5 bg-slate-950/90 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between font-mono text-xs">
          <div>
            <span className="text-[11px] uppercase text-slate-400 tracking-wider">
              Resonant Ceramic Patch Size
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-amber-400 tabular-nums">
                {patchLengthMm.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">mm × {patchLengthMm.toFixed(1)} mm</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Air antenna equivalent: {airLengthMm.toFixed(1)} mm (Size reduced by {(100 - (patchLengthMm / airLengthMm) * 100).toFixed(0)}%!)
            </div>
          </div>

          {/* Mini 2D Patch Diagram */}
          <div className="my-3 flex items-center justify-center">
            <div className="w-28 h-28 bg-amber-950/30 border-2 border-amber-500/80 rounded-sm relative flex items-center justify-center shadow-lg">
              <div className="w-20 h-20 bg-amber-500/20 border border-amber-400/60 rounded-xs flex flex-col items-center justify-center text-[9px] text-amber-300">
                <span>Metallic Patch</span>
                <span className="text-[8px] text-slate-400">RHCP Pol.</span>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1" title="Feed Pin"></div>
              </div>
              <span className="absolute bottom-0.5 text-[8px] text-slate-500">Ceramic Dielectric</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Return Loss:</span>
              <span className="text-emerald-400 font-bold">{returnLossDb.toFixed(1)} dB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Transmitted Power:</span>
              <span className="text-cyan-400 font-bold">{powerTransmittedPct.toFixed(1)} %</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Polarization:</span>
              <span className="text-slate-200">RHCP (Right-Hand Circular)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

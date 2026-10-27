import React, { useState } from 'react';
import { Thermometer, Zap, Layers } from 'lucide-react';

export const ThermistorLab: React.FC = () => {
  const [tempC, setTempC] = useState<number>(25);
  const [beta, setBeta] = useState<number>(3950);
  const [r0, setR0] = useState<number>(10000); // 10k at 25C
  const vcc = 3.3; // Volts

  // NTC Beta Formula: R = R0 * exp(beta * (1/T - 1/T0))
  const tempK = tempC + 273.15;
  const t0K = 298.15; // 25C in Kelvin
  const rNtc = r0 * Math.exp(beta * (1 / tempK - 1 / t0K));

  // Voltage divider with fixed resistor R_fixed = 10k connected to GND:
  // V_out = Vcc * (R_fixed / (R_ntc + R_fixed))
  const rFixed = 10000;
  const vOut = vcc * (rFixed / (rNtc + rFixed));
  const adcCount12Bit = Math.round((vOut / vcc) * 4095);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-rose-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            NTC Thermistor Beta Equation & Voltage Divider Lab
          </h4>
        </div>
        <span className="text-xs font-mono text-rose-400">1/T = 1/T₀ + (1/β)·ln(R/R₀)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-7 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400">CubeSat Bay Temperature (°C)</span>
              <span className="text-rose-300 font-bold tabular-nums text-sm">{tempC.toFixed(1)} °C ({tempK.toFixed(1)} K)</span>
            </div>
            <input
              type="range"
              min="-40"
              max="85"
              step="0.5"
              value={tempC}
              onChange={(e) => setTempC(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>-40°C (Orbital Eclipse)</span>
              <span>25°C (Room Ambient)</span>
              <span>+85°C (Direct Solar Sun)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <span className="text-slate-400 block mb-1">Thermistor Constant (β):</span>
              <select
                value={beta}
                onChange={(e) => setBeta(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded px-2 py-1.5"
              >
                <option value={3950}>β = 3950 K (Standard 10k NTC)</option>
                <option value={3435}>β = 3435 K</option>
                <option value={4200}>β = 4200 K</option>
              </select>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Reference Resistance R₀ @ 25°C:</span>
              <select
                value={r0}
                onChange={(e) => setR0(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded px-2 py-1.5"
              >
                <option value={10000}>10 kΩ (Standard)</option>
                <option value={47000}>47 kΩ</option>
                <option value={100000}>100 kΩ</option>
              </select>
            </div>
          </div>

          {/* Quick flight conditions */}
          <div>
            <span className="text-xs text-slate-400 font-mono block mb-1.5">Space Environment Scenarios:</span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { label: 'Deep Eclipse (-20°C)', temp: -20 },
                { label: 'Battery Optimal (+20°C)', temp: 20 },
                { label: 'Battery Warning (+45°C)', temp: 45 },
                { label: 'Solar Max Heat (+70°C)', temp: 70 }
              ].map((sc) => (
                <button
                  key={sc.label}
                  onClick={() => setTempC(sc.temp)}
                  className={`px-2.5 py-1 rounded border text-xs ${
                    Math.abs(tempC - sc.temp) < 1
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output card */}
        <div className="md:col-span-5 bg-slate-950/90 border border-rose-500/30 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
              NTC Resistance (Exponential Drop)
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-mono font-bold text-rose-400 tabular-nums">
                {(rNtc / 1000).toFixed(2)}
              </span>
              <span className="text-xs font-mono text-slate-400">kΩ</span>
              <span className="text-xs font-mono text-slate-500">({Math.round(rNtc)} Ω)</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Divider V_out:</span>
              <span className="text-cyan-400 font-bold tabular-nums">{vOut.toFixed(3)} V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ESP32 ADC Reading:</span>
              <span className="text-amber-400 font-bold tabular-nums">{adcCount12Bit} / 4095</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Battery Charge Gate:</span>
              <span className={tempC < 0 || tempC > 45 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {tempC < 0 ? 'LOCKED (Freeze Risk)' : tempC > 45 ? 'LOCKED (Thermal Limit)' : 'PERMITTED (Safe)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

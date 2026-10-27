import React, { useState } from 'react';
import { Cpu, Binary, Zap } from 'lucide-react';

export const ADCLab: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(1.65);
  const [attenuation, setAttenuation] = useState<number>(11); // 11 dB for 3.3V full scale

  // Full-scale voltage based on ESP32 attenuation:
  const vMaxMap: Record<number, number> = {
    0: 1.1,
    2.5: 1.5,
    6: 2.2,
    11: 3.3
  };
  const vMax = vMaxMap[attenuation] || 3.3;

  // 12-bit resolution: 2^12 = 4096 levels (0 to 4095)
  const clampedVoltage = Math.min(voltage, vMax);
  const digitalCount = Math.min(4095, Math.floor((clampedVoltage / vMax) * 4095));
  const lsbMv = (vMax / 4096) * 1000;
  const binary12bit = digitalCount.toString(2).padStart(12, '0');
  const hexValue = '0x' + digitalCount.toString(16).toUpperCase().padStart(3, '0');

  // Quantization error
  const reconstructedV = (digitalCount / 4095) * vMax;
  const quantizationErrorMv = (clampedVoltage - reconstructedV) * 1000;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Binary className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            ESP32 12-Bit SAR ADC Quantization & Voltage Converter
          </h4>
        </div>
        <span className="text-xs font-mono text-amber-400">Resolution: 2¹² = 4096 Steps</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Sliders & Controls */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400">Input Analog Voltage (V_in on GPIO Pin)</span>
              <span className="text-amber-300 font-bold tabular-nums text-sm">{voltage.toFixed(3)} V</span>
            </div>
            <input
              type="range"
              min="0"
              max="3.3"
              step="0.005"
              value={voltage}
              onChange={(e) => setVoltage(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0.000 V (GND)</span>
              <span>1.650 V (Half-Scale)</span>
              <span>3.300 V (Full 3.3V Rail)</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1.5">
              ESP32 Programmable Attenuation Setting:
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs font-mono">
              {[
                { db: 0, max: '1.1V' },
                { db: 2.5, max: '1.5V' },
                { db: 6, max: '2.2V' },
                { db: 11, max: '3.3V (Default)' }
              ].map((item) => (
                <button
                  key={item.db}
                  onClick={() => setAttenuation(item.db)}
                  className={`py-2 px-1 text-center rounded border transition-colors ${
                    attenuation === item.db
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div>{item.db} dB</div>
                  <div className="text-[10px] text-slate-500">{item.max}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick voltage presets */}
          <div>
            <span className="text-xs text-slate-400 font-mono block mb-1.5">CubeSat Voltage Rails:</span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { name: 'GND (0V)', v: 0 },
                { name: '1.1V Bandgap', v: 1.1 },
                { name: '1.8V Sensor Rail', v: 1.8 },
                { name: '2.5V Half Divider', v: 2.5 },
                { name: '3.3V Full VCC', v: 3.3 }
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => setVoltage(p.v)}
                  className="bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-700 text-slate-300"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quantized Output Readout */}
        <div className="md:col-span-5 bg-slate-950/90 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
              Raw 12-Bit Digital Integer
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-mono font-bold text-amber-400 tabular-nums">
                {digitalCount}
              </span>
              <span className="text-xs font-mono text-slate-500">/ 4095 counts</span>
            </div>
            <div className="text-xs font-mono text-slate-300 mt-1">
              Hex: <span className="font-bold text-amber-300">{hexValue}</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 break-all">
              Binary: <span className="text-amber-300">{binary12bit.slice(0, 4)} {binary12bit.slice(4, 8)} {binary12bit.slice(8, 12)}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">LSB Step Size:</span>
              <span className="text-slate-200 tabular-nums font-bold">{lsbMv.toFixed(3)} mV / step</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Reconstructed V:</span>
              <span className="text-emerald-400 tabular-nums">{reconstructedV.toFixed(3)} V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Quantization Error:</span>
              <span className="text-slate-300 tabular-nums">{quantizationErrorMv.toFixed(2)} mV</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Clipping State:</span>
              <span className={voltage > vMax ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                {voltage > vMax ? 'CLIPPED (Over-range)' : 'Linear Dynamic Range'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

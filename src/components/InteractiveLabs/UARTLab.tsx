import React, { useState } from 'react';
import { Activity, Cpu, Clock } from 'lucide-react';

export const UARTLab: React.FC = () => {
  const [character, setCharacter] = useState<string>('C');
  const [baudRate, setBaudRate] = useState<number>(115200);
  const [parity, setParity] = useState<'none' | 'even' | 'odd'>('none');

  // Convert character to 8-bit ASCII
  const asciiCode = character.charCodeAt(0) || 67; // 'C' is 67
  const binaryString = asciiCode.toString(2).padStart(8, '0'); // MSB to LSB
  const bitsLSB = binaryString.split('').reverse(); // LSB to MSB for UART transmission

  // Count 1s for parity
  const onesCount = binaryString.split('').filter((b) => b === '1').length;
  let parityBit = 0;
  if (parity === 'even') {
    parityBit = onesCount % 2 === 0 ? 0 : 1;
  } else if (parity === 'odd') {
    parityBit = onesCount % 2 === 0 ? 1 : 0;
  }

  // Bit period in microseconds
  const bitTimeUs = (1 / baudRate) * 1000000;
  const totalBits = 1 + 8 + (parity !== 'none' ? 1 : 0) + 1;
  const frameTimeUs = totalBits * bitTimeUs;
  const byteRate = Math.floor(baudRate / totalBits);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            Interactive UART Oscilloscope Timing & Packet Framer
          </h4>
        </div>
        <span className="text-xs font-mono text-emerald-400">8-N-1 Hardware Standard</span>
      </div>

      {/* Control bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1">Input Character to Transmit:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              maxLength={1}
              value={character}
              onChange={(e) => setCharacter(e.target.value.slice(-1) || 'C')}
              className="w-16 bg-slate-950 border border-slate-700 text-center font-mono text-lg font-bold text-emerald-300 rounded-lg py-1 uppercase"
            />
            <div className="text-xs font-mono text-slate-400">
              <div>ASCII: <span className="text-white font-bold">{asciiCode}</span> (0x{asciiCode.toString(16).toUpperCase()})</div>
              <div>Binary: <span className="text-white">{binaryString}</span></div>
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1">Baud Rate (bps):</label>
          <select
            value={baudRate}
            onChange={(e) => setBaudRate(parseInt(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 font-mono text-xs text-white rounded-lg px-2.5 py-2"
          >
            <option value={9600}>9600 baud (GPS standard)</option>
            <option value={19200}>19200 baud</option>
            <option value={38400}>38400 baud</option>
            <option value={57600}>57600 baud</option>
            <option value={115200}>115200 baud (ESP32 USB)</option>
            <option value={921600}>921600 baud (High-Speed Dump)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1">Parity Configuration:</label>
          <div className="flex gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
            {(['none', 'even', 'odd'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setParity(p)}
                className={`flex-1 text-xs py-1 rounded font-mono uppercase transition-colors ${
                  parity === p ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Oscilloscope Bitstream Waveform Visualization */}
      <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>TX Wire Voltage (TTL 3.3V / 0V)</span>
          <span>Time Axis → (LSB Transmitted First)</span>
        </div>

        {/* Oscilloscope timeline blocks */}
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[550px] items-stretch gap-1 h-20 text-center font-mono text-xs">
            {/* Idle state */}
            <div className="w-12 flex flex-col justify-between border-r border-dashed border-slate-700 bg-slate-900/40">
              <span className="text-[10px] text-slate-500">IDLE</span>
              <div className="h-0.5 bg-emerald-400 w-full"></div>
              <span className="text-[9px] text-slate-500">HIGH (3.3V)</span>
            </div>

            {/* Start bit */}
            <div className="flex-1 bg-rose-950/30 border border-rose-500/50 rounded flex flex-col justify-between p-1">
              <span className="text-[10px] text-rose-300 font-bold">START</span>
              <div className="h-0.5 bg-rose-500 w-full mt-auto mb-1"></div>
              <span className="text-xs font-bold text-rose-400">0</span>
            </div>

            {/* 8 Data Bits LSB to MSB */}
            {bitsLSB.map((bitVal, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded flex flex-col justify-between p-1 border ${
                  bitVal === '1'
                    ? 'bg-emerald-950/30 border-emerald-500/40'
                    : 'bg-slate-900/60 border-slate-700'
                }`}
              >
                <span className="text-[9px] text-slate-400">D{idx}</span>
                <div
                  className={`h-0.5 w-full ${
                    bitVal === '1' ? 'bg-emerald-400 mb-auto mt-1' : 'bg-slate-500 mt-auto mb-1'
                  }`}
                ></div>
                <span className={`text-xs font-bold ${bitVal === '1' ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {bitVal}
                </span>
              </div>
            ))}

            {/* Parity bit if enabled */}
            {parity !== 'none' && (
              <div className="flex-1 bg-amber-950/30 border border-amber-500/50 rounded flex flex-col justify-between p-1">
                <span className="text-[9px] text-amber-300 font-bold">PAR</span>
                <div
                  className={`h-0.5 w-full ${
                    parityBit === 1 ? 'bg-amber-400 mb-auto mt-1' : 'bg-amber-500 mt-auto mb-1'
                  }`}
                ></div>
                <span className="text-xs font-bold text-amber-400">{parityBit}</span>
              </div>
            )}

            {/* Stop bit */}
            <div className="flex-1 bg-cyan-950/30 border border-cyan-500/50 rounded flex flex-col justify-between p-1">
              <span className="text-[10px] text-cyan-300 font-bold">STOP</span>
              <div className="h-0.5 bg-cyan-400 w-full mb-auto mt-1"></div>
              <span className="text-xs font-bold text-cyan-300">1</span>
            </div>
          </div>
        </div>

        {/* Timing Specs */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-3 border-t border-slate-800">
          <div>
            <span className="text-slate-500 block text-[10px]">1-Bit Duration (T_bit):</span>
            <span className="text-emerald-400 font-bold tabular-nums">{bitTimeUs.toFixed(2)} µs</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Full Frame Duration:</span>
            <span className="text-slate-200 font-bold tabular-nums">{frameTimeUs.toFixed(1)} µs</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Max Transfer Rate:</span>
            <span className="text-slate-200 font-bold tabular-nums">{byteRate.toLocaleString()} B/s</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Total Bits Per Byte:</span>
            <span className="text-slate-200 font-bold tabular-nums">{totalBits} bits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Smartphone, Cloud, Layers, RefreshCw, Send } from 'lucide-react';

export const BlynkIoTLab: React.FC = () => {
  const [altVal, setAltVal] = useState<number>(420.5);
  const [tempVal, setTempVal] = useState<number>(26.4);
  const [battVal, setBattVal] = useState<number>(3.95);
  const [telecommandToggle, setTelecommandToggle] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<string>('Connected');

  const virtualPins = [
    { pin: 'V0', name: 'Altitude (Baro)', val: `${altVal.toFixed(1)} m`, widget: 'Radial Gauge' },
    { pin: 'V1', name: 'Electronics Temp', val: `${tempVal.toFixed(1)} °C`, widget: 'Value Display' },
    { pin: 'V2', name: 'LiPo Battery Voltage', val: `${battVal.toFixed(2)} V`, widget: 'Level Meter' },
    { pin: 'V3', name: 'Beacon Active State', val: telecommandToggle ? 'ACTIVE' : 'STANDBY', widget: 'Status LED' },
    { pin: 'V4', name: 'Ground Track GPS', val: '28.6139° N, 77.2090° E', widget: 'Map Pin' }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            Blynk IoT Virtual Pin (V-Pin) Mapping Simulator
          </h4>
        </div>
        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          Blynk Cloud: {syncStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Virtual Pin Table */}
        <div className="md:col-span-7 space-y-3">
          <span className="text-xs font-mono text-slate-400 block">
            ESP32 Firmware Datastreams (Blynk.virtualWrite):
          </span>
          <div className="space-y-2">
            {virtualPins.map((vp) => (
              <div
                key={vp.pin}
                className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between font-mono text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                    {vp.pin}
                  </span>
                  <span className="text-slate-300 font-medium">{vp.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-[10px] hidden sm:inline">{vp.widget}</span>
                  <span className="text-cyan-300 font-bold tabular-nums">{vp.val}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Test controls */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setAltVal((prev) => prev + 5);
                setTempVal((prev) => prev + 0.3);
              }}
              className="text-xs font-mono px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            >
              Simulate Altitude Climb (+5m)
            </button>
            <button
              onClick={() => setTelecommandToggle(!telecommandToggle)}
              className="text-xs font-mono px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            >
              Toggle Beacon Switch (V3)
            </button>
          </div>
        </div>

        {/* Simulated Smartphone Blynk Mobile App View */}
        <div className="md:col-span-5 bg-slate-950/95 border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between max-w-[240px] mx-auto w-full shadow-xl">
          <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-emerald-400" />
              Blynk Mobile App
            </span>
            <span className="text-[9px] font-mono text-emerald-400">100% Sync</span>
          </div>

          <div className="my-3 space-y-2.5 font-mono">
            {/* Widget 1 */}
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-500 uppercase block">Altitude [V0]</span>
              <div className="text-lg font-bold text-cyan-400 tabular-nums">{altVal.toFixed(1)} m</div>
            </div>

            {/* Widget 2 */}
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[9px] text-slate-500 uppercase block">Temp [V1]</span>
                <span className="text-sm font-bold text-rose-400">{tempVal.toFixed(1)}°C</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase block">Battery [V2]</span>
                <span className="text-sm font-bold text-emerald-400">{battVal.toFixed(2)}V</span>
              </div>
            </div>

            {/* Switch Widget */}
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-[9px] text-slate-400">Beacon Transmitter</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                telecommandToggle ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
              }`}>
                {telecommandToggle ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>

          <div className="text-center text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-800">
            Hardware: ESP32 WiFi / Auth Token Linked
          </div>
        </div>
      </div>
    </div>
  );
};

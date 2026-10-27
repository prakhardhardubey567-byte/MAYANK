import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, ArrowRight, Radio, Server, CheckCircle2, Play, Pause } from 'lucide-react';

export const NodeBridgeLab: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [packetCount, setPacketCount] = useState<number>(382);
  const [wsClientsCount, setWsClientsCount] = useState<number>(3);
  const [serialPortName, setSerialPortName] = useState<string>('COM3');
  const [wsPort, setWsPort] = useState<number>(8080);

  const [bridgeLogs, setBridgeLogs] = useState<string[]>([
    '[INIT] node bridge.js running (Node.js v20.x)',
    '[SERIAL] Opened USB-UART serial port COM3 @ 115200 baud',
    '[WS] WebSocket telemetry broadcast server active on ws://localhost:8080',
    '[CLIENT] NASA Open MCT client connected from 127.0.0.1:5173',
    '[RX -> WS] Telemetry packet #380 broadcast to 3 clients',
    '[RX -> WS] Telemetry packet #381 broadcast to 3 clients'
  ]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setPacketCount((c) => {
        const next = c + 1;
        const logLine = `[SERIAL RX] byte_len=42 -> [WS BROADCAST] pkt=${next} alt=${(410 + Math.random() * 5).toFixed(1)}m to ${wsClientsCount} clients`;
        setBridgeLogs((prev) => [...prev.slice(-6), logLine]);
        return next;
      });
    }, 1600);

    return () => clearInterval(interval);
  }, [isRunning, wsClientsCount]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            Node.js bridge.js (Serial-to-WebSocket Middleware) Lab
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded border ${
              isRunning
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isRunning ? 'Bridge Active' : 'Bridge Paused'}</span>
          </button>
        </div>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex-1 w-full">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">1. Hardware Node</span>
            <span className="text-white font-bold block mt-0.5">ESP32 Type-C</span>
            <span className="text-cyan-400 text-[10px]">USB COM3 @ 115200</span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block shrink-0" />

          <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-lg flex-1 w-full shadow-lg">
            <span className="text-[10px] text-emerald-400 uppercase block font-bold">2. node bridge.js</span>
            <span className="text-white font-bold block mt-0.5">SerialPort + WS Server</span>
            <span className="text-emerald-300 text-[10px]">Pipes JSON lines to WS</span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block shrink-0" />

          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex-1 w-full">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">3. Client Web Apps</span>
            <span className="text-white font-bold block mt-0.5">NASA Open MCT / GUI</span>
            <span className="text-indigo-400 text-[10px]">ws://localhost:{wsPort}</span>
          </div>
        </div>
      </div>

      {/* Live Bridge Terminal */}
      <div className="bg-black/95 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 h-28 overflow-y-auto space-y-1 mb-4">
        {bridgeLogs.map((log, idx) => (
          <div
            key={idx}
            className={`${
              log.includes('SERIAL')
                ? 'text-cyan-400'
                : log.includes('WS')
                ? 'text-emerald-400'
                : log.includes('CLIENT')
                ? 'text-amber-300'
                : 'text-slate-400'
            }`}
          >
            {log}
          </div>
        ))}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase block">Packets Bridged:</span>
          <span className="text-cyan-400 font-bold tabular-nums text-sm">#{packetCount}</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase block">Connected Sockets:</span>
          <span className="text-emerald-400 font-bold tabular-nums text-sm">{wsClientsCount} Apps</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase block">Serial Inflow Baud:</span>
          <span className="text-slate-200 font-bold text-sm">115,200 bps</span>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase block">Socket Latency:</span>
          <span className="text-emerald-400 font-bold text-sm">&lt; 1 ms</span>
        </div>
      </div>
    </div>
  );
};

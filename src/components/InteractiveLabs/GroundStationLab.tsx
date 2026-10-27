import React, { useState, useEffect } from 'react';
import { Terminal, Send, Radio, Wifi, Database, AlertCircle, Play, Pause, RefreshCw } from 'lucide-react';

export const GroundStationLab: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [packetCount, setPacketCount] = useState<number>(142);
  const [rssi, setRssi] = useState<number>(-68); // dBm
  const [altitude, setAltitude] = useState<number>(412.5); // meters
  const [pressure, setPressure] = useState<number>(965.2); // hPa
  const [temperature, setTemperature] = useState<number>(24.8); // C
  const [vbat, setVbat] = useState<number>(3.84); // V
  const [pitch, setPitch] = useState<number>(2.4);
  const [roll, setRoll] = useState<number>(-1.8);
  const [commandInput, setCommandInput] = useState<string>('');
  
  // Terminal log lines
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Ground Station ESP32 Type-C ready on COM3 @ 115200 baud',
    '[COMM] RF Receiver listening on 2.4 GHz ESP-NOW MAC: 24:6F:28:B4:7A:10',
    '[OK] Telemetry packet #140 received (len: 38 bytes, CRC: 0x9A4F, RSSI: -67 dBm)',
    '[OK] Telemetry packet #141 received (len: 38 bytes, CRC: 0xE112, RSSI: -68 dBm)'
  ]);

  // Periodic telemetry packet streaming
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setPacketCount((prev) => {
        const nextId = prev + 1;
        const nextAlt = +(altitude + (Math.random() * 2 - 0.95)).toFixed(1);
        const nextPress = +(pressure - (Math.random() * 0.2 - 0.1)).toFixed(1);
        const nextTemp = +(temperature + (Math.random() * 0.2 - 0.1)).toFixed(1);
        const nextPitch = +(pitch + (Math.random() * 1.5 - 0.75)).toFixed(1);
        const nextRoll = +(roll + (Math.random() * 1.5 - 0.75)).toFixed(1);
        const nextRssi = Math.floor(-65 - Math.random() * 8);

        setAltitude(nextAlt);
        setPressure(nextPress);
        setTemperature(nextTemp);
        setPitch(nextPitch);
        setRoll(nextRoll);
        setRssi(nextRssi);

        const newLog = `{"pkt":${nextId},"alt":${nextAlt},"press":${nextPress},"temp":${nextTemp},"pitch":${nextPitch},"roll":${nextRoll},"vbat":${vbat},"rssi":${nextRssi}}`;
        setLogs((prevLogs) => [...prevLogs.slice(-6), newLog]);

        return nextId;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning, altitude, pressure, temperature, pitch, roll, vbat]);

  const handleSendCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    setLogs((prev) => [
      ...prev.slice(-6),
      `>>> [UPLINK TC] ${cmd.toUpperCase()} sent via ESP-NOW to CubeSat OBC`,
      `<<< [DOWNLINK ACK] CubeSat ACK: Command ${cmd.toUpperCase()} accepted`
    ]);
    setCommandInput('');
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            Ground Station Mission Control & Telemetry Stream
          </h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono ${
              isRunning
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isRunning ? 'Streaming Live' : 'Paused'}
          </button>
        </div>
      </div>

      {/* Real-time telemetry gauge cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
          <span className="text-[10px] text-slate-500 uppercase block">Baro Altitude</span>
          <div className="text-xl font-bold text-cyan-400 tabular-nums">{altitude.toFixed(1)} m</div>
          <span className="text-[10px] text-slate-400">{pressure.toFixed(1)} hPa</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
          <span className="text-[10px] text-slate-500 uppercase block">Avionics Temp</span>
          <div className="text-xl font-bold text-rose-400 tabular-nums">{temperature.toFixed(1)} °C</div>
          <span className="text-[10px] text-slate-400">DHT11 / NTC Safe</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
          <span className="text-[10px] text-slate-500 uppercase block">Attitude (P / R)</span>
          <div className="text-xl font-bold text-indigo-400 tabular-nums">
            {pitch > 0 ? `+${pitch}` : pitch}° / {roll > 0 ? `+${roll}` : roll}°
          </div>
          <span className="text-[10px] text-slate-400">MPU6050 6-DoF</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
          <span className="text-[10px] text-slate-500 uppercase block">RF Signal (RSSI)</span>
          <div className="text-xl font-bold text-emerald-400 tabular-nums">{rssi} dBm</div>
          <span className="text-[10px] text-slate-400">Packets: #{packetCount}</span>
        </div>
      </div>

      {/* Serial Packet Terminal Feed */}
      <div className="bg-black/90 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 space-y-1 h-32 overflow-y-auto mb-3">
        {logs.map((line, idx) => (
          <div
            key={idx}
            className={`${
              line.startsWith('>>>')
                ? 'text-cyan-400 font-semibold'
                : line.startsWith('<<<')
                ? 'text-amber-400 font-semibold'
                : line.includes('pkt')
                ? 'text-emerald-400'
                : 'text-slate-400'
            }`}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Telecommand Uplink Dispatcher */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type telecommand (e.g. PING, REBOOT, RATE_5HZ, CAL_IMU)..."
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendCommand(commandInput)}
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          onClick={() => handleSendCommand(commandInput)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold"
        >
          <Send className="w-3.5 h-3.5" />
          Uplink
        </button>
      </div>

      {/* Quick command buttons */}
      <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-slate-800">
        {['PING', 'CAL_IMU', 'POLL_1HZ', 'SAFE_MODE'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleSendCommand(cmd)}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

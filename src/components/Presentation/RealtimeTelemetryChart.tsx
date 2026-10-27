import React, { useState, useEffect, useRef } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Radio,
  Compass,
  Thermometer,
  Gauge,
  ChevronDown,
  ChevronUp,
  Cpu,
  Terminal,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

export interface TelemetryPoint {
  time: string;
  packetId: number;
  altitude: number; // meters (BMP280)
  pressure: number; // hPa (BMP280)
  temperature: number; // °C (BMP280 / Thermistor)
  pitch: number; // degrees (MPU6050)
  roll: number; // degrees (MPU6050)
  vbat: number; // Volts (ADC / EPS)
  solarCurrent: number; // mA (ADC / Solar Array)
  rssi: number; // dBm (ESP-NOW / Wi-Fi)
}

type TelemetryMode = 'all' | 'altitude_pressure' | 'attitude' | 'power_thermal';
type OrbitScenario = 'nominal' | 'eclipse' | 'tumble';

const INITIAL_TIME = new Date();

function formatTime(date: Date): string {
  return date.toTimeString().split(' ')[0];
}

const generateInitialData = (): TelemetryPoint[] => {
  const points: TelemetryPoint[] = [];
  const baseTime = new Date(INITIAL_TIME.getTime() - 24 * 1200);

  let alt = 412.0;
  let press = 965.2;
  let temp = 24.5;
  let pitch = 2.1;
  let roll = -1.5;
  let vbat = 3.92;
  let solar = 280;
  let rssi = -64;

  for (let i = 0; i < 20; i++) {
    const pointTime = new Date(baseTime.getTime() + i * 1200);
    alt += (Math.random() - 0.48) * 1.5;
    press += (Math.random() - 0.52) * 0.4;
    temp += (Math.random() - 0.5) * 0.2;
    pitch += (Math.random() - 0.5) * 1.2;
    roll += (Math.random() - 0.5) * 1.2;
    vbat += (Math.random() - 0.51) * 0.005;
    solar += Math.floor((Math.random() - 0.5) * 10);
    rssi = Math.floor(-62 - Math.random() * 8);

    points.push({
      time: formatTime(pointTime),
      packetId: 100 + i,
      altitude: +alt.toFixed(1),
      pressure: +press.toFixed(1),
      temperature: +temp.toFixed(1),
      pitch: +pitch.toFixed(1),
      roll: +roll.toFixed(1),
      vbat: +vbat.toFixed(2),
      solarCurrent: Math.max(0, solar),
      rssi
    });
  }
  return points;
};

interface RealtimeTelemetryChartProps {
  slideTitle?: string;
  className?: string;
}

export const RealtimeTelemetryChart: React.FC<RealtimeTelemetryChartProps> = ({
  slideTitle,
  className = ''
}) => {
  const [data, setData] = useState<TelemetryPoint[]>(generateInitialData);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [sampleRate, setSampleRate] = useState<number>(1000); // ms
  const [activeMode, setActiveMode] = useState<TelemetryMode>('all');
  const [scenario, setScenario] = useState<OrbitScenario>('nominal');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showRawPacket, setShowRawPacket] = useState<boolean>(false);
  const packetCounterRef = useRef<number>(120);

  // Real-time generator loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setData((prevData) => {
        const last = prevData[prevData.length - 1] || {
          altitude: 412,
          pressure: 965,
          temperature: 24,
          pitch: 0,
          roll: 0,
          vbat: 3.9,
          solarCurrent: 280,
          rssi: -65
        };

        packetCounterRef.current += 1;
        const now = new Date();

        let dAlt = (Math.random() - 0.48) * 1.8;
        let dPress = -dAlt * 0.12 + (Math.random() - 0.5) * 0.2;
        let dTemp = (Math.random() - 0.5) * 0.25;
        let dPitch = (Math.random() - 0.5) * 1.5;
        let dRoll = (Math.random() - 0.5) * 1.5;
        let dVbat = -0.002 + (Math.random() - 0.5) * 0.003;
        let dSolar = (Math.random() - 0.5) * 12;

        if (scenario === 'eclipse') {
          // Solar array drops, temp cools, battery discharges
          dSolar = -20;
          dTemp = -0.4;
          dVbat = -0.01;
        } else if (scenario === 'tumble') {
          // Attitude spins rapidly
          dPitch = Math.sin(packetCounterRef.current * 0.4) * 8;
          dRoll = Math.cos(packetCounterRef.current * 0.4) * 9;
        }

        const nextAlt = +(Math.max(300, Math.min(650, last.altitude + dAlt))).toFixed(1);
        const nextPress = +(Math.max(920, Math.min(1013, last.pressure + dPress))).toFixed(1);
        const nextTemp = +(Math.max(-10, Math.min(50, last.temperature + dTemp))).toFixed(1);
        const nextPitch = +(Math.max(-45, Math.min(45, last.pitch + dPitch))).toFixed(1);
        const nextRoll = +(Math.max(-45, Math.min(45, last.roll + dRoll))).toFixed(1);
        const nextVbat = +(Math.max(3.2, Math.min(4.2, last.vbat + dVbat))).toFixed(2);
        const nextSolar = Math.round(
          Math.max(0, Math.min(380, scenario === 'eclipse' ? Math.max(0, last.solarCurrent - 15) : last.solarCurrent + dSolar))
        );
        const nextRssi = Math.floor(-58 - Math.random() * 14);

        const newPoint: TelemetryPoint = {
          time: formatTime(now),
          packetId: packetCounterRef.current,
          altitude: nextAlt,
          pressure: nextPress,
          temperature: nextTemp,
          pitch: nextPitch,
          roll: nextRoll,
          vbat: nextVbat,
          solarCurrent: nextSolar,
          rssi: nextRssi
        };

        const trimmed = [...prevData.slice(-24), newPoint];
        return trimmed;
      });
    }, sampleRate);

    return () => clearInterval(interval);
  }, [isPlaying, sampleRate, scenario]);

  const handleReset = () => {
    packetCounterRef.current = 100;
    setData(generateInitialData());
  };

  const latest = data[data.length - 1] || {
    altitude: 412.0,
    pressure: 965.2,
    temperature: 24.5,
    pitch: 0,
    roll: 0,
    vbat: 3.92,
    solarCurrent: 275,
    rssi: -64,
    packetId: 100
  };

  const rawJsonPacket = JSON.stringify(
    {
      telemetry_sync: '0xAA55',
      pkt_id: latest.packetId,
      subsystem: 'ESP32_OBC_V2',
      sensors: {
        bmp280: { alt_m: latest.altitude, baro_hpa: latest.pressure },
        mpu6050: { pitch_deg: latest.pitch, roll_deg: latest.roll },
        power: { vbat_v: latest.vbat, solar_ma: latest.solarCurrent },
        thermal: { ntc_c: latest.temperature }
      },
      link: { rssi_dbm: latest.rssi, protocol: 'ESP-NOW / 2.4GHz' }
    },
    null,
    2
  );

  return (
    <div
      className={`bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 text-slate-100 shadow-2xl backdrop-blur-sm transition-all duration-300 ${className}`}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span
              className={`w-3 h-3 rounded-full ${
                isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
              } absolute`}
            />
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isPlaying ? 'bg-emerald-400' : 'bg-amber-400'
              } relative z-10`}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold font-mono text-cyan-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                Live ESP32 Telemetry Stream
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 uppercase">
                Recharts Real-Time
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Sensor Buses: I2C (BMP280/MPU6050) · ADC (Thermistor/EPS Vbat) · ESP-NOW Downlink
            </p>
          </div>
        </div>

        {/* Global stream actions */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono transition-colors ${
              isPlaying
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/60'
                : 'bg-amber-950/60 text-amber-300 border-amber-500/50 hover:bg-amber-900/60'
            }`}
            title={isPlaying ? 'Pause telemetry streaming' : 'Resume live telemetry'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Streaming' : 'Paused'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-950 rounded-lg border border-slate-800 transition-colors"
            title="Reset telemetry buffer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-950 text-slate-300 hover:text-cyan-400 rounded-lg border border-slate-800 transition-colors"
          >
            <span className="text-[11px]">{isExpanded ? 'Collapse' : 'Expand'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Subsystem Metric HUD Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 my-3.5">
            {/* BMP280 Altitude */}
            <div
              onClick={() => setActiveMode('altitude_pressure')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                activeMode === 'altitude_pressure' || activeMode === 'all'
                  ? 'bg-cyan-950/30 border-cyan-500/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                <span className="flex items-center gap-1 font-bold">
                  <Gauge className="w-3 h-3" /> BMP280 ALT
                </span>
                <span className="text-slate-500">I2C 0x76</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
                {latest.altitude.toFixed(1)} <span className="text-xs text-cyan-400 font-normal">m</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Baro: {latest.pressure.toFixed(1)} hPa
              </div>
            </div>

            {/* MPU6050 Attitude */}
            <div
              onClick={() => setActiveMode('attitude')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                activeMode === 'attitude' || activeMode === 'all'
                  ? 'bg-indigo-950/30 border-indigo-500/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-indigo-400 mb-1">
                <span className="flex items-center gap-1 font-bold">
                  <Compass className="w-3 h-3" /> MPU6050
                </span>
                <span className="text-slate-500">I2C 0x68</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
                {latest.pitch > 0 ? `+${latest.pitch.toFixed(1)}` : latest.pitch.toFixed(1)}°
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Roll: {latest.roll > 0 ? `+${latest.roll.toFixed(1)}` : latest.roll.toFixed(1)}°
              </div>
            </div>

            {/* Thermal */}
            <div
              onClick={() => setActiveMode('power_thermal')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                activeMode === 'power_thermal' || activeMode === 'all'
                  ? 'bg-emerald-950/30 border-emerald-500/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1">
                <span className="flex items-center gap-1 font-bold">
                  <Thermometer className="w-3 h-3" /> THERMAL
                </span>
                <span className="text-slate-500">ADC1_CH0</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
                {latest.temperature.toFixed(1)} <span className="text-xs text-emerald-400 font-normal">°C</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                NTC 10k Steinhart-Hart
              </div>
            </div>

            {/* Battery Voltage */}
            <div
              onClick={() => setActiveMode('power_thermal')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                activeMode === 'power_thermal' || activeMode === 'all'
                  ? 'bg-amber-950/30 border-amber-500/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-1">
                <span className="flex items-center gap-1 font-bold">
                  <Zap className="w-3 h-3" /> EPS VBAT
                </span>
                <span className="text-slate-500">ADC 1/2 Div</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
                {latest.vbat.toFixed(2)} <span className="text-xs text-amber-400 font-normal">V</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Li-ion 1S 3.7V Cell
              </div>
            </div>

            {/* Solar Bus Current */}
            <div
              onClick={() => setActiveMode('power_thermal')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                activeMode === 'power_thermal' || activeMode === 'all'
                  ? 'bg-orange-950/30 border-orange-500/40'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-orange-400 mb-1">
                <span className="flex items-center gap-1 font-bold">
                  <Sun className="w-3 h-3" /> PV ARRAY
                </span>
                <span className="text-slate-500">INA219</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
                {latest.solarCurrent} <span className="text-xs text-orange-400 font-normal">mA</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                ~{(latest.solarCurrent * 0.0048).toFixed(2)} W Power Gen
              </div>
            </div>

            {/* RF Link / Packets */}
            <div className="p-2.5 rounded-xl border bg-slate-950/60 border-slate-800/80">
              <div className="flex items-center justify-between text-[10px] font-mono text-violet-400 mb-1">
                <span className="flex items-center gap-1 font-bold">
                  <Radio className="w-3 h-3" /> DOWNLINK
                </span>
                <span className="text-slate-500">ESP-NOW</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
                {latest.rssi} <span className="text-xs text-violet-400 font-normal">dBm</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                Pkt #{latest.packetId} (0% Loss)
              </div>
            </div>
          </div>

          {/* Chart Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl mb-3 text-xs font-mono">
            {/* View filter buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px] mr-1">Channel:</span>
              <button
                onClick={() => setActiveMode('all')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeMode === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                All Metrics
              </button>
              <button
                onClick={() => setActiveMode('altitude_pressure')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeMode === 'altitude_pressure'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                Altitude & Pressure
              </button>
              <button
                onClick={() => setActiveMode('attitude')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeMode === 'attitude'
                    ? 'bg-indigo-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                Attitude (Pitch/Roll)
              </button>
              <button
                onClick={() => setActiveMode('power_thermal')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeMode === 'power_thermal'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                Power & Thermal
              </button>
            </div>

            {/* Orbit Scenarios & Sampling */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Inject Event:</span>
              <button
                onClick={() => setScenario('nominal')}
                className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
                  scenario === 'nominal'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                    : 'text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Nominal Orbit
              </button>
              <button
                onClick={() => setScenario('eclipse')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border transition-colors ${
                  scenario === 'eclipse'
                    ? 'bg-blue-950 text-blue-300 border-blue-500/50'
                    : 'text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Moon className="w-3 h-3" />
                Eclipse Shadow
              </button>
              <button
                onClick={() => setScenario('tumble')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border transition-colors ${
                  scenario === 'tumble'
                    ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                    : 'text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Orbital Tumble
              </button>

              <div className="h-4 w-px bg-slate-800 mx-1" />

              {/* Sample rate */}
              <select
                aria-label="Telemetry polling rate"
                value={sampleRate}
                onChange={(e) => setSampleRate(Number(e.target.value))}
                className="bg-slate-900 text-slate-300 border border-slate-700 rounded px-2 py-0.5 text-[11px] focus:outline-none focus:border-cyan-500"
              >
                <option value={500}>Rate: 500ms</option>
                <option value={1000}>Rate: 1000ms</option>
                <option value={2000}>Rate: 2000ms</option>
              </select>
            </div>
          </div>

          {/* Recharts Live Telemetry Canvas */}
          <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-3 sm:p-4">
            <div className="h-[280px] sm:h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 12, right: 18, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="time"
                    stroke="#64748b"
                    fontSize={11}
                    fontFamily="monospace"
                    tickLine={false}
                  />

                  {/* Dynamic Y Axis configurations depending on mode */}
                  {activeMode === 'altitude_pressure' ? (
                    <>
                      <YAxis
                        yAxisId="alt"
                        domain={['dataMin - 5', 'dataMax + 5']}
                        stroke="#06b6d4"
                        fontSize={11}
                        fontFamily="monospace"
                        unit="m"
                      />
                      <YAxis
                        yAxisId="press"
                        orientation="right"
                        domain={['dataMin - 1', 'dataMax + 1']}
                        stroke="#38bdf8"
                        fontSize={11}
                        fontFamily="monospace"
                        unit="hPa"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
                      />
                      <Line
                        yAxisId="alt"
                        type="monotone"
                        dataKey="altitude"
                        name="BMP280 Altitude (m)"
                        stroke="#06b6d4"
                        strokeWidth={2.5}
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        yAxisId="press"
                        type="monotone"
                        dataKey="pressure"
                        name="Barometric Pressure (hPa)"
                        stroke="#38bdf8"
                        strokeWidth={1.8}
                        strokeDasharray="4 2"
                        dot={false}
                        isAnimationActive={false}
                      />
                    </>
                  ) : activeMode === 'attitude' ? (
                    <>
                      <YAxis
                        domain={[-45, 45]}
                        stroke="#818cf8"
                        fontSize={11}
                        fontFamily="monospace"
                        unit="°"
                      />
                      <ReferenceLine y={0} stroke="#334155" strokeDasharray="3 3" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="pitch"
                        name="MPU6050 Pitch (°)"
                        stroke="#818cf8"
                        strokeWidth={2.5}
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="roll"
                        name="MPU6050 Roll (°)"
                        stroke="#c084fc"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </>
                  ) : activeMode === 'power_thermal' ? (
                    <>
                      <YAxis
                        yAxisId="vbat"
                        domain={[3.0, 4.4]}
                        stroke="#f59e0b"
                        fontSize={11}
                        fontFamily="monospace"
                        unit="V"
                      />
                      <YAxis
                        yAxisId="secondary"
                        orientation="right"
                        domain={[-15, 60]}
                        stroke="#10b981"
                        fontSize={11}
                        fontFamily="monospace"
                      />
                      <ReferenceLine
                        yAxisId="vbat"
                        y={3.5}
                        stroke="#ef4444"
                        strokeDasharray="2 2"
                        label={{ value: 'Low Vbat', fill: '#ef4444', fontSize: 10 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
                      />
                      <Line
                        yAxisId="vbat"
                        type="monotone"
                        dataKey="vbat"
                        name="Li-ion Battery Voltage (V)"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        yAxisId="secondary"
                        type="monotone"
                        dataKey="temperature"
                        name="Thermistor Temp (°C)"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </>
                  ) : (
                    /* 'all' overview normalized multi-trace view */
                    <>
                      <YAxis
                        yAxisId="primary"
                        stroke="#64748b"
                        fontSize={11}
                        fontFamily="monospace"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
                      />
                      <Line
                        yAxisId="primary"
                        type="monotone"
                        dataKey="altitude"
                        name="Alt (m)"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        yAxisId="primary"
                        type="monotone"
                        dataKey="temperature"
                        name="Temp (°C)"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        yAxisId="primary"
                        type="monotone"
                        dataKey="pitch"
                        name="Pitch (°)"
                        stroke="#818cf8"
                        strokeWidth={1.8}
                        dot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        yAxisId="primary"
                        type="monotone"
                        dataKey="roll"
                        name="Roll (°)"
                        stroke="#c084fc"
                        strokeWidth={1.8}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom mini-bar: ESP32 Hardware Diagnostics & Telemetry Packet Inspector */}
            <div className="mt-3 pt-3 border-t border-slate-900 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" /> ESP32 Xtensa Dual-Core 240MHz
                </span>
                <span className="hidden sm:inline text-slate-600">|</span>
                <span className="hidden sm:inline text-slate-400">Free Heap: 184.2 KB</span>
                <span className="hidden sm:inline text-slate-600">|</span>
                <span className="text-emerald-400">CRC32: Valid (0x9AF4)</span>
              </div>

              <button
                onClick={() => setShowRawPacket(!showRawPacket)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
              >
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span>{showRawPacket ? 'Hide Serial Packet' : 'Inspect Raw Packet'}</span>
              </button>
            </div>

            {/* Collapsible raw packet payload */}
            {showRawPacket && (
              <div className="mt-2.5 p-3 rounded-lg bg-black/80 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                <pre>{rawJsonPacket}</pre>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Custom high-tech avionics tooltip for Recharts
interface TooltipPayloadItem {
  color?: string;
  name?: string;
  value?: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/95 border border-cyan-500/40 p-3 rounded-lg shadow-2xl font-mono text-xs backdrop-blur-md">
        <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between gap-4">
          <span>UTC Time: {label}</span>
          <span className="text-[10px] text-slate-500">ESP32 TM FRAME</span>
        </div>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-slate-300">
              <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-bold text-white tabular-nums">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

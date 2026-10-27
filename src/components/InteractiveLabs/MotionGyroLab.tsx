import React, { useState } from 'react';
import { Compass, RotateCw, Move, Activity } from 'lucide-react';

export const MotionGyroLab: React.FC = () => {
  const [omega, setOmega] = useState<number>(30); // deg/s
  const [vDrive, setVDrive] = useState<number>(10); // m/s internal vibration proof mass
  const [motionType, setMotionType] = useState<'rotational' | 'translational'>('rotational');

  // Coriolis formula: a_coriolis = 2 * (v_drive x Omega)
  // Convert omega to rad/s
  const omegaRadS = (omega * Math.PI) / 180;
  const aCoriolis = 2 * vDrive * omegaRadS; // m/s^2

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            6-DoF Motion & MEMS Gyroscope Coriolis Effect Lab
          </h4>
        </div>
        <span className="text-xs font-mono text-indigo-400">Formula: a_c = 2·(v_drive × Ω)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: 6-DoF Reference Matrix */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => setMotionType('rotational')}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-mono transition-colors ${
                motionType === 'rotational'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              3 Rotational (Angles)
            </button>
            <button
              onClick={() => setMotionType('translational')}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-mono transition-colors ${
                motionType === 'translational'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              3 Translational (Linear)
            </button>
          </div>

          {motionType === 'rotational' ? (
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-0.5">1. Roll (φ, Longitudinal X-axis)</span>
                <p className="text-slate-400 text-[11px]">Rotation along the satellite flight path axis (wings tipping left/right).</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-0.5">2. Pitch (θ, Lateral Y-axis)</span>
                <p className="text-slate-400 text-[11px]">Nose dipping up or down relative to the local horizontal plane.</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-0.5">3. Yaw (ψ, Normal Z-axis)</span>
                <p className="text-slate-400 text-[11px]">Rotation around the vertical axis towards Earth or deep space (heading change).</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-0.5">1. Surge (X-axis Translation)</span>
                <p className="text-slate-400 text-[11px]">Linear forward/backward motion along orbital velocity vector.</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-0.5">2. Sway (Y-axis Translation)</span>
                <p className="text-slate-400 text-[11px]">Sideways lateral drift across orbital track.</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-0.5">3. Heave (Z-axis Translation)</span>
                <p className="text-slate-400 text-[11px]">Vertical altitude ascent or descent towards Earth.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Coriolis Acceleration Calculator */}
        <div className="bg-slate-950/90 border border-indigo-500/30 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
              MEMS Coriolis Force Generator
            </span>
            <div className="mt-2 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Satellite Rotation Rate (Ω)</span>
                  <span className="text-indigo-300 font-bold tabular-nums">{omega} °/s ({omegaRadS.toFixed(3)} rad/s)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={omega}
                  onChange={(e) => setOmega(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">MEMS Internal Proof-Mass Drive Velocity (v_drive)</span>
                  <span className="text-slate-300 font-bold tabular-nums">{vDrive} m/s</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={vDrive}
                  onChange={(e) => setVDrive(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 font-mono">
            <span className="text-[10px] text-slate-500 uppercase block">Coriolis Acceleration Induced</span>
            <div className="text-2xl font-bold text-indigo-400 tabular-nums">
              {aCoriolis.toFixed(3)} <span className="text-xs text-slate-400">m/s²</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              This tiny perpendicular acceleration flexes the MEMS silicon combs, producing a measurable capacitance shift converted into deg/sec by the MPU6050.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

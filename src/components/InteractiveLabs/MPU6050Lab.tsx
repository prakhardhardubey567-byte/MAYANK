import React, { useState } from 'react';
import { Compass, RotateCw, RefreshCw } from 'lucide-react';

export const MPU6050Lab: React.FC = () => {
  const [pitch, setPitch] = useState<number>(15);
  const [roll, setRoll] = useState<number>(-20);
  const [yaw, setYaw] = useState<number>(45);
  const [alpha, setAlpha] = useState<number>(0.96);

  // Derive simulated accelerometer vectors from roll and pitch
  const radRoll = (roll * Math.PI) / 180;
  const radPitch = (pitch * Math.PI) / 180;
  
  // Acceleration components in g:
  const ax = -Math.sin(radPitch);
  const ay = Math.sin(radRoll) * Math.cos(radPitch);
  const az = Math.cos(radRoll) * Math.cos(radPitch);
  const totalAcc = Math.sqrt(ax * ax + ay * ay + az * az);

  const resetAttitude = () => {
    setPitch(0);
    setRoll(0);
    setYaw(0);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            MPU6050 6-DoF Attitude & Complementary Filter Lab
          </h4>
        </div>
        <button
          onClick={resetAttitude}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700"
        >
          <RefreshCw className="w-3 h-3" />
          Reset 0°
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Sliders */}
        <div className="md:col-span-7 space-y-3.5">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Pitch Angle (θ, Transverse Y-axis)</span>
              <span className="text-indigo-300 font-bold tabular-nums">{pitch}°</span>
            </div>
            <input
              type="range"
              min="-90"
              max="90"
              value={pitch}
              onChange={(e) => setPitch(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-90° (Nose Down)</span>
              <span>0° (Level)</span>
              <span>+90° (Nose Up)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Roll Angle (φ, Longitudinal X-axis)</span>
              <span className="text-indigo-300 font-bold tabular-nums">{roll}°</span>
            </div>
            <input
              type="range"
              min="-90"
              max="90"
              value={roll}
              onChange={(e) => setRoll(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-90° (Left Wing)</span>
              <span>0° (Level)</span>
              <span>+90° (Right Wing)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Yaw Angle (ψ, Normal Z-axis Spin)</span>
              <span className="text-indigo-300 font-bold tabular-nums">{yaw}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={yaw}
              onChange={(e) => setYaw(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
          </div>

          <div className="pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Filter Coefficient α (Gyroscope Weight)</span>
              <span className="text-cyan-400 font-bold tabular-nums">{alpha.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.80"
              max="0.99"
              step="0.01"
              value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.80 (Faster Response)</span>
              <span>0.96 (Nominal Balanced)</span>
              <span>0.99 (Maximum Drift Rejection)</span>
            </div>
          </div>
        </div>

        {/* 3D CubeSat Spatial Wireframe Simulator */}
        <div className="md:col-span-5 bg-slate-950/80 border border-indigo-500/30 rounded-xl p-4 flex flex-col items-center justify-between">
          <div className="w-full flex justify-between text-[10px] font-mono text-slate-400 uppercase">
            <span>Attitude Indicator</span>
            <span className="text-indigo-400">1U CubeSat Chassis</span>
          </div>

          {/* Perspective 3D CubeSat Box */}
          <div className="my-4 w-32 h-32 relative flex items-center justify-center [perspective:600px]">
            <div
              className="w-24 h-24 border-2 border-indigo-400/80 bg-indigo-950/40 rounded-sm relative flex items-center justify-center shadow-lg transition-transform duration-100 ease-out"
              style={{
                transform: `rotateX(${-pitch}deg) rotateY(${roll}deg) rotateZ(${yaw}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Solar cell grid pattern */}
              <div className="w-16 h-16 border border-cyan-400/60 grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-cyan-950/30">
                <div className="bg-cyan-500/20"></div>
                <div className="bg-cyan-500/20"></div>
                <div className="bg-cyan-500/20"></div>
                <div className="bg-cyan-500/20"></div>
              </div>
              {/* Antenna line */}
              <div className="absolute -top-6 w-0.5 h-6 bg-amber-400"></div>
              {/* Axis indicator */}
              <span className="absolute text-[8px] font-mono text-indigo-300 font-bold">+Z Face</span>
            </div>
          </div>

          {/* Computed Raw Accelerometer Vectors */}
          <div className="w-full grid grid-cols-3 gap-2 text-center text-xs font-mono pt-3 border-t border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 block">a_x</span>
              <span className="text-slate-200 tabular-nums">{ax.toFixed(2)} g</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">a_y</span>
              <span className="text-slate-200 tabular-nums">{ay.toFixed(2)} g</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">a_z</span>
              <span className="text-slate-200 tabular-nums">{az.toFixed(2)} g</span>
            </div>
          </div>
          <div className="w-full text-center text-[10px] font-mono text-slate-400 mt-1">
            Total Gravity Norm: <span className="text-emerald-400 font-bold tabular-nums">{totalAcc.toFixed(2)} g</span>
          </div>
        </div>
      </div>
    </div>
  );
};

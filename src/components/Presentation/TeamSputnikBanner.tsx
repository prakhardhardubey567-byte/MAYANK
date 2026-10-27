import React from 'react';
import { Users, ShieldCheck, Rocket, Award, Radio } from 'lucide-react';

export interface TeamMember {
  number: number;
  name: string;
  role?: string;
  isLeader?: boolean;
}

export const TEAM_SPUTNIK_MEMBERS: TeamMember[] = [
  {
    number: 1,
    name: 'UJJWAL YADAV',
    role: 'TEAM LEADER',
    isLeader: true
  },
  {
    number: 2,
    name: 'PRIYANSHU YADAV'
  },
  {
    number: 3,
    name: 'PRAKHAR DHAR DUBEY'
  },
  {
    number: 4,
    name: 'RATNESH KUMAR SINGH'
  },
  {
    number: 5,
    name: 'ATUL KUMAR MAURYA'
  }
];

interface TeamSputnikBannerProps {
  compact?: boolean;
}

export const TeamSputnikBanner: React.FC<TeamSputnikBannerProps> = ({ compact = false }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 border border-cyan-500/40 p-5 sm:p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)] text-slate-100">
      {/* Background glow & radar sweep effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header kicker */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80 mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Rocket className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                CubeSat Avionics Mission Design
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE ROSTER
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white flex items-center gap-2">
              <span>TEAM NAME :</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300">
                TEAM SPUTNIK
              </span>
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>5 Mission Engineers</span>
        </div>
      </div>

      {/* Member cards grid */}
      <div className="relative z-10">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROJECT MEMBERS & FLIGHT CREW:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {TEAM_SPUTNIK_MEMBERS.map((member) => (
            <div
              key={member.number}
              className={`p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                member.isLeader
                  ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.2)] lg:col-span-1'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Number badge */}
                <span
                  className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                    member.isLeader
                      ? 'bg-cyan-500 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {member.number}
                </span>

                {/* Name */}
                <div className="min-w-0">
                  <div className="font-mono font-bold text-xs sm:text-sm text-white tracking-wide truncate">
                    {member.name}
                  </div>
                  {member.role ? (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/40">
                        [ TEAM LEADER ]
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                      Team Member
                    </span>
                  )}
                </div>
              </div>

              {member.isLeader && (
                <span className="text-[10px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 shrink-0">
                  LEAD
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

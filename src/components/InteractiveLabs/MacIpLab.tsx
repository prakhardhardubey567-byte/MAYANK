import React, { useState } from 'react';
import { Network, Shield, Radio, Globe, Layers, Check } from 'lucide-react';

export const MacIpLab: React.FC = () => {
  const [espMac, setEspMac] = useState<string>('24:6F:28:B4:7A:10');
  const [ipOctets, setIpOctets] = useState<number[]>([192, 168, 1, 105]);
  const [selectedProtocol, setSelectedProtocol] = useState<'espnow' | 'tcpip'>('espnow');

  // Breakdown of MAC
  const macParts = espMac.split(':');
  const oui = macParts.slice(0, 3).join(':'); // e.g. 24:6F:28 = Espressif Inc
  const nicSerial = macParts.slice(3, 6).join(':');

  const ipString = ipOctets.join('.');
  const ipBinary = ipOctets.map((o) => o.toString(2).padStart(8, '0')).join('.');

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            MAC Address (Layer 2) vs IP Address (Layer 3) Lab
          </h4>
        </div>
        <span className="text-xs font-mono text-cyan-400">OSI Networking Stack Explorer</span>
      </div>

      {/* Protocol Toggle */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setSelectedProtocol('espnow')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-colors ${
            selectedProtocol === 'espnow'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          ESP-NOW Mode: Pure Layer 2 MAC Telemetry (No IP)
        </button>
        <button
          onClick={() => setSelectedProtocol('tcpip')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-colors ${
            selectedProtocol === 'tcpip'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          Ground/Cloud Mode: Layer 3 IP Routing (Blynk / Open MCT)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* MAC Address Inspector */}
        <div className="bg-slate-950/90 border border-cyan-500/30 rounded-xl p-4 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-400 uppercase">
              MAC Address (Physical Hardware ID)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              OSI Layer 2: Data Link
            </span>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px] mb-1">ESP32 On-Chip eFuse Burned Value:</div>
            <div className="text-xl font-bold text-white tracking-widest">{espMac}</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-500 block">OUI (Vendor):</span>
                <span className="text-cyan-300 font-bold">{oui}</span>
                <span className="text-slate-500 block text-[9px]">(Espressif Systems)</span>
              </div>
              <div>
                <span className="text-slate-500 block">NIC Device ID:</span>
                <span className="text-emerald-300 font-bold">{nicSerial}</span>
                <span className="text-slate-500 block text-[9px]">(Unique Silicon Serial)</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-slate-300 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Length:</span>
              <span className="text-white font-bold">48 bits (6 Bytes / Octets)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Scope:</span>
              <span className="text-white">Local RF Air Link (Point-to-Point)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ESP-NOW Downlink:</span>
              <span className="text-emerald-400 font-bold">Targeted by MAC Address</span>
            </div>
          </div>
        </div>

        {/* IP Address Inspector */}
        <div className="bg-slate-950/90 border border-indigo-500/30 rounded-xl p-4 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-400 uppercase">
              IP Address (Logical Network ID)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
              OSI Layer 3: Network
            </span>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px] mb-1">Assigned IPv4 Address (Ground Gateway):</div>
            <div className="text-xl font-bold text-white tracking-wider">{ipString}</div>
            <div className="mt-2 text-[10px] pt-2 border-t border-slate-800">
              <span className="text-slate-500 block">32-Bit Binary Stream:</span>
              <span className="text-indigo-300 text-[9px] break-all">{ipBinary}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-slate-300 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Length:</span>
              <span className="text-white font-bold">32 bits (IPv4) / 128 bits (IPv6)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Scope:</span>
              <span className="text-white">Routable across LAN, Internet & Cloud</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Assignment:</span>
              <span className="text-amber-400">Dynamic via DHCP or Static Config</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory callout based on selected protocol */}
      <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono">
        {selectedProtocol === 'espnow' ? (
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-cyan-400">Why ESP-NOW uses MAC, not IP: </strong>
            In spacecraft avionics, every microsecond and milliwatt counts. Traditional IP networks require ARP address resolution, DHCP handshake, routing tables, and heavy 20-byte IP headers. ESP-NOW bypasses all of this by addressing the Ground Station ESP32 directly via its 6-byte hardware MAC address. The packet flies over the air with zero connection overhead in under 2 milliseconds!
          </p>
        ) : (
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-indigo-400">Why Ground Station needs IP: </strong>
            Once the Ground Station ESP32 forwards telemetry over USB to the laptop, the laptop or bridge gateway uses Layer 3 IP packets (TCP/IP) to send telemetry to remote ground controllers via Blynk Cloud, NASA Open MCT, or MQTT servers over local Wi-Fi and the Internet.
          </p>
        )}
      </div>
    </div>
  );
};

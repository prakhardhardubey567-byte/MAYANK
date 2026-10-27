import React, { useState } from 'react';
import { Cpu, Zap, Wifi, Usb, Layers } from 'lucide-react';

export const ESP32Lab: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<'power' | 'cores' | 'pins' | 'wireless'>('cores');

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            ESP32 Type-C Silicon Architecture & Pinout Explorer
          </h4>
        </div>
        <span className="text-xs font-mono text-cyan-400">Tensilica Xtensa Dual-Core 240 MHz</span>
      </div>

      <div className="flex gap-2 mb-4">
        {[
          { id: 'cores', label: 'Dual-Core Multiprocessing' },
          { id: 'power', label: 'Type-C Power Subsystem' },
          { id: 'pins', label: 'CubeSat Pinout Mapping' },
          { id: 'wireless', label: 'RF & ESP-NOW Stack' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedDomain(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              selectedDomain === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 font-mono text-xs">
        {selectedDomain === 'cores' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border border-cyan-500/30 bg-cyan-950/20">
              <span className="text-cyan-400 font-bold block mb-1">PRO_CPU (Core 0 - Protocol Processor)</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Dedicated to running the Wi-Fi baseband, ESP-NOW peer-to-peer radio frames, and Bluetooth controller stacks. Operates asynchronously so wireless bursts never delay sensor collection.
              </p>
              <div className="mt-2 text-[10px] text-slate-500">Priority: High (RF Interrupts)</div>
            </div>

            <div className="p-3 rounded-lg border border-indigo-500/30 bg-indigo-950/20">
              <span className="text-indigo-400 font-bold block mb-1">APP_CPU (Core 1 - Application Processor)</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Executes the user firmware loop: reading I2C sensors (BMP280, MPU6050), parsing NMEA GPS strings, calculating barometric altitude and attitude complementary filters, and managing the Watchdog timer.
              </p>
              <div className="mt-2 text-[10px] text-slate-500">Scheduler: FreeRTOS Tick Rate 1000 Hz</div>
            </div>
          </div>
        )}

        {selectedDomain === 'power' && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-slate-900 rounded border border-slate-800">
              <Usb className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-white font-bold block">1. USB Type-C 5.0V VBUS Supply</span>
                <span className="text-slate-400 text-[11px]">Supplies 5V @ up to 3A with reversible orientation and ESD protection diodes.</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-slate-900 rounded border border-slate-800">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-white font-bold block">2. Onboard 3.3V LDO Voltage Regulator (ME6211 / AMS1117)</span>
                <span className="text-slate-400 text-[11px]">Steps down 5V to ultra-clean 3.3V DC (up to 800 mA peak) for the ESP32 SoC and avionics sensor bus.</span>
              </div>
            </div>
          </div>
        )}

        {selectedDomain === 'pins' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { pin: 'GPIO21 (SDA)', function: 'I2C Data Bus (MPU6050 & BMP280)' },
              { pin: 'GPIO22 (SCL)', function: 'I2C Clock Bus (400 kHz Fast Mode)' },
              { pin: 'GPIO16 (RX2)', function: 'NEO-6M GPS NMEA Input (9600 baud)' },
              { pin: 'GPIO17 (TX2)', function: 'NEO-6M GPS Command Output' },
              { pin: 'GPIO4', function: 'DHT11 1-Wire Digital Humidity/Temp' },
              { pin: 'GPIO34 (ADC1_CH6)', function: 'NTC Thermistor / Battery Voltage' },
              { pin: 'GPIO1 (TX0)', function: 'USB Serial Console to Laptop' },
              { pin: 'GPIO3 (RX0)', function: 'USB Telecommand Receiver from Laptop' }
            ].map((p) => (
              <div key={p.pin} className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-cyan-300 font-bold block text-[11px]">{p.pin}</span>
                <span className="text-[10px] text-slate-400">{p.function}</span>
              </div>
            ))}
          </div>
        )}

        {selectedDomain === 'wireless' && (
          <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-bold block">Espressif ESP-NOW Protocol Protocol Profile</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              ESP-NOW is a smart connectionless 2.4 GHz communication protocol. It encapsulates sensor packets into raw IEEE 802.11 action frames. It requires no handshakes, no IP routing, and delivers packets with latency &lt;2 ms, perfect for high-speed CubeSat downlink telemetry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

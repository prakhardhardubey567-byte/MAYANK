import React, { useState } from 'react';
import { Layers, Radio, Cpu, Laptop, Cloud, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

interface DiagramNode {
  id: string;
  name: string;
  category: 'Sensors' | 'Onboard OBC' | 'RF Link' | 'Ground Station' | 'Cloud & HMI';
  subsystem: string;
  pins: string;
  protocol: string;
  voltage: string;
  description: string;
}

export const BlockDiagramLab: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('obc');

  const nodes: DiagramNode[] = [
    {
      id: 'sensors',
      name: 'Avionics Sensor Cluster',
      category: 'Sensors',
      subsystem: 'Payload & ADCS Sensing Suite',
      pins: 'MPU6050 (0x68), BMP280 (0x76), DHT11 (GPIO4), NEO-6M (GPIO16/17), NTC (GPIO34)',
      protocol: 'I2C Bus (Fast 400kHz), UART2 (9600), 1-Wire, 12-Bit ADC',
      voltage: '3.3V DC Regulated',
      description: 'Acquires 6-DoF inertial motion, barometric pressure/altitude, ambient humidity, GNSS positioning, and Li-ion pack temperature.'
    },
    {
      id: 'obc',
      name: 'Onboard ESP32 Transmitter (OBC)',
      category: 'Onboard OBC',
      subsystem: 'Command & Data Handling (CD&H)',
      pins: 'Xtensa Dual-Core 240MHz, I2C Master, Hardware Timers, Watchdog Timer',
      protocol: 'ESP-NOW MAC Frame Generator, Internal FreeRTOS Queues',
      voltage: '3.3V VCC (via onboard LDO from 3.7V Li-ion battery)',
      description: 'The flight computer brain. Core 1 polls sensors and computes complementary filtering; Core 0 formats telemetry frames and transmits RF bursts.'
    },
    {
      id: 'rf_link',
      name: '2.4 GHz RF Telemetry Downlink',
      category: 'RF Link',
      subsystem: 'TTC (Telemetry, Tracking & Command)',
      pins: 'Onboard PCB Trace / External 2.4 GHz Whip Antenna',
      protocol: 'ESP-NOW Connectionless Datagram / +20 dBm EIRP',
      voltage: 'RF Electromagnetic Propagation (Speed of Light c)',
      description: 'Wireless space-to-ground link. Sends up to 250-byte packed binary frames with sub-2ms latency without requiring a Wi-Fi router.'
    },
    {
      id: 'ground_esp',
      name: 'Ground Station ESP32 Type-C Receiver',
      category: 'Ground Station',
      subsystem: 'Ground RF Gateway',
      pins: 'USB Type-C (VBUS 5V, D+, D-), CP2102/CH340 Bridge, UART0 (GPIO1/3)',
      protocol: 'UART 8-N-1 Serial @ 115200 baud to Host PC',
      voltage: '5V VBUS from Laptop USB port -> 3.3V LDO to ESP32',
      description: 'Captures incoming RF packets in receiver interrupt callback, checks CRC, and converts packets into JSON strings streamed over USB.'
    },
    {
      id: 'laptop',
      name: 'Mission Control Laptop Display',
      category: 'Ground Station',
      subsystem: 'Ground Telemetry Processor & Data Logger',
      pins: 'USB 2.0 / 3.0 Type-A/Type-C Port (COM3 or /dev/ttyUSB0)',
      protocol: 'Web Serial API / Python PySerial / JSON Stream Parser',
      voltage: 'Host System AC/Battery Power',
      description: 'Plots live 3D artificial horizon attitude, altitude graphs, barometric trend, and logs every frame to timestamped CSV files.'
    },
    {
      id: 'blynk',
      name: 'Blynk IoT Cloud & Mobile HMI',
      category: 'Cloud & HMI',
      subsystem: 'Global Mission Telemetry Relay',
      pins: 'Virtual Pins V0 (Alt), V1 (Press), V2 (Temp), V3 (Attitude), V4 (GPS)',
      protocol: 'Secure TCP / HTTPS / MQTT Broker',
      voltage: 'Cloud Server Infrastructure',
      description: 'Allows remote investigators and students worldwide to view live CubeSat health gauges and receive emergency alarms on their smartphones.'
    }
  ];

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            Interactive CubeSat System Architecture & Bus Pipeline
          </h4>
        </div>
        <span className="text-xs font-mono text-sky-400">Click any block to inspect electrical specs</span>
      </div>

      {/* System Schematic Flow Row */}
      <div className="overflow-x-auto pb-3 mb-4">
        <div className="flex items-center gap-2 min-w-[700px]">
          {nodes.map((node, index) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`flex-1 p-3 rounded-lg border text-left transition-all font-mono text-xs ${
                    isSelected
                      ? 'bg-sky-950/60 border-sky-400 text-white shadow-lg shadow-sky-950/40'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">
                    0{index + 1}. {node.category}
                  </div>
                  <div className="font-semibold text-slate-200 leading-tight mb-1 truncate">
                    {node.name}
                  </div>
                  <div className="text-[10px] text-sky-400 truncate">{node.protocol.split(',')[0]}</div>
                </button>

                {index < nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Detailed Node Inspector Panel */}
      <div className="bg-slate-950/90 border border-sky-500/30 rounded-xl p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-sky-400 font-bold">
              Subsystem Inspector: {activeNode.subsystem}
            </div>
            <h5 className="text-lg font-bold text-white font-mono mt-0.5">{activeNode.name}</h5>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
            {activeNode.category}
          </span>
        </div>

        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          {activeNode.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Bus & Protocol:</span>
            <span className="text-cyan-300 font-medium">{activeNode.protocol}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Pin Mapping & I/O:</span>
            <span className="text-slate-200 font-medium">{activeNode.pins}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Operating Voltage:</span>
            <span className="text-emerald-400 font-medium">{activeNode.voltage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import { SlideData } from '../types/presentation';

export const CUBESAT_SLIDES: SlideData[] = [
  {
    id: 0,
    originalIndex: 0,
    topicNumber: "00",
    title: "TEAM SPUTNIK · CubeSat Avionics & Telemetry",
    subtitle: "Mission Engineering Presentation Deck & Technical Defense",
    category: "Introduction & Basics",
    badge: "Official Team Cover",
    heroImage: "/src/assets/images/cubesat_in_orbit_1793077486901.jpg",
    summary: "Welcome to the official CubeSat Telemetry & Avionics Presentation Deck engineered and presented by TEAM SPUTNIK. This comprehensive technical study encompasses 1U satellite bus design, ESP32 dual-core flight software, multi-sensor telemetry acquisition, and ground station operations.",
    keyConcepts: [
      {
        heading: "Mission Engineering Team : TEAM SPUTNIK",
        details: "1. UJJWAL YADAV [ TEAM LEADER ]\n2. PRIYANSHU YADAV\n3. PRAKHAR DHAR DUBEY\n4. RATNESH KUMAR SINGH\n5. ATUL KUMAR MAURYA",
        highlights: [
          "Team Leader: Ujjwal Yadav",
          "5 Mission Engineers",
          "Avionics & Telemetry Division",
          "ESP32 CubeSat Prototype"
        ]
      },
      {
        heading: "Presentation Architecture & Defense Agenda",
        details: "• Module 01-07: CubeSat Foundations, Orbital Mechanics & Subsystems\n• Module 08-11: ESP32 Hardware, ADC Linearity & Calibration, Sensor Interfaces\n• Module 12-16: Communication Protocols (I2C, SPI, UART, MAC/IP, ESP-NOW)\n• Module 17-20: Ground Station, NASA Open MCT, Blynk IoT & Mission Verification.",
        highlights: [
          "20+ Technical Modules",
          "Interactive Avionics Simulators",
          "Live Telemetry Streaming HUD",
          "Comprehensive Viva Question Bank"
        ]
      }
    ],
    specifications: [
      { label: "Team Name", value: "TEAM SPUTNIK" },
      { label: "Team Leader", value: "Ujjwal Yadav" },
      { label: "Engineering Cadre", value: "5 Members" },
      { label: "Spacecraft Standard", value: "1U CubeSat (10×10×10 cm)" }
    ],
    cubeSatApplication: "This title deck establishes the mission baseline developed by TEAM SPUTNIK. Use the on-screen navigation or keyboard arrows (← / → / Space) to progress through each engineering module.",
    speakerNotes: [
      "Welcome the honorable evaluators and audience to the presentation by TEAM SPUTNIK.",
      "Introduce Team Leader Ujjwal Yadav and team members Priyanshu Yadav, Prakhar Dhar Dubey, Ratnesh Kumar Singh, and Atul Kumar Maurya.",
      "Summarize the project vision: a fully functional 1U CubeSat avionics demonstration utilizing an ESP32 microcontroller with real-time sensor telemetry and ground station telemetry visualization."
    ],
    vivaQuestions: [
      {
        question: "Who are the members and team leader of TEAM SPUTNIK?",
        answer: "TEAM SPUTNIK is led by Ujjwal Yadav [Team Leader] with team members Priyanshu Yadav, Prakhar Dhar Dubey, Ratnesh Kumar Singh, and Atul Kumar Maurya."
      },
      {
        question: "What is the scope and purpose of this CubeSat Avionics project?",
        answer: "The project demonstrates the hardware architecture, sensor integration (BMP280, MPU6050, DHT11, Thermistor), ADC conversion, RF telemetry downlink protocols, and ground station data processing for a 1U CubeSat nanosatellite."
      }
    ]
  },
  {
    id: 1,
    originalIndex: 1,
    topicNumber: "01",
    title: "What is a CubeSat? & Telemetry",
    subtitle: "Standardized Nanosatellite Architecture & The Lifeline of Spacecraft Data",
    category: "Introduction & Basics",
    badge: "Aerospace Standard",
    heroImage: "/src/assets/images/cubesat_in_orbit_1793077486901.jpg",
    summary: "A CubeSat is a miniaturized satellite standard based on 10×10×10 cm cubic units (1U). Telemetry is the continuous remote transmission of internal health, operational vitals, and payload sensor data to Earth.",
    keyConcepts: [
      {
        heading: "The CubeSat Form Factor Standard",
        details: "Established in 1999 by Prof. Jordi Puig-Suari (Cal Poly) and Prof. Bob Twiggs (Stanford). A standard 1U CubeSat measures exactly 10 cm × 10 cm × 10 cm with a nominal mass limit of ~1.33 kg to 2.0 kg. Modular scales include 1.5U, 2U, 3U, 6U, and 12U.",
        highlights: ["1U = 10×10×10 cm", "Mass: ~1.33 kg nominal", "Standard Deployer: P-POD (Poly-Picosatellite Orbital Deployer)"]
      },
      {
        heading: "What is Telemetry (TM)?",
        details: "Derived from Greek 'tele' (remote) and 'metron' (measure). In spacecraft avionics, telemetry is the automated communication process by which onboard physical parameters (voltages, currents, temperatures, inertial motion, GPS coordinates, antenna deployments) are measured, digitized, and radioed down to Earth.",
        highlights: ["Housekeeping Telemetry: Voltages, battery state of charge, subsystem thermal health", "Payload Telemetry: Scientific, optical, or atmospheric experimental data", "Downlink (TM) vs Uplink (TC - Telecommands)"]
      }
    ],
    specifications: [
      { label: "1U Standard Dimensions", value: "100.0 ± 0.1 mm cube" },
      { label: "1U Standard Mass", value: "≤ 1.33 kg (expanded to 2.0 kg)" },
      { label: "Primary Orbit", value: "LEO (Low Earth Orbit, 300–600 km)" },
      { label: "Downlink Frequency", value: "VHF/UHF (435-438 MHz) / S-band (2.4 GHz)" }
    ],
    cubeSatApplication: "In our ESP32-based CubeSat prototype, telemetry is collected periodically by the onboard ESP32 microcontroller from all sensor buses (MPU6050, BMP280, DHT11, NEO-6M, Thermistor), packed into formatted telemetry packets, and broadcast to the ground receiver.",
    speakerNotes: [
      "Begin by emphasizing why CubeSats revolutionized space access: rideshare secondary payloads in standard P-POD tubes drastically reduced launch costs.",
      "Explain the critical distinction between Telemetry (downward health reporting) and Telecommand (upward instructions sent by ground operators).",
      "Point out that without telemetry, a satellite is a 'zombie'—even if it is alive in orbit, ground controllers cannot verify its health or attitude."
    ],
    vivaQuestions: [
      {
        question: "What is the standard dimension and weight of a 1U CubeSat?",
        answer: "A standard 1U CubeSat measures 10 cm × 10 cm × 10 cm (100 mm cube) and has a nominal mass of up to 1.33 kg (often permitted up to 2 kg in modern standards)."
      },
      {
        question: "What is the difference between Telemetry and Telecommand?",
        answer: "Telemetry (TM) is the downlink transmission of internal measurements and sensor data from satellite to ground. Telecommand (TC) is the uplink transmission of instructions/commands from ground to satellite."
      }
    ]
  },
  {
    id: 2,
    originalIndex: 2,
    topicNumber: "02",
    title: "Uses of CubeSat",
    subtitle: "From High-Risk Commercial Missions to Interplanetary Exploration",
    category: "Introduction & Basics",
    badge: "Mission Profiles",
    summary: "CubeSats have transitioned from academic toys to frontline orbital workhorses, delivering low-cost Earth observation, space weather forecasting, IoT constellation relay, and deep-space interplanetary exploration.",
    keyConcepts: [
      {
        heading: "1. Earth Observation & Remote Sensing",
        details: "Constellations of 3U/6U CubeSats (like Planet Labs' Doves) capture daily multispectral imagery of the entire landmass of Earth. Applications include deforestation monitoring, agricultural NDVI crop yield tracking, wildfire detection, and coastal erosion analysis.",
        highlights: ["Daily global revisit rates", "Multispectral & hyperspectral bands", "Disaster response imaging"]
      },
      {
        heading: "2. Scientific Research & Space Weather",
        details: "Upper atmosphere (thermosphere/ionosphere) sounding, solar flare radiation flux detection, plasma density profiling, and cosmic ray characterization using onboard miniaturized magnetometers and Geiger-Müller tubes.",
        highlights: ["Ionospheric electron density", "Solar geomagnetic storm monitoring", "Microgravity crystal growth"]
      },
      {
        heading: "3. Telecommunications & IoT Constellations",
        details: "Relaying signals from remote maritime AIS (Automatic Identification System) buoys, wildlife GPS tags, trans-oceanic shipping containers, and emergency distress beacons in areas with zero terrestrial cellular coverage.",
        highlights: ["Low Earth Orbit store-and-forward", "Direct-to-satellite IoT protocols (LoRa/NB-IoT)", "Maritime & aviation tracking"]
      },
      {
        heading: "4. Technology Demonstration & Deep Space",
        details: "Proving Commercial Off-The-Shelf (COTS) chips like ESP32, GaN semiconductors, and miniaturized ion thrusters. Historic missions include NASA's MarCO (Mars Cube One) twins, which flew to Mars in 2018 as deep-space relay stations.",
        highlights: ["COTS flight qualification", "Solar sail propulsion testing", "NASA MarCO Mars flyby"]
      }
    ],
    specifications: [
      { label: "Planet Labs Dove Constellation", value: "200+ 3U imaging satellites" },
      { label: "Typical Mission Cost", value: "$50k - $500k (vs $500M+ traditional)" },
      { label: "Orbital Lifetime", value: "3 months to 5 years (LEO decay)" },
      { label: "Deployment Method", value: "ISS Nanoracks / Rocket rideshares" }
    ],
    cubeSatApplication: "Our desktop/high-altitude prototype emulates a technology demonstration and remote sensing mission: acquiring environmental and positional data in real time and streaming it to a simulated ground station.",
    speakerNotes: [
      "Highlight the cost difference: Traditional satellites cost $200M to $1B and take 7-10 years to build; CubeSats can be launched for under $100k in 1-2 years.",
      "Mention MarCO-A and MarCO-B (Wall-E and Eva) to prove CubeSats are not limited to Earth orbit—they relayed InSight's Mars landing telemetry in real time!"
    ],
    vivaQuestions: [
      {
        question: "Mention four major domains where CubeSats are actively used.",
        answer: "1. Earth Observation & Agriculture 2. Space Weather & Ionosphere Science 3. Global IoT and Maritime/Aviation tracking (AIS/ADS-B) 4. In-orbit Technology Demonstration & COTS qualification."
      },
      {
        question: "What was the NASA MarCO mission?",
        answer: "Mars Cube One (MarCO) was the first interplanetary CubeSat mission (two 6U spacecraft) that flew past Mars in 2018, relaying telemetry from the InSight lander back to Earth during descent."
      }
    ]
  },
  {
    id: 3,
    originalIndex: 3,
    topicNumber: "03",
    title: "Basic Knowledge About Satellites",
    subtitle: "Orbital Mechanics, Gravity Balance & The 6 Core Subsystems",
    category: "Introduction & Basics",
    badge: "Astrodynamics",
    heroImage: "/src/assets/images/cubesat_in_orbit_1793077486901.jpg",
    summary: "An artificial satellite is an object placed into orbit around a celestial body. It maintains its orbit through a continuous balance between gravitational attraction and the satellite's centrifugal inertia (perpetual free-fall).",
    keyConcepts: [
      {
        heading: "How an Orbit Works: Newton's Cannonball",
        details: "A satellite in circular orbit is continuously falling towards Earth due to gravity, but moves horizontally fast enough (~7.8 km/s in LEO) that the Earth curves away beneath it at the exact same rate.",
        highlights: ["Perpetual free-fall condition", "Gravity provides centripetal acceleration: Fg = Fc", "LEO velocity ~28,000 km/h"]
      },
      {
        heading: "The 6 Essential Subsystems of Every Satellite",
        details: "1. OBC (On-Board Computer): Avionics brain / CD&H\n2. EPS (Electrical Power System): Solar cells, LiFePO4 batteries, PMIC\n3. ADCS (Attitude Determination & Control): Sensors & magnetorquers\n4. COMM / TTC (Telemetry, Tracking & Command): Transceivers\n5. Thermal & Structure: Chassis, Kapton insulation, radiating plates\n6. Payload: The mission-specific instrument (camera, sensors, radar).",
        highlights: ["OBC: Command & Data Handling", "EPS: Power harvesting & regulation", "ADCS: Pointing & stabilization"]
      }
    ],
    formulas: [
      {
        title: "Circular Orbital Velocity",
        expression: "v = sqrt((G * M_E) / r)",
        description: "Speed required to maintain a stable circular orbit at radius r from Earth's center.",
        variables: [
          { symbol: "v", meaning: "Orbital speed", unit: "m/s (~7670 m/s for 400 km LEO)" },
          { symbol: "G", meaning: "Universal gravitational constant", unit: "6.6743 × 10^-11 N m^2/kg^2" },
          { symbol: "M_E", meaning: "Mass of Earth", unit: "5.972 × 10^24 kg" },
          { symbol: "r", meaning: "Orbital radius (R_E + Altitude h)", unit: "m (e.g. 6371 km + 400 km)" }
        ]
      },
      {
        title: "Kepler's Third Law (Orbital Period)",
        expression: "T = 2 * pi * sqrt(r^3 / (G * M_E))",
        description: "Calculates time to complete one full revolution around Earth.",
        variables: [
          { symbol: "T", meaning: "Orbital period", unit: "seconds (~92 minutes for LEO)" },
          { symbol: "r", meaning: "Semi-major axis / orbital radius", unit: "meters" }
        ]
      }
    ],
    cubeSatApplication: "In our prototype, the ESP32 acts as the OBC subsystem, our breadboard rails emulate the EPS bus (regulated 3.3V), our sensors form the Payload and ADCS sensing suite, and the RF module provides the TTC subsystem.",
    speakerNotes: [
      "Walk through the formula v = sqrt(GM/r). Show how higher orbits (GEO) move slower than low orbits (LEO).",
      "Mention that in LEO at 400 km (ISS altitude), the satellite circles Earth every ~92 minutes, experiencing 16 sunrises and sunsets every day."
    ],
    vivaQuestions: [
      {
        question: "Why doesn't a satellite fall straight down to Earth?",
        answer: "Because it has sufficient tangential velocity (~7.8 km/s in LEO). The gravitational force pulls it toward Earth, but Earth's surface curves away at the same rate, resulting in continuous circular free-fall."
      },
      {
        question: "List the six primary subsystems of an operational satellite.",
        answer: "1. On-Board Computer (OBC / CD&H) 2. Electrical Power System (EPS) 3. Attitude Determination and Control System (ADCS) 4. Telemetry, Tracking and Command (TTC / COMM) 5. Thermal & Mechanical Structure 6. Mission Payload."
      }
    ]
  },
  {
    id: 4,
    originalIndex: 4,
    topicNumber: "04",
    title: "Transmitter ESP: Onboard & Ground Station",
    subtitle: "Avionics Core, ESP-NOW Protocol & Uplink/Downlink Architecture",
    category: "Hardware & ESP32",
    badge: "RF Architecture",
    heroImage: "/src/assets/images/avionics_bench_1793077501751.jpg",
    summary: "The onboard ESP32 acts as the flight transmitter and OBC. It samples sensors, packages telemetry packets, and transmits via 2.4 GHz RF (ESP-NOW/Wi-Fi). The Ground Station transmitter sends uplink telecommands.",
    keyConcepts: [
      {
        heading: "Onboard ESP32 Transmitter Operations",
        details: "1. Bus Master: Reads I2C sensors (MPU6050, BMP280) and UART sensors (NEO-6M GPS).\n2. Packet Encoding: Compiles sensor variables into a compact binary struct or delimited telemetry frame with packet counter and CRC.\n3. RF Modulation: Transmits via 2.4 GHz MAC-layer frames using Espressif's ESP-NOW protocol or LoRa transceiver module (SX1278).",
        highlights: ["ESP-NOW: Peer-to-peer connectionless 2.4 GHz", "Transmission latency < 2 ms", "Zero router/access-point dependency"]
      },
      {
        heading: "Ground Station Transmitter (Uplink Role)",
        details: "While the onboard ESP32 transmits telemetry down, the ground station ESP32 functions as a bidirectional transceiver. It transmits telecommands uplink: polling rate adjustments, sensor calibration triggers, emergency safe-mode beacon, or payload camera trigger.",
        highlights: ["Uplink Command Authentication", "Acknowledgement (ACK) handshake", "Bi-directional telecommunication"]
      }
    ],
    specifications: [
      { label: "RF Frequency", value: "2.4 GHz ISM Band (Channels 1-13)" },
      { label: "TX Power", value: "+20 dBm (100 mW EIRP)" },
      { label: "Payload Size (ESP-NOW)", value: "Up to 250 bytes per frame" },
      { label: "Line-of-Sight Range", value: "200m–500m (directional patch > 1 km)" }
    ],
    codeSnippet: {
      title: "Onboard ESP-NOW Telemetry Struct Transmission (C++)",
      language: "cpp",
      code: `typedef struct __attribute__((packed)) {
  uint32_t packet_id;
  float ax, ay, az;      // MPU6050 Accelerometer (g)
  float gx, gy, gz;      // MPU6050 Gyroscope (deg/s)
  float pressure_hpa;    // BMP280 Pressure
  float altitude_m;      // Calculated Barometric Alt
  float temperature_c;   // DHT11 / BMP280
  float humidity_pct;    // DHT11 RH
  float latitude, longitude; // NEO-6M GPS
  uint16_t vbat_raw;     // ADC Battery Voltage
  uint16_t checksum;     // CRC-16 Checksum
} CubeSatTelemetryPacket;

CubeSatTelemetryPacket telemetry;
esp_now_send(ground_station_mac, (uint8_t *) &telemetry, sizeof(telemetry));`
    },
    cubeSatApplication: "Serves as the flight computer radio transmitter. Operates autonomously on battery power aboard the satellite platform.",
    speakerNotes: [
      "Explain why ESP-NOW is superior to standard Wi-Fi for CubeSat prototypes: standard Wi-Fi requires a 4-way handshake, router connection, and DHCP lease; ESP-NOW is raw MAC-to-MAC datagram transmission with sub-2ms latency.",
      "Explain the packed struct attribute: ensures no compiler padding bytes disrupt binary packet alignment between transmitter and receiver."
    ],
    vivaQuestions: [
      {
        question: "What is ESP-NOW and why is it used in CubeSat prototyping?",
        answer: "ESP-NOW is a connectionless 2.4 GHz wireless communication protocol developed by Espressif. It allows peer-to-peer transmission using MAC addresses without needing a Wi-Fi router, offering low power, high speed (<2ms latency), and up to 250-byte payloads."
      },
      {
        question: "What does the onboard transmitter send to ground station?",
        answer: "It sends telemetry packets containing sensor readings (acceleration, angular velocity, pressure, altitude, temperature, humidity, GPS coordinates), system battery voltage, packet sequence ID, and CRC checksum."
      }
    ]
  },
  {
    id: 5,
    originalIndex: 5,
    topicNumber: "05",
    title: "Receiver ESP32 Type-C (Connected by USB)",
    subtitle: "The Physical Gateway Between Space Link & Ground Station PC",
    category: "Hardware & ESP32",
    badge: "Ground Gateway",
    heroImage: "/src/assets/images/avionics_bench_1793077501751.jpg",
    summary: "The Ground Station ESP32 Type-C module receives RF telemetry packets over the air, verifies packet integrity, and bridges the data directly to the ground laptop over high-speed USB-UART serial at 115200 baud.",
    keyConcepts: [
      {
        heading: "RF Reception & Frame Decapsulation",
        details: "Operates in promiscuous / receiver mode with its radio tuned to the CubeSat transmitter's channel and MAC address. Upon receiving an interrupt, the ESP32 receiver fires the onDataRecv callback in memory.",
        highlights: ["Instant hardware interrupt trigger", "RSSI (Signal Strength) measurement", "Payload CRC verification"]
      },
      {
        heading: "USB-to-UART Bridge Architecture",
        details: "The onboard Type-C port is wired to a USB-to-UART bridge IC (such as CP2102, CH340C, or native USB CDC). It receives 5V power from the laptop's USB port, powers the ESP32 via a 3.3V LDO regulator, and forwards clean serial ASCII/JSON packets to the laptop.",
        highlights: ["Baud rate: 115200 bps standard (up to 921600 bps)", "USB CDC Virtual COM Port", "Bidirectional pipeline for telemetry & commands"]
      }
    ],
    specifications: [
      { label: "Connector Standard", value: "USB 2.0 Type-C (Reversible)" },
      { label: "Power Source", value: "USB VBUS 5.0 V from Laptop" },
      { label: "Logic Level", value: "3.3V LVTTL (Transceiver to Bridge)" },
      { label: "Serial Protocol", value: "UART 8-N-1 (8 data bits, no parity, 1 stop bit)" }
    ],
    codeSnippet: {
      title: "Receiver Interrupt Callback & USB Forwarding (C++)",
      language: "cpp",
      code: `void onDataRecv(const uint8_t *mac, const uint8_t *incomingData, int len) {
  memcpy(&telemetry, incomingData, sizeof(telemetry));
  
  // Format as clean JSON and forward to laptop over Type-C USB
  Serial.print("{\\"pkt\\":"); Serial.print(telemetry.packet_id);
  Serial.print(",\\"alt\\":"); Serial.print(telemetry.altitude_m, 2);
  Serial.print(",\\"press\\":"); Serial.print(telemetry.pressure_hpa, 1);
  Serial.print(",\\"temp\\":"); Serial.print(telemetry.temperature_c, 1);
  Serial.print(",\\"pitch\\":"); Serial.print(telemetry.pitch, 1);
  Serial.print(",\\"roll\\":"); Serial.print(telemetry.roll, 1);
  Serial.print(",\\"lat\\":"); Serial.print(telemetry.latitude, 6);
  Serial.print(",\\"lon\\":"); Serial.print(telemetry.longitude, 6);
  Serial.println("}");
}`
    },
    cubeSatApplication: "Acts as the physical ground transceiver node plugged into the mission control laptop.",
    speakerNotes: [
      "Clarify the electrical flow: The ground ESP32 receives RF radio waves, stores the byte buffer in RAM, formats it into JSON/CSV, and sends it via hardware UART pins to the onboard USB bridge IC.",
      "The laptop OS registers this as a virtual COM port (e.g. COM3 on Windows or /dev/ttyUSB0 on Linux)."
    ],
    vivaQuestions: [
      {
        question: "How does the ESP32 receiver communicate with the ground station laptop?",
        answer: "Via its USB Type-C connection. An on-board USB-to-UART bridge IC (such as CP2102 or CH340) converts the ESP32's hardware UART serial signals into USB CDC virtual COM port packets that the laptop reads."
      },
      {
        question: "What baud rate is typically used for the USB serial link?",
        answer: "115200 baud (bits per second) is the industry standard for ESP32 telemetry, though speeds up to 921600 baud are supported for high-rate data."
      }
    ]
  },
  {
    id: 6,
    originalIndex: 6,
    topicNumber: "06",
    title: "Laptop Display & Ground Station GUI",
    subtitle: "Real-Time Telemetry Visualization, Telecommand Console & Data Logging",
    category: "Ground Station & IoT",
    badge: "Mission Control",
    heroImage: "/src/assets/images/ground_station_display_1793077501751.jpg",
    summary: "The Ground Station Laptop acts as the flight controller's primary cockpit: parsing incoming serial packets, rendering 3D attitude vectors, plotting environmental telemetry strip-charts, and logging data to disk.",
    keyConcepts: [
      {
        heading: "1. Real-Time Telemetry Parsing & Display",
        details: "Software running on the laptop (Web Serial API, Python GUI with PyQt/Tkinter, or serial monitor) reads incoming JSON/CSV lines, validates framing, and maps values to real-time visual gauges: altitude altimeter, barometer dial, and temperature/humidity graphs.",
        highlights: ["Sub-50ms UI update latency", "Attitude Artificial Horizon indicator", "Live GPS Ground-Track mapping"]
      },
      {
        heading: "2. Telecommand Injection Console",
        details: "Allows ground operators to type and send telecommands back across the USB link: adjust polling frequency, ping satellite for RTT (Round Trip Time) latency, calibrate sensor offsets, or trigger payload release.",
        highlights: ["Uplink command verification", "Real-time command history log", "Audio/Visual threshold alarms"]
      },
      {
        heading: "3. Flight Data Logging & Post-Mission Analysis",
        details: "Automatically streams every incoming telemetry packet into a timestamped CSV or SQLite database file for post-flight trajectory modeling, aerodynamic drag analysis, and payload verification.",
        highlights: ["CSV / SQLite flight logs", "Mission Elapsed Time (MET) syncing", "Loss-of-Signal (LOS) event capture"]
      }
    ],
    specifications: [
      { label: "Data Interface", value: "Web Serial API / PySerial USB Bridge" },
      { label: "Display Elements", value: "3D Horizon, Altimeter, GPS Map, Strip Charts" },
      { label: "Log Format", value: "ISO-8601 Timestamped CSV & JSON Lines" },
      { label: "Alert Triggers", value: "High temp (>60°C), Battery critical (<3.2V)" }
    ],
    interactiveLabId: "groundStation",
    cubeSatApplication: "Serves as the human-machine interface (HMI) for the flight team during testing, launch, and flight operations.",
    speakerNotes: [
      "Emphasize that raw numbers on a serial terminal are dangerous during flight operations—operators need visual dials, artificial horizons, and colored alert thresholds to identify anomalies instantly.",
      "Mention that modern ground station dashboards can run directly in web browsers using the Web Serial API (Chrome/Edge)."
    ],
    vivaQuestions: [
      {
        question: "Why is a graphical display needed instead of just a raw serial terminal?",
        answer: "A graphical dashboard translates raw numerical telemetry into instant cognitive insights: artificial horizons show satellite tumble, gauge dials show pressure limits, and color-coded thresholds alert operators to anomalies before mission loss."
      },
      {
        question: "What is the role of data logging in satellite ground software?",
        answer: "Data logging saves every received telemetry frame with high-precision timestamps to CSV/database files for post-flight analysis, anomaly diagnosis, and orbital trajectory reconstruction."
      }
    ]
  },
  {
    id: 7,
    originalIndex: 7,
    topicNumber: "07",
    title: "Sensors: MPU6050, BMP280, DHT11, NEO-6M & Antenna",
    subtitle: "Mathematical Formulas, Operating Principles & Prototype Implementation",
    category: "Sensors & Formulas",
    badge: "Core Avionics Suite",
    heroImage: "/src/assets/images/avionics_bench_1793077501751.jpg",
    summary: "The avionics sensor suite measures all primary flight variables: 6-DoF inertial motion (MPU6050), atmospheric pressure & altitude (BMP280), ambient humidity & temperature (DHT11), and GNSS navigation (NEO-6M + Ceramic Patch Antenna).",
    keyConcepts: [
      {
        heading: "1. MPU6050 (6-DoF IMU: Accelerometer + Gyroscope)",
        details: "Combines a 3-axis MEMS accelerometer (detecting proof-mass deflection via differential capacitance) and a 3-axis MEMS gyroscope (detecting Coriolis force from vibrating ring). Communicates over I2C at address 0x68.",
        highlights: ["Accelerometer: ±2g to ±16g", "Gyroscope: ±250°/s to ±2000°/s", "Onboard Digital Motion Processor (DMP)"]
      },
      {
        heading: "2. BMP280 (High-Precision Barometer & Altimeter)",
        details: "Piezoresistive silicon MEMS sensor measuring atmospheric pressure from 300 to 1100 hPa with ±0.12 hPa accuracy (~1 meter altitude resolution). I2C address 0x76 or 0x77.",
        highlights: ["Altitude resolution: 1 m", "RMS noise: 0.2 Pa", "Ultra-low power: 2.7 µA @ 1 Hz"]
      },
      {
        heading: "3. DHT11 (Temperature & Relative Humidity)",
        details: "Features a resistive-type humidity sensing component and an NTC temperature thermistor, interfaced with an 8-bit microcontroller that outputs 40 bits of serial data on a single I/O wire.",
        highlights: ["Humidity: 20-90% RH (±5%)", "Temperature: 0-50°C (±2°C)", "Sampling rate: 1 Hz (1 reading/sec)"]
      },
      {
        heading: "4. NEO-6M GPS Receiver + Ceramic Patch Antenna",
        details: "Standalone 50-channel GNSS engine receiving 1575.42 MHz (L1 band) GPS signals. Calculates 3D position and velocity via Time-of-Flight trilateration from ≥ 4 satellites. Outputs standard NMEA-0183 sentences over UART at 9600 baud.",
        highlights: ["Ceramic Patch Antenna: Right-Hand Circular Polarization (RHCP)", "Time to First Fix (TTFF): 27s cold start", "NMEA sentences: $GPGGA, $GPRMC"]
      }
    ],
    formulas: [
      {
        title: "BMP280 Hypsometric Barometric Altitude Formula",
        expression: "h = 44330 * (1 - (P / P0)^(1 / 5.255))",
        description: "Calculates height above sea level based on the International Standard Atmosphere (ISA) pressure lapse rate.",
        variables: [
          { symbol: "h", meaning: "Altitude above sea level", unit: "meters (m)" },
          { symbol: "P", meaning: "Measured atmospheric pressure from BMP280", unit: "hPa / mbar" },
          { symbol: "P0", meaning: "Reference sea-level atmospheric pressure", unit: "1013.25 hPa" },
          { symbol: "5.255", meaning: "ISA exponent derived from (M * g) / (R * L)", unit: "dimensionless" }
        ]
      },
      {
        title: "MPU6050 Accelerometer Pitch & Roll Estimation",
        expression: "Roll (phi) = atan2(ay, az) * (180 / pi);  Pitch (theta) = atan2(-ax, sqrt(ay^2 + az^2)) * (180 / pi)",
        description: "Derives tilt angles relative to Earth's 1g gravity vector from tri-axial acceleration measurements.",
        variables: [
          { symbol: "ax, ay, az", meaning: "Linear acceleration components along X, Y, Z axes", unit: "g (9.81 m/s^2)" },
          { symbol: "phi, theta", meaning: "Euler Roll and Pitch angles", unit: "degrees (°)" }
        ]
      },
      {
        title: "MPU6050 Sensor Fusion Complementary Filter",
        expression: "Angle_fused = alpha * (Angle_prev + Gyro_rate * dt) + (1 - alpha) * Angle_accel",
        description: "Combines high-pass filtered gyroscope integration (accurate short term) with low-pass filtered accelerometer tilt (drift-free long term).",
        variables: [
          { symbol: "alpha", meaning: "Filter weighting constant (typically 0.96 to 0.98)", unit: "ratio" },
          { symbol: "Gyro_rate", meaning: "Angular velocity measured by gyroscope", unit: "deg/sec" },
          { symbol: "dt", meaning: "Sampling time interval", unit: "seconds (e.g. 0.01s for 100 Hz)" }
        ]
      },
      {
        title: "GPS Pseudo-Range Trilateration Equation",
        expression: "rho_i = c * (t_rx - t_tx,i) = sqrt((x - x_i)^2 + (y - y_i)^2 + (z - z_i)^2) + c * delta_t_bias",
        description: "Fundamental GNSS distance equation relating signal travel time to spatial Euclidean distance.",
        variables: [
          { symbol: "rho_i", meaning: "Pseudo-range distance to satellite i", unit: "meters" },
          { symbol: "c", meaning: "Speed of light in vacuum", unit: "299,792,458 m/s" },
          { symbol: "x, y, z", meaning: "CubeSat receiver unknown spatial coordinates", unit: "meters" },
          { symbol: "delta_t_bias", meaning: "Receiver local clock offset relative to GPS atomic time", unit: "seconds" }
        ]
      }
    ],
    interactiveLabId: "bmp280",
    cubeSatApplication: "Provides the complete avionics payload: MPU6050 informs ADCS attitude control; BMP280 tracks ascent/altitude; DHT11 guards internal electronics compartment from moisture/overheating; NEO-6M provides geographic tracking.",
    speakerNotes: [
      "Demonstrate the BMP280 formula: as pressure drops from 1013.25 hPa to 500 hPa, altitude climbs to ~5.5 km.",
      "Explain why complementary filter is vital: Gyroscope integration drifts over time due to bias; accelerometer is noisy during vibrations. Fusing them gives a stable attitude estimate.",
      "Explain the ceramic patch antenna: It is tuned specifically to 1575.42 MHz and requires a ground plane to receive Right-Hand Circularly Polarized signals from GPS satellites."
    ],
    vivaQuestions: [
      {
        question: "State the barometric altitude formula used by the BMP280 sensor.",
        answer: "h = 44330 * (1 - (P / 1013.25)^(1 / 5.255)), where P is the measured pressure in hPa and h is altitude in meters."
      },
      {
        question: "Why do we need sensor fusion (Complementary Filter) between accelerometer and gyroscope?",
        answer: "A gyroscope responds quickly to dynamic rotation but drifts over time due to numerical integration of bias. An accelerometer provides absolute tilt relative to gravity but is corrupted by linear acceleration and vibrations. The filter fuses high-pass gyro data with low-pass accelerometer data."
      },
      {
        question: "Why is a ceramic patch antenna used with the NEO-6M GPS module?",
        answer: "Because GPS satellites transmit Right-Hand Circularly Polarized (RHCP) radio waves at 1575.42 MHz. The ceramic patch antenna has high dielectric permittivity and matched polarization to reject reflected multipath signals and maximize reception gain."
      }
    ]
  },
  {
    id: 8,
    originalIndex: 8,
    topicNumber: "08",
    title: "What is a Protocol?",
    subtitle: "Rules of Engagement in Avionics Data Networks & Embedded Systems",
    category: "Protocols & Comm",
    badge: "Communication Architecture",
    summary: "A protocol is a standardized set of rules, formats, and signaling conventions that dictates how two or more electronic devices communicate, negotiate connections, package data, and handle errors.",
    keyConcepts: [
      {
        heading: "Core Functions of a Communication Protocol",
        details: "1. Synchronization: How sender and receiver lock onto byte timings (clocked line vs agreed baud rate).\n2. Addressing: Identifying which device on a shared bus is being spoken to (e.g. 7-bit I2C addresses).\n3. Packet Framing: Preamble, header, payload length, and delimiter bytes.\n4. Error Detection & Recovery: Parity bits, checksums, and CRCs to detect corrupted bits.",
        highlights: ["Syntax: Data format & coding", "Semantics: Meaning of command bits", "Timing: Clock synchronization & latency"]
      },
      {
        heading: "Protocol Comparison in CubeSat Avionics",
        details: "• I2C (Inter-Integrated Circuit): Synchronous, 2-wire (SDA/SCL), multi-master/multi-slave, up to 400 kHz. Used for BMP280, MPU6050.\n• SPI (Serial Peripheral Interface): Synchronous, 4-wire (MOSI/MISO/SCK/CS), high-speed (up to 50+ MHz). Used for SD cards & LoRa radios.\n• UART (Universal Asynchronous Receiver-Transmitter): Asynchronous, 2-wire (TX/RX), point-to-point. Used for GPS & USB console.\n• Wireless Protocols: ESP-NOW, LoRa, AX.25 packet radio.",
        highlights: ["I2C: Low wire count, shared sensor bus", "SPI: Maximum bandwidth", "UART: Simple point-to-point streaming"]
      }
    ],
    specifications: [
      { label: "I2C Speed", value: "Standard: 100 kHz, Fast Mode: 400 kHz" },
      { label: "SPI Speed", value: "10 MHz - 80 MHz" },
      { label: "UART Speed", value: "9600 to 921600 baud" },
      { label: "Error Detection", value: "Parity, Checksum, CRC-16, CRC-32" }
    ],
    cubeSatApplication: "In our CubeSat, I2C connects the environmental sensors to the ESP32; UART connects the GPS module and ground PC; ESP-NOW handles wireless air packets.",
    speakerNotes: [
      "Use the language analogy: If two people speak different languages without rules, communication fails. A protocol is the shared language, grammar, and etiquette.",
      "Point out that aerospace protocols must have strict error checking because cosmic radiation can flip bits in RAM and on RF channels."
    ],
    vivaQuestions: [
      {
        question: "Define a communication protocol in embedded systems.",
        answer: "A communication protocol is a predefined set of rules, data formats, and timing standards that allow disparate electronic devices to reliably transmit, receive, interpret, and verify data across a physical communication medium."
      },
      {
        question: "Compare I2C and UART protocols in two key aspects.",
        answer: "1. Clocking: I2C is synchronous (uses a dedicated SCL clock wire), whereas UART is asynchronous (has no clock wire and relies on matching baud rates). 2. Topology: I2C supports multiple addressable devices on just two wires, whereas UART is strictly point-to-point between two devices."
      }
    ]
  },
  {
    id: 9,
    originalIndex: 9,
    topicNumber: "09",
    title: "UART Basics (Universal Asynchronous Receiver-Transmitter)",
    subtitle: "Bit Timing, Packet Framing Structure & Hardware Implementation",
    category: "Protocols & Comm",
    badge: "Serial Interface",
    summary: "UART is a fundamental hardware serial protocol that converts parallel byte data from a microcontroller CPU into sequential serial bits for transmission over a single pair of TX/RX wires with no shared clock line.",
    keyConcepts: [
      {
        heading: "Why 'Asynchronous' Matters",
        details: "Because there is no separate clock wire between transmitter and receiver, both ends must be configured in advance to the exact same Baud Rate (bits per second). Each bit has an exact time duration: T_bit = 1 / BaudRate.",
        highlights: ["No shared clock line required", "Cross-connected wires: TX -> RX, RX -> TX, Common GND", "Common bauds: 9600 (GPS), 115200 (ESP32 USB console)"]
      },
      {
        heading: "The Anatomy of a UART Packet Frame",
        details: "1. Idle Line: Voltage stays at logic HIGH (3.3V / Mark state).\n2. Start Bit: Driven LOW (0V / Space state) for exactly 1 bit period. This falling edge wakes up the receiver's internal timer.\n3. Data Bits: 5 to 8 bits transmitted sequentially, starting with the Least Significant Bit (LSB first).\n4. Parity Bit (Optional): Even/Odd parity bit to detect single-bit corruption.\n5. Stop Bit(s): Driven logic HIGH for 1 or 2 bit periods to allow receiver framing recovery.",
        highlights: ["Total Frame: 1 Start + 8 Data + 0 Parity + 1 Stop = 10 bits per byte", "Baud 115200 => 11,520 bytes/sec maximum throughput", "T_bit @ 115200 = 8.68 microseconds"]
      }
    ],
    formulas: [
      {
        title: "UART Bit Duration & Effective Transfer Rate",
        expression: "T_bit = 1 / Baud_Rate;  Byte_Rate = Baud_Rate / (Start + Data + Parity + Stop)",
        description: "Calculates the electrical pulse duration of a single bit and total usable byte throughput.",
        variables: [
          { symbol: "T_bit", meaning: "Time duration of one serial bit", unit: "seconds (µs)" },
          { symbol: "Baud_Rate", meaning: "Serial modulation speed", unit: "baud / bps" },
          { symbol: "Byte_Rate", meaning: "Actual payload throughput", unit: "bytes / second" }
        ]
      }
    ],
    interactiveLabId: "uart",
    cubeSatApplication: "UART connects the NEO-6M GPS receiver to the ESP32 (UART2 on GPIO16/17), and bridges the Ground Station ESP32 to the Laptop serial console (UART0 on GPIO1/3 via Type-C bridge).",
    speakerNotes: [
      "Emphasize the common ground trap: if you connect TX and RX but forget the GND wire, UART will not work because voltage is relative to ground reference!",
      "Walk students through the 8-N-1 standard: 8 data bits, No parity, 1 stop bit. That means sending 1 byte requires 10 physical bits on the wire."
    ],
    vivaQuestions: [
      {
        question: "Explain the structure of a standard 8-N-1 UART frame.",
        answer: "A standard 8-N-1 UART frame consists of 10 bits: 1 Start bit (logic LOW 0V), 8 Data bits (transmitted LSB to MSB), No parity bit, and 1 Stop bit (logic HIGH 3.3V)."
      },
      {
        question: "Why must TX and RX be cross-connected between devices?",
        answer: "Because the Transmitter (TX) pin outputs data and must feed into the Receiver (RX) pin of the listening device. Common Ground (GND) must also be connected to establish a reference 0V potential."
      }
    ]
  },
  {
    id: 10,
    originalIndex: 10,
    topicNumber: "10",
    title: "About Microcontrollers (MCU)",
    subtitle: "Architecture, SoC Integration & Role as Satellite On-Board Computer",
    category: "Hardware & ESP32",
    badge: "Embedded Architecture",
    summary: "A microcontroller (MCU) is a self-contained System-on-Chip (SoC) combining processor cores, volatile RAM, non-volatile Flash, and configurable I/O peripherals onto a single silicon substrate, tailored for real-time control.",
    keyConcepts: [
      {
        heading: "Microcontroller (MCU) vs Microprocessor (MPU)",
        details: "• Microprocessor (e.g. Intel Core i7, Raspberry Pi BCM2711): High computational throughput, requires external RAM and Flash, runs complex OS (Linux/Windows), high power (watts).\n• Microcontroller (e.g. ESP32, STM32, ATmega328): Integrated RAM and Flash, deterministic sub-microsecond interrupt latency, ultra-low power (milliwatts), executes code directly on bare metal or real-time OS (FreeRTOS).",
        highlights: ["Integrated on-chip peripherals", "Deterministic real-time execution", "Low power consumption"]
      },
      {
        heading: "Essential Peripherals Inside an MCU",
        details: "1. GPIO (General Purpose Input/Output): Digital read/write pins.\n2. Hardware Timers & PWM: Microsecond task scheduling and motor control.\n3. ADC / DAC: Analog-to-digital and digital-to-analog conversion.\n4. Serial Controllers: Dedicated silicon silicon hardware for UART, I2C, SPI.\n5. Watchdog Timer (WDT): Hardware failsafe that resets the MCU if code freezes.",
        highlights: ["Watchdog Timer: Autonomous reboot upon lockup", "DMA (Direct Memory Access)", "Hardware interrupts"]
      }
    ],
    specifications: [
      { label: "Core Types", value: "Harvard Architecture, RISC (ARM, Xtensa, RISC-V)" },
      { label: "Power Modes", value: "Active, Light Sleep, Deep Sleep (µA), Hibernation" },
      { label: "Clock Frequencies", value: "16 MHz (ATmega) to 240 MHz (ESP32)" },
      { label: "Typical Space Flavour", value: "Rad-tolerant STM32 / Microchip SAMV71 / COTS ESP32" }
    ],
    cubeSatApplication: "The microcontroller serves as the CubeSat's On-Board Computer (OBC): polling sensors at exact time intervals, coordinating power modes, managing telemetry buffers, and executing ground commands.",
    speakerNotes: [
      "Clarify the distinction between MCU and MPU: Microcontrollers are designed to control physical hardware in real time with low power; microprocessors are designed to compute complex math with high power.",
      "Stress the importance of the Watchdog Timer (WDT) in satellites: in orbit, radiation can trigger single-event upsets (SEUs) that freeze the CPU; the WDT forces an automatic reboot without human intervention."
    ],
    vivaQuestions: [
      {
        question: "What is the difference between a microcontroller and a microprocessor?",
        answer: "A microcontroller integrates the CPU, RAM, ROM/Flash, and I/O peripherals on a single silicon chip and is optimized for low-power, real-time control. A microprocessor contains only the CPU core and requires external RAM, ROM, and peripheral chips."
      },
      {
        question: "What is a Watchdog Timer (WDT) and why is it critical in a CubeSat?",
        answer: "A Watchdog Timer is a hardware countdown timer that automatically resets the microcontroller if the software fails to refresh ('kick') it in time. In CubeSats, where radiation can cause code execution to deadlock, the WDT guarantees autonomous recovery."
      }
    ]
  },
  {
    id: 11,
    originalIndex: 11,
    topicNumber: "11",
    title: "Important Page on ESP32 Type-C DevKit",
    subtitle: "Silicon Specifications, Dual-Core Xtensa LX6 & Pinout Architecture",
    category: "Hardware & ESP32",
    badge: "DevKit Deep Dive",
    heroImage: "/src/assets/images/avionics_bench_1793077501751.jpg",
    summary: "The ESP32 Type-C Development Board is the primary computing and communications engine of our CubeSat. It features a dual-core 32-bit processor at 240 MHz, integrated 2.4 GHz Wi-Fi/Bluetooth, and a robust USB Type-C interface.",
    keyConcepts: [
      {
        heading: "Processor Architecture & Memory",
        details: "• CPU: Tensilica Xtensa Dual-Core 32-bit LX6 microprocessor operating up to 240 MHz (~600 DMIPS computing power).\n• Core 0: Assigned to RF, Wi-Fi, and ESP-NOW communication stack.\n• Core 1: Assigned to application code, sensor polling, and math filters.\n• Memory: 520 KB internal SRAM, 448 KB ROM, and 4 MB to 16 MB external QSPI Flash memory.",
        highlights: ["Dual-core enables non-blocking sensor acquisition", "Built-in FreeRTOS preemptive kernel", "ULP (Ultra-Low-Power) co-processor"]
      },
      {
        heading: "Type-C Hardware Interface & Power Subsystem",
        details: "• USB Type-C: Reversible connector providing 5V DC and USB 2.0 Full Speed data.\n• LDO Voltage Regulator: Down-converts 5V USB to clean 3.3V logic (typically AMS1117 or ME6211 rated up to 800 mA to handle Wi-Fi peak TX bursts).\n• USB-to-UART Bridge: CH340 or CP2102 IC converting PC serial to GPIO1 (TX0) and GPIO3 (RX0).\n• Boot & Reset: Integrated auto-programming circuit using DTR/RTS lines to pulse EN (Reset) and IO0 into flashing mode.",
        highlights: ["5V to 3.3V LDO regulator on board", "Auto-reset / flashing circuit", "34 programmable GPIOs"]
      }
    ],
    specifications: [
      { label: "Processor Core", value: "Xtensa 32-bit LX6 Dual-Core @ 240 MHz" },
      { label: "Internal SRAM", value: "520 KB SRAM" },
      { label: "Flash Memory", value: "4 MB (up to 16 MB) SPI Flash" },
      { label: "ADC Resolution", value: "12-bit (up to 18 channels, 0-4095)" },
      { label: "Wireless Stack", value: "Wi-Fi 802.11 b/g/n + BT 4.2 BLE + ESP-NOW" },
      { label: "Operating Voltage", value: "3.0 V to 3.6 V (3.3V nominal)" }
    ],
    interactiveLabId: "esp32",
    cubeSatApplication: "Serves as the central On-Board Computer (OBC) on the CubeSat and as the RF-to-USB serial gateway on the ground station.",
    speakerNotes: [
      "Highlight the dual-core architecture: Core 0 handles the radio stack (ESP-NOW) so that wireless transmission never causes jitter in Core 1's sensor polling loops.",
      "Point out that the ESP32 operates at 3.3V logic. Connecting 5V signals directly to its GPIO pins will permanently damage the silicon."
    ],
    vivaQuestions: [
      {
        question: "What is the CPU architecture and maximum clock speed of the ESP32?",
        answer: "The ESP32 is powered by a dual-core Tensilica Xtensa 32-bit LX6 microprocessor operating at up to 240 MHz."
      },
      {
        question: "What are the advantages of having a dual-core CPU in an avionics OBC?",
        answer: "Core 0 can run background RF communications (ESP-NOW/Wi-Fi) while Core 1 executes time-critical sensor sampling, attitude estimation, and flight logic without interruption or latency spikes."
      }
    ]
  },
  {
    id: 12,
    originalIndex: 12,
    topicNumber: "12",
    title: "About ADC (Analog-to-Digital Converter)",
    subtitle: "Quantization Theory, LSB Resolution & ESP32 12-Bit Architecture",
    category: "Hardware & ESP32",
    badge: "Signal Conversion",
    summary: "An ADC converts continuous, real-world analog voltage levels (such as from a battery monitor, solar cell, or thermistor) into discrete binary numerical values that a digital microcontroller can process.",
    keyConcepts: [
      {
        heading: "Sampling & Quantization Principles",
        details: "1. Sampling: Measuring the analog voltage at discrete time intervals.\n2. Quantization: Mapping the infinite analog voltage domain into a finite number of digital discrete levels determined by ADC resolution (n bits): Total Levels = 2^n.\n3. LSB (Least Significant Bit): The smallest voltage change detectable by the ADC: LSB = Vref / (2^n).",
        highlights: ["12-bit ADC = 2^12 = 4096 discrete steps (0 to 4095)", "LSB resolution = 3.3V / 4096 ≈ 0.805 mV / count", "Quantization error = ± 1/2 LSB"]
      },
      {
        heading: "ESP32 ADC Features & Attenuation Modes",
        details: "The ESP32 features two 12-bit SAR (Successive Approximation Register) ADCs: ADC1 (8 channels on GPIO32-39) and ADC2 (10 channels, shared with Wi-Fi). To measure up to 3.3V, an input attenuator is configured:\n• 0 dB: 0 to 1.1 V (full scale)\n• 2.5 dB: 0 to 1.5 V\n• 6 dB: 0 to 2.2 V\n• 11 dB: 0 to 3.3 V (recommended for 3.3V rail & battery divider monitoring).",
        highlights: ["ADC1 safe during Wi-Fi; ADC2 conflicts with Wi-Fi", "11 dB attenuation extends range to 3.3V", "Internal eFuse voltage calibration"]
      }
    ],
    formulas: [
      {
        title: "ADC Quantization Formula",
        expression: "Digital_Count = floor((V_in / V_ref) * (2^n - 1))",
        description: "Converts an input voltage into a raw digital integer count.",
        variables: [
          { symbol: "Digital_Count", meaning: "Raw ADC reading integer (0 to 4095 for 12-bit)", unit: "counts" },
          { symbol: "V_in", meaning: "Measured analog voltage applied to GPIO pin", unit: "volts (V)" },
          { symbol: "V_ref", meaning: "Full-scale reference voltage", unit: "3.3 V" },
          { symbol: "n", meaning: "ADC bit resolution", unit: "12 bits" }
        ]
      },
      {
        title: "Reconstructed Voltage Formula",
        expression: "V_in = (Digital_Count / 4095) * 3.3 V",
        description: "Calculates the physical voltage measured by the ADC pin.",
        variables: [
          { symbol: "V_in", meaning: "Calculated analog voltage", unit: "volts (V)" },
          { symbol: "Digital_Count", meaning: "Value returned by analogRead(pin)", unit: "0 - 4095" }
        ]
      }
    ],
    interactiveLabId: "adc",
    cubeSatApplication: "Monitors CubeSat battery voltage (LiPo 3.7V - 4.2V stepped down via a 2:1 resistive divider to 0-2.1V), solar panel current sensors, and NTC thermistors.",
    speakerNotes: [
      "Demonstrate the math: At Vin = 1.65V (half of 3.3V), the 12-bit ADC reads 4095 / 2 = 2047 counts.",
      "Warning about ESP32: Always use ADC1 (GPIO 32 to 39) when Wi-Fi or ESP-NOW is active, because ADC2 is shared with the Wi-Fi baseband driver and will fail during transmission."
    ],
    vivaQuestions: [
      {
        question: "What is the resolution and range of the ESP32's ADC?",
        answer: "The ESP32 features a 12-bit ADC resolution, providing 4096 discrete levels (counts from 0 to 4095), giving a voltage step (LSB) of approximately 0.805 mV when referenced to 3.3V."
      },
      {
        question: "Why should ADC1 be preferred over ADC2 when using ESP-NOW or Wi-Fi?",
        answer: "ADC2 hardware is shared with the ESP32's Wi-Fi and RF subsystem; when Wi-Fi/ESP-NOW is transmitting or listening, analogRead on ADC2 channels returns erroneous or locked readings. ADC1 operates completely independently."
      }
    ]
  },
  {
    id: 13,
    originalIndex: 13,
    topicNumber: "13",
    title: "Blynk IoT Cloud Platform",
    subtitle: "Cloud Telemetry Dashboards, Mobile HMI & Global Data Routing",
    category: "Ground Station & IoT",
    badge: "Cloud Telemetry",
    summary: "Blynk IoT is a low-latency IoT cloud ecosystem that bridges the ESP32 Ground Station to cloud dashboards and mobile smartphone apps, enabling global remote tracking of CubeSat telemetry with zero server overhead.",
    keyConcepts: [
      {
        heading: "Blynk IoT Architecture",
        details: "1. Device Hardware: ESP32 running the Blynk library connects to internet via Wi-Fi.\n2. Blynk Cloud Server: Secure cloud broker managing device state, datastreams, and time-series telemetry storage.\n3. User Interface: Customizable web console and iOS/Android mobile dashboard with gauges, interactive charts, GPS maps, and push notifications.",
        highlights: ["Cloud-based remote access", "Multi-device real-time sync", "Automated email/push anomaly alerts"]
      },
      {
        heading: "The Concept of 'Virtual Pins' (V-Pins)",
        details: "Virtual Pins (V0 to V255) are software channels that decouple physical hardware pins from dashboard widgets. Instead of wiring a widget directly to GPIO4, the code writes telemetry variables to Virtual Pins:\n• V0: CubeSat Altitude (m)\n• V1: Barometric Pressure (hPa)\n• V2: Battery Voltage (V)\n• V3: Temperature (°C)\n• V4: GPS Location (Lat/Lon map pin)\n• V5: Pitch / Roll attitude.",
        highlights: ["Blynk.virtualWrite(V0, altitude)", "Hardware abstraction layer", "Bi-directional widget sliders for telecommands"]
      }
    ],
    specifications: [
      { label: "Cloud Protocol", value: "Lightweight Binary TCP / HTTPS / MQTT" },
      { label: "Virtual Pin Range", value: "V0 to V255 (256 independent channels)" },
      { label: "Sync Latency", value: "< 100 ms globally" },
      { label: "Supported Platforms", value: "Web Browser, iOS, Android Apps" }
    ],
    interactiveLabId: "blynk",
    cubeSatApplication: "Allows the mission control team and remote scientists to inspect satellite telemetry and receive alert notifications anywhere in the world on their phones.",
    speakerNotes: [
      "Explain the power of Virtual Pins: They let you send complex data (floats, strings, arrays, GPS coordinates) rather than just physical 1 or 0 binary pin states.",
      "Show how ground station laptop can also act as an internet gateway forwarding serial packets up to Blynk Cloud."
    ],
    vivaQuestions: [
      {
        question: "What are Virtual Pins in Blynk IoT?",
        answer: "Virtual Pins (V0-V255) are software abstraction channels used to exchange variables, sensor telemetry, and control commands between the microcontroller firmware and Blynk cloud dashboard widgets without binding to physical GPIO pins."
      },
      {
        question: "How does Blynk IoT enhance a CubeSat mission?",
        answer: "It allows the ground station to push received telemetry to the cloud, giving ground operators, students, and research teams real-time access to flight dashboards on web browsers and smartphones from anywhere globally."
      }
    ]
  },
  {
    id: 14,
    originalIndex: 14,
    topicNumber: "14",
    title: "IoT Sensors Overview & Classification",
    subtitle: "Transducer Fundamentals, Environmental Sensing & Space Environmental Demands",
    category: "Sensors & Formulas",
    badge: "Sensor Physics",
    summary: "IoT sensors are electronic transducers that convert physical, mechanical, thermal, or chemical phenomena into readable electrical signals (voltage, current, or digital packets) for embedded microcontrollers.",
    keyConcepts: [
      {
        heading: "Transducer Classification: Analog vs Digital",
        details: "• Analog Sensors: Output a continuous varying voltage proportional to the measured property (e.g. NTC thermistors, LDR light sensors, analog strain gauges). Require an on-chip ADC to digitize.\n• Digital Sensors: Incorporate an onboard sensing element, analog front-end, ADC, and digital signal processor (DSP). They communicate measured values directly over digital buses like I2C, SPI, or UART (e.g. BMP280, MPU6050, NEO-6M).",
        highlights: ["Analog: Simple, passive, noise-susceptible", "Digital: Calibrated, integrated DSP, noise-immune bus"]
      },
      {
        heading: "Crucial Performance Metrics for Space Sensors",
        details: "1. Sensitivity: Ratio of electrical output change to physical input change.\n2. Accuracy vs Precision: Accuracy is proximity to true value; precision is repeatability.\n3. Operating Temperature: Space components face extreme thermal swings (-40°C to +85°C in LEO).\n4. Outgassing & Radiation Tolerance: Must not release volatile chemicals in hard vacuum or suffer single-event upsets.",
        highlights: ["Thermal cycling resistance", "Low outgassing in vacuum", "Radiation latch-up immunity"]
      }
    ],
    specifications: [
      { label: "Analog Sensor Output", value: "0 to 3.3V continuous voltage" },
      { label: "Digital Sensor Bus", value: "I2C (SDA/SCL) or SPI (MOSI/MISO)" },
      { label: "Thermal Range (Industrial)", value: "-40°C to +85°C" },
      { label: "Space Vacuum Threshold", value: "< 10^-5 Torr" }
    ],
    cubeSatApplication: "Forms the eyes and ears of the CubeSat, monitoring internal temperatures, battery status, structural vibration, and orbital altitude.",
    speakerNotes: [
      "Explain the difference between Accuracy (hitting the bullseye) and Precision (tight grouping of shots).",
      "Mention why digital sensors are preferred in modern avionics: onboard calibration registers, zero analog signal degradation over wires, and multi-sensor bus sharing."
    ],
    vivaQuestions: [
      {
        question: "Differentiate between an analog sensor and a digital sensor.",
        answer: "An analog sensor produces a continuous voltage or current that must be converted by an ADC, while a digital sensor has an internal ADC and DSP that converts physical data into calibrated digital packets over I2C, SPI, or UART."
      },
      {
        question: "Why is operating temperature range so critical for satellite sensors?",
        answer: "In Low Earth Orbit, a satellite passes between direct unattenuated solar radiation and Earth's cold eclipse shadow every 90 minutes, exposing components to extreme temperature fluctuations from -40°C to +85°C."
      }
    ]
  },
  {
    id: 15,
    originalIndex: 15,
    topicNumber: "15",
    title: "Thermistor & Thermal Sensing",
    subtitle: "NTC Physics, Voltage Divider Circuits & The Steinhart-Hart Equation",
    category: "Sensors & Formulas",
    badge: "Thermal Diagnostics",
    summary: "A thermistor (thermally sensitive resistor) is a semiconductor resistor whose electrical resistance exhibits large, predictable changes in response to temperature variations. Essential for monitoring satellite battery and solar array thermal health.",
    keyConcepts: [
      {
        heading: "NTC vs PTC Thermistors",
        details: "• NTC (Negative Temperature Coefficient): Electrical resistance DECREASES exponentially as temperature increases. Widely used for precision temperature measurement in CubeSat electronics bays.\n• PTC (Positive Temperature Coefficient): Resistance INCREASES as temperature rises. Commonly used as self-resetting over-current fuses (polyswitches) in power distribution boards.",
        highlights: ["NTC: R decreases with rising T", "High sensitivity (typically -4% / °C)", "Small thermal mass for fast response"]
      },
      {
        heading: "The Voltage Divider Readout Circuit",
        details: "Because microcontrollers cannot measure resistance directly, the NTC thermistor is placed in a series voltage divider with a known precision reference resistor R0 (typically 10 kΩ, 1% tolerance). The divided voltage V_out is sampled by the ESP32 ADC.",
        highlights: ["V_out = Vcc * (R0 / (R_ntc + R0))", "R_ntc = R0 * (Vcc / V_out - 1)", "Linearization via mathematical modeling"]
      }
    ],
    formulas: [
      {
        title: "Beta (Beta) Parameter Temperature Equation",
        expression: "1 / T = 1 / T0 + (1 / beta) * ln(R / R0)",
        description: "Standard equation used to calculate absolute temperature in Kelvin from measured NTC resistance.",
        variables: [
          { symbol: "T", meaning: "Absolute temperature to calculate", unit: "Kelvin (K = °C + 273.15)" },
          { symbol: "T0", meaning: "Nominal reference temperature (25°C)", unit: "298.15 K" },
          { symbol: "R0", meaning: "Thermistor resistance at 25°C", unit: "typically 10,000 Ω (10 kΩ)" },
          { symbol: "R", meaning: "Instantaneous resistance measured", unit: "Ohms (Ω)" },
          { symbol: "beta", meaning: "Material constant of thermistor", unit: "typically 3950 K" }
        ]
      },
      {
        title: "Steinhart-Hart Equation (High-Precision Model)",
        expression: "1 / T = A + B * ln(R) + C * (ln(R))^3",
        description: "Third-order polynomial model providing sub-0.05°C accuracy across wide temperature bands.",
        variables: [
          { symbol: "A, B, C", meaning: "Steinhart-Hart calibration coefficients", unit: "dimensionless" },
          { symbol: "R", meaning: "Measured thermistor resistance", unit: "Ohms (Ω)" }
        ]
      }
    ],
    interactiveLabId: "thermistor",
    cubeSatApplication: "Mounted directly to the Li-ion battery pack (charging must halt below 0°C or above 45°C to prevent thermal runaway), solar panel backside, and radio power amplifiers.",
    speakerNotes: [
      "Demonstrate the negative slope: As temperature increases, semiconductor electrons gain thermal energy to cross the bandgap, decreasing resistance.",
      "Remind students that the formula calculates temperature in Kelvin, so remember to subtract 273.15 to obtain degrees Celsius."
    ],
    vivaQuestions: [
      {
        question: "What does NTC stand for, and how does its resistance behave?",
        answer: "NTC stands for Negative Temperature Coefficient. Its electrical resistance decreases exponentially as temperature increases."
      },
      {
        question: "State the Beta equation for calculating temperature with an NTC thermistor.",
        answer: "1/T = 1/T0 + (1/beta) * ln(R/R0), where T and T0 are in Kelvin, R0 is resistance at 25°C, and beta is the thermistor constant."
      }
    ]
  },
  {
    id: 16,
    originalIndex: 16,
    topicNumber: "16",
    title: "Types of Motion & Gyroscope Physics",
    subtitle: "6 Degrees of Freedom, The Coriolis Effect & Attitude Determination",
    category: "Sensors & Formulas",
    badge: "Orbital Dynamics",
    summary: "Spacecraft move in 6 Degrees of Freedom (6-DoF): 3 translational motions along coordinate axes, and 3 rotational motions around those axes. The gyroscope measures rotational angular rates using the Coriolis effect.",
    keyConcepts: [
      {
        heading: "6 Degrees of Freedom (6-DoF) in Spaceflight",
        details: "• Translational Motions (Linear, m/s): \n  1. Surge (X-axis: forward / backward along velocity vector)\n  2. Sway (Y-axis: lateral left / right drift)\n  3. Heave (Z-axis: vertical up / down orbital altitude change)\n• Rotational Motions (Angular, deg/s):\n  1. Roll (phi, rotation around longitudinal X-axis)\n  2. Pitch (theta, rotation around lateral Y-axis)\n  3. Yaw (psi, rotation around vertical Z-axis).",
        highlights: ["Roll, Pitch, Yaw dictate antenna and solar pointing", "Detumbling: Cancelling post-separation angular momentum"]
      },
      {
        heading: "How a MEMS Gyroscope Works: The Coriolis Force",
        details: "Inside a MEMS gyroscope, a tiny silicon proof-mass is kept in continuous high-frequency vibration along an internal drive axis. When the CubeSat rotates, the Coriolis acceleration deflects the vibrating mass along a perpendicular sense axis, measured by capacitive finger combs.",
        highlights: ["No rotating spinning wheels required", "Vibrating ring silicon MEMS", "Output: Angular velocity omega (deg/s)"]
      }
    ],
    formulas: [
      {
        title: "Coriolis Acceleration Vector",
        expression: "a_coriolis = 2 * (v_drive x Omega)",
        description: "The apparent inertial acceleration experienced by a vibrating mass in a rotating frame of reference.",
        variables: [
          { symbol: "a_coriolis", meaning: "Perpendicular Coriolis acceleration vector", unit: "m/s^2" },
          { symbol: "v_drive", meaning: "Internal oscillation velocity of the proof-mass", unit: "m/s" },
          { symbol: "Omega", meaning: "External rotational angular velocity of the satellite", unit: "rad/s" }
        ]
      },
      {
        title: "Angular Orientation from Gyro Integration",
        expression: "theta(t) = theta(t-1) + omega * Delta_t",
        description: "Discrete time numerical integration of angular velocity to track rotation angle.",
        variables: [
          { symbol: "theta(t)", meaning: "Current orientation angle", unit: "degrees / radians" },
          { symbol: "omega", meaning: "Instantaneous angular velocity from gyro", unit: "deg/sec" },
          { symbol: "Delta_t", meaning: "Loop execution time interval", unit: "seconds" }
        ]
      }
    ],
    interactiveLabId: "motion",
    cubeSatApplication: "Critical for ADCS (Attitude Determination and Control System). Immediately after separation from the launch vehicle P-POD deployer, the satellite 'tumbles' wildly; the gyroscope detects spin rates to trigger magnetic detumbling coils (magnetorquers).",
    speakerNotes: [
      "Use the airplane analogy: Roll is wings dipping; Pitch is nose pointing up or down; Yaw is nose swinging left or right.",
      "Explain why gyroscopes drift: Integrating small offset errors over time results in unbounded angle accumulation, which is why we must fuse it with an accelerometer or sun sensor."
    ],
    vivaQuestions: [
      {
        question: "Define the 6 Degrees of Freedom (6-DoF) of a satellite.",
        answer: "6-DoF includes 3 translational motions along the X, Y, and Z axes (Surge, Sway, Heave) and 3 rotational motions around those axes (Roll, Pitch, and Yaw)."
      },
      {
        question: "What physical principle allows a MEMS gyroscope to measure rotation without spinning wheels?",
        answer: "The Coriolis effect. A micro-machined silicon mass is vibrated along a drive axis; when the device rotates, Coriolis acceleration deflects the mass along a perpendicular axis, which is detected via capacitive sensing."
      }
    ]
  },
  {
    id: 17,
    originalIndex: 17,
    topicNumber: "17",
    title: "System Block Diagram",
    subtitle: "End-to-End Avionics, Communications & Ground Station Architecture",
    category: "Protocols & Comm",
    badge: "System Engineering",
    summary: "The complete system architecture diagram illustrates how power, sensor buses, microcontroller processing, RF transmission, USB serial bridging, and cloud monitoring interconnect seamlessly.",
    keyConcepts: [
      {
        heading: "Space Segment: On-Board Avionics",
        details: "• Power: 3.7V Li-ion battery regulated to 3.3V.\n• Sensors: MPU6050 (I2C 0x68), BMP280 (I2C 0x76), DHT11 (GPIO4 1-Wire), NEO-6M GPS (UART2 GPIO16/17), NTC Thermistor (ADC1 GPIO34).\n• On-Board Computer: ESP32 Transmitter compiling data into binary telemetry frames and modulating over 2.4 GHz ESP-NOW.",
        highlights: ["I2C Sensor Bus (SDA GPIO21, SCL GPIO22)", "UART2 GPS Link", "ESP-NOW 2.4 GHz RF Link"]
      },
      {
        heading: "Ground Segment: Receiver & Displays",
        details: "• Receiver Gateway: ESP32 Type-C receiver capturing RF frames via interrupt callback.\n• Physical Link: USB Type-C cable with CP2102/CH340 USB-UART bridge at 115200 baud.\n• Mission Control: Ground Station Laptop running GUI dashboard, serial parser, and CSV data logger.\n• Cloud IoT: Internet gateway forwarding packets to Blynk Cloud for mobile monitoring.",
        highlights: ["USB CDC Serial COM link", "Laptop Dashboard GUI", "Blynk IoT Cloud Sync"]
      }
    ],
    specifications: [
      { label: "Internal Buses", value: "I2C (Fast 400kHz), UART (9600 & 115200)" },
      { label: "Wireless Link", value: "2.4 GHz ISM Band (ESP-NOW)" },
      { label: "Host Bridge", value: "USB Type-C (Virtual COM Port)" },
      { label: "Cloud Sync", value: "Wi-Fi HTTPS/MQTT to Blynk IoT" }
    ],
    interactiveLabId: "blockDiagram",
    cubeSatApplication: "Serves as the blueprint for assembling, wiring, programming, and debugging the entire satellite project.",
    speakerNotes: [
      "Walk through the diagram from left to right: Physical world -> Sensors -> I2C/UART/ADC -> ESP32 OBC -> 2.4 GHz RF Link -> Ground ESP32 Receiver -> USB Type-C -> Laptop PC -> Blynk Cloud.",
      "Highlight how clean separation of concerns ensures that a failure in one sensor does not crash the entire telemetry stream."
    ],
    vivaQuestions: [
      {
        question: "Explain the data flow from physical satellite sensor to the ground operator's screen.",
        answer: "1. Sensor converts physical parameter to electrical signal -> 2. Transmitted over I2C/UART/ADC to onboard ESP32 OBC -> 3. Packed into telemetry frame and transmitted via 2.4 GHz RF -> 4. Received by ground ESP32 -> 5. Forwarded via USB Type-C serial to laptop -> 6. Parsed and rendered on dashboard GUI and pushed to Blynk Cloud."
      },
      {
        question: "What buses and protocols are used in this CubeSat architecture?",
        answer: "I2C for MPU6050 and BMP280; UART for NEO-6M GPS and USB PC serial; 1-Wire for DHT11; ADC for Thermistor; ESP-NOW for RF wireless telemetry; and TCP/IP for Blynk Cloud."
      }
    ]
  },
  {
    id: 18,
    originalIndex: 18,
    topicNumber: "18",
    title: "Ground Station & Display Architecture",
    subtitle: "Antenna Front-End, Software Stack, Link Budgets & Real-Time Telemetry",
    category: "Ground Station & IoT",
    badge: "Mission Operations",
    heroImage: "/src/assets/images/ground_station_display_1793077516199.jpg",
    summary: "The Ground Station is the terrestrial nerve center of the space mission. It provides RF signal reception, packet decapsulation, coordinate tracking, real-time telemetry rendering, and uplink commanding.",
    keyConcepts: [
      {
        heading: "Ground Station Architecture Layers",
        details: "1. RF Front-End & Antenna: High-gain directional Yagi or patch antenna with low-noise amplifier (LNA).\n2. Hardware Receiver: ESP32 Type-C node executing packet validation and RSSI signal measurement.\n3. Serial Demux & Packet Decapsulation: Stripping start/stop delimiters, verifying CRC checksums.\n4. Visual Telemetry HUD: Real-time gauges, 3D attitude indicator, strip charts, and audible alarms.\n5. Command Uplink & Storage: Database logging and telecommand dispatching.",
        highlights: ["Antenna gain & tracking rotor", "Hardware packet validation", "Comprehensive flight visualization"]
      },
      {
        heading: "Link Budget & Signal Strength (RSSI)",
        details: "To ensure packets can be received across the space-to-ground link, the Received Power (P_rx) must exceed receiver sensitivity (typically -97 dBm for ESP32):\nP_rx = P_tx + G_tx + G_rx - FSPL, where FSPL is Free Space Path Loss: FSPL(dB) = 20*log10(d) + 20*log10(f) + 92.45.",
        highlights: ["RSSI: Received Signal Strength Indicator in dBm", "Packet Error Rate (PER) tracking", "Link margin safety buffer"]
      }
    ],
    formulas: [
      {
        title: "Free Space Path Loss (FSPL) Formula",
        expression: "FSPL (dB) = 20 * log10(d_km) + 20 * log10(f_MHz) + 32.44",
        description: "Calculates the radio signal power attenuation propagating through free space over distance d.",
        variables: [
          { symbol: "FSPL", meaning: "Free space path loss in decibels", unit: "dB" },
          { symbol: "d_km", meaning: "Distance between satellite and ground station", unit: "kilometers (km)" },
          { symbol: "f_MHz", meaning: "Carrier frequency", unit: "MHz (2400 MHz for 2.4 GHz)" }
        ]
      }
    ],
    interactiveLabId: "groundStation",
    cubeSatApplication: "Forms the operational base station used by students, engineers, and ground controllers to monitor flight readiness, payload success, and system health.",
    speakerNotes: [
      "Review the entire journey: from raw physics in orbit, through semiconductor sensors, microcontrollers, radio modulation, down to ground antennas and laptop displays.",
      "Remind the audience that ground station design is just as critical as the satellite itself—half of a space mission is on the ground!"
    ],
    vivaQuestions: [
      {
        question: "What is a Ground Station and what are its primary responsibilities?",
        answer: "A Ground Station is the terrestrial tracking and communications facility that receives telemetry downlinks from the satellite, tracks its orbital path, verifies data integrity, displays system health to flight controllers, logs data for science, and transmits telecommands uplink."
      },
      {
        question: "What is Free Space Path Loss (FSPL) and what parameters does it depend on?",
        answer: "FSPL is the attenuation of radio energy as it spreads outwards through free space. It is directly proportional to the square of the distance (d) and the square of the frequency (f)."
      }
    ]
  },
  {
    id: 19,
    originalIndex: 19,
    topicNumber: "19",
    title: "MAC Address vs IP Address",
    subtitle: "Layer 2 Hardware Identifiers vs Layer 3 Network Routing in CubeSat Avionics",
    category: "Protocols & Comm",
    badge: "Networking Architecture",
    summary: "A MAC address is a 48-bit physical hardware identifier burned into silicon for local device-to-device communication (Layer 2). An IP address is a 32-bit (IPv4) or 128-bit (IPv6) logical address assigned to route data across networks and the Internet (Layer 3).",
    keyConcepts: [
      {
        heading: "1. MAC Address (Media Access Control) in ESP32",
        details: "• Format: 48-bit binary value expressed as 6 hexadecimal octets (e.g. 24:6F:28:B4:7A:10).\n• Structure: First 24 bits are the Organizationally Unique Identifier (OUI) assigned to Espressif; last 24 bits are the unique device serial.\n• Invariance: Burned permanently into the ESP32's internal eFuse memory during chip fabrication.",
        highlights: ["OSI Layer 2 (Data Link Layer)", "48-bit globally unique identifier", "Hardware-burned into silicon eFuse"]
      },
      {
        heading: "2. Why ESP-NOW Uses MAC Addresses (No IP Overhead)",
        details: "ESP-NOW operates directly on Layer 2 using raw IEEE 802.11 vendor-specific action frames addressed to the receiver's MAC address. It completely bypasses IP routing, DHCP negotiation, ARP tables, and subnet masks. This enables sub-2ms packet delivery and minimal power consumption for satellite downlinks.",
        highlights: ["Zero IP/TCP/UDP protocol overhead", "Transmission latency < 2 ms", "Direct peer-to-peer radio binding"]
      },
      {
        heading: "3. IP Address (Internet Protocol) in Ground Segment",
        details: "A logical address (e.g. 192.168.1.100 for IPv4) assigned by network routers or DHCP servers. Once telemetry is received by the Ground Station ESP32 and forwarded to the host laptop, IP routing is required to stream packets to Blynk Cloud, MQTT brokers, or NASA Open MCT over the Internet.",
        highlights: ["OSI Layer 3 (Network Layer)", "Hierarchical, routable across the global web", "Dynamic assignment via DHCP"]
      }
    ],
    specifications: [
      { label: "MAC Address Length", value: "48 bits (6 hex octets)" },
      { label: "IPv4 Address Length", value: "32 bits (4 decimal octets)" },
      { label: "OSI Architecture", value: "MAC: Layer 2 | IP: Layer 3" },
      { label: "Avionics Role", value: "MAC: ESP-NOW RF Link | IP: Cloud IoT / Open MCT" }
    ],
    interactiveLabId: "macIp",
    cubeSatApplication: "The onboard CubeSat transmitter targets the ground receiver's specific MAC address via ESP-NOW over the air. Once on the ground, the packet is encapsulated into IP datagrams to reach remote engineering dashboards.",
    codeSnippet: {
      title: "ESP32 MAC Address Retrieval & ESP-NOW Pairing (C++)",
      language: "cpp",
      code: `// Get this ESP32's unique burned MAC address
Serial.println(WiFi.macAddress());

// Register Ground Station peer by its 6-byte MAC address
uint8_t groundStationMac[] = {0x24, 0x6F, 0x28, 0xB4, 0x7A, 0x10};
esp_now_peer_info_t peerInfo = {};
memcpy(peerInfo.peer_addr, groundStationMac, 6);
peerInfo.channel = 1;
peerInfo.encrypt = false;
esp_now_add_peer(&peerInfo);`
    },
    speakerNotes: [
      "Use the postal analogy: A MAC address is like your government Social Security Number or DNA (it uniquely identifies the physical device forever); an IP address is like your current mailing address (it changes whenever you connect to a different Wi-Fi router).",
      "Highlight why space downlinks use MAC addressing: There are no Internet routers or DHCP servers floating in the sky. Direct MAC-layer communication eliminates seconds of handshake latency."
    ],
    vivaQuestions: [
      {
        question: "What is a MAC address and how many bits does it consist of?",
        answer: "A MAC (Media Access Control) address is a 48-bit (6-byte) physical hardware identifier burned into the network interface card (or ESP32 eFuse) that uniquely identifies a physical device on the Data Link layer (OSI Layer 2)."
      },
      {
        question: "Why does ESP-NOW use MAC addresses instead of IP addresses for CubeSat telemetry?",
        answer: "Because ESP-NOW is a connectionless Layer-2 protocol. Bypassing IP routing, DHCP discovery, and ARP resolution eliminates protocol overhead, enabling instant transmission with latency under 2 ms and significantly lower battery power consumption."
      }
    ]
  },
  {
    id: 20,
    originalIndex: 20,
    topicNumber: "20",
    title: "Ceramic Patch Antenna & Spacecraft RF Antennas",
    subtitle: "High-Dielectric Miniaturization, RHCP Polarization & Resonant Length Physics",
    category: "Hardware & ESP32",
    badge: "RF & Antenna Physics",
    summary: "A Ceramic Patch Antenna utilizes a high-permittivity dielectric substrate (ε_r ≈ 25 to 40) to drastically compress RF wavelength, allowing resonant GPS (1575.42 MHz) and S-Band antennas to fit into compact CubeSat faces with Right-Hand Circular Polarization (RHCP).",
    keyConcepts: [
      {
        heading: "1. High-Dielectric Permittivity Miniaturization",
        details: "The physical resonant length of a patch antenna depends inversely on the square root of the substrate's relative permittivity (ε_r):\nL ≈ c / (2 · f_r · √ε_eff)\nIn free air (ε_r = 1), a 1575.42 MHz GPS antenna would be ~95 mm long—too large for a 10×10 cm CubeSat face! Using barium titanate ceramic with ε_r = 25 reduces the wavelength by √25 = 5, shrinking the patch down to a compact 25 mm × 25 mm footprint.",
        highlights: ["High-dielectric ceramic (ε_r = 20–40)", "Wavelength compression: λ_d = λ_0 / √ε_r", "Compact 25×25×4 mm standard size"]
      },
      {
        heading: "2. Right-Hand Circular Polarization (RHCP)",
        details: "GPS satellites transmit Right-Hand Circularly Polarized electromagnetic waves. A ceramic patch antenna uses a corner-truncated geometry or dual orthogonal probe feeds to generate two perpendicular electric field components with a 90° phase shift. This prevents severe signal fading caused by satellite tumbling and atmospheric Faraday rotation.",
        highlights: ["RHCP matched to GNSS satellites", "Immune to 90° Faraday cross-polarization drop", "Axial ratio < 3 dB at boresight"]
      },
      {
        heading: "3. CubeSat Antenna Taxonomy",
        details: "• Ceramic Patch: GNSS navigation (1575.42 MHz) & high-rate S-band (2.4 GHz).\n• Deployable Tape-Measure Monopole/Dipole: Spring-steel VHF/UHF (145/437 MHz) antennas stored rolled up and deployed via burn-wire nichrome resistors.\n• Helical Antennas: High-gain directional circular-polarized antennas for telemetry links.",
        highlights: ["Ceramic patch: Flush-mounted, no moving parts", "Deployable tape: VHF/UHF long wavelength", "Burn-wire deployment mechanism"]
      }
    ],
    formulas: [
      {
        title: "Microstrip Patch Resonant Length Equation",
        expression: "L = c / (2 * f_r * sqrt(eps_eff)) - 2 * delta_L",
        description: "Calculates the physical length of a microstrip patch antenna taking into account dielectric permittivity and fringing fields.",
        variables: [
          { symbol: "L", meaning: "Physical resonant length of patch", unit: "meters / mm" },
          { symbol: "c", meaning: "Speed of light in vacuum", unit: "2.998 × 10^8 m/s" },
          { symbol: "f_r", meaning: "Target resonant frequency (e.g. 1575.42 MHz)", unit: "Hz" },
          { symbol: "eps_eff", meaning: "Effective relative permittivity of ceramic", unit: "typically 20 - 40" },
          { symbol: "delta_L", meaning: "Length extension due to fringing fields", unit: "mm" }
        ]
      },
      {
        title: "Voltage Standing Wave Ratio (VSWR) & Return Loss",
        expression: "VSWR = (1 + |Gamma|) / (1 - |Gamma|);  Return_Loss (dB) = -20 * log10(|Gamma|)",
        description: "Quantifies impedance matching between antenna feed line (50 ohms) and the ceramic patch.",
        variables: [
          { symbol: "Gamma", meaning: "Voltage reflection coefficient (ZL - Z0)/(ZL + Z0)", unit: "ratio" },
          { symbol: "VSWR", meaning: "Standing wave ratio (ideal: 1.0, acceptable: < 2.0)", unit: "ratio : 1" },
          { symbol: "Return_Loss", meaning: "Reflected power ratio (ideal: > 10 dB to 15 dB)", unit: "dB" }
        ]
      }
    ],
    interactiveLabId: "ceramicAntenna",
    cubeSatApplication: "Mounted flush on the exterior solar-panel face of the 1U CubeSat to capture GPS L1 navigation signals from the GPS constellation without interfering with deployer rail ejection.",
    speakerNotes: [
      "Explain the phonetic confusion: Students often say 'cinemic' antenna; the correct aerospace term is 'ceramic patch antenna' (or ceramic dielectric resonator antenna).",
      "Demonstrate why high dielectric constant matters: If ε_r were 1 (air), a GPS patch would occupy almost the entire 10 cm top face of a 1U CubeSat! Ceramic reduces it by 75% to 80% in surface area."
    ],
    vivaQuestions: [
      {
        question: "Why is ceramic used as the substrate material in GPS patch antennas?",
        answer: "Ceramic materials (like barium titanate) possess a very high dielectric constant (ε_r ≈ 20 to 40). Because resonant wavelength is inversely proportional to √ε_r, the ceramic substrate shrinks the physical dimensions of the antenna down to ~25 mm, allowing it to easily fit on a CubeSat."
      },
      {
        question: "Why is Right-Hand Circular Polarization (RHCP) essential for satellite antennas?",
        answer: "As satellites tumble in space and electromagnetic waves traverse the ionosphere, linear polarizations rotate (Faraday rotation), causing up to 20 dB of cross-polarization signal loss. Circular polarization radiates a helical rotating electric field, maintaining constant signal reception regardless of spacecraft tilt."
      }
    ]
  },
  {
    id: 21,
    originalIndex: 21,
    topicNumber: "21",
    title: "NASA Open MCT (Mission Control Technologies)",
    subtitle: "Next-Generation Open-Source Mission Control Telemetry Visualization",
    category: "Ground Station & IoT",
    badge: "NASA Flight Software",
    heroImage: "/src/assets/images/nasa_openmct_screen_1793115995051.jpg",
    summary: "NASA Open MCT is an open-source, web-based mission control framework developed by NASA Ames Research Center and JPL. It provides real-time telemetry plotting, telemetry dictionary parsing, time-conductor scrubbing, and customizable mission layouts for spacecraft operations.",
    keyConcepts: [
      {
        heading: "1. NASA Ames & JPL Open Architecture",
        details: "Developed to replace bulky legacy desktop consoles. Open MCT operates natively inside modern web browsers (Chrome/Firefox) using HTML5, WebSockets, and Canvas graphics. It has powered real missions including lunar rovers (VIPER), ISS research payloads, and academic CubeSats.",
        highlights: ["Developed by NASA Ames & JPL", "100% Open source (Apache 2.0)", "Browser-based client-server design"]
      },
      {
        heading: "2. The Telemetry Dictionary",
        details: "In Open MCT, all satellite telemetry is governed by a Telemetry Dictionary (JSON format). It formally defines each telemetry point (e.g. cubesat.alt, cubesat.vbat, cubesat.temp, cubesat.pitch), specifying data types, physical measurement units (meters, volts, °C), valid limits, and display formatting.",
        highlights: ["Structured telemetry point taxonomy", "Metadata dictionary schema", "Decouples telemetry provider from visualization"]
      },
      {
        heading: "3. Time Conductor & Playback Scrubbing",
        details: "Allows mission controllers to transition seamlessly between real-time streaming telemetry and historical playback. If a CubeSat experiences an anomaly during an eclipse pass, flight directors can scrub backwards along the timeline to inspect sensor values leading up to the fault.",
        highlights: ["Sliding real-time observation window", "Historical rewind and scrubbing", "Multi-chart synchronized time axes"]
      },
      {
        heading: "4. Drag-and-Drop Display Layouts",
        details: "Flight teams can assemble mission dashboards on the fly by dragging telemetry items onto a visual canvas: multi-channel time-series graphs, alphanumeric limit badges (Green=Nominal, Amber=Warning, Red=Critical), artificial horizon attitude dials, and 3D spacecraft wireframes.",
        highlights: ["Visual drag-and-drop workspace", "Configurable threshold alarms", "Exportable mission layouts"]
      }
    ],
    specifications: [
      { label: "Original Developer", value: "NASA Ames Research Center & NASA JPL" },
      { label: "License", value: "Open Source (Apache License 2.0)" },
      { label: "Frontend Stack", value: "Vue.js / JavaScript / HTML5 WebSockets" },
      { label: "Integration", value: "Node.js WebSocket Telemetry Provider" }
    ],
    codeSnippet: {
      title: "Sample Open MCT Telemetry Dictionary Definition (JSON)",
      language: "json",
      code: `{
  "name": "CubeSat 1U Avionics Suite",
  "identifier": {"namespace": "cubesat.telemetry", "key": "avionics"},
  "measurements": [
    {
      "name": "Barometric Altitude",
      "key": "alt",
      "type": "float",
      "unit": "meters",
      "values": [{"key": "value", "name": "Altitude", "hints": {"range": 1}}]
    },
    {
      "name": "Battery Voltage",
      "key": "vbat",
      "type": "float",
      "unit": "V",
      "limits": {"critical": {"low": 3.2, "high": 4.25}}
    }
  ]
}`
    },
    interactiveLabId: "nasaOpenMct",
    cubeSatApplication: "Serves as the mission control room software running on the ground station laptop to visualize downlink telemetry from the ESP32 receiver.",
    speakerNotes: [
      "Highlight the prestige and realism: NASA Open MCT is the exact software used by real NASA flight directors for rover operations and spacecraft monitoring.",
      "Explain how students can run NASA Open MCT on their own laptops: just run 'npm start' with Open MCT and connect it to 'node bridge.js' to see real satellite plots!"
    ],
    vivaQuestions: [
      {
        question: "What is NASA Open MCT?",
        answer: "NASA Open MCT (Open Mission Control Technologies) is an open-source, web-based visualization framework developed by NASA Ames and JPL for mission planning, real-time telemetry monitoring, and data analysis of spacecraft and rovers."
      },
      {
        question: "What is the purpose of the Telemetry Dictionary in Open MCT?",
        answer: "The Telemetry Dictionary defines the metadata for all satellite data streams: variable keys, human-readable labels, physical engineering units (V, °C, meters), and alarm limit thresholds (nominal, warning, critical)."
      }
    ]
  },
  {
    id: 22,
    originalIndex: 22,
    topicNumber: "22",
    title: "Node.js bridge.js (Serial-to-WebSocket Gateway)",
    subtitle: "The Mission Control Middleware Connecting Physical Hardware to Web Cockpits",
    category: "Ground Station & IoT",
    badge: "Avionics Middleware",
    summary: "node bridge.js is a lightweight Node.js middleware server that reads raw telemetry strings from the Ground Station ESP32 USB COM port using SerialPort, parses the JSON payload, and broadcasts it over WebSockets to NASA Open MCT and browser dashboards.",
    keyConcepts: [
      {
        heading: "1. Why a Serial Bridge is Essential",
        details: "Web browsers run in security sandboxes and cannot natively connect to local operating system hardware serial ports (COM3 or /dev/ttyUSB0) without restricted browser permissions, nor can they fan out one serial port to multiple team viewers. node bridge.js opens the USB COM port once and broadcasts telemetry over standard WebSockets (ws://localhost:8080).",
        highlights: ["Bypasses browser hardware sandboxes", "Multi-client fan-out distribution", "Zero-dependency on proprietary software"]
      },
      {
        heading: "2. Serial Ingestion Pipeline",
        details: "The script imports the serialport npm package and uses ReadlineParser to split raw incoming byte buffers by newline ('\\n'). When the Ground Station ESP32 prints a JSON telemetry line, the parser instantly fires a data event with the complete string.",
        highlights: ["serialport package at 115200 baud", "ReadlineParser newline buffering", "Automatic USB disconnect/reconnect handling"]
      },
      {
        heading: "3. WebSocket Broadcast Distribution",
        details: "Using the ws library, the bridge maintains an active pool of connected WebSocket clients (NASA Open MCT instances, custom web dashboards, mobile displays). Every incoming packet is forwarded immediately to all clients with sub-millisecond latency: wss.clients.forEach(c => c.send(data)).",
        highlights: ["High-speed WebSocket protocol (RFC 6455)", "Broadcast latency < 1 ms", "Bidirectional telecommand uplink piping"]
      }
    ],
    specifications: [
      { label: "Runtime", value: "Node.js (v18, v20, v22 LTS)" },
      { label: "Serial Package", value: "serialport + @serialport/parser-readline" },
      { label: "Baud Rate", value: "115200 bps (8-N-1)" },
      { label: "WebSocket Server", value: "ws on ws://localhost:8080" }
    ],
    codeSnippet: {
      title: "Production bridge.js Implementation (Node.js)",
      language: "javascript",
      code: `const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { WebSocketServer } = require('ws');

// 1. Open USB Serial Port to Ground ESP32 Type-C
const port = new SerialPort({ path: 'COM3', baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\\r\\n' }));

// 2. Start WebSocket Telemetry Server
const wss = new WebSocketServer({ port: 8080 });
console.log('[BRIDGE] WebSocket Telemetry Server listening on ws://localhost:8080');

// 3. Pipe Serial Telemetry to all connected web clients
parser.on('data', (line) => {
  try {
    const telemetry = JSON.parse(line);
    const payload = JSON.stringify({ ...telemetry, timestamp: Date.now() });
    
    wss.clients.forEach((client) => {
      if (client.readyState === 1) client.send(payload);
    });
  } catch (err) {
    console.error('[ERROR] Malformed JSON serial frame:', line);
  }
});`
    },
    interactiveLabId: "nodeBridge",
    cubeSatApplication: "Runs continuously in the ground station terminal to feed real-time satellite telemetry into NASA Open MCT and live web cockpits.",
    speakerNotes: [
      "Walk students through the 3-step pipeline: Ground ESP32 sends serial bytes -> bridge.js parses JSON lines -> WebSocket server broadcasts to Open MCT.",
      "Explain fan-out: A single hardware receiver plugged into one USB port can broadcast live telemetry to 50 engineers across the local mission control Wi-Fi network simultaneously!"
    ],
    vivaQuestions: [
      {
        question: "Why is node bridge.js necessary in the ground station software stack?",
        answer: "Because web browsers cannot easily or reliably share a single raw hardware USB COM port across multiple applications or clients. node bridge.js handles hardware serial communication at 115200 baud and converts it into a high-speed WebSocket feed accessible by NASA Open MCT and web dashboards."
      },
      {
        question: "How does bridge.js broadcast telemetry packets to multiple viewers?",
        answer: "It runs a WebSocket server (typically on port 8080). When a complete telemetry line arrives from the serial port, it iterates through all connected client sockets (wss.clients.forEach) and transmits the JSON payload in real time."
      }
    ]
  }
];

export const SLIDE_CATEGORIES = [
  "All Slides",
  "Introduction & Basics",
  "Hardware & ESP32",
  "Sensors & Formulas",
  "Protocols & Comm",
  "Ground Station & IoT"
] as const;

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the standard dimension of a 1U CubeSat unit?",
    options: ["5 cm × 5 cm × 5 cm", "10 cm × 10 cm × 10 cm", "20 cm × 20 cm × 20 cm", "15 cm × 15 cm × 15 cm"],
    correctIndex: 1,
    explanation: "A standard 1U CubeSat measures 10 cm × 10 cm × 10 cm with a nominal mass of up to 1.33 kg."
  },
  {
    id: 2,
    question: "Which barometric formula does the BMP280 use to compute altitude from pressure P?",
    options: [
      "h = 44330 * (1 - (P / P0)^(1 / 5.255))",
      "h = (P0 - P) * 9.81",
      "h = P * sin(theta) * 100",
      "h = 1013.25 / ln(P)"
    ],
    correctIndex: 0,
    explanation: "The hypsometric formula based on the International Standard Atmosphere is h = 44330 * (1 - (P / P0)^(1 / 5.255))."
  },
  {
    id: 3,
    question: "What resolution does the ESP32's built-in SAR ADC have?",
    options: ["8-bit (256 levels)", "10-bit (1024 levels)", "12-bit (4096 levels)", "16-bit (65536 levels)"],
    correctIndex: 2,
    explanation: "The ESP32 features a 12-bit ADC, which provides 2^12 = 4096 discrete levels (counts from 0 to 4095)."
  },
  {
    id: 4,
    question: "What is the physical principle behind a MEMS gyroscope measuring angular rotation?",
    options: ["Photoelectric effect", "Coriolis acceleration on a vibrating mass", "Doppler frequency shift", "Seebeck thermoelectric effect"],
    correctIndex: 1,
    explanation: "A MEMS gyroscope vibrates a silicon proof-mass; external rotation creates a Coriolis acceleration a = 2 * (v x Omega) detected by capacitive sensors."
  },
  {
    id: 5,
    question: "In a standard 8-N-1 UART frame, how many total bits are transmitted on the wire per byte?",
    options: ["8 bits", "9 bits", "10 bits", "12 bits"],
    correctIndex: 2,
    explanation: "1 Start bit + 8 Data bits + 0 Parity bits + 1 Stop bit = 10 bits total per byte."
  },
  {
    id: 6,
    question: "What happens to the resistance of an NTC thermistor when its temperature increases?",
    options: [
      "Resistance increases linearly",
      "Resistance decreases exponentially",
      "Resistance stays constant",
      "Resistance drops to exactly zero"
    ],
    correctIndex: 1,
    explanation: "NTC stands for Negative Temperature Coefficient: resistance decreases exponentially as temperature rises."
  },
  {
    id: 7,
    question: "Why should ADC1 be used instead of ADC2 on the ESP32 when Wi-Fi or ESP-NOW is active?",
    options: [
      "ADC1 has higher voltage capability",
      "ADC2 hardware is shared with the Wi-Fi/RF baseband and causes conflicts",
      "ADC1 consumes zero power",
      "ADC2 only works in deep sleep"
    ],
    correctIndex: 1,
    explanation: "ADC2 is multiplexed with the Wi-Fi/RF subsystem; calling analogRead on ADC2 while Wi-Fi/ESP-NOW is running causes conflicts and errors."
  },
  {
    id: 8,
    question: "What are the 3 rotational motions in 6-DoF aerospace dynamics?",
    options: [
      "Surge, Sway, Heave",
      "Roll, Pitch, Yaw",
      "Latitude, Longitude, Altitude",
      "Alpha, Beta, Gamma"
    ],
    correctIndex: 1,
    explanation: "Roll (rotation about X), Pitch (rotation about Y), and Yaw (rotation about Z) are the 3 rotational degrees of freedom."
  },
  {
    id: 9,
    question: "What protocol does the NEO-6M GPS module output over its UART serial interface?",
    options: ["CAN bus", "NMEA-0183 ($GPGGA, $GPRMC)", "Modbus RTU", "MIDI"],
    correctIndex: 1,
    explanation: "The NEO-6M GPS receiver outputs standard ASCII NMEA-0183 sentences such as $GPGGA and $GPRMC."
  },
  {
    id: 10,
    question: "What are 'Virtual Pins' in the Blynk IoT platform?",
    options: [
      "Physical GPIO pins soldered to the breadboard",
      "Software channels (V0-V255) for decoupling UI widgets from physical pins",
      "Virtual reality simulation pins",
      "Ground pins connected to Earth"
    ],
    correctIndex: 1,
    explanation: "Virtual Pins (V0-V255) are software channels that decouple cloud dashboard widgets from physical hardware pins, allowing transmission of multi-variable telemetry."
  },
  {
    id: 11,
    question: "What OSI layer does a MAC address belong to, and how many bits does it consist of?",
    options: [
      "Layer 2 (Data Link), 48 bits",
      "Layer 3 (Network), 32 bits",
      "Layer 4 (Transport), 16 bits",
      "Layer 7 (Application), 64 bits"
    ],
    correctIndex: 0,
    explanation: "A MAC address is a 48-bit (6-byte) physical identifier operating on Layer 2 (Data Link Layer) of the OSI model."
  },
  {
    id: 12,
    question: "How does a ceramic substrate miniaturize a patch antenna for CubeSats?",
    options: [
      "By absorbing all radio waves",
      "High dielectric permittivity (ε_r ≈ 25) compresses electromagnetic wavelength by √ε_r",
      "By converting radio waves to audio",
      "By cooling the antenna to sub-zero temperatures"
    ],
    correctIndex: 1,
    explanation: "Because resonant length is proportional to 1/√ε_r, a high-dielectric ceramic (ε_r ≈ 25) reduces physical antenna length by a factor of 5."
  },
  {
    id: 13,
    question: "What is NASA Open MCT?",
    options: [
      "A rocket propulsion calculation script",
      "An open-source, web-based mission control telemetry visualization framework developed by NASA Ames & JPL",
      "A satellite CAD drafting program",
      "An orbital debris tracking radar"
    ],
    correctIndex: 1,
    explanation: "NASA Open MCT is an open-source web-based mission control dashboard framework used for spacecraft and rover telemetry visualization."
  },
  {
    id: 14,
    question: "In a CubeSat ground station, what is the role of 'node bridge.js'?",
    options: [
      "It charges the satellite battery",
      "It reads USB-UART serial telemetry from the ESP32 and broadcasts it over WebSockets to web dashboards and NASA Open MCT",
      "It rotates the Earth's orbit",
      "It encrypts secret military codes"
    ],
    correctIndex: 1,
    explanation: "node bridge.js is the middleware script that opens the ESP32 USB serial port at 115200 baud and broadcasts JSON telemetry lines over WebSockets to web clients."
  }
];


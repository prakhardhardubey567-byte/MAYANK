import { SlideData } from '../types/presentation';

export interface TopicImageInfo {
  src: string;
  caption: string;
}

export function getTopicImage(slide: SlideData): TopicImageInfo {
  if (slide.heroImage) {
    return {
      src: slide.heroImage,
      caption: `${slide.title} · Aerospace Technical Reference`
    };
  }

  const titleLower = (slide.title + ' ' + slide.subtitle + ' ' + slide.category).toLowerCase();

  if (titleLower.includes('adc') || titleLower.includes('analog') || titleLower.includes('quantization')) {
    return {
      src: '/src/assets/images/adc_sampling_quantization_1793118576106.jpg',
      caption: 'Analog-to-Digital Conversion (ADC) · Signal Sampling & 12-bit Quantization Stair-Step'
    };
  }

  if (titleLower.includes('uart') || titleLower.includes('protocol') || titleLower.includes('mac') || titleLower.includes('ip')) {
    return {
      src: '/src/assets/images/uart_waveform_oscilloscope_1793118560170.jpg',
      caption: 'Digital Storage Oscilloscope · UART Serial Signal Waveform & Timing Analysis'
    };
  }

  if (
    titleLower.includes('esp32') ||
    titleLower.includes('transmitter') ||
    titleLower.includes('receiver') ||
    titleLower.includes('microcontroller') ||
    titleLower.includes('mcu')
  ) {
    return {
      src: '/src/assets/images/esp32_devkit_hardware_1793118521357.jpg',
      caption: 'ESP32 Dual-Core Type-C DevKit · Hardware & GPIO Avionics Bus'
    };
  }

  if (
    titleLower.includes('antenna') ||
    titleLower.includes('patch') ||
    titleLower.includes('ceramic') ||
    titleLower.includes('rf')
  ) {
    return {
      src: '/src/assets/images/ceramic_patch_antenna_1793118592123.jpg',
      caption: 'Ceramic Microstrip Patch Antenna · Dielectric Substrate & Spacecraft RF Link'
    };
  }

  if (titleLower.includes('blynk') || titleLower.includes('iot')) {
    return {
      src: '/src/assets/images/blynk_iot_telemetry_ui_1793118608957.jpg',
      caption: 'Blynk IoT Cloud Platform · Mobile Telemetry Dashboard & Live Gauges'
    };
  }

  if (
    titleLower.includes('orbit') ||
    titleLower.includes('satellite') ||
    titleLower.includes('gravity') ||
    titleLower.includes('newton')
  ) {
    return {
      src: '/src/assets/images/orbital_mechanics_earth_1793118631198.jpg',
      caption: 'Low Earth Orbit (LEO) Astrodynamics · Gravitational & Centrifugal Force Equilibrium'
    };
  }

  if (
    titleLower.includes('open mct') ||
    titleLower.includes('nasa') ||
    titleLower.includes('bridge') ||
    titleLower.includes('node')
  ) {
    return {
      src: '/src/assets/images/nasa_openmct_screen_1793115995051.jpg',
      caption: 'NASA Open MCT Mission Control · Telemetry Display & WebSocket Bridge'
    };
  }

  if (
    titleLower.includes('ground station') ||
    titleLower.includes('display') ||
    titleLower.includes('gui') ||
    titleLower.includes('block diagram')
  ) {
    return {
      src: '/src/assets/images/ground_station_display_1793077516199.jpg',
      caption: 'Mission Control Ground Station Console · Real-Time Telemetry Tracking'
    };
  }

  if (
    titleLower.includes('sensor') ||
    titleLower.includes('mpu') ||
    titleLower.includes('bmp') ||
    titleLower.includes('dht') ||
    titleLower.includes('gyro') ||
    titleLower.includes('thermistor') ||
    titleLower.includes('thermal')
  ) {
    return {
      src: '/src/assets/images/sensors_avionics_array_1793118544232.jpg',
      caption: 'Avionics Sensor Suite: MPU-6050 (6-DoF IMU), BMP280, DHT11 & GPS Patch Array'
    };
  }

  return {
    src: '/src/assets/images/cubesat_in_orbit_1793077486901.jpg',
    caption: '1U CubeSat Standard Nanosatellite in Low Earth Orbit'
  };
}

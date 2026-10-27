export type SlideCategory =
  | 'Introduction & Basics'
  | 'Hardware & ESP32'
  | 'Sensors & Formulas'
  | 'Protocols & Comm'
  | 'Ground Station & IoT';

export interface SlideFormula {
  title: string;
  expression: string;
  description: string;
  variables: { symbol: string; meaning: string; unit?: string }[];
}

export interface VivaQuestion {
  question: string;
  answer: string;
}

export interface SlideData {
  id: number;
  originalIndex: number;
  topicNumber: string;
  title: string;
  subtitle: string;
  category: SlideCategory;
  badge: string;
  heroImage?: string;
  summary: string;
  keyConcepts: {
    heading: string;
    details: string;
    highlights?: string[];
  }[];
  specifications?: { label: string; value: string }[];
  formulas?: SlideFormula[];
  cubeSatApplication: string;
  codeSnippet?: {
    title: string;
    language: string;
    code: string;
  };
  interactiveLabId?:
    | 'mpu6050'
    | 'bmp280'
    | 'dht11'
    | 'neo6m'
    | 'uart'
    | 'esp32'
    | 'adc'
    | 'blynk'
    | 'thermistor'
    | 'motion'
    | 'blockDiagram'
    | 'groundStation'
    | 'macIp'
    | 'ceramicAntenna'
    | 'nasaOpenMct'
    | 'nodeBridge';
  speakerNotes: string[];
  vivaQuestions: VivaQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { CUBESAT_SLIDES } from '../src/data/slidesData';
import { getTopicImage } from '../src/utils/topicImages';
import { TEAM_SPUTNIK_MEMBERS } from '../src/components/Presentation/TeamSputnikBanner';

const outputDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'CubeSat_Telemetry_Avionics_Team_Sputnik.pdf');

// Create landscape A4 PDF: 841.89 x 595.28 points
const doc = new PDFDocument({
  size: 'A4',
  layout: 'landscape',
  margins: { top: 35, bottom: 35, left: 40, right: 40 },
  autoFirstPage: false,
  info: {
    Title: 'CubeSat Telemetry & Avionics Presentation Deck',
    Author: 'TEAM SPUTNIK (Ujjwal Yadav, Priyanshu Yadav, Prakhar Dhar Dubey, Ratnesh Kumar Singh, Atul Kumar Maurya)',
    Subject: 'CubeSat Avionics, ESP32 Telemetry, Sensors, and Ground Station',
    Keywords: 'CubeSat, Avionics, Telemetry, ESP32, Team Sputnik, MPU6050, BMP280, NASA Open MCT'
  }
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

const PAGE_WIDTH = 841.89;
const PAGE_HEIGHT = 595.28;

// Function to draw background
function drawBackground() {
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT).fill('#080B11');
}

// Function to draw header
function drawHeader(slide: any) {
  doc.fillColor('#06b6d4').fontSize(9).font('Helvetica-Bold');
  doc.text(`MODULE ${slide.topicNumber}  ·  ${slide.category.toUpperCase()}  ·  ${slide.badge.toUpperCase()}`, 40, 25);
  doc.fillColor('#64748b').fontSize(8).font('Helvetica');
  doc.text('TEAM SPUTNIK · CUBESAT AVIONICS & TELEMETRY DECK', PAGE_WIDTH - 300, 25, { width: 260, align: 'right' });
  
  // Header line
  doc.strokeColor('#1e293b').lineWidth(1).moveTo(40, 38).lineTo(PAGE_WIDTH - 40, 38).stroke();
}

// Function to draw footer
function drawFooter(currentPage: number, totalPages: number) {
  doc.strokeColor('#1e293b').lineWidth(1).moveTo(40, PAGE_HEIGHT - 28).lineTo(PAGE_WIDTH - 40, PAGE_HEIGHT - 28).stroke();
  doc.fillColor('#64748b').fontSize(8).font('Helvetica');
  doc.text('AEROSPACE AVIONICS & NANOSATELLITE TELEMETRY SPECIFICATION', 40, PAGE_HEIGHT - 22);
  doc.text(`SLIDE ${currentPage} OF ${totalPages}`, PAGE_WIDTH - 150, PAGE_HEIGHT - 22, { width: 110, align: 'right' });
}

console.log('Generating PDF for', CUBESAT_SLIDES.length, 'slides...');

CUBESAT_SLIDES.forEach((slide, idx) => {
  doc.addPage();
  drawBackground();
  drawHeader(slide);

  // If Cover Slide (slide 0)
  if (slide.id === 0 || slide.topicNumber === '00') {
    // Title
    doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold');
    doc.text(slide.title, 40, 50, { width: PAGE_WIDTH - 80 });

    doc.fillColor('#94a3b8').fontSize(12).font('Helvetica');
    doc.text(slide.subtitle, 40, 82, { width: PAGE_WIDTH - 80 });

    // Team Card Box
    doc.rect(40, 105, PAGE_WIDTH - 80, 115).fillAndStroke('#0d1527', '#06b6d4');
    
    doc.fillColor('#38bdf8').fontSize(11).font('Helvetica-Bold');
    doc.text('MISSION PROJECT ROSTER  ·  TEAM NAME: TEAM SPUTNIK', 55, 118);

    doc.fillColor('#cbd5e1').fontSize(10).font('Helvetica-Bold');
    doc.text('PROJECT MEMBERS & FLIGHT CREW:', 55, 138);

    TEAM_SPUTNIK_MEMBERS.forEach((m, mIdx) => {
      const col = mIdx < 3 ? 55 : 430;
      const row = 158 + (mIdx % 3) * 18;
      
      doc.fillColor('#06b6d4').fontSize(10).font('Helvetica-Bold');
      doc.text(`${m.number}. `, col, row, { continued: true });
      
      doc.fillColor(m.isLeader ? '#38bdf8' : '#f8fafc').font('Helvetica-Bold');
      doc.text(m.name, { continued: !!m.role });
      
      if (m.role) {
        doc.fillColor('#fbbf24').font('Helvetica-Bold');
        doc.text(`  [ ${m.role} ]`);
      }
    });

    // Summary Box
    doc.rect(40, 230, PAGE_WIDTH - 80, 50).fillAndStroke('#0f172a', '#334155');
    doc.fillColor('#38bdf8').fontSize(9).font('Helvetica-Bold');
    doc.text('EXECUTIVE OVERVIEW:', 50, 238);
    doc.fillColor('#cbd5e1').fontSize(9).font('Helvetica');
    doc.text(slide.summary, 50, 252, { width: PAGE_WIDTH - 100, lineGap: 2 });

    // Hero Image on Cover
    const imgInfo = getTopicImage(slide);
    const absImgPath = path.resolve(process.cwd(), imgInfo.src.replace(/^\//, ''));
    if (fs.existsSync(absImgPath)) {
      try {
        doc.image(absImgPath, 40, 290, { width: 360, height: 200 });
        doc.rect(40, 290, 360, 200).stroke('#1e293b');
      } catch (e) {
        console.error('Failed to embed cover image:', e);
      }
    }

    // Right Column Key Concepts & Agenda
    doc.rect(420, 290, PAGE_WIDTH - 460, 200).fillAndStroke('#0f172a', '#1e293b');
    doc.fillColor('#38bdf8').fontSize(10).font('Helvetica-Bold');
    doc.text('CURRICULUM ARCHITECTURE & AGENDA', 435, 305);

    doc.fillColor('#94a3b8').fontSize(8.5).font('Helvetica');
    doc.text(
      '• Modules 01-07: CubeSat Form Factor, LEO Orbital Mechanics & Sensor Arrays\n• Modules 08-11: Embedded Microcontrollers, ESP32 Architecture & Pinouts\n• Modules 12-16: ADC Quantization, Steinhart-Hart Equations & Motion Gyroscopes\n• Modules 17-22: Communication Protocols, Ground Station, NASA Open MCT & WebSocket Bridge\n\nEquipped with 22 comprehensive technical modules, interactive telemetry instrumentation, formula derivations, and evaluators viva questions.',
      435,
      325,
      { width: PAGE_WIDTH - 490, lineGap: 3 }
    );

    // Specifications bottom strip
    if (slide.specifications) {
      doc.rect(40, 500, PAGE_WIDTH - 80, 55).fillAndStroke('#090d16', '#1e293b');
      slide.specifications.forEach((spec: any, sIdx: number) => {
        const xOffset = 50 + sIdx * 185;
        doc.fillColor('#64748b').fontSize(7.5).font('Helvetica-Bold');
        doc.text(spec.label.toUpperCase(), xOffset, 510);
        doc.fillColor('#f8fafc').fontSize(9).font('Helvetica-Bold');
        doc.text(spec.value, xOffset, 523);
      });
    }

  } else {
    // Regular Technical Slide
    // Title & Subtitle
    doc.fillColor('#ffffff').fontSize(18).font('Helvetica-Bold');
    doc.text(slide.title, 40, 48, { width: PAGE_WIDTH - 80 });

    doc.fillColor('#94a3b8').fontSize(10).font('Helvetica');
    doc.text(slide.subtitle, 40, 72, { width: PAGE_WIDTH - 80 });

    // Executive Summary
    doc.rect(40, 92, PAGE_WIDTH - 80, 42).fillAndStroke('#0f172a', '#1e293b');
    doc.fillColor('#38bdf8').fontSize(8).font('Helvetica-Bold');
    doc.text('CORE THESIS & DEFINITION:', 50, 98);
    doc.fillColor('#e2e8f0').fontSize(8.5).font('Helvetica');
    doc.text(slide.summary, 50, 110, { width: PAGE_WIDTH - 100, lineGap: 1.5 });

    // Left Column: Topic-Supporting Image
    const imgInfo = getTopicImage(slide);
    const absImgPath = path.resolve(process.cwd(), imgInfo.src.replace(/^\//, ''));
    const IMG_X = 40;
    const IMG_Y = 142;
    const IMG_W = 340;
    const IMG_H = 190;

    if (fs.existsSync(absImgPath)) {
      try {
        doc.image(absImgPath, IMG_X, IMG_Y, { width: IMG_W, height: IMG_H });
        doc.rect(IMG_X, IMG_Y, IMG_W, IMG_H).stroke('#334155');

        // Image caption overlay box
        doc.rect(IMG_X, IMG_Y + IMG_H - 24, IMG_W, 24).fill('#030712');
        doc.fillColor('#38bdf8').fontSize(7.5).font('Helvetica-Bold');
        doc.text(imgInfo.caption, IMG_X + 8, IMG_Y + IMG_H - 17, { width: IMG_W - 16, lineBreak: false });
      } catch (e) {
        console.error('Failed to embed image:', e);
      }
    }

    // Right Column: Key Concepts
    const RIGHT_X = 395;
    const RIGHT_W = PAGE_WIDTH - RIGHT_X - 40;
    let conceptY = 142;

    slide.keyConcepts.forEach((kc: any, kIdx: number) => {
      doc.rect(RIGHT_X, conceptY, RIGHT_W, 90).fillAndStroke('#0b1120', '#1e293b');
      doc.fillColor('#06b6d4').fontSize(9.5).font('Helvetica-Bold');
      doc.text(kc.heading, RIGHT_X + 10, conceptY + 8, { width: RIGHT_W - 20 });

      doc.fillColor('#cbd5e1').fontSize(8).font('Helvetica');
      doc.text(kc.details, RIGHT_X + 10, conceptY + 22, { width: RIGHT_W - 20, lineGap: 1.5 });

      if (kc.highlights && kc.highlights.length) {
        doc.fillColor('#94a3b8').fontSize(7.5).font('Helvetica-Oblique');
        doc.text(`Key Highlights: ${kc.highlights.join('  •  ')}`, RIGHT_X + 10, conceptY + 70, { width: RIGHT_W - 20 });
      }

      conceptY += 98;
    });

    // Lower Section: Specifications, Formulas, or Viva Questions
    const LOWER_Y = 342;
    const LOWER_H = 135;

    if (slide.formulas && slide.formulas.length > 0) {
      // Formulas block
      doc.rect(40, LOWER_Y, 440, LOWER_H).fillAndStroke('#090d16', '#1e293b');
      doc.fillColor('#f59e0b').fontSize(8.5).font('Helvetica-Bold');
      doc.text('MATHEMATICAL FORMULATIONS & PHYSICS DERIVATIONS', 50, LOWER_Y + 8);

      slide.formulas.slice(0, 2).forEach((f: any, fIdx: number) => {
        const fy = LOWER_Y + 22 + fIdx * 54;
        doc.fillColor('#fde68a').fontSize(8).font('Helvetica-Bold');
        doc.text(f.title, 50, fy);
        doc.fillColor('#ffffff').fontSize(9).font('Courier-Bold');
        doc.text(f.expression, 50, fy + 12);
        doc.fillColor('#94a3b8').fontSize(7.5).font('Helvetica');
        doc.text(f.description, 50, fy + 26, { width: 420, lineBreak: false });
      });

      // Viva questions next to formula
      doc.rect(490, LOWER_Y, PAGE_WIDTH - 530, LOWER_H).fillAndStroke('#090d16', '#1e293b');
      doc.fillColor('#10b981').fontSize(8.5).font('Helvetica-Bold');
      doc.text('EXAMINER VIVA QUESTIONS & DEFENSE ANSWERS', 500, LOWER_Y + 8);
      
      if (slide.vivaQuestions && slide.vivaQuestions[0]) {
        doc.fillColor('#f1f5f9').fontSize(8).font('Helvetica-Bold');
        doc.text(`Q: ${slide.vivaQuestions[0].question}`, 500, LOWER_Y + 24, { width: PAGE_WIDTH - 550 });
        doc.fillColor('#a7f3d0').fontSize(7.5).font('Helvetica');
        doc.text(`A: ${slide.vivaQuestions[0].answer}`, 500, LOWER_Y + 54, { width: PAGE_WIDTH - 550, lineGap: 1.5 });
      }

    } else if (slide.vivaQuestions && slide.vivaQuestions.length > 0) {
      // Viva full block
      doc.rect(40, LOWER_Y, PAGE_WIDTH - 80, LOWER_H).fillAndStroke('#090d16', '#1e293b');
      doc.fillColor('#10b981').fontSize(9).font('Helvetica-Bold');
      doc.text('EXAMINER VIVA QUESTIONS & TECHNICAL DEFENSE', 50, LOWER_Y + 8);

      slide.vivaQuestions.slice(0, 2).forEach((v: any, vIdx: number) => {
        const vy = LOWER_Y + 24 + vIdx * 54;
        doc.fillColor('#f8fafc').fontSize(8.5).font('Helvetica-Bold');
        doc.text(`Q${vIdx + 1}: ${v.question}`, 50, vy, { width: PAGE_WIDTH - 100 });
        doc.fillColor('#a7f3d0').fontSize(8).font('Helvetica');
        doc.text(`Ans: ${v.answer}`, 50, vy + 14, { width: PAGE_WIDTH - 100, lineGap: 1.5 });
      });
    }

    // Specifications strip
    if (slide.specifications && slide.specifications.length > 0) {
      doc.rect(40, 485, PAGE_WIDTH - 80, 42).fillAndStroke('#020617', '#0f172a');
      slide.specifications.slice(0, 4).forEach((spec: any, sIdx: number) => {
        const sx = 50 + sIdx * 185;
        doc.fillColor('#64748b').fontSize(7).font('Helvetica-Bold');
        doc.text(spec.label.toUpperCase(), sx, 492);
        doc.fillColor('#f8fafc').fontSize(8.5).font('Helvetica-Bold');
        doc.text(spec.value, sx, 504);
      });
    } else {
      // Mission application strip
      doc.rect(40, 485, PAGE_WIDTH - 80, 42).fillAndStroke('#020617', '#0f172a');
      doc.fillColor('#38bdf8').fontSize(7.5).font('Helvetica-Bold');
      doc.text('CUBESAT 1U PROTOTYPE FLIGHT ROLE:', 50, 492);
      doc.fillColor('#cbd5e1').fontSize(8).font('Helvetica');
      doc.text(slide.cubeSatApplication, 50, 504, { width: PAGE_WIDTH - 100, lineBreak: false });
    }
  }

  drawFooter(idx + 1, CUBESAT_SLIDES.length);
});

doc.end();

writeStream.on('finish', () => {
  const stats = fs.statSync(outputPath);
  console.log(`PDF successfully created at ${outputPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
});

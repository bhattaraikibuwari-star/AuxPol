import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate an SVG icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#31104b" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fcd34d" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" rx="112" fill="url(#bg)" />

  <!-- Outer Tech Circuit Ring -->
  <circle cx="256" cy="256" r="210" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="16 10" opacity="0.4" />
  <circle cx="256" cy="256" r="190" fill="none" stroke="#818cf8" stroke-width="2" opacity="0.6" />

  <!-- Robot Head Silhouette & Visor -->
  <g transform="translate(0, -10)">
    <!-- Antenna -->
    <line x1="256" y1="90" x2="256" y2="130" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" />
    <circle cx="256" cy="80" r="16" fill="url(#cyanGrad)" filter="url(#glow)" />
    <circle cx="256" cy="80" r="8" fill="#ffffff" />

    <!-- Robot Head Outline -->
    <rect x="136" y="130" width="240" height="200" rx="40" fill="#1e293b" stroke="#38bdf8" stroke-width="6" />
    
    <!-- Ears / Headsets -->
    <rect x="112" y="180" width="24" height="70" rx="8" fill="#38bdf8" />
    <rect x="376" y="180" width="24" height="70" rx="8" fill="#38bdf8" />

    <!-- Robot Glowing Visor / Screen -->
    <rect x="160" y="165" width="192" height="90" rx="20" fill="#090d16" stroke="#6366f1" stroke-width="3" />
    
    <!-- Glowing Visor Waveform / Eyes -->
    <rect x="180" y="195" width="45" height="30" rx="8" fill="#38bdf8" filter="url(#glow)" />
    <rect x="287" y="195" width="45" height="30" rx="8" fill="#38bdf8" filter="url(#glow)" />
    <circle cx="202" cy="210" r="6" fill="#ffffff" />
    <circle cx="309" cy="210" r="6" fill="#ffffff" />

    <!-- Speaker Grid / Mouth -->
    <line x1="210" y1="290" x2="302" y2="290" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
    <line x1="225" y1="302" x2="287" y2="302" stroke="#818cf8" stroke-width="3" stroke-linecap="round" />

    <!-- Classical Pillars / Scales of Justice Emblem on Forehead -->
    <g transform="translate(256, 145) scale(0.65)">
      <!-- Balance Scales / Justice -->
      <path d="M-30,-5 L30,-5 M0,-5 L0,20 M-30,-5 L-40,15 M-30,-5 L-20,15 M30,-5 L20,15 M30,-5 L40,15" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" fill="none" />
      <path d="M-45,15 Q-30,25 -15,15 Z" fill="url(#goldGrad)" opacity="0.9" />
      <path d="M15,15 Q30,25 45,15 Z" fill="url(#goldGrad)" opacity="0.9" />
    </g>
  </g>

  <!-- Constitution Book / Pedestal -->
  <g transform="translate(136, 350)">
    <path d="M10,20 Q120,-10 230,20 L230,85 Q120,55 10,85 Z" fill="#334155" stroke="#f59e0b" stroke-width="4" />
    <path d="M10,20 Q120,45 230,20" stroke="#f59e0b" stroke-width="3" fill="none" />
    <!-- Book Bookmark Ribbon -->
    <path d="M115,20 L115,95 L120,90 L125,95 L125,20" fill="#ef4444" />
    <!-- Text lines -->
    <line x1="30" y1="42" x2="100" y2="42" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
    <line x1="30" y1="56" x2="90" y2="56" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
    <line x1="140" y1="42" x2="210" y2="42" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
    <line x1="140" y1="56" x2="200" y2="56" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
  </g>

  <!-- Badge at Bottom: Prof. Ranjit B. Chetry / Auxilium -->
  <rect x="90" y="445" width="332" height="34" rx="17" fill="#1e1b4b" stroke="#f59e0b" stroke-width="2" />
  <text x="256" y="468" text-anchor="middle" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="1.2">
    POLITICAL SCIENCE • AUXILIUM
  </text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon, 'utf8');

// Function to generate raw uncompressed PNG buffer using built-in zlib
function createPngBuffer(width, height, isMaskable = false) {
  // We will build a clean 32-bit RGBA PNG
  // Color palette: deep navy slate, cyan glowing visor, gold accents
  const rowSize = width * 4 + 1; // 1 filter byte per scanline
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;

      // Normalized coordinates -1 to 1
      const nx = (x / width) * 2 - 1;
      const ny = (y / height) * 2 - 1;
      const dist = Math.sqrt(nx * nx + ny * ny);

      // Background gradient
      let r = 15 + Math.floor((ny + 1) * 15);
      let g = 23 + Math.floor((ny + 1) * 12);
      let b = 42 + Math.floor((ny + 1) * 35);
      let a = 255;

      if (!isMaskable) {
        // Rounded corner for regular icon
        const cornerDist = Math.max(Math.abs(nx), Math.abs(ny));
        if (Math.abs(nx) > 0.8 && Math.abs(ny) > 0.8) {
          const cornerX = Math.abs(nx) - 0.8;
          const cornerY = Math.abs(ny) - 0.8;
          if (cornerX * cornerX + cornerY * cornerY > 0.038) {
            a = 0;
          }
        }
      }

      // Robot Head Box: nx between -0.55 and 0.55, ny between -0.45 and 0.25
      const inHead = nx >= -0.52 && nx <= 0.52 && ny >= -0.42 && ny <= 0.25;
      const inVisor = nx >= -0.42 && nx <= 0.42 && ny >= -0.25 && ny <= 0.05;
      const inLeftEye = nx >= -0.32 && nx <= -0.12 && ny >= -0.18 && ny <= -0.02;
      const inRightEye = nx >= 0.12 && nx <= 0.32 && ny >= -0.18 && ny <= -0.02;
      const inAntenna = Math.abs(nx) <= 0.04 && ny >= -0.65 && ny <= -0.42;
      const inAntennaBall = Math.sqrt(nx * nx + (ny + 0.7) * (ny + 0.7)) <= 0.08;
      const inBook = nx >= -0.55 && nx <= 0.55 && ny >= 0.35 && ny <= 0.65;
      const inGoldRibbon = Math.abs(nx) <= 0.06 && ny >= 0.35 && ny <= 0.72;

      if (a > 0) {
        if (inAntennaBall) {
          r = 56; g = 189; b = 248; // Cyan
        } else if (inAntenna) {
          r = 56; g = 189; b = 248;
        } else if (inLeftEye || inRightEye) {
          r = 255; g = 255; b = 255; // Bright white eye/visor
        } else if (inVisor) {
          r = 10; g = 15; b = 30; // Dark visor screen
        } else if (inHead) {
          // Head border or inner
          const isHeadBorder = Math.abs(nx) >= 0.48 || ny <= -0.38 || ny >= 0.21;
          if (isHeadBorder) {
            r = 99; g = 102; b = 241; // Indigo border
          } else {
            r = 30; g = 41; b = 59; // Slate-800
          }
        } else if (inGoldRibbon) {
          r = 239; g = 68; b = 68; // Red ribbon
        } else if (inBook) {
          r = 245; g = 158; b = 11; // Gold constitution book
        } else if (Math.abs(dist - 0.85) < 0.02) {
          r = 56; g = 189; b = 248; // Outer tech ring
        }
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  // Deflate IDAT
  const compressed = zlib.deflateSync(rawData);

  // Build PNG chunk helper
  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);

    const typeBuf = Buffer.from(type, 'ascii');
    const crcVal = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crcVal >>> 0, 0);

    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // CRC32 implementation
  function crc32(buf) {
    let crc = 0 ^ -1;
    for (let i = 0; i < buf.length; i++) {
      let c = (crc ^ buf[i]) & 0xff;
      for (let j = 0; j < 8; j++) {
        c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      crc = (crc >>> 8) ^ c;
    }
    return (crc ^ -1) >>> 0;
  }

  const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: 6 (RGBA)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  const ihdrChunk = chunk('IHDR', ihdrData);
  const idatChunk = chunk('IDAT', compressed);
  const iendChunk = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);
}

// Write the PNGs
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPngBuffer(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPngBuffer(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPngBuffer(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPngBuffer(180, 180, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPngBuffer(64, 64, false));

console.log('All icons generated successfully in /public');

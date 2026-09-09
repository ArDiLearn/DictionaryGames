import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crc ^ buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);

  return Buffer.concat([len, typeAndData, crc]);
}

function generatePng(size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); // width
  ihdr.writeUInt32BE(size, 4); // height
  ihdr.writeUInt8(8, 8);      // bit depth
  ihdr.writeUInt8(6, 9);      // RGBA
  ihdr.writeUInt8(0, 10);     // compression
  ihdr.writeUInt8(0, 11);     // filter
  ihdr.writeUInt8(0, 12);     // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image data: filter byte (0) + RGBA per pixel
  const rowSize = 1 + size * 4;
  const rawData = Buffer.alloc(rowSize * size);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.44;

  for (let y = 0; y < size; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter 0 (None)

    for (let x = 0; x < size; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Rounded rect / circle distance
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      const cornerR = size * 0.22;
      let inside = false;

      if (dx <= cx - cornerR || dy <= cy - cornerR) {
        inside = true;
      } else {
        const cdx = dx - (cx - cornerR);
        const cdy = dy - (cy - cornerR);
        if (cdx * cdx + cdy * cdy <= cornerR * cornerR) {
          inside = true;
        }
      }

      if (inside) {
        // Gradient from Indigo #6366f1 to Sky #38bdf8 to Pink #ec4899
        const t = (x + y) / (2 * size);
        const r = Math.floor(99 * (1 - t) + 236 * t);
        const g = Math.floor(102 * (1 - t) + 72 * t);
        const b = Math.floor(241 * (1 - t) + 153 * t);

        // Center star / symbol check
        const distFromCenter = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (distFromCenter < size * 0.2) {
          // Yellow star center
          rawData[pxOffset] = 250;     // R
          rawData[pxOffset + 1] = 204; // G
          rawData[pxOffset + 2] = 21;  // B
          rawData[pxOffset + 3] = 255; // A
        } else {
          rawData[pxOffset] = r;
          rawData[pxOffset + 1] = g;
          rawData[pxOffset + 2] = b;
          rawData[pxOffset + 3] = 255;
        }
      } else {
        // Transparent
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const pubDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(pubDir)) {
  fs.mkdirSync(pubDir, { recursive: true });
}

fs.writeFileSync(path.join(pubDir, 'pwa-192x192.png'), generatePng(192));
fs.writeFileSync(path.join(pubDir, 'pwa-512x512.png'), generatePng(512));
console.log('Successfully generated PWA icon PNGs in public/');

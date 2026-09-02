const sharp = require('sharp');
const path = require('path');

async function processImage() {
  const inputPath = path.join(__dirname, 'public', 'images', 'cta-vet.jpg');
  const outputPath = path.join(__dirname, 'public', 'images', 'cta-vet.png');

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Extract raw RGBA channels
  const rawBuffer = await image
    .ensureAlpha()
    .raw()
    .toBuffer();

  const totalPixels = width * height;
  const outputBuffer = Buffer.from(rawBuffer);

  // Smooth matte thresholding: anything dark black is transparent, with clean feathering
  for (let i = 0; i < totalPixels; i++) {
    const offset = i * 4;
    const r = outputBuffer[offset];
    const g = outputBuffer[offset + 1];
    const b = outputBuffer[offset + 2];

    const maxVal = Math.max(r, g, b);

    if (maxVal <= 10) {
      outputBuffer[offset + 3] = 0; // completely transparent
    } else if (maxVal < 45) {
      // Smooth alpha transition ramp
      const alpha = Math.round(((maxVal - 10) / (45 - 10)) * 255);
      outputBuffer[offset + 3] = Math.min(outputBuffer[offset + 3], alpha);
    }
  }

  await sharp(outputBuffer, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

  console.log('Successfully generated refined transparent PNG at:', outputPath);
}

processImage().catch(console.error);

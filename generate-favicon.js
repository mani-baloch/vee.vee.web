const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function makeFavicons() {
  const svgPath = path.join(__dirname, 'public', 'icon.svg');
  const png32Path = path.join(__dirname, 'src', 'app', 'icon.png');
  const publicPngPath = path.join(__dirname, 'public', 'icon.png');
  const icoPath = path.join(__dirname, 'src', 'app', 'favicon.ico');
  const publicIcoPath = path.join(__dirname, 'public', 'favicon.ico');

  // Generate 64x64 PNG
  const pngBuffer = await sharp(svgPath)
    .resize(64, 64)
    .png()
    .toBuffer();

  fs.writeFileSync(png32Path, pngBuffer);
  fs.writeFileSync(publicPngPath, pngBuffer);
  fs.writeFileSync(icoPath, pngBuffer);
  fs.writeFileSync(publicIcoPath, pngBuffer);

  console.log('Successfully generated vee.vet favicon icons!');
}

makeFavicons().catch(console.error);

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const sizes = [192, 512];
const inputSvg = './public/money-icon.svg';

async function generateIcons() {
  try {
    for (const size of sizes) {
      const outputPath = `./public/money-${size}x${size}.png`;
      await sharp(inputSvg)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`Generated ${outputPath}`);
    }
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
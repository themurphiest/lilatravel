const fs = require('fs');
const path = require('path');

const photosFile = fs.readFileSync('src/data/photos.js', 'utf8');
const regex = /(\w+):\s*"data:image\/(jpeg|png|webp);base64,([^"]+)"/g;
let match;

const outputDir = 'public/images';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

let count = 0;
while ((match = regex.exec(photosFile)) !== null) {
  const [, name, format, base64Data] = match;
  const ext = format === 'jpeg' ? 'jpg' : format;
  const filename = `${name}.${ext}`;
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  console.log(`Extracted: ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
  count++;
}

console.log(`\nDone! Extracted ${count} images to ${outputDir}/`);

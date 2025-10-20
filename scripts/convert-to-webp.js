// Convert PNG images to WebP format for better performance
// This script converts all screenshots from PNG to WebP, reducing file size by ~70%

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENSHOTS_DIR = path.join(__dirname, '../public/screenshots');
const QUALITY = 85; // Good balance between quality and file size

async function convertToWebP() {
  console.log('🎨 Converting PNG images to WebP format...\n');

  try {
    // Get all PNG files
    const files = fs.readdirSync(SCREENSHOTS_DIR)
      .filter(file => file.endsWith('.png'));

    console.log(`Found ${files.length} PNG files to convert\n`);

    let totalOriginalSize = 0;
    let totalWebPSize = 0;

    for (const file of files) {
      const inputPath = path.join(SCREENSHOTS_DIR, file);
      const outputPath = path.join(SCREENSHOTS_DIR, file.replace('.png', '.webp'));

      // Get original file size
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;

      // Convert to WebP
      await sharp(inputPath)
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(outputPath);

      // Get WebP file size
      const webpStats = fs.statSync(outputPath);
      totalWebPSize += webpStats.size;

      const sizeDiff = originalStats.size - webpStats.size;
      const percentReduction = ((sizeDiff / originalStats.size) * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   PNG: ${(originalStats.size / 1024).toFixed(1)} KB`);
      console.log(`   WebP: ${(webpStats.size / 1024).toFixed(1)} KB`);
      console.log(`   Saved: ${(sizeDiff / 1024).toFixed(1)} KB (${percentReduction}% smaller)\n`);
    }

    const totalSizeDiff = totalOriginalSize - totalWebPSize;
    const totalPercentReduction = ((totalSizeDiff / totalOriginalSize) * 100).toFixed(1);

    console.log('📊 Summary:');
    console.log(`   Total PNG size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Total WebP size: ${(totalWebPSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Total saved: ${(totalSizeDiff / 1024 / 1024).toFixed(2)} MB (${totalPercentReduction}% reduction)`);
    console.log('\n✨ Conversion complete!');

  } catch (error) {
    console.error('❌ Error converting images:', error);
    process.exit(1);
  }
}

convertToWebP();

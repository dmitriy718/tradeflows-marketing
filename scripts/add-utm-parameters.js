/**
 * Bulk UTM Parameter Updater
 * Automatically adds UTM parameters to external links
 *
 * Run: node scripts/add-utm-parameters.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define link replacements with UTM parameters
const replacements = [
  // Navigation - Sign In
  {
    old: 'href="https://app.tradeflows.net"',
    new: 'href="https://app.tradeflows.net?utm_source=website&utm_medium=navigation&utm_campaign=signin"',
    context: 'Sign In links'
  },
  // Navigation - Start Free Trial
  {
    old: 'href="https://app.tradeflows.net?signup=true"',
    new: 'href="https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=navigation&utm_campaign=trial"',
    context: 'Navigation trial CTAs'
  },
  // Homepage Hero CTA
  {
    old: '<a href="https://app.tradeflows.net?signup=true" className="btn btn-hero-primary">',
    new: '<a href="https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=hero&utm_campaign=trial" className="btn btn-hero-primary">',
    context: 'Homepage hero CTA'
  },
  // Generic signup links (catch-all)
  {
    old: /"https:\/\/app\.tradeflows\.net\?signup=true"/g,
    new: '"https://app.tradeflows.net?signup=true&utm_source=website&utm_medium=cta&utm_campaign=signup"',
    context: 'Generic signup links'
  }
];

// Files to process
const filesToProcess = [
  'src/components/Navigation.jsx',
  'src/pages/HomePage.jsx',
  'src/pages/PricingPage.jsx',
  'src/pages/ComparisonPage.jsx',
  'src/pages/FeaturesPage.jsx',
  'src/components/ROICalculator.jsx'
];

function processFile(filePath) {
  console.log(`\n📝 Processing: ${filePath}`);

  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return {
      processed: false,
      replacements: 0
    };
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let replacementCount = 0;
  const appliedReplacements = [];

  replacements.forEach(({ old, new: replacement, context }) => {
    const isRegex = old instanceof RegExp;

    if (isRegex) {
      const matches = content.match(old);
      if (matches) {
        content = content.replace(old, replacement);
        replacementCount += matches.length;
        appliedReplacements.push(`${context}: ${matches.length} instance(s)`);
      }
    } else {
      if (content.includes(old)) {
        content = content.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
        const count = (content.match(new RegExp(replacement.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        replacementCount += count;
        appliedReplacements.push(`${context}: ${count} instance(s)`);
      }
    }
  });

  if (replacementCount > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated ${replacementCount} link(s):`);
    appliedReplacements.forEach(r => console.log(`   - ${r}`));
  } else {
    console.log(`ℹ️  No changes needed`);
  }

  return {
    processed: true,
    replacements: replacementCount
  };
}

function main() {
  console.log('🚀 Starting UTM Parameter Bulk Update...\n');
  console.log('=' .repeat(60));

  let totalFiles = 0;
  let totalReplacements = 0;

  filesToProcess.forEach(file => {
    const result = processFile(file);
    if (result.processed) {
      totalFiles++;
      totalReplacements += result.replacements;
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log(`\n✨ Update Complete!`);
  console.log(`   Files processed: ${totalFiles}`);
  console.log(`   Total links updated: ${totalReplacements}`);
  console.log('\n💡 All external links now include UTM tracking parameters');
  console.log('   Monitor conversions in Google Analytics\n');
}

main();

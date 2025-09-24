// Simple validation script to check if all files are properly linked
const fs = require('fs');
const path = require('path');

function validateFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return { exists: true, size: stats.size };
  } catch (error) {
    return { exists: false, error: error.message };
  }
}

function validateProject() {
  console.log('🔍 Validating Badoiu Valentin Portfolio Project...');
  console.log('================================================\n');
  
  // Core files to check
  const requiredFiles = [
    'index.html',
    'css/styles.css',
    'js/animations.js',
    'README.md'
  ];
  
  const optionalFiles = [
    'netlify.toml',
    'package.json',
    'demo.html',
    'css/dev-helpers.css'
  ];
  
  let allValid = true;
  
  // Check required files
  console.log('✅ Required Files:');
  requiredFiles.forEach(file => {
    const result = validateFile(file);
    if (result.exists) {
      console.log(`  ✓ ${file} (${(result.size / 1024).toFixed(1)}KB)`);
    } else {
      console.log(`  ❌ ${file} - MISSING`);
      allValid = false;
    }
  });
  
  // Check optional files
  console.log('\n📁 Optional Files:');
  optionalFiles.forEach(file => {
    const result = validateFile(file);
    if (result.exists) {
      console.log(`  ✓ ${file} (${(result.size / 1024).toFixed(1)}KB)`);
    } else {
      console.log(`  • ${file} - not present`);
    }
  });
  
  // Check directory structure
  console.log('\n📂 Directory Structure:');
  const directories = ['css', 'js', 'assets', 'assets/images', 'assets/icons'];
  directories.forEach(dir => {
    try {
      const stats = fs.statSync(dir);
      if (stats.isDirectory()) {
        console.log(`  ✓ ${dir}/`);
      }
    } catch (error) {
      console.log(`  ❌ ${dir}/ - MISSING`);
      allValid = false;
    }
  });
  
  // Basic HTML validation
  console.log('\n🔍 Basic Validation:');
  try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    const cssContent = fs.readFileSync('css/styles.css', 'utf8');
    const jsContent = fs.readFileSync('js/animations.js', 'utf8');
    
    // Check for basic HTML structure
    if (htmlContent.includes('<!DOCTYPE html>') && 
        htmlContent.includes('<title>') && 
        htmlContent.includes('Badoiu Valentin')) {
      console.log('  ✓ HTML structure valid');
    } else {
      console.log('  ❌ HTML structure issues detected');
      allValid = false;
    }
    
    // Check for CSS variables
    if (cssContent.includes(':root {') && 
        cssContent.includes('--hero-duration:') &&
        cssContent.includes('--reveal-easing:')) {
      console.log('  ✓ CSS animation variables present');
    } else {
      console.log('  ❌ CSS animation variables missing');
      allValid = false;
    }
    
    // Check for JavaScript classes
    if (jsContent.includes('class HeroAnimations') && 
        jsContent.includes('class ScrollAnimations') &&
        jsContent.includes('IntersectionObserver')) {
      console.log('  ✓ JavaScript animation classes present');
    } else {
      console.log('  ❌ JavaScript animation classes missing');
      allValid = false;
    }
    
  } catch (error) {
    console.log(`  ❌ Error reading files: ${error.message}`);
    allValid = false;
  }
  
  // Final result
  console.log('\n================================================');
  if (allValid) {
    console.log('✅ Project validation PASSED!');
    console.log('\n🚀 Ready for deployment!');
    console.log('\n🔧 Next steps:');
    console.log('  1. Add your images to assets/images/');
    console.log('  2. Test locally: npm run serve');
    console.log('  3. Deploy: npm run deploy:netlify or npm run deploy:vercel');
  } else {
    console.log('❌ Project validation FAILED!');
    console.log('\n🔧 Please fix the issues above and run validation again.');
  }
  
  return allValid;
}

// Run validation if called directly
if (require.main === module) {
  const isValid = validateProject();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateProject };
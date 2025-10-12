import fs from "fs";
import path from "path";

// ==== USER CONFIGURATION ====
// Change these manually each time
const inputFolder =
  "D:/Web_Dev/React_Projects/React_Base_Layouts/CryptoToday/src/website_combinations/combination_420";
const outputFolder =
  "D:/Web_Dev/React_Projects/React_Base_Layouts/420/src/components";
// =============================

if (!fs.existsSync(inputFolder)) {
  console.error(`❌ Input folder not found: ${inputFolder}`);
  process.exit(1);
}

if (!fs.existsSync(outputFolder)) {
  console.error(`❌ Output folder not found: ${outputFolder}`);
  process.exit(1);
}

// Read all .jsx files in input folder
const files = fs.readdirSync(inputFolder).filter((f) => f.endsWith(".jsx"));

files.forEach((file) => {
  const srcPath = path.join(inputFolder, file);
  const sectionName = path.parse(file).name; // e.g., Section_1
  const destFolder = path.join(outputFolder, sectionName);

  // Create folder if it doesn't exist
  if (!fs.existsSync(destFolder)) {
    console.warn(
      `⚠️ Destination folder does not exist, creating: ${destFolder}`
    );
    fs.mkdirSync(destFolder, { recursive: true });
  }

  const destPath = path.join(destFolder, file);

  // Copy and overwrite the file
  fs.copyFileSync(srcPath, destPath);
  console.log(`✅ Copied ${file} → ${destFolder}`);
});

console.log("🎉 All .jsx files copied to their corresponding Section folders!");

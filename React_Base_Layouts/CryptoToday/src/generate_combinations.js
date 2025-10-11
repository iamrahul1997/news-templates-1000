// import fs from "fs";
// import path from "path";
// import csv from "csv-parser";
// import { fileURLToPath } from "url";

// // Get __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Paths
// const componentsDir = path.join(__dirname, "components");
// const combinationsCsv = path.join(__dirname, "950_websites_components.csv");
// const outputDir = path.join(__dirname, "website_combinations");

// // Create output folder if it doesn't exist
// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir);
// }

// // Read CSV
// const combinations = [];
// fs.createReadStream(combinationsCsv)
//   .pipe(csv())
//   .on("data", (row) => {
//     combinations.push([
//       row.Component1,
//       row.Component2,
//       row.Component3,
//       row.Component4,
//       row.Component5,
//     ]);
//   })
//   .on("end", () => {
//     console.log(`Read ${combinations.length} website combinations`);

//     // Only take first 2 combinations for testing
//     combinations.slice(0, 2).forEach((components, idx) => {
//       const comboFolder = path.join(outputDir, `combination_${idx + 1}`);
//       if (!fs.existsSync(comboFolder)) {
//         fs.mkdirSync(comboFolder);
//       }

//       components.forEach((componentName, index) => {
//         // Convert C1 -> Section_1, C2 -> Section_2 ...
//         const num = componentName.replace("C", "");
//         const srcFolder = `Section_${num}`;
//         const srcFile = `Section_${num}.jsx`;

//         const srcPath = path.join(componentsDir, srcFolder, srcFile);
//         const destPath = path.join(comboFolder, `Section_${index + 1}.jsx`);

//         if (fs.existsSync(srcPath)) {
//           const content = fs.readFileSync(srcPath, "utf-8");
//           fs.writeFileSync(destPath, content);
//         } else {
//           console.warn(`File not found: ${srcPath}`);
//         }
//       });
//     });

//     console.log(
//       "2 test combinations created successfully with sequential Section_#.jsx files!"
//     );
//   });

import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const componentsDir = path.join(__dirname, "components");
const combinationsCsv = path.join(__dirname, "950_websites_components.csv");
const outputDir = path.join(__dirname, "website_combinations");

// Create output folder if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Read CSV
const combinations = [];
fs.createReadStream(combinationsCsv)
  .pipe(csv())
  .on("data", (row) => {
    combinations.push([
      row.Component1,
      row.Component2,
      row.Component3,
      row.Component4,
      row.Component5,
    ]);
  })
  .on("end", () => {
    console.log(`Read ${combinations.length} website combinations`);

    combinations.forEach((components, idx) => {
      const comboFolder = path.join(outputDir, `combination_${idx + 1}`);
      if (!fs.existsSync(comboFolder)) {
        fs.mkdirSync(comboFolder);
      }

      components.forEach((componentName, index) => {
        // Convert C1 -> Section_1, C2 -> Section_2 ...
        const num = componentName.replace("C", "");
        const srcFolder = `Section_${num}`;
        const srcFile = `Section_${num}.jsx`;

        const srcPath = path.join(componentsDir, srcFolder, srcFile);
        const destPath = path.join(comboFolder, `Section_${index + 1}.jsx`);

        if (fs.existsSync(srcPath)) {
          const content = fs.readFileSync(srcPath, "utf-8");
          fs.writeFileSync(destPath, content);
        } else {
          console.warn(`File not found: ${srcPath}`);
        }
      });

      if ((idx + 1) % 50 === 0) {
        console.log(`Created ${idx + 1} combination folders...`);
      }
    });

    console.log("All 950 combination folders created successfully!");
  });

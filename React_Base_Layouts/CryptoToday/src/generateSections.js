// generateSections.js (ES module version)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Needed to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, "components");

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir);
}

for (let i = 68; i <= 100; i++) {
  const sectionFolder = path.join(componentsDir, `Section_${i}`);
  if (!fs.existsSync(sectionFolder)) {
    fs.mkdirSync(sectionFolder);
  }

  const componentContent = `import React from "react";

export default function Section_${i}() {
  return (
    <div>
      <h2>Section ${i}</h2>
      <p>This is Section ${i} component.</p>
    </div>
  );
}
`;

  fs.writeFileSync(
    path.join(sectionFolder, `Section_${i}.jsx`),
    componentContent,
    "utf8"
  );
  console.log(`Created Section_${i}/Section_${i}.jsx`);
}

console.log("All sections from 68 to 100 created successfully!");

import fs from "fs";

const input = "950_websites_components_randomized.csv";
const output = "950_websites_components.csv";

const data = fs.readFileSync(input, "utf8").split("\n");
const header = data.shift();

const converted = data
  .map((line) =>
    line
      .replace(/Section_/g, "C") // rename all
      .trim()
  )
  .filter(Boolean);

fs.writeFileSync(output, [header, ...converted].join("\n"), "utf8");

console.log("✅ Converted successfully →", output);

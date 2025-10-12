import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// node create_react_project.js

// ===============================
// CONFIGURATION
// ===============================
const projectName = "420"; // 👈 change this name each time you run
const projectPath = path.resolve(projectName);

// ===============================
// Helper to run shell commands
// ===============================
function run(command, cwd = process.cwd()) {
  console.log(`\n> ${command}`);
  execSync(command, { stdio: "inherit", cwd });
}

// ===============================
// Step 1: Create Vite React project
// ===============================
console.log(`🚀 Creating project: ${projectName}`);
run(`npm create vite@latest ${projectName} -- --template react`);

// ===============================
// Step 2: Install dependencies
// ===============================
console.log("\n📦 Installing dependencies...");
run("npm install", projectPath);
run("npm install @tanstack/react-query react-router-dom", projectPath);
run("npm install tailwindcss @tailwindcss/vite", projectPath);

// ===============================
// Step 3: Create folder structure
// ===============================
console.log("\n📁 Setting up folders...");
const dirs = [
  "api",
  "src/components/Article",
  "src/components/Footer",
  "src/components/Header",
  "src/components/Home",
  "src/components/Section_1",
  "src/components/Section_2",
  "src/components/Section_3",
  "src/components/Section_4",
  "src/components/Section_5",
  "src/utils",
];

dirs.forEach((dir) =>
  fs.mkdirSync(path.join(projectPath, dir), { recursive: true })
);

// ===============================
// Step 4: Create component files placeholders
// ===============================
const componentFiles = [
  "src/components/Article/Article.jsx",
  "src/components/Header/Header.jsx",
  "src/components/Footer/Footer.jsx",
  "src/components/Section_1/Section_1.jsx",
  "src/components/Section_2/Section_2.jsx",
  "src/components/Section_3/Section_3.jsx",
  "src/components/Section_4/Section_4.jsx",
  "src/components/Section_5/Section_5.jsx",
];

componentFiles.forEach((file) => {
  const filePath = path.join(projectPath, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      `import React from "react";

export default function ${path.basename(file, ".jsx")}() {
  return <div>${path.basename(file, ".jsx")} component</div>;
}
`
    );
  }
});

// ===============================
// Step 5: Write remembered files
// ===============================

// .env
fs.writeFileSync(
  path.join(projectPath, ".env"),
  `VITE_API_BASE_URL=https://api.coinsae.com/api/v1/client
VITE_SITE_URL=https://rollandearn.com
VITE_API_KEY=Test@!3`
);

// vite.config.js
fs.writeFileSync(
  path.join(projectPath, "vite.config.js"),
  `import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});`
);

// api/client.js
fs.writeFileSync(
  path.join(projectPath, "api", "client.js"),
  `const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getPosts(page = 1) {
  const API_URL = \`\${BASE_URL}?uri=\${SITE_URL}&page=\${page}&api_key=\${API_KEY}\`;

  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(\`Error \${res.status}\`);
  }

  return res.json();
}`
);

// src/utils/extractLinks.js
fs.writeFileSync(
  path.join(projectPath, "src/utils", "extractLinks.js"),
  `export function extractAllLinkText(htmlString = "") {
  if (!htmlString) return "";
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  const links = div.querySelectorAll("a");
  return Array.from(links)
    .map((link) => link.textContent)
    .join(", ");
}`
);

// src/App.jsx
fs.writeFileSync(
  path.join(projectPath, "src", "App.jsx"),
  `import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;`
);

// src/main.jsx
fs.writeFileSync(
  path.join(projectPath, "src/main.jsx"),
  `import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Article from "./components/Article/Article.jsx";
import Home from "./components/Home/Home.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="article/:slug" element={<Article />} />
    </Route>
  )
);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);`
);

// src/components/Home/Home.jsx
fs.writeFileSync(
  path.join(projectPath, "src/components/Home/Home.jsx"),
  `import React from "react";
import Section_1 from "../Section_1/Section_1";
import Section_2 from "../Section_2/Section_2";
import Section_3 from "../Section_3/Section_3";
import Section_4 from "../Section_4/Section_4";
import Section_5 from "../Section_5/Section_5";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      <Section_1 />
      <Section_2 />
      <Section_3 />
      <Section_4 />
      <Section_5 />
    </div>
  );
}`
);

// src/index.css
fs.writeFileSync(
  path.join(projectPath, "src/index.css"),
  '@import "tailwindcss";'
);

// ===============================
// Done
// ===============================
console.log(`\n✅ Project "${projectName}" created successfully!`);
console.log(`👉 Next steps:`);
console.log(`cd ${projectName}`);
console.log(`npm run dev`);

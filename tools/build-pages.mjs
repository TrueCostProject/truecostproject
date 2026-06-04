import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "_site");

const entries = [
  ".nojekyll",
  "CNAME",
  "about.html",
  "act.html",
  "assets",
  "favicon.ico",
  "index.html",
  "llms.txt",
  "privacy.html",
  "robots.txt",
  "sitemap.xml",
  "terms.html",
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry);
  const target = path.join(outDir, entry);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing Pages entry: ${entry}`);
  }

  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.cpSync(source, target, { recursive: true });
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
}

console.log(`pages build complete; copied ${entries.length} entries to _site`);

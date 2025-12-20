const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "src", "pages");

function walk(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/lesson\d+\.jsx$/.test(item)) files.push(full);
  }
  return files;
}

function convertLesson(filePath) {
  const code = fs.readFileSync(filePath, "utf8");

  if (code.includes("lesson.lang.json")) {
    console.log("✅ Skip:", filePath);
    return;
  }

  const match = filePath.match(/lesson(\d+)\.jsx$/);
  if (!match) return;

  const num = match[1];
  const jsonPath = filePath.replace(
    `lesson${num}.jsx`,
    `lesson${num}.lang.json`
  );

  const jsonTemplate = {
    en: {
      title: `Lesson ${num}`,
      subtitle: "Auto created",
      sections: []
    },
    ta: { title: "", subtitle: "", sections: [] },
    tl: { title: "", subtitle: "", sections: [] }
  };

  fs.writeFileSync(jsonPath, JSON.stringify(jsonTemplate, null, 2), "utf8");

  let updated = code;

  updated = updated.replace(
    /import React.*?;\n/,
    (m) =>
      m +
      `import lang from "./lesson${num}.lang.json";\n` +
      `import { useLanguage } from "../../../../contexts/LanguageContext";\n`
  );

  updated = updated.replace(
    /export default function\s+\w+\s*\(\)\s*{/,
    (m) =>
      m +
      `\n  const { langKey } = useLanguage();\n  const data = lang[langKey] || lang.en;\n`
  );

  fs.writeFileSync(filePath, updated, "utf8");

  console.log("✅ Converted:", filePath);
}

console.log("🔍 Scanning lessons...");
const lessons = walk(ROOT);
lessons.forEach(convertLesson);
console.log("🔥 All lessons prepared for multi-language!");

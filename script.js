const fileInput = document.getElementById("files");
const tableBody = document.querySelector("#metadataTable tbody");

fileInput.addEventListener("change", () => {
  tableBody.innerHTML = "";
  const files = Array.from(fileInput.files).slice(0, 50);

  files.forEach(file => {
    const meta = generateAI(file.name);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${file.name}</td>
      <td>
        <input type="text" maxlength="200" value="${meta.title}">
        <button onclick="copy(this)">Copy</button>
      </td>
      <td>
        <textarea>${meta.description}</textarea>
        <button onclick="copy(this)">Copy</button>
      </td>
      <td>
        <textarea>${meta.keywords}</textarea>
        <button onclick="copy(this)">Copy</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
});

/* =========================
   AI HEURISTIC ENGINE
========================= */

function generateAI(filename) {
  const name = cleanName(filename);
  const words = name.split(" ");

  const object = words[0] || "vector illustration";
  const style = detectStyle(words);
  const usage = "for branding, design projects, and microstock use";

  const title = limit(
    capitalize(`${style} ${object} vector illustration`),
    200
  );

  const description =
    `High quality ${style.toLowerCase()} ${object.toLowerCase()} vector illustration, suitable ${usage}.`;

  const keywords = buildKeywords(words, style);

  return { title, description, keywords };
}

function detectStyle(words) {
  if (words.includes("line")) return "Minimal line art";
  if (words.includes("flat")) return "Flat style";
  if (words.includes("cartoon")) return "Cartoon style";
  return "Clean modern";
}

function buildKeywords(words, style) {
  const base = [
    ...words,
    "vector",
    "illustration",
    "design",
    "graphic",
    "creative",
    "digital",
    "artwork",
    style.toLowerCase(),
    "isolated",
    "white background"
  ];

  const unique = [...new Set(base)].slice(0, 50);
  return unique.join(", ");
}

function epsCheck(file) {
  let warnings = [];

  if (file.name.toLowerCase().includes("cmyk")) {
    warnings.push("⚠ CMYK detected – use RGB");
  }

  if (file.name.toLowerCase().includes("photo") || file.size > 15_000_000) {
    warnings.push("⚠ Possible raster / embedded image");
  }

  warnings.push("ℹ Outline all text (Type → Create Outlines)");
  warnings.push("ℹ Expand appearance before export");

  if (warnings.length === 0) {
    return "✅ Clean";
  }

  return warnings.join("<br>");
}

/* =========================
   UTILITIES
========================= */

function cleanName(name) {
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\d+/g, "")
    .toLowerCase();
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function limit(text, max) {
  return text.length > max ? text.slice(0, max - 3) + "..." : text;
}

function copy(btn) {
  const field = btn.previousElementSibling;
  field.select();
  document.execCommand("copy");
  alert("Copied!");
}


console.log("Script loaded");

/* =========================
   ELEMENTS
========================= */
const fileInput = document.getElementById("files");
const generateBtn = document.getElementById("generateBtn");

if (!generateBtn) {
  alert("Generate button not found!");
}

const tableBody = document.querySelector("#metadataTable tbody");

/* =========================
   BUTTON GENERATE
========================= */
generateBtn.addEventListener("click", () => {
  tableBody.innerHTML = "";

  const files = Array.from(fileInput.files).slice(0, 50);

  if (!files.length) {
    alert("Please upload files first.");
    return;
  }

  files.forEach(file => {
    const meta = generateAI(file.name);
    const status = epsCheck(file);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${file.name}</td>
      <td class="status">${status}</td>
      <td>
        <input value="${meta.title}" maxlength="200">
        <button onclick="copyText(this)">Copy</button>
      </td>
      <td>
        <textarea maxlength="200">${meta.description}</textarea>
        <button onclick="copyText(this)">Copy</button>
      </td>
      <td>
        <textarea>${meta.keywords}</textarea>
        <button onclick="copyText(this)">Copy</button>
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
  if (words.includes("cartoon")) return "Cartoon st



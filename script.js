const fileInput = document.getElementById("files");
const tableBody = document.querySelector("#metadataTable tbody");

fileInput.addEventListener("change", () => {
  tableBody.innerHTML = "";

  const files = Array.from(fileInput.files).slice(0, 50);

  files.forEach((file) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${file.name}</td>
      <td>
        <input type="text" maxlength="200"
        value="Vector illustration of ${cleanName(file.name)}">
        <button onclick="copy(this)">Copy</button>
      </td>
      <td>
        <textarea>
High quality vector illustration suitable for branding, design projects, and microstock usage.
        </textarea>
        <button onclick="copy(this)">Copy</button>
      </td>
      <td>
        <textarea>
vector, illustration, design, graphic, creative, digital, artwork
        </textarea>
        <button onclick="copy(this)">Copy</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
});

function cleanName(name) {
  return name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
}

function copy(btn) {
  const field = btn.previousElementSibling;
  field.select();
  document.execCommand("copy");
  alert("Copied!");
}

function copyText(id) {
  const field = document.getElementById(id);
  field.select();
  document.execCommand("copy");
  alert("Copied!");
}

function generateSample() {
  document.getElementById("title").value =
    "Cute cartoon bear mascot vector";

  document.getElementById("description").value =
    "A cute and friendly cartoon bear character in a clean flat vector style, perfect for branding or mascot design.";

  document.getElementById("keywords").value =
    "bear, cartoon bear, mascot, cute animal, vector, illustration, character design";
}

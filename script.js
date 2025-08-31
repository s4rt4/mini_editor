window.addEventListener("DOMContentLoaded", () => {
  const editorToggle = document.getElementById("editorToggle");
  const themeToggle = document.getElementById("themeToggle");
  const editorPanel = document.getElementById("editorPanel");
  const runCode = document.getElementById("runCode");
  const preview = document.getElementById("preview");

  // Init CodeMirror editors (theme dikosongkan dulu)
  const htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlCode"), {
    mode: "xml",
    lineNumbers: true,
    tabSize: 2,
    lineWrapping: false
  });

  const cssEditor = CodeMirror.fromTextArea(document.getElementById("cssCode"), {
    mode: "css",
    lineNumbers: true,
    tabSize: 2,
    lineWrapping: false
  });

  const jsEditor = CodeMirror.fromTextArea(document.getElementById("jsCode"), {
    mode: "javascript",
    lineNumbers: true,
    tabSize: 2,
    lineWrapping: false
  });

  // Toggle editor panel
  let editorVisible = false;
  editorToggle.addEventListener("click", () => {
    editorVisible = !editorVisible;
    editorPanel.style.display = editorVisible ? "flex" : "none";
    preview.style.height = editorVisible ? "400px" : "calc(100vh - 60px)";
  });

  // Run code
  runCode.addEventListener("click", () => {
    const html = htmlEditor.getValue();
    const css = `<style>${cssEditor.getValue()}</style>`;
    const js = `<script>${jsEditor.getValue()}<\/script>`;
    preview.srcdoc = html + css + js;
  });

  // Fungsi update tema editor
  function updateEditorTheme(isDark) {
    const theme = isDark ? "darcula" : "default";
    htmlEditor.setOption("theme", theme);
    cssEditor.setOption("theme", theme);
    jsEditor.setOption("theme", theme);
  }

  // Atur tema saat halaman load (langsung jalan)
  const isDark = document.body.classList.contains("dark");
  updateEditorTheme(isDark);

  // Set icon toggle
  themeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

  // Toggle tema
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    updateEditorTheme(isDark);
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });
});

window.addEventListener("DOMContentLoaded", () => {
  // --- Ambil Elemen ---
  const editorToggle = document.getElementById("editorToggle");
  const themeToggle = document.getElementById("themeToggle");
  const editorPanel = document.getElementById("editorPanel");
  const runCode = document.getElementById("runCode");
  const preview = document.getElementById("preview");

  // --- Variabel Status ---
  let htmlEditor, cssEditor, jsEditor;
  let editorsInitialized = false; // Penanda apakah editor sudah dibuat
  let editorVisible = false; // Penanda status panel

  /**
   * Fungsi untuk membuat instance CodeMirror.
   * Hanya akan berjalan SEKALI saja.
   */
  function initializeEditors() {
    // Jika sudah pernah dibuat, jangan buat lagi
    if (editorsInitialized) return;

    // Cek tema saat ini
    const initialIsDark = document.body.classList.contains("dark");
    const initialTheme = initialIsDark ? "darcula" : "default";

    // Buat editor
    htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlCode"), {
      mode: "xml",
      lineNumbers: true,
      tabSize: 2,
      lineWrapping: false,
      theme: initialTheme
    });

    cssEditor = CodeMirror.fromTextArea(document.getElementById("cssCode"), {
      mode: "css",
      lineNumbers: true,
      tabSize: 2,
      lineWrapping: false,
      theme: initialTheme
    });

    jsEditor = CodeMirror.fromTextArea(document.getElementById("jsCode"), {
      mode: "javascript",
      lineNumbers: true,
      tabSize: 2,
      lineWrapping: false,
      theme: initialTheme
    });

    // Tandai bahwa inisialisasi selesai
    editorsInitialized = true;
  }

  /**
   * Fungsi untuk update tema (di-toggle atau saat init)
   */
  function updateEditorTheme(isDark) {
    // Jangan lakukan apa-apa jika editor belum ada
    if (!editorsInitialized) return;

    const theme = isDark ? "darcula" : "default";
    htmlEditor.setOption("theme", theme);
    cssEditor.setOption("theme", theme);
    jsEditor.setOption("theme", theme);
  }

  // --- Event Listeners ---

  // 1. Toggle Editor Panel
  editorToggle.addEventListener("click", () => {
    // Buat editor saat PERTAMA KALI di-klik
    initializeEditors();

    // Toggle status visibilitas
    editorVisible = !editorVisible;
    editorPanel.style.display = editorVisible ? "flex" : "none";
    preview.style.height = editorVisible ? "400px" : "calc(100vh - 60px)";

    // PENTING: Refresh CodeMirror setelah panel terlihat
    // Ini memperbaiki bug layout karena editor dibuat saat 'display: none'
    if (editorVisible) {
      htmlEditor.refresh();
      cssEditor.refresh();
      jsEditor.refresh();
    }
  });

  // 2. Run Code
  runCode.addEventListener("click", () => {
    // Jika tombol Run diklik sebelum editor dibuka, beri peringatan
    if (!editorsInitialized) {
      alert("Please open the editor panel first!");
      return;
    }
    const html = htmlEditor.getValue();
    const css = `<style>${cssEditor.getValue()}</style>`;
    const js = `<script>${jsEditor.getValue()}<\/script>`;
    preview.srcdoc = html + css + js;
  });

  // 3. Toggle Tema
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    // Update tema editor HANYA JIKA editor sudah ada
    updateEditorTheme(isDark);

    // Update ikon
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  // Atur ikon tema saat halaman load (tidak perlu init editor)
  const isDarkOnLoad = document.body.classList.contains("dark");
  themeToggle.innerHTML = isDarkOnLoad
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

function slugify(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderPoemBody(poem) {
  if (!poem.lines || !poem.lines.length) {
    return `<p class="reader-placeholder">Poem text coming soon.</p>`;
  }

  const stanzas = poem.lines
    .map((stanza) => {
      const escaped = escapeHtml(stanza).replace(/\n/g, "<br>\n              ");
      const isSignature = stanza.trim().startsWith("— ");
      return `            <p${isSignature ? ' class="poem-signature"' : ""}>
              ${escaped}
            </p>`;
    })
    .join("\n");

  return stanzas;
}

function poemPageTemplate(poem) {
  const title = poem.title;
  const slug = slugify(title);
  const description = `Read "${title}" in The Poem Room.`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(description)}">
    <title>${escapeHtml(title)} · The Poem Room</title>
    <link rel="stylesheet" href="../styles.css">
    <script src="../script.js" defer></script>
  </head>
  <body data-poem-slug="${escapeHtml(slug)}">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <header class="site-header">
      <a class="brand" href="../index.html#top" aria-label="The Poem Room home">
        <span class="brand-mark" aria-hidden="true">✦</span>
        <span>The Poem Room</span>
      </a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="../index.html#top">Home</a>
        <a href="../index.html#purpose">Core Functionality</a>
        <a href="../index.html#bio">Bio</a>
        <a href="../index.html#poems">Archive</a>
        <a href="../index.html#library">My Library</a>
      </nav>
      <button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false">
        <span aria-hidden="true">☾</span>
        <span>Dark</span>
      </button>
    </header>

    <main id="main-content">
      <article class="reading-page" aria-labelledby="poem-title">
        <a class="back-link" href="../index.html#poems">Back to archive</a>
        <p class="eyebrow">reading room</p>
        <h1 id="poem-title">${escapeHtml(title)}</h1>
        <div class="reader-actions">
          <button
            class="favourite-button"
            type="button"
            data-favourite-slug="${escapeHtml(slug)}"
            aria-pressed="false"
            aria-label="Add to My Library"
          >♡</button>
          <div class="collection-menu" data-poem-collection-menu>
            <button
              class="collection-menu-button"
              type="button"
              aria-expanded="false"
              aria-label="Add poem to a collection"
            >+</button>
            <div class="collection-menu-panel" hidden></div>
          </div>
        </div>
        <div class="reader-poem">
${renderPoemBody(poem)}
        </div>
      </article>
    </main>

    <footer class="site-footer">
      <p>
        © 2026 Lilith Foxcroft. All poems and original writing are all rights
        reserved.
      </p>
      <nav aria-label="Footer navigation">
        <a href="../COPYRIGHT.md">Copyright</a>
        <a href="../index.html#top">Back to top</a>
      </nav>
    </footer>
    <div class="toast-region" data-toast-region aria-live="polite"></div>
  </body>
</html>
`;
}

function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const scriptPath = path.join(repoRoot, "script.js");
  const scriptText = fs.readFileSync(scriptPath, "utf8");

  const match = scriptText.match(/const poems = (\[[\s\S]*?\n\]);\n\nconst sortedPoems/s);

  if (!match) {
    console.error("Could not locate poems array in script.js");
    process.exitCode = 1;
    return;
  }

  const poems = Function(`"use strict"; return (${match[1]});`)();
  const outDir = path.join(repoRoot, "Poems");

  fs.mkdirSync(outDir, { recursive: true });

  let written = 0;
  poems.forEach((poem) => {
    const slug = slugify(poem.title);
    const filename = `${slug}.html`;
    const outPath = path.join(outDir, filename);
    fs.writeFileSync(outPath, poemPageTemplate(poem), "utf8");
    written += 1;
  });

  console.log(`Generated ${written} poem pages in ${path.relative(repoRoot, outDir)}/`);
}

main();


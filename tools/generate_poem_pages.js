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

function renderInlineHtml(text) {
  // Keep in sync with appendFormattedText() in script.js
  // Supports:
  // - *italic*
  // - **bold**
  // - ***bold+italic***
  // - ~~strikethrough~~
  let i = 0;
  let out = "";

  while (i < text.length) {
    const nextStrike = text.indexOf("~~", i);
    const nextBold = text.indexOf("**", i);
    const nextBoldItalic = text.indexOf("***", i);
    const nextItalic = text.indexOf("*", i);

    let next = nextStrike;
    let kind = nextStrike !== -1 ? "strike" : null;

    if (nextBoldItalic !== -1 && (next === -1 || nextBoldItalic < next)) {
      next = nextBoldItalic;
      kind = "boldItalic";
    }

    if (
      nextBold !== -1 &&
      (next === -1 || nextBold < next) &&
      (nextItalic === -1 || nextBold <= nextItalic)
    ) {
      next = nextBold;
      kind = "bold";
    } else if (nextItalic !== -1 && (next === -1 || nextItalic < next)) {
      next = nextItalic;
      kind = "italic";
    }

    if (next === -1) {
      out += escapeHtml(text.slice(i));
      return out;
    }

    if (next > i) {
      out += escapeHtml(text.slice(i, next));
    }

    if (kind === "bold") {
      const end = text.indexOf("**", next + 2);
      if (end === -1) {
        out += escapeHtml(text.slice(next));
        return out;
      }
      out += `<strong>${escapeHtml(text.slice(next + 2, end))}</strong>`;
      i = end + 2;
      continue;
    }

    if (kind === "boldItalic") {
      const end = text.indexOf("***", next + 3);
      if (end === -1) {
        out += escapeHtml(text.slice(next));
        return out;
      }
      out += `<strong><em>${escapeHtml(text.slice(next + 3, end))}</em></strong>`;
      i = end + 3;
      continue;
    }

    if (kind === "strike") {
      const end = text.indexOf("~~", next + 2);
      if (end === -1) {
        out += escapeHtml(text.slice(next));
        return out;
      }
      out += `<s>${escapeHtml(text.slice(next + 2, end))}</s>`;
      i = end + 2;
      continue;
    }

    const end = text.indexOf("*", next + 1);
    if (end === -1) {
      out += escapeHtml(text.slice(next));
      return out;
    }
    out += `<em>${escapeHtml(text.slice(next + 1, end))}</em>`;
    i = end + 1;
  }

  return out;
}

function renderPoemBody(poem) {
  if (!poem.lines || !poem.lines.length) {
    return `<p class="reader-placeholder">Poem text coming soon.</p>`;
  }

  function isAllCapsHeading(line) {
    const trimmed = String(line || "").trim();
    if (!trimmed) return false;
    // Keep this conservative: only treat short, all-caps lines as section headers.
    if (trimmed.length > 64) return false;
    if (/[a-z]/.test(trimmed)) return false;
    if (!/[A-Z]/.test(trimmed)) return false;
    // Avoid bolding signatures or anything that looks like a normal sentence.
    if (trimmed.startsWith("—")) return false;
    return true;
  }

  const stanzas = poem.lines
    .map((stanza) => {
      const escaped = stanza
        .split("\n")
        .map((line, idx) => {
          const rendered = renderInlineHtml(line);
          if (idx === 0 && isAllCapsHeading(line)) {
            return `<strong>${rendered}</strong>`;
          }
          return rendered;
        })
        .join("<br>\n              ");
      const isSignature = stanza.trim().startsWith("— ");
      return `            <p${isSignature ? ' class="poem-signature"' : ""}>
              ${isSignature ? `<em>${escaped}</em>` : escaped}
            </p>`;
    })
    .join("\n");

  return stanzas;
}

function poemPageTemplate(poem) {
  const title = poem.title;
  const slug = poem.slug || slugify(title);
  const description = `Read "${title}" in The Poem Room.`;
  const subtitle = poem.subtitle ? String(poem.subtitle) : "";

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
  <body id="top" data-poem-slug="${escapeHtml(slug)}">
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
      <div class="settings-menu" data-settings-menu>
        <button
          class="settings-button"
          type="button"
          data-settings-toggle
          aria-label="Settings"
          aria-expanded="false"
          aria-controls="settings-panel"
          title="Settings"
        >
          <span class="settings-icon" aria-hidden="true">⚙</span>
        </button>
        <div class="settings-panel" id="settings-panel" data-settings-panel hidden>
          <div class="settings-row">
            <span>Appearance</span>
            <button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false">
              <span aria-hidden="true">☾</span>
              <span>Dark</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main id="main-content">
      <article class="reading-page" aria-labelledby="poem-title">
        <a class="back-link" href="../index.html#archive-${escapeHtml(slug)}">Back to Archive</a>
        <p class="eyebrow">reading room</p>
        <h1 id="poem-title">${escapeHtml(title)}</h1>
        ${subtitle ? `<p class="poem-subtitle">${escapeHtml(subtitle)}</p>` : ""}
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
        <a href="#top">Back to top</a>
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
    const slug = poem.slug || slugify(poem.title);
    const filename = `${slug}.html`;
    const outPath = path.join(outDir, filename);
    fs.writeFileSync(outPath, poemPageTemplate(poem), "utf8");
    written += 1;
  });

  console.log(`Generated ${written} poem pages in ${path.relative(repoRoot, outDir)}/`);
}

main();

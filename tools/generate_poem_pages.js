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

function isSignatureLine(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) {
    return false;
  }

  const unwrapped = trimmed.replace(/^[*_]+/, "").replace(/[*_]+$/, "");
  return unwrapped.startsWith("— ");
}

function getStanzaLineCount(stanzaText) {
  return String(stanzaText || "")
    .split("\n")
    .filter((line) => String(line || "").trim())
    .length;
}

function renderPoemNavigation(poem) {
  const poemLines = Array.isArray(poem?.lines) ? poem.lines : [];
  const items = poemLines
    .map((stanza, index) => {
      const stanzaText = typeof stanza === "string" ? stanza : String(stanza.text || "");
      const lineCount = Math.max(1, getStanzaLineCount(stanzaText));

      return `          <button
            type="button"
            class="poem-map-button"
            data-stanza-index="${index}"
            data-stanza-lines="${lineCount}"
            aria-label="Jump to stanza ${index + 1}, ${lineCount} line${lineCount === 1 ? "" : "s"}"
            title="Jump to stanza ${index + 1}"
          >${"▇".repeat(Math.min(lineCount, 6))}</button>`;
    })
    .join("\n");

  return `        <aside class="poem-navigation" data-poem-navigation aria-label="Jump to stanza">
          <div class="poem-progress" aria-hidden="true">
            <span class="poem-progress-track"></span>
            <span class="poem-progress-fill" data-poem-progress-fill></span>
          </div>
          <div class="poem-map">
            <p class="poem-navigation-label">Jump to stanza</p>
            <div class="poem-map-list" data-poem-map>
${items}
            </div>
          </div>
        </aside>`;
}

function renderPoemBody(poem) {
  const poemLines = Array.isArray(poem?.lines) ? poem.lines : [];
  const isBiblicalPoem = slugify(poem?.title || "") === "the-book-of-ironicus";

  if (!poemLines.length) {
    return `        <div class="reader-poem-body" data-reader-poem-body>
          <p class="reader-placeholder">Poem text coming soon.</p>
        </div>`;
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

  let lineNumber = 1;

  const stanzas = poemLines
    .map((stanza, index) => {
      const stanzaText = typeof stanza === "string" ? stanza : String(stanza.text || "");
      const stanzaClassName =
        typeof stanza === "string" ? "" : String(stanza.className || "").trim();
      const classes = ["poem-stanza"];

      if (stanzaClassName) {
        classes.push(...stanzaClassName.split(/\s+/));
      }

      const stanzaLines = stanzaText.split("\n");

      const lines = stanzaLines
        .map((line, idx) => {
          if (!String(line || "").trim()) {
            return `              <span class="poem-line poem-line--blank" aria-hidden="true"></span>`;
          }

          const rendered = renderInlineHtml(line);
          const content = idx === 0 && isAllCapsHeading(line) ? `<strong>${rendered}</strong>` : rendered;
          const isSignature =
            index === poemLines.length - 1 &&
            idx === stanzaLines.length - 1 &&
            isSignatureLine(line);
          const lineClasses = ["poem-line"];

          if (isBiblicalPoem && !isSignature) {
            lineClasses.push("poem-line--biblical");
          }

          const lineMarkup = isSignature
            ? `              <span class="poem-line poem-line--signature">
                <span class="poem-line-content">${content}</span>
              </span>`
            : `              <span class="${lineClasses.join(" ")}">
                <span class="poem-line-number" aria-hidden="true">${lineNumber}</span>
                <span class="poem-line-content">${content}</span>
              </span>`;

          if (!isSignature) {
            lineNumber += 1;
          }
          return lineMarkup;
        })
        .join("\n");

      return `            <p class="${classes.join(" ")}" data-stanza-index="${index}">
${lines}
            </p>`;
    })
    .join("\n");

  return `        <div class="reader-poem-body" data-reader-poem-body>
${stanzas}
        </div>`;
}

function poemPageTemplate(poem, previousPoem, nextPoem) {
  const title = poem.title;
  const slug = poem.slug || slugify(title);
  const description = `Read "${title}" in The Poem Room.`;
  const subtitle = poem.subtitle ? renderInlineHtml(String(poem.subtitle)) : "";
  const previousSlug = previousPoem ? (previousPoem.slug || slugify(previousPoem.title)) : "";
  const nextSlug = nextPoem ? (nextPoem.slug || slugify(nextPoem.title)) : "";
  const previousLink = previousPoem
    ? `        <a class="reader-prev-link" href="./${escapeHtml(previousSlug)}.html" rel="prev" aria-label="Previous poem: ${escapeHtml(previousPoem.title)}" title="Previous poem: ${escapeHtml(previousPoem.title)}"><span aria-hidden="true">←</span></a>\n`
    : "";
  const nextLink = nextPoem
    ? `        <a class="reader-next-link" href="./${escapeHtml(nextSlug)}.html" rel="next" aria-label="Next poem: ${escapeHtml(nextPoem.title)}" title="Next poem: ${escapeHtml(nextPoem.title)}"><span aria-hidden="true">→</span></a>\n`
    : "";

  return `<!doctype html>
<html lang="en" data-theme="dark" data-line-numbers="hide" data-mini-map="hide">
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
      <button
        class="nav-toggle"
        type="button"
        data-nav-toggle
        aria-expanded="false"
        aria-controls="primary-navigation"
        aria-label="Open navigation"
      >
        <span class="nav-toggle-lines" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <nav class="site-nav" id="primary-navigation" aria-label="Primary navigation">
        <a href="../index.html#top">Home</a>
        <a href="../index.html#purpose">Core Functionality</a>
        <a href="../index.html#bio">Bio</a>
        <a href="../index.html#featured-collections">Featured Collections</a>
        <a href="../index.html#poems">Archive</a>
        <a href="../index.html#library">My Library</a>
      </nav>
      <div class="settings-menu" data-settings-menu>
        <button
          class="settings-button"
          type="button"
          data-settings-toggle
          aria-expanded="false"
          aria-controls="settings-panel"
        >
          Settings
        </button>
        <div class="settings-panel" id="settings-panel" data-settings-panel hidden>
          <div class="settings-row">
            <span>Appearance</span>
            <button class="theme-toggle" type="button" data-theme-toggle aria-pressed="true">
              <span aria-hidden="true">☼</span>
              <span>Light</span>
            </button>
          </div>
          <div class="settings-row settings-row-stacked">
            <span>Navigation bar</span>
            <div class="nav-mode-control" role="group" aria-label="Navigation bar">
              <button type="button" data-nav-mode-option="always-visible" aria-pressed="true">Always visible</button>
              <button type="button" data-nav-mode-option="auto-hide" aria-pressed="false">Auto-hide</button>
              <button type="button" data-nav-mode-option="hover-top" aria-pressed="false">Hover top</button>
            </div>
          </div>
          <div class="settings-row settings-row-stacked">
            <span>Font size</span>
            <div class="font-size-control" role="group" aria-label="Font size">
              <button type="button" data-font-size-option="small" aria-pressed="false">Small</button>
              <button type="button" data-font-size-option="normal" aria-pressed="true">Normal</button>
              <button type="button" data-font-size-option="big" aria-pressed="false">Big</button>
            </div>
          </div>
          <div class="settings-row settings-row-stacked">
            <span>Line numbers</span>
            <div class="line-number-control" role="group" aria-label="Line numbers">
              <button type="button" data-line-number-option="hide" aria-pressed="true">Hide</button>
              <button type="button" data-line-number-option="show" aria-pressed="false">Show</button>
            </div>
          </div>
          <div class="settings-row settings-row-stacked">
            <span>Mini map</span>
            <div class="mini-map-control" role="group" aria-label="Mini map">
              <button type="button" data-mini-map-option="hide" aria-pressed="true">Hide</button>
              <button type="button" data-mini-map-option="show" aria-pressed="false">Show</button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main id="main-content">
      <article class="reading-page" aria-labelledby="poem-title">
${previousLink}${nextLink}        <div class="reader-top-links">
          <a class="back-link" href="../index.html#archive-${escapeHtml(slug)}">Back to Archive</a>
        </div>
        <p class="eyebrow">reading room</p>
        <h1 id="poem-title">${escapeHtml(title)}</h1>
        ${subtitle ? `<p class="poem-subtitle">${subtitle}</p>` : ""}
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
        <div class="reader-poem" data-reader-poem>
${renderPoemNavigation(poem)}
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
  const sortedPoems = [...poems].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
  );
  const outDir = path.join(repoRoot, "Poems");

  fs.mkdirSync(outDir, { recursive: true });

  let written = 0;
  sortedPoems.forEach((poem, index) => {
    const previousPoem = index > 0 ? sortedPoems[index - 1] : null;
    const nextPoem = index < sortedPoems.length - 1 ? sortedPoems[index + 1] : null;
    const slug = poem.slug || slugify(poem.title);
    const filename = `${slug}.html`;
    const outPath = path.join(outDir, filename);
    fs.writeFileSync(outPath, poemPageTemplate(poem, previousPoem, nextPoem), "utf8");
    written += 1;
  });

  console.log(`Generated ${written} poem pages in ${path.relative(repoRoot, outDir)}/`);
}

main();

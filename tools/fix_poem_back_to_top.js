/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const poemsDir = path.join(repoRoot, "Poems");
  const files = fs.readdirSync(poemsDir).filter((name) => name.endsWith(".html"));

  let updated = 0;
  for (const file of files) {
    const fullPath = path.join(poemsDir, file);
    let html = fs.readFileSync(fullPath, "utf8");
    const before = html;

    // Ensure we have a local #top anchor to scroll to.
    html = html.replace(/<body(?![^>]*\sid=)/, '<body id="top"');

    // Make footer back-to-top link point to this poem page.
    html = html.replace(/<a href="\.\.\/index\.html#top">Back to top<\/a>/g, '<a href="#top">Back to top</a>');

    if (html !== before) {
      fs.writeFileSync(fullPath, html, "utf8");
      updated += 1;
    }
  }

  console.log(`Updated ${updated} poem pages.`);
}

main();


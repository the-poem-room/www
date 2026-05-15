const themeToggle = document.querySelector("[data-theme-toggle]");
const archiveList = document.querySelector("[data-archive-list]");
const reader = document.querySelector("#poem-reader");
const readerTitle = document.querySelector("[data-reader-title]");
const readerSubtitle = document.querySelector("[data-reader-subtitle]");
const readerPoem = document.querySelector("[data-reader-poem]");
const readerClose = document.querySelector("[data-reader-close]");
const readerActions = document.querySelector("[data-reader-actions]");
const libraryList = document.querySelector("[data-library-list]");
const libraryEmpty = document.querySelector("[data-library-empty]");
const collectionForm = document.querySelector("[data-collection-form]");
const collectionsList = document.querySelector("[data-collections-list]");
const collectionsEmpty = document.querySelector("[data-collections-empty]");
const toastRegion = document.querySelector("[data-toast-region]");
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".site-nav a[href^='#']");

const poemPageSlug = document.body?.dataset?.poemSlug || "";
const favouritesKey = "poem-room-favourites";
const collectionsKey = "poem-room-collections";

const poems = [
  {
    title: "a broken metronome",
    lines: [
      "click. click—\nthen silence.\nA room holds its breath like a barline stretched thin.\nI count with my ribs, find four in the flutter of three.\nThe lamp hums a shaky tempo; rain plays triplets on glass.\nI pencil a beat on the desk, wood answering skin.\nTime is elastic when no one's watching.\nI practice the piece that won't still\nuntil the ending learns to arrive\nFashionably late, but exactly right.",
      "— Lilith",
    ],
  },
  {
    title: "A Manual for the Modern Messiah",
    subtitle: "(Instructions by Elon Musk)",
    lines: [
      "Build a rocket.\nBurn the sky.\nPreach green—\nthen mine cobalt \nwith Congolese hands\nyou'll never see.",
      "Sell freedom\n140 characters at a time—\nbut silence dissent,\nboost bots,\nfire thousands by email\nwhile tweeting memes\nabout \"grindset.\"",
      "Claim you're not political—\nthen salute beside fascists,\nmock pronouns,\nparrot conspiracy,\nblame the ADL\nfor pulling ads\nfrom your tantrum machine.",
      "Propose tunnels,\ndrill dreams—\na single lane\nfor millionaires\nto sit in Teslas\nin traffic,\nbut underground.",
      "Say Autopilot saves lives.\nPay $243 million\nto the dead.\nMarket Level 2 as Full—\nthe future,\nwith legal fine print.",
      "Create a brain chip.\nDon't mention\nthe monkeys.\nIf they die,\nbury them\nin undisclosed filings.",
      "Start with ideals—\nsolar roofs,\nethical cars.\nEnd with flamethrowers\nand Dogecoin jokes\nwhile workers\ncollapse on factory floors\nand lawsuits stack\nlike unsold Cybertrucks.",
      "Laugh.\nCall it all\nthe meme economy.\nWhen it crashes,\nsay it was\na simulation.",
      "— Lilith",
    ],
  },
  {
    title: "A Note Outside the Scale",
    lines: [
      "I am not a man,\nnor a woman—\nnor half of one pretending to be whole.\nI am GNP:\na balance, an absence,\na body that speaks in shifting pitches,\nsometimes velvet-deep,\nsometimes bright as flutes.",
      "My hair is clean, tied, blonde—\na kind of rebellion against the buzz-cut of expectation.\nMy voice is a compass,\nshifting with the room,\nwith the ears\nthat would try to name me.",
      "The world of hetero eyes\nis a hall of mirrors.\nEvery glance a ranking,\nevery conversation a ledger\nticking \"hot or not,\"\nmeasured by rules\nthat collapse when touched.\nBoys: praised for conquest.\nGirls: chastised unless\nthey are both unbroken porcelain\nand marked by use.\nA cruel arithmetic\nI refuse to play.",
      "But with lesbians,\nI breathe.\nThey do not script me\ninto a part I never auditioned for.\nThey hear my laughter,\nnot its register.\nThey see my body\nwithout turning it into battlefield:\nwhat I should be,\nwho should I want,\nhow many I should have won.",
      "Perhaps they know—\nfrom living outside the story\nthat was written without them—\nthat freedom feels like\nan unscored passage.\nThat kindness can grow\nwhere expectation does not root.",
      "With lesbians, I am treated better,\nbecause they do not mistake me\nfor a symbol of their desire\nor a soldier of tradition.\nThey meet me where I am:\na voice that wavers,\na body I keep clean,\na mind hungry for ideas\na soul refusing the ledger.",
      "And in their presence,\nI am not unfinished,\nnot miscast,\nnot half.\nI am exactly enough—\na note outside the scale\nthat makes music.",
      "— Lilith",
    ],
  },
  {
    title: "A Practical Guide to My Pronouns",
    lines: [
      "Shall they say *he*?\nWell, yes, they shall, and I'll twitch like a smoke alarm\ncatching whiffs of burnt toast,\nbut not burst into flames.",
      "Shall they say *she*?\nThat one feels like wearing shoes two sizes off:\ntight in the toes, loose in the heel,\nclumsy to walk in, but walkable.",
      "Shall they say *they*?\nFine, though I can hear the grammar polic\nloading their rifles in the distance.",
      "Shall they instead\nrecite the full inventory: *citizen, taxpayer,*\n*carbon-based biped,*\n*entity formerly known as male,*\nuntil language itself is\nexhausted.",
      "It's l ike asking for bread\nand being offered gluten-free, yeast-free,\nair-fried, paleo-adjacent flact circles of despair—\nwhen all I wanted was bread.",
      "And what of my girlfriend?\nMust she introduce me as boyfriend, partner,\n\"significant other,\"\nor *the individual currently under contract\nto hold her hand at parties?*\nFor heavan's sake, just let us be!",
      "And no—\nI do not wander into boy's changing rooms,\npretending I belong there.\nSome lines I won't cross.\nSome spaces are too heavy with other people's certainty,\ntoo sharp with stares\nto make my small compromises worth it.",
      "**Avoidance is its own form of survival.**",
      "Because here is the truth:\nit isn't the words themselves,\nsharp little stones in my boot,\nthat trouble me most.\nIt's the smile that says *I'm humouring you,*\nthe silence that says *you're not real,*\nthe pause that says *why can't you just pick one?*",
      "Language is a tool,\nsometimes a cage,\nsometimes a joke stretched too long,\nbut always a mirror polished\nby whoever holds it.\nI could demand every reflection\nmatch me exactly—\nbut then I'd become the archivist of labels,\ndusting shelves no one reads\nwhile the world keeps moving.",
      "So call me *he*,\nand I'll wince, but keep walking.\nCall me *she*,\nand I'll sigh, but not collapse.\nCall me *they*,\nand I'll nod at your effort,\nthough English would rather\nsplit its own infinitives\nthan loosen its grip on gender.",
      "Because I am not here\nto drill obedience into your tongue.\nI am here to live,\nto speak,\nto matter.\nAnd if I must choose\nbetween a life where words are pristine\nand a life where words are messy but mine,\nI'll take the twinge,\nthe pinch,\nthe occasional semantic glitch.",
      "Because I know the surface can bruise me,\nbut the depths—\nthe depths decide everything.",
      "— Lilith",
    ],
  },
  {
    title: "Ad Approved by the Algorithm",
    lines: [
      "Welcome, child, to **BattleTits3**,\nAn \"educational\" game (for free!)\nWhere warriors jiggle to earn their place\nIn Candy Kingdom's sacred space.\nInstall now! No age check here—\nJust swipe the add and click \"appear.\"",
      "Scroll again and you shall find\nA quiz to help you \"know your mind.\"\n\"Do you like green?\" You're probably gay.\n\"Do bees distract you?\" ADHD today!\n\"Are you sad sometimes?\" Oh, that's autism—\nDiagnosed by **Jeff's Brain Prism™**.",
      "Your phone says *Buy*, your brains says *Why?*\nBut you still want that glitter slime pie\nMade by hands you'll never see\nIn factories named *Anyonymity*.\nIt's \"eco-friendly,\" \"mom-approved,\"\n\"Tested on bunnies\" (just not removed).",
      "And every click and tap and stare\nFeeds the gods of targeted care.\nThey whisper soft through pixel breath:\n\"Your worth is low, your flaw is death.\nBuy this cream, take this test,\nAnd maybe then you'll be your best.\"",
      "But best is plastic, best is thin,\nbest is not the skin you're in.\nBest has abs and sparkly lips,\nBest unboxes, best does flips,\nBest knows thirteen languages,\nAnd still makes time for sponsorships.",
      "So gather 'round, ye gullible youth,\nAnd download lies disguised as truth.\nNo need for facts—just **vibes** will do.\nThe ads know more than even you.\nAnd when you're broke and tired and sad,\nDon't blame yourself—\n**Just blame the ad.**",
      "— Lilith",
    ],
  },
  { title: "aftersound" },
  { title: "Against the Mean" },
  { title: "Alpha by Algorithm" },
  { title: "Before the Screens" },
  { title: "Beneath Permanent Shelter" },
  { title: "Between Hours" },
  { title: "Breaking: Politce Notices During Catastrophe" },
  { title: "Cartography of Shadows" },
  { title: "Children See More" },
  { title: "Compulsory Existence" },
  { title: "Definition" },
  { title: "Draft" },
  { title: "Errata" },
  { title: "Eulogy for the Melting Giant" },
  { title: "Factory Hits" },
  { title: "Fictions We Carry" },
  {
    title: "FIELD GUIDE",
    lines: [
      "my body's a room with every light on.\na radio tuuned to all stations at once.\ni'm trying to sit still\nbut my thoughts spin chairs.",
      "in year seven, i learned\nhow to pretend i was listening.\nnod at the right time,\nunderline the date,\ndraw galaxies on the margins.",
      "i feel my mother's worry in my jaw,\nmy father's restlessness in my knees.\nsome days i dance without music.\nsome days i forget to eat.",
      "i once told a teacher:\ni couldn't remember what she just said.\nshe frowned like i'd confessed to sin.\ni swallowed my \"sorry\"\nand it rattled for hours.",
      "sometimes, my breath forgets itself.",
      "sometimes, my limbs wander off mid-sentence.",
      "i lose whole hours\nand still feel late.",
      "i do not how to say\n\"i'm trying\"\nwithout hearing it as an excuse.\nbut i try.",
      "today i lie deep down in the grass\nand allow my thoughts to go wherever they please.\nthe sky doesn't scold me\nfor being everything at once.",
      "— Lilith",
    ],
  },
  { title: "Foil, Barcode, Tongue" },
  { title: "Forgetting the Shape of Me" },
  { title: "Fuck ICE" },
  { title: "Glitch in the Static" },
  { title: "Group Chat (Muted)" },
  { title: "Half the World Away, Yet Here" },
  { title: "Hedonic Calculus" },
  { title: "House, Year 3025" },
  { title: "How Do You Want Me?" },
  { title: "How I Stayed Still" },
  { title: "How To" },
  { title: "I Cherish Fully" },
  { title: "I Don't Owe My Time To Anyone" },
  { title: "I love you" },
  { title: "I, The Dictator of the Universe" },
  { title: "Improvisation, Not Itinerary" },
  { title: "Interactive Learning" },
  { title: "Is there life on Mars?" },
  { title: "Lilith" },
  { title: "Make Him a Sandwich (Episode 69)" },
  { title: "me" },
  { title: "Meditation on the B and C Theories of Time" },
  { title: "Memory" },
  { title: "Middle Ground" },
  { title: "Mind Dust" },
  { title: "Myopic" },
  { title: "NEUROSPAGHETTI" },
  { title: "None of the Above" },
  { title: "Not a Trophy, Not a Receipt" },
  { title: "Nothing Too" },
  { title: "On (Without Consent)" },
  { title: "online" },
  { title: "Parallax" },
  { title: "Patch Notes for English" },
  { title: "Patch Notes for Reality v.3.2" },
  { title: "Pendulum" },
  { title: "Perception Completes the World" },
  { title: "Permutations" },
  { title: "President of Nothing" },
  { title: "Productivity Guilt" },
  { title: "Provisional Certainties" },
  { title: "SADBOY" },
  { title: "See Also: See Also" },
  { title: "She Said Men Only Want One Thing" },
  { title: "Should I?" },
  { title: "Small Things" },
  { title: "Softness Was Always His" },
  { title: "Split-Screen World" },
  { title: "Spoonful" },
  { title: "Taking Off the Label" },
  { title: "Technoblade Never Dies" },
  { title: "Temporary Coördinates" },
  { title: "Ten Thousand Suns" },
  { title: "Thanks for Watching" },
  { title: "The Angle of Light" },
  { title: "The Book of Ironicus" },
  { title: "The Butterfly's Lover" },
  { title: "The Cruella Within" },
  { title: "The Daily Whine" },
  { title: "The End" },
  { title: "The Experience Machine" },
  { title: "The Garden After" },
  { title: "The Garden of Youth" },
  { title: "The Goldbergs, Everywhere-" },
  { title: "The Good Teacher" },
  { title: "The Light Changes Key" },
  { title: "The Misinformation Olympics" },
  { title: "The Pleasure of Pretending" },
  { title: "The Quietest Company" },
  { title: "The Rationalist's Shadow" },
  { title: "The Real Curriculum" },
  { title: "The Real Divide" },
  { title: "The Second Zapruder" },
  { title: "The Stars Said So" },
  { title: "The Third Room" },
  { title: "The Unseen Wall" },
  { title: "The Weightless Hour" },
  { title: "The Weight of Air" },
  { title: "The Wheel Doesn't Know Why You're Here" },
  { title: "To anyone confused" },
  { title: "To-Be List" },
  { title: "tolerate" },
  { title: "Too Much Company" },
  { title: "Trying Not to Disappear" },
  { title: "Trying to Bite Your Own Teeth" },
  { title: "Twelve Pounds and a Dream" },
  { title: "Two Chairs" },
  { title: "Unassigned" },
  { title: "We Already Know the Song" },
  { title: "We're All Dogmatic Because We Aren't Inactive" },
  { title: "Where Is the Triangle?" },
  { title: "What the Hand Remembers" },
  { title: "When No One Knows" },
  { title: "When's the Last Time?" },
  { title: "Wobblefluff and Bumblebee's Moonlit Jig" },
  { title: "Work Hard" },
  { title: "X." },
  { title: "You are Weak" },
  { title: "You Don't Have to Earn Your Pulse" },
  { title: "You Live in Colour, I Dream in Green" },
];

const sortedPoems = [...poems].sort((a, b) =>
  a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
);

function slugify(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const poemBySlug = new Map(sortedPoems.map((poem) => [slugify(poem.title), poem]));
const favouriteSlugs = new Set(JSON.parse(localStorage.getItem(favouritesKey) || "[]"));
let collections = JSON.parse(localStorage.getItem(collectionsKey) || "[]");

function appendFormattedText(container, text) {
  // Minimal inline formatting:
  // - *italic*
  // - **bold**
  // Everything else is treated as plain text.
  let i = 0;

  while (i < text.length) {
    const nextBold = text.indexOf("**", i);
    const nextItalic = text.indexOf("*", i);

    let next = -1;
    let kind = null;

    if (nextBold !== -1 && (nextItalic === -1 || nextBold <= nextItalic)) {
      next = nextBold;
      kind = "bold";
    } else if (nextItalic !== -1) {
      next = nextItalic;
      kind = "italic";
    }

    if (next === -1) {
      container.append(document.createTextNode(text.slice(i)));
      return;
    }

    if (next > i) {
      container.append(document.createTextNode(text.slice(i, next)));
    }

    if (kind === "bold") {
      const end = text.indexOf("**", next + 2);
      if (end === -1) {
        container.append(document.createTextNode(text.slice(next)));
        return;
      }
      const strong = document.createElement("strong");
      strong.append(document.createTextNode(text.slice(next + 2, end)));
      container.append(strong);
      i = end + 2;
      continue;
    }

    const end = text.indexOf("*", next + 1);
    if (end === -1) {
      container.append(document.createTextNode(text.slice(next)));
      return;
    }
    const em = document.createElement("em");
    em.append(document.createTextNode(text.slice(next + 1, end)));
    container.append(em);
    i = end + 1;
  }
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("poem-room-theme", theme);

  const isDark = theme === "dark";
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.querySelector("span:last-child").textContent = isDark ? "Light" : "Dark";
    themeToggle.querySelector("span:first-child").textContent = isDark ? "☼" : "☾";
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("poem-room-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (prefersDark ? "dark" : "light"));
}

initializeTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "light" : "dark");
  });
}

function renderArchive() {
  if (!archiveList) {
    return;
  }

  archiveList.innerHTML = "";

  sortedPoems.forEach((poem) => {
    const slug = slugify(poem.title);
    const item = document.createElement("li");
    item.className = "archive-item";
    item.dataset.poemSlug = slug;

    const link = document.createElement("a");
    link.href = `Poems/${slug}.html`;
    link.textContent = poem.title;

    item.append(link);
    item.append(createArchiveActions(slug, poem.title));
    archiveList.append(item);
  });
}

function createArchiveActions(slug, title) {
  const actions = document.createElement("div");
  actions.className = "archive-actions";
  actions.append(createCollectionMenu(slug));
  actions.append(createFavouriteButton(slug, title));

  return actions;
}

function createCollectionMenu(slug) {
  const wrapper = document.createElement("div");
  wrapper.className = "collection-menu";

  const button = document.createElement("button");
  button.className = "collection-menu-button";
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Add poem to a collection");
  button.textContent = "+";

  const panel = document.createElement("div");
  panel.className = "collection-menu-panel";
  panel.hidden = true;

  button.addEventListener("click", () => {
    const shouldOpen = panel.hidden;
    closeCollectionMenus();
    panel.hidden = !shouldOpen;
    button.setAttribute("aria-expanded", String(shouldOpen));
  });

  wrapper.append(button);
  wrapper.append(panel);
  renderCollectionMenuPanel(panel, slug);

  return wrapper;
}

function closeCollectionMenus() {
  document.querySelectorAll(".collection-menu-panel").forEach((panel) => {
    panel.hidden = true;
  });

  document.querySelectorAll(".collection-menu-button").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function renderCollectionMenuPanel(panel, slug) {
  panel.innerHTML = "";

  if (!collections.length) {
    const empty = document.createElement("p");
    empty.textContent = "Create a collection in My Library first.";
    panel.append(empty);
    return;
  }

  collections.forEach((collection) => {
    const button = document.createElement("button");
    const alreadyAdded = collection.poems.includes(slug);
    button.type = "button";
    button.disabled = alreadyAdded;
    button.textContent = alreadyAdded ? `${collection.name} ✓` : collection.name;
    button.addEventListener("click", () => {
      addPoemToCollection(collection.id, slug);
      closeCollectionMenus();
    });

    panel.append(button);
  });
}

function refreshCollectionMenus() {
  document.querySelectorAll(".collection-menu").forEach((menu) => {
    const panel = menu.querySelector(".collection-menu-panel");
    const slug = menu.closest(".archive-item")?.dataset?.poemSlug;

    if (panel && slug) {
      renderCollectionMenuPanel(panel, slug);
    }
  });
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".collection-menu")) {
    closeCollectionMenus();
  }
});

function saveFavourites() {
  localStorage.setItem(favouritesKey, JSON.stringify([...favouriteSlugs]));
}

function saveCollections() {
  localStorage.setItem(collectionsKey, JSON.stringify(collections));
}

function isFavourite(slug) {
  return favouriteSlugs.has(slug);
}

function createFavouriteButton(slug, title) {
  const button = document.createElement("button");
  button.className = "favourite-button";
  button.type = "button";
  button.dataset.favouriteSlug = slug;
  button.addEventListener("click", () => {
    toggleFavourite(slug);
  });

  updateFavouriteButton(button, title);

  return button;
}

function updateFavouriteButton(button, title) {
  const active = isFavourite(button.dataset.favouriteSlug);
  button.setAttribute("aria-pressed", String(active));
  button.setAttribute(
    "aria-label",
    `${active ? "Remove" : "Add"} ${title} ${active ? "from" : "to"} My Library`
  );
  button.textContent = active ? "♥" : "♡";
}

function updateFavouriteButtons() {
  document.querySelectorAll("[data-favourite-slug]").forEach((button) => {
    const poem = poemBySlug.get(button.dataset.favouriteSlug);
    updateFavouriteButton(button, poem?.title || "this poem");
  });
}

function toggleFavourite(slug) {
  const wasFavourite = isFavourite(slug);

  if (isFavourite(slug)) {
    favouriteSlugs.delete(slug);
  } else {
    favouriteSlugs.add(slug);
  }

  saveFavourites();
  updateFavouriteButtons();
  renderLibrary();

  if (!wasFavourite) {
    showLibraryToast("Added to Favourites", "#library-favourites");
  } else {
    showLibraryToast("Removed from Favourites", "#library-favourites");
  }
}

function createCollection(name) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return;
  }

  collections.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: trimmedName,
    poems: [],
  });

  saveCollections();
  renderCollections();
  refreshCollectionMenus();
  refreshReaderActions();
}

function addPoemToCollection(collectionId, slug) {
  const collection = collections.find((item) => item.id === collectionId);

  if (!collection || collection.poems.includes(slug)) {
    return;
  }

  collection.poems.push(slug);
  saveCollections();
  renderCollections();
  refreshCollectionMenus();
  showLibraryToast(`Added to ${collection.name}`, `#collection-${collection.id}`);
}

function removePoemFromCollection(collectionId, slug) {
  const collection = collections.find((item) => item.id === collectionId);

  if (!collection) {
    return;
  }

  collection.poems = collection.poems.filter((poemSlug) => poemSlug !== slug);
  saveCollections();
  renderCollections();
  refreshCollectionMenus();
}

function movePoemInCollection(collectionId, fromIndex, toIndex) {
  const collection = collections.find((item) => item.id === collectionId);

  if (!collection) {
    return;
  }

  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= collection.poems.length ||
    toIndex >= collection.poems.length ||
    fromIndex === toIndex
  ) {
    return;
  }

  const [poemSlug] = collection.poems.splice(fromIndex, 1);
  collection.poems.splice(toIndex, 0, poemSlug);
  saveCollections();
  renderCollections();
}

function removeCollection(collectionId) {
  const collection = collections.find((item) => item.id === collectionId);

  if (!collection || !window.confirm(`Delete "${collection.name}"?`)) {
    return;
  }

  collections = collections.filter((collection) => collection.id !== collectionId);
  saveCollections();
  renderCollections();
  refreshCollectionMenus();
  refreshReaderActions();
}

function renameCollection(collectionId) {
  const collection = collections.find((item) => item.id === collectionId);

  if (!collection) {
    return;
  }

  const newName = window.prompt("Rename collection", collection.name)?.trim();

  if (!newName) {
    return;
  }

  collection.name = newName;
  saveCollections();
  renderCollections();
  refreshCollectionMenus();
  refreshReaderActions();
}

function renderLibrary() {
  if (!libraryList || !libraryEmpty) {
    renderCollections();
    return;
  }

  libraryList.innerHTML = "";

  const favourites = sortedPoems.filter((poem) => favouriteSlugs.has(slugify(poem.title)));
  libraryEmpty.hidden = favourites.length > 0;

  favourites.forEach((poem) => {
    const slug = slugify(poem.title);
    const item = document.createElement("li");
    item.className = "archive-item";
    item.dataset.poemSlug = slug;

    const link = document.createElement("a");
    link.href = `Poems/${slug}.html`;
    link.textContent = poem.title;

    item.append(link);
    item.append(createFavouriteButton(slug, poem.title));
    libraryList.append(item);
  });

  renderCollections();
}

function renderCollections() {
  if (!collectionsList || !collectionsEmpty) {
    return;
  }

  collectionsList.innerHTML = "";
  collectionsEmpty.hidden = collections.length > 0;

  collections.forEach((collection) => {
    const section = document.createElement("section");
    section.className = "collection-card";
    section.id = `collection-${collection.id}`;
    section.tabIndex = -1;

    const header = document.createElement("div");
    header.className = "collection-card-header";

    const heading = document.createElement("h4");
    heading.textContent = collection.name;

    const actions = document.createElement("div");
    actions.className = "collection-card-actions";

    const renameButton = document.createElement("button");
    renameButton.type = "button";
    renameButton.className = "text-button";
    renameButton.textContent = "Rename collection";
    renameButton.addEventListener("click", () => {
      renameCollection(collection.id);
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "text-button";
    removeButton.textContent = "Delete collection";
    removeButton.addEventListener("click", () => {
      removeCollection(collection.id);
    });

    actions.append(renameButton);
    actions.append(removeButton);
    header.append(heading);
    header.append(actions);
    section.append(header);

    if (collection.poems.length) {
      const list = document.createElement("ol");
      list.className = "collection-poem-list";

      collection.poems.forEach((slug, index) => {
        const poem = poemBySlug.get(slug);

        if (!poem) {
          return;
        }

        const item = document.createElement("li");
        item.draggable = true;
        item.dataset.collectionId = collection.id;
        item.dataset.poemSlug = slug;
        item.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData(
            "text/plain",
            JSON.stringify({ collectionId: collection.id, fromIndex: index })
          );
          event.dataTransfer.effectAllowed = "move";
          item.classList.add("is-dragging");
        });
        item.addEventListener("dragend", () => {
          item.classList.remove("is-dragging");
        });
        item.addEventListener("dragover", (event) => {
          event.preventDefault();
          item.classList.add("is-drop-target");
        });
        item.addEventListener("dragleave", () => {
          item.classList.remove("is-drop-target");
        });
        item.addEventListener("drop", (event) => {
          event.preventDefault();
          item.classList.remove("is-drop-target");

          try {
            const payload = JSON.parse(event.dataTransfer.getData("text/plain"));

            if (payload.collectionId === collection.id) {
              movePoemInCollection(collection.id, payload.fromIndex, index);
            }
          } catch {
            // Ignore drops from outside the collection list.
          }
        });

        const link = document.createElement("a");
        link.href = `Poems/${slug}.html`;
        link.textContent = poem.title;

        const controls = document.createElement("div");
        controls.className = "collection-poem-actions";

        const removePoemButton = document.createElement("button");
        removePoemButton.type = "button";
        removePoemButton.className = "icon-button remove-poem-button";
        removePoemButton.setAttribute("aria-label", `Remove ${poem.title} from ${collection.name}`);
        removePoemButton.textContent = "×";
        removePoemButton.addEventListener("click", () => {
          removePoemFromCollection(collection.id, slug);
        });

        controls.append(removePoemButton);
        item.append(link);
        item.append(controls);
        list.append(item);
      });

      section.append(list);
    } else {
      const empty = document.createElement("p");
      empty.className = "collection-empty";
      empty.textContent = "No poems in this collection yet.";
      section.append(empty);
    }

    collectionsList.append(section);
  });
}

function showLibraryToast(message, targetHash) {
  if (!toastRegion) {
    return;
  }

  const isReplacingToast = toastRegion.children.length > 0;
  toastRegion.innerHTML = "";

  const button = document.createElement("button");
  button.type = "button";
  button.className = isReplacingToast ? "library-toast is-replacement" : "library-toast";
  button.textContent = message;
  button.addEventListener("click", () => {
    scrollToLibraryTarget(targetHash);
    toastRegion.innerHTML = "";
  });

  toastRegion.append(button);

  window.setTimeout(() => {
    if (button.isConnected) {
      button.remove();
    }
  }, 3000);
}

function scrollToLibraryTarget(targetHash) {
  if (poemPageSlug) {
    const url = new URL("../index.html", window.location.href);
    url.searchParams.set("target", targetHash || "#library");
    url.hash = "#library";
    window.location.href = url.toString();
    return;
  }

  if (!siteHeader) {
    return;
  }

  window.history.pushState(null, "", "#library");
  handleRoute();

  const target = document.querySelector(targetHash) || document.querySelector("#library");

  if (!target) {
    return;
  }

  const headerBottom = siteHeader.getBoundingClientRect().bottom;
  const desiredGap = 42;
  const targetTop =
    window.scrollY + target.getBoundingClientRect().top - headerBottom - desiredGap;

  window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  target.focus?.({ preventScroll: true });
}

function createCollectionControl(slug) {
  const wrapper = document.createElement("form");
  wrapper.className = "reader-collection-form";

  const select = document.createElement("select");
  select.name = "collection";
  select.required = true;

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = collections.length ? "Add to collection" : "Create a collection first";
  select.append(placeholder);

  collections.forEach((collection) => {
    const option = document.createElement("option");
    option.value = collection.id;
    option.textContent = collection.name;
    select.append(option);
  });

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Add";
  button.disabled = collections.length === 0;

  wrapper.addEventListener("submit", (event) => {
    event.preventDefault();
    addPoemToCollection(select.value, slug);
    select.value = "";
  });

  wrapper.append(select);
  wrapper.append(button);

  return wrapper;
}

function renderPoem(poem) {
  if (!reader || !readerTitle || !readerPoem || !readerActions) {
    return;
  }

  const slug = slugify(poem.title);
  reader.hidden = false;
  readerTitle.textContent = poem.title;
  if (readerSubtitle) {
    readerSubtitle.hidden = !poem.subtitle;
    readerSubtitle.textContent = poem.subtitle || "";
  }
  readerPoem.innerHTML = "";
  readerActions.innerHTML = "";
  readerActions.append(createFavouriteButton(slug, poem.title));
  readerActions.append(createCollectionControl(slug));

  if (poem.lines?.length) {
    poem.lines.forEach((stanza, index) => {
      const paragraph = document.createElement("p");
      const isSignature = index === poem.lines.length - 1 && stanza.startsWith("— ");
      const target = isSignature ? document.createElement("em") : paragraph;

      stanza.split("\n").forEach((line, lineIndex) => {
        if (lineIndex > 0) {
          target.append(document.createElement("br"));
        }

        appendFormattedText(target, line);
      });

      if (isSignature) {
        paragraph.classList.add("poem-signature");
        paragraph.append(target);
      }

      readerPoem.append(paragraph);
    });
  } else {
    const placeholder = document.createElement("p");
    placeholder.className = "reader-placeholder";
    placeholder.textContent = "Poem text coming soon.";
    readerPoem.append(placeholder);
  }

  reader.scrollIntoView({ behavior: "smooth", block: "start" });
  reader.focus({ preventScroll: true });
}

function refreshReaderActions() {
  const [, slug] = window.location.hash.match(/^#poem\/(.+)$/) || [];
  const poem = slug ? poemBySlug.get(slug) : null;

  if (!poem || !reader || reader.hidden) {
    return;
  }

  if (readerSubtitle) {
    readerSubtitle.hidden = !poem.subtitle;
    readerSubtitle.textContent = poem.subtitle || "";
  }

  readerActions.innerHTML = "";
  readerActions.append(createFavouriteButton(slug, poem.title));
  readerActions.append(createCollectionControl(slug));
}

function handleRoute() {
  if (!reader) {
    return;
  }

  const [, slug] = window.location.hash.match(/^#poem\/(.+)$/) || [];

  if (!slug) {
    reader.hidden = true;
    return;
  }

  const poem = poemBySlug.get(slug);

  if (poem) {
    renderPoem(poem);
  }
}

function handlePendingLibraryTarget() {
  if (poemPageSlug || !siteHeader) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const target = params.get("target");

  if (!target) {
    return;
  }

  // Clear the param to keep the URL tidy after we scroll.
  const url = new URL(window.location.href);
  url.searchParams.delete("target");
  window.history.replaceState(null, "", url.toString());

  scrollToLibraryTarget(target);
}

function initializePoemPageControls() {
  if (!poemPageSlug) {
    return;
  }

  const menu = document.querySelector("[data-poem-collection-menu]");
  const button = menu?.querySelector(".collection-menu-button");
  const panel = menu?.querySelector(".collection-menu-panel");

  if (panel) {
    renderCollectionMenuPanel(panel, poemPageSlug);
  }

  if (button && panel) {
    button.addEventListener("click", () => {
      const shouldOpen = panel.hidden;
      closeCollectionMenus();
      panel.hidden = !shouldOpen;
      button.setAttribute("aria-expanded", String(shouldOpen));
    });
  }
}

renderArchive();
renderLibrary();
handleRoute();
updateFavouriteButtons();
handlePendingLibraryTarget();
initializePoemPageControls();

window.addEventListener("hashchange", handleRoute);

if (collectionForm) {
  collectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(collectionForm);
    createCollection(String(formData.get("collection-name") || ""));
    collectionForm.reset();
  });
}

if (readerClose && reader) {
  readerClose.addEventListener("click", () => {
    reader.hidden = true;
  });
}

function scrollToSectionLabel(hash) {
  if (!siteHeader) {
    return;
  }

  if (hash === "#top") {
    window.history.pushState(null, "", hash);
    handleRoute();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const section = document.querySelector(hash);
  const label = section?.querySelector(".eyebrow") || section;

  if (!label) {
    return;
  }

  const headerBottom = siteHeader.getBoundingClientRect().bottom;
  const desiredGap = 42;
  const targetTop =
    window.scrollY + label.getBoundingClientRect().top - headerBottom - desiredGap;

  window.history.pushState(null, "", hash);
  handleRoute();
  window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToSectionLabel(link.getAttribute("href"));
  });
});

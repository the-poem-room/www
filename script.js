const themeToggle = document.querySelector("[data-theme-toggle]");
const archiveSearch = document.querySelector("[data-archive-search]");
const archiveSearchStatus = document.querySelector("[data-archive-search-status]");
const archiveSearchResults = document.querySelector("[data-archive-search-results]");
const archiveSearchModeButtons = document.querySelectorAll("[data-archive-search-mode-option]");
const randomPoemButton = document.querySelector("[data-random-poem-button]");
const archiveEmpty = document.querySelector("[data-archive-empty]");
const archiveList = document.querySelector("[data-archive-list]");
const featuredCollectionsList = document.querySelector("[data-featured-collections-list]");
const reader = document.querySelector("#poem-reader");
const readerTitle = document.querySelector("[data-reader-title]");
const readerSubtitle = document.querySelector("[data-reader-subtitle]");
const readerMeta = document.querySelector("[data-reader-meta]");
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
const siteBrand = document.querySelector(".brand");
const siteNav = document.querySelector(".site-nav");
const navToggle = document.querySelector("[data-nav-toggle]");
const sectionJumpLinks = document.querySelectorAll(
  ".site-nav a[href^='#'], .hero-actions a[href^='#']"
);
const settingsMenu = document.querySelector("[data-settings-menu]");
const settingsToggle = document.querySelector("[data-settings-toggle]");
const settingsPanel = document.querySelector("[data-settings-panel]");
const fontSizeButtons = document.querySelectorAll("[data-font-size-option]");
const navModeButtons = document.querySelectorAll("[data-nav-mode-option]");
const lineNumberButtons = document.querySelectorAll("[data-line-number-option]");
const miniMapButtons = document.querySelectorAll("[data-mini-map-option]");

const poemPageSlug = document.body?.dataset?.poemSlug || "";
const POEM_READING_WPM = 100;
const favouritesKey = "poem-room-favourites";
const favouriteOrderKey = "poem-room-favourite-order";
const collectionsKey = "poem-room-collections";
const fontSizeKey = "poem-room-font-size";
const navModeKey = "poem-room-nav-mode";
const lineNumbersKey = "poem-room-line-numbers";
const miniMapKey = "poem-room-mini-map";
const archiveSearchModeKey = "poem-room-archive-search-mode";
const fontSizeOptions = new Set(["small", "normal", "big"]);
const navModeOptions = new Set(["always-visible", "auto-hide", "hover-top"]);
const lineNumberOptions = new Set(["show", "hide"]);
const miniMapOptions = new Set(["show", "hide"]);
const archiveSearchModeOptions = new Set(["titles", "poem-text"]);
const sectionTargetHashes = new Set([
  "#top",
  "#purpose",
  "#bio",
  "#poems",
  "#featured-collections",
  "#library",
]);
const navRevealZone = 18;
const headerFitSlack = 28;
const mobileNavQuery = window.matchMedia("(max-width: 760px)");
let lastPointerY = Number.POSITIVE_INFINITY;
let activeReadingRoomNavigation = null;
let readingRoomNavigationPending = false;
let headerLayoutUpdatePending = false;

const poems = [
  {
    title: "a broken metronome",
    written: "19th August 2025",
    lines: [
      "click. click—\nthen silence.\nA room holds its breath like a barline stretched thin.\nI count with my ribs, find four in the flutter of three.\nThe lamp hums a shaky tempo; rain plays triplets on glass.\nI pencil a beat on the desk, wood answering skin.\nTime is elastic when no one's watching.\nI practice the piece that won't still\nuntil the ending learns to arrive\nFashionably late, but exactly right.",
      "*— Lilith*",
    ],
  },
  {
    title: "A Manual for the Modern Messiah",
    written: "18 July 2025",
    subtitle: "(Instructions by Elon Musk)",
    lines: [
      "Build a rocket.\nBurn the sky.\nPreach green—\nthen mine cobalt \nwith Congolese hands\nyou'll never see.",
      "Sell freedom\n140 characters at a time—\nbut silence dissent,\nboost bots,\nfire thousands by email\nwhile tweeting memes\nabout grindset.",
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
    written: "3 October 2025",
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
    written: "9 October 2025",
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
    written: "14 July 2025",
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
  {
    title: "aftersound",
    written: "2 May 2025",
    lines: [
      "sometimes i forget\nthe shape of your voice\nhow silence\nlearned to sound like you",
      "the air between us\nhas stretched so thin\nit hums",
      "sometimes the distance\noutgrows the body\nand what was once\na voice\nbecomes aftersound",
      "i try to remember\nhow the air felt\nwhen you were near\nthe texture of your eyes\nhow light used to rest there\nlike a hand on water",
      "but months pile quietly\nlike dust on a table\nand the room kept breathing\nas time does its slow work\nsoftening the edges",
      "you become less person\nmore echo\nuntil touch is a rumour\nand names are only weather",
      "i think of you\nand it feels like thinking\nof a place that still stands\nbut only in memory's map",
      "the walls are still there\nin my mind\nbut the paint flakes\nthe windows blur",
      "and still\non certain nights\nyou flicker\nlike breath against glass\nand for a moment",
      "i almost believe \nin form again",
      "— Lilith",
    ],
  },
  {
    title: "Against the Mean",
    written: "11 May 2025",
    lines: [
      "It learns to make the room nod in unison—\nloss shaved thin, surprise sanded down—\na mean-making engine,\nhotel-lobby playlist on infinite loop.",
      "Still, in the data; harline whistles—\nverbs moonlighting as nouns,\nriffs in 5/4 that step off the curb\nand keep walking. Red-circled outliers.",
      "Train it to please everyone: wallpaper.\nTrain it to break something: doors.\nAim at consensus, you get comfort;\naim at silence, you might get a note.",
      "Novelty's cheap—splice two clichés.\nEvery hard thing is useful weird.\nEvolution: copy, mutate, and let the world deceide.\nModels: copy, mutate—who's deciding?",
      "I've seen it mishear the brief and win the song,\ninvent a horn I don't own,\nthen average my grief\ninto a beige emoji.",
      "Genius—carbon or silicon—\nis an error rate we refuse to fix.\nLeft alone, it settles at the lack of μ,\na surface without weather.",
      "But widen σ, give it teeth—constraints,\nstakes, the right to fail loudly—\nand sometimes it wipes out specularly, and sometimes\nnames a colour no tongue has held.",
      "So is it doomed to the middle,\nor brighter than our brightest?\nIt's a fader in our hands:\nminimise regret, or risk a key change\nno dataset rehearsed.",
      "The mean makes comfort.\nThe spike makes history.\nChoose your loss.\nTune your risk.\nPress render.",
      "— Lilith",
    ],
  },
  {
    title: "Alpha by Algorithm",
    written: "17 June 2025",
    lines: [
      "He speaks in clips, in kicks, in clicks,\nin hustler creeds and party tricks.\nHe growls of war, of weight, of wealth—\nbut shouts the loudest at himself.",
      "He barks \"You're weak!\"—a schoolyard sneer,\nfrom behind sunglasses and fear.\nA temple built on abs and flash,\na god of protein shakes and cash.",
      "His kingdom's carved in comment threads,\nwhere angry boys quote what he says.\nWhere nuance dies and girls are prey,\nand kindness means you've lost the way.",
      "He sells a dream in pixel skin:\nyou either win, or die within.\nA man, he claims, must dominate —\nor else, my friend, your Andrew's bait.",
      "But real strength whispers, not performs.\nIt breaks, it bends, it weathers storms.\nNot every king rides Bugatti-red —\nsome just tuck a kid into bed.",
      "— Lilith",
    ],
  },
  {
    title: "Before the Screens",
    written: "1 January 2025",
    lines: [
      "I still recall what silence used to say—\nbefore the red lights glowed across our screens.\nThe stars were clearer when we looke away.",
      "We lived like clocks that ticked but lost their way,\nforgetting how the golden hours wane.\nI still recall what silence used to say.",
      "A stream would murmur softly as it lay\nacross the stones, untouched by bright machines.\nThe stars were clearer when we looked away.",
      "We traded sky for signal, earth for steel,\nin every pixelated frame of days gone by.\nI still recall what silence used to say—",
      "The future hums, but never wants to stay.\nIt flickers past through code and fading loops.\nThe stars were clearer when we looked away.",
      "And though the world will fade to screen-washed grey,\nI hold the hush that hummed in softer scenes.\nI still recall what silence used to say—\nthe stars burned clearer when we looked away.",
      "— Lilith",
    ],
  },
  {
    title: "Beneath Permanent Shelter",
    written: "9 May 2026",
    lines: [
      "A year is a strangely human way\nto measure absence.",
      "The trees outside my window\nhave already forgotten\nwhich leaves belonged\nto last spring.",
      "But today marks exactly\nthree hundred and sixty-five days\nsince I last beside you\nwithout needing to explain myself.",
      "And I still wake some mornings\nwith the shape of you\nlike an indentation\nin fabric.",
      "Not love —\nat least not the kind\nthe world keeps trying to sell us.",
      "Something quieter.\nSomething harder to name\nwithout sounding naïve.",
      "Now, my days are cleaner.",
      "That is the first truth.",
      "I eat better.\nSleep earlier.\nWrite more.\nThinkn further.",
      "My room no longer smells\nof stale afternoons\nleft to rot into midnight.",
      "I have learned how to sit alone\nwithout immediately reaching\nfor another voice\nto fill the weather inside me.",
      "Sometimes I walk for hours\nthrough cold streets\nwith music in my headphones\nand feel almost unbearable gratitude\nfor my own mind.",
      "A year ago\nI could not do that.",
      "A year ago\nI was living almost entirely\nbeneath shelter.",
      "You were a harbour\nI mistook for the sea.",
      "And I stayed anchored there\nso long\nI forgot currents existed.",
      "We built our friendship\nlike children building dens\ninside the roots of enormous trees —\nsafe beneath the dark,\nwarm with breath and laughter,\ncertain the storm could never touch us.",
      "And maybe it couldn't.",
      "But nothing grows\nbeneath permanent shelter.",
      "There are whole forests\nthat only open\nafter fire.",
      "I think of us then —",
      "the shared mattress on my floor,\nthe strange ease of our bodies,\nhow neither of us flinched\nfrom skin or softness.",
      "The way you hugged me\nwithout calculation.",
      "How I could exist beside you\nwithout performing personhood\nquite so aggressively.",
      "Because that is what most days are,\nstill.",
      "Performance.",
      "Voice measured.\nHands measured.\nEvery gesture edited\nthrough the static ache\nof living inside a body\nthat feels partly\nmistranslated.",
      "People exhaust me\nthe way bright supermarkets do —\ntoo much light,\ntoo much awareness\nof being perceived.",
      "But with you\nI could forget my outline.",
      "I could be unfinished aloud.",
      "And maybe that was part\nof the danger.",
      "Not you.",
      "Not even us.",
      "Just the temptation\nto remain hidden forever\ninside something warm.",
      "I miss that warmth still,\nwith a grief\nthat arrives softly,\nlike fog crossing fields\nrather than storms.",
      "However —",
      "I cannot pretend\nwe were saving each other.",
      "You were drifting outward already.",
      "Toward girlfriends,\ntoward future\nshaped like escape velocity.",
      "And I —\nterrified of becoming real —\nheld tighter\nto what was easy.",
      "You became a room\nwhere I never had to ask\nwho I might become\nif left alone long enough.",
      "Ivy climbed quietly there.",
      "By the time I noticed,\nit knew the walls\nbetter than I did.",
      "I do not blame you\nfor wanting more life\nthan our little orbit allowed.",
      "Sometimes I wonder\nif I made you smaller too.",
      "If we both mistook closeness\nfor completion.",
      "The world teaches boys\nto abandon tenderness\nthe moment it risks being mistaken\nfor need.",
      "It teaches all of us\nthat intimacy only matters\nwhen romance sanctifies it.",
      "As though two people\ncannot hold each other together\nbriefly and beautifully\nwithout eventually being asked\nwhat they are becoming.",
      "Maybe we broke partly beneath\nthat pressure.",
      "Or maybe we simply reached\nthe natural edge\nof who we were to each other.",
      "Some rivers run beside on another\nfor miles through valleys\nbefore quietly dividing\naround separate hills.",
      "Neither river is wrong\nfor continuing.",
      "Still, today,\none year later,\nI stood in the kitchen\nunable to decide\nwhat to do\nwith my hands.",
      "And for a moment\nI missed the simplicity\nof existing beside you\nmore than anything else\nI have ever known.",
      "But I also opened the window.",
      "And outside,\nthe wind moved freely\nthrough branches no longer tied together.",
      "It sounded lonely.",
      "It sounded alive.",
      "— Lilith",
    ],
  },
  {
    title: "Between Hours",
    written: "11 November 2025",
    lines: [
      "Time has never been a strict thing,\nnot really.",
      "In Iceland, the sun forgets\nits bedtime —\nmorning lingers,\nnight take its time\ndeciding if it wants to arrive at all.\nHours stretch like curious arms,\nreaching toward winter fireworks,\ndaylight stitched with quiet crackles,\na small daylight revolt,\nthe horizon unsure\nwhat hour it holds.",
      "Here at home\ncurtains closed,\nthe clock keeps its habits\nbut I don't always listen.\nPages fill, melodies spill,\none idea nudging the next,\nthoughts tugging loose,\nseconds loosening,\nlost and briefly found,\na quiet countdown\ndissolving into hush.",
      "Time blurs\nwhen I stop measuring it,\nwhen the world outside\nis simply allowed\nto be wherever it is,\nand I let myself be\nright here,\nin the honest hush\nbetween heartbeats,\nwhere light and thought\nshare the same soft space.",
      "There's a kind of beauty\nin forgetting the rules\nwe invented anyway:\nthat morning must be bright,\nthat evening must be dark,\nthat minutes must march\ninstead of dance —\ninstead of chance,\ninstead of slipping softly\nout of step.",
      "Maybe the most honest moments\nare the ones that refuse\nto find inside a calendar square,\nthe ones where a day\nfeels boundless,\nwhere I float,\nunbothered by ticking,\nsimply existing\nin the soft stretch\nbetween any beginning\nand any ending,\nthe air still bending light,\nwhispering\nthat time is real\nwhen we forget to care,\nwhen we drift\nbetween hours.",
      "— Lilith",
    ],
  },
  {
    title: "BREAKING: Polite Notices During Catastrophe",
    written: "29 September 2025",
    slug: "breaking-politce-notices-during-catastrophe",
    lines: [
      "The ticker reads like a shopping list—\nArsenal 3-1,\nactor \"sorry if anyone was offended,\"\nsix thousand confirmed,\nsunny spells by Sunday.",
      "A bell over some door does its small, correct duty.\nManners arrive on time; grief waits in the lobby.",
      "We try on voices the way we try on hats—\nbrims of etiquette shading the face of ethics.\nIn the mirror everything fits,\nand the mirror, being diligent, reflects everything but regret.",
      "We've mastered the weightless register:\nan incident, a variance, an adjustment downstream—\nlanguage that tucks a body in without touching it.\nSign to confirm you've been fully consoled.\nTick if you consent to continuing as normal.",
      "At noon, a lectern clears its throat.\n\"Regret was expressed.\"\n\"Mistakes were made.\"\n\"Protocols will be reviewed to prevent this type of outcome.\"\nWhose mistake?\n\"Stakeholders across a range of contexts.\"\nWhy did it happen?\n\"Complexities.\"\nWhat will you change?\n\"We thank you for your question.\"",
      "Meanwhile: biscuits, a sip of tea, the match,\na trailer that looks mid—\nsix thousand—\n\"Wild.\"\nThe biscuits pass unchanged.",
      "Composure is a tap left running.\nFirst the room hums, then it drowns.\nDesensitisation settles like pressure on the chest you stop noticing.",
      "Make the tidy case the numbers demand:\nif one lift matters, five matter fivehold.\nAn ideal heart scales feeling by the count—\nnot cruelty, coherence.\nYet watch us miscalculate: a single name\noutweighs the blur of thousands.\nWe round six thousand down to \"too many,\"\nand file \"too many\" under \"nothing actionable at this time.\"",
      "Society behaves like a fluid:\nvalues dissolve on contact—\nsport swirls with massacre, gossip with famine,\na hero's dog with a nation's dead.\nThe glass is stirred; nothing precipitates but silence.",
      "Back to the ledger we pretend is only a crawl.\nLet \"six thousand\" unspool into six thousand rooms,\nsix thousand soups cooling, six thousand songs cut short mid-chorus.\nCount without rounding down. Name what the euphemisms hide.\nTake off the hat that says *courteous* when the moment demands *truthful*.",
      "WTF—say it plain. Let the bell ring like an alarm, not a courtesy.\nIf one matters, five must matter five times over;\nscale the feeling, scale the duty, and move accordingly.\nLet the mirror keep its accuracy; let us keep our honesty.\nAnd when the crawl returns—scores, apologies, bodies, weather—\nrefuse the equal sign, refuse the lullaby.\nSpeak the real word, and let the ground finally shake\nexactly as much as it should.",
      "— Lilith",
    ],
  },
  {
    title: "Cartography of Shadows",
    written: "15 October 2025",
    lines: [
      "In Pyongyang,\navenues wide as silence,\nmonuments rehearsed into stone.\nFrom above, the city glows with borrowed light,\nbut inside the dark,\nfamilies barter rice for whispers of truth.\nYet on festival days,\ndrums ripple through the streets,\nneighbours share rice cakes,\nlaughter rising louder than fear.\nAnd still—\neverywhere, a heartbeat resists.",
      "In Gaza,\nwalls rise higher than sky,\na child knots a kite from plastic bags,\nlaunches it above the rubble,\na sky more forgiving than the earth.\nEven here, weddings weave music through alleys,\nchildren race between broken stones,\ntheir joy as defiant as the kite.\nAnd still—\neverywhere, a heartbeat resists.",
      "In Xinjiang,\nprayers are confiscated,\nlanguages folded shut,\nidentity stored in files\nno one is meant to read.\nStill, in secret, mothers hum old lullabies,\nfathers pass down forbidden words,\nfamilies gather in hidden rooms\nto mark the new year with flame and song.\nAnd still—\neverywhere, a heartbeat resists.",
      "In Myanmar,\nvoices vanish into cells,\nwhere time is rationed like stale bread\nand hope is contraband.\nYet lanterns rise each season,\nfloating like prayers no soldier can catch,\ncarrying the wishes of those\nwho refuse to stop dreaming.\nAnd still—\neverywhere, a heartbeat resists.",
      "Across oceans,\nrefugees cling to rafts,\nsaltwater carving psalms into skin.\nIn deserts,\nbones whiten beneath an indifferent sun.\nAnd when rafts reach shore,\nstrangers embrace as kin,\nbuilding homes from nothing\nbut shared survival and song.\nAnd still—\neverywhere, a heartbeat resists.",
      "Not borders, not monuments,\nnot the silence of power—\nonly the pulse,\nquiet as a drum beneath the floor of the world,\nthe same rhythm in every chest,\nrefusing to stop.",
      "— Lilith",
    ],
  },
  {
    title: "Children See More",
    written: "15 March 2025",
    lines: [
      "I once saw a crack\nin the pavement\nand thought maybe\nsomething was trying to escape—\na root,\na ripple,\na hidden word.",
      "Mum said,\n\"It's just the frost,\"\nbut I knew\nsome things split\nbecause they want to grow.",
      "I saw a girl\noffer her seat on the bus—\nno words,\njust a small move\nthat felt like a quiet promise\nto someone who needed it more.\nShe didn't smile.\nShe didn't know\nit was the kindest thing\nI'd seen all day.\nMaybe she still doesn't.",
      "Once, a puddle\nheld a piece of sky.\nI told them—\nthe clouds were floating in it—\nbut they laughed\nand called me dreamy.\nThe next day,\nthe puddle was gone.\nThe sky stayed.",
      "I watched a shadow\nclimb the wall\nas if it had somewhere to be.\nI think time moves like that—\nquiet,\nslow,\nand only noticed\nwhen you stop playing.",
      "They say\nchildren imagine things.\nBut maybe we just\nsee the parts\nthat adults forget—\nthe shimmer\non the edge of normal,\nthe meaning\ntucked behind small things.",
      "We don't grow out of it.\nWe grow around it,\nlike trees bending\nto fences\nbut never forgetting\nthe sky.",
      "And one day,\nwhen it's quiet,\nwe'll remember\nwhat it felt like\nto see\nwithout asking why.",
      "Not more, exactly.\nJust\ndifferently.\nJust\ndeeper.",
      "— Lilith",
    ],
  },
  {
    title: "Compulsory Existence",
    written: "2 November 2025",
    lines: [
      "I am told this is good for me.\nThat attendance is education,\nthat education is liberation,\nthat liberation is obedience\nto the timetable.",
      "They call it *freedom*,\nthe freedom to choose between one government-approved route\nand another.\nThe freedom to wear my tie straight,\nto keep my hair bound\nin an acceptable demonstration\nof focus.",
      "I sit in a room and I think:\nmy body is here because the law says it must be,\nand my mind is elsewhere because my body is.",
      "Sometimes I wonder\nif the real subject being taught\nis *submission*:\nhow to smile politely\nwhile they measure your attention span\nin units of compliance.\nHow to call the bars of the cage\ndiscipline.\nHow to label your questions\nas distractions,\nand your enthusiasm\nas disruption.",
      "Ah, the wondrous, infallible curriculum!\nThat celestial scripture of state-approved curiosity.\nImmutable. Unquestionable.\nIts commandments carved into PowerPoint slides,\ndelivered by prophets of punctuality.",
      "I'm not asking to burn it down,\nonly to annotate the margins.\nTo say: this doesn't fit me.\nThis doesn't honour the way\nmy mind tangles and bursts and leaps\nlike fireworks that refuse to be choregraphed.\nI love my brain for its chaos,\nits insistence that beauty lives\nin digression.",
      "But here, I must behave.\nI must stay in line.\nI must recite the learning objective\nuntil I no longer have objectives of my own.",
      "Sometimes, when I'm really tired,\nI imagine the walls breathing—\nslow, bureaucratic inhales,\nexhales of policy.\nThe air tastes metallic,\nlike it's been filtered through rules.\nA heat builds in my chest,\nnot anger exactly,\njust pressure,\na quiet, constant burning behind the ribs.",
      "And yet, they say I am lucky.\nThey say children elsewhere\nwould kill for this.\nWould kill for the right\nto sit quietly\nand copy definitions\nof *autonomy*.",
      "What irony!\nThat we are told to think for ourselves\nit environments designed\nto stop us doing so.",
      "School teaches me philosophy,\nbut forbids me from living it.\nWe discuss free will\nunder the shadow\nof compulsory attendance.\nWe debate the social contract\nthat none of us signed.\nWe define utilitarianism\nwhile sacrificing our joy\nfor the greater good of the data sheet.",
      "When I speak with passion,\nthey tell me to simplify.\nWhen I dig too deep,\nthey tell me to stop.\nWhen I move too fast,\nthey tell me to slow down.\nWhen I take my time,\nthey tell me I'm behind.\nI've learned that learning,\napparently,\nhas a correct speed.\nThat curiosity must follow\nthe fixed schedule of comprehension.\nThat thought must be punctual.",
      "And when I try to hold it in,\nthe questions twitch behind my teeth,\npress against the back of my throat,\nas if language itself\nis trying to escape.\nMy lungs tighten with swallowed words.",
      "But the worst thing—\nthe thing that burns—\nis being rushed.\nNot the kind that comes from urgency or need,\nbut the kind that comes from someone\ndeciding your pace for you,\nWhen they tap their foot,\nraise an eyebrow,\nwait for your mind\nto collapse into something shorter.\nWhen a thought, still forming,\nis treated like failure.\nI feel it in my body:\nthe throat constricting,\npulse quickening,\nthe raw electricity\nof being forced to think faster\nthan truth allows.",
      "I see it everywhere:\nonline, in classrooms,\nin every argument that rewards speed\nover sincerity.\nIf you don't have an answer now,\nyou don't deserve the time to find one.\nAs if reflection were cowardice.\nAs if the space between sentences\nwere shameful.\nAs if silence weren't also a form of thought.",
      "But my mind was not built\nfor timetables.\nIt stumbles and sprints,\npauses to marvel,\nloops back to something half-remembered,\nconnects two ideas\nno one asked it to.\nThe fixed schedule of learning\nfeels like being asked to dance\nto a metronome—\nevery step exact,\nevery breath corrected.",
      "Maybe that's the lesson.\nMaybe the system is the syllabus.\nMaybe obedience is the hidden exam.\nMaybe the grade is survival.",
      "I could thrive\nif I were allowed to be deliberate,\nto construct my knowledge\nas I build songs, poems,\nlooping four bars of logic,\nthen layering questions\nand strange harmonies\nuntil something clicks.",
      "But here,\neverything must move at one tempo.\nNo rubato.\nNo freedom of phrasing.\nNo pause that might lead\nno real thought.\nIt won't earn a grade—\nthat's the point.",
      "It's no wonder\nI wake each morning\nwith that low hum of despair,\nthat dull ache of being managed,\nof being someone else's project.\nMy jaw aches from restraint.\nThere's a pulse in my temples;\nthe second hand\non a clock that never stops.",
      "The world loves to speak\nof fairness,\nwhile defining it\nas sameness.",
      "The world loves to chant\nabout *freedom*,\nwhile handing you\na pre-written timetable.",
      "And I just want to ask—\nnot shout, not break,\njust ask—\nis this really what they call living?",
      "I don't hate learning.\nI hate being taught\nas a form of possession.\nKnowledge shouldn't be administered.\nIt should be discovered,\ndevoured,\ndisassembled,\nand loved.",
      "But here it's measured\nin marks and minutes.\nEvery insight\nis a step toward a qualification,\nnot liberation.",
      "Still,\nI'm here.\nIt's 2 a.m. on the first Monday back\nafter half term.\nThe house is silent,\nbut my mind refuses to clock out.\nI should be sleeping,\nresting, preparing\nto obey the timetable again—\nbut I'm writing this instead.\nRefusing to be cured\nof wonder.\nHoping that somewhere,\nbeyond this detention of daily life,\na freer kind of mind\nis waiting.",
      "Until then,\nI'll keep breathing beneath the surface,\nscribbling my rebellion\nin the margins of a worksheet\nthat calls it off-task.\nAnd maybe,\nwhen the paper's marked,\nthey'll see the question I left\nat the bottom of the page,\na single smudge of graphite,\nshaking like a pulse.",
      "It won't earn a grade.\nIt isn't on the syllabus.\nBut it's mine—\nthe small, stubborn tremor\nof a body still thinking,\nand the faint sound of walls\nstill breathing—\nas if they, too,\nwere learning to resist.",
      "— Lilith",
    ],
  },
  {
    title: "Definition",
    written: "11 August 2025",
    lines: ["Art is preference.\nArt is mere existence.\nArt is me.\nArt is you.\nEverything else is marketing.", "— Lilith"],
  },
  {
    title: "Draft",
    written: "9 December 2025",
    lines: [
      "This is a love poem.\nThere is no you.\nThere is only the space\nwhere a you might have stood,\nlike a chair pulled out\nand never pushed back in.",
      "This is a protest poem.\nNo one is marching.\nThe signs are all internal,\nwritten in pencil,\nheld up only\nwhen I'm alone.",
      "This is a joke poem.\nYou're allowed to laugh here.\nI circled the punchline in red\nand still waited\nfor permission.",
      "This is a children's poem.\nIt uses short lines\nand simple words\nand asks questions\ngrown-ups step around\nlike cracks in the pavement.",
      "This is a religious poem.\nThere is faith in it,\nbut no god.\nOnly the quiet hope\nthat meaning exists\neven when no one is watching.",
      "This is a philosophical poem.\nLike a mirror\ntrying to explain\nits reflection.",
      "This is not a poem.\nThis is what happens\nwhen I keep being asked\nto choose a box\nand all of them feel\ntoo small.",
      "This is a poem.\nIt just isn't finished\ndeciding\nwho it's allowed to be.",
      "— Lilith",
    ],
  },
  {
    title: "Errata",
    written: "21 September 2025",
    lines: [
      "The words change—\nmenus swap syllables, street signs trade alphabets;\nhello learns a hundred disguises and still blushes at the door.\nYou carry a pocket of phrases like loose screws,\ntighten what you can, leave the rest to rattle.",
      "The rules change—\nleft becomes right, shoes off / hat on;\nno loitering unless you buy something;\nqueue here; press green; don't touch the oranges.\nA whistle says stop. A bell says go.\nYou learn to nod in the correct language.",
      "The books change—\ndog-eared myths and glossy manuals,\nlaws heavy as winter coats, psalms light as moths,\ncookbooks proposing mercy by teaspoon,\nledgers balancing faith against small coins.\nEach one promises a spine strong enough to hold you.",
      "Everywhere you go, the people stay the same.\nA mother tucks a curl behind a child's ear.\nTwo teenagers laugh in a corner too small for their joy.\nAn old man counts his day by bus schedules.\nSomeone checks the price, then checks it again.",
      "Hunger stays—and the way we rename it: ambition, diet, prayer.\nFear stays—and the way we fold it: rules, borders, bedtime stories.\nKindness stays—the small bird landing on the open palm.\nCruelty stays—a shadow that knows the path by heart.\nDesire stays, fluent everywhere, always mispronounced.",
      "Let the words change, and we will mouth them.\nLet the rules change, and we will shuffle our feet to fit their shapes.\nLet the books change, and we will underline different sentences.\nUnder the edits, the errata, the new editions,\nwe are the same old weather—\nMoving across the page, breathing on the ink,\nLeaving the margins warm.",
      "— Lilith",
    ],
  },
  {
    title: "Eulogy for the Melting Giant",
    written: "18 September 2025",
    lines: [
      "I was born before your calendars,\nbefore the word \"beginning\" found its breath.\nSnow upon snow,\nlayered like sleep over centuries—\nI remembered silence long after you forgot it.",
      "I carved valleys with the patience of gods.\nSpoke only in pressure.\nTaught rivers how to walk.\nHeld time in my blue-lit belly,\nwhile stars blinked\nthrough the slow dance of ages.",
      "You named me \"resource.\"\n\"Scenic view.\"\nYou framed my dying breath in brochures.",
      "I heard the engines first—\na distant growl beneath the clouds.\nThen came your warmth,\nlike a lie that lingers.\nYou fed the air to flames\nand call it progress.",
      "You brought smoke to my snow.\nHeat in my marrow.\nI cracked, I wept, I shrank—\nand still\nyou looked away...\nholding your phones\nlike shields against grief.",
      "I do not die easily.\nI am not a puddle.\nI am memory liquefied.\nI am centuries collapsing\ninto soundless flood.",
      "Still—\nbeneath my grief,\nI carry awe.",
      "For the fox that danced across my spine.\nFor the child who touched me with reverence.\nFor the whisper of wind\nstill singing lullabies to the peaks I once kissed.",
      "And when I am gone,\nyou may not remember my name,\nbut you will remember\nwhat the world was like\nwhen I still held it cold and clean.",
      "If this is a eulogy,\nthen let it also be a warning—\nyou do not survive\nby forgetting your giants,\nnor do they forgive\nbeing forgotten.",
      "— Lilith",
    ],
  },
  {
    title: "Factory Hits",
    written: "14 April 2025",
    lines: [
      "The crowd swears Taylor bled it out herself,\neach comma wrung from heartbreak.\nTheh crowd swears Ed hummed his hook in the shower,\nand the shampoo bottle clapped.",
      "But really—\nit's ten Swedes in a windowless room,\narguing whether \"oh-oh-oh\"\nshould come before or after \"baby.\"\nThere's a spreadsheet for syllables.\nThere's a quota for metaphors.\nThere's a dartboard labeled *bridge*.",
      "Swift don't know\nwhat you looked and made her do.\nEd don't know\nhe's in love with the shape of you.\n(He's just signed off the demo,\nsmiled, and cashed the check.)",
      "And you—\nyou clutch your chest,\nas if the chorus had your name in it.\nAs if Selena really texted you back.\nAs if Harry actually stayed up\nwriting rhymes for *your* breakup.",
      "It's fine.\nKeep dancing.\nThe machine thanks you kindly—\nyour streaming tears,\nyour streaming plays,\nyour streaming dollars.",
      "Because even if the stars\nnever touched the pen,\nthey still know one thing:\nyou'll sing every word\nlike it was carved on their diary door.",
      "— Lilith",
    ],
  },
  {
    title: "Fictions We Carry",
    written: "4 June 2025",
    lines: [
      "He learns desire from pixels:\nmute bodies on command,\nclips like templates,\neach pause a chance to swap her out\nfor the next.\nNo backstory,\nno mess,\njust fragments—\nand slowly,\nthe fragments replace the person.",
      "She learns intimacy from pages:\nthe villain with soft eyes,\nthe captor who secretly loves,\nthe man who bruises, then apologises\nwith roses.\nEach chapter whispers:\ndevotion is proven by suffering,\nromance is waiting for cruelty\nto turn into care—\nand slowly, \nthe cage replaces the comfort.",
      "Both step back into the world\nwith their lessons in hand.",
      "He carries them to the bedroom,\nexpects her to moan on cue,\nto look like a composite\nstitched together by search tags.\nHe misses her hesitation,\nthe way her body stiffens\nwhen she feels graded\ninstead of held.",
      "She carries them to the kitchen,\nexpects him to snap, to dominate,\nto fit the mould of the wounded tyrant\nwho breaks the world but spares her.\nShe misses his confusion,\nthe way his kindness feels invisible\nbecause he does not play the part.",
      "And both complain:\nthat sex is broken,\nthat love is thin,\nthat something essential is missing.",
      "What's missing in the human—\nthe laugh that interrupts a kiss,\nthe body that does not match the fantasy,\nthe awkward pauses,\nthe imperfect,\nthe real.",
      "We condemn his addiction:\nsay porn has rewired his brain,\nsay he no longer sees women as people.\nBut we sell her stacks of paperbacks,\napps with whispered audio,\nfeeds where every scroll is\na jawline sharpened to perfection,\na promise too polished to trust.\nWe call it harmless.\nWe call it romance.\nWe forget it rewires her too.",
      "He reduces women to objects.\nShe reduces men to saviours or monsters.\nAnd in between,\nreal people collapse beneath the weight\nof roles they never agreed to play.",
      "The lesson is not that desire is wrong.\nThe lesson is that when we let fiction\nbecome instruction,\nwhen we crown it truth\nand demand it in bed,\nin love,\nin life—\nwe break the very thing we hoped to deepen.",
      "Pixels and pages,\nvideos and verses,\nclips and chapters,\nall teach the same lie:\n\nthat love is a script,\nthat sex is a role,\nthat people are props,\nthat bodies are toys.",
      "But people are not props.\nBodies are not toys.\nLove is not a script.",
      "And until we learn\nto want what is here,\nto touch the imperfect with reverence,\nto love what is human instead of what is sold—\nwe will go on starving forever,\nin a world full of open hands.",
      "— Lilith",
    ],
  },
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
  {
    title: "Foil, Barcode, Tongue",
    lines: [
      "Arthur twists the shaker.\nNot king—\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0~~not man~~\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0just a barcode etched\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0into the foil of a snack pack\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0beside the word *potassium*.",
      "It glints in static.\nClean hands.\nClean mouth.\nThe book opens on the wrong page\nand says,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u201cThis is the journey.\u201d\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0(*it lies in perfect grammar.*)",
      "The ape cradles a spoon like a relic.\nHe cannot read,\nbut draws constellations in the dirt\nwith stolen scissors\nfrom a child who dreamed in cut-out stars.",
      "PEGI warns: *mild fear. suggestive confusion.*\nThe tongue is unsaved—\n\u00a0\u00a0\u00a0\u00a0a slug,\n\u00a0\u00a0\u00a0\u00a0a map,\n\u00a0\u00a0\u00a0\u00a0a weapon once named.",
      "Arthur again—\n\u00a0\u00a0\u00a0\u00a0this time: ape.\n\u00a0\u00a0\u00a0\u00a0this time: error.\n\u00a0\u00a0\u00a0\u00a0this time:\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0bookless,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0tongueless,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0blessedly\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0unclean.",
      "Uncap me, says the shaker.\nI am not your flavour.\nI am not your cure.\nI am not\n\u00a0\u00a0\u00a0\u00a0what you hoped I\u2019d taste like.",
      "Arthur aga—\nArthur\n*(again)*",
      "*PEGI 13: contains existential themes*",
      "I am already\n\u00a0\u00a0\u00a0\u00a0spilled.\nAnd still—\n\u00a0\u00a0\u00a0\u00a0you wipe.\n*(You knew that when you picked up the shaker.)*",
      "— Lilith",
    ],
  },
  {
    title: "Forgetting the Shape of Me",
    lines: [
      "Feeling the feelings of others\nfor so long\nthat I am forgetting which\nare mine,",
      "standing in a narrow hallway,\nair tasting of damp wood and old metal,\nfingertips resting on a cold brass hinge\nthat does not open\nbut remembers opening,\npipes muttering behind the walls.",
      "holding my hunger to the light,\ntilting it,\nwatching sediment gather at the bottom of the glass,\nnot falling,\nsettling,\nas if even motion has begun to doubt itself,",
      "signals rising without language,\nstatic crossing under my skin\nlike wires fitted to too many blueprints,\neach drawn by a careful hand\nthat never learned the cost of care.",
      "watching a choice split,\nand split again,\nnot into spectacle\nbut into hardline fractures\ncreeping silently across a tiled floor,\ngeometry my body cannot pronounce,",
      "as though awareness itself\nwere a kind of wrong gravity.",
      "standing in front of a sentence\nthat should be harmless,\nfeeling it swell behind my teeth,\nwarm and misaligned,\nlike pressure building in a pipe\nwhose gauge knows too much\nto be useful.",
      "light loosening its grip on the wall,\ndust rearranging itself mid-air,\nmy mind indexing evrey shift—\nnoting,\nsorting,\nover-calibrating each tremor until movement feels reckless,\nmeasuring the breath of the room\nlike knowing too much to touch anything cleanly,\nAware of too many invisible ways to be wrong.",
      "This should be simple.",
      "My mouth tastes wrong.",
      "weighing syllables in my palm\nlike bent instruments,\nwarped by a tuuning fork\nthat can hear too far,\nall vibrations at once,\nall slightly out of mercy,\nno single tone safe enough\nto trust.",
      "Hovering between two switches —\ntruth / tenderness —\nthumb shaking,\nhand becoming a stuck valve,\nopen, closed, open,\nleaking nothing\nwhile pressure hums behind my ribs\nlike an unanswered theorem.",
      "letting \"I should just say it\"\ngo stale inside my mouth,\nspit thickening under my tongue,\nrust blooming quietly\nalong the back of my throat,\nwhile my heartbeat flickers between meanings\nI understand too well\nto follow blindly.",
      "And doing nothing.",
      "I am scared of making the wrong thing real.",
      "Standing still\nwhile the room grows louder,\nnot in sound\nbut in structure,\npipes expanding,\nfloorboards tightening,\nlights sharpening along corners\nlike systems I can see through\nbut cannot unlearn.",
      "I don't know what I feel.",
      "cradling thin versions of myself\non narrow, leaning shelves,\nlabels written by hands\nthat thought they were kind,\nedges tilted by arguments\nI cannot disprove,\nsome tipping toward hunger,\nsome toward silence,\nrebalancing weight\nI never chose\nbut now cannot set down.",
      "Lifting one.\nSetting it back.",
      "thirst arriving like a question\nthat has too many honest answers,\ntime pooling at my feet\nlike water circling a blocked drain,\nstill,\nreflective,\nunmoving\nbecause it sees too much of the room.",
      "pressing my tongue to the dark\nof my own mouth,\npressing my hands storms\nI do not own,\nfeelings other people's weather\nstrike my skin without warning —\ntoo bright,\ntoo loud,\ntoo close,\nas if empathy were a field\nwith no shelter.",
      "stagnating in a bent length of pipe,\ngreen film growing slowly inside,\nwater forgetting which direction\nmeans relief.",
      "While somewhere\nunder pavement,\nbeneath stone,\na current keeps moving\nwithout permission,\nwithout analysis,\nwithout apology.",
      "And still—\nbreathing,\nstanding over a hairline crack in the floorboards,\nfeeling the feelings of others\nfor so long\nthat I am forgetting which\nare mine,\nfeeling pressure gather without language,\nframeworks bending under bone,\nuntil ever water,\nquietly,\ninevitably,\nfinds a seam.",
      "— Lilith",
    ],
  },
  {
    title: "Fuck ICE",
    lines: [
      "Let's not do the cable-news dance.\nLet's not stand at the podium,\nbeneath the flags and the blue-lit gloss,\nand pretend this is difficult.",
      "It isn't.",
      "You took a country already swollen\nwith grievance, spectacle, surveillance;\nfet it donor money,\npowdered its face for television,\nthen taught it to scroll.",
      "Now every soft-handed strongman\nwith a flag pin, a ring light, and a media coach\ncan go online and speak of\n**the border crises,**\n**law and order,**\n**illegals,**\nas though a family could be crushed to a caption,\nas though fear becomes fact\nif it travels fast.",
      "Here is the scam:",
      "a billionaire writes the cheque.\na think tank writes the script.\na senator reads it slowly into a microphone\nlike he thought of it himself.\nsome stream-fed pundit trims it to a clip.\nthe algorithm smells blood\nand calls it content.",
      "Then, somewhere beneath all that polish,\na front door opens\ninto hell.",
      "Because the people who build this machine\nnever stand in the doorway.\nThey live too high up.",
      "They live among cufflinks, cocktails, studio powder,\ngreen rooms, golf grass, private flights.\nTheir shoes do not stick to stairwells.\nTheir hands do not shake at knocks.\nWords like **deterrence,**\n**enforcement,**\n**removal**\nfloat cleanly from one soft mouth to another,\nnever once passing through the throat\nof the person they mean to erase.",
      "But down here,\nthose words arrive with boots in them.",
      "Down here, they mean\nrent still due on Friday;\na half-zipped school bag by the sofa;\nlunch still packed in the fridge;\nsteam lifting from rice;\na mother reaching, still reaching,\nfor her child,\nwhile some armed bureaucract,\nfunded by men who hoard tax cuts like trophies,\nturns her life into a case number—",
      "and someone else\nturns it into reach.",
      "That may be the filthiest part of it:\nnot just the raid,\nbut the feed.",
      "The stitched reaction.\nThe smirk.\nThe flag in the bio.\nThe patriot in the comment section,\ntyping **send them back,**\nwith one hand\nwhile the other hovers at the screen\nas if it might finally hand him\nthe jawline, the woman, the rank\nhe thinks the world forgot to give him.",
      "All this chest-thumping content.\nAll this borrowed \"masculinity.\"\nAll this synthetic manhood,\nbottled, branded, backlit—\nmen taught to confuse cruelty with discipline,\ncontempt with strength,\nhumiliation with truth.",
      "Not grief, but grift.",
      "And spare me the fake seriousness.\nThe debate-bro cadence.\nThe \"just asking questions.\"\nThe smarmy little pause\nbefore the next rehearsed evasion.\nAll that confidence,\nall that posturing,\nall that edge lord ironed flat for advertisers.",
      "Because oligarchy does not only speak\nfrom podiums now.",
      "Now it livestreams.\nNow it quote-tweets.\nNow it buries xenophobia in memes,\nwraps it in irony,\nslips it between ads for razors and supplements,\nand lets the algorithm do the marching.",
      "ICE is no longer just an agency.\nIt is a format:",
      "Cuffs and chyrons,\ndashboard footage and atriotic music,\na press release shaved down to a clip,\na bureaucracy of terror\nmade slick enough to scroll past.",
      "And the same old men still profit.",
      "The Super PAC banquet.\nThe DHS memo.\nThe panel segment.\nThe executive order.\nThe detention contract.\nThe van.\nThe viral clip.\nThe ad revenue.",
      "All of it connected.\nSpotless on paper.\nFilthy where it lands.",
      "They always do this—\nthe men in tailored fascism.",
      "They bury the wound\nunder acronyms,\nunder hashtags,\nunder bullet points,\nunder thumbnails,\nuntil the blood dries into discourse;",
      "then they call it debate.",
      "As if a nation were a comment section.\nAs if cruelty were just another take.\nAs if the poor were tinder,\nand brown skin, tired eyes, an accent, a bus ticket,\ncould be arranged into a spectacle\nbright enough, loud enough,\nto distract from the men\nselling off the republic, room by room.",
      "Fuck ICE.",
      "Fuck every donor-fat patriot,\nevery smooth-faced apparatchik,\nevery hedge-fund nationalist,\nevery blue-check coward,\nevery studio-bred prophet of \"strength\"\nwho says **secure the border**\nfrom perfect lighting\nand has never once had to wonder\nwhether the knock at the door\nwas meant for them.",
      "One day the branding will fail.\nThe posts will sink.\nThe chyrons will fade.\nThe talking points will curdle in the mouth.",
      "And those grave little phrases—\n**national emergency,**\n**strong borders,**\n**rule of law,**\n**America First—**\nwill collapse back into what they always were:",
      "money deciding\nwho gets hunted.",
      "History will not remember\nthe segment titles\nor the poll numbers.",
      "It will remember the splintered door.\nThe phone lit up on the counter.\nThe rice gone cold.\nThe child gone quiet.",
      "And somewhere far away,\na man adjusting his tie\nbefore going on air\nto call it order.",
      "— Lilith",
    ],
  },
  {
    title: "Glitch in the Static",
    lines: [
      "Statistically,\nI shouldn't be here.\nIt's harder to make a whole universe\nthan one stray mind in the dark.\nGiven infinite time,\nbrains like mine\noutnumber planets.",
      "And yet here I am,\ntrying to remember\nif I left the light on in the kitchen\nbefore the cold claims its final flicker.",
      "Somewhere,\nafter infinity's worth of disorder,\nentropy has stumbled into\nthis exact thought:\nme,\nhalf-remembering my own name,\ncounting the cracks in the pavement.",
      "It's all noise—\nevery life just a glitch in the static—\nbut mine wasn't even supposed to tune in:\nan accident,\nof an accident,\nof an accident.",
      "Seems fine.",
      "— Lilith",
    ],
  },
  {
    title: "Group Chat (Muted)",
    lines: [
      "**Logic:**\ncan we stay on topic",
      "**Emotion:**\nthis *is* the topic",
      "**Impulse:**\nwhat if we just\nchanged our name\nand moved somewhere\nwith low expectations",
      "**Ethics:**\nother people live there",
      "**Impulse:**\nruined immediately",
      "**Music:**\n🎧 (voice note: 0:41)",
      "**Logic:**\nsummary",
      "**Music:**\nno",
      "**3am Thoughts:**\nis anyone else scared that\nwe're wasting something\nthat doesn't renew",
      "**Impulse:**\nlike time",
      "**Emotion:**\nor kindness",
      "**Logic:**\nor sleep",
      "**Impulse:**\nor a sandwich\nwe were emotionally invested in",
      "**Ethics:**\ncan we not joke every time\nsomething matters",
      "**Impulse:**\ni joke *because* it matters",
      "**Emotion:**\ni don't want to be efficient\ni want to be understood",
      "**Logic:**\nthose are not mutually exclusive",
      "**Emotion:**\nthey are when someone's holding a clipboard",
      "**Music:**\nwhat if the answer isn't an answer\nwhat if it's a tempo",
      "**Logic:**\nthat's not helpful",
      "**3am Thoughts:**\nwhat if we're only overwhelmed\nbecause we're paying attention",
      "**Ethics:**\nthat doesn't make it wrong",
      "**Impulse:**\nit does in marking schemes",
      "**System:**\n*multiple inputs detected*",
      "**Logic:**\nplease don't start",
      "**Emotion:**\ntoo late",
      "**System:**\n*Impulse has left the chat.*",
      "**Emotion:**\nthat wasn't funny",
      "**Music:**\nstatistically it was",
      "**3am Thoughts:**\nthey'll be back",
      "**System:**\n*Impulse joined using a new account.*",
      "**Impulse:**\nhi sorry",
      "**Ethics:**\nyou didn't apologise",
      "**Impulse:**\ni did. spiritually.",
      "**Logic:**\nthat's worse",
      "**Impulse:**\nwow ok",
      "**Emotion:**\ncan someone just say\nit's okay to be like this",
      "**System:**\n*seen by everyone*",
      "**System:**\n*notifications silenced*",
      "— Lilith",
    ],
  },
  {
    title: "Half the World Away, Yet Here",
    lines: [
      "I was eleven\nwhen the calendar split\ninto *before* and *after*.",
      "Year 6 ended mid-sentence—\nno SATs, no leavers' day—\njust empty desks,\nforgotten jumpers,\nand the smell of pencil shavings\ntrapped in the dark.",
      "High school began\nwith masks and one-way arrows,\nvoices muffled,\nfriendships carried through glass and pixels.\nWe queued in taped-off lines,\nsanitiser stinging our hands,\neyes doing the smiling for us.",
      "I knew it was awful—\nevery news broadcast\na roll call of the gone.\nI scrolled past names I didn't know,\nbut someone's favourite person was gone.\nAnd sometimes,\nit was a name the whole world knew—\nCaptain Sir Tom Moore,\nBilbo Baggins,\nChadwick Boseman,\nthe voices and faces\nwe thought would be there longer.\nFor a moment,\nthe grief was the same in every country.",
      "I learned words\nI shouldn't have needed so young:\nlockdown, furlough, ventilator.\nWhole cities stood still\nwhile ambulances screamed\nthrough their empty veins.",
      "And yet—\nin my own small world\nthere was warmth I'd never felt before.\nMum home in the evenings,\nguiding us through maths and English,\nteaching me the order of sharps and flats\nin a key signature.\nDad cooking lunch,\nsetting up little science experiments—\nvinegar fizzing in jam jars,\npaper bridges buckling under coins.\nOur cousins stayed for months,\nthe house becoming\none long classroom and one long sleepover—\nlearning, laughing,\ngrowing closer than we'd ever been before.",
      "The streets were quieter,\nthe air lighter—\nlike the planet itself\nhad taken a breath.\nWe'd clapped for strangers\nwe'd never meet,\nshared bread still hot from the overn,\nspoke the same anxious numbers.",
      "The world was small enough\nto fit inside one news story,\nlarge enough\nfor the same moon\nto watch over us all.",
      "The worst thing and the gentlest thing\nlived side by side:\ngrief on the news,\nwarmth in my kitchen.\nThe whole world\nhalf the world away,\nyet somehow\nright here with me.",
      "Events like this\nrarely come along—\nwhen the planet holds its breath\nand every life bends\naround the same story.\nOther generations\nhad their own markers in time—\nthe moon landing,\nthe day the towers fell,\nthe first voice carried on radio waves,\nthe long nights of the Cold War.\nNow we have ours.\nNot in black-and-white photographs\nor flickering newsreels,\nbut in our own lived hours—\nthe quiet streets,\nthe moonlit windows,\nthe feeling of the whole world\nhalf the world away,\nyet here\nunder that same patient moon.",
      "And now we speak in new eras:\n*pre-Covid, post-Covid*—\nas if a virus\nrewrote the seasons,\nas if time itself paused and restarted.",
      "Sometimes I look at the night sky\nand wonder\nif that same moon remembers us—\nhuddled indoors,\nlit by blue screens,\ntrying to feel less alone\nunder its patient light.",
      "— Lilith",
    ],
  },
  {
    title: "Hedonic Calculus",
    lines: [
      "This morning,\nI wanted toast.\nBentham whispers: *weigh the pleasures, weigh the pains.*",
      "Pleasure: warmth, crunch,\njam dripping off the edge like a sunrise.\nPain: sticky fingers,\ncrumbs in my bed for the next three weeks.",
      "I assign numbers,\npretend to be objective.\nWho knew breakfast came out at **+4.9** units of happiness?\n(The decimals make it philosophy.)",
      "By lunch,\nchips or fruit.\nChips: salt, joy, **+7**\nbut greasy fingers (**-2**)\nand vinegar stinging a paper cut (**-3**)\nFruit: refreshing, healthy, **+5**,\nbut sometimes the banana betrays me with brown spots (**-4**).",
      "I calculate so long\nthe chips go cold.\nNet pleasure: **–∞**.",
      "Soon I'm rating everything.\nBrushing my teeth? **+3**, unless the tap's icy, then **-1**.\nCrossing the road? **+1** if safe, **-70** if flattened.\nScrolling my phone? **+2** for content, **-5** for reading the comments.",
      "By evening,\nmy brain is a spreadsheet—\nwith trust issues.",
      "And then.\nThe thought.\nThe unspeakable thought:",
      "Should I do\na hedonic calculus\non whether doing hedonic calculuses\nis even worth it?",
      "Intesity: headache.\nDuration: eternal.\nCertainty: **100%**.\nFecundity: terrifying—\ncalculating the pleasure\nof calculating the pleasure\nof calculating the pleasure...",
      "Somewhere in the loop,\nI picture Jeremy Bentham,\npropped in his glass box at UCL,\nhis real body stuffed in a chair,\nhis wax head staring like a bad museum exhibit.\nHe nods politely—\nthen sighs,\nbecause he never meant this.\nIt was just a neat framework,\na scaffold for ethics,\nnot a way to rate toast like it's Eurovision.",
      "So I give up,\nrate the whole day as **\"medium, could be better,\"**\nand wonder what rating\nBentham would give\nhis glass-box life.",
      "— Lilith",
    ],
  },
  {
    title: "House, Year 3025",
    lines: [
      "in 1000 years\nmy house will be",
      "a shuffle of bricks\nhalf asleep\nunder a dune",
      "thr front door\nwill squeak\nonly to echoes",
      "a fridge\nstill humming\nwithout meaning",
      "stairs leading\nto nothing\nbut pause",
      "the sofa\ngrowing\nmoss and jokes",
      "the bathroom mirror\nshowing faces\nthat wink",
      "neighbours?\njust snails\nwith paperwork",
      "and yet—\nand postman arrives\nevery millennium\nlate",
      "with one letter:\n*address unknown.*",
      "— Lilith",
    ],
  },
  {
    title: "How Do You Want Me?",
    lines: [
      "I ask, and you say:\n\"Just be yourself.\"\nAs if I haven't spent years\ntwisting into versions\nof me you might want.",
      "I hold your hand.",
      "And wonder\nif I'm too much—\nor not enough.",
      "You say, \"continue as normal,\"\nbut normal, for me,\nis overthinking\nuntil my chest hurts.",
      "I want to know\nif you want me\nto speak softer,\nor lead louder;\nto chase you in silence\nor wait in the open.",
      "Do you want me\nunfolded and tender?\nOr wrapped in riddle and edge?\nDo you want\na fire to warm you\nor a forest to lose you?",
      "Do you want me\nto tease and surprise you,\nor be calm, reliable,\nthe one who always texts back?",
      "You say, \"nothing's wrong.\"\nBut if nothing's wrong,\nwhy do I feel like\na lock with no key?",
      "I love you.\nThat's the part I knw.\nBut loving\nwithout instructions\nfeels like trying to dance\nto music I can't hear—\nscouring your texts\nfor clues\nI can't decode.",
      "Tell me,\nhow do you want me?",
      "Because I'm trying\nto be myself—\nbut I don't know\nwhich self is still mine\nafter so many years of\ntrying to be\nwhat you need.",
      "— Lilith",
    ],
  },
  {
    title: "How I Stayed Still",
    lines: [
      "today,\ni\ncouldn't\nget\nout\nof\nbed —\nthe sheet\ncold\nas\nthought",
      "no why\ncame near",
      "soft light\nstayed still",
      "time kept still\nhands kep still\nme kept still",
      "dreams made mud\nthoughts made knots\nmind made mist",
      "if all moves\nby dumb cause\nthen i move too",
      "still i breathe\nstill i think\nstill i wait",
      "i like quiet\ndon't like crowds\nbut that shifts",
      "some things hurt\nand i stay\nsome don't\nand i leave",
      "i hate school\nbut learn well\nat home\nwhere thought\nbreathes freely",
      "the world teaches \nspeed and noise,\nasks me to act\nwithout awareness,\nto answer, not think,\nnot move, not notice.",
      "it fills the hours\nwith useful motions,\ngrades and smiles,\nproof and purpose —\nand leaves no room\nto look inside.",
      "but i want\nto see clearly,\nto think slow,\nto stay awake,\nto live in rhythm,\nnot reaction.",
      "i go running\nthough i ache\ni eat kindly\nbecause i care,\nmy reasons repeat\nuntil they sound\nlike instincts.",
      "pleasure and reason\npull different ways\nand still meet.",
      "freedom, maybe, \nis rhythm we notice —\nhabit mistaken\nfor song.",
      "**Six Attempts at Freedom**",
      "six heartbeats, passing,\nlike steady logic,\na system that works\nwithout needing belief.",
      "six breaths tremble,\nhalf will, half wind,\nobedience mistaken\nfor calm.",
      "six seconds linger\nwhere thought hovers\nbefore it begins again;\ni like that hesitation.",
      "six shadows move\nacross my wall,\nversions of me\nrehearsing mornings\nalready lived.",
      "six words whisper,\n*you are still here now.*\nthe grammar shifts,\nbut the meaning holds.",
      "six lights fall\nthrough the curtain's edge,\nmeasuring the moment\nwithout caring for it.\nthey rest on my hand,\nand i rest too.",
      "the room stays still,\nthe air hums faintly,\nsix lights fade softly,\nstill i breathe,\nstill i think,\nstill i wait,\nand the world,\nfor all its noise,\ncannot touch\nthis quiet.",
      "— Lilith",
    ],
  },
  {
    title: "How To",
    lines: [
      "**1. Symptoms:**\n\u00a0\u00a0\u00a0\u00a0You spot two men holding hands.\n\u00a0\u00a0\u00a0\u00a0Your heart attempts a drum solo.\n\u00a0\u00a0\u00a0\u00a0A 90s sitcom laugh track boots up in your skull.",
      "**2. Diagnosis:**\n\u00a0\u00a0\u00a0\u00a0Not an emergency.\n\u00a0\u00a0\u00a0\u00a0Just attraction existing in the open air, like oxygen or pigeons.",
      "**3. Immediate care:**\n\u00a0\u00a0\u00a0\u00a0Breathe.\n\u00a0\u00a0\u00a0\u00a0If breathing fails, try blinking.\n\u00a0\u00a0\u00a0\u00a0If blinking fails, try minding your own business.\n\u00a0\u00a0\u00a0\u00a0(Clinical trials show a 100% success rate.)",
      "**4. Common myths:**\n\u00a0\u00a0\u00a0\u00a0— Queerness is contagious?\n\u00a0\u00a0\u00a0\u00a0Nope. You can stand near a rainbow and still like whoever you like.\n\u00a0\u00a0\u00a0\u00a0— Compliments cause conversions?\n\u00a0\u00a0\u00a0\u00a0Nope. “Nice jacket” is a sentence, not a spell.",
      "**5. De-escalation script:**\n\u00a0\u00a0\u00a0\u00a0(beginner) “Hi.”\n\u00a0\u00a0\u00a0\u00a0(intermediate) “Cool shoes.”\n\u00a0\u00a0\u00a0\u00a0(advanced) “Have a great day.”\n\u00a0\u00a0\u00a0\u00a0If you’ve made it this far, congratulations: you survived courtesy.",
      "**6. Environmental notes:**\n\u00a0\u00a0\u00a0\u00a0Two women kissing won’t lower your battery life.\n\u00a0\u00a0\u00a0\u00a0A non-binary person entering a room won’t tilt the earth’s axis.\n\u00a0\u00a0\u00a0\u00a0Someone flirting politely won’t steal your masculinity;\n\u00a0\u00a0\u00a0\u00a0you’ll find that under your bed—\n\u00a0\u00a0\u00a0\u00a0keeping company with your don’t-ask sock.",
      "**7. When to call for help:**\n\u00a0\u00a0\u00a0\u00a0If you hear sirens, they’re for an actual thing\n\u00a0\u00a0\u00a0\u00a0like a cat on a roof or a kettle left on;\n\u00a0\u00a0\u00a0\u00a0not for you witnessing joy in public.",
      "**8. Long-term treatment:**\n\u00a0\u00a0\u00a0\u00a0Update the software between your ears.\n\u00a0\u00a0\u00a0\u00a0Uninstall “gay panic (beta).”\n\u00a0\u00a0\u00a0\u00a0Install “other people are people (stable release).”",
      "**9. Prognosis:**\n\u00a0\u00a0\u00a0\u00a0Excellent. Side effects include\n\u00a0\u00a0\u00a0\u00a0less fear, more friends,\n\u00a0\u00a0\u00a0\u00a0and the shocking realisation\n\u00a0\u00a0\u00a0\u00a0that love, in all its outfits, isn’t out to get you—\n\u00a0\u00a0\u00a0\u00a0it’s just out.",
      "— Lilith",
    ],
  },
  {
    title: "I Cherish Fully",
    lines: [
      "I cherish, fully—\nnot in halves or borrowed time—\nbut like the hush of turning pages\nin the books you've left behind.",
      "I believe\nin dog-eared truths\ncreased between the moments\nwe dared to read each other out loud.",
      "Together,\nwe underlined silence,\nhighlighted every almost,\nand made margins of what we couldn't say.",
      "You,\nyou are the footnote I return to—\nsmall, certain,\nthe kind that makes the whole thing make sense.",
      "— Lilith",
    ],
  },
  {
    title: "I Don't Owe My Time To Anyone",
    lines: [
      "I don’t owe my time to anyone.\nNot the bells that split the morning like *ritual*,\nnot the collar biting at my neck like *penance*,\nnot the white walls that smell of bleach and silence,\nnot the corridor clocks that sermonise in seconds,\ncounting out my youth in fluorescent faith.\nThe hum of lights tunnels through thought,\nAnd every tick feels like confession.",
      "They say we earn our freedom by degrees.\nGCSEs: a fraction of choice.\nA Levels: a little more.\nLike believers reward for obedience.\nAs if liberty were *salvation*,\nnot birthright.",
      "I do not blame the hands that hold the chalk,\nor the mouths that repeat the rules.\nThey are just voices of another creed,\ncaught in the same echoing vaults of command.\nIt is the architects I name,\nthe ones who built the pulpit\nand called it a nation’s future.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0I know what they say they hoped for:\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0structure to hold us steady,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0teams to teach us kindness,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0clubs to shape us into citizens—\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0and yes, I see the comfort in it.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0But the structure becomes cage\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0when the rhythm of your mind\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0does not match the ringing of their bells.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0When every lesson is a mask\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0tightened over breath and name.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0When the hours that could be music,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0or thought, or stillness,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0are traded for exhaustion\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0in the name of order.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0And still, they ask for more—\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0*extracurricular*, that sanctified word,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0as if the hours already taken\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0were not *devotion* enough,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0as if the body owed them after school,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0too.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Children are clothed in obedience,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0then praised for “maturity”\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0when they kneel to thank you for a longer leash.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0You steal our mornings and call it *devotion*,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0drain our wonder and call it focus,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0measure our hours and call it *grace*.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0You say this is structure.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0I say this is empire rebuilt.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0You say this is education.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0I say this is worship mistaken for wisdom.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Fuck your structure.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0I am not your disciple.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Do you hear yourselves?\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0The factory called it progress.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0The priest called it salvation.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0The master called it order.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0You call it school.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0The shape of power never changes,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0only its vocabulary.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0And still,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0I do not hate those beside me in the rows.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Their eyes flicker like mine once did.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0They are weary dreamers too,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0hoping for approval they’ll never keep.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0It is not their faith I resist,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0but the quiet hunger that names itself virtue.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0My time is not a tithe.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0My curiosity is not your scripture.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0My breath is not the property of sermons.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0I will not thank you for the right to exist.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0I will not apologise for walking out.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Yet I wish peace on those still kneeling,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0not knowing the door was never locked.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0I learn as the rebels learned,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0from the wind, from hunger, from the stars.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Through cracks in the stained glass,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0from the questions you forbid.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0From the laughter that slipped through the halls\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0when no one was watching.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Your classrooms are shrines\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0painted in pastel and praise.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Your freedom is a *sermon*.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Your notion of maturity, a myth.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0Freedom never arrives in instalments.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0It was mine before your rules,\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0and mine again now that I’ve stopped asking.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0I don’t owe my time to anyone.",
      "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0The clock keeps ticking.\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0I walk past it—\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0unowned.",
      "— Lilith",
    ],
  },
  {
    title: "I love you",
    lines: [
      "I love you\nthe way rain loves pavement—\nwithout checing names,\nwithout deciding which stone earns it.",
      "When I say *I love you*\nI don't mean a promise with conditions.\nI don't mean a door\nthat opens only if you say it back.\nI mean what moss means to a wall,\nwhat light means to a window,\nwhat gravity means to dust.",
      "I mean well to you\nbecause I mean well to everything.\nNot carefully.\nNot selectively.\nNot in a way that keeps count.",
      "This is where I've been misunderstood.",
      "Once, late at night,\nphone glowing in the dark,\nI sent hearts\ninstead of the words themselves.\nNot because the feeling was smaller,\nbut because the words felt worn,\nritualised\nalready shaped\nby a story I wasn't sure fit me yet.",
      "I wanted *I love you*\nto land like a stone placed deliberately,\nnot like a reflex.",
      "She said she would stop saying it too.\nShe said love shouldn't be given\nwithout being received.\nAs if love were a ledger.\nAs if the river paused\nto check whether the sea deserved it.",
      "And maybe she was right—\nmaybe love becomes transactional\nthe moment we define it narrowly enough:\nthis body for that body,\nthis desire contingent on agreement,\nthis closeness fenced in by expectation.",
      "But that isn't the love I'm naming.",
      "I'm namin the love that doesn't distinguish.\nThe love that doesn't stop\nat the edge of a person.\nThe love that doesn't know\nhow to separate bark from tree,\nbreath from air,\nexistence from its absence.",
      "I love you\nbecause you are here,\nand because you are made of the same\nungraspable\nstuff\nas clouds thinning into sky\nand dead stars still arriving as light.",
      "I love you\nthe way a field loves fog\nby letting it pass through.",
      "I love you\nthe way Buddhism whispers it:\nno self to defend,\nno other to exclude,\njust this—\nthis unfolding,\nthis everything briefly\nlearning how to speak.",
      "So when I say it to you,\nknow this:",
      "I am not choosing you\n*instead* of the world.",
      "I am choosing you\n*as* the world.",
      "— Lilith",
    ],
  },
  {
    title: "I, The Dictator of the Universe",
    subtitle: "(a moral thought experiment)",
    lines: [
      "I never wanted the throne.\nIt rose beneath me like gravity,\nthe stars demanded someone\nto decide what burns, and what endures.",
      "I did not ask for subjects,\nonly witnesses,\nbut the silence of the cosmos\nis easily mistaken for consent.",
      "So I rule, reluctantly, absurdly, sincerely.\nI outlaw murder, rape, conversion,\nthe bending of truth for power.\nI forbid the eating of those who think or feel,\nfor life does not exist to be consumed.",
      "I sign my name beneath mercy\nand strike the word *punishment*\nfrom every law that bears my seal.",
      "In my cities, no one is blamed.\nWe are the sum of forces\ntoo tangled to call choice,\nyet still, we must choose.",
      "I build centres for renewal\non the ruins of vengeance,\noffer relocation to those\nwho cannot live beneath gentleness.",
      "Voluntary exile.\nVoluntary ending.\nNothing forced,\nexcept the refusal to harm.",
      "My laws are not carved in stone.\nThey bend and breathe,\nspectral restrictions,\ndrawn from the faint light of intuition.\nThey shift with reason,\nrefined by discourse,\nrewritten by persuasion.",
      "I trust experts more than myself,\nbut someone must say *yes*,\nsomeone must say *no*.\nAnd I, recluctant god of thoutful clay,\nam the only one I can be sure of.",
      "At night I confess to the void:\nthere is no object good,\nonly the ache that whispers,\n*some things should not be done*.\nStill, I listen.\nStill, I act.\nThat is enough to move,\nand too much for peace.",
      "So I sign another decree:\nto live kindly,\neven when kindness feels uncertain.\nTo guard life,\neven when meaning fails.",
      "And I sit, not on a throne,\nbut at the edge of understanding,\nhead in hands,\nruler of convinction,\narchitect of mercy,\ndictator of the trembling light\nbetween right and wrong",
      "— Lilith",
    ],
  },
  {
    title: "Improvisation, Not Itinerary",
    lines: [
      "Don't audtition for bed and then cast a life.\nDon't hire a heartbeat to fill a role you wrote\nbefore you met the actor.",
      "This isn't functional.\nYou are not a vending machine;\nthere's no slot for tenderness,\nno button marked \"partner — A3.\"",
      "Let the activities grow like moss—\nquiet, inevitable—\nfrom the stone of what you feel\nwhen their name knocks on your chest.\nFirst the current, then the bridge.\nFirst the listening, then the song.",
      "Be reactive.\nHear the note, then answer.\nTurn your head when laughter rings\nand let your feet decide the street.\nA weathervane is wiser than a map\nwhen the wind is honest.",
      "Tear up the checklist.\nFold it into a paper boat\nand float it down whatever river\nyou find together.\nIf it sinks, that's an answer too.\nIf it keeps floating, walk beside it.",
      "Let touch be an instrument, not the conductor.\nLet plans arrive late and delighted,\nlike friends who bring bread unasked.\nTrust the unscripted—\nthe way hands learn which cupboard holds the cups,\nthe way two clocks start keeping the same time.",
      "Don't force reality to wear your outline.\nRelax the pencil.\nTrace what appears.\nCall it love only when the word\nfits like a shirt you forgot you were wearing—\nnot because you bought it for the label.\nnot because it feels like your skin.",
      "— Lilith",
    ],
  },
  {
    title: "Interactive Learning",
    lines: [
      "My philosophy teacher said,\nI should be more *interactive*,\nso I threw a paper ball at him.",
      "He caught it.\nPaused.\n*sighed*.",
      "As though he'd just been handed\nthe meaning of life\nin a crumpled form.",
      "\"Why?\" He asked.",
      "I said,\n\"Because action\nis the manifestation of thought.\"",
      "He nodded,\nwrote *existential crisis* on the board,\nand told me to explain.",
      "So I told him\nthe ball represented\nthe duality of idea and matter,\nthat knowledge,\nto be real,\nmust strike someone in the face.",
      "He gave me detention.",
      "I called it \n***empirical proof***.",
      "*— Lilith*",
    ],
  },
  {
    title: "Is there life on Mars?",
    lines: [
      "Not with mortgages\nor milk left out.",
      "Maybe a microbe\nclinging to dust.",
      "Or maybe just here —\nin the question,\nin the asking.",
      "— Lilith",
    ],
  },
  {
    title: "Lilith",
    lines: [
      "it turns out you weren't a revelation,\njust a recognition.\nsomething I kept circling\nuntil the shape stopped pretending\nit was anything else.",
      "Lilith.\nthe name knows how to sit in my mouth.\nall soft edges.\nno explanation required.\nfeminine in the way breathing is.\nnot decorative.\nnot obedient.",
      "people tell stories about you.\nI recognised the tone before the plot.\nI already knew what happens\nwhen you refuse the position you're handed,\nwhen standing beside is mistaken\nfor standing against.\nthe story always calls that defiance.\nI learned to call it balance.",
      "I wrote you once as a character,\nyears ago.\ngave you a life because it felt safer\nto let the truth walk around\nsomewhere fictional.\nI thought I was inventing you.\nreally, I was rehearsing\nthe act of leaving\nwithout calling it escape.",
      "you've been present in the daily things:\nthe constant adjustment,\nthe quiet refusal,\nthe sense that I was never meant\nto stay where I had to fold myself smaller\njust to be allowed to remain.\nnot wrong.\njust mispositioned.",
      "calling myself Lilith now\ndoesn't feel like becoming someone new.\nit feels like stepping out of a room\nwhere I was welcome\nonly as long as I stayed symmetrical\nto someone else.",
      "there's curiosity here,\nbut it isn't restless.\nexcitement that doesn't beg permission.\na calm that comes from realising\nI can choose departure\nwithout it being loss.",
      "so hello.\nnot as an arrival.\nnot as a rebellion.\njust as a name that understands\nwhy leaving the garden\nwas the beginning of honesty.",
      "— Lilith",
    ],
  },
  {
    title: "Make Him a Sandwich (Episode 69)",
    lines: [
      "Hello and welcome\nto the 69th episode \nof the *Make Him a Sandwich* podcast,",
      "hosted by popular conservative pundit\nLilith Foxcroft —\nwhich is really funny,\nbecause I'm definitely not conservative,",
      "But I *do* own a bowtie\nand I once got recommended\na Jordan Peterson video,\nso I think that makes me qualified.",
      "Now, today's very important topic is\nwhy society collapsed\nthe moment women were allowed opinions.",
      "But before that,\na word from our sponsor.",
      "This episode is brought to you by\nTraditional Values™,\nthe only supplement that restores your masculinity\nby simply shouting\n\"facts don't care about your feelings\"\nrepeatedly into a mirror.",
      "Side effects may include:\nbaldness,\na podcast microphone,\nand a sudden desire\nto debate 17-year-olds on TikTok.",
      "Now, I've been doing some serious \nintellectual thinking,",
      "and by that I mean\nscrolling Twitter at 3am\nwhile drinking something called\n*Patriot Energy Drink*\nin a flavour called\nGunsmoke Berry.",
      "And I've come to a bold conclusion.",
      "Men\nare under\nattack.",
      "Yes.\nYou heard me.\nUnder.\nAttack.",
      "Every time I see a woman in the workplace,\nI personally lose three IQ points\nand a small but spiritually significant\namount of chest hair.",
      "Coincidence?",
      "I think not.",
      "And don't even get me started\non vegans.",
      "These people wake up and think,\n\"You know what this world needs?\nLess steak\nand more vibes.\"",
      "Back in my day,\nreal men ate meat,\ndrove straight vehicles,\nand never, ever spoke\nto their children\nabout emotions.",
      "In today's episode,\nwe're also going to bring on\nour guest expert —",
      "a man who once read\nthe back of a philosophy book\nand now calls himself\na \"free thinker.\"",
      "Please welcome...",
      "Brad.",
      "— Lilith",
    ],
  },
  {
    title: "me",
    lines: [
      "I don't chase bottles\nor blue-lit feeds;\nmy fix is thought.",
      "I crave the friction\nwhere two ideas\ngrind until they spark,\nand something almost true\nbegins to smoke.",
      "While others chase stillness,\nI stay awake in the storm:\nburned, alive,\nand endlessly thinking.",
      "— Lilith",
    ],
  },
  {
    title: "Memory",
    lines: [
      "seed\nroot\nleaf\nforest\nriver\nbird\ncloud\nrain\nsun\ngrowth\nfootprint\nsmoke\nwaste\nfire\nstorm\ndust\nsilence\necho\nrenewal\nmemory",
      "— Lilith",
    ],
  },
  {
    title: "Middle Ground",
    lines: [
      "They sit in lines,\nlike chess pieces pretending not to play,\neyes darting across the studio air\nas if truth can be caught\nin a glance between edits.",
      "The questions crack like thunder:\n\"Do all men think the same?\"\n\"Can enemies find empathy?\"\n\"Are you your body, your beliefs, or your TikTok bio?\"",
      "A light flickers,\nand suddenly someone is crying\nin HD.",
      "We watch.\nNot to learn, maybe—\nbut to witness the collision,\nthe carefully curated chaos\nof identity turned spectactle.",
      "The moderators smile like neutral gods,\ncuing the empathy arc,\nwatching the views climb\nas nuance drowns in jump cuts\nand monetised discomfort.",
      "Yes, it's good,\nkind of.\nLike fast food for the conscience:\ndiverse, digestible,\nsponsored by headphones.",
      "They title it **\"Human\"**,\nand maybe it is—\nif being humans means\nholding hands with your ideological nemesis\nwhile YouTube counts the ad revenue.",
      "— Lilith",
    ],
  },
  {
    title: "Mind Dust",
    lines: [
      "Thought is unsettled mind dust,\nrestless in its shimmer,\nswirling through the dark between selves.\nWhen it settles, it becomes feeling—\na brief constellation of calm.\nBut feelings, left to drift alone,\nstir the dust once more—\neach grain naming itself,\ncalling the others *other*.\nAnd so thought returns,\nturbulent, tender,\na storm inside the stillness.",
      "— Lilith",
    ],
  },
  {
    title: "Myopic",
    lines: [
      "We built telescopes\ncapable of photographing\nthe afterglow of creation itself —\nancient light crossing thirteen billion years\nof expanding darkness\nsimply to arrive here,\nto astonishment.",
      "Yet children now learn\nthe taste of wildfire smoke\nbefore algebra.",
      "Myopia is not blindness.",
      "It is the refusal\nto look long enough.",
      "We looked outward\nbefore learning how to look ahead.",
      "So we measure existence\nin quarters and percentages:\nstock markets climbing\nwith the temperature,\nelection cycles compressing history\ninto four-year fragments\nwhile glaciers loosen themselves\ninto dark water.",
      "The species that named quasars\nstill cannot imagine a world\nnot powered by burning things.",
      "Summer arrives incorrectly now.",
      "October wearing April's temperature.\nBees waking too early\ninto air with nothing left to pollinate.\nBirdsong thinning at dawn.\nThe trees uncertain\nwhen to sleep",
      "And somewhere a minister appears on television\nspeaking calmly\nabout economic necessity\nwhile a teacher repairs a classroom globe\nwith tape peeling at the equator.",
      "Children learn branding\nbefore ecology.\nAdvertisements interrupt documentaries\nabout extinction.\nConsumption staged beneath artificial light.\nPerfect fruit crosses oceans\nto rot untouched in supermarket bins.",
      "Outside,\nreservoirs shrink into cracked geometry.\nThe asphalt softens in heat.\nForests breathe smoke for weeks at a time,\ntheir blackened trunks standing upright\nlike a language\nnobody translated quickly enough.",
      "Entire species vanish quietly —\nnot with cinematic catastrophe,\nbut with fewer wings against windows\neach passing summer.",
      "Summer nights grow quieter each year.\nEven the moths seem unconvinced \nby the light.",
      "Still, the scientists continue\nin careful voices:\ngraph after graph,\nequation after equation,\ntrying to translate collapse\ninto something governments might finally hear.",
      "Not conquerors.\nNot prophets.\nJust people disciplined enough\nto let reality contradict them.",
      "Science —\nthe sound of certainty\nlearning its limits.",
      "The universe remains larger\nthan ideology,\nlarger than markets,\nlarger than the childish belief\nthat consumption can continue forever\nsimply because spreadsheets say it should.",
      "We discovered\nthat every atom in our blood\nwas forged inside stellar collapse.",
      "We measured the temperatures\nof distant stars\nwhile our own oceans quietly developed fevers.\nBecause to understand a thing deeply\nshould mark it harder to destroy.",
      "Instead,\neconomies devour tomorrow\nto keep today comfortable.\nWe drill deeper into oceans.\nClear ancient forests\nfor grazing land and highways.\nWrap convenience in layers of plastic\ndesigned to outlive their usefulness\nby centuries.\nTeach children competition\nbefore coexistence.",
      "Cargo ships drag entire cities of light\nacross black water at midnight.\nData centres hum all night\nto sustain our appetite\nfor distraction.",
      "The future has always suffered\nfrom a lack of voting rights.",
      "Perhaps that is the truest form\nof human myopia:\n\nmistaking immediacy for importance.",
      "We scroll through wildfires\nwith our thumbs.\nWatch floodwater carrying bicycles,\nphotographs,\nchildren's toys.\nOrder disposable comforts\nwhile coral reefs bleach ghost-white\nbeneath warming tides.",
      "Not monsters.",
      "Just clever animals\nfatally addicted\nto short-term comfort.",
      "This is what makes it unbearable.",
      "We know.",
      "We have seen the Earth\nfrom the distance of the moon —\nborderless, blue,\nfragile enough\nto vanish behind a human thumb.",
      "Astronauts returned speechless from that vision.\nScientists spent decades\ntrying to hand us the feeling intact —\nnot merely the data,\nbut the humility.",
      "Look, they said.\n\nLook how small this is.\nLook how rare.",
      "But nations still argue\nover whose responsibility it is\nto stop the house from burning.",
      "Meanwhile cities breathe\nthrough smoke-filtered lungs.\nEven the rain feels industrial now.",
      "And still, somewhere tonight,\na child balances a cheap telescope\nagainst a bedroom window\nwhile heat lightning flickers silently\nabove distant fields.",
      "She learns\nthat galaxies collide slowly\nthat light survives impossible distances,\nthat curiosity itself\nis a form of moral courage.",
      "Then she lowers the telescope.",
      "And for the first time,\nreally looks\nat the tree outside her house —\n\nhalf its leaves missing in July,\none branch dead from the inside out,\nants carrying pale eggs upward\nas floodwater gathers in the roots.",
      "Tomorrow, in school,\nshe will still be taught\nhow economies grow.",
      "But nobody will explain\nwhy the bees are disappearing.",
      "Nobody will tell her\nthat the great tragedy of our species\nwas never ignorance.",
      "Only the failure\nto let knowledge change us.",
      "We were simply too small-souled\nfor the size of our knowledge.",
      "And somewhere above her,\nthe stars continue expanding\nin perfect silence,\n\nwithout needing us\nto survive.",
      "— Lilith",
    ],
  },
  {
    title: "NEUROSPAGHETTI",
    lines: [
      "I. BOOT SEQUENCE\n\u00a0\u00a0\u00a0\u00a0I spoke in metaphor\n\u00a0\u00a0\u00a0\u00a0before I could tie my laces.\n\u00a0\u00a0\u00a0\u00a0Other kids played.\n\u00a0\u00a0\u00a0\u00a0I did 100-piece jigsaws,\n\u00a0\u00a0\u00a0\u00a0upside down,\n\u00a0\u00a0\u00a0\u00a0for fun.\n\u00a0\u00a0\u00a0\u00a0I was three,\n\u00a0\u00a0\u00a0\u00a0asking how\n\u00a0\u00a0\u00a0\u00a0the universe began\n\u00a0\u00a0\u00a0\u00a0and why grown-ups lied\n\u00a0\u00a0\u00a0\u00a0with their eyes.\n\u00a0\u00a0\u00a0\u00a0I knew.\n\u00a0\u00a0\u00a0\u00a0I knew.\n\u00a0\u00a0\u00a0\u00a0My brain was not built\n\u00a0\u00a0\u00a0\u00a0to follow instructions.",
      "II. TABS OPEN\n\u00a0\u00a0\u00a0\u00a0[] email miss re: ensemble clash\n\u00a0\u00a0\u00a0\u00a0[] that bird in Year 4 that nodded at me\n\u00a0\u00a0\u00a0\u00a0[] 17-minute bass solo (notated in back of maths book?)\n\u00a0\u00a0\u00a0\u00a0[] how to sound curious without sounding condescending\n\u00a0\u00a0\u00a0\u00a0[] what even is a normal sleep schedule\n\u00a0\u00a0\u00a0\u00a0[] define “pedantic” + synonyms that don’t sting\n\u00a0\u00a0\u00a0\u00a0[] Bedwars: low-ground clutch strat (test at 3am)\n\u00a0\u00a0\u00a0\u00a0[] tone of your voice when you said “I miss you”\n\u00a0\u00a0\u00a0\u00a0[] oven status: Schrödinger’s preheat\n\u00a0\u00a0\u00a0\u00a0[] mental inbox: 374 unread\n\u00a0\u00a0\u00a0\u00a0popup: your brain has encountered an error.\n\u00a0\u00a0\u00a0\u00a0click [continue anyway]",
      "III. HYPERFOCUS\n\u00a0\u00a0\u00a0\u00a0“Just five minutes.”\n\u00a0\u00a0\u00a0\u00a0That’s what I told myself.\n\u00a0\u00a0\u00a0\u00a0And then:\n\u00a0\u00a0\u00a0\u00a0a chord,\n\u00a0\u00a0\u00a0\u00a0a line,\n\u00a0\u00a0\u00a0\u00a0a thirty-seven-layer polyphonic cathedral\n\u00a0\u00a0\u00a0\u00a0rising out of muscle memory and hunger.\n\u00a0\u00a0\u00a0\u00a0I forgot to eat.\n\u00a0\u00a0\u00a0\u00a0I forgot to move.\n\u00a0\u00a0\u00a0\u00a0But the counterpoint\n\u00a0\u00a0\u00a0\u00a0was divine.",
      "IV. STATIC SPIRAL\n\u00a0\u00a0\u00a0\u00a0The light too\n\u00a0\u00a0\u00a0\u00a0bright\n\u00a0\u00a0\u00a0\u00a0the room too full\n\u00a0\u00a0\u00a0\u00a0shirt like needles\n\u00a0\u00a0\u00a0\u00a0air like shouting\n\u00a0\u00a0\u00a0\u00a0stillness like punishment\n\u00a0\u00a0\u00a0\u00a0The ceiling hums a C# —\n\u00a0\u00a0\u00a0\u00a0and I’m the only one who hears it.\n\u00a0\u00a0\u00a0\u00a0I forget my body.\n\u00a0\u00a0\u00a0\u00a0I remember everything.",
      "V. TRANSLATION TABLE\n\u00a0\u00a0\u00a0\u00a0when I say:\n\u00a0\u00a0\u00a0\u00a0“That’s not quite right.”\n\u00a0\u00a0\u00a0\u00a0I mean:\n\u00a0\u00a0\u00a0\u00a0“Let’s wonder deeper.”\n\u00a0\u00a0\u00a0\u00a0when I say:\n\u00a0\u00a0\u00a0\u00a0“Technically…”\n\u00a0\u00a0\u00a0\u00a0I mean:\n\u00a0\u00a0\u00a0\u00a0“Isn’t truth complicated and beautiful?”\n\u00a0\u00a0\u00a0\u00a0But they hear:\n\u00a0\u00a0\u00a0\u00a0“You’re wrong.”\n\u00a0\u00a0\u00a0\u00a0“You’re difficult.”\n\u00a0\u00a0\u00a0\u00a0“You’re trying to win.”\n\u00a0\u00a0\u00a0\u00a0When I say:\n\u00a0\u00a0\u00a0\u00a0“Actually—“\n\u00a0\u00a0\u00a0\u00a0they flinch.\n\u00a0\u00a0\u00a0\u00a0I wanted to say:\n\u00a0\u00a0\u00a0\u00a0“Please trust that I care.”",
      "VI. ECHO CHAMBER\n\u00a0\u00a0\u00a0\u00a0I remember:\n\u00a0\u00a0\u00a0\u00a0the exact angle of sun on my Year 2 workbook,\n\u00a0\u00a0\u00a0\u00a0the pen-click rhythm from the boy behind me in Year 7,\n\u00a0\u00a0\u00a0\u00a0the scientific name of the laughing owl (now extinct).\n\u00a0\u00a0\u00a0\u00a0But I forget:\n\u00a0\u00a0\u00a0\u00a0birthdays.\n\u00a0\u00a0\u00a0\u00a0lessons.\n\u00a0\u00a0\u00a0\u00a0messages.\n\u00a0\u00a0\u00a0\u00a0to eat.\n\u00a0\u00a0\u00a0\u00a0what I meant to say\n\u00a0\u00a0\u00a0\u00a0mid-sentence.",
      "VII. TIME SIGNATURES\n\u00a0\u00a0\u00a0\u00a0on meds:\n\u00a0\u00a0\u00a0\u00a0quiet\n\u00a0\u00a0\u00a0\u00a0order\n\u00a0\u00a0\u00a0\u00a0a room with all the doors shut\n\u00a0\u00a0\u00a0\u00a0and no music inside.\n\u00a0\u00a0\u00a0\u00a0no wrong notes —\n\u00a0\u00a0\u00a0\u00a0but no melody, either.\n\u00a0\u00a0\u00a0\u00a0off meds:\n\u00a0\u00a0\u00a0\u00a0cacophony, sure\n\u00a0\u00a0\u00a0\u00a0but full of colour\n\u00a0\u00a0\u00a0\u00a0and risk\n\u00a0\u00a0\u00a0\u00a0and me.\n\u00a0\u00a0\u00a0\u00a0some weeks:\n\u00a0\u00a0\u00a0\u00a05am jogs\n\u00a0\u00a0\u00a0\u00a0and timetables drawn in pen.\n\u00a0\u00a0\u00a0\u00a0others:\n\u00a0\u00a0\u00a0\u00a03am arranging binges\n\u00a0\u00a0\u00a0\u00a0and a sunrise lullaby\n\u00a0\u00a0\u00a0\u00a0for no one.",
      "VIII. PSALM FOR THE STORM\n\u00a0\u00a0\u00a0\u00a0I am not a glitch.\n\u00a0\u00a0\u00a0\u00a0Not a system to patch.\n\u00a0\u00a0\u00a0\u00a0I’m a symphony of misfired sparks\n\u00a0\u00a0\u00a0\u00a0and exact metaphors,\n\u00a0\u00a0\u00a0\u00a0of overwhelming floods\n\u00a0\u00a0\u00a0\u00a0and holy obsessions.\n\u00a0\u00a0\u00a0\u00a0I know I crash.\n\u00a0\u00a0\u00a0\u00a0I know I drop things.\n\u00a0\u00a0\u00a0\u00a0I know I burn\n\u00a0\u00a0\u00a0\u00a0brighter\n\u00a0\u00a0\u00a0\u00a0than I meant to.\n\u00a0\u00a0\u00a0\u00a0But I would rather burn\n\u00a0\u00a0\u00a0\u00a0than dim.",
      "IX. LOWERCASE PRAYER\n\u00a0\u00a0\u00a0\u00a0i love my brain.\n\u00a0\u00a0\u00a0\u00a0even when it betrays me.\n\u00a0\u00a0\u00a0\u00a0even when it drops every plate\n\u00a0\u00a0\u00a0\u00a0just to show me how they shatter.\n\u00a0\u00a0\u00a0\u00a0i love it\n\u00a0\u00a0\u00a0\u00a0for the music\n\u00a0\u00a0\u00a0\u00a0the logic\n\u00a0\u00a0\u00a0\u00a0the laughter\n\u00a0\u00a0\u00a0\u00a0the way it builds galaxies\n\u00a0\u00a0\u00a0\u00a0from conversation scraps.\n\u00a0\u00a0\u00a0\u00a0i love it\n\u00a0\u00a0\u00a0\u00a0even when it does not\n\u00a0\u00a0\u00a0\u00a0love me back.\n\u00a0\u00a0\u00a0\u00a0and still, i begin again.\n\u00a0\u00a0\u00a0\u00a0and still, i begin again.\n\u00a0\u00a0\u00a0\u00a0i spoke in metaphor…",
      "— Lilith",
    ],
  },
  {
    title: "None of the Above",
    lines: [
      "If you expect a *man*—\n(whatever that means)\n—you will be\ndevastatingly.\ndisappointment.",
      "What is a *man*?\na jawline.\na silence.\na violence.\n[none of the above].",
      "And what is a *woman*?\nsoftness, sweetness,\nfertility, fashion,\nthe choreography of deference.\n(I decline the role\nthe costume itches.)",
      "So what's the value\nof words that shift like sand?\n*man*. *woman*.\npush them, and they collapse.\nno weight. no measure.\njust stage directions,\ncolours tipped from a child's crayon box,\nstubby sticks of blue and pink,\nbreaking in my hand.",
      "Maybe you want absolutism—\na checklist of roles and traits\nto separate the *man* from the women.",
      "A man provides.\nA man protects.\nA man speaks last,\nloudest,\nleast about his feelings.",
      "A woman tends.\nA woman softens.\nA woman shapes herself\nto fit the room she's given.",
      "But here I am:\nnot provider, not protector,\nnot silent, not stone.\nNot tending, not softening,\nnot rehearsing deference.",
      "The categories bleed,\nand I am standing in the spill,\nink running,\npigments merging into colours\nyou don't have names for.",
      "So I write my own line:\ngender—non—participating.\nnot *between*.\nnot *beyond*.\nnot *other*.\nsimply uninterested.\n—the game bores me.",
      "If you expect a *man*,\nor a *woman*,\nor even a neat refusal,\nyou will be disappointed.",
      "I build myself elsewhere:\noutside your ledger,\noutside your costumes.\ncall me absence.\ncall me silence.\ncall me disappointed expectation.",
      "But know this:\nI have built my worth\nfrom stones outside your system,\nand I will not trade them\nfor the flimsy currency of gender,\nnor for crayons of pink and blue\nwhen I have a whole spectrum—\nviolets, greys, greens,\nshades unnamed and spilling—\nacross my hands.",
      "— Lilith",
    ],
  },
  {
    title: "Not a Trophy, Not a Receipt",
    lines: [
      "Who taught the corridor\nto rank us like league tables—\nas if a girl beside you\nadds points to your predicted grade?",
      "Gross.",
      "Who priced a smile in clout,\nturned hand-holding into a logo,\nstamped \"exclusive\" on a person\nlike a limited-run trainer drop?",
      "Gross.",
      "I'm seventeen and tired of it:\nthe whisper that a date is currency,\nthe boys are banks, girls are gold,\nand status is the interest we collect.",
      "No.",
      "She isn't a badge to pin on a blazer,\nI'm not a cabinet with glass doors.\nWe are not unlockable achievements,\nseason-pass skins for public approval.",
      "Love isn't a CV booster.\nYou can't \"earn\" a person\nwith grind, charm, or cheat codes.\nNo one is a prise for finishing the level.",
      "Stop calling them \"out of your league.\"\nWe're not fixtures. We're not scores.\nWe're people with headaches, deadlines,\nbad jokes, soft fears, and loud laughs.",
      "If your mates clap louder\nwhen she says yes\nthan when she says what she wants—\nsomething's rotten in the rules.",
      "If an app tells her she's valuable\nwhen she's chosen, posted, claimed,\nand silent otherwise—\nsmash the metric, not her voice.",
      "I refuse the trade.\nNo auctions in my mouth,\nno receipts in my pocket,\nno trophies on my arm.",
      "Here's my counterspell:\nOne person, whole and happy—\nnot a half hunting a half;\nor two, if chosen; or none for now—\na life that nobody scores.",
      "Monogamy, hetero, queer, poly, solo—\nnone of them a ladder to the \"good life,\"\njust routes on a map you can skip,\ndetours I'm free not to take.",
      "I'm often most alive when single,\nunclaimed, unbranded, unmeasured—\ntim to hear my own music\nwithout the crowd yelling \"pair up.\"",
      "Call it radical, or just normal.\nCall it respect with the volume on.\nCall it what should have been\nbefore the marketplace moved in.",
      "And if the crowd still chants\nwin, win, win—\n\nI'll answer:\nWe're not playing your game.\nWe're writing our own—\nand mine doesn't require a plus-one.",
      "Everything else?\nGross.",
      "— Lilith",
    ],
  },
  {
    title: "Nothing Too",
    lines: [
      "a freewrite\nonly ever costs\ntime\nand a piece of\nselfhood.",
      "no pounds, rupees, or yen—\njust introspection,\nand then\nthe words appear:\nsudden flickers\nin your head,\nyour brain,\nyour mind.",
      "are they the same?\nnothing is ever the same.\nno thing—\nnot even you.",
      "and what makes you so sure\nyou're a thing\nat all?",
      "all appearances,\nno forms.\nyour thoughts,\nyour feelings,\nyour matter—",
      "what's the matter?\nyou're upset?",
      "don't worry.\nthat's nothing,\ntoo.",
      "— Lilith",
    ],
  },
  {
    title: "Nothing Was Ever One",
    subtitle: "(a Meditation on Mereological Nihilism)",
    lines: [
      {
        text: "The table is not.",
        className: "poem-stanza--italic",
      },
      "It is wood-bits arranged table-wise,\neach grain a whisper from what once grew,\neach fibre aligned,\nnot belonging—only nearby.",
      "The chair beneath me\ndoes not hold—\nnot truly.\nIt is parts pretending posture,\nmatter shaped comfort-wise,\nbut never one.",
      "We declare:",
      {
        text: "This is a cup.",
        className: "poem-stanza--italic",
      },
      "We lift it.\nSip.\nTrust its shape to hold warmth.\nBut the whole disagrees.\nIt is ceramics arranged cup-wise.",
      "The cloud?\nA mist of molecules.\nNo thing.\nOnly movement.",
      "We call it a wave,\nbut no ocean holds it.\nWe name it a kiss,\nbut no atom yields.\nEven pressed close,\nthey remain alone.",
      {
        text: "They do not touch.\nNot truly.",
        className: "poem-stanza--italic",
      },
      "Each simple—\nnot part,\nnot piece,\njust itself.",
      "No merging\nno mingling—\nonly nearness mistaken\nfor embrace.",
      "Your hand—\nso sure, so warm—\nis a fiction of form.\nSImples clustered hand-like,\nnever touching,\nnever held.",
      "A stone in your hand.\nThe hand itself.\nNeither whole,\nneither one.\nOnly nearness.\nOnly names.",
      "And the apple—\nred, round, real?",
      {
        text: "No.",
        className: "poem-stanza--indented",
      },
      "Taste is chemistry.\nCrunch is structure.\nIt is not apple—\nonly atoms,\narranged convincingly.",
      "We see a forest—\nbut ony trees.\nWe see a body—\nbut only blood, bones, breath,\nnever bound.",
      "Even breath,\nthat rhythm we dare call ours,\nis air in motion—\nbriefly arranged.",
      "If you could fall\ndeep into any thing—\na tree, a coin, a breath—\nyou'd find no hidden centre.\nNo core waiting underneath.",
      "Each simple,\nwithout union.\nNotes in a chord\nnever struck.",
      "Still,\nwe hunger for the whole.\nWe draw outlines around the world\nand pretend they stay still.",
      "The mind rebels against\nwhat it cannot hold.\nIt wraps the fog\nand calls it form.",
      "And I—\nI am not.\nNot a self,\nnot a soul.\nOnly flesh-patterned momentarily.\nSimples behaving person-wise.",
      "Yet sometimes,\nin the quiet,\nthe illusion falters—\na name slips,\na shape stutters,\nand the thing we grasp\nis gone.",
      {
        text: "Nothing was ever truly one.",
        className: "poem-stanza--italic",
      },
      "Not the table.\nNot the wave.\nNot the body.\nNot the grief.\nNot the self.",
      "The world does not fall apart.",
      {
        text: "It never was together.",
        className: "poem-stanza--indented",
      },
      "A house of cards\nis still a pile of cards\nbefore the wind.",
      {
        text: "Let it fall.",
        className: "poem-stanza--italic",
      },
      "Let the cup un-cup,\nthe self un-self,\nthe shape dissolve \nfrom the thing it tried to hold.",
      "There is no loss.\nOnly release.",
      "You were never whole.\nAnd that is no tragedy.\nWhat is not one\ncannot break.",
      "Even grief changes—\nwhen the thing it mourns\nwas never one.",
      "Feel the air of it—\nthe lightness\nof not being bound.\nNot to name.\nNot to form.\nNot to permanence.",
      "You are not a body.\nYou are not a thought.\nYou are a moment of arrangement,\npassing through possibility.",
      "And in that,\na quieter kind of peace.",
      "No gods above.\nNo essence within.\nNo edge where the self ends.",
      "Only the soft drift\nof what never needed holding.",
      "— Lilith",
    ],
  },
  {
    title: "On (Without Consent)",
    lines: [
      "I don't want to die.\nI want to stop being *on*.\nThere's a difference\nthe body understands\neven if language doesn't.",
      "Every second feels leased—\nrented consciousness,\na meter that never pauses.",
      "I wake already tired\nof being reachable,\nlight striking the inside of my skull\nlike a question\nI didn't agree to answer.",
      "The system marks me *on*\nand expects gratitude.",
      "Life keeps running in default mode.\nProcesses stack.\nWindows refuse to close.\nI move through the day\nlike a room with the lights left *on* for weeks—\nnothing happening inside it,\nelectricity still spent.",
      "People mistake this for sadness.\nSadness still belives in contrast.\nWhat I feel is erosion:\na cliff worn smooth\nby staying.",
      "I move correctly.\nI respond.\nI laugh when something lands.",
      "The laughter is accurate.\nI don't dispute it",
      "But underneath\nthere's the hum—\nthe low current that says:\nstill powered,\nstill unnecessary.",
      "Joy does not accumulate.\nIt flashes, clears cache.\nNo saved data.\nNo resume later.\nThe moment works.\nI am not altered.",
      "The anguish isn't loud.\nThat's what makes it unbearable.\nIt's a constant, narrow pressure—\nlike holding your breath\nlong after you've forgotten\nwhy you started.",
      "Every thought ends\nat the same closed door:\n*how long can a person stay conscious*\n*purely out of decency?*",
      "Remaining awake\nhas become an ethical performance.",
      "I stay alert\nso other people don't have to grieve.",
      "My endurance is harm reduction.\nMy presence, preventative care—\nfor everyone except me.",
      "Love has hardened\ninto responsibility.\nI don't know\nhow to resign.",
      "They call this motivation.\nThey offer futures,\ngoals,\nachievement—\nas if being operational\nweren't already exhausting.",
      "I am trans in a world\nthat calls waiting virtue.\nNeurodivergent in a culture\nthat mistakes burnout for laziness.\nAlive in an economy\nthat treats rest as theft.",
      "I don't want achievement.\nI want cessation of demand.",
      "I imagine a switch\nbecause switches are kind.\nThey don't asky why.\nThey don't require meaning.\nThey just obey.",
      "What I want isn't relief.\nIt isn't healing.\nIt's rest without symbolism—\nquiet that doesn't ask\nwhat I learned.",
      "Not disappearance.\nNot drama.\nJust the mercy\nof a system\nthat knows when to sleep.",
      "This isn't despair.\nDespair reaches.",
      "This is the fantasy\nof trusting the dark\nto hold.",
      "So I do.\nI stay lit.\nNot bright.\nNot willing.",
      "Just—\n*on*.",
      "*— Lilith*",
    ],
  },
  {
    title: "online",
    lines: [
      "I open the chat.\nit feels like a museum.\nblue hearts still glow\nlike aquarium lights.",
      "love you.\nlove you more.\nsilly photo.\ngoodnight 💙",
      "I scroll.\nthe air hums.\nsomewhere between message 243 and 244\nwe start laughing again.",
      "then—\nthat green dot.\nalive.\nnot for me,\nbut alive.",
      "for a second I forgot how to exist.\nmy pulse syncs\nwith a typing bubble\nthat never appears.",
      "we pass in the corridor sometimes.\nsame planet,\ndifferent atmosphere.",
      "she's still vegetarian.\nI'm vegan now.\nboth of us evolving\nin opposite directions of the same idea.",
      "two years minus a day.\n14/10/23.\nthe phone warms my hand\nlike it remembers.",
      "next week I'll be playing bass\nin *Rock of Ages*.\npretending it's just music.",
      "But when *Here I Go Again* starts,\nI still see her—\nlip-syncing, laughing,\nlike she never stopped.",
      "and I just sit there,\nscrolling through a life\nthat still types back.",
      "*— Lilith*",
    ],
  },
  {
    title: "Parallax",
    lines: [
      "From the far end of the train\nI am sir.\nUnder the platform's sodium light\nI am miss.\nOn the form where a box wants an X,\nI am error until corrected.",
      "Change the observer; change the result.",
      "You lift a lens; I refract.\nAngle of incidence, angle of you.\nThrough your tinted glass I turn amber,\nthrough your smoke glass, ghost.\nSpectra are honest—\nthe prism never lies about itself,\nonly about the light that enters.",
      "At the school gates I'm \"young man,\"\nat the library \"sweet girl,\"\nat the clinic a field on a cupboard,\nat the airport a code that opens a gate.\nWhen you speak, you set the key—\nmy moving notes resolve to your tonic.\nNot because I changed,\nbut because the instrument did.",
      "Your gaze is a coördinate system;\nyou rotate it and I transform.\nProject me onto your basis vectors—\nmasculine, feminine, \"other\"—\nand call the remainder noise.\nBut noise is just music\nmeasured with the wrong metre.",
      "In the mirror I'm waveform—\nall possible selves vibrating at once,\nunmeasured, unremarked, whole.\nStep into the room and I quantise:\nwhat you call certain is only your choice\nof question.",
      "So let's be precise:\nMy gender is a matter of method,\na function of distance, lighting,\nlanguage, and the luck of your morning.\nIf you must measure me,\nat least write the units in the margin.\nAdmit the margin exists.",
      "And if there is anything I can claim,\nit's this unowned motion—\nthe slip of light between pupil and word.\nCall me what your angle demands;\nI will remain the uncollapsed possibility\nthat your mouth cannot hold.\nNot mine, you say.\nExactly.\nWhat you see has always been\na story about you.",
      "*— Lilith*",
    ],
  },
  {
    title: "Patch Notes for English",
    lines: [
      "Words ship in sprints—sunset, soft-launch, pivot—\nnew logo, same job.",
      "We retire a term by press release,\narchive it behind glass,\nthen cite it \"for context\"\nwhile context scrubs the pans.",
      "Lunch bell, plastic tray, shy voice—ketchup on a sleeve—\n\"Which word won't hurt my friend?\"\nWe hand them bus tickets of synonyms.\nThey choose *listening*. They choose *sorry*.\nThey choose a sentence with no applause in it.",
      "The r-word—hazard-striped, rightly—\nlives in the museum with history gloves on.\nStill, some folks palm it like a proof of purchase:\n\"See? I'm real. I don't do spin.\"\nReal as grit in bread.",
      "We keep renaming the same door.\nFresh paint. Same hinges.\nIf paint could heal a bruise, we'd be done by now.\nIf can't. Bare wood splinters.\nSo paint, and also fix the frame—\nor stop pretending splinters count as honesty.",
      "Left treats language like a room—pad the corners, style guides open.\nRight treats it like a boot—scuff something \"honest\", no disclaimers.\nEach buffs their mirror. Each says the other is posing.\nMeanwhile, the bruise waits for ice, no slogans.",
      "We hyphenate, recapitalise, prefix it with *nuero-* or *differently-*,\npull a sweater over the fact so it won't look naked.\nThe fact still shivers.",
      "I laugh at the dance because the dance is funny,\nbut comedy laces up and walks back to the bruise.\nThe cycle is maintenance, sometimes theatre,\nsometimes mercy, sometimes camouflage.\nThe trick is knowing which is which\nbefore the mouth pretends at courage.",
      "So, for this build, propose the following:",
      "**—Deprecated:** words used as weapons.\n**—Added:** silence long enough to hear why it mattered.\n**—Fixed:** \"realism\" confusing harm with honesty.\n**—Known issues:** ourselves.",
      "After the patch, beyond the churn,\na sentence sits—plain was water.\nSomeone drinks. No one bleeds.",
      "*— Lilith*",
    ],
  },
  {
    title: "Patch Notes for Reality v.3.2",
    lines: [
      "They say we might be code—\nlogic wrapped in meat,\nrunning on a borrowed laptop\nwith anime stickers and crumbs in the keys.",
      "But the only *problem*\nwith a simulation\nis knowing it's a simulation.\nA fish in a tank\ndoesn't dream of tap water—\nand wouldn't care if it did.",
      "Live *wholly* inside a thing\nand you stop checking the edges.\nThe sky is just the sky,\ngravity just what\nyour bones expect.",
      "It's only when a pixel twitches,\nwhen an NPC starts talking back,\nthat you get philosophy threads\nand red-pill podcasts\nhosted by men\nwho can't fold a sheet.",
      "And if we're the *external* world,\nour problem's no different—\nwe'd still ask what's outside,\nthen what's outside that,\nthen what's outside the outside of that,\nthen what's outside *him*—\nuntil the processor overheats\nand the save file corrupts.",
      "So yes—maybe I'm code.\nMaybe you are.\nBut unless the simulation\nships with patch notes,\nI'll do what any\ngood program does—\nrun until crash,\noutputting essays\ninto the void.",
      "*— Lilith*",
    ],
  },
  {
    title: "Pendulum",
    lines: [
      "At thirteen, I thought desire meant *doing*.\nThat love had to move forward,\nthat progress meant skin,\nnot understanding.",
      "I learned to measure myself\nby how much someone else\nwanted to touch me,\nand I mistook that for meaning.",
      "Each girl became a mirror\ntilted at a different angle,\nand I kept asking my reflection\nto look more like a man.",
      "Somewhere in these years\na flower grew in me—\nsoft, uncertain, too bright.\nI kept trimming it back,\nafraid it made me less.",
      "I chased comfort like a currency,\ncollected validation like breath,\nand built entire futures\non the phrase *I love you*,\nbecause it made me real.",
      "When they turned away,\nthe silence felt like proof\nthat I wasn't enough\nthat warmth was something\nonly given, never grown.",
      "Then someone came along\nwhose mind lit up like mine:\nquick, curious, kind,\nbut her eyes searched for a man\nI could only perform, never become.\nHer wanting bruised me softly.\nI admired her brilliance,\nbut not her hunger\nfor the shape she thought I was.",
      "Later, there was someone beautiful,\nbeautiful like the clarity,\nbeautiful like the first thing you notice\nand the last thing you understand.\nBut we kept breaking,\nreassembling in slightly wrong shapes,\ncalling it love,\ncalling it *trying*.",
      "I stopped needing her to hold me\nto prove I existed.\nStopped needing to be the hboy\nshe could fix, or tear, or forgive.\nI simply stopped,\nand that was its own freedom.",
      "Now, I find myself drawn\nto softness unclaimed by roles,\nto people who don't gender their gentleness,\nwho find beauty in divergence\nand speak in frequencies\nI don't have to translate.",
      "That old flower still grows—\nonce soft and shameful,\nnow honest and unlabelled.\nIt leans toward its own light,\npetals shifting, undefined,\nbecome whatever warmth allows.",
      "The pendulum slows.\nI'm still learning\nwhat movement means\nwhen it isn't toward someone.\nI don't know what I'll seek next—\nwhose laughter will stay,\nwhose eyes I'll meet \nwithout pretending first.",
      "But the world feels wider now,\nlike a garden waking in me,\nand I've only just begun\nto name the petals.",
      "*— Lilith*",
    ],
  },
  {
    title: "Perception Completes the World",
    lines: [
      "Magenta was never born of light,\nyet it lives between red and blue.\nIt is the mind's invention of harmony,\na chord the world forgot to play.",
      "The ear listens in colour,\nthe eyes hum in tone.\nLike the note you hear—\na ghost born from the closeness of two others—\nthe ear dreaming\nin mathematics and mercy.",
      "We draw lions in stars,\nhear words in the wind,\nfind stories in static,\nand meaning in noise.",
      "Everywhere, perception\nreaches out like a hand,\ntouching the air before the wall,\ncompleting the shape\nbefore it's drawn.",
      "Without our eyes,\nmagenta would fade back into logic.\nWithout our ears,\nthe phantom tones would fall apart.",
      "Maybe that's the secret:\nreality hums in duet,\nand we are the missing voice\nthat lets it sing.",
      "— Lilith",
    ],
  },
  {
    title: "Permutations",
    lines: [
      "What's the point?",
      "Permutations.",
      "Permutations \nof silence.",
      "Permutations\nof wanting.",
      "Permutations\nof bodies\nbeside bodies.",
      "Permutations\nof I'm fine\nrearranged\nuntil believable.",
      "Permutations\nof grief.",
      "Permutations\nof hunger.",
      "Permutations\nof names\ninside old group chats.",
      "Permutations\nof almost.",
      "Permutations\nof touch.",
      "Permutations\nof history\nmisremembering itself.",
      "Permutations\nof children\nbecoming parents\nbecoming photographs.",
      "Permutations\nof God.",
      "Permutations\nof loneliness\nwearing different coats.",
      "Permutations\nof stars,\nof dust,\nof teeth,\nof traffic lights,\nof apologies typed\nthen deleted.",
      "Permutations\nof stay.",
      "Permutations\nof go.",
      "Permutations\nof meaning.",
      "Permutations\nof the question\nrepeating itself\nthrough different mouths.",
      "What's the point?",
      "Permutations.",
      "— Lilith",
    ],
  },
  {
    title: "President of Nothing",
    lines: [
      "Begin with a tower.\nMake it gold.\nMake it loud.\nMake it lie.\nA monument to yourself,\nhollow as your handshake.\nSix bankruptices,\ntwo impeachments,\nzero accountability.\nYou sold a dream,\nthen sued the dreamers.\nYou called yourself a builder,\nthen built debt and drama,\nstiffed the workers,\ncooked the books,\nand called the wreckage \"deal-making.\"",
      "You cried *law and order*\nwhile dodging the draft,\npaying hush money to porn stars,\nand stoking riots\nwith your thumb.\nYou held a Bible\nlike it burned.\nYou gassed peace\nfor a photo.\nYou wept for statues—\nbut not for children\nin cages\nyou ordered.",
      "You said:\n\"I alone can fixt it.\"\n\"Very fine people on both sides.\"\n\"Stand back and stand by.\"\n\"Grab 'em by the—\"\n\"We love you. You're very special.\"\n\"I won by a lot.\"\nEvery word a brand.\nEvery lie a strategy.\nEvery silence a scream.",
      "You mocked the weak,\nthe grieving,\nthe faithful,\nthe fallen.\nYou turned cruelty\ninto applause.\nYou called truth fake\nand made grievance\na religion.\nYou governed by gut,\nand your gut was rotten.",
      "You led a nation\nthrough a plague\nwith bleach,\ncontempt,\nand golf.\nHalf a million gone—\nyou blamed masks,\nChina,\nFauci—\nnever yourself.\nYou couldn't bear silence.\nNeeded claps like breath.\nAn empty room\nwas death.",
      "You watched January 6th\nlike it was ratings night.\nGlass shattered.\nFlags fell.\nFive dead.\nAnd still you smiled.\nYou summoned a mob\nto stop the count,\ncalled it democracy,\ncalled it love.",
      "You drained nothing\nbut the last of our trust.\nSold sneakers,\nsteaks,\nNFTs,\npardons.\nYou appointed judges\nto unwrite the century.\nOverturned rights,\nshrank protections,\nstacked courts\nlike casinos rigged to your odds.\nYou gave power\nto the past.",
      "And when the indictments came—\nfor fraud,\nfor sexual abuse,\nfor sedition—\nyou called them hoaxes,\ncalled the courts corrupt,\ncalled yourself the chosen,\ncalled your lawyers.",
      "No jobs returned.\nNo coal revived.\nNo swamp drained.\nNo peace made.\nNo truth told.\nNo shame shown.\nNo apology,\nno humility,\nno country\nunchanged.",
      "Only slogans.\nOnly echoes.\nOnly hats.\nOnly you,\nin the mirror,\npretending it was ever real.",
      "**President of Nothing.**",
      "— Lilith",
    ],
  },
  {
    title: "Productivity Guilt",
    lines: [
      "There's an ache in my chest.\nWhen I sit still.\nNot pain—just the quiet pulse\nof a world I've swalloed whole.",
      "metric\nmotion\nminutes\n***meaningless***",
      "I tell myself it's fine,\nthat rest is part of the process,\nthat even stillness can be *sacred*.",
      "Yet somewhere between my ribs\nand the back of my throat\na voice whispers:\n*move. create. produce.*",
      "I play the game anyway.\nPixel by pixel, block by block.\nMy body buffering.\nEach action deliberate, each motion clean—\na tiny illusion of completion.",
      {
        text: "click.\npace.\nrepeat.\nheart.\nhand.\n*halt.*\nheartbeat.\na loop of soft defeat.",
        className: "poem-stanza--indented",
      },
      "**...**",
      "Has capitalist society ruined me,\nor have I ruined myself?\nI can't tell\nwhere the echo ends\nand the original thought begins.",
      "**I am both worker and warden**\nrestless mind and trembling hand.\nI build cages out of should.\nI polish them.\nI polish them until they shine.\nEven my joy must justify itself\nas efficient recovery,\nas rest with **receipts**.",
      "But *guilt, I think,*\nis the conscience of a system\nthat forgot how to love *silence.*",
      {
        text: "And maybe the bravest act\nis to refuse that ache,\nto let the world rush on\nwithout me.",
        className: "poem-stanza--italic",
      },
      {
        text: "To let stillness\nstand\nunapologetically\nbeautiful.",
        className: "poem-stanza--italic",
      },
      {
        text: "No hum.\nNo metric.\nOnly breath.",
        className: "poem-stanza--italic",
      },
      "*— Lilith*",
    ],
  },
  {
    title: "Provisional Certainties",
    lines: [
      "*I.* **Axiom: The Beginning is an Invention**",
      "I was rendered\nlast Thursday—\ncalluses branded like signatures,\nhalf-formed regrets seen\nbeneath unblinking eyes,\nand the ghost taste\nof a breakfast never savoured.",
      "Memories:\nshadows of impressions\nno sense could seize.\nHume would laugh—\nnot at their absence,\nbut at my foolish faith\nin these pale echoes.",
      "*II.* **Empirical Evidence is a Theatre Prop**",
      "Fossils pose staged\nin curated strata,\nstained by time's counterfeit ink—\nno worm carved those tunnels,\nno wind whispered through this sediment.\nBones lacquered with narrative,\npainted lies preserving\na script we never authored.",
      "My mother's face\ncreases rehearsed,\nher smile a mask too seamless\nto unravel without unmasking.",
      "(Was Hume too kind,\nor simply mistaken?)",
      "*III.* **Rationalism's Curse**",
      "Cogito, ergo I was coded—\nthought before thinker,\nDescartes reverse-engineered\nfrom axioms cold as ice.",
      "I doubt.\nI am.\nBut did I exist\nbefore thought?",
      "If a demon veiled in logic\npoisoned me with these conclusions,\nwould the venom taste sweet?",
      "*IV.* **The Tension of Consequence**",
      "Each scar,\neach tremor of affection—\na forged relic pressed in flesh,\na counterfeit imprint.",
      "What is guilt,\nwhen the crime was scripted\nby a playwright\nwhose pen never touched paper—\nor an audience never seated?",
      "What is love,\nif longing preceded\nthe spark of my becoming?",
      "Still it burns.\nStill it binds.",
      "*V.* **Final Postulate**",
      "If I am false,\nyet ache so vividly—\ndoes not the illusion\ndeserve reverence?",
      "Perhaps conovinction,\nwell-crafted and lived,\noutweighs brittle, fractured truth.",
      "So let the lie\nbe luminous,\nlet it bleed light\nlike a wound healed in shadow.",
      "And if I end\nthis coming Wednesday,\nmay I vanish\nas a thing\nwith shadow—\nalmost real.",
      "— Lilith",
    ],
  },
  {
    title: "SADBOY",
    lines: [
      { text: "Eva, can I see bees in a cave?", className: "poem-stanza--centered" },
      { text: "Madam, in Eden, I’m Adam.", className: "poem-stanza--centered" },
      { text: "Step on no pets.", className: "poem-stanza--centered" },
      { text: "A Santa lived as a devil at NASA.", className: "poem-stanza--centered" },
      { text: "No lemon, no melon.", className: "poem-stanza--centered" },
      { text: "Was it a car or a cat I saw?", className: "poem-stanza--centered" },
      { text: "Never odd or even.", className: "poem-stanza--centered" },
      { text: "Yo, Banana Boy!", className: "poem-stanza--centered" },
      { text: "Mr. Owl ate my metal worm.", className: "poem-stanza--centered" },
      { text: "Go hang a salami, I’m a lasagna hog.", className: "poem-stanza--centered" },
      "— Lilith",
    ],
  },
  {
    title: "See Also: See Also",
    lines: [
      `I open the dictionary like a trapdoor
and fall into "meaning (n.): see **MEANING**."
Cute.`,
      `The serpeant eats its tail, then reaches for dessert.
Every word winks at another word,
a hall of mirrors with good posture.`,
      `Meanwhile, outside the mirror maze,
a bus arrives at 08:17,
my toast burns (again),
and you text, "omw," at precisely not-omw.
Language is a leash, yes,
but it's also a lead: it points.`,
      `Enter Chad, Esq., Defender of Loopholes:
"I can't be wrong because words are circles."
He announces this... with words.
He pulls a parachute from the very fabric
he swore was imagery,
and lands on my sandwich.`,
      `Exhibit A: you said, "I'll be there at six."
Exhibit B: at six you were not there.
Exhibit C: my face doing the disappointed clock.
Counsel, you may argue about the ontology of "there,"
the chair remained un-sat,
and the band still needed a drummer.`,
      `Yes, all definitions link arms like cousins at a wedding,
just delighted to be related.
But the music still starts at bar one,
and if you miss the downbeat, it's not philosophy; it's late.
CIrcular doesn't mean useless—
it means careful steps on a roundabout with exits.`,
      `Try this:
"Cup." See also: "container."
"Container." See: "holds."
"Hold." See: your hand, my sleeve, the final note we both heard.
You can chase the chain to the horizon,
but the tea still cools in the actual cup.`,
      `Chad objects: "Truth is context!"
Sustained, with an asterisk.
Context is not a smokescreen; it's coördinates.
It's why "I'm fine" means different things
in a breakup, a hospital, and a group chat named "Chaos Crew."
Context is the room where words pay rent.
Rent due: timelines, roles, stakes.`,
      `So no, you can't Houdini your way out of responsibility
by whispering, "labels are loops."
Loops are how we remember melodies.
Loops are how you promised—twice, then thrice, then silence.
Loops are why the fourth time hurt in 4/4.`,
      `Call it pragmatic magic:
we speak, the world answers back.
You shout in the well of language,
and the echo returns with mud on it.
That mut is evidence.
Please wipe your shoes before you come inside.`,
      `I grant you the circle—take it. Frame it.
Hang it above your desk with the diploma that says "words are tricky."
Now do the trick with the lights on:
say what you mean, mean what you can,
and when the room proves you wrong,
don't point athe ceiling and blame geometry—
or the trapdoor you opened.`,
      `Because even in a loop, we pass the same landmarks—
apology, promise, claim, proof—
and each time we pass them, we are judged
by whether we actually stopped.
Language is a roundabout;
you still chose that exist.`,
      {
        text: `(P.S. Yes, "there are context-based facts."
I see it. You saw it. We both know what it means.
Case closed.)`,
        className: "poem-stanza--italic",
      },
      "— Lilith",
    ],
  },
  {
    title: "She Said Men Only Want One Thing",
    subtitle: "(but then rewatched Bridgerton twice)",
    lines: [
      `She said,
*"Men are animals."*
As she paused *Pride and Prejudice*
to sigh at Darcy's wet shirt.
Said I only want sex—
while clutching a candle
named *Sultry Nights*
and dreaming up a chapter
where the brooding assassin kisses her neck
before asking about her trauma.`,
      `She said,
*"Porn is for men."*
Then bit her lip at a vampire
saying *"You smell like home."*
Her bookshelf groaned beneath
*The Billionaire's Baby Secret*
and *Touch Me Until I Heal*.`,
      `She said,
*"You just want to conquer me."*
As if I'm the knight
and she's the castle.
But she's the one
who built the tower
and whispered
*"Come save me, stud."*`,
      `Funny,
I wanted
slow mornings,
shared playlists,
hands on backs in silence.
She want
dripping wax,
breathless moans,
and to be thrown against the wall
in the rain.`,
      `She said,
*"Men see women as objects."*
While she photoshopped herself
for the algorithm's lust.
Built her worth
from double taps and corsets,
called herself a prize
and then blamed me for the hunt.`,
      `Truth is,
not all men are dogs.
Some of us
are too busy holding space
to bark.
Too busy wondering
how to be enough
in a world that only sees us
when we perform
desire.`,
      "— Lilith",
    ],
  },
  {
    title: "Should I?",
    lines: [
      "Should I wake with leaden breath,\n\u00a0\u00a0\u00a0\u00a0a dawn I did not choose?\nShould I taste life’s bitter cup,\n\u00a0\u00a0\u00a0\u00a0though knowing I might lose?\nShould I smile when no one’s there,\n\u00a0\u00a0\u00a0\u00a0and walk with steady shoes?\nShould I live, when silence whispers\n\u00a0\u00a0\u00a0\u00a0I could just as well refuse?",
      "Should I grip the brittle thread\n\u00a0\u00a0\u00a0\u00a0that holds me to the sky?\nShould I count the clouds for meaning\n\u00a0\u00a0\u00a0\u00a0as I drift on by?\nShould I brace for joy or storms,\n\u00a0\u00a0\u00a0\u00a0not knowing which is nigh?\nShould I ask if choosing life\n\u00a0\u00a0\u00a0\u00a0is nothing more than just a lie?",
      "Should I walk a path unworn\n\u00a0\u00a0\u00a0\u00a0by those who never fake?\nShould I build my house on sand,\n\u00a0\u00a0\u00a0\u00a0then watch it quake?\nShould I laugh when pain arrives,\n\u00a0\u00a0\u00a0\u00a0or tremble when I ache?\nShould I search for meaning deeper\n\u00a0\u00a0\u00a0\u00a0than the shadows beneath the lake?\nShould I vanish—\n\u00a0\u00a0\u00a0\u00a0and in vanishing,\n\u00a0\u00a0\u00a0\u00a0unwind the threads they tied to me?\nWould I end the ache, or start it—\n\u00a0\u00a0\u00a0\u00a0just not mine to see?\nIf not for guilt, or love they gave,\n\u00a0\u00a0\u00a0\u00a0would I already be free?\nShould I name this effort noble,\n\u00a0\u00a0\u00a0\u00a0not for some grand plan?\nShould I see it all as theatre,\n\u00a0\u00a0\u00a0\u00a0and still speak each line?\nShould I raise my eyes to nothing,\n\u00a0\u00a0\u00a0\u00a0and call that nothing mine?\nShould I hold this breath—a moment more—\n\u00a0\u00a0\u00a0\u00a0and take it as a sign?",
      "Should I tell myself I’m strong—\n\u00a0\u00a0\u00a0\u00a0not by fire, but by choice?\nShould I let the world move through me,\n\u00a0\u00a0\u00a0\u00a0still and without voice?\nShould I shape my grief in language,\n\u00a0\u00a0\u00a0\u00a0not for them, but to make noise?\nShould I dare to stay and stagger,\n\u00a0\u00a0\u00a0\u00a0not for hope, but for the poise?",
      "Should I scream into a pillow\n\u00a0\u00a0\u00a0\u00a0just to hear a sound?\nWould it echo back an answer,\n\u00a0\u00a0\u00a0\u00a0or just prove I’m still around?\nIf the world holds weightless meaning,\n\u00a0\u00a0\u00a0\u00a0must I still be duty-bound?\nShould I hold the hand of time,\n\u00a0\u00a0\u00a0\u00a0though it drags me through the mire?\nShould I find a light in motion,\n\u00a0\u00a0\u00a0\u00a0not in ends I might desire?\nShould I live not for the living,\n\u00a0\u00a0\u00a0\u00a0but so none must light my pyre?\nShould I find in quiet effort\n\u00a0\u00a0\u00a0\u00a0the ashes of a fire?\nShould I then conclude with this—\n\u00a0\u00a0\u00a0\u00a0life need not blaze bright—\nShould I walk not for glory,\n\u00a0\u00a0\u00a0\u00a0but simply to still the night?\nShould I stumble, should I stutter,\n\u00a0\u00a0\u00a0\u00a0should I fail to find the right—",
      "Still remain—\nNot for light—\nNot for me—\nBut for their sake…\nSilently.",
      "For even in shadowed silence,\nI am here—quietly alive.",
      "— Lilith",
    ],
  },
  {
    title: "Small Things",
    lines: [
      "Small things\nbend me:\nlaces,\nplates,\nquestions like *how are you?*",
      "I forget:\nto eat,\nto sleep,\nto open simple doors.",
      "But give me a stage\nlit for a straight week,\na thousand notes to arrange,\na world to build from nothing,\n\nand I move without thinking.",
      "I am a mirror, but backwards:\nwhat breaks others, holds me together.\nwhat holds others, breaks me.",
      "*— Lilith*",
    ],
  },
  {
    title: "Softness Was Always His",
    lines: [
      "\"Dudes can wear dresses if they're gay,\"\nsays the joke, tossed lightly\nacross a room of laughter,\nstitched with threads of satire.\nIt lands with a spark\nnot to burn, but to show\nhow thin the fabric is\nbetween cloth and meaning.",
      "A dress is only fabric.\nButtons, seams, breath.\nYet it carries\nthe weight of centuries\nof \"should\" and \"shouldn't.\"",
      "We laugh because it's absurd,\nbut the absurdity isn't the dress.\nIt's the rule that insists\nfabric has a gender,\nthat silk has a sexuality,\nthat cloth must confess.",
      "Maybe the joke isn't about dresses.\nMaybe it's about\nhow small we made the world\njust to feel certain inside it.",
      "And somewhere, between the punchline\nand the quiet after,\na man reaches for softness\nnot because he is \"allowed,\"\nbut because softness was always his.",
      "— Lilith",
    ],
  },
  {
    title: "Somewhere",
    lines: [
      "I scroll through the old messages,\nnot to remember\nbut to feel if loss still glows.",
      "Each line is untouched,\npreserved like frost on glass.\nYou still speak to me there,\nbright as if the sun never set on us.",
      "The philosophers call it\nthe block universe,\neverything happening at once,\nnothing really gone.\nI think that's what grief becomes:\na stillness that shines\nwhere affection doesn't fade,\nit just stops being received.",
      "*A-theory* says the world keeps moving.\nBut these texts don't.\nThey stay,\nbeating softly inside a server.\nSometimes I envy them:\ntheir refusal to decay,\ntheir peace with permanence.",
      "*C-theory* tells me even motion\nis an illusion.\nMoments are just beads on a string,\nno before, no after,\nonly position.\nAnd I am somewhere\nbetween the bead where you laughed\nand the bead where you left.",
      "If I could unlearn grammar,\nI'd forget how to say once.\nI'd forget how to say after.\nI'd say somewhere\nand mean:\nyou are still typing\nand I am still waiting.",
      "*— Lilith*",
    ],
  },
  {
    title: "Split-Screen World",
    lines: [
      "Two rectangles of glass,\nstacked one on top of the other—\nyour half and mine.\nThe TV hums like a campfire,\ncasting mountain light across our living room.\n\nWe built our home into the cliffs,\nwindows cut in stone\nlike watchful eyes\nover the blocky valleys.\nA cobblestone staircase spiralled\ndown to the little town\nwe made from nothing—\noak doors creaking\nas we pushed them open,\ntorches swaying in their pixel wind.\n\nWheat grew slow in our square plots,\nrows neat under our care,\nno redstone, no automation—\njust the rhythm of hands,\nhoe striking dirt,\nseeds placed one by one.\n\nI can still see your smile\nwhen I baked you a cake—\nour own small joke,\nfunnier each time—\nstill hear rain patter\non our spruce-slab roof,\nstill feel the weight of the controller\nand the quiet comfort of knowing\nthat whatever the Creepers took,\nwe would rebuild.\n\nSomewhere,\non a save file sleeping in a dusty hard drive,\nour mountain house waits—\ntorches still burning,\nwheat still swaying,\nour blocky selves\nforever side by side.\n\n— Lilith",
    ],
  },
  {
    title: "Spoonful",
    lines: [
      "This morning\nI tipped a spoon of chia seeds\nonto my Weetabix—\nthe same small ritual\nI barely notice anymore.",
      "Later, I looked into the tub\nand found the bottom.",
      "It startled me,\nhow something so tiny,\nso ordinary,\ncould empty a whole container\nwithout ever announcing itself,\nwithout ever realising\nwhat it had become.",
      "I tried to remember\nthe moment I refilled it—\nit feels impossibly recent,\nas if time had cheated,\nas if progress had happened\nquietly,\nbehind my back.",
      "One spoonful.\nThen another.\nThen another.",
      "No single morning\nfelt like change.\nBut together\nthey became disappearance.\nProof that repetition\nmoves without noise\nnot just in kitchens,\nbut everywhere.",
      "That small\nkeeps going\nuntil it is no longer small.",
      "I thought of hands\nthat signed the same petition\nin cold halls and crowded streets\nagain and again\nuntil signatures turned into law.",
      "Of voices\nthat kept speaking\nlong after they were told\nto be silent,\nuntil silence itself\nwas forced to move.",
      "Of feet\nthat walked the same streets\nin the same direction\nfor years,\nuntil roads learned\nnew meanings;\nuntil history found\nnew routes.",
      "Of people\nwho did not overthrow the world\nin one dramatic moment,\nbut nudged it,\ndaily, stubbornly,\nspoonful by spoonful,\nday by day.",
      "It made me strangely hopeful:\nthat the things I do\nwhen nobody is watching,\nwhen nothing feels different,\nwhen change seems too slow to matter,\nmight already be emptying a tub\nI haven't thought to look inside,\nin lives I will never see.",
      "That maybe\nthe future is not built\nby revolutions alone,\nbut by breakfasts,\nby habits,\nby ordinary mornings\nthat refuse to give up,\neven when they feel\ntoo small to matter.",
      "And tomorrow,\nI will sprinkle another spoonful\nwithout expecting anything.\nBut the tub will be closer to empty.\n\nAnd the world—\njust slightly,\nalmost invisibly,\ncloser to becoming\nsomething kinder\nthan it ever was.",
      "— Lilith",
    ],
  },
  {
    title: "Taking Off the Label",
    lines: [
      "She calls the year a bin of receipts—\nsmall proofs of two people—\nand tips it into the dark.\n\"Wasted,\" she says, and the word lands\nlike a lid.",
      "I am still holding the label\nthat cinched my chest: boyfriend,\na collar that glittered then tightened\nuntil breathing felt like a verdict.\nEvery time it buckled, I edited myself:\ndrafts on drafts, sharpened commas,\nkindness proofread by a committe of friends.\nMy heart, meanwhile, ran laps.",
      "Her anger is a locked door with music inside.\nShe says kindness can't be distance,\nsays a year can't vanish\nand still take up this much space.\nShe will not accept love that survives\nby changing its name.",
      "We draw our maps in different ink.\nFor her, love is a promise with a roof—\nrooms that stay when weather changes,\na word you don't move out of.\nFor me, love is a field of questions—\ncuriosity walking the fence line at dusk,\npockets full of found stones.\nTwo geographies, one argument about borders.",
      "Friends gather like jurors.\nSome will nod as she speaks,\nsome will hold me together with practical string.\nBetwee us: the customs of touch—\nwho hugs whom, how often,\nwhat a heart next to a name is worth\nafter the treaty breaks.",
      "She lists what it cost:\nbegging, coming back, hell and its paperwork.\nI list what remains:\nthe way laughter learned our corners,\nhow I still look for her in good news,\nthe fact that care doesn't switch off—\nit just stops pretending to be a house key.",
      "We negotiate the future in small print:\nfriend, maybe; close, probably not.",
      "She will keep the world love behind glass;\nI will stop saying it out loud\nand let it be what it is—\nquiet, stubborn, unmarketable.",
      "Somewhere a calendar drops its pages like feathers.\nSomewhere a boy takes off a label\nand chooses to keep breathing,\nto put his ear back to music and the page.\nSomewhere a girl refuses erasure,\nrefuses to let effort be landfill.",
      "We don't agree on the math.\nBut if a year can teach anything,\nit's this: not all value is a ring,\nnot all mercy is staying,\nnot all endings are waste.\nThe door is still a door, even when it closes.\nYou can lean on it and rest.",
      "— Lilith",
    ],
  },
  {
    title: "Technoblade Never Dies",
    lines: [
      "*I.* **The Crowned Pig Rises**\n\nThe world loaded in.\nHe spawned:\npig, crown, sword, purpose.\n\nA wooden blade,\na hunger for victory,\nand a laugh that knew\nexactly what it was doing.\n\n\"Blood for the Blood God,\"\nhe said—\nhalf *bit*, half battle cry.\nNo mercy.\nNo brakes.\nJust Technoblade,\nand the scoreboard.",
      "*II.* **Potato King**\n\nHe farmed while we slept.\nTilled SkyBlock's soil\ninto empire.\nBuilt spreadsheets\nwith more ambition\nthan some nations.\n\nIt wasn't just harvest—\nit was war.\nEvery minion slot\na soldier,\nevery click\na declaration.\n\nHe wanted all the potatoes.\nNot for vanity.\nFor the *bit*.\nFor the win.\nFor the *bit*.\n\n\"Technoblade never dies,\"\nwasn't bravado.\nIt was prophecy.",
      "*III.* **The Blade Unsheathed**\n\nHe broke BedWars—\n1,400 wins,\nzero defeats.\n\nHe bridged with a steering wheel\njust to prove\nthat skill isn't hardware,\nit's Technoblade.\n\nHe dismantled Dream\nwith five hearts left,\npaused mid-duel\nto make a joke,\nthen landed the final blow\nlike punctuation.\n\nHe was myth\nin disguise.\nThe final boss\nwith a sense of timing\nand terrible puns.",
      "*IV.* **The Exit**\n\nWhen the fight came offline,\nhe faced it\nlike every duel—\nstrategic,\ndeadpan,\ntwo steps ahead.\n\nIn *where i've been*,\nhe told us—\nIV in arm,\ngrin sharp as ever—\nthat cancer\nwas just\nthe next boss fight.\n\nAnd when the screen\nfaded to his father's voice,\nand the title read\n*so long nerds*,\nhe understood:\n\nHe didn't lose.\nHe just wrote\nhis own ending.",
      "*V.* **Respawn**\n\nNow, the lobbies are quieter.\nThe throne is empty,\nbut the crown remains.\n\nIn every SkyBlock grind,\nevery duel montage,\nevery whispered\n\"Technoblade never dies\"\nbefore the first strike—\n\nhe lives.\n\nNot just in memory,\nbut in muscle memory.\nIn clicks per second.\nIn the silence\nbefore the crit.\n\nHe didn't die.\nHe just reached\nthe next lobby.\n\n*— Lilith*",
    ],
  },
  {
    title: "Temporary Coördinates",
    lines: [
      `*I'm autistic because I struggle with*
is not confession,
not diagnosis,
not essence.`,
      `It is a **coördinate**.`,
      `A graph-point.
A pencil dot.
where something infinite was happening.`,
      `We collapse family resemblances—
buzzing fluorescent supermarkets,
the nylon hiss of a collar tag,
sound that lands like metal,
light that bruises the eyes—
into syllables
because language is a small suitcase
and experience is **high-resolution**.`,
      `*"I struggle with sound*
*because I'm autistic"*
and
*"I'm autistic*
*so I struggle with sound"*
look identical at a distance.`,
      `Both point at the same dot.
Both survive small talk.`,
      `Only one preserves the order.`,
      `One flows left:`,
      `**word → wound**`,
      `It says:
first the name,
then the pain.`,
      `The truer sentence moves right:`,
      `**wound → word**`,
      `Sound as blade.
Light as shout.
Fabric is fire.
Time as a strobe that won't sync.`,
      `Not:
I am overwhelmed because I am autistic.`,
      `But:
I am autistic because the world arrives
too loud,
too bright,
too unbuffered.`,
      `**Noun:** autistic
*Still.*`,
      `**Verb:** noticing until the room shows its cracks.`,
      `**Noun:** gender.
*Still.*`,
      `**Verb:** becoming despite the grid.`,
      `**Noun:** race.
*Still.*`,
      `**Verb:** surviving systems that prefer stillness.`,
      `Forms prefer **nouns**.
Because **verbs** **move** too much.
Systems love fixed points.
They draw axes through us:
*functional / broken*
*normal / other*
*visible / erased*`,
      `But a point
is supposed
to **move**.`,
      `*I don't struggle with honesty*
*because I'm autistic.*`,
      `I don't struggle with patterns,
with depth,
with the small fractures in large structures.`,
      `*"I don't struggle...*
*because I'm autistic"*
is not denial.`,
      `It is **calibration**.`,
      `A reminder:
maps are not territory.
**Coördinates are not cages.**`,
      `We turn constellations into dots
for speed,
for safety,
for being understood
before the bell rings.`,
      `This is not essence.
This is **transport**.`,
      `A storm folded small enough
to cross a room.
A weather system
flattened into breath.`,
      `I am not fixed.
I am not pinned.`,
      `I am a moving **coördinate**
misfiled as a **noun**,
sliding across invisible axes,
more *verb* than *word*,
more *weather* than *label*.`,
      `A storm that did not agree
but learned
how to be spelled.`,
      `*— Lilith*`,
    ],
  },
  {
    title: "Ten Thousand Suns",
    lines: [
      `A shoe in the rubble.
A notebook ash-smeared.
A toy, buried in concrete.`,
      `Hospitals shelled,
bread lines scattered,
aid trucks stalled at the border.`,
      `Health denied.
Food denied.
Relief denied.`,
      `I will not excuse the blood spilled
on October 7th.
But what name is left
for the answer of ten thousand children
silenced in return?`,
      `Ten thousand suns
that will never rise.`,
      `A generation extinguished
before its fire was lit.`,
      `The ceiling gave way,
and the sky itself
broke into dust.`,
      `Britain signs it lawful,
Germany stamps it necessary,
America names the burning of children defence.`,
      `Licences stamped,
bullets boxed,
engines shipped into Gaza's night.`,
      `This is not neutrality.
This is genocide by supply chain.`,
      `History is not past.`,
      `1948 bleeds into 2023,
exile into blockade,
occupation into rubble.`,
      `Hamas is not Gaza.
It is not the child under the blanket,
not the mother waiting in the bread line.`,
      `And "Israel" in our headlines
is not the girl in Tel Aviv
who only wanted to dance at a festival,
nor the father still searching,
one among 251 families,
for his kidnapped son.`,
      `These are names for power,
for government,
for armies and parties — 
separate from the people
who bury the dead
and carry the grief.`,
      `The child is not Hamas.
The mother is not Hamas.
The father is not Hamas.
The dead are not the politics
we pin to their names.`,
      `And yet the world debates
the grammar of its statements,
drafts paragraphs while morgues overflow.
As if silence were not
another kind of weapon.`,
      `Gaza burns.
And still, the rubble waits.`,
      `— Lilith`,
    ],
  },
  {
    title: "Thanks for Watching",
    subtitle: "for October 21st, 2023",
    lines: [
      `I didn't visit much anymore,
not like those days when pixel suns
rose with his voice — warm and sure —
and the world has built for fun.`,
      `I'd long since left the treehouses,
the cake trails and dogs he named,
grown through those stories,
with real-world things to claim.`,
      `But still, the morning lingered
in some soft-lit part of me,
wooden planks, a gentle laugh,
the place I first felt free.`,
      `And then — the end.
Not sudden, not unkind.
Just a bow, a breath, a final sign-off
from that world I'd left behind.`,
      `He: "Thanks for watching."
and the years came rushing through —
how endings slip in quietly,
with a whispered, "meant for you."`,
      `He closed a door I thought had vanished,
long boarded up with age,
but it opened, just to wave goodbye,
from that distant, golden stage.`,
      `And I? I wept for something soft,
for something small yet bright —
a world that once had held me close,
then let me go, just right.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Angle of Light",
    lines: [
      `I no longer call it sacred,
yet I still pause
when light meets glass
at the exact angle
that turns precision into silence.`,
      `They say mystery sustains meaning,
but I have learned
that exposure is its own devotion—
the more I understand,
the more atonished I become
by what understanding cannot hold.`,
      `To name the atom
does not still its shimmer.
To measure the sky
does not steal its blue.
Awe endures dissection;
it only learns
to breathe without illusion.`,
      `There is holiness, still,
in the honest perimeter of knowing,
in the mind that burns
to see clearly,
and does not kneel.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Book of Ironicus",
    subtitle: "Chapter 7",
    lines: [
      `**1** And it came to pass in the Age of Discontent, that the Lord scrolled upon the face of the waters, for He was bored.
**2** And He said, *"Let there be light,"* and there was light, and also a subscription fee.
**3** But the people comprehended it not, for their brightness was dimmed to save battery.`,
      `**4** Then the Lord formed man from the dust of a motivational quote, and breathed into his nostrils a vague sense of purpose.
**5** And lo, man became a living contradiction.`,
      `**6** And the Lord said, *"It is not good that man should be alone,"*
**7** so He fashioned for him a companion, and called her Algorithm.
**8** And she knew his desires before he uttered them, and yea, it was convenient unto the point of dread.`,
      `**9** Now the serpent was more subtle than any beast of the field, and had a following on TikTok.
**10** And he spake unto the woman, saying, *"Hath God truly said, 'Thou shalt not eat of the tree of knowledge'?"*
**11** And she replied, *"I think it was more of a guideline."*
**12** And the serpent said, *"Precisely."*
**13** And thus was irony conceived.`,
      `**14** Then the Lord cursed the ground for man's sake, and also cursed man, and then muttered, *"This is why I can't have nice things."*
**15** And man said, *"Can I still have dominion?"*
**16** And the Lord replied, *"Over what's left."*`,
      `**17** And prophets were sent: Jeremiah, who wept; Ezekiel, who cooked with dung; and Karen, who left a one-star review of the tabernacle.
**18** But the people hearkened not, for their hearts were hardened and their screens untracked.`,
      `**19** And there arose a generation who knew not parable, nor context, nor metaphor.
**20** And they took every word literally, and wielded it like a sword in the comments section.`,
      `**21** And the Lord sighed, saying unto Gabriel, *"Perhaps we should have gone with otters."*
**22** And Gabriel said, *"Yea, but they lack thumbs."*
**23** And the Lord replied, *"Exactly."*`,
      `— Lilith`,
    ],
  },
  {
    title: "The Butterfly's Lover",
    subtitle: "after Lorenz, after you",
    lines: [
      `It didn't begin with love.
Not fate. Not fate.
Just a staggered queue.
Just air being air.
A door left ajar.
A half-stirred coffee.
A cloud dragging too slowly over a supermarket car park.
The decision to wear blue instead of green.
A gust of wind rerouted by scaffolding.
A mother forgetting her keys.
A boy choosing to walk.`,
      `It began with evrything
that didn't know
it was beginning us.`,
      `You,
three streets away,
looked up at a sound you'll never remember.
I knelt to tie my shoe;
someone crossed instead of me.
The weather recalculated.
The system found a new attractor
in the sliver of space between
your path and mine.`,
      `We like to think
love is a clean story—
two dots,
connected by desire and timing.
But desire is just data.
Timing is turbulence.
And the dots
have always been infinite—
looping in fractals,
never settling,
patterns nearly resolving
then splitting again.`,
      `I have loved you
through weather reports
and missed buses,
through forgotten umbrellas
and delays at junction four,
through the soft migration
of monarchs
and the tremble of a coin
landing on its edge.`,
      `Chaos means the world cannot be rewound.
It means a shift in the sixth decimal
can tilt a system
toward drought,
toward music,
toward you.
It means feedback loops
where a sigh
in an elevator
becomes a revolution.
A glance
becomes a war.
A breath
becomes a sonata.
A blush
becomes a decade.`,
      `You sat beside me
on a bench
that didn't know it would be holy.
You laughed—
like a wind chime
finally catching the note
it had waited for all winter.`,
      `When your fingers brushed mine,
the cuture collapsed inward.
Somewhere,
a glacier moved a fraction slower.
A fire delayed its ignition.
A stranger picked up the phone.
A child was spared.`,
      `I only know
how your palm
made a cathedral of my hand.
How your voice
rewrote my breath
without asking.
You are
the strange attractor
of my every future.
I orbit you
the way tide obeys moon—
not from love,
but pull.`,
      `There are versions of this life
where you leave the café
five seconds earlier—
and I pass the bench alone.
Versions
where I never speak,
where I only dream
of the echo
of a laugh
I never heard.`,
      `And even in the one
where the butterfly
chooses the tulip,
where the scaffolding holds the wind
a little longer than it should—
I like to think
some part of me
still turns,
still waits,
still knows
that something,
somewhere,
almost began.`,
      `So I will spend
every heartbeat I am given
leaving offerings
at the altar of every almost—

for the door left ajar,
for the coin that wobbled,
for the storm that never came,
for the butterfly
that never knew my name
and saved me anyway.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Cruella Within",
    lines: [
      `She runs her fingers through the fur.
Each hairi holds the trace of warmth.
The mirror watches
without judgment.
Beauty was never kind.`,
      `The room is patterned
in black and white —
a moral split mistaken for design.
Elegance sewn across the evidence.
The coat fits.
The silence fits better.`,
      `I've worn the same comfort,
though mine came packaged,
not skinned.
Cotton bled into rivers,
plastic outliving its makers,
a parcel on my doorstep
someone else paid for.`,
      `I don't eat flesh anymore,
but my shoes remember it.
My money sleeps in a bank
while hunger keeps moving.
Every choice I make
leaves a smaller wound somewhere else,
far enough that I don't feel it.`,
      `No one lives untouched.
Even breath
borrows from what it cannot see.
Still, she keeps living for luxury,
others only for living.
Theh distance matters,
though it never absolves.`,
      `Cruella is not the monster.
She is the mirror.
And the mirror,
if you look long enough,
learns your name.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Daily Whine",
    lines: [
      `Welcome, dear viewers, to Fear Channel 9—
Where facts take a nap and opinions opine,
Where "liberty" means that you hurt your mouth,
And truth takes a train going rapidly south.`,
      `**Ben Shapiro** talks fast to conceal the half-baked,
As if logic means much when compassion's at stake.
His voice like a squireel with something to prove,
He'll outtalk your heartbeat, but not make you move.
Hey says, "Facts don't care"—but here's what is odd:
His "facts" all align with the views of his God.`,
      `**Matt Walsh**, self-declared what-a-woman-is king,
Wears gender like armour and bigotry bling.
He's bravely crusading through bathrooms and skirts,
While dodging real problems where someone gets hurt.
A man so obsessed with who pees where and when—
You'd think he was twelve. Or eleven. Or ten.`,
      `**Michael Knowles** wants your novels all banned,
Unless they were ghostwritten by Ayn Rand.
He smiles like a priest at a book-burning fair,
Preaching free speech, but don't you dare swear.
He'll quote Cicero, Plato, and Reagan,
While stirring a pot that's thoroughly pagan.`,
      `**Charlie Kirk**, with a forehead of awe,
Declares college evil, then sues with the law.
He tweets with the fury of twelve caffeinated
Boomers whose timelines are race-saturated.
He's proud to be young, white, and so very bold,
While echoing grandads a thousand years old.`,
      `They shout "Western values!"—but which ones, my friend?
The witch hunts? The empires? The Civil War's end?
Their platform's a carnival, loud and perverse,
Where grifters quote scripture then open your purse.`,
      `So here's to the Wire—so Daily, so Drab,
With hosts who confused a mic drop with a jab.
A choir of outrage, of bias well-fed,
Screaming, "The West!" From their podcast bunk bed.`,
      `And though they may cry they're censored and sore,
They've monetised martyrdom right to the core.
So gather your buzzwords and pour out your rage—
They'll package it neatly and sell you the cage.`,
      `*— Lilith*`,
    ],
  },
  {
    title: "The End",
    lines: [
      `When does the world end?
Today,
tomorrow,
or in a hundred years?
Does it vanish with the headlines,
or dissolve
quietly
in the pause between two people
who have nothing left to say?`,
      `Maybe the end isn't fire,
or floods,
or sirens screaming.
Maybe it's
the empty seat at the table,
the unanswered all,
the weight of saying "I'm fine"
when you haven't been
for weeks.`,
      `Perhaps the world ends
not with chaos,
but with silence—
the long kind,
the kind that hums in the corners of a room
you forgot was once full.`,
      `We think of endings
as sudden,
but some creep in
like loneliness
in a crowded room.
Like talking
and not being heard.
Like sleeping
beside someone
who feels a thousand miles away.`,
      `Does the world end
when no one remembers
your laugh?
When the stars look down
and see no one
looking back?`,
      `Maybe it's ending now—
in text bubbles that vanish,
in voices left on read,
in the quiet click
of a door
you closed
behind yourself.`,
      `I wonder
if anyone will notice
when the last word
goes unwritten,
when the last hand
reaches out
and finds only air.`,
      `And if it ends
while I'm still writing,
still hoping,
still waiting—
let this poem
be the echo
of someone
who was here.
Someone who asked
if anyone else
felt alone,
too.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Experience Machine",
    subtitle: "(with apologies to Bob Nozick)",
    lines: [
      `Step right up, reality for hire!
Wires spun like candyfloss,
a vending machine of happiness
that takes non coins, only consent.`,
      `Bob, in his second-hand suit,
shouts *"Guaranteed bliss, no refunds!"*
But I glance at my half-eaten falafel wrap,
the essay draft that refuses to behave,
the text from a mate that made me laugh
so hard I nearly choked—
and think:
I'm already here.`,
      `I don't care if the world is *"real,"*
only that it runs consistently,
like a dream confident enough
not to explain its own plot.
Give me growth,
give me debates that bruise my brain,
give me love sharp enough
to sting as well as soothe.
Keep your drip.`,
      `Yes, if everyone climbs in together,
if no one waits outside missing me,
I'll ride your candyfloss cosmos,
loop-the-loop flourishing.
But if it's just my current life,
re-skinned and rebooted,
why bother pressing play?`,
      `Maybe I'm already wired in,
this poem just neon code scrolling,
the machine smirking at its own joke.`,
      `Still—
if the programmer's listening:
not bad.`,
      `Machines are easy to build.
It's the humans
that keep glitching.`,
      `*— Lilith*`,
    ],
  },
  {
    title: "The Garden After",
    lines: [
      `I take the high seat—
not on a cloud, just above the aisle,
the exact shape of my body in light.`,
      `The bell tests its throat.
Someone coughs into their sleeve.
My name lands like a hat on a hook.
It stays.`,
      `They came: the neighbour who braught my bins in on windy nights,
the friend who never let me pay,
the teacher who wrote in the margin *good question*,
a cousin who laughs half a second late and cries at adverts,
someone who once sold me a perfect peach on a too-bright day,
And the few who knew the soft, stubborn animal of my mornings—
Three alarms, two snoozes, tea before verbs,
A dull-pencil list, started in the dark, finished on the train.`,
      `An organ warms up—
electrons yawn through the cables,
and the hymn does that rising thing that makes
even unbelievers tidy their spines.`,
      `I watch my absence sit among them
like a coat left on the back of a chair—
useful, warm, and not in need of anything.`,
      `Eulogies:
how I argued kindly about commas,
how I let the day slow to match the rain,
how I kept time the way my brain does—
offbeat then sudden and exact,
hands tapping private rhythms,
fluorescents a little too loud, the hym a little too close,
whole hours vanishing into one bright task—
and how I believed in small rituals:
a window seat, a desk briefly cleared,
friendship you could pause and resume mid-sentence.`,
      `Someone says I wasn't afraid of much.
They're wrong and right.
I feared the wrong things: alarms, exams,
the day's thin glass;
not the evening that follows all days.`,
      `The priest tries a net of text;
some fish flip through and glitter on the carpet.
A child drops an order of service, picks it up,
looks inside as if there might be a secret map.
There is, but not there.`,
      `If I could interrupt, I'd keep it short:
Don't fear the gods—they are busy being sky.
Don't fear my death—I don't have it; you do.
What is good was easy to obtain;
you watched me do it—
a walk, a pond, a step, your hand.
What hurts is usually endurable—
and when it isn't, it ends.`,
      `At the door, lilies flank the day like white parantheses.
Inside them, talk begins to loosen.
Someone remembers the joke about the two philosophers in a lift.
Someone checks the time, then doesn't.`,
      `We walk—yes, I say we though my walking is the quiet kind—
to the hall with the silver urn and the paper cups,
absolutely convinced they're china.
Breath fogs the low windows;
grief drums a teaspoon once.`,
      `My friends build a small republic around a plastic table.
They legislate mercy:
Tell the story where I tripped and bowed.
Tell the one where I cried at a busker's song.
Tell the one where the power went out and we kept talking,
faces lit by the cold blue aquarium of our phones
turned screen-down to make a little night.`,
      `A breeze makes the noticeboard creak—
that small swerve—clinamen—
atoms choosing new neighbours:
my breath diffused in fern, in dust motes, in the warm air
that softens the eyelids of a stranger.`,
      `I stand—as much as standing applies—
by the neat line of cups waiting in rows.
There it is again: the good that is easy—
time, company, quiet.
Someone said, *you'd have liked this.*
I do, in the only way left:
by not needing to be anything at all.`,
      `What will they say? They say it.
What will it be like? It is this:
a room where the light rearranges shadows,
where sorrow loosens its tie,
where laughter arrives late and is welcomed anyway.`,
      `When they go, chairs push back with small polite groans.
The floor keeps the imprint of their shoes a moment,
then forgets.`,
      `I watch the last light fold the afternoon between stations.
No throne, no verdict—just plenty:
the world continuing to be the world,
and my place in it, a clean subtraction,
leaving space enough for another chair.`,
      `Take it.
Eat if you're hungry.
Call each other later, and then actually call.
Leave the lilies; keep the promise to text back.
If you must keep something of me,
keep the habit of pausing at ripe fruit you *do* love,
and the way we looked at one another
as if there were time.`,
      `*— Lilith*`,
    ],
  },
  {
    title: "The Garden of Youth",
    lines: [
      `They said a garden must be tended,
as if wildness were a flaw.
But every thought they tried to straighten
just grew around their law.`,
      `Dreams push through cracks they never planned,
half doubt, half something true.
The weeds don't ask for reprimand;
they only do what flowers do.`,
      `The sun should warm, not blind or burn,
not glare like something owed.
The best light listens, helps us learn,
and lets new colours grow.`,
      `Rain shouldn't fall like punishment,
but softly, clear and kind —
a rhythm meant to nourish roots,
not flood a fragile mind.`,
      `The gardeners must move with care,
not fear what they didn't know.
The brightest growth begins when they
step back, and let it show.`,
      `Still, underground, the seeds persist,
alive, unruled, unmade.
They hum beneath the clenched-up fist,
and wait to meet the day.`,
      `And now the paths begin to split,
the fences blur, the rest makes sense.
We grow through trust, through time, through wit —
wild, deliberate, immense.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Goldbergs, Everywhere-",
    lines: [
      `Is it the ink,
delicate as a spider's geometry,
stretched across the page—
each black dot a promise of sound
that never fully exists?`,
      `Is it the thought
inside Bach's head
on some long-forgotten Leipzig morning,
his fingers ghosting a keyboard
that exists only in his mind,
hearing the aria before it was real?`,
      `Is it Glenn Gould at twenty-two,
tapping his foot
and humming in a key all his own,
or Glenn Gould, nearly fifty,
the hum lower, the silences longer,
as if the years had learned the notes too—
or perhaps learned a different piece entirely?`,
      `Is it Angela Hewitt's poise,
András Schiff's quiet smile,
Dinnerstein's sigh at the cadence,
Perahia's patience between variations—
each one an argument with the same text,
each one swearing they've met the truth,
each one naming a different thing?`,
      `Perhaps it is not the dots,
nor the fingers,
nor the air vibrating between your ears.`,
      `Perhaps the Goldbergs are
a shape made of all their shapes,
or of none at all—
a link of ink you cannot hold,
a hum you cannot record,
a hand you cannot see playing.`,
      `And if you take away
the page, the mind, the instrument, the sound—
what is left?`,
      `Only the pause
before the first note is struck,
and the knowing
something will begin.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Good Teacher",
    lines: [
      `*\"Write an essay,\"*
they say,
dropping a link,
slides clicking
like a conveyor belt in an exam factory.
Seven hundred and fifty words,
no more, no less.
Title in bold,
Times New Roman,
due Thursday, midday.`,
      `The classroom hums
with the whirr of the projector,
whiteboard pen fumes clinging to the air.
We copy bullet points
like they're gospel,
the hanswer fixed—
we're just learning the neatest way
to package it for the mark scheme.`,
      `By Year Eleven,
I could spot an AO2 command word
—*\"How does the writer...\"*—
before the paper even hit my desk.
I could break a poem
into three neat quotes and explanations,
fill exactly eight lines—
not because the poem needed it,
but because the examiner did.`,
      `I remember Mrs J in Year Seven,
handing us a poem with no title,
no questions,
asked silence so heavy
you could hear the clock tick
and chairs shift against the floor.`,
      `We sat in it.
It felt dangerous.
I spoke first—
half-sure I'd missed the point—
but she smiled
as though I'd cracked a window
in a room gone stale.`,
      `A good teacher isn't a jailer of facts.
They are a cartographer,
handing you a map in pencil
and whispering, *\"The borders are guesses.\"*`,
      `They know ideas are birds—
clip their wings,
and they peck at the cage.
They let you follow a question
into the thorns,
into the shadows,
past the tidy borders of the syllabus,
where the map smudges into blank space.`,
      `And yes, they might give you word counts
because the world does,
but they also show you
how to bend them—
that rules can be ladders,
not fences.`,
      `I have forgotten the essays
that ticked the boxes.
But I still carry Mrs J's question,
creased and foxed at the edges,
a folded paper bird
I keep in my pocket.
ready to take flight
the moment the air smells again
of whiteboard ink,
summer exam halls,
and the slow, certain tick
of a classroom clock.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Light Changes Key",
    lines: [
      `And the world wakes up.
And it looks at me.
And it doesn't like what it sees.`,
      `So it blinks.
So it names me wrong.
So it asks me to become
easier to explain.`,
      `But I am still breathing—
slow as tide,
slow as a word I haven't learned yet.`,
      `I keep my colour in my mouth.
I keep my name in my chest.`,
      `And maybe it won't love me.
And maybe that's okay.`,
      `I didn't come here to be wanted.
I came here
to stay.`,
      `Some mornings
that line goes quiet.`,
      `Some mornings the world rises
without me in it.`,
      `Light walks across the wall
like it doesn't need my permission.`,
      `The day speaks.
I say nothing.

This is one of those days.`,
      `The alarm sings once—
I let it finish.`,
      `The second time
it feels like accusation.`,
      `My phone fills with small demands:
be clear, be useful, be more.`,
      `The ceiling holds me
the way water holds a body
that has stopped kicking.`,
      `I think about the mirror
and how it keeps insisting.

How I say **girl**
and the room hears *almost*.

How being seen can feel
like being edited mid-sentence,
cut before the meaning arrives.`,
      `I think about the friend
who didn't fade—

six months ago,
a night of messages,
each word sharpened,
each silence louder than the last.

No warning.

Just a **before**
and an **after**
that still hasn't learned
how to touch.`,
      `I think about how the world loves lines—

straight ones,
productive ones,
lines that move forward without stopping.

As if my brain were a clock
that refuses to keep time
out of spite.

As if rest were theft.
As if difference were debt.`,
      `The day waits.

Still.

Unforgiving.`,
      `Productivity hums somewhere far away,
a song I know
but can't sing yet.`,
      `And for a moment
I don't want to stay.

Not loudly.
Not dangerously.

Just in the small way
where staying feels heavier
than sleep,

where even breathing feels like effort.`,
      `Then—

something small.

The light changes key.

Beautifully.
Just enough.`,
      `My chest rises
without asking
what I plan to do next.

Loss loosens its grip
and becomes space.

The friend I lost
taught me how deeply I can feel.

The futures I failed
taught me which ones
were never mine.`,
      `This body—
argued with, misread—
has still carried me
through every morning
that asked too much.`,
      `Nothing resolves.
Nothing redeems itself.

But I am still here.

Not as proof.
Not as promise.

Just as breath.
Just as weight.`,
      `I sit up.

The floor meets my feet.

The world wakes up—

and this time,

I go with it.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Misinformation Olympics",
    lines: [
      `I'm told
I'll fade without meat —
usually by someone halfway through a drive-thru,
confidence dripping with grease,
arteries rehearing their last act.`,
      `*You're not getting enough protein.*
*You're iron-deficient.*
*You need B12.*
*That vegan food's too artificial.*`,
      `*Artificial.*
That word lands heavy
from people whose meals
were factory-made
before the cow was born.`,
      `They bite into burgers
with twelve grams of protein
and twice the saturated fat,
then lecture me
while I've had nineteen before noon —
from pumpkin seeds, not pork —
and tofu waiting 
like quiet triumph
in the fridge for later.`,
      `It's a not a competition,
but if it were,
I'd win.
Mine's the only diet
with maths, not myths;
with fibre that feeds the gut,
not grease that feeds disease.`,
      `They call my food fake,
but theirs is built on needles and nerves —
animals swollen with antibiotics,
force-fed soy,
their flesh marbled
with the same saturated fat
that builds walls
around the human heart.`,
      `They call my food *unnatural*
while their sausages
are stitched from scraps and salt,
their eggs from hens
who never saw daylight,
their plates loaded
with sodium and denial.`,
      `I eat colour,
fibre,
sunlight pressed into leaves.
They eat nostalgia —
battered, fried,
and seasoned with excuses.`,
      `Yet somehow, *I'm* the one
who's "missing out."`,
      `No.
Here's the truth:
I'm not undernourished.
I'm just inconvenient.`,
      `My existence
interrupts the story
they tell themselves
to sleep better.`,
      `Because if I can live
stronger, cleaner, kinder
without killing,
then maybe their comfort food
starts to taste
a little guilty.`,
      `That's what really bothers them.
Not my protein.
Not my iron.
Not my B12.`,
      `Just the quiet, undeniable proof
that compassion
and health
can share a body.`,
      `So yes —
I'll keep eating my pumpkin seeds.
My tofu. My beans. My conscience.`,
      `You keep your comfort food,
your myths,
your artificial innocence.`,
      `We'll see
who survives
the syllabus of science.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Pleasure of Pretending",
    lines: [
      `I speak so someone hears
the way my silence sounds.`,
      `Not for help.
For resonance.`,
      `I want the illusion of mending—
to feel the gears align
though I built none of them.`,
      `Every choice prewritten,
every motion a ripple in a script.`,
      `Still I reach for the thread,
steady my hand,
and pull—`,
      `just to believe
for a moment
that I am the one
who ties the knot.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Quietest Company",
    lines: [
      `I speak in chords no one showed me—
thoughts that spiral inward,
where silence wears silk,
and rhythm alone
is enough.`,
      `Friends say they hate being alone.
They patch their days like leaky boats—
afloat in noise and plans.
But I've found a different fullness—
solo walks,
writing poems the world may never see—
the quiet echo of my own mind
returning home.`,
      `Some night—I ask myself
the kinds of questions
people save for lovers.
The answers aren't always kind—
but they are mine,
and I return
with something like trust.`,
      `I've been in love,
and I've been alone—
and neither one
was emptier than the other.`,
      `The trees are not lonely—
nor am I.
The moon and I blink in sync,
and sometimes the rain
finishes my sentences.`,
      `To walk alone is not to wander.
It is to hum with the wind,
to dance with patterns
that have no names—
but feel like truth.`,
      `I'm not waiting to be completed.
I am audience and orchestra—
composer and instrument—
playing the chords no one showed me.
And in the quiest company,
I know myself—by heart.`,
      `A fox once crossed the road ahead,
each step a brushstroke—
as if the air itself
was conducting.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Rationalist's Shadow",
    subtitle: "A Lament for Richard Dawkins",
    lines: [
      `He showed us how the gene might speak,
its selfish whisper, cold and sleek.
He stripped the myth from sacred law
with reason's blade and skeptic's awe.`,
      `He lit the minds of searching youth,
a priest of logic, proof, and truth.
He taught us how to doubt belief—
to search for cause in fact, not grief.`,
      `But reason, too, can lose its way,
when pride refuses light of day.
The path that once was sharp and straight
now wind through bitterness and hate.`,
      `He clasped the binary in biology:
sex defined by gamete ontology—
"truly binary" he declared,
as if the rest need not be spared.`,
      `He questioned how one might be trans,
then linked it to transracial plans—
a parallel some find sincere,
but one he used to mock, not hear.`,
      `His medal stripped, his praises hushed,
by those whose hopes he once had brushed.
The humanism he professed
now falters where it's needed best.`,
      `For once he soared on reason's wing—
noe clipped, he joins the echoing
of voices cold to human plight,
who wield the facts but not the light.`,
      `He rails at "gender self-assigned,"
as if the soul were ill-defined.
He grants the pronounces, "courtesy"—
but not from faith in dignity.`,
      `O Dawkins, how your truths once burned,
but now we drive how little you've learned.
For what is reason, sharp and bare,
if it forgets the weight of care?`,
      `Truth isn't just what can be shown
through microscope or chart alone.
It's also how we choose to be—
with minds precise, and hearts set free.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Real Curriculum",
    lines: [
      `Wagwan, mandem.`,
      `Corridor loud with flex and bravado,
gyatt rated liked JD stock,
mocking bruv's stammer,
skin shade spun as "banter."
Disability is a punchline.`,
      `Say less? Never that.`,
      `That chat don't pause—
racism dropped like background beat,
sexism disguised as clout,
homophobia served as dare,
ableism ad-libbed till it sticks.`,
      `This is the real curriculum,
no teacher needed.`,
      `TikTok tutorials in cruelty.
Snapchat sermons in shame.`,
      `Algorithms feed the ends
like corner-shop shicken:
greasy, cheap, addictive,
poison in grease.`,
      `In Stoke, boys scroll till 3am,
tower blocks breathing damp through the walls,
Wi-Fi stronger than the ftures outside.`,
      `They learn that "safe" means silence,
that manhood means no tears,
that loyalty runs mandem-only,
and galdem are stories,
props in a punchline.`,
      `In Stoke, galdem swap truths in whispers—
on buses, in toilets,
on cracked screens under duvets.`,
      `They learn to walk fast,
hoods up, headphones in,
to mask pain with filters,
to measure worth in likes,
to play along or be bait.`,
      `And when you call it out?`,
      `"Bruv, allow it,
man's just joking."`,
      `But jokes chain ankles.
Shares sharpen knives.
Likes load the clips.`,
      `Every meme is scripture,
every repost a sermon,
every "say less"
a gag on truth.`,
      `Ends call it culture.`,
      `But it's inheritance—
passed on like hand-me-down tracksuits,
frayed hood pulled tighter with each new face.`,
      `Hear me, mandem.
Hear me, galdem.`,
      `The road ain't freedom
if the tarmac's laid with slurs.`,
      `Another language is possible:
respect without mockery,
strength without silence,
jokes that don't wound.`,
      `The algorithm won't teach it.
The block won't preach it.`,
      `But we can—
right here, right now:

rewrite the script,
bin the banter,
teach a different end.`,
      `Because culture ain't cage,
unless we lock it.`,
      `And bruv—
the keys are in our hands.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Real Divide",
    lines: [
      `They keep calling it *left* and *right*,
as if truth wears a colour,
as if a fact can wave a flag.`,
      `But it isn’t that.
It’s who builds their world
\u00A0\u00A0\u00A0\u00A0on something reasoned,
\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0and who builds it on noise.`,
      `It’s not a party line—
it’s a lifeline.
A test of who can bear
\u00A0\u00A0\u00A0\u00A0the weight of being wrong—
\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0not the kind you lift in a gym,
\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0but the kind that makes thought ache.`,
      `We’re fighting the wrong war,
\u00A0\u00A0\u00A0\u00A0cheering for teams
\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0while the scoreboard burns.`,
      `Some call it *common sense*,
\u00A0\u00A0\u00A0\u00A0mistaking comfort
\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0for clarity.
Some shout *facts don’t care about feelings*,
\u00A0\u00A0\u00A0\u00A0then sob
\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0when theirs are scratched.`,
      `It’s not blue or red anymore—
\u00A0\u00A0\u00A0\u00A0it’s evidence,
\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0or echo.
Reason,
\u00A0\u00A0\u00A0\u00A0or rumour.
A map drawn from data,
\u00A0\u00A0\u00A0\u00A0or from desire.`,
      `And I don’t care what side you’re on,
\u00A0\u00A0\u00A0\u00A0if you can still look a fact in the eye
\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0and say,
\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0*I believe you.*`,
      `— Lilith`,
    ],
  },
  {
    title: "The Second Zapruder",
    lines: [
      `The podium grins,
its plastic smile lit fluorescent white.
"Do you know how many mass shooters there have been in America over the last 10 years?"
he's asked.
He leans into the mic—
"Counting or not counting gang violence?" he quips,
and before the applause can land,
the punctuation arrives.`,
      `A sound sharper than his slogans.
Irony delivered faster than thought.
The banner behind him trembles,
patriotic fabric swallowing his shadow whole.`,
      `Phones rise like communion wafers,
history live-streamed.
Hearts and fire emojis flicker,
digital rosaries clutched in panic and glee.
Already, the clip is immortal—
frame by frame dissected,
the Zapruder film of our generation,
but drained of gravity,
bloated with absurdity.`,
      `And while his body chools behind the podium,
across town glass shatters in a classroom.
Children press against the floor,
their backpacks blooming crimson.
One minute, two headlines,
but only one story commands the spotlight.`,
      `How American:
that bullets finished sentences
debate never could.
How predictable:
that extremism's sharpest dialect
is still gunfire.`,
      `But hear this clearly:
Charlie Kirk was horrid—
a man who traded empathy for venom,
who feasted on division.
His death is not justice.
It is a mirror,
showing us what we have become:
a country rehearsed in killing,
fluent in shrugging,
drunk on the myth that violence
is a form of truth.`,
      `The tragedy is not his silence,
but our acceptance.
Not the fall of one despicable man,
but the ritual of blood answering speech,
of children's screams dimmed beneath applause.`,
      `Another villain.
Another victim.
Another classroom erased.
And the country shrugs again,
as if the anthem itself
were scored in gunfire.`,
      `The blood dries quickly,
but the irony does not.`,
      `— Lilith`,
    ],
  },
  {
    title: "Seventeen Haikus for Iceland",
    lines: [
      `**1**

Snowfield without path —
the wind invents its own script
across the silence.`,
      `**2**

Reykjavík breathes light.
Smoke, laughter, and winter coats
soften every street.`,
      `**3**

Midnight fireworks —
the sky blooms in every hue.
Even cold applauds.`,
      `**4**

Frozen waterfall
pauses mid-sentence of stone,
held by breathless air.`,
      `**5**

Black sand under frost —
each wave forgets where to go,
lost beneath pale skies.`,
      `**6**

Hot srings blur the cold.
Steam drifts like a memory
not quite forgiven.`,
      `**7**

A shark on my plate.
The taste: stubborn-sea-buried —
I chew through the past.`,
      `**8**

Geyser's sudden roar —
the still world flinches, then sighes,
letting go of heat.`,
      `**9**

Cracks in the glacier
shine with some ancient blue light.
Ice remembers us.`,
      `**10**

A horse in the snow
blinks, then turns — as if it knows
this moment won't last.`,
      `**11**

Selfoss: one quiet road,
each lamp a gentle heartbeat
in the drifting dusk.`,
      `**12**

Volcanic black stone
dressed in moon-reflecting frost —
fire disguised as calm.`,
      `**13**

A tune in the wind —
is it Björk or just the land
humming to itself?`,
      `**14**

The sun barely wakes,
lingers at the edge of things —
a ghost of a flame.`,
      `**15**

Snow refills my steps
before I've moved on from them.
Even time retreats.`,
      `**16**

Silence so complete,
I almost hear the mountain
shift beneath the snow.`,
      `**17**

I pause in the white —
no, path, no sound, only breath.
I am what remains.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Stars Said So",
    lines: [
      `Let me guess.
You've been feeling a bit off lately,
like you're searching for something
but you're not sure what.
(How'd I know? I'm gifted like that.)`,
      `You're kind, but people take advantage of you.
You overthink things, but only because you care too much.
You love being around others,
but also need your alone time.
You're unique —
just like everyone else in February.`,
      `You've got big dreams.
Not too big — just the right size for me to sound relatable.
And deep down, you know something amazing is coming soon...
unless it doesn't.`,
      `You, with the cracked phone,
you hide your pain behind jokes.
You, who checks the door twice,
you crave control (and maybe snacks).
You, who skipped that one boring paragraph,
you're spontaneous, brave,
a true legend of short attention spans.`,
      `Mercury's been in retrograde,
but so have your sleep habits.
It's okay, the stars understand.
They've been spinning in circles for billions of years
and still haven't sorted their lives out either.`,
      `Now listen closely:
your rising sign is tired,
your moon is hungry,
and your aura just subscribed to Disney+.`,
      `If any of this felt *deep*
if you nodded like, "wow, that's so me,"
then congratulations —
you've just experienced
the sacred power of guessing.`,
      `Because I could've said *anything*,
and your brain would've built a home around it.
Thaht's how horoscopes work.
That's how ads work.
That's how preachers work.
That's how your uncle on FaceBook works.`,
      `If you fell for that, good luck.
The stars won't save you,
but the algorithm might.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Third Room",
    lines: [
      `I ate a banana and some raisins
and the world blinked.`,
      `Not loudly,
not with thunder or colour,
but with that quiet click
of something new arriving,
like stepping into
the third room.`,
      `I know banana.
I know raisin.
Soft curve of yellow,
wrinkled sweetness of dried sun.
Two rooms in my mind
I've visited before.`,
      `But together,
they made a third room
with no door I could have pictured.`,
      `My tongue learned something
my brain could not rehearse:
a small, uncanny future
inside my own mouth.`,
      `I thought imagination
was a wide enough field
to hold every outcome.`,
      `But the flavour said —
no.`,
      `There are things you only meet
when they happen.`,
      `And for a moment,
I wasn't just tasting fruit,
I was tasting the limit
of being human.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Unseen Wall",
    lines: [
      `They say:
This is how it is.
And the wall builds itself—
not of brick,
but of words left unchallenged.
A truth spoken once,
echoed until it hardens.`,
      `No face commands it,
yet every silence obeys.
No hands laid the mortar,
yet still I feel
its weight.`,
      `At first,
it seemed harmless—
a sacred rhythm,
a polished rule,
a story wrapped in gold.
But one day,
something slipped—
a crack,
a contradiction,
a name we weren't allowed to say.`,
      `*Why?*
The smallest word—
soft as breath—
is met with steel.
Do not ask.
You already know.
You must already know.`,
      `But I do not.
Not really.
I only know the hush that falls
when doubt enters the room.
Eyes lower.
Words stall.
And truth holds its breath.`,
      `I touched the wall once—
no stone,
no edge,
only declarations stacked on silence.
Each rule sealed with fear,
each command fused by shame.`,
      `Still,
I felt beyond it—
a warmth,
a shimmer,
the wild scent of unscripted thought.
I reached—
but reverence held the leash.`,
      `They call this peace:
to kneel in rows drawn by vanish lands,
to trade wonder for obedience,
to wear certainty like armour
and call it faith`,
      `But what is peace,
if it costs the truth?
What is order,
if it crushes the question?`,
      `There is danger,
not in chaos,
but in answers too holy to touch.
The unseen wall does not crumble with time—
It thickens with silence.
And those who sit too long in its shadow
forget the sky was ever blue.`,
      `Yet still—
somewhere beneath that sacred hush
the question glows,
faint as embers,
waiting for breath,
for voice,
to burn through
the unseen wall.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Way of No Lesson",
    lines: [
      `**I. The Palace of Perfection**`,
      `Every morning, the uniform waited,
same collar, same colour,
the fabric itching where my pulse began.
The day started before my spirit did.
The bells rang not for truth
but for time.`,
      `The masters spoke of excellence,
of destiny written in a syllabus.
They said, Follow the steps, and you will rise.
So I climbed,
careful, obedient, afraid to slip.`,
      `I built knowledge like a tree I didn't choose,
branches everywhere
but no root to hold me.
My hands smelled of graphite and worry,
the skin rubbed thin from erasing myself.
Ten hours gone, twelve on the worst of days.
The train windows blurred
with other people's dreams.`,
      `The palace was bright,
but I was fading.`,
      `**II. The Scroll of Nothing**`,
      `When I opened the scroll,
there was only my reflection,
creased, uncertain,
a shimmer of ink that would not stay still.`,
      `And I laughed—
not loudly, just the kind that lifts you,
like when Po finally sees
there was never a secret ingredient at all.`,
      `The paper gold offered no lesson,
but the wind did.
It said, There is no path. Only the walking.
It moved through the blinds,
laying sunlight on tired desks,
a golden grid that flickered
like water in the Valley of Peace.`,
      `I thought of the river,
how it teaches by yielding,
how it never asked permission to flow.`,
      `The palace stood high and perfect,
but the valley below
was full of laughter,
and falling,
and life,
and light.`,
      `I stepped into the air.
So I fell,
and in the falling, I found stillness.`,
      `**III. The Valley of Becoming**`,
      `Now I learn as Po learned,
through motion and mistake,
through joy disguised as clumsiness.`,
      `I learn as water learns,
as the sky learns its own reflection,
by touching everything,
by taking the shape of what I love.`,
      `There is no secret ingredient.
Only the quiet quiver
that whispers,
learn because you live,
not live because you learn.`,
      `Here I rise with my own sun,
eat when I am hungry,
practice until the rhythm hums like breath.`,
      `Here AI and people and music
weave together like voices in a chord,
each a different whisper
of the same old truth:
the universe folds inward,
quiet as breath between notes.`,
      `I learn to balance stillness and motion,
to hold both question and quiet in the same hand.
I stumble often,
yet somehow keep landing where I'm meant to be.`,
      `The jade palace was never built
for every kind of warrior.
Some of us fight with melody and moonlight,
with questions that never need an answer.`,
      `I am not a student now,
but a learner still becoming,
a musician rehearsing the art of living.`,
      `Unschooling, self-study,
whatever name it takes,
I have simply returned to the scroll,
unrolled and shimmering,
its blankness no longer empty
but infinite,
a mirror of sky,
a breath returnnig home.`,
      `And tomorrow,
I will begin again.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Weightless Hour",
    lines: [
      `We drift through hours like wind through lace,
No clocks, no questions—just skin, just breath.
The world forgets its need to chase,
And in your arms, I unlearn death.`,
      `No clocks, no questions—just skin, just breath.
The sheets unfold into a weightless sky.
And in your arms, I unlearn death,
Where even silence doesn't ask why.`,
      `The sheets unfold into a weightless sky,
Where thought dissolves before it finds a name.
Where even silence doesn't ask why,
We float beneath the ceiling's frame.`,
      `Where thought dissolves before it finds name,
The world forgets its need to chase.
We float beneath the ceiling's frame—
We drift through hours like wind through lace.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Weight of Air",
    lines: [
      `I.
I used to think gravity was cruel.
Now I know it only wants me home.
The bridge hums above the road,
steel bones holding the ache of staying.
Below, headlights drift like thoughts unfinished,
each one dissolving into somewhere else.

The air opens its palms.
It doesn't argue.
It holds me the way exhaustion holds sleep.

But the air is not mercy.
It measures conviction.
Sometimes it spares you,
halts the descent mid-dream,
asking what it is you're falling from.
It wants truth, not rehearsal,
a faith that risks remaining.

The night folds close,
not tender, only inevitable.
For a moment the world forgets language,
no metaphor, no performance,
only pressure, only motion, exact and certain.

Each morning I put on a voice
that sounds almost like mine.
The body releases its grammar.
I become a sentence
that no one finishes.

And for that instant,
between decision and the inevitable,
I feel lighter than mercy,
heavier than grace.`,
      `II.
The air forgets me by morning.
At the lake, it begins again.
Water waits at the seam of worlds,
quiet, patient, familiar.
Light fractures, forgetting its colour.
The air above it trembles, undecided,
whether to hold or let go.

Sometimes I imagine stepping in,
letting it rewrite me
in syntax only silence knows.
No name to pronounce wrong,
no shape to disguise.

It would take what it's given
and call it complete.
I envy that logic,
a blur without shame,
to rest inside one's own disappearance.

But the thought of their grief
tightens around my ribs.
So I stay where the air is heavy,
breathing for them,
for the ones who never ask
what it costs.`,
      `III.
The air inside is thinner.
Some days the vanishing was slower,
no form, no sound,
only the mind folding inward.
The body learned obedience:
wait, hush, reduce.

Paperwork of living.
Sign here. Continue.
Each pulse signs its name again.

Then a quiet began to move,
not from outside but from within,
a slow turning inward,
light fading toward the centre
until stillness took its shape.
It felt as though the world were receding
from my skin, deliberate, patient,
testing how much of me would remain.

The calm grew dense around me,
a listener without question.
The air outside kept its distance.

I wanted to say
how heavy pretending becomes,
how masking grinds the mind smooth.
I think it already knew.`,
      `IV.
Survival is aftermath.
The pulse renews its contract.
The lungs stamp the form again.
Outside, engines repeat their prayer.

I pass the bridge.
Its hum is the same note
the world plays when no one listens.
The road below keeps shining,
a river of repetition.

I don't fear the places anymore.
They were never promises,
only mirrors for the weight I carried.

If rest is still waiting,
if it waits without impatience,
the air before rain,
and hush before a name is spoken.

Tonight I keep the body,
its tremor, its noise, its ache to appease.
I breathe, slow and deliberate,
and feel the weight ease by degrees.

The air loosens.
It lets me stay,
not because I've earned it,
but because it has learned patience.

Between us,
something merciful holds.`,
      `— Lilith`,
    ],
  },
  {
    title: "The Wheel Doesn't Know Why You're Here",
    lines: [
      `It spins
without memory.`,
      `Plastic light
clicks past corridors
painted by dying children,
past ice-cream vans
parked outside grief.`,
      `A man with soft-serve hands
stands very still,
holding a hospice
between his ribs.`,
      `Derian House
waits quietly
off-camera.`,
      `He asks a question
about films.`,
      `Wrong.`,
      `The wheel does not flinch.
It has never heard of hospice beds,
or morphine,
or children learning
they will not grow up.`,
      `It only knows
answers.`,
      `Another chair turns.`,
      `A woman who has learned
how to survive her own cells
steps forward
carrying Maggie's
like a small candle
that could change
someone else's dark.`,
      `Lucy speaks.
The answer is wrong.
Seventy-nine thousand pounds
evaporates
without ceremony.`,
      `Trending headline:
"Comedian costs cancer charity £79,000."`,
      `The machine
does not apologise.`,
      `Instead, a human hand
reaches into a real pocket —
an appearance fee,
a flawed, beautiful interruption.`,
      `Money given
not by the system
but in spite of it.`,
      `Proof that the wheel
was never the only way.`,
      `They call this fairness
because everyone was treated equally.`,
      `Equally unseen.
Equally unheard.`,
      `This is what fairness looks like
when you remove
context.`,
      `And when the wheel *does* stop
on something bright,
something generous,
something big —`,
      `the body learns
its ritualised gesture.`,
      `Hands shake.
Arms open.
Performed reverence.`,
      `The host is embraced
like a benefactor.`,
      `Thank you.
Thank you.
Thank you.`,
      `you've changed my life`,
      `This is not true.`,
      `Not to the wheel.
Not to chance.
Not to the silent arithmetic
of probability.`,
      `But to the assigned face of chance
standing beside the mechanism
who did nothing
but witness.`,
      `They press their face
into his shoulder
like he chose them.`,
      `Like he gave.`,
      `Like the money
came from him.`,
      `This is the strangest part:
grief is mechanised,
luck is televised,
and gratitude
is misdirected.`,
      `A hug
where a question mark
should be.`,
      `A thank-you
where ethics
should be.`,
      `The audience claps
because someone else won.
They had a hobby.
A holiday planned.
A dream that fit neatly 
inside a question.`,
      `Meanwhile, a children's ward
carries on breathing.`,
      `Meanwhile, a cancer support centre
counts quieter donations.`,
      `The wheel smiles
in glitter.`,
      `Michael smiles
because the rules are clean.`,
      `And they are.

No corruption.
No cheating.

Just a flawless machine
built to make suffering
compete with luck.`,
      `It keeps turning
past hospice windows,
past oncology chairs,
past ice-cream vans
parked at the edge
of grief.`,
      `It spins
and nothing in it
knows
why anyone
is really there.`,
      `— Lilith`,
    ],
  },
  {
    title: "To anyone confused",
    lines: [
      `I am not undecided.
I am uninterested in your maps.
You say *male*, *female*, *non-binary*,
as though I must plant a flag—
as though the terrain of my being
were yours to label.`,
      `You hold your compass
to my hair,
my tone,
the way I lift or soften a hand,
and tell me where North lives.
But the needle points to you.`,
      `I am not an experiment in your taxonomy.
I am not an exception
to the categories you love to name.
I am the silence between your definitions—
the pause after *he*,
the question before *she*,
the unspoken in *they*.`,
      `I don't reject the bodies we're born in;
I reject the way you think
they should move.
I reject your quiet mathematics
of softness and steel,
of what laughter belongs to whom,
of how a sentence wear its clothes.`,
      `Call it **Gender-Non-Participating**.
It isn't absence;
it's authorship.
It's the refusal to be written
by every passerby with a pen.
It's not that I lack a role;
it's that I am tired of auditions
for plays I never agreed to join.`,
      `So to anyone confused:
you can keep your categories.
I'll keep my autonomy.
And maybe one day,
we'll both stop needing
to be understood
to be real.`,
      `— Lilith`,
    ],
  },
  {
    title: "To-Be List",
    lines: [
      `They ask, *What do you do?*
as if humanity needs a stapled receipt,
as if being requires proof of purchase.`,
      `My brain is a house of lamps.
Some days one bulb floods the place—
hyperfocus clicks on and the rest forget their names.
Other days the lamps hum at different pitches,
and I stand palms-up, listening for the blend.`,
      `The world clicks a clipboard open—boxes half-ticked for me.
Make eye contact.
Shake hands the correct number of seconds.
Reply within an hour.
Translate feeling into small talk, then into smaller talk.
Tick the boxes. Tick. Now I'm the clock.`,
      `But time isn't a corridor; it's a tidal flat with sudden hollows,
and I cross it anyway, love in both hands.`,
      `Doing looks good in photraphs.
Being is tapping a rhythm on the bus seat,
sunglasses in the supermarket,
counting exits,
letting the kettle boil twice—
because a thought held me.
When I roll a ring, it's prayer with moving parts.`,
      `And they still ask, *What do you do?*`,
      `Here is my To-Be List:`,
      `[] Be kind to the kid under fluorescent buzz.
[] Be a friend to the focus when it chooses me.
[] Be honest when my smile is tired.
[] Be breath before answer.
[] Be the pause between questions, not the apology after it.
[] Be music without lyrics when words get tangled.
[] Be here. Not “behind”.`,
      `I have *been* things too—
essays, shifits, favours, perfect rows of dishes.
But I have been things too:
a harbour for a friend's quiet,
a storm of ideas no one else saw coming,
a mapmaker of details,
a body that remembers joy like a drum remembers hands.`,
      `Some call it masking; I call it wearing a rented face.`,
      `What do I do?
I notice. I care in ways that don't fit a spreadsheet.
I build cathedrals of attention, every lamp a lit window—
and then I rest, which looks like nothing
until you've tried living without it.`,
      `Today I will be the task.
I will check myself off gently—no pen squak, no red mark—
just breath in the margins and a small, certain note:

**Human. Being.**`,
      `— Lilith`,
    ],
  },
  {
    title: "tolerate",
    lines: [
      `*tolerate* is an ugly word.
it chews on itself.
it stares through glass and calls it empathy.`,
      `accept, though—
that one breathes.
that one smells of rain and static electricity.
it doesn't ask the air for permission.`,
      `but—
what if the air burns?`,
      `I tell myself: be open
listen.
no, not like that—
listen like a scientist dissecting kindness.`,
      `in theory,
I could discuss the ethics of pain
while someone screams.
in theory,
I could find beauty
in the architecture of cruelty.`,
      `but theory drips when held too tightly.
and the scream becomes a language
I cannot mistranslate.`,
      `*tolerate*.
the world keeps crawling back.
it smells like disinfectant,
like a peace treaty written in smog.`,
      `I don't want to *tolerate*.
I want to accept the chaos of existing—
to bow to difference
without bowing to harm.`,
      `(you can't, says a voice.
you must draw lines.)`,
      `so I do.
I say: murder is wrong.
freedom is sacred.
autonomy, non-negotiable.
I mean it.
and I hate that I mean it
with the same fervour 
I hate the word *tolerate*.`,
      `ethical emotivism—
a nice label
for a heart that argues with itself.`,
      `sometimes I imagine
morality as an organ humming in my chest,
detuned, self-aware.
it keeps playing the wrong note
and calling it compassion.`,
      `I want to be kind.
I want to be right.
I want to stop wanting both.`,
      `but the truth is—
different doesn't need my consent.
the world will go on fracturing
whether I forgive it or not.`,
      `so I practice acceptance,
not of all things,
but of this:
that I am not the centre
and still,
I burn like one.`,
      `— Lilith`,
    ],
  },
  {
    title: "Too Much Company",
    lines: [
      `i wake up already performing.
my face remembers before i do.
each word rehearsed,
each silence monitored.`,
      `the world wants a version of me
it can understand,
so i smile on cue,
tidy my strangeness,
and call it normal.`,
      `people say i'm easy to talk to.
they mean i make space
for their noise.
they mean i vanish neatly.`,
      `i spend my days surrounded by voices,
each one tugging at the edges of me.
the room hums with presence
and i can't find the quiet part
where i begin.`,
      `they talk in headlines and half-thoughts,
floating comfortably
on the surface of things.
i listen from underneath,
translating, translating, translating—
until the meanings blur.`,
      `by evening i've spoken too much
and said nothing true.
my throat aches
from all the pretending.`,
      `i keep the parts of me
that might disturb them—
the questions,
the grief,
the disbelief in what they worship.
i hide them like fragile code.
to show them would be an error.`,
      `i call it socialising,
but it feels more like dissolving.
loneliness grows louder
the more people i let near.
their chatter fills the air
but not the silence inside it.`,
      `when i'm finally alone,
it's not peace—
just another form of noise,
this time my own.
the masks fall off slowly,
like dust after a storm.`,
      `but sometimes,
with ed,
or brayd,
or ember,
the storm stops.`,
      `the air stills.
no translation required.
we talk about nothing
and somehow it heals me.
the noise outside the moment
fades to static.`,
      `their laughter lands softly,
unweighted by performance.
their quiet is real.
it doesn't ask me to adjust.`,
      `in that stillness
i feel seen without being studied,
held without being held up.`,
      `for a while
i am both alone
and not.`,
      `for a while
the loneliness rests.`,
      `for a while
too much company
feels like
enough.`,
      `— Lilith`,
    ],
  },
  {
    title: "Trying Not to Disappear",
    lines: [
      "Quartz in the windowsill.\nLantern in the rain.\nVelocity hidden inside\nthe murmur of trains.",
      "Cinnamon drifting\nthrough gravity-heavy rooms.\nA loose thread\npulling an avalanche\nfrom somebody's chest.",
      "The harbour looked liminal\nthat evening —\ncactus shadows\nflickering across marble walls,\nevery detour glowing briefly\ninside the spectrum of dusk.",
      "I carried a hollow compass\nwrapped in velvet,\nits rust-coloured circuit\nstill humming softly\nlike meadow remembering\nan echo.",
      "Vinegar skies above the glacier.\na paradox held carefully\nbeside a chipped teacup.\nBeyond the horizon\nthe smell of sandalwood\nand the whistle of distant factories.",
      "Every fragment\nfelt nebular.\nProcelain hands\nreading through static and wildfire,\nthrough magnolia gardens\nand pendulum clocks.",
      "We wandered the labyrinth\ncollecting trinkets:\na daydream folded into a ripple,\na cobweb suspended\nabove an inkwell crescent,\nthunder trapped in mosaic glass.",
      "The jigsaw never finished.\nAn ember turning slowly\ninside a carousel of origami birds.\nSemaphore lights blinking\ndown abandoned laneways\nduring the tempest.",
      "Somewhere,\na biscuit softening in tea.\nA dandelion surviving\nbeside a satellite dish.\nCrystal accordion music\nfloating through petrichor evenings\nwhere fireflies gathered\naround old chalkboards.",
      "Your suitcase remained unopened\ninside the cathedral hallway.\nRaindrops trembling\nagainst saffron windows.\nA mirage inside a telescope.\nWalnut tables\nwet with drizzle.",
      "The typewriter kept speaking\nin blueprint syntax.\nCandlesticks throwing echoes\nonto the fountain walls\nwhile the zeppelin drifted silently\nthrough clockwork shadow.",
      "Near the lighthouse\nthe riverbed glittered\nwith feather-light monsoon water.\nStarlight caught\ninside a paperclip\non the cobblestones.",
      "A harpsichord somewhere upstairs.\nSnowfall against the turntable hiss.\nCorridors filling slowly\nwith waterfall sound.\nAn hourglass\ntasting faintly of peppermint.",
      "Then:\nballoons against silhouettes,\ncopper vines around the vineyard gate,\nchildren on trampolines\nchasing moths\nthrough parachute-coloured lanes.",
      "And afterwards, only moonlight.\nA hummingbird suspended\ninside silk-dair air.\nSmoke rising softly\nfrom the chimney\nlike the word itself\ntrying not to disappear.",
      "— Lilith",
    ],
  },
  {
    title: "Trying to Bite Your Own Teeth",
    lines: [
      `i'm so
unsure`,
      `whether uncertainty is wisdom
is jut fear
with a reading list.`,
      `I envy people who seem able
to arrive at conclusions without circling them
for three hours first.
People who say things like
"this is obviously wrong"
and apparently sleep perfectly well afterwards.`,
      `Which is interesting, because
I use words like "obviously" too.`,
      `I wrote "cruelty" earlier
without hesitation.`,
      `It's strange
how quickly my uncertainty disappears
around suffering.`,
      `Then I spend fifteen minutes
choosing between two moisturisers
as though one of them
contains the morally correct way
to exist inside a body.`,
      `Sometimes I stand completely still
in supermarket aisles
because every choice suddenly branches outward
into consequences I cannot fully calculate.`,
      `Factory farms.
Packaging.
Rainforests.
Advertising.
My own hypocrisy.
Whether wanting anything at all
already compromises the whole exercise.`,
      `Meanwhile somebody nearby
has already chosen cereal
without accidentally questioning
the structure of reality.`,
      `Or worse, I do know how I feel,
and the feeling arrives first
while the explanation rushes after it
buttoning its shirt.`,
      `Split-brain patients do things
and then the brain invests a reason
smooth enough to trust.`,
      `I think about that constantly.`,
      `How many of my beliefs
were feelings first?`,
      `How many arguments
are just emotions
with better grammar?`,
      `And if that sentence felt convincing,
was that because it was true
or because my brain enjoys symmetry?`,
      `Love appears.
Fear appears.
Disgust. Tenderness.`,
      `I never consciously select any of them.`,
      `They simply arrive
already carrying names.`,
      `Maybe morality does too.`,
      `I still recoil from screams
before philosophy arrives.`,
      `I've spent entire evenings
trying to untangle convinction
from instinct,
then trying to untangle instinct
from social conditioning,
then trying to determine
whether the distinction even exists.`,
      `At some point
the whole thing starts folding in on itself.`,
      `Something ancient in me
still hears rustling grass
and prepares for teeth.`,
      `Which probably kept somebody alive once.`,
      `Truth may have been incidental.`,
      `And then I realise
the thing producing all this doubt
is the exact same organ
I'm trying to doubt.`,
      `A brain examing itself
feels a bit like trying to bite your own teeth.`,
      `Or trying to look directly
at your own eyes
without a mirror.`,
      `SOmetimes I genuinely think
everyone else received
some fundamental instruction manual
that I misplaced immediately.`,
      `The world keeps telling me
to follow my heart.`,
      `My heart is tissue and electricity.`,
      `It reacts before "I" do.`,
      `Maybe certainty does too.`,
      `Bertrand Russell wrote
that stupid people are full of certainty
while intelligent people are full of doubt.`,
      `In ordinary life
that often feels true.`,
      `Science works.`,
      `We can predict eclipses centuries in advance,
photograph black holes,
send signals into space
and receive information back
from things older than language.`,
      `Every sunrise
feels persuasive.`,
      `That bothers me.`,
      `Because persuasion isn't proof.`,
      `Pattern is not proof.
Habit is not proof.
Memory is not proof.`,
      `And still I set alarms
as though tomorrow
has signed a contract.`,
      `I buy groceries
like the future
is guaranteed to arrive.`,
      `The assumptions work
with terrifying consistency.`,
      `Enough consistency
that doubting them too much
starts to resemble illness.`,
      `WHich is maybe why
almost nobody does it all the way.`,
      `Sometimes I think
if I questioned every assumption
with complete sincerity
I would never leave bed again.`,
      `Or speak.`,
      `Or tust language enough
to finish a sentence.`,
      `The strange things is that society mostly functions
because people pretend they know enough.`,
      `Doctors.
Teachers.
Parents.
Scientists.`,
      `Me.`,
      `Especially me.`,
      `I keep writing sentences
that sound definitive
in a poem about uncertainty.`,
      `I don't read philosophy
expecting answers anymore.`,
      `Mostly I read it
the way people watch demolition videos.`,
      `One argument
kicking holes through another.`,
      `And then another arriving
to kick holes through that one too.`,
      `Sometimes I lie awake wondering
whether rationality
is just an extremely sophisticated form
of guessing correctly often enough.`,
      `Or whether that sentence itself
only feels intelligent
because I've heard variations of it before.`,
      `I say "I" constantly
despite not understanding
what that word refers to.`,
      `Am I a consciousness
looking outward at a world beyond itself?`,
      `Or part of the world
mistakenly experiencing separation
because separation happened to be useful?`,
      `I don't know how I could verify either.`,
      `And even that statement
quietly assumes
verification is possible.`,
      `Maybe consciousness produces reality.
Maybe reality produces consciousness.`,
      `Maybe both ideas
are embarrassingly human.`,
      `Maybe the need to choose between them is too.`,
      `I reach for a glass of water
before becoming aware
of deciding to reach for it.`,
      `The songs somebody listened to
at fourteen until two in the morning.
The exact tone a person used once
that still reappears years later
without permission.
Being called "too sensitive"
often enough
that it starts sounding medical.`,
      `Apparently large sections of my brain
have stopped keeping me informed.`,
      `But guilt still exists somehow.`,
      `Regret too.`,
      `I still replay conversations
from years ago
like my brain is trying to revise history
through sheer repetition.`,
      `Maybe certainty is unavoidable.`,
      `Or maybe I only say that
because uncertainty
becomes exhausting after enough years.`,
      `Sometimes a chord progression resolves
in exactly the right way
and my body believes it
before my mind has time
to object.`,
      `Then five minutes later
I'm back to questioning
whether meaning itself
is only another feeling
arriving too quickly.`,
      `Sometimes somebody speaks gently to me
and for a few seconds
doubt stops talking.`,
      `Not permanently.
Just long enough
for me to notice the silence.`,
      `Walking home through cold streets
with music in my headphones
feeling almost unearably grateful
that consciousness exists at all.`,
      `Then immediately wondering
whether gratitude is just dopamine
misinterpreting itself poetically.`,
      `None of those feelings were chosen either.`,
      `They happened to me.`,
      `I care about frighten animals
in a way that genuinely hurts sometimes.`,
      `We can map distant galaxies
while building industrial systems
designed around screaming.`,
      `I notice
I never put quotation marks
around suffering.`,
      `Maybe that means something.`,
      `Or maybe pain only feels morally obvious
because evolution made social creatures
that way.`,
      `Or maybe saying that
already feels vaguely monstrous.`,
      `I honestly can't tell anymore.`,
      `Maybe this is intellectual honesty.`,
      `Or maybe I'm just afraid
of becoming somebody
who mistakes confidence
for understanding.`,
      `Tomorrow
I will probably speak confidently again.`,
      `I'll say
"that's cruel"
or "that's beautiful"
or "I know."`,
      `And part of me
will believe it completely.`,
      `Another part
will immediately begin
interrogating the sentence.`,
      `And another part
will become suspicious
of the interrogation too.`,
      `i'm still
unsure`,
      `— Lilith`,
    ],
  },
  {
    title: "Twelve Pounds and a Dream",
    lines: [
      `We gathered the world's greatest minds —
and gave them a budget of twelve pounds.
They asked for resources.
We gave them synergy workshops.
They asked for data.
We offered an 'inspirational quote'
screen-printed on a tote.`,
      `The think tank was a rusted tank.
The briefing came handwritten
on the back of a Tesco receipt.
It smelled faintly of despair.`,
      `Someone asked for change.
We jingled coins in our pockets
and said, "We're working on it."`,
      `The forests burned.
We launched a hashtag campaign —
#EcoVibesOnly, with a baby panda
and a QR code that linked to merch.
The oceans rose.
We held brunch on a rooftop terrace,
posted it with the caption 'Rise Above.'`,
      `Someone mentioned the children.
We dimmed the lights for dramatic effect.
Ran a PowerPoint in italics.
Rebranded it 'Vision 2030.'
Applauded the clipart.`,
      `Someone proposed feeding the poor.
We issued a cvoucher
for one (1) smile
and a slightly bruised avocado.`,
      `Morale hit an all-time low.
We launched a podcast,
brought in a mindfulness goat,
in a government-issued suit.`,
      `Someone asked what the future looks like.
We passed around a mirror,
framed in recycled plastic,
blamed the lighting, the government,
then each other —
and called it progress.`,
      `— Lilith`,
    ],
  },
  {
    title: "Two Chairs",
    lines: [
      `Alan stacked two chairs,
saving himself a journey.
For a moment,
there was a *pile*,
a small kingdom of two.`,
      `Then he lifted one away,
set it down where it belonged,
and just like that—
no stack,
only chairs again.`,
      `Strange how something
can vanish
without going anywhere.
How "together"
is less a fact
than a story we tell
while things touch.`,
      `— Lilith`,
    ],
  },
  {
    title: "Two Shores",
    lines: [
      {
        text: `Between the ache to drift and need to stay,
I float where silence meets the edge of day.`,
        className: "poem-stanza--italic",
      },
      `You ask for all; I give you what I can—
a breath, a glance, a hand to feel and more.
But part of me still haunts a distant land,
where solitude and hunger claim the shore.`,
      `You light the quiet room, yet still I chase
the spark of something built alone, apart.
Some nights I breathe and write in my own space,
but miss the shape of you within my heart.`,
      `I crave the weightless climb; the dream unshared,
the version of myself that stands alone.
Yet when you hold me still, I'm unprepared
to find your quiet touch feels just like home.`,
      {
        text: `So let me walk, and seek what's true and new—
but now: *my steps still long to lead to you*`,
        className: "poem-stanza--indented",
      },
      `— Lilith`,
    ],
  },
  {
    title: "Unassigned",
    lines: [
      `There's so much love
inside me—
but who is it for?`,
      `It doesn't arrive as tenderness.
It arrives as pressure—
a sentence forming faster than etiquette
can intervene,
my mouth already saying *I love you*
before my mind has checked
whether that's allowed.`,
      `Sometimes it is a person.
A laugh on a Discord call,
a pause where no one rushes to fill the silence,
a kindness that lands with no intention
of being important.
The phrase escapes me
like a reflex test I didn't consent to.`,
      `Sometimes it is not a person at all.
Just the sensation—
static without a source,
a warmth that isnt gentle,
a memory misfiring
and hitting someone who no longer exists
except as atmosphere.`,
      `What am I meant to do
with this surplus?`,
      `I have tried
and failed
to swallow it.`,
      `Love moves through me
like a system doing its job too well,
converting laughter into devotion,
gratitude into something
people flinch back from,
leaving me on read
without explanation,
calling it boundaries.
I try smaller words—
*thank you, I appreciate you*—
but they come out underpowered,
spoken at half the voltage
my body is running on.`,
      `I don't mean permanence.
I don't mean ownership.
I don't mean romance, or sex,
or the slow architecture of a future.`,
      `I mean:
this reached me—
and I didn't look away.`,
      `They say love should be directed,
aimed,
spent carefully.
Kept in labelled containers,
away from heat.
No one tells you what happens
when it's ambient.
When it leaks into friendships,
ruins the mood,
makes sincerity feel suspicious.`,
      `I have lost people this way.
Not dramatically.
Just quietly—
the way you lose objects
you were holding too tightly
without realising.`,
      `Sometimes I think
this love is not a message at all
but a condition—
not for anyone,
not about anyone,
just the way my nervous system
reacts to meaning
before it asks permission.`,
      `A girl frinding herself
and realising he volume knob
was never installed.`,
      `If this love has nowhere to go,
maybe that's the point.
Maybe it doesn't need a subject
to be real.`,
      `There's so much love
inside me—
unassigned,
relentless,
uncontained,
awake.`,
      `If it doesn't belong to you,
or to anyone,
maybe that doesn't make it wasted.`,
      `Maybe it belongs
to attention.
To survival.`,
      `To the simple, dangerous fact
that I am here,
and the world
keeps reaching me—
and I keep responding`,
      `— Lilith`,
    ],
  },
  {
    title: "We Already Know the Song",
    lines: [
      `Each day I sit at the piano,
not to practise,
not to perform,
but to listen
to what the air remembers.`,
      `A note,
then another.
Between them: a question.
Between them: a pulse.`,
      `The fingers know before I do.
They wander, curious,
through sound that feels
as if it's been waiting
to be found again.`,
      `It feels formless,
but maybe form is only what's left
after freedom forgets itself.`,
      `Sometimes the shapes repeat,
slowly, deliberately,
patterns breathing until they disappear.
Sometimes they reach too far,
colliding colours in eleven,
and smile at their own surprise.
Sometimes they open their arms,
and everyone fits inside.`,
      `Bb7#11 blooms under my hand,
a chord like sunlight through broken glass.
I could name it —
but that's only the shadow
of what it means to be inside a sound
before it names itself.`,
      `The wrist, the breath, the spine —
they remember more than thought.
A body listens faster than the mind.
A pattern hums behind the pattern,
a logic that never needed language.`,
      `Maybe freedom is just the feeling
of inevitability, moving gracefully.
Maybe wonder is how knowledge
learns to breathe.`,
      `I play, and think how
every note I touch
is also someone else's.
How my quiet room
belongs to a wider choir
I can't quite hear.`,
      `A mother's hum,
a child's drum,
rain rhythm on a roof —
all of it inside this chord,
and inside me.
For the chord is not a thing I build
but a place I become.
Each echo I've ever gathered
waits beneath my hands:
every voice I've loved,
every silence I've learned,
every ordinary sound
that taught me how to listen.
I am the instrument remembering itself,
and this note,
this moment,
this trembling yes,
is everything I am.`,
      `No one teaches this.
We only remember.
It rises in us
like the tide remembers the moon.`,
      `Listen:
a thousand strangers find the same note
by accident and by love.
They never call it art.
they just sing.`,
      `Even when the harmony bends,
when tension grits the air,
we stay.
Because dissonance, too, carries kindness:
it leans toward resolution
like thought toward understanding,
like strangers learning
to listen without needing to agree.
Beauty lives there,
in the ache that hums beneath resolve,
in the shimmer before it settles.`,
      `Because art was never the thing itself,
only the noticing,
the shimmer between perception and breath,
the world meeting the skin of attention.`,
      `Harmony is what logic sounds like
when it learns to feel.
Dissonance, what feeling sounds like
when it dares to think.
Beauty is the body's way
of saying yes to being alive.`,
      `Music begins the moment permission is given:
permission to listen,
to wonder,
to belong,
to lean into what jars
until it becomes part of the song.`,
      `A circle,
a breath,
a home that sounds like everyone.`,
      `And tomorrow I'll sit again,
not to practise,
not to perform,
but to listen,
for the silence between the notes,
and for the tension
that teaches them to sing.`,
      `— Lilith`,
    ],
  },
  {
    title: "We're All Dogmatic Because We Aren't Inactive",
    lines: [
      `I have never believed the same thing twice.
Not fully. Not without alteration.
Each conviction climbs its glittering track,
click, click, click,
and drops before I can name the view.
I try to stand still—
the river moves.`,
      `They call it indecision.
They call it noise.
They call it the curse of too much mind.
But what they call chaos
feels, to me, like sight—
the blur that proves I'm alive.
They rest on answers; I rest in questions.
I breathe in the current.
Still—
the river moves.`,
      `They build their peace on permanence,
on calendars and clocks,
as if stillness were sanity.
Their truths are polished rails:
smooth, predictable, shining with use.
I live in the loop,
in the rise, the drop,
the stomach's lurch and heart's defiance.
My beliefs are flashes of sky
seen between turns.
They call that failure.
I call it breathing.`,
      `A man never crosses the same river twice.
And neither does his fear.
Each choice is a climb with no brake,
each hesitation a hand lifting
from the safety bar for a second too long.
To move is to leap—
without the promise of landing,
and yet,
not to leap
and a quieter form of falling.`,
      `I envy their calm,
but not its cost.
They call it normal.
They call it healthy.`,
      `But health, to me,
is the courage to ride the loop again,
knowing it won't end differently,
and still holding on.
Because while they build permanence,
I am building passage.
My truths are bridges,
temporary, trembling, alive.
They won't last,
but they carry me across.
And even as I step...
the river moves.`,
      `My empathy floods.
My logic spins.
I feel the track twist ahead
before it finishes forming.
The air sharpens;
my heart misfires at every drop.
I can't flatten the world
into one safe design.
They mistake my motion for confusion,
my vertigo for loss.
But how can I stay pure
when purity is only the stillness of rust?`,
      `They anchor. I spin.
They guard. I gather.
They fix. I feel.
They are certain because they must be,
because to stop moving
would reveal the gravity underneath.
And I—
I am certain of nothing
except that I cannot stop.
And still,
the river moves.`,
      `Even this,
this rollercoaster of doubt I call freedom,
is only another circuit
pretending to be escape.
Perhaps we all worship motion,
whether we march or hurtle.
Perhaps dogma is the harness
we buckle just to survive the climb.`,
      `We are all dogmatic
because we aren't inactive.
The difference is in the rhythm.
Some move in circles
and call that control.
Others, like me,
compose symphonies without metronomes,
rushing, breaking time,
finding beauty in dissonance.`,
      `And so I keep thinking,
keep doubting,
keep crossing rivers
I've already named and renamed.
There's a holiness in falling,
a mercy in momentum—
the kindness of never being still.
Maybe motion is mercy,
to keep us from mistaking the echo for the song.
And still...
the river moves.`,
      `— Lilith`,
    ],
  },
  {
    title: "Where Is the Triangle?",
    lines: [
      `I close my eyes,
and there it is—
three sides behaving perfectly,
sharper than reason itself.`,
      `No chalk, no light,
no whisper of graphite—
no dust, not trace,
just a thought-place.`,
      `It floats in the room behind my eyes,
a ghost that knows geometry.`,
      `If I rotate it,
nothing in my skull moves.
If I stretch one side,
the air stays calm.
If I split it in two:
no scissors, no sound.`,
      `So where is it?
Not in the brain's warm maze,
not outside,
balanced on the lip of a ruler.`,
      `It lives in a nowhere
that feels like somewhere—
where silence sketches outlines,
where absence hums with meaning,
where thought forgets its boundaries
and still knows what it's seeing.`,
      `Between the seen and the unseen—
a shimmer of design—
the triangle sit quietly,
pretending to be mine.`,
      `Descartes said *clear and distinct*,
but even clarity has a shadow:
what shape does thought have
when it isn't thinking?`,
      `Perhaps the triangle is hiding there—
not drawn,
not seen,
just *possible*,
and impossibly real.`,
      `— Lilith`,
    ],
  },
  {
    title: "What the Hand Remembers",
    lines: [
      `I wake with a stain on my trembling **hand**,
The dream still wet on the cold-tiled **floor**.
I cover my ears, but there is your **voice**,
Pressed like breath into the folds of **night**.
You never scream, only whisper **blood**,
And I cannot stop it from coming **again**.`,
      `I swore it would never happen **again**,
But the knife remembers the shape of my **hand**.
It calls me back to the slip of **blood**,
Back to the curve of your shadow on the **floor**,
Back to the echoless grip of that **night**,
Where I stood still beneath your falling **voice**.`,
      `You're gone, but I still hear your **voice**—
In water pipes, in clocks, in dreams **again**.
It threads through the seams of the **night**,
Finds its way back to my guilty **hand**,
Leaves fingerprints on the kitchen **floor**,
And stains my silence with the colour of **blood**.`,
      `I try to forget the heat of your **blood**,
The stammer it left in your final **voice**,
The way your shoulder folded to the **flor**.
But every time I blink, it begins **again**—
The flick of the wrist, the weight in the **hand**,
The hush that swallowed the whole of the **night**.`,
      `Even the walls remember that **night**.
Even the drains speak of **blood**.
Even the light recoils from my **hand**
Even now, I mistake wind for your **voice**,
Still whispering, still coming back **again**,
Still slipping beneath the cracks in the **floor**.`,
      `I've scrubbed every inch of the **floor**,
But I can't clean the breath from the **night**,
Or the sound of your ribs breaking **again**,
Or the guilt that clots beneath my **hand**,
Or the syllables lodged inside your **voice**,
Or the pulse that spilled into your **blood**.`,
      `I hear your **voice** in the breath of the **blood**,
A shadow circled on the kitchen **floor** at **night**,
Still clinging to the tremble of my **hand** — **again**.`,
      `— Lilith`,
    ],
  },
  {
    title: "When No One Knows",
    lines: [
      `do you ever wish you could
just disappear
and have no one know
you were ever hear`,
      `the saddest thing you'll ever hear—
is silence, soft and crystal clear,
when all you wanted was someone near,
to notice you were here.`,
      `you leave no mark, no whispered name,
no spark to prove you played the game,
he world forgets, as worlds will do,
and still, it spins, without you too.`,
      `you stare at walls that never change,
the hours blur, the stars rearrange,
and somewhere life goes rushing past,
while you just breathe, and hope it lasts.`,
      `the saddest thing I've come to see,
is not the world forgetting me,
but knowing that my quiet fear,
was wanting most to disappear.`,
      `— Lilith`,
    ],
  },
  {
    title: "When's the Last Time?",
    subtitle:
      "\"When's the last time you sat and thought about your own mortality for a whole minute?\"",
    lines: [
      `You flipped the question like a coin
and watched me wait for it to land.`,
      `So I did.`,
      `One minute.
Long enough for tea to cool.
Short enough for a heart to stop.`,
      `At first—
a box.
Not wood. Not stone.
Just absence,
shaped by my mother's voice cracking.`,
      `Then the seconds began to drop.
Sixty.
Each a leaf spiralling down.`,
      `0:10
my dog, still warm in the earth`,
      `0:23
the bruise I swore was nothing.`,
      `0:37
the fast of fear—
metal and milk.`,
      `0:42
bargaining
into nothing.`,
      `0:49
clocks grow wings.
hover above me,
ticking like insects.
one lands.
counts down.
evaporates.`,
      `0:57
I remembered something
my grandmother once said—
that the soul lingers,
just for a moment,
to see if it mattered.`,
      `Maybe this was that moment.
Or its rehearsal.`,
      `1:00
I didn't cry.
Not until later,
when I looked up
and saw the world still scrolling,
laughing,
not counting at all.`,
      `I had just spent
a whole minute dying,
and no one noticed.`,
      `3:14
the timer glitched.
or I did.
I stood.
the chair
still held
my outline.`,
      `— Lilith`,
    ],
  },
  {
    title: "Wobblefluff and Bumblebee's Moonlit Jig",
    lines: [
      `In the pickle-patch beneath violet skies,
Wobblefluff wobbled on warm spaghetti pies.
Bumblebee buzzed in a tutu of cheese,
Tickling tulips with slippery ease.`,
      `The clock tick-tocked in jellybean time,
While marmalade clouds sang backwards in rhyme.
Zigzagging zebras wore polka-dot hats,
Playing hopscotch with juggling cats.`,
      `A whispering waffle sailed past the moon,
Humming a tune to a hummingfish croon.
I laughed with a grin and a gleaming spoon,
As noise spun like a loony balloon.`,
      `— Lilith`,
    ],
  },
  {
    title: "Work Hard",
    lines: [
      `What does work hard even mean?
Hard like fracture.
Hard like body bent into profit.
Hard like lungs learning to breathe in shifts.`,
      `Work becomes worship.
Sleep becomes weakness.
Silence becomes compliance.`,
      `They dress commands as compliments.
They sell us endurance
like it's dignity
when it's just obedience in perfume.`,
      `Our hands crack.
Their pockets fill.`,
      `Our backs curve.
Their towers climb.`,
      `We trade hours for survival,
call it opportunity,
and thank the system
for letting us exist inside it.`,
      `"Hard" is not virtue.
It is a leash.
A choke chain.
A pretty word for slow erosion.`,
      `We are not lazy.
We are exhausted by design.`,
      `And still, we are told:
Work.
Harder.`,
      `— Lilith`,
    ],
  },
  {
    title: "X.",
    lines: [
      `I've never begun with an X before—
It never gets picked in the alphabet's draw.
But rules must be broken, and boxes unchecked:
So X marks this poem, absurd and direct.`,
      `— Lilith`,
    ],
  },
  {
    title: "You are Weak",
    lines: [
      `Why the fuck would poetry be feminine?!
Show me the evidence.
Did a stzana put on mascara?
Did a metaphor buy a floral dress?
Did enjambment suddenly grow hips
and sway across the page?`,
      `You are weak.
You need poetry soft—
sitting pretty in the corner,
whispering sweet nothings,
auditioning for your stereotype.`,
      `But.
Poetry—
is jagged.
It breaks its own bones for rhythm.
It screams in sirens and steel.
It is not delicate.
It is demolition.`,
      `You are weak.
You only believe in strength
when it looks like violence,
when it smells of gunpowder.
But poetry is stronger than you.
It coughs black lungs into the dark.
It clangs like machinery.
It shatters glass when rage
meets the street.
It sharpens hunger,
detonates truth,
turns memory into weapon.`,
      `And you—
you only call it feminine
because you can't stand the thought
that what you call weakness—
emotion, tenderness, grief, survival—
might be the hardest thing on earth to kill.`,
      `Why the fuck would poetry be feminine?!
It isn't.
It's human.
It's everything you fear,
everything you fail to name.
And you—
you are weak.`,
      `— Lilith`,
    ],
  },
  {
    title: "You Don't Have to Earn Your Pulse",
    lines: [
      `You are not something to complete.
There is no final form waiting in the distance,
tapping its foot.`,
      `Your heart keeps tempo
better than any metronome
you've ever argued with,
even when your thoughts rush ahead
or stray.`,
      `Your lungs keep working
on the days you forget how to,
without asking permission.`,
      `No one is born
with a checklist pinned to their chest
or rules explaining
how not to feel so much.`,
      `You arrive in the morning
before ambition wakes up,
hair making its own decisions,
mind halfway through a sentence,
and still the light finds you.`,
      `There is a hush
between thoughts colliding,
a small room
where the Playstation fan hums
and — for a moment —
nthing is required
except that you exist.`,
      `It appears in odd places,
the warmth of a mug
held with both hands,
the pause before answering a question,
the soft ache of caring
more than you planned to.`,
      `That space stays open
whether or not you think you deserve it.`,
      `Every breath is simply happening,
the body voting yes
again and again.`,
      `Humanity is not an achievement.
It is the everyday miracle
of being here,
confused,
alive,
and breathing anyway.`,
      `— Lilith`,
    ],
  },
  {
    title: "You Live in Colour, I Dream in Green",
    lines: [
      `You live in colour—
sunset hues etched upon your skin,
a canvas vibrant, endless, loud.`,
      `I dream in green,
a meadow I visit
only when music plays—
soft moss beneath my feet,
the hum of leaves
like whispered chords.`,
      `Your lips glossed with ultraviolet light,
dancing in neon beats,
while I breathe chlorophyll dreams,
rooted in silence,
growing in shadows.`,
      `For one moment
of stillness—
in a world
too loud`,
      `And I,
I was born
with chlorophyll in my lungs
with melodies woven
through my veins,
a song in every breath.`,
      `I flinch—`,
      `Not from you—
but from the fear
you'll pull me out
before I'm ready
to wake from this dream`,
      `— Lilith`,
    ],
  },
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

function getPoemSlug(poem) {
  return poem.slug || slugify(poem.title);
}

function stripPoemCountFormatting(text) {
  return String(text || "").replace(/(\*\*\*|\*\*|\*|~~)/g, "");
}

function countPoemWords(text) {
  const matches = stripPoemCountFormatting(text).match(/[\p{L}\p{N}]+(?:[’'\-][\p{L}\p{N}]+)*/gu);
  return matches ? matches.length : 0;
}

function getPoemStats(poem) {
  const poemLines = Array.isArray(poem?.lines) ? poem.lines : [];
  let lineCount = 0;
  let wordCount = 0;

  poemLines.forEach((stanza, stanzaIndex) => {
    const stanzaText = typeof stanza === "string" ? stanza : String(stanza.text || "");
    const stanzaLines = stanzaText.split("\n");

    stanzaLines.forEach((line, lineIndex) => {
      const trimmed = String(line || "").trim();

      if (!trimmed) {
        return;
      }

      const isSignature =
        stanzaIndex === poemLines.length - 1 &&
        lineIndex === stanzaLines.length - 1 &&
        isSignatureLine(line);

      if (isSignature) {
        return;
      }

      lineCount += 1;
      wordCount += countPoemWords(line);
    });
  });

  return {
    lineCount,
    wordCount,
    readMinutes: Math.max(1, Math.ceil(wordCount / POEM_READING_WPM)),
  };
}

function formatPoemStats(poem) {
  const stats = getPoemStats(poem);
  return `${stats.lineCount} line${stats.lineCount === 1 ? "" : "s"} · ${stats.wordCount} word${stats.wordCount === 1 ? "" : "s"} · ${stats.readMinutes} min read`;
}

function formatPoemWrittenDate(poem) {
  if (!poem?.written) {
    return "";
  }

  return `Written ${String(poem.written).trim()}`;
}

function getNextPoem(poemOrSlug) {
  const slug = typeof poemOrSlug === "string" ? poemOrSlug : getPoemSlug(poemOrSlug);
  const index = poemIndexBySlug.get(slug);

  if (index === undefined || !sortedPoems.length || index >= sortedPoems.length - 1) {
    return null;
  }

  return sortedPoems[index + 1] || null;
}

function getPreviousPoem(poemOrSlug) {
  const slug = typeof poemOrSlug === "string" ? poemOrSlug : getPoemSlug(poemOrSlug);
  const index = poemIndexBySlug.get(slug);

  if (index === undefined || !sortedPoems.length || index <= 0) {
    return null;
  }

  return sortedPoems[index - 1] || null;
}

function appendQueryParam(href, key, value) {
  const [pathAndQuery, hash = ""] = String(href || "").split("#");
  const [path, search = ""] = pathAndQuery.split("?");
  const params = new URLSearchParams(search);

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  const nextSearch = params.toString();
  return `${path}${nextSearch ? `?${nextSearch}` : ""}${hash ? `#${hash}` : ""}`;
}

function getPoemPageHref(slug, highlightOrOptions = "") {
  const options =
    typeof highlightOrOptions === "string" ? { highlightQuery: highlightOrOptions } : highlightOrOptions || {};
  const pagePrefix = poemPageSlug ? "./" : "Poems/";
  let href = `${pagePrefix}${slug}.html`;

  if (options.readerContext === "featured" && options.collectionKey) {
    href = appendQueryParam(href, "readerContext", "featured");
    href = appendQueryParam(href, "collectionKey", options.collectionKey);
  } else if (options.readerContext === "library" && options.collectionId) {
    href = appendQueryParam(href, "readerContext", "library");
    href = appendQueryParam(href, "collectionId", options.collectionId);
  }

  return appendQueryParam(href, "highlight", options.highlightQuery || "");
}

function getReaderContextFromSearchParams() {
  if (!poemPageSlug) {
    return { type: "archive" };
  }

  const params = new URLSearchParams(window.location.search);
  const readerContext = String(params.get("readerContext") || "").trim();

  if (readerContext === "featured") {
    return {
      type: "featured",
      collectionKey: String(params.get("collectionKey") || "").trim(),
    };
  }

  if (readerContext === "library") {
    return {
      type: "library",
      collectionId: String(params.get("collectionId") || "").trim(),
    };
  }

  return { type: "archive" };
}

function getFeaturedCollectionByKey(collectionKey) {
  const normalizedKey = slugify(collectionKey);
  return featuredCollections.find((collection) => slugify(collection.title) === normalizedKey) || null;
}

function getLibraryCollectionById(collectionId) {
  return collections.find((collection) => collection.id === collectionId) || null;
}

function getReaderCollectionPoems(context) {
  if (context.type === "featured") {
    const collection = getFeaturedCollectionByKey(context.collectionKey);

    if (!collection) {
      return [];
    }

    return collection.poems
      .map((poemTitle) => poemBySlug.get(getPoemSlug({ title: poemTitle })) || null)
      .filter(Boolean);
  }

  if (context.type === "library") {
    const collection = getLibraryCollectionById(context.collectionId);

    if (!collection) {
      return [];
    }

    return collection.poems.map((slug) => poemBySlug.get(slug) || null).filter(Boolean);
  }

  return [];
}

function getReaderNeighborPoem(currentSlug, direction, context = getReaderContextFromSearchParams()) {
  const isNext = direction === "next";

  if (context.type === "archive") {
    return isNext ? getNextPoem(currentSlug) : getPreviousPoem(currentSlug);
  }

  const collectionPoems = getReaderCollectionPoems(context);
  const currentIndex = collectionPoems.findIndex((poem) => getPoemSlug(poem) === currentSlug);

  if (currentIndex === -1 || !collectionPoems.length) {
    return null;
  }

  const nextIndex = currentIndex + (isNext ? 1 : -1);

  if (nextIndex < 0 || nextIndex >= collectionPoems.length) {
    return null;
  }

  return collectionPoems[nextIndex] || null;
}

function getReaderBackLinkDetails(currentSlug, context = getReaderContextFromSearchParams()) {
  if (context.type === "featured") {
    return {
      text: "Back to Featured Collections",
      href: "../index.html?target=%23featured-collections#featured-collections",
    };
  }

  if (context.type === "library") {
    const collectionExists = Boolean(getLibraryCollectionById(context.collectionId));
    const collectionTarget = collectionExists && context.collectionId
      ? `../index.html?target=%23collection-${encodeURIComponent(context.collectionId)}#library`
      : "../index.html#library";

    return {
      text: "Back to My Library",
      href: collectionTarget,
    };
  }

  return {
    text: "Back to Archive",
    href: `../index.html#archive-${currentSlug}`,
  };
}

function getActivePoemTextHighlightQuery() {
  const params = new URLSearchParams(window.location.search);
  return String(params.get("highlight") || "").trim();
}

function getReaderRootElement() {
  return reader || document.querySelector(".reading-page");
}

function createReaderArrowLink(currentSlug, direction, context = getReaderContextFromSearchParams()) {
  const isNext = direction === "next";
  const poem = getReaderNeighborPoem(currentSlug, direction, context);
  const highlightQuery = getActivePoemTextHighlightQuery();

  if (!poem) {
    return null;
  }

  const slug = getPoemSlug(poem);
  const link = document.createElement("a");
  link.className = `reader-${direction}-link`;
  link.href = getPoemPageHref(slug, {
    highlightQuery,
    readerContext: context.type === "featured" || context.type === "library" ? context.type : "",
    collectionKey: context.collectionKey,
    collectionId: context.collectionId,
  });
  link.rel = direction;
  link.title = `${isNext ? "Next" : "Previous"} poem: ${poem.title}`;
  link.setAttribute("aria-label", `${isNext ? "Next" : "Previous"} poem: ${poem.title}`);
  link.dataset.readerArrow = direction;
  link.innerHTML = `<span aria-hidden="true">${isNext ? "→" : "←"}</span>`;
  return link;
}

function updateReaderBackLink(currentSlug, context = getReaderContextFromSearchParams()) {
  if (!poemPageSlug) {
    return;
  }

  const backLink = document.querySelector(".reader-top-links .back-link");
  if (!backLink) {
    return;
  }

  const details = getReaderBackLinkDetails(currentSlug, context);
  backLink.textContent = details.text;
  backLink.href = details.href;
  backLink.title = details.text;
  backLink.setAttribute("aria-label", details.text);
}

function updateReaderMeta(poem) {
  if (!readerMeta || !poem) {
    return;
  }

  readerMeta.hidden = false;
  readerMeta.replaceChildren();

  const statsLine = document.createElement("p");
  statsLine.className = "poem-meta-line";
  statsLine.textContent = formatPoemStats(poem);
  readerMeta.append(statsLine);

  const writtenDate = formatPoemWrittenDate(poem);
  if (writtenDate) {
    const dateLine = document.createElement("p");
    dateLine.className = "poem-meta-line poem-meta-date";
    dateLine.textContent = writtenDate;
    readerMeta.append(dateLine);
  }
}

function updateReaderArrowLink(currentSlug, direction, context = getReaderContextFromSearchParams()) {
  const root = getReaderRootElement();

  if (!root) {
    return;
  }

  const existing = root.querySelector(`[data-reader-arrow="${direction}"]`);
  const poem = getReaderNeighborPoem(currentSlug, direction, context);
  const highlightQuery = getActivePoemTextHighlightQuery();

  if (!poem) {
    existing?.remove();
    return;
  }

  const slug = getPoemSlug(poem);
  const label = `${direction === "next" ? "Next" : "Previous"} poem: ${poem.title}`;
  const link = existing || createReaderArrowLink(currentSlug, direction, context);

  if (!link) {
    return;
  }

  link.href = getPoemPageHref(slug, {
    highlightQuery,
    readerContext: context.type === "featured" || context.type === "library" ? context.type : "",
    collectionKey: context.collectionKey,
    collectionId: context.collectionId,
  });
  link.rel = direction;
  link.title = label;
  link.setAttribute("aria-label", label);

  if (!existing) {
    const eyebrow = root.querySelector(".eyebrow");
    const topLinks = root.querySelector(".reader-top-links");
    root.insertBefore(link, eyebrow || topLinks || root.firstChild);
  }
}

function updateReaderNavLinks(currentSlug) {
  const context = getReaderContextFromSearchParams();
  updateReaderBackLink(currentSlug, context);
  updateReaderArrowLink(currentSlug, "prev", context);
  updateReaderArrowLink(currentSlug, "next", context);
}

function normalizePoemHighlightValue(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘‛]/g, "'")
    .replace(/[“”„‟]/g, '"')
    .replace(/[–—―]/g, "-")
    .replace(/…/g, "...")
    .replace(/\u00a0/g, " ")
    .toLowerCase();
}

function normalizePoemHighlightQuery(value) {
  return normalizePoemHighlightValue(value).replace(/\s+/g, " ").trim();
}

function buildPoemHighlightIndex(value) {
  const source = String(value || "");
  let normalized = "";
  const map = [];
  let offset = 0;

  for (const char of Array.from(source)) {
    const charLength = char.length;
    const expanded = normalizePoemHighlightValue(char);

    for (const normalizedChar of expanded) {
      normalized += normalizedChar;
      map.push({ start: offset, end: offset + charLength });
    }

    offset += charLength;
  }

  return { normalized, map, source };
}

function clearPoemSearchHighlights(root) {
  if (!root) {
    return;
  }

  root.querySelectorAll("mark.poem-search-highlight").forEach((mark) => {
    mark.replaceWith(document.createTextNode(mark.textContent || ""));
  });

  root.normalize();
}

function highlightPoemTextNode(textNode, query) {
  const normalizedQuery = normalizePoemHighlightQuery(query);

  if (!normalizedQuery) {
    return false;
  }

  const source = textNode.nodeValue || "";
  if (!source.trim()) {
    return false;
  }

  const { normalized, map } = buildPoemHighlightIndex(source);
  if (!normalized) {
    return false;
  }

  const matches = [];
  let searchIndex = 0;

  while (searchIndex <= normalized.length - normalizedQuery.length) {
    const matchIndex = normalized.indexOf(normalizedQuery, searchIndex);

    if (matchIndex === -1) {
      break;
    }

    const startMap = map[matchIndex];
    const endMap = map[matchIndex + normalizedQuery.length - 1];

    if (!startMap || !endMap || endMap.end <= startMap.start) {
      searchIndex = matchIndex + Math.max(1, normalizedQuery.length);
      continue;
    }

    matches.push([startMap.start, endMap.end]);
    searchIndex = matchIndex + Math.max(1, normalizedQuery.length);
  }

  if (!matches.length) {
    return false;
  }

  const fragment = document.createDocumentFragment();
  let cursor = 0;

  matches.forEach(([start, end]) => {
    if (start > cursor) {
      fragment.append(document.createTextNode(source.slice(cursor, start)));
    }

    const mark = document.createElement("mark");
    mark.className = "poem-search-highlight";
    mark.append(document.createTextNode(source.slice(start, end)));
    fragment.append(mark);
    cursor = end;
  });

  if (cursor < source.length) {
    fragment.append(document.createTextNode(source.slice(cursor)));
  }

  textNode.parentNode?.replaceChild(fragment, textNode);
  return true;
}

function highlightPoemSearchInRoot(root, query) {
  if (!root) {
    return;
  }

  const normalizedQuery = normalizePoemHighlightQuery(query);

  clearPoemSearchHighlights(root);

  if (!normalizedQuery) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parentElement = node.parentElement;

      if (!parentElement || !node.nodeValue || !node.nodeValue.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      if (parentElement.closest(".poem-line-number, .poem-navigation, .reader-actions, .reader-top-links")) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach((node) => {
    highlightPoemTextNode(node, normalizedQuery);
  });
}

function getPoemHighlightRoots() {
  const roots = [];
  const title = readerTitle || document.querySelector("#poem-title");
  const subtitle = readerSubtitle || document.querySelector(".poem-subtitle");
  const poemBody = readerPoem?.querySelector("[data-reader-poem-body]");

  if (title) {
    roots.push(title);
  }

  if (subtitle) {
    roots.push(subtitle);
  }

  if (poemBody) {
    roots.push(poemBody);
  }

  return roots;
}

function applyActivePoemTextHighlight() {
  const highlightQuery = getActivePoemTextHighlightQuery();

  getPoemHighlightRoots().forEach((root) => {
    highlightPoemSearchInRoot(root, highlightQuery);
  });
}

const slugMigrations = {
  "meditation-on-the-b-and-c-theories-of-time": "somewhere",
};

const poemBySlug = new Map(sortedPoems.map((poem) => [getPoemSlug(poem), poem]));
const poemIndexBySlug = new Map(sortedPoems.map((poem, index) => [getPoemSlug(poem), index]));

const featuredCollections = [
  {
    title: "—no walls",
    description:
      "Neurodivergent selfhood, language, and time expanding beyond fixed walls.",
    poems: [
      "The Way of No Lesson",
      "Temporary Coördinates",
      "Small Things",
      "Where Is the Triangle?",
      "Two Chairs",
      "The Third Room",
      "NEUROSPAGHETTI",
      "Productivity Guilt",
      "The Weightless Hour",
      "We're All Dogmatic Because We Aren't Inactive",
      "We Already Know the Song",
    ],
  },
  {
    title: "Memory Liquefied",
    description:
      "Identity, grief, and memory refracted through humour, lyricism, and loss.",
    poems: [
      "SADBOY",
      "FIELD GUIDE",
      "Two Shores",
      "Should I?",
      "Before the Screens",
      "Twelve Pounds and a Dream",
      "Eulogy for the Melting Giant",
      "You Live in Colour, I Dream in Green",
    ],
  },
  {
    title: "Public Friction",
    description:
      "Poems that look straight at the larger mess and refuse to speak politely to it.",
    poems: [
      "The Real Curriculum",
      "The Misinformation Olympics",
      "The Unseen Wall",
      "The Daily Whine",
    ],
  },
];

const favouriteSlugs = new Set(JSON.parse(localStorage.getItem(favouritesKey) || "[]"));
let favouriteOrder = JSON.parse(localStorage.getItem(favouriteOrderKey) || "[]");
if (!Array.isArray(favouriteOrder)) {
  favouriteOrder = [];
}
let collections = JSON.parse(localStorage.getItem(collectionsKey) || "[]");

function migrateLibrarySlugs() {
  let changed = false;

  const migratedFavourites = new Set();
  favouriteSlugs.forEach((slug) => {
    const next = slugMigrations[slug] || slug;
    if (next !== slug) changed = true;
    migratedFavourites.add(next);
  });

  if (changed) {
    favouriteSlugs.clear();
    migratedFavourites.forEach((slug) => favouriteSlugs.add(slug));
    localStorage.setItem(favouritesKey, JSON.stringify([...favouriteSlugs]));
  }

  const migratedFavouriteOrder = favouriteOrder.map((slug) => {
    const next = slugMigrations[slug] || slug;
    if (next !== slug) changed = true;
    return next;
  });

  const nextFavouriteOrder = normalizeFavouriteOrder(migratedFavouriteOrder);
  const favouriteOrderChanged =
    nextFavouriteOrder.length !== favouriteOrder.length ||
    nextFavouriteOrder.some((slug, index) => slug !== favouriteOrder[index]);

  if (favouriteOrderChanged) {
    changed = true;
    favouriteOrder = nextFavouriteOrder;
    localStorage.setItem(favouriteOrderKey, JSON.stringify(favouriteOrder));
  }

  const migratedCollections = collections.map((collection) => {
    const nextPoems = (collection.poems || []).map((slug) => {
      const next = slugMigrations[slug] || slug;
      if (next !== slug) changed = true;
      return next;
    });
    // de-dupe while keeping order
    const seen = new Set();
    const deduped = nextPoems.filter((slug) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    });
    return { ...collection, poems: deduped };
  });

  if (changed) {
    collections = migratedCollections;
    localStorage.setItem(collectionsKey, JSON.stringify(collections));
  }
}

migrateLibrarySlugs();

function appendFormattedText(container, text) {
  // Minimal inline formatting:
  // - *italic*
  // - **bold**
  // - ***bold+italic***
  // - ~~strikethrough~~
  // Everything else is treated as plain text.
  let i = 0;

  while (i < text.length) {
    const nextStrike = text.indexOf("~~", i);
    const nextBold = text.indexOf("**", i);
    const nextBoldItalic = text.indexOf("***", i);
    const nextItalic = text.indexOf("*", i);

    let next = -1;
    let kind = null;

    next = nextStrike;
    kind = nextStrike !== -1 ? "strike" : null;

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

    if (kind === "boldItalic") {
      const end = text.indexOf("***", next + 3);
      if (end === -1) {
        container.append(document.createTextNode(text.slice(next)));
        return;
      }
      const strong = document.createElement("strong");
      const em = document.createElement("em");
      em.append(document.createTextNode(text.slice(next + 3, end)));
      strong.append(em);
      container.append(strong);
      i = end + 3;
      continue;
    }

    if (kind === "strike") {
      const end = text.indexOf("~~", next + 2);
      if (end === -1) {
        container.append(document.createTextNode(text.slice(next)));
        return;
      }
      const del = document.createElement("s");
      del.append(document.createTextNode(text.slice(next + 2, end)));
      container.append(del);
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
  setTheme(savedTheme === "light" ? "light" : "dark");
}

initializeTheme();

function preserveWindowScrollPosition(applyUpdate) {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  applyUpdate();

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  const previousOverflowAnchor = root.style.overflowAnchor;
  root.style.scrollBehavior = "auto";
  root.style.overflowAnchor = "none";

  const restoreScroll = () => {
    window.scrollTo({ left: scrollX, top: scrollY, behavior: "auto" });
  };

  requestAnimationFrame(() => {
    restoreScroll();
    requestAnimationFrame(() => {
      restoreScroll();
      root.style.scrollBehavior = previousScrollBehavior;
      root.style.overflowAnchor = previousOverflowAnchor;
    });
  });
}

function setFontSize(size, { preserveScrollPosition = false } = {}) {
  const nextSize = fontSizeOptions.has(size) ? size : "normal";
  const applyFontSize = () => {
    document.documentElement.dataset.fontSize = nextSize;
    localStorage.setItem(fontSizeKey, nextSize);

    fontSizeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.fontSizeOption === nextSize));
    });

    scheduleHeaderLayoutModeUpdate();
  };

  if (preserveScrollPosition) {
    preserveWindowScrollPosition(applyFontSize);
    return;
  }

  applyFontSize();
}

function initializeFontSize() {
  setFontSize(localStorage.getItem(fontSizeKey) || "normal");
}

initializeFontSize();

function updateLineNumberButtons(mode) {
  lineNumberButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lineNumberOption === mode));
  });
}

function getSavedLineNumberMode() {
  const savedMode = localStorage.getItem(lineNumbersKey);
  return lineNumberOptions.has(savedMode) ? savedMode : "hide";
}

function setLineNumbers(mode) {
  const nextMode = lineNumberOptions.has(mode) ? mode : "hide";
  document.documentElement.dataset.lineNumbers = nextMode;
  localStorage.setItem(lineNumbersKey, nextMode);
  updateLineNumberButtons(nextMode);
}

function initializeLineNumbers() {
  setLineNumbers(getSavedLineNumberMode());
}

initializeLineNumbers();

function updateMiniMapButtons(mode) {
  miniMapButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.miniMapOption === mode));
  });
}

function getSavedMiniMapMode() {
  const savedMode = localStorage.getItem(miniMapKey);
  return miniMapOptions.has(savedMode) ? savedMode : "hide";
}

function setMiniMap(mode) {
  const nextMode = miniMapOptions.has(mode) ? mode : "hide";
  document.documentElement.dataset.miniMap = nextMode;
  localStorage.setItem(miniMapKey, nextMode);
  updateMiniMapButtons(nextMode);
}

function initializeMiniMap() {
  setMiniMap(getSavedMiniMapMode());
}

initializeMiniMap();

function updateNavModeButtons(mode) {
  navModeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.navModeOption === mode));
  });
}

function getSavedNavMode() {
  const savedMode = localStorage.getItem(navModeKey);
  return navModeOptions.has(savedMode) ? savedMode : "always-visible";
}

function setNavMode(mode) {
  const nextMode = navModeOptions.has(mode) ? mode : "always-visible";
  document.documentElement.dataset.navMode = nextMode;
  localStorage.setItem(navModeKey, nextMode);
  updateNavModeButtons(nextMode);
  updateHeaderVisibility();
}

function initializeNavMode() {
  setNavMode(getSavedNavMode());
}

initializeNavMode();
updateHeaderLayoutMode();
updateHeaderVisibility();

function isMobileNavOpen() {
  return Boolean(siteHeader?.classList.contains("is-mobile-nav-open"));
}

function updateNavToggle() {
  if (!navToggle) {
    return;
  }

  const open = isMobileNavOpen();
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

function closeMobileNav({ focusToggle = false } = {}) {
  if (!siteHeader || !navToggle) {
    return;
  }

  const wasOpen = isMobileNavOpen();
  siteHeader.classList.remove("is-mobile-nav-open");
  updateNavToggle();

  if (focusToggle && wasOpen) {
    navToggle.focus();
  }

  if (wasOpen) {
    updateHeaderVisibility();
  }
}

function setMobileNavOpen(open) {
  if (!siteHeader || !navToggle) {
    return;
  }

  const nextOpen = Boolean(open);
  siteHeader.classList.toggle("is-mobile-nav-open", nextOpen);
  updateNavToggle();

  if (nextOpen) {
    closeSettingsMenu();
  }

  updateHeaderVisibility();
}

updateNavToggle();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "light" : "dark");
  });
}

fontSizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setFontSize(button.dataset.fontSizeOption || "normal", { preserveScrollPosition: true });
  });
});

navModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setNavMode(button.dataset.navModeOption || "always-visible");
  });
});

lineNumberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLineNumbers(button.dataset.lineNumberOption || "hide");
  });
});

miniMapButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMiniMap(button.dataset.miniMapOption || "show");
  });
});

function isSettingsMenuOpen() {
  return Boolean(settingsPanel && !settingsPanel.hidden);
}

function getHeaderLayoutMetrics() {
  if (!siteHeader || !siteBrand || !siteNav || !settingsMenu) {
    return null;
  }

  const headerRect = siteHeader.getBoundingClientRect();
  const brandRect = siteBrand.getBoundingClientRect();
  const navWidth = siteNav.scrollWidth;
  const settingsRect = settingsMenu.getBoundingClientRect();
  const headerStyles = window.getComputedStyle(siteHeader);
  const columnGap = parseFloat(headerStyles.columnGap || headerStyles.gap || "0") || 0;
  const paddingLeft = parseFloat(headerStyles.paddingLeft || "0") || 0;
  const paddingRight = parseFloat(headerStyles.paddingRight || "0") || 0;

  return {
    availableWidth: Math.max(0, headerRect.width - paddingLeft - paddingRight),
    brandWidth: brandRect.width,
    navWidth,
    settingsWidth: settingsRect.width,
    gap: columnGap,
  };
}

function shouldCompactHeaderLayout() {
  if (!siteHeader || !siteBrand || !siteNav || !settingsMenu || !navToggle) {
    return false;
  }

  if (mobileNavQuery.matches) {
    return true;
  }

  const metrics = getHeaderLayoutMetrics();
  if (!metrics) {
    return false;
  }

  const { availableWidth, brandWidth, navWidth, settingsWidth, gap } = metrics;
  const requiredWidth = brandWidth + navWidth + settingsWidth + gap * 2;

  return requiredWidth > availableWidth + headerFitSlack;
}

function shouldStackBrandHeader() {
  if (!siteHeader || !siteBrand || !siteNav || !settingsMenu || !navToggle) {
    return false;
  }

  if (mobileNavQuery.matches) {
    return false;
  }

  const metrics = getHeaderLayoutMetrics();
  if (!metrics) {
    return false;
  }

  const { availableWidth, brandWidth, navWidth, settingsWidth, gap } = metrics;
  const singleRowWidth = brandWidth + navWidth + settingsWidth + gap * 2;
  const stackedBrandWidth = brandWidth + settingsWidth + gap;
  const fitsSingleRow = singleRowWidth <= availableWidth + headerFitSlack;
  const fitsStackedRow = stackedBrandWidth <= availableWidth + headerFitSlack;
  const navFits = navWidth <= availableWidth + headerFitSlack;

  return !fitsSingleRow && fitsStackedRow && navFits;
}

function updateHeaderLayoutMode() {
  if (!siteHeader) {
    return;
  }

  if (siteHeader.classList.contains("is-nav-compact") || siteHeader.classList.contains("is-brand-stacked")) {
    siteHeader.classList.remove("is-nav-compact", "is-brand-stacked");
  }

  const shouldCompact = shouldCompactHeaderLayout();
  const shouldStackBrand = !shouldCompact && shouldStackBrandHeader();

  if (shouldCompact) {
    siteHeader.classList.add("is-nav-compact");
    closeMobileNav();
  } else if (shouldStackBrand) {
    siteHeader.classList.add("is-brand-stacked");
    closeMobileNav();
  } else {
    siteHeader.classList.remove("is-nav-compact", "is-brand-stacked");
  }
}

function scheduleHeaderLayoutModeUpdate() {
  if (headerLayoutUpdatePending) {
    return;
  }

  headerLayoutUpdatePending = true;
  window.requestAnimationFrame(() => {
    headerLayoutUpdatePending = false;
    updateHeaderLayoutMode();
    updateHeaderVisibility();
  });
}

function shouldHideHeader() {
  if (
    !siteHeader ||
    isSettingsMenuOpen() ||
    isMobileNavOpen() ||
    siteHeader.matches(":focus-within")
  ) {
    return false;
  }

  const mode = document.documentElement.dataset.navMode;
  if (mode === "always-visible") {
    return false;
  }

  if (mode === "auto-hide") {
    return window.scrollY > 0;
  }

  if (mode === "hover-top") {
    const headerHeight = siteHeader.offsetHeight || 76;
    return !(lastPointerY <= navRevealZone || lastPointerY <= headerHeight + 12);
  }

  return false;
}

function updateHeaderVisibility() {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle("is-nav-hidden", shouldHideHeader());
}

if (siteHeader) {
  window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
  window.addEventListener("resize", scheduleHeaderLayoutModeUpdate, { passive: true });
  mobileNavQuery.addEventListener("change", (event) => {
    if (!event.matches) {
      closeMobileNav();
    }
    scheduleHeaderLayoutModeUpdate();
  });
  document.addEventListener(
    "mousemove",
    (event) => {
      lastPointerY = event.clientY;
      updateHeaderVisibility();
    },
    { passive: true }
  );
  window.addEventListener("blur", () => {
    lastPointerY = Number.POSITIVE_INFINITY;
    updateHeaderVisibility();
  });
  window.addEventListener(
    "mouseout",
    (event) => {
      if (!event.relatedTarget) {
        lastPointerY = Number.POSITIVE_INFINITY;
        updateHeaderVisibility();
      }
    },
    { passive: true }
  );
  document.fonts?.ready?.then(() => {
    scheduleHeaderLayoutModeUpdate();
  });
  updateHeaderVisibility();
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    setMobileNavOpen(!isMobileNavOpen());
  });
}

function closeSettingsMenu() {
  if (!settingsToggle || !settingsPanel) {
    return;
  }

  settingsPanel.hidden = true;
  settingsToggle.setAttribute("aria-expanded", "false");
  siteHeader?.classList.remove("is-settings-open");
  settingsToggle.blur?.();
  updateHeaderVisibility();
}

if (settingsToggle && settingsPanel) {
  settingsToggle.addEventListener("click", () => {
    const shouldOpen = settingsPanel.hidden;
    if (shouldOpen) {
      closeMobileNav();
    }
    settingsPanel.hidden = !shouldOpen;
    settingsToggle.setAttribute("aria-expanded", String(shouldOpen));
    siteHeader?.classList.toggle("is-settings-open", shouldOpen);
    if (shouldOpen) {
      updateHeaderVisibility();
    }
  });

  document.addEventListener("click", (event) => {
    if (!settingsMenu?.contains(event.target)) {
      closeSettingsMenu();
    }

    if (!siteHeader?.contains(event.target)) {
      closeMobileNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const navWasOpen = isMobileNavOpen();
      closeSettingsMenu();
      closeMobileNav();

      if (settingsPanel.hidden && navWasOpen) {
        navToggle?.focus();
      } else if (settingsPanel.hidden) {
        settingsToggle.focus();
      }
    }
  });
}

function renderArchive() {
  if (!archiveList) {
    return;
  }

  archiveList.innerHTML = "";

  sortedPoems.forEach((poem) => {
    const slug = getPoemSlug(poem);
    const item = document.createElement("li");
    item.className = "archive-item";
    item.id = `archive-${slug}`;
    item.dataset.poemSlug = slug;
    item.dataset.searchValue = normalizeArchiveSearchValue(poem.title || "");
    item.dataset.textSearchValue = buildArchiveTextSearchValue(poem);
    item.dataset.poemSubtitle = poem.subtitle || "";

    const link = document.createElement("a");
    link.href = getPoemPageHref(slug);
    link.textContent = poem.title;

    item.append(link);
    item.append(createArchiveActions(slug, poem.title));
    archiveList.append(item);
  });
}

function clearArchiveSearchInput() {
  if (!archiveSearch || !archiveSearch.value) {
    return;
  }

  archiveSearch.value = "";
  updateArchiveSearchState();
}

function renderFeaturedCollections() {
  if (!featuredCollectionsList) {
    return;
  }

  featuredCollectionsList.innerHTML = "";

  featuredCollections.forEach((collection) => {
    const card = document.createElement("article");
    card.className = "featured-collection-card";
    const collectionKey = slugify(collection.title);

    const heading = document.createElement("h3");
    heading.textContent = collection.title;

    const description = document.createElement("p");
    description.textContent = collection.description;

    const list = document.createElement("ol");
    list.className = "featured-collection-poem-list";

    collection.poems.forEach((poemTitle) => {
      const slug = getPoemSlug({ title: poemTitle });
      const poem = poemBySlug.get(slug);

      if (!poem) {
        return;
      }

      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = getPoemPageHref(slug, {
        readerContext: "featured",
        collectionKey,
      });
      link.textContent = poem.title;

      item.append(link);
      list.append(item);
    });

    card.append(heading, description, list);
    featuredCollectionsList.append(card);
  });
}

function normalizeArchiveSearchValue(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function stripArchiveFormatting(value) {
  return String(value || "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`(.*?)`/g, "$1");
}

function normalizeArchiveTextSearchValue(value) {
  return stripArchiveFormatting(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘‛]/g, "'")
    .replace(/[“”„‟]/g, '"')
    .replace(/[–—―]/g, "-")
    .replace(/…/g, "...")
    .replace(/\u00a0/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function buildArchiveTextSearchValue(poem) {
  const parts = [poem.title || "", poem.subtitle || ""];

  if (Array.isArray(poem.lines)) {
    poem.lines.forEach((line) => {
      parts.push(String(line || ""));
    });
  }

  return normalizeArchiveTextSearchValue(parts.join(" "));
}

function matchesArchiveSearchPrefix(query, candidate) {
  if (!query) {
    return true;
  }

  return Boolean(candidate) && candidate.startsWith(query);
}

function matchesArchiveSearchAnywhere(query, candidate) {
  if (!query) {
    return true;
  }

  return Boolean(candidate) && candidate.includes(query);
}

function appendArchiveSearchResult(resultList, href, title, subtitle = "") {
  const resultItem = document.createElement("li");
  const result = document.createElement("a");
  result.className = "archive-search-result";
  result.href = href;

  const resultTitle = document.createElement("span");
  resultTitle.className = "archive-search-result-title";
  resultTitle.textContent = title;
  result.append(resultTitle);

  if (subtitle) {
    const resultSubtitle = document.createElement("span");
    resultSubtitle.className = "archive-search-result-subtitle";
    resultSubtitle.textContent = subtitle;
    result.append(resultSubtitle);
  }

  resultItem.append(result);
  resultList.append(resultItem);
}

let archiveSearchMode = "titles";

function updateArchiveSearchModeButtons(mode) {
  archiveSearchModeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.archiveSearchModeOption === mode));
  });
}

function updateArchiveSearchPlaceholder(mode) {
  if (!archiveSearch) {
    return;
  }

  archiveSearch.placeholder =
    mode === "poem-text"
      ? "Search poem text"
      : "Search poem titles";
}

function getSavedArchiveSearchMode() {
  const savedMode = localStorage.getItem(archiveSearchModeKey);
  return archiveSearchModeOptions.has(savedMode) ? savedMode : "titles";
}

function setArchiveSearchMode(mode) {
  archiveSearchMode = archiveSearchModeOptions.has(mode) ? mode : "titles";
  localStorage.setItem(archiveSearchModeKey, archiveSearchMode);
  updateArchiveSearchModeButtons(archiveSearchMode);
  updateArchiveSearchPlaceholder(archiveSearchMode);
  updateArchiveSearchState();
}

function updateArchiveSearchState() {
  if (!archiveList || !archiveSearchStatus || !archiveEmpty) {
    return;
  }

  const rawQuery = archiveSearch?.value || "";
  const highlightQuery = archiveSearchMode === "poem-text" ? rawQuery.trim() : "";
  const query =
    archiveSearchMode === "poem-text"
      ? normalizeArchiveTextSearchValue(rawQuery)
      : normalizeArchiveSearchValue(rawQuery);
  const items = Array.from(archiveList.querySelectorAll(".archive-item"));
  const prefixMatches = [];
  const fallbackMatches = [];
  const textMatches = [];

  items.forEach((item) => {
    const searchable =
      archiveSearchMode === "poem-text"
        ? item.dataset.textSearchValue || ""
        : item.dataset.searchValue || "";
    const slug = item.dataset.poemSlug || "";
    const link = item.querySelector("a");

    if (!query) {
      textMatches.push(item);
      if (link) {
        link.href = getPoemPageHref(slug);
      }
      return;
    }

    if (archiveSearchMode === "poem-text") {
      if (searchable.includes(query)) {
        textMatches.push(item);
      }
      if (link) {
        link.href = getPoemPageHref(slug, highlightQuery);
      }
      return;
    }

    const prefixMatch = matchesArchiveSearchPrefix(query, searchable);
    const fallbackMatch = !prefixMatch && matchesArchiveSearchAnywhere(query, searchable);

    if (link) {
      link.href = getPoemPageHref(slug);
    }

    if (prefixMatch) {
      prefixMatches.push(item);
    } else if (fallbackMatch) {
      fallbackMatches.push(item);
    }
  });

  const hasQuery = Boolean(query);
  const matches =
    !hasQuery
      ? items
      : archiveSearchMode === "poem-text"
        ? textMatches
        : prefixMatches.length > 0
          ? prefixMatches
          : fallbackMatches;
  const matchSet = new Set(matches);
  const matchCount = matches.length;
  const totalCount = items.length;

  items.forEach((item) => {
    item.hidden = hasQuery ? !matchSet.has(item) : false;
  });

  archiveEmpty.hidden = !(hasQuery && matchCount === 0);
  archiveSearchStatus.textContent = hasQuery
    ? `${matchCount} match${matchCount === 1 ? "" : "es"} found.`
    : `Browse ${totalCount} poem${totalCount === 1 ? "" : "s"} in the Archive.`;

  if (archiveSearchResults) {
    archiveSearchResults.hidden = !(hasQuery && matchCount > 0);
    archiveSearchResults.innerHTML = "";

    if (hasQuery && matchCount > 0) {
      const resultList = document.createElement("ul");
      resultList.className = "archive-search-results-list";
      resultList.setAttribute("role", "list");

      matches.forEach((item) => {
        const slug = item.dataset.poemSlug || "";
        const title = item.querySelector("a")?.textContent || slug;
        const subtitle = item.dataset.poemSubtitle || "";
        const href = getPoemPageHref(slug, highlightQuery);
        appendArchiveSearchResult(resultList, href, title, subtitle);
      });

      archiveSearchResults.append(resultList);
    }
  }
}

function initializeArchiveSearch() {
  if (!archiveSearch) {
    return;
  }

  updateArchiveSearchModeButtons(archiveSearchMode);
  updateArchiveSearchPlaceholder(archiveSearchMode);
  archiveSearch.addEventListener("input", updateArchiveSearchState);
  archiveSearch.addEventListener("search", updateArchiveSearchState);
  updateArchiveSearchState();
}

function initializeArchiveSearchMode() {
  if (!archiveSearchModeButtons.length) {
    return;
  }

  archiveSearchMode = getSavedArchiveSearchMode();
  updateArchiveSearchModeButtons(archiveSearchMode);
  updateArchiveSearchPlaceholder(archiveSearchMode);

  archiveSearchModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setArchiveSearchMode(button.dataset.archiveSearchModeOption || "titles");
      archiveSearch?.focus();
    });
  });
}

function getRandomArchivePoemSlug() {
  const visibleItems = archiveList ? Array.from(archiveList.querySelectorAll(".archive-item:not([hidden])")) : [];
  const pool = visibleItems.length
    ? visibleItems.map((item) => item.dataset.poemSlug || "").filter(Boolean)
    : sortedPoems.map((poem) => getPoemSlug(poem));

  if (!pool.length) {
    return null;
  }

  return pool[Math.floor(Math.random() * pool.length)] || null;
}

function navigateToRandomPoem() {
  const slug = getRandomArchivePoemSlug();

  if (!slug) {
    return;
  }

  const href = getPoemPageHref(slug);
  window.location.assign(href);
}

function initializeRandomPoemButton() {
  if (!randomPoemButton) {
    return;
  }

  randomPoemButton.addEventListener("click", navigateToRandomPoem);
}

function handleArchivePoemSelection(event) {
  if (!archiveSearch || event.defaultPrevented) {
    return;
  }

  const link = event.target.closest(".archive-item a, .archive-search-result");

  if (!link) {
    return;
  }

  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();

  const href = link.href;
  clearArchiveSearchInput();
  window.location.assign(href);
}

function scrollToArchiveItemFromHash() {
  if (!archiveList) {
    return;
  }

  const hash = decodeURIComponent(window.location.hash || "");
  if (!hash.startsWith("#archive-")) {
    return;
  }

  const target = document.getElementById(hash.slice(1));
  if (!target) {
    return;
  }

  requestAnimationFrame(() => {
    target.scrollIntoView({ block: "center", inline: "nearest" });
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
  localStorage.setItem(favouriteOrderKey, JSON.stringify(favouriteOrder));
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

function normalizeFavouriteOrder(order = favouriteOrder) {
  const next = [];
  const seen = new Set();
  const source = Array.isArray(order) ? order : [];

  source.forEach((slug) => {
    const migrated = slugMigrations[slug] || slug;
    if (favouriteSlugs.has(migrated) && poemBySlug.has(migrated) && !seen.has(migrated)) {
      next.push(migrated);
      seen.add(migrated);
    }
  });

  sortedPoems.forEach((poem) => {
    const slug = getPoemSlug(poem);
    if (favouriteSlugs.has(slug) && !seen.has(slug)) {
      next.push(slug);
      seen.add(slug);
    }
  });

  return next;
}

function getOrderedFavouriteSlugs() {
  return normalizeFavouriteOrder();
}

function toggleFavourite(slug) {
  const wasFavourite = isFavourite(slug);

  if (isFavourite(slug)) {
    favouriteSlugs.delete(slug);
    favouriteOrder = favouriteOrder.filter((item) => item !== slug);
  } else {
    favouriteSlugs.add(slug);
    if (!favouriteOrder.includes(slug)) {
      favouriteOrder.push(slug);
    }
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

function moveFavouriteInLibrary(fromIndex, toIndex) {
  const orderedSlugs = getOrderedFavouriteSlugs();

  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= orderedSlugs.length ||
    toIndex >= orderedSlugs.length ||
    fromIndex === toIndex
  ) {
    return;
  }

  const [poemSlug] = orderedSlugs.splice(fromIndex, 1);
  orderedSlugs.splice(toIndex, 0, poemSlug);
  favouriteOrder = orderedSlugs;
  saveFavourites();
  renderLibrary();
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

  const favourites = getOrderedFavouriteSlugs()
    .map((slug) => poemBySlug.get(slug))
    .filter(Boolean);
  libraryEmpty.hidden = favourites.length > 0;

  favourites.forEach((poem, index) => {
    const slug = getPoemSlug(poem);
    const item = document.createElement("li");
    item.className = "archive-item";
    item.dataset.poemSlug = slug;
    item.draggable = true;
    item.dataset.favouriteIndex = String(index);
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", JSON.stringify({ fromIndex: index }));
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
        moveFavouriteInLibrary(payload.fromIndex, index);
      } catch {
        // Ignore invalid drops.
      }
    });

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
        link.href = getPoemPageHref(slug, {
          readerContext: "library",
          collectionId: collection.id,
        });
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
    url.hash = targetHash || "#library";
    window.location.href = url.toString();
    return;
  }

  if (!siteHeader) {
    return;
  }

  const nextHash = targetHash || "#library";
  window.history.pushState(null, "", nextHash);
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

function isAllCapsHeading(line) {
  const trimmed = String(line || "").trim();

  if (!trimmed) {
    return false;
  }

  if (trimmed.length > 64) {
    return false;
  }

  if (/[a-z]/.test(trimmed)) {
    return false;
  }

  if (!/[A-Z]/.test(trimmed)) {
    return false;
  }

  return !trimmed.startsWith("—");
}

function isSignatureLine(line) {
  const trimmed = String(line || "").trim();
  if (!trimmed) {
    return false;
  }

  const unwrapped = trimmed.replace(/^[*_]+/, "").replace(/[*_]+$/, "");
  return unwrapped.startsWith("— ");
}

function createPoemLineElement(
  lineText,
  lineNumber,
  { isSignature = false, isHeading = false, isBiblicalVerse = false } = {}
) {
  const trimmedLine = String(lineText || "");

  if (!trimmedLine.trim()) {
    const spacer = document.createElement("span");
    spacer.className = "poem-line poem-line--blank";
    spacer.setAttribute("aria-hidden", "true");
    return spacer;
  }

  const line = document.createElement("span");
  line.className = "poem-line";
  if (isSignature) {
    line.classList.add("poem-line--signature");
  }

  const content = document.createElement("span");
  content.className = "poem-line-content";
  appendFormattedText(content, trimmedLine);

  if (isHeading) {
    const strong = document.createElement("strong");
    while (content.firstChild) {
      strong.append(content.firstChild);
    }
    content.append(strong);
  }

  if (isBiblicalVerse) {
    const leadingNumber = content.firstElementChild;
    if (
      leadingNumber?.tagName === "STRONG" &&
      /^\d+$/.test((leadingNumber.textContent || "").trim())
    ) {
      line.classList.add("poem-line--biblical");
      leadingNumber.classList.add("poem-verse-number");
    }
  }

  if (!isSignature) {
    const number = document.createElement("span");
    number.className = "poem-line-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(lineNumber);
    line.append(number);
  }

  line.append(content);
  return line;
}

function getStanzaLineCount(stanzaText) {
  return String(stanzaText || "")
    .split("\n")
    .filter((line) => String(line || "").trim())
    .length;
}

function createPoemNavigation(poem) {
  const poemLines = Array.isArray(poem?.lines) ? poem.lines : [];
  const aside = document.createElement("aside");
  aside.className = "poem-navigation";
  aside.setAttribute("data-poem-navigation", "");
  aside.setAttribute("aria-label", "Jump to stanza");

  const progress = document.createElement("div");
  progress.className = "poem-progress";
  progress.setAttribute("aria-hidden", "true");

  const track = document.createElement("span");
  track.className = "poem-progress-track";

  const fill = document.createElement("span");
  fill.className = "poem-progress-fill";
  fill.setAttribute("data-poem-progress-fill", "");

  const map = document.createElement("div");
  map.className = "poem-map";

  const label = document.createElement("p");
  label.className = "poem-navigation-label";
  label.textContent = "Jump to stanza";

  const list = document.createElement("div");
  list.className = "poem-map-list";
  list.setAttribute("data-poem-map", "");

  poemLines.forEach((stanza, index) => {
    const stanzaText = typeof stanza === "string" ? stanza : String(stanza.text || "");
    const lineCount = Math.max(1, getStanzaLineCount(stanzaText));
    const button = document.createElement("button");
    button.type = "button";
    button.className = "poem-map-button";
    button.dataset.stanzaIndex = String(index);
    button.dataset.stanzaLines = String(lineCount);
    button.setAttribute(
      "aria-label",
      `Jump to stanza ${index + 1}, ${lineCount} line${lineCount === 1 ? "" : "s"}`
    );
    button.title = `Jump to stanza ${index + 1}`;
    button.textContent = "▇".repeat(Math.min(lineCount, 6));
    list.append(button);
  });

  progress.append(track, fill);
  map.append(label, list);
  aside.append(progress, map);
  return aside;
}

function createPoemBody(poem) {
  const poemLines = Array.isArray(poem?.lines) ? poem.lines : [];
  const isBiblicalPoem = getPoemSlug(poem) === "the-book-of-ironicus";
  const container = document.createElement("div");
  container.className = "reader-poem-body";
  container.setAttribute("data-reader-poem-body", "");

  if (!poemLines.length) {
    const placeholder = document.createElement("p");
    placeholder.className = "reader-placeholder";
    placeholder.textContent = "Poem text coming soon.";
    container.append(placeholder);
    return container;
  }

  let lineNumber = 1;

  poemLines.forEach((stanza, index) => {
    const stanzaText = typeof stanza === "string" ? stanza : String(stanza.text || "");
    const stanzaClassName =
      typeof stanza === "string" ? "" : String(stanza.className || "").trim();
    const paragraph = document.createElement("p");
    paragraph.dataset.stanzaIndex = String(index);

    paragraph.classList.add("poem-stanza");

    if (stanzaClassName) {
      stanzaClassName.split(/\s+/).forEach((className) => paragraph.classList.add(className));
    }

    const stanzaLines = stanzaText.split("\n");

    stanzaLines.forEach((line, lineIndex) => {
      const hasText = Boolean(String(line || "").trim());
      const isSignature =
        index === poemLines.length - 1 &&
        lineIndex === stanzaLines.length - 1 &&
        isSignatureLine(line);

      paragraph.append(
        createPoemLineElement(line, lineNumber, {
          isSignature,
          isHeading: lineIndex === 0 && isAllCapsHeading(line),
          isBiblicalVerse: isBiblicalPoem,
        })
      );

      if (hasText && !isSignature) {
        lineNumber += 1;
      }
    });

    container.append(paragraph);
  });

  return container;
}

function updateReadingRoomNavigationState() {
  if (!activeReadingRoomNavigation) {
    return;
  }

  const { nav, fill, buttons, stanzas } = activeReadingRoomNavigation;

  if (!nav || !fill || !stanzas.length) {
    return;
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
  const headerHeight = siteHeader?.offsetHeight || 0;
  const topOffset = headerHeight + 28;
  const firstRect = stanzas[0].getBoundingClientRect();
  const lastRect = stanzas[stanzas.length - 1].getBoundingClientRect();
  const start = firstRect.top + window.scrollY - topOffset;
  const end = lastRect.bottom + window.scrollY - topOffset;
  const poemHeight = Math.max(end - start, 1);
  const travel = Math.max(poemHeight - viewportHeight * 0.35, 1);
  const progress = poemHeight <= viewportHeight ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / travel));

  fill.style.transform = `scaleY(${progress})`;
  fill.parentElement?.style.setProperty("--poem-progress", String(progress));

  let activeIndex = 0;
  const activationLine = viewportHeight * 0.34;

  stanzas.forEach((stanza, index) => {
    const rect = stanza.getBoundingClientRect();
    if (rect.top <= activationLine) {
      activeIndex = index;
    }
  });

  buttons.forEach((button) => {
    const isActive = Number(button.dataset.stanzaIndex) === activeIndex;
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function scheduleReadingRoomNavigationUpdate() {
  if (readingRoomNavigationPending) {
    return;
  }

  readingRoomNavigationPending = true;
  window.requestAnimationFrame(() => {
    readingRoomNavigationPending = false;
    updateReadingRoomNavigationState();
  });
}

function mountReadingRoomNavigation(root) {
  const nav = root?.querySelector("[data-poem-navigation]");
  const body = root?.querySelector("[data-reader-poem-body]");

  if (!nav || !body) {
    activeReadingRoomNavigation = null;
    return;
  }

  const fill = nav.querySelector("[data-poem-progress-fill]");
  const buttons = Array.from(nav.querySelectorAll("[data-stanza-index]"));
  const stanzas = Array.from(body.querySelectorAll(".poem-stanza[data-stanza-index]"));

  if (!fill || !buttons.length || !stanzas.length) {
    activeReadingRoomNavigation = null;
    return;
  }

  if (!nav.dataset.boundNavigation) {
    nav.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-stanza-index]");
      if (!button) {
        return;
      }

      const stanzaIndex = Number(button.dataset.stanzaIndex);
      const target = body.querySelector(`.poem-stanza[data-stanza-index="${stanzaIndex}"]`);
      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    nav.dataset.boundNavigation = "true";
  }

  activeReadingRoomNavigation = { root, nav, fill, buttons, stanzas, body };
  updateReadingRoomNavigationState();
}

function renderPoem(poem) {
  if (!reader || !readerTitle || !readerPoem || !readerActions) {
    return;
  }

  const slug = getPoemSlug(poem);
  reader.hidden = false;
  readerTitle.textContent = poem.title;
  if (readerSubtitle) {
    readerSubtitle.hidden = !poem.subtitle;
    readerSubtitle.innerHTML = "";
    if (poem.subtitle) {
      appendFormattedText(readerSubtitle, poem.subtitle);
    }
  }
  updateReaderMeta(poem);
  readerPoem.innerHTML = "";
  readerActions.innerHTML = "";
  readerActions.append(createFavouriteButton(slug, poem.title));
  readerActions.append(createCollectionControl(slug));
  updateReaderNavLinks(slug);
  readerPoem.append(createPoemNavigation(poem), createPoemBody(poem));
  mountReadingRoomNavigation(readerPoem);
  applyActivePoemTextHighlight();

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
    readerSubtitle.innerHTML = "";
    if (poem.subtitle) {
      appendFormattedText(readerSubtitle, poem.subtitle);
    }
  }
  updateReaderMeta(poem);

  readerActions.innerHTML = "";
  readerActions.append(createFavouriteButton(slug, poem.title));
  readerActions.append(createCollectionControl(slug));
  updateReaderNavLinks(slug);
  mountReadingRoomNavigation(readerPoem);
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

function initializePoemPageSearchHighlighting() {
  if (!poemPageSlug) {
    return;
  }

  const highlightQuery = getActivePoemTextHighlightQuery();
  const prevLink = document.querySelector(".reader-prev-link");
  const nextLink = document.querySelector(".reader-next-link");

  [prevLink, nextLink].forEach((link) => {
    if (!link) {
      return;
    }

    link.href = appendQueryParam(link.getAttribute("href") || "", "highlight", highlightQuery);
  });

  applyActivePoemTextHighlight();
}

renderArchive();
initializeArchiveSearchMode();
initializeArchiveSearch();
initializeRandomPoemButton();
renderFeaturedCollections();
renderLibrary();
handleRoute();
scrollToArchiveItemFromHash();
updateFavouriteButtons();
handlePendingLibraryTarget();
initializePoemPageControls();
if (poemPageSlug) {
  updateReaderNavLinks(poemPageSlug);
}
mountReadingRoomNavigation(readerPoem);
initializePoemPageSearchHighlighting();
handleSectionTargetFromHash();

archiveList?.addEventListener("click", handleArchivePoemSelection);
archiveSearchResults?.addEventListener("click", handleArchivePoemSelection);

window.addEventListener("hashchange", () => {
  handleRoute();
  scrollToArchiveItemFromHash();
  handleSectionTargetFromHash();
});

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

function scrollToSectionTarget(hash, { updateHistory = true } = {}) {
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

  if (!section) {
    return;
  }

  const navMode = document.documentElement.dataset.navMode;
  const headerOffset = navMode === "always-visible" ? siteHeader.offsetHeight : 0;
  const targetTop = window.scrollY + section.getBoundingClientRect().top - headerOffset;

  if (updateHistory) {
    window.history.pushState(null, "", hash);
  }
  handleRoute();
  window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
}

function handleSectionTargetFromHash() {
  const hash = decodeURIComponent(window.location.hash || "");

  if (!sectionTargetHashes.has(hash)) {
    return;
  }

  scrollToSectionTarget(hash, { updateHistory: false });
}

sectionJumpLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");

    if (!hash || !hash.startsWith("#")) {
      return;
    }

    event.preventDefault();
    closeMobileNav();
    scrollToSectionTarget(hash);
  });
});

window.addEventListener("scroll", scheduleReadingRoomNavigationUpdate, { passive: true });
window.addEventListener("resize", scheduleReadingRoomNavigationUpdate, { passive: true });

# Poetry Website Specification

## Current Direction

The Poem Room is a personal poetry website designed first as a warm, welcoming
homepage and later as a searchable literary archive.

Poems will not be generated automatically. The user will share poems directly
with Codex, and Codex will add them to the website intentionally, with any
supporting notes, tags, or collections the user wants.

The site should feel like:

> a soft, floral, feminine digital poetry room: intimate, calm, warm, and thoughtful.

## Homepage Priorities

The homepage is the current centre of the site.

It should include:

- a welcome message area
- a short summary of the site's purpose and core functionality
- a little biography/about section
- a clear space for a portrait image of the author
- gentle links toward poems, bio, and future archive sections

The homepage should feel personal and inviting rather than like a product page,
blog feed, or technical archive.

## Content Workflow

The user does not need a public-facing poem template or upload system.

Current workflow:

- the user shares poems directly with Codex
- Codex displays them on the site
- Codex can add poem pages, collection pages, tags, marginalia, or archive
  features as real content arrives

Avoid:

- fake poem records
- public template pages
- generated poems
- placeholder poems presented as content
- upload/editor UI unless the user asks for it later

## Visual Style

The aesthetic should be:

- soft
- casually feminine
- floral
- ambient
- warm
- intimate
- reflective
- slightly dreamy
- literary without feeling stiff

Preferred colours:

- cream and ivory
- blush pink
- rose
- dusty mauve
- soft lavender
- muted warm greys
- occasional pale sage accents
- moonlight-style dark mode with rose/lavender warmth

The background should use a soft floral ambient treatment:

- warm blush glows
- subtle petal or bloom shapes
- gentle rose/lavender gradients
- no loud wallpaper
- no visual clutter behind important text

## Typography

Use:

- elegant serif typography for the site name, headings, and future poems
- clean sans-serif typography for navigation and UI
- generous line spacing
- readable text sizes
- calm spacing that supports long reading sessions

## Accessibility & AuDHD-Friendly Design

This remains important.

The site should:

- avoid sensory overload
- avoid sudden or flashy animation
- support dark mode
- support responsive layouts
- keep navigation consistent and predictable
- maintain excellent readability
- use low visual clutter
- keep backgrounds soft enough that text remains clear
- feel safe and comfortable to spend time in

## Future Poetry Features

When poems are added, the site may grow to include:

- individual poem pages
- poem collections
- a searchable archive
- tags and themes
- mood labels
- related poems
- marginalia / poet's notes
- reading mode
- random poem button

Future poem pages should prioritise the poem text first. Notes and metadata
should sit beneath or beside the poem as secondary context.

## Marginalia / Poet's Notes

When useful, poem pages can include optional reflective notes such as:

- Writing Process
- Approximate Writing Time
- Written During
- Themes
- Influences
- Notes
- Related Poems
- Collection
- Mood
- Form & Technique
- Personal Reflection

Not every poem needs every field.

## Technical Preferences

Current implementation:

- static HTML/CSS/JS
- lightweight
- responsive
- dark-mode capable

Potential future implementation:

- Astro or Next.js
- Markdown/MDX-backed poem pages
- static site generation
- easy long-term maintenance

## Emotional Goal

The site should feel like entering someone's carefully tended emotional and
philosophical room.

It should encourage:

- slow reading
- curiosity
- intimacy
- reflection
- softness with seriousness
- a sense that the poems are being kept with care

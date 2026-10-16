# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static tutorial website hosted on GitHub Pages. Guides non-technical artist clients through setting up a GitHub Pages repository (creating account, repo, settings, inviting collaborator, enabling Pages). Target audience is artists with no coding experience.

## Architecture

Plain HTML/CSS/JS — no build tools, no frameworks, no static site generator.

- `index.html` — Shell page with placeholder containers; chapter content is rendered by JS
- `tutorial.js` — **Chapter data file.** Array of chapter objects with `title`, `subtitle`, and `body` (array of typed content blocks: `p`, `img`, `tip`, `warning`). Edit this file to add/change tutorial content.
- `script.js` — Reads `chapters` from `tutorial.js` and renders the table of contents + chapter sections. Loaded after `tutorial.js`.
- `style.css` — All styling. Plain documentation look
- `images/` — Tutorial screenshots

## Design Direction

Readability first — plain, book-like documentation page (modeled on the words_made_of_pixels reader).

- **Font**: Crimson Text (Google Fonts) for everything
- **Layout**: single centered column, max-width 800px, white background, 20px text, 1.7 line height
- **No decoration**: no animations, panels, collapsibles or progress bars

## Development

No build step. Open `index.html` in a browser to preview. Deployed via GitHub Pages from the `main` branch root.

## Key Conventions

- All interactivity is vanilla JS — no libraries
- Tutorial content lives in `tutorial.js` as structured data; `script.js` renders it — don't hand-write chapter HTML in `index.html`
- Images link to the full-size file (opens in a new tab)
- All chapters are always visible; the table of contents links to `#chN` anchors

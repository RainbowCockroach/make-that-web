# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static tutorial website hosted on GitHub Pages. Guides non-technical artist clients through setting up a GitHub Pages repository (creating account, repo, settings, inviting collaborator, enabling Pages). Target audience is artists with no coding experience.

## Architecture

Plain HTML/CSS/JS — no build tools, no frameworks, no static site generator.

- `index.html` — Shell page with placeholder containers; chapter content is rendered by JS
- `tutorial.js` — **Chapter data file.** Array of chapter objects with `title`, `navLabel`, `subtitle`, `open`, and `body` (array of typed content blocks: `p`, `img`, `tip`, `warning`). Edit this file to add/change tutorial content.
- `script.js` — Reads `chapters` from `tutorial.js`, renders the overview bar + chapter `<details>` elements, then wires up scroll progress bar, image lightbox (zoom/pan/pinch), and "next chapter" navigation. Loaded after `tutorial.js`.
- `style.css` — All styling. 8-bit pixel RPG aesthetic with dark forest theme, fireflies, NES-style dialog box panels
- `images/` — Tutorial screenshots

## Design Direction

- **Aesthetic**: Retro RPG feel with emerald forest background and firefly animations, but readable
- **Fonts**: Comic Neue for everything (friendly Comic Sans-like font, readable at all sizes)
- **Panels**: Double-border retro panels with slight rounding (`.rpg-panel` class)
- **Shapes**: Flower-shaped `clip-path` for chapter numbers and progress pips
- **Animations**: Use CSS `steps()` timing for retro feel
- **No nav bar** — content flows directly from hero

## Development

No build step. Open `index.html` in a browser to preview. Deployed via GitHub Pages from the `main` branch root.

## Key Conventions

- All interactivity is vanilla JS — no libraries
- Tutorial content lives in `tutorial.js` as structured data; `script.js` renders it — don't hand-write chapter HTML in `index.html`
- Images are clickable for fullscreen lightbox with zoom/pan
- Chapter sections use `<details>` elements; "Next" links auto-open and scroll to the next chapter

# PIJU — Meme Token Website

## Project Overview
Official landing page for PIJU, a community-driven meme token. Part of the Dark Pinoverse.

## Tech Stack
- Pure HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript
- No build system or package manager required

## Project Structure
- `index.html` — Main landing page (single-page site, ~1700 lines)
- `css/style.css` — Custom styles
- `js/animations.js` — Animation logic
- `assets/` — Images, videos, audio

## Running the Project
Served via Python's built-in HTTP server:
```
python3 -m http.server 5000 --bind 0.0.0.0
```

## Deployment
Configured as a static site deployment with `publicDir: "."`.

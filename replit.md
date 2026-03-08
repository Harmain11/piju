# PIJU — Meme Token Website

## Project Overview
Official landing page for PIJU, a community-driven Solana meme token. Part of the Dark Pinoverse.

## Tech Stack
- **Frontend**: Pure HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **Backend**: PHP 8.2 built-in server — serves static files and Claude chatbot API
- **AI**: Anthropic Claude (claude-haiku-4-5) via ANTHROPIC_API_KEY

## Project Structure
- `index.html` — Main landing page
- `css/style.css` — Custom styles
- `js/animations.js` — Page animation logic
- `js/chatbot.js` — PIJU chatbot chat bubble UI and logic
- `assets/` — Images, videos, audio
- `api/chat.php` — Chatbot API endpoint (PHP + cURL → Anthropic)
- `api/config.php` — API key config (reads env var or hardcoded value)
- `api/.htaccess` — Blocks public access to config.php
- `.htaccess` — Apache routing for Hostinger

## Running Locally (Replit)
```
php -S 0.0.0.0:5000 -t .
```
The ANTHROPIC_API_KEY secret is automatically passed as an environment
variable, so api/config.php picks it up without any changes.

## Deployment
Hosted on Hostinger shared hosting. See DEPLOY.txt for full instructions.
Add the API key in api/config.php before uploading.

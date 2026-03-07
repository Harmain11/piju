# PIJU — Meme Token Website

## Project Overview
Official landing page for PIJU, a community-driven Solana meme token. Part of the Dark Pinoverse.

## Tech Stack
- **Frontend**: Pure HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **Backend**: Python Flask — serves static files and Claude chatbot API
- **AI**: Anthropic Claude (claude-haiku-4-5) via ANTHROPIC_API_KEY secret

## Project Structure
- `index.html` — Main landing page (~1715 lines)
- `server.py` — Flask server: serves static files + `/api/chat` endpoint
- `css/style.css` — Custom styles
- `js/animations.js` — Animation logic
- `js/chatbot.js` — PIJU chatbot chat bubble UI and logic
- `assets/` — Images, videos, audio

## Running the Project
```
python3 server.py
```
Runs on port 5000 (0.0.0.0).

## Chatbot
- Chat bubble appears in bottom-right corner using the PIJU mascot image
- Powered by Claude (claude-haiku-4-5)
- Knows all PIJU website content: token info, roadmap, team, social links, launch date
- Matches website aesthetic: dark background, yellow/gold Orbitron font, glow effects
- Quick suggestion buttons for common questions
- Maintains conversation history within session

## Environment Variables
- `ANTHROPIC_API_KEY` — Required for Claude chatbot

## Deployment
Configured as autoscale deployment running `python3 server.py`.

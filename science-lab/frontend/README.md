# ⚗️ Science Lab — Unblocked Games

An educational-themed games/simulations website with a Python FastAPI backend and React frontend.

## Quick Start

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend (dev mode)
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

### Production Build
```bash
cd frontend
npm run build
# Then just run the backend — it serves the built frontend too
cd ../backend
uvicorn main:app --port 8000
```
Open http://localhost:8000

## Project Structure
```
science-lab/
├── backend/
│   ├── main.py          # FastAPI app + game proxy
│   ├── games.json       # Game data (add more here!)
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       └── components/
│           ├── GameCard.jsx
│           ├── GameFrame.jsx
│           ├── SearchBar.jsx
│           └── Particles.jsx
└── README.md
```

## Adding Games
Edit `backend/games.json` — each game needs:
```json
{
  "id": "unique-id",
  "title": "Display Name",
  "category": "Arcade|Puzzle|Strategy|Educational|Skill",
  "thumbnail": "🎮",
  "url": "https://game-url.com",
  "description": "Short description",
  "featured": false
}
```

## Deployment (Stay Unblocked)
- Deploy to **Vercel / Netlify / Cloudflare Pages** (trusted IPs)
- Use a neutral domain: `science-lab.app`, `study-sim.net`
- **Avoid** words like "games", "unblocked", "play" in your domain/title
- Enable Cloudflare proxy for extra protection
- Use the `/play/{id}` proxy endpoint to serve games through your own domain

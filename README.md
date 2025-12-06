# Pimp Your Grill 🔥
## Rularea aplicatie

-cd frontend
-npm install
-npm run dev
## Tehnologii utilizate
- React
- Vite
- TypeScript
- HTML & CSS
- Node.js (pentru rulare locală)
- Git & GitHub
  ## Funcționalitățile aplicației

## Structura Proiectului

```
proiect-IT-grill/
├── frontend/          # Aplicația React (Vite + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── assets/
│   └── package.json
│
├── backend/           # API Server (Node.js + Express)
│   ├── src/
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## Instalare

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Aplicația va rula pe: http://localhost:8080

### Backend
```bash
cd backend
npm install
npm run dev
```
API-ul va rula pe: http://localhost:3001

## API Endpoints

| Metodă | Endpoint | Descriere |
|--------|----------|-----------|
| GET | /api/grills | Lista grătarelor |
| GET | /api/grills/:id | Un grătar specific |
| POST | /api/grills | Adaugă grătar nou |
| PUT | /api/grills/:id/vote | Votează un grătar |
| DELETE | /api/grills/:id | Șterge un grătar |
| POST | /api/auth/register | Înregistrare utilizator |
| POST | /api/auth/login | Autentificare |

## Tehnologii Folosite

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

### Backend
- Node.js
- Express.js
- CORS

## Autori
Liga AC - LSAC 2025

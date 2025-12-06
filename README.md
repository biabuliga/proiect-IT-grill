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

Aplicația include următoarele funcționalități:

- **Homepage** – pagină principală de prezentare a aplicației
- **Header & Footer** – componente reutilizabile afișate pe toate paginile
- **Register** – crearea unui cont nou de utilizator
- **Login** – autentificarea utilizatorilor existenți
- **Authorization** – acces restricționat la anumite funcționalități pentru utilizatorii autentificați
- **Profile** – pagină de profil a utilizatorului
- **Adding new Grill** – adăugarea unui grill nou în aplicație
- **Leaderboard** – afișarea unui clasament
- **Liking Posts** – posibilitatea de a aprecia postările
- **Searching Grills** – căutarea grill-urilor după criterii relevante

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

## Ce am invatat
În cadrul acestui proiect am învățat:

-cum să dezvolt o aplicație frontend folosind React și Vite
-cum să dau prompturi exacte
-cum să folosesc Git și GitHub pentru versionarea codului
-cum să rulez și să testez local o aplicație web

## Autori
Liga AC - LSAC 2025

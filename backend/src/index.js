const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Date temporare (în producție ar fi o bază de date)
let users = [];
let grills = [
  {
    id: "1",
    name: "Grătarul Domnesc",
    description: "Cel mai tare grătar din cartier, perfect pentru mici și cârnați de casă.",
    author: "Mihai Popescu",
    authorId: "demo-1",
    votes: 1523,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "BBQ Master Pro",
    description: "Grătar profesional pentru evenimente mari.",
    author: "Andrei Ionescu",
    authorId: "demo-2",
    votes: 987,
    createdAt: new Date().toISOString()
  }
];

// Routes

// GET - Toate grătarele
app.get('/api/grills', (req, res) => {
  res.json(grills);
});

// GET - Un grătar specific
app.get('/api/grills/:id', (req, res) => {
  const grill = grills.find(g => g.id === req.params.id);
  if (!grill) {
    return res.status(404).json({ message: 'Grătarul nu a fost găsit' });
  }
  res.json(grill);
});

// POST - Adaugă un grătar nou
app.post('/api/grills', (req, res) => {
  const { name, description, author, authorId, image } = req.body;
  
  const newGrill = {
    id: Date.now().toString(),
    name,
    description,
    author,
    authorId,
    image,
    votes: 0,
    createdAt: new Date().toISOString()
  };
  
  grills.push(newGrill);
  res.status(201).json(newGrill);
});

// PUT - Votează un grătar
app.put('/api/grills/:id/vote', (req, res) => {
  const grill = grills.find(g => g.id === req.params.id);
  if (!grill) {
    return res.status(404).json({ message: 'Grătarul nu a fost găsit' });
  }
  
  grill.votes += 1;
  res.json(grill);
});

// DELETE - Șterge un grătar
app.delete('/api/grills/:id', (req, res) => {
  const index = grills.findIndex(g => g.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Grătarul nu a fost găsit' });
  }
  
  grills.splice(index, 1);
  res.json({ message: 'Grătarul a fost șters' });
});

// Auth Routes

// POST - Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  
  // Verificăm dacă email-ul există
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email-ul este deja folosit' });
  }
  
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    password, // În producție ar trebui hash-uit cu bcrypt
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Returnăm user fără parolă
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// POST - Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Email sau parolă greșită' });
  }
  
  // Returnăm user fără parolă
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serverul funcționează!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 Backend server running at http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   GET    /api/grills        - Lista grătarelor`);
  console.log(`   GET    /api/grills/:id    - Un grătar`);
  console.log(`   POST   /api/grills        - Adaugă grătar`);
  console.log(`   PUT    /api/grills/:id/vote - Votează`);
  console.log(`   DELETE /api/grills/:id    - Șterge grătar`);
  console.log(`   POST   /api/auth/register - Înregistrare`);
  console.log(`   POST   /api/auth/login    - Autentificare`);
});


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser'); // ✅ Ajout nécessaire
const app = express();

// ✅ Middleware cookie-parser
app.use(cookieParser());

// ✅ Middleware body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ View engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connecté à MongoDB Atlas'))
  .catch((err) => console.error('❌ Erreur de connexion MongoDB :', err));

// ✅ Middleware de log des requêtes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ Routes
const homeRoutes = require('./routes/home');
app.use('/', homeRoutes);

app.use('/api/catways', require('./routes/catways'));
app.use('/api/reservations', require('./routes/reservations'));

// ✅ Ta route /api/users (modifiée dans users.js)
app.use('/api/users', require('./routes/users'));

// ✅ Authentification
app.use('/login', require('./routes/auth'));

// ✅ Route racine (accueil simple si homeRoutes absent)
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API du port de plaisance ⛵');
});

// ✅ Lancement serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(methodOverride('_method')); // OK ici, après création de app

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connecté à MongoDB Atlas'))
  .catch((err) => console.error('❌ Erreur de connexion MongoDB :', err));

// Log des requêtes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Import des modèles pour les routes HTML
const Catway = require('./models/catway');
const Reservation = require('./models/reservation');
const User = require('./models/user');

// Routes
const homeRoutes = require('./routes/home');    // page login + dashboard
app.use('/', homeRoutes);

// Route pour afficher la page HTML des catways (à garder en premier pour éviter conflit avec /api/catways)
app.get('/catways', async (req, res) => {
  try {
    const catways = await Catway.find().lean();
    res.render('catways', { catways });
  } catch (err) {
    console.error('Erreur chargement catways :', err);
    res.status(500).send('Erreur serveur');
  }
});

// *** Nouvelles routes HTML ***

// Page réservations
app.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find().lean();
    res.render('reservations', { reservations });
  } catch (err) {
    console.error('Erreur chargement réservations :', err);
    res.status(500).send('Erreur serveur');
  }
});

// Page utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().lean();
    res.render('users', { users });
  } catch (err) {
    console.error('Erreur chargement utilisateurs :', err);
    res.status(500).send('Erreur serveur');
  }
});

// Route documentation API
app.get('/docs', (req, res) => {
  res.render('docs');
});

// Routes API REST (garde les comme ils sont)
app.use('/api/catways', require('./routes/catways'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/users', require('./routes/users'));

// Authentification (login/logout)
app.use('/login', require('./routes/auth'));

// Route déconnexion : redirige vers la page d'accueil (login)
app.get('/logout', (req, res) => {
  // ici tu peux aussi détruire session si tu en as une
  res.redirect('/');
});

// 404 par défaut
app.use((req, res) => {
  res.status(404).send('❌ Page introuvable.');
});

// Lancer serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

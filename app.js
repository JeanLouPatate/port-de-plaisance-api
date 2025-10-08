require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/users');
const catwayRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservations');

app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/', reservationRoutes); // Les routes de reservations incluent /catways/:id/reservations


const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB:', err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (simple pour commencer)
app.use(session({
  secret: 'secretkey', // idéalement dans .env
  resave: false,
  saveUninitialized: false,
}));

// Moteur de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes basiques
app.get('/', (req, res) => {
  res.render('index', { user: req.session.user || null });
});

// Lancement serveur
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));


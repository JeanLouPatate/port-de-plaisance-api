const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Reservation = require('../models/reservation'); // modèle mongoose

// Dashboard (protégé)
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    // Récupérer toutes les réservations depuis MongoDB
    const reservations = await Reservation.find().lean();

    const today = new Date();

    res.render('dashboard', {
      username: req.user.username,
      email: req.user.email,
      currentDate: today.toLocaleDateString(),
      reservations
    });
  } catch (error) {
    console.error('Erreur lors du chargement du dashboard :', error);
    res.status(500).send('Erreur serveur');
  }
});

// Page d’accueil (formulaire de connexion)
router.get('/', (req, res) => {
  const error = req.query.error || null;
  res.render('home', { 
    error,
    email: '',
    password: ''
  });
});

module.exports = router;

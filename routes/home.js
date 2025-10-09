const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const fs = require('fs');
const path = require('path');

// Dashboard (protégé)
router.get('/dashboard', authMiddleware, (req, res) => {
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'reservations.json');
    const reservationsRaw = fs.readFileSync(dataPath, 'utf-8');
    const reservations = JSON.parse(reservationsRaw);

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
  // On ajoute email et password vides
  res.render('home', { 
    error,
    email: '',
    password: ''
  });
});

module.exports = router;

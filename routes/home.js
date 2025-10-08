const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Reservation = require('../models/reservation'); // Assure-toi que ce modèle est correct

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    // On récupère les réservations dont la date de fin est >= aujourd'hui (en cours)
    const today = new Date();
    const reservations = await Reservation.find({
      endDate: { $gte: today }
    }).sort({ startDate: 1 }).lean();

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

module.exports = router;

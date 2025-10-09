const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const auth = require('../middleware/authMiddleware');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// API REST JSON déjà existantes (tu les gardes)

// --- Routes pour affichage / gestion via EJS ---

// Afficher la page des réservations
router.get('/', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find().lean();
    res.render('reservations', { reservations });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// Créer une réservation via formulaire EJS
router.post('/', auth, async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.redirect('/api/reservations');
  } catch (error) {
    console.error('Erreur création réservation:', error);
    res.status(400).send('Erreur lors de la création de la réservation.');
  }
});

// Supprimer une réservation via formulaire EJS
router.delete('/:id', auth, async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/api/reservations');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;

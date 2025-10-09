const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// GET page réservations (HTML)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().lean();
    res.render('reservations', { reservations });
  } catch (err) {
    console.error('Erreur chargement réservations :', err);
    res.status(500).send('Erreur serveur');
  }
});

// POST depuis la page réservations (formulaire création)
router.post('/', async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);
    res.redirect('/reservations');
  } catch (err) {
    console.error('Erreur création réservation page HTML :', err);
    res.status(500).send('Erreur lors de la création');
  }
});

// DELETE depuis la page réservations (formulaire suppression)
router.delete('/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/reservations');
  } catch (err) {
    console.error('Erreur suppression réservation page HTML :', err);
    res.status(500).send('Erreur lors de la suppression');
  }
});

module.exports = router;

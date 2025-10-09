const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// GET toutes les réservations (API)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().lean();
    res.json(reservations);
  } catch (err) {
    console.error('Erreur API réservations GET :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST nouvelle réservation (API)
router.post('/', async (req, res) => {
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
    const newReservation = await Reservation.create({ catwayNumber, clientName, boatName, startDate, endDate });
    res.status(201).json(newReservation);
  } catch (err) {
    console.error('Erreur API réservations POST :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE réservation (API)
router.delete('/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Réservation supprimée' });
  } catch (err) {
    console.error('Erreur API réservations DELETE :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PUT ou PATCH si besoin

module.exports = router;

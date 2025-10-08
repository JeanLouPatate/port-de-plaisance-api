const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const auth = require('../middleware/authMiddleware');

// ✅ GET /api/reservations → Liste de toutes les réservations (protégé)
router.get('/', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ GET /api/reservations/:id → Détail d'une réservation (protégé)
router.get('/:id', auth, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ POST /api/reservations → Créer une réservation (protégé)
router.post('/', auth, async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Erreur création réservation:', error);
    res.status(400).json({ message: 'Erreur lors de la création de la réservation.' });
  }
});

// ✅ PUT /api/reservations/:id → Modifier une réservation (protégé)
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la réservation.' });
  }
});

// ✅ DELETE /api/reservations/:id → Supprimer une réservation (protégé)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

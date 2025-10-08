const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

/**
 * GET /catways/:id/reservations
 * Liste toutes les réservations pour un catway donné
 */
router.get('/catways/:id/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /catways/:id/reservations/:idReservation
 * Récupère une réservation par son id (MongoDB _id)
 */
router.get('/catways/:id/reservations/:idReservation', async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: req.params.id,
    });
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /catways/:id/reservations
 * Crée une réservation pour un catway
 */
router.post('/catways/:id/reservations', async (req, res) => {
  try {
    const { clientName, boatName, startDate, endDate } = req.body;
    const reservation = new Reservation({
      catwayNumber: req.params.id,
      clientName,
      boatName,
      startDate,
      endDate,
    });
    await reservation.save();
    res.status(201).json({ message: 'Réservation créée' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * PUT /catways/:id/reservations/:idReservation
 * Modifie une réservation
 */
router.put('/catways/:id/reservations/:idReservation', async (req, res) => {
  try {
    const updateData = req.body;
    const reservation = await Reservation.findOneAndUpdate(
      { _id: req.params.idReservation, catwayNumber: req.params.id },
      updateData,
      { new: true }
    );
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json({ message: 'Réservation modifiée', reservation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE /catways/:id/reservations/:idReservation
 * Supprime une réservation
 */
router.delete('/catways/:id/reservations/:idReservation', async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.idReservation,
      catwayNumber: req.params.id,
    });
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

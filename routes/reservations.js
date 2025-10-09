const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const auth = require('../middleware/authMiddleware');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// ROUTES EJS

// Page réservations (HTML)
router.get('/reservations', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find().lean();
    res.render('reservations', { reservations });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// POST formulaire EJS (redirection vers /reservations)
router.post('/reservations', auth, async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.redirect('/reservations');
  } catch (error) {
    console.error('Erreur création réservation:', error);
    res.status(400).send('Erreur lors de la création de la réservation.');
  }
});

// DELETE via formulaire EJS (redirection vers /reservations)
router.delete('/reservations/:id', auth, async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/reservations');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// ROUTES API REST (JSON) sous /api/reservations

// IMPORTANT : on enlève le préfixe /api/reservations ici car il est déjà dans app.js
router.get('/', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find().lean();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

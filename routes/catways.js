const express = require('express');
const router = express.Router();
const Catway = require('../models/catway');
const auth = require('../middleware/authMiddleware'); // Utiliser si tu veux protéger certaines routes

// GET /api/catways → liste de tous les catways (public)
router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET /api/catways/:id → un catway par MongoDB _id (public)
router.get('/:id', async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET /api/catways/numero/:numero → un catway par son numéro (public)
router.get('/numero/:numero', async (req, res) => {
  try {
    const numeroParam = parseInt(req.params.numero, 10);
    const catway = await Catway.findOne({ numero: numeroParam });
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /api/catways → ajouter un catway (protégé)
router.post('/', auth, async (req, res) => {
  try {
    const newCatway = new Catway(req.body);
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    console.error('Erreur création catway :', err); // <-- Ajouté pour debug
    res.status(400).json({ message: 'Erreur lors de la création' });
  }
});

// PUT /api/catways/:id → modifier un catway par _id (protégé)
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la modification' });
  }
});

// DELETE /api/catways/:id → supprimer un catway par _id (protégé)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.params.id);
    res.json({ message: 'Catway supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

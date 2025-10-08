const express = require('express');
const router = express.Router();
const Catway = require('../models/catway');

/**
 * GET /catways
 * Liste tous les catways
 */
router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /catways/:id
 * Récupère un catway par catwayNumber
 */
router.get('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /catways
 * Crée un nouveau catway
 */
router.post('/', async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    const catway = new Catway({ catwayNumber, catwayType, catwayState });
    await catway.save();
    res.status(201).json({ message: 'Catway créé' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * PUT /catways/:id
 * Modifie uniquement l'état d'un catway (pas le numéro ni le type)
 */
router.put('/:id', async (req, res) => {
  try {
    const { catwayState } = req.body;
    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState },
      { new: true }
    );
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json({ message: 'Etat du catway modifié', catway });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE /catways/:id
 * Supprime un catway
 */
router.delete('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
    res.json({ message: 'Catway supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

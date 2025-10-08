const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * GET /users
 * Liste tous les utilisateurs
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Ne pas retourner les passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /users/:email
 * Récupère un utilisateur par email
 */
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }, '-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /users
 * Crée un nouvel utilisateur
 */
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * PUT /users/:email
 * Modifie un utilisateur par email
 */
router.put('/:email', async (req, res) => {
  try {
    const updateData = req.body;
    // Interdire la modification du password via cette route simple (on pourra faire route dédiée si besoin)
    if (updateData.password) delete updateData.password;

    const user = await User.findOneAndUpdate({ email: req.params.email }, updateData, { new: true });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur modifié', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE /users/:email
 * Supprime un utilisateur par email
 */
router.delete('/:email', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

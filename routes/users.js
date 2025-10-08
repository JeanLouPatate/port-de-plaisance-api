const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/authMiddleware');

// POST /api/users
// Création d’un utilisateur (route publique)
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur création utilisateur:', error);
    res.status(400).json({ message: 'Erreur lors de la création de l’utilisateur.' });
  }
});

// GET /api/users
// Récupérer tous les utilisateurs (route protégée)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Erreur récupération utilisateurs:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// GET /api/users/:email
// Récupérer un utilisateur par email (route protégée)
router.get('/:email', auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    console.error('Erreur récupération utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// NOUVELLE ROUTE
// GET /api/users/id/:id
// Récupérer un utilisateur par MongoDB _id (route protégée)
router.get('/id/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    console.error('Erreur récupération utilisateur par ID:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// PUT /api/users/:email
// Mettre à jour un utilisateur par email (route protégée)
router.put('/:email', auth, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(updatedUser);
  } catch (error) {
    console.error('Erreur mise à jour utilisateur:', error);
    res.status(400).json({ message: 'Erreur lors de la mise à jour.' });
  }
});

// DELETE /api/users/:email
// Supprimer un utilisateur par email (route protégée)
router.delete('/:email', auth, async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ email: req.params.email });
    if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    console.error('Erreur suppression utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;

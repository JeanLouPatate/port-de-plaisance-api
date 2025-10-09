const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/authMiddleware');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// API REST JSON déjà existantes (à conserver)

// --- Routes EJS ---

// Afficher la liste des utilisateurs
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().lean();
    res.render('users', { users });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// Créer un utilisateur via formulaire
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect('/api/users');
  } catch (error) {
    console.error('Erreur création utilisateur:', error);
    res.status(400).send('Erreur création utilisateur : ' + error.message);
  }
});


// Supprimer un utilisateur via formulaire
router.delete('/:email', auth, async (req, res) => {
  try {
    await User.findOneAndDelete({ email: req.params.email });
    res.redirect('/api/users');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// GET /login — Affiche formulaire de connexion
router.get('/', (req, res) => {
  res.render('home', { error: null });
});

// POST /login — Traite la connexion
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.render('home', { error: 'Email ou mot de passe incorrect.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.render('home', { error: 'Email ou mot de passe incorrect.' });

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }); // 1 jour
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('home', { error: 'Erreur serveur, veuillez réessayer.' });
  }
});

// GET /logout — Déconnexion
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;

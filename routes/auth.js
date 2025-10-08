const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// POST /login
router.post('/login', async (req, res) => {
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

    // Stockage en cookie HTTPOnly
    res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }); // 1 jour

    // Redirection vers le dashboard
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('home', { error: 'Erreur serveur, veuillez réessayer.' });
  }
});

// GET /logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;

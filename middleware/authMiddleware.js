const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token;

  // 1. Vérifie token dans cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 2. Sinon dans header Authorization Bearer
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // Redirige vers la page login avec message optionnel
    return res.redirect('/?error=Veuillez-vous connecter');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Token invalide ou expiré : redirige vers login
    return res.redirect('/?error=Session expirée, reconnectez-vous');
  }
};

module.exports = authMiddleware;

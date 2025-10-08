const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token;

  // ✅ 1. Vérifie d'abord dans les cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // ✅ 2. Sinon, essaie dans les headers (Bearer)
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // ❌ Aucun token trouvé
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les données utilisateur dans req
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};

module.exports = authMiddleware;

# ⚓ Port de Plaisance - Gestion des Catways et Réservations

Ce projet est une application web développée en **Node.js** avec **Express** et **MongoDB**, permettant la gestion d’un port de plaisance :
- Réservation d’emplacements ("catways")
- Gestion des utilisateurs
- Suivi des bateaux et des disponibilités

---

## 📦 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/ton-pseudo/port-de-plaisance-api.git
cd port-de-plaisance-api
2. Installer les dépendances
bash
Copier le code
npm install
3. Créer un fichier .env
À la racine du projet, créer un fichier .env contenant :

ini
Copier le code
MONGODB_URI=mongodb+srv://<utilisateur>:<motdepasse>@cluster.mongodb.net/port
PORT=3000
Remplace les valeurs par celles de ton instance MongoDB Atlas ou locale.

🚀 Lancer l'application
bash
Copier le code
npm start
Le serveur sera accessible à l’adresse :
👉 http://localhost:3000/

📁 Structure du projet
bash
Copier le code
port-de-plaisance-api/
├── app.js                # Point d'entrée du serveur
├── models/               # Schémas Mongoose (Catway, Reservation, User)
├── routes/               # Routes Express (HTML + API)
│   ├── auth.js
│   ├── catways.js
│   ├── reservationsAPI.js
│   ├── reservationsHTML.js
│   └── users.js
├── views/                # Vues EJS (dashboard, reservations, catways, etc.)
├── public/               # (optionnel) fichiers statiques (CSS, JS)
├── middleware/           # Middleware d'authentification
├── .env                  # Variables d'environnement (non inclus dans Git)
├── package.json
└── README.md
✨ Fonctionnalités principales
🔐 Authentification utilisateur (login)

🗂 Tableau de bord avec affichage des réservations actives

📅 Création, suppression de réservations

⚓ Gestion des catways (ajout, modification, suppression)

👤 Gestion des utilisateurs

📡 API REST complète pour les données

🔧 Technologies utilisées
Node.js

Express

MongoDB + Mongoose

EJS pour le rendu HTML côté serveur

dotenv pour la gestion des variables d’environnement

method-override pour supporter PUT/DELETE en HTML

📘 Documentation API
Une page dédiée est disponible sur :
👉 http://localhost:3000/docs

Tu peux aussi tester les routes GET, POST, DELETE via Postman, Insomnia ou Thunder Client.

🛠 À faire (Roadmap)
 Système d'inscription utilisateur

 Interface admin avec statistiques

 Tests unitaires

 Pagination des réservations

 Recherche et filtres dans les tableaux

📮 Auteurs / Contributeurs
👤 Projet réalisé dans le cadre du CEF - Formation Développeur Fullstack 

💻 Développé par : Loulou

📄 Licence
Ce projet est librement réutilisable dans un contexte éducatif ou personnel.
Aucune garantie de production.


# Application Docker

> Développé par Jimmy DOUSSAIN

## 📋 Table des matières
- [Vue d'ensemble](#vue-densemble)
- [Environnements](#environnements)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Commandes utiles](#commandes-utiles)
- [Dépannage](#dépannage)
- [Architecture](#architecture)

## 🔍 Vue d'ensemble
TP Docker

## 🌍 Environnements

### Développement
- Volumes montés (hot-reload)
- Services de développement :
  - PHPMyAdmin
  - MailHog
- Ports de debugging exposés
- Variables d'environnement de développement

### Production
- Images optimisées multi-stage
- Configuration des logs
- Haute disponibilité (restart: always)
- Réseaux isolés

## ⚙️ Prérequis
- Docker
- Docker Compose
- Git

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone https://github.com/Doxteur/docker-tp-d-jimmy.git
```
2. **Se rendre dans le dossier du projet**
```bash
cd docker-tp-d-jimmy
```

3. **Lancer le projet**
3.1 **Développement**
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.development up --build -d
```
3.2 **Production**
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.production up --build -d
```

4. **Accéder à l'application**
- Développement :
  - Frontend : [http://localhost:5173](http://localhost:5173)
  - Backend : [http://localhost:3000](http://localhost:3000)
  - MailHog : [http://localhost:8025](http://localhost:8025)
  - PHPMyAdmin : [http://localhost:8080](http://localhost:8080)
  - MySQL : [http://localhost:3306](http://localhost:3306)
- Production :
  - Frontend : [http://localhost:80](http://localhost:80)
  - Backend : [http://localhost:3000](http://localhost:3000)
  - MySQL : [http://localhost:3306](X pas de port accessible de l'extérieur)

## 📚 Documentation
- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/en/docs/)
- [React](https://reactjs.org/docs/getting-started.html)
- [Express](https://expressjs.com/en/starter/installing.html)

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const app = express();

// Configuration de la base de données
const dbConfig = {
    host: 'mysql', // nom du service dans docker-compose
    user: 'devuser',
    password: 'devpass',
    database: 'myapp_dev'
};

// Création du pool de connexion
const pool = mysql.createPool(dbConfig);

// Configuration du transporteur SMTP pour MailHog
const transporter = nodemailer.createTransport({
    host: 'mailhog',  // nom du service dans docker-compose
    port: 1025,
    secure: false,
    ignoreTLS: true
});

// Middleware
app.use(cors());
app.use(express.json());

// Route de test de connexion
app.get('/test-db', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT 1 as test');
        connection.release();
        res.json({ message: 'Connexion DB réussie!', data: rows });
    } catch (error) {
        console.error('Erreur de connexion:', error);
        res.status(500).json({ message: 'Erreur de connexion DB', error: error.message });
    }
});


// Route de test pour l'envoi d'email
app.post('/send-test-email', async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: '"Test Sender" <test@example.com>',
            to: "destinataire@example.com",
            subject: "Email de test ✔",
            text: "Ceci est un email de test envoyé via MailHog",
            html: "<b>Ceci est un email de test envoyé via MailHog</b>"
        });

        res.json({
            message: 'Email envoyé avec succès',
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Erreur d\'envoi:', error);
        res.status(500).json({
            message: 'Erreur lors de l\'envoi de l\'email',
            error: error.message
        });
    }
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

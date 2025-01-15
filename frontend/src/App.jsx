import { useState } from 'react'
import './App.css'

function App() {
  const [dbStatus, setDbStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [emailStatus, setEmailStatus] = useState(null)

  // Fonction pour tester la connexion
  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/test-db')
      const data = await response.json()
      setDbStatus(`${data.message} (Résultat du test: ${data.data[0].test})`)
    } catch (error) {
      setDbStatus('Erreur de connexion: ' + error.message)
    }
    setLoading(false)
  }

  // Nouvelle fonction pour tester l'envoi d'email
  const testEmail = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/send-test-email', {
        method: 'POST'
      })
      const data = await response.json()
      setEmailStatus(`Email envoyé avec succès! ID: ${data.messageId}`)
    } catch (error) {
      setEmailStatus('Erreur d\'envoi: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h1>Test de la Base de Données</h1>

      <div className="card">
        <button onClick={testConnection} disabled={loading}>
          {loading ? 'Test en cours...' : 'Tester la connexion'}
        </button>

        {/* Affichage du statut DB */}
        <div className="status-section">
          <h3>Statut de la connexion:</h3>
          <p>{dbStatus || 'Aucun test effectué'}</p>
        </div>

        {/* Nouveau bouton et section pour le test email */}
        <button onClick={testEmail} disabled={loading} style={{ marginTop: '20px' }}>
          {loading ? 'Envoi en cours...' : 'Tester l\'envoi d\'email'}
        </button>

        <div className="status-section">
          <h3>Statut de l'email:</h3>
          <p>{emailStatus || 'Aucun email envoyé'}</p>
        </div>
      </div>
    </div>
  )
}

export default App

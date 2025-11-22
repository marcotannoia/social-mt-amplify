import { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app-root">
      <div className="app-gradient" />

      {/* TOP BAR */}
      <header className="topbar">
        <div className="logo">
          <span className="logo-main">SOCIAL.MT</span>
          <span className="logo-sub">discover • share • profile</span>
        </div>

        <button className="topbar-login" onClick={() => setShowLogin(true)}>
          Login
        </button>
      </header>

      {/* LAYOUT 3 COLONNE */}
      <main className="layout">
        {/* COLONNA SINISTRA - POST / DISCOVER */}
        <section className="column">
          <h2 className="section-title">Explore</h2>
          <p className="section-text">
            Esplora i contenuti anche senza account.  
            Qui più avanti potrai mettere filtri, categorie, trend.
          </p>

          <div className="card-placeholder">
            <div className="pill pill-small" />
            <div className="line line-wide" />
            <div className="line line-medium" />
          </div>

          <div className="card-placeholder">
            <div className="pill pill-small" />
            <div className="line line-wide" />
            <div className="line line-short" />
          </div>
        </section>

        {/* COLONNA CENTRALE - FEED */}
        <section className="column column-main">
          <h2 className="section-title">Feed</h2>
          <p className="section-text">
            Qui mostrerai la lista dei post presi da Amplify.  
            È visibile anche ai non registrati.
          </p>

          {/* Esempio di card post */}
          <article className="post-card">
            <div className="post-header">
              <div className="avatar" />
              <div>
                <div className="username">mt_user</div>
                <div className="timestamp">2 min fa</div>
              </div>
            </div>
            <div className="post-image-placeholder" />
            <p className="post-caption">Questo è un esempio di post nel feed.</p>
          </article>

          <article className="post-card">
            <div className="post-header">
              <div className="avatar" />
              <div>
                <div className="username">guest_profile</div>
                <div className="timestamp">10 min fa</div>
              </div>
            </div>
            <div className="post-image-placeholder" />
            <p className="post-caption">
              Più avanti qui caricherai le foto reali da S3.
            </p>
          </article>
        </section>

        {/* COLONNA DESTRA - PROFILE */}
        <section className="column">
          <h2 className="section-title">Profile</h2>
          <p className="section-text">
            Qui puoi mostrare un profilo pubblico base anche per gli ospiti.
            Quando l’utente sarà loggato, qui compariranno i suoi dati.
          </p>

          <div className="profile-preview">
            <div className="avatar avatar-large" />
            <div className="profile-name">Ospite</div>
            <div className="profile-username">@guest</div>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowLogin(true)}
          >
            Crea il tuo profilo
          </button>
        </section>
      </main>

      {/* MODALE LOGIN */}
      {showLogin && (
        <div className="modal-backdrop" onClick={() => setShowLogin(false)}>
          <div
            className="modal-card auth-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>

            <p className="app-subtitle">Sign in to continue</p>

            <Authenticator>
              {({ signOut, user }) =>
                user ? (
                  <div className="logged-in">
                    <h2>Hi {user?.username}</h2>
                    <p>Sei loggato. Ora potrai pubblicare e modificare i tuoi post.</p>
                    <div className="logged-in-actions">
                      <button className="logout-btn" onClick={signOut}>
                        Logout
                      </button>
                      <button
                        className="close-after-login-btn"
                        onClick={() => setShowLogin(false)}
                      >
                        Chiudi
                      </button>
                    </div>
                  </div>
                ) : null
              }
            </Authenticator>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

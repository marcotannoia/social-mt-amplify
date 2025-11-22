import { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "../App.css";

export default function Landing() {
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

      {/* COLONNE */}
      <main className="layout">
        {/* LEFT */}
        <section className="column">
          <h2 className="section-title">Explore</h2>
          <p className="section-text">
            Esplora i contenuti anche senza account.
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

        {/* CENTER */}
        <section className="column column-main">
          <h2 className="section-title">Feed</h2>
          <p className="section-text">
            Qui mostrerai i post reali presi da Amplify.
          </p>

          <article className="post-card">
            <div className="post-header">
              <div className="avatar" />
              <div>
                <div className="username">mt_user</div>
                <div className="timestamp">2 min fa</div>
              </div>
            </div>
            <div className="post-image-placeholder" />
            <p className="post-caption">Esempio di post.</p>
          </article>
        </section>

        {/* RIGHT */}
        <section className="column">
          <h2 className="section-title">Profile</h2>
          <p className="section-text">
            Profilo ospite visualizzabile da tutti.
          </p>

          <div className="profile-preview">
            <div className="avatar avatar-large" />
            <div className="profile-name">Ospite</div>
            <div className="profile-username">@guest</div>
          </div>

          <button className="primary-btn" onClick={() => setShowLogin(true)}>
            Crea il tuo profilo
          </button>
        </section>
      </main>

      {/* LOGIN MODAL */}
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
              {({ user, signOut }) =>
                user ? (
                  <div className="logged-in">
                    <h2>Hi {user?.username}</h2>
                    <p>Login effettuato.</p>
                    <button className="logout-btn" onClick={signOut}>
                      Logout
                    </button>
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

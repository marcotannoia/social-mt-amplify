import "../App.css";
import CreatePost from "./CreatePost.jsx";

export default function Home({ user }) {
  return (
    <div className="app-root">
      <div className="app-gradient" />

      <main className="layout">
        {/* COLONNA SINISTRA - SEGUITI */}
        <section className="column">
          <h2 className="section-title">Seguiti</h2>
          <p className="section-text">
            Qui vedrai i post delle persone che segui.
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

        {/* COLONNA CENTRALE - FEED + CREA POST */}
        <section className="column column-main">
          <h2 className="section-title">Feed</h2>
          <p className="section-text">
            Qui appariranno i post dal backend Amplify.
          </p>

          {/* CREA POST SOLO SE UTENTE LOGGATO */}
          {user && (
            <div style={{ marginBottom: "16px" }}>
              <CreatePost user={user} />
            </div>
          )}

          {/* Post placeholder */}
          <article className="post-card">
            <div className="post-header">
              <div className="avatar" />
              <div>
                <div className="username">mt_user</div>
                <div className="timestamp">2 min fa</div>
              </div>
            </div>
            <div className="post-image-placeholder" />
            <p className="post-caption">
              Questo è un esempio di post nel feed reale.
            </p>
          </article>
        </section>

        {/* COLONNA DESTRA - PROFILO UTENTE */}
        <section className="column">
          <h2 className="section-title">Profilo</h2>
          {user ? (
            <>
              <p className="section-text">
                Sei loggato come {user?.signInDetails?.loginId}.
              </p>
              {/* qui più avanti potremo mettere foto profilo, bio, ecc */}
            </>
          ) : (
            <p className="section-text">
              Effettua il login per vedere il tuo profilo e pubblicare post.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

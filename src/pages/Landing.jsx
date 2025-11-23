import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import { getUrl } from "aws-amplify/storage";
import "../App.css";

const client = generateClient();

export default function Landing() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Carichiamo i post "Per Te" (Tutti i post pubblici)
  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data: allPosts } = await client.models.Post.list();
        
        // Per ogni post, generiamo l'URL dell'immagine da S3
        const postsWithImages = await Promise.all(
          allPosts.map(async (post) => {
            if (post.imageKey) {
              const link = await getUrl({ path: post.imageKey });
              return { ...post, imageUrl: link.url };
            }
            return post;
          })
        );
        
        // Ordiniamo dal più recente
        // Nota: Idealmente useresti una query ordinata dal backend
        setPosts(postsWithImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (e) {
        console.error("Errore fetch post", e);
      }
    }
    fetchPosts();
  }, []);

  const goToLogin = () => {
    navigate("/home");
  };

  return (
    <div className="app-root">
      <div className="app-gradient" />

      {/* TOP BAR SEMPLIFICATA */}
      <header className="topbar">
        <div className="logo">
          <span className="logo-main">SOCIAL.MT</span>
          <span className="logo-sub">Per Te</span>
        </div>
        <button className="topbar-login" onClick={goToLogin}>
          Accedi
        </button>
      </header>

      <main className="layout">
        
        {/* SINISTRA: SUGGERITI (Loghi statici per ora) */}
        <section className="column">
          <h2 className="section-title">Consigliati</h2>
          <div className="profile-preview" style={{flexDirection:'row', justifyContent:'flex-start'}}>
             <div className="avatar" style={{background: 'red'}} />
             <div>
                <div className="username">Ferrari</div>
                <div className="section-text" style={{margin:0, fontSize:'10px'}}>@ferrari</div>
             </div>
          </div>
          <div className="profile-preview" style={{flexDirection:'row', justifyContent:'flex-start'}}>
             <div className="avatar" style={{background: 'blue'}} />
             <div>
                <div className="username">PlayStation</div>
                <div className="section-text" style={{margin:0, fontSize:'10px'}}>@sony</div>
             </div>
          </div>
        </section>

        {/* CENTRO: FEED "PER TE" */}
        <section className="column column-main">
          <h2 className="section-title">Per Te</h2>
          
          {posts.length === 0 && <p className="section-text">Caricamento feed...</p>}

          {posts.map((post) => (
            <article className="post-card" key={post.id}>
              <div className="post-header">
                <div className="avatar" />
                <div>
                  <div className="username">{post.ownerId}</div>
                  <div className="timestamp">{new Date(post.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              
              {post.imageUrl && (
                <img src={post.imageUrl} alt="Post" className="post-image" />
              )}
              
              <p className="post-caption">{post.caption}</p>
            </article>
          ))}
        </section>

        {/* DESTRA: WIDGET LOGIN */}
        <section className="column">
          <h2 className="section-title">Unisciti</h2>
          <p className="section-text">
            Vuoi pubblicare le tue foto e seguire i tuoi amici?
          </p>
          <div className="card-placeholder" style={{textAlign: 'center', padding: '30px 10px'}}>
             <h3>🔥</h3>
             <p style={{fontSize:'12px', color:'#999'}}>Entra nella community</p>
             <button className="primary-btn" onClick={goToLogin}>LOGIN</button>
          </div>
        </section>
      </main>
    </div>
  );
}
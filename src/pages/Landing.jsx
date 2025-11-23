import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import { getUrl } from "aws-amplify/storage";
import "../App.css";

const client = generateClient();

export default function Landing() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Scarica TUTTI i post pubblici
        const { data: allPosts } = await client.models.Post.list();
        
        const postsWithImages = await Promise.all(
          allPosts.map(async (post) => {
            if (post.imageKey) {
              const link = await getUrl({ path: post.imageKey });
              return { ...post, imageUrl: link.url };
            }
            return post;
          })
        );
        
        // Ordina per data (più recenti prima)
        setPosts(postsWithImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (e) {
        console.error("Errore caricamento post", e);
      }
    }
    fetchPosts();
  }, []);

  const goToLogin = () => {
    navigate("/home"); // Porta al login di Amplify
  };

  return (
    <div className="app-root">
      <div className="app-gradient" />

      {/* HEADER FISSO */}
      <header className="stories-container" style={{justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontWeight: '800', fontSize: '20px', letterSpacing: '-1px'}}>
          Social.MT
        </div>
        <button 
          onClick={goToLogin}
          style={{background: '#fff', color: '#000', border:'none', padding: '6px 14px', borderRadius: '20px', fontWeight: '600', cursor:'pointer'}}
        >
          Accedi
        </button>
      </header>

      {/* FEED CENTRALE */}
      <div className="mobile-feed-layout">
        <h3 style={{paddingLeft: '10px', marginTop: '10px'}}>Per Te 🔥</h3>
        
        {posts.length === 0 && <p style={{textAlign:'center', color:'#666'}}>Caricamento feed...</p>}

        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <div className="post-header">
              <div className="avatar" />
              <div className="username">{post.ownerId}</div>
            </div>
            
            {post.imageUrl && (
              <img src={post.imageUrl} alt="Post" className="post-image" />
            )}
            
            <div className="post-actions">
               {/* Icone fittizie per invito all'azione */}
              <span onClick={goToLogin} style={{cursor:'pointer'}}>🤍</span> 
              <span onClick={goToLogin} style={{cursor:'pointer'}}>💬</span>
            </div>

            <div className="post-caption">
              <strong>{post.ownerId}</strong>
              {post.caption}
            </div>
          </article>
        ))}
      </div>

      {/* NAVBAR IN BASSO (VERSIONE GUEST) */}
      <nav className="bottom-navbar">
        <div style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
          Accedi per creare post e seguire amici
        </div>
        <button 
          className="primary-btn" 
          style={{width: 'auto', padding: '8px 20px', background: '#0095f6'}}
          onClick={goToLogin}
        >
          Login
        </button>
      </nav>

    </div>
  );
}
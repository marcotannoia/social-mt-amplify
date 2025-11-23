import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { getUrl } from "aws-amplify/storage";
import { useNavigate } from "react-router-dom";
import "../App.css";

const client = generateClient();

export default function Home({ user }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // QUI in futuro filtrerai solo i "Seguiti". 
    // Per ora mostriamo tutto il feed come placeholder funzionale.
    async function fetchPosts() {
      try {
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
        setPosts(postsWithImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (e) {
        console.error(e);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="app-root">
      <div className="app-gradient" />

      <header className="topbar">
        <div className="logo">
          <span className="logo-main">SOCIAL.MT</span>
          <span className="logo-sub">Seguiti</span>
        </div>
        {/* Mostriamo chi è loggato */}
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
           <span style={{fontSize:'12px', color:'#ccc'}}>Ciao, {user?.signInDetails?.loginId}</span>
        </div>
      </header>

      <main className="layout">
        
        {/* SINISTRA: LOGHI PERSONE SEGUITE */}
        <section className="column">
          <h2 className="section-title">I tuoi Follow</h2>
          {/* Esempio statico */}
          <div className="profile-preview" style={{flexDirection:'row', justifyContent:'flex-start'}}>
             <div className="avatar" style={{background: 'purple'}} />
             <div className="username">Amico 1</div>
          </div>
          <div className="profile-preview" style={{flexDirection:'row', justifyContent:'flex-start'}}>
             <div className="avatar" style={{background: 'green'}} />
             <div className="username">Amico 2</div>
          </div>
        </section>

        {/* CENTRO: FEED SEGUITI */}
        <section className="column column-main">
          <h2 className="section-title">Feed Amici</h2>
          {posts.map((post) => (
            <article className="post-card" key={post.id}>
              <div className="post-header">
                <div className="avatar" />
                <div className="username">{post.ownerId}</div>
              </div>
              {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
              <p className="post-caption">{post.caption}</p>
            </article>
          ))}
        </section>

        {/* DESTRA: LINK AL PROFILO */}
        <section className="column">
          <h2 className="section-title">Il tuo spazio</h2>
          <div className="profile-preview">
            <div className="avatar avatar-large" />
            <div className="profile-name">Tu</div>
            <button 
              className="primary-btn" 
              onClick={() => navigate("/profile")}
            >
              Vai al Profilo & Crea
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
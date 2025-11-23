import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { getUrl } from "aws-amplify/storage";
import { useNavigate } from "react-router-dom";
import "../App.css";

const client = generateClient();

export default function Home({ user }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Storie finte per demo
  const stories = [
    { id: 1, user: "Tu", isMe: true },
    { id: 2, user: "Anna" },
    { id: 3, user: "Marco" },
    { id: 4, user: "Giulia" },
    { id: 5, user: "Luca" },
  ];

  useEffect(() => {
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
      
      {/* 1. BARRA STORIE (In alto) */}
      <div className="stories-container">
        {stories.map((story) => (
          <div className="story-item" key={story.id}>
            <div className="story-ring">
              <div 
                className="story-avatar" 
                style={{background: story.isMe ? '#444' : `hsl(${Math.random()*360}, 60%, 50%)`}} 
              />
            </div>
            <span className="story-username">{story.user}</span>
          </div>
        ))}
      </div>

      {/* 2. FEED POST */}
      <div className="mobile-feed-layout">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <div className="post-header">
              <div className="avatar" style={{background: `hsl(${post.ownerId.length * 10}, 60%, 50%)`}} />
              <div className="username">{post.ownerId}</div>
              <span style={{marginLeft:'auto', color:'#888'}}>...</span>
            </div>
            
            {post.imageUrl && (
              <img src={post.imageUrl} alt="Post" className="post-image" />
            )}
            
            <div className="post-actions">
              <span>❤️</span> <span>💬</span> <span>🚀</span>
              <span style={{marginLeft:'auto'}}>🔖</span>
            </div>

            <div className="post-caption">
              <strong>{post.ownerId}</strong>
              {post.caption}
            </div>
          </article>
        ))}
        {/* Spazio vuoto finale per lo scroll */}
        <div style={{height: '60px'}}></div>
      </div>

      {/* 3. NAVBAR FISSA (In basso) */}
      <nav className="bottom-navbar">
        <button className="nav-item active" onClick={() => navigate("/home")}>
          <span className="nav-icon">🏠</span>
        </button>
        <button className="nav-item" onClick={() => alert("Cerca")}>
          <span className="nav-icon">🔍</span>
        </button>
        
        {/* Tasto CENTRALE (+) per Creare */}
        <button className="nav-item nav-item-create" onClick={() => navigate("/profile")}>
          <div className="create-btn-circle">+</div>
        </button>

        <button className="nav-item" onClick={() => alert("Reels")}>
          <span className="nav-icon">🎬</span>
        </button>
        <button className="nav-item" onClick={() => navigate("/profile")}>
          <span className="nav-icon">👤</span>
        </button>
      </nav>
    </div>
  );
}
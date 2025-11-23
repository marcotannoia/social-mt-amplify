import "../App.css";
import CreatePost from "./CreatePost.jsx"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile({ user, signOut }) {
  const navigate = useNavigate();
  const [view, setView] = useState("grid"); // 'grid', 'create', 'edit'
  
  const [profileData, setProfileData] = useState({
    name: user?.signInDetails?.loginId?.split('@')[0] || "Utente",
    bio: "Creatore digitale 📸",
    stats: { posts: 12, followers: "1.2k", following: 340 }
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setView('grid');
  };

  return (
    <div className="app-root">
       
       {/* HEADER */}
       <div className="profile-header">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="avatar-large" style={{background: 'linear-gradient(45deg, #6366f1, #ec4899)'}} />
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{margin:0, fontSize:'22px'}}>@{profileData.name}</motion.h2>
          <p style={{color:'#94a3b8', fontSize:'13px', marginTop:'4px'}}>{profileData.bio}</p>
          
          <div style={{display:'flex', gap:'10px', justifyContent:'center', marginTop:'16px'}}>
             <button onClick={() => setView('edit')} className="primary-btn" style={{width:'auto', padding:'8px 20px', fontSize:'13px', background:'rgba(255,255,255,0.1)'}}>Modifica</button>
             <button onClick={signOut} style={{background:'transparent', border:'none', color:'#ef4444', fontWeight:'600', cursor:'pointer', fontSize:'13px'}}>Esci</button>
          </div>

          <div className="stats-row">
            <div className="stat-box"><span className="stat-num">{profileData.stats.posts}</span><span className="stat-label">Post</span></div>
            <div className="stat-box"><span className="stat-num">{profileData.stats.followers}</span><span className="stat-label">Follower</span></div>
            <div className="stat-box"><span className="stat-num">{profileData.stats.following}</span><span className="stat-label">Seguiti</span></div>
          </div>
       </div>

       {/* CONTENUTO */}
       <div className="mobile-feed-layout">
         <AnimatePresence mode="wait">
           
           {/* FORM CREA POST (Fix sovrapposizioni) */}
           {view === 'create' && (
             <motion.div key="create" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}}>
               <h3 style={{textAlign:'center', marginBottom:'10px'}}>Crea Nuovo Post</h3>
               {/* Il form ora ha uno sfondo scuro grazie al CSS .create-post-form */}
               <CreatePost user={user} />
               <button onClick={() => setView('grid')} style={{background:'transparent', border:'none', color:'#888', width:'100%', padding:'20px', cursor:'pointer'}}>Annulla</button>
             </motion.div>
           )}

           {/* GRIGLIA */}
           {view === 'grid' && (
             <motion.div key="grid" initial={{opacity: 0}} animate={{opacity: 1}} style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'2px'}}>
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} style={{aspectRatio:'1/1', background: `rgba(255,255,255, ${0.05 + (i * 0.01)})`, cursor:'pointer'}} />
               ))}
             </motion.div>
           )}

         </AnimatePresence>
       </div>

       {/* MODALE MODIFICA */}
       <AnimatePresence>
         {view === 'edit' && (
           <>
             <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onClick={() => setView('grid')} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex: 150}} />
             <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25 }} style={{position:'fixed', bottom:0, left:0, width:'100%', zIndex: 200}}>
               <div className="edit-profile-container">
                 <div style={{width:'40px', height:'4px', background:'#444', margin:'0 auto 20px', borderRadius:'2px'}} />
                 <h3 style={{textAlign:'center', marginBottom:'20px'}}>Modifica Profilo</h3>
                 <form onSubmit={handleSaveProfile}>
                   <input type="text" className="input-glass" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} placeholder="Nome Utente" />
                   <textarea className="input-glass" rows="3" value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} placeholder="Bio" />
                   <button type="submit" className="primary-btn">Salva</button>
                 </form>
               </div>
             </motion.div>
           </>
         )}
       </AnimatePresence>

      {/* NAVBAR */}
      <nav className="bottom-navbar">
        <button className="nav-item" onClick={() => navigate("/home")}><span>🏠</span></button>
        <button className="nav-item" onClick={() => alert("Cerca")}><span>🔍</span></button>
        <button className="nav-item" onClick={() => setView('create')}><div className="create-btn-circle">+</div></button>
        <button className="nav-item" onClick={() => alert("Attività")}><span>❤️</span></button>
        <button className="nav-item active" onClick={() => setView('grid')}><div style={{width:'24px', height:'24px', borderRadius:'50%', background:'linear-gradient(45deg, #6366f1, #ec4899)', border:'2px solid #fff'}}></div></button>
      </nav>
    </div>
  );
}
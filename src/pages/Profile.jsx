import "../App.css";
import CreatePost from "./CreatePost.jsx"; // Riutilizziamo il componente form
import { useNavigate } from "react-router-dom";

export default function Profile({ user, signOut }) {
  const navigate = useNavigate();

  return (
    <div className="app-root">
       <div className="app-gradient" />
       
       {/* Bottone Indietro */}
       <div style={{padding: '20px 40px'}}>
         <button 
           onClick={() => navigate("/home")}
           style={{background:'transparent', color:'#fff', border:'1px solid #555', padding:'8px 16px', borderRadius:'20px', cursor:'pointer'}}
         >
           ← Torna alla Home
         </button>
       </div>

       <main className="layout">
          {/* COLONNA SX: STATISTICHE */}
          <section className="column">
             <h2 className="section-title">Statistiche</h2>
             <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
               <span>Follower</span>
               <strong>120</strong>
             </div>
             <div style={{display:'flex', justifyContent:'space-between'}}>
               <span>Seguiti</span>
               <strong>45</strong>
             </div>
             <div className="line line-wide" style={{marginTop:'20px'}} />
          </section>

          {/* COLONNA CENTRALE: CREA POST (Importato qui) */}
          <section className="column column-main">
             <h2 className="section-title">Nuovo Post</h2>
             {/* Qui usiamo il componente che hai già creato */}
             <CreatePost user={user} />
             
             <div style={{marginTop:'40px'}}>
               <h3 className="section-title">I tuoi post recenti</h3>
               <p className="section-text">Qui apparirà la griglia delle tue foto.</p>
               {/* Placeholder Griglia */}
               <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                 <div style={{height:'100px', background:'#333', borderRadius:'8px'}} />
                 <div style={{height:'100px', background:'#333', borderRadius:'8px'}} />
               </div>
             </div>
          </section>

          {/* COLONNA DX: INFO UTENTE E LOGOUT */}
          <section className="column">
             <h2 className="section-title">Account</h2>
             <div className="profile-preview">
                <div className="avatar avatar-large" />
                <div className="profile-name">{user?.signInDetails?.loginId}</div>
                <div className="section-text">Utente Social.MT</div>
             </div>
             <button className="primary-btn" style={{background:'#ef4444'}} onClick={signOut}>
               Logout
             </button>
          </section>
       </main>
    </div>
  );
}
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

function App() {
  return (
    <div className="app-root">
      <div className="bg-blur" />

      <div className="login-card">
        <h1 className="app-title">social.mt</h1>
        <p className="app-subtitle">Sign in to continue</p>

        <Authenticator>
          {({ signOut, user }) => (
            <div className="logged-in">
              <h2>Ciao {user?.username}</h2>
              <p>Login riuscito. Qui poi metteremo il feed.</p>
              <button className="logout-btn" onClick={signOut}>
                Logout
              </button>
            </div>
          )}
        </Authenticator>
      </div>
    </div>
  );
}

export default App;

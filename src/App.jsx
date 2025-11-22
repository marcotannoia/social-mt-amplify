import { Routes, Route, Navigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

import Landing from "./pages/Landing.jsx";

import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import Profile from "./pages/Profile.jsx";
import CreatePost from "./pages/CreatePost.jsx"; // se non ce l’hai ancora, lascialo fuori


import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Routes>
      {/* ROUTE PUBBLICA: NIENTE LOGIN */}
      <Route path="/" element={<Landing />} />

      {/* ROUTE PROTETTE: SERVE LOGIN */}
      <Route
        path="/home"
        element={
          <Authenticator>
            {({ user }) => (
              <div className="app-wrapper">
                <Navbar />
                <Home user={user} />
              </div>
            )}
          </Authenticator>
        }
      />

      <Route
        path="/explore"
        element={
          <Authenticator>
            {({ user }) => (
              <div className="app-wrapper">
                <Navbar />
                <Explore user={user} />
              </div>
            )}
          </Authenticator>
        }
      />

      <Route
        path="/profile"
        element={
          <Authenticator>
            {({ user, signOut }) => (
              <div className="app-wrapper">
                <Navbar />
                <Profile user={user} signOut={signOut} />
              </div>
            )}
          </Authenticator>
        }
      />

      {/* Se hai la pagina Crea Post */}


      {/* Route fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <Routes>
      {/* Landing pubblica */}
      <Route path="/" element={<Landing />} />

      {/* App vera, protetta da login */}
      <Route
        path="/home"
        element={
          <Authenticator>
            {({ user, signOut }) => (
              // Home ha già il layout a 3 colonne
              <Home user={user} signOut={signOut} />
            )}
          </Authenticator>
        }
      />

      {/* Qualsiasi altra route rimanda alla landing */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

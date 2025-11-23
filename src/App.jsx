import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { AnimatePresence, motion } from "framer-motion";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

// Configurazione animazione pagina
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const Page = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition}
    style={{ width: "100%" }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* Landing pubblica: "Per Te" visibile a tutti */}
        <Route path="/" element={
          <Page><Landing /></Page>
        } />

        {/* Home privata: Feed "Seguiti" */}
        <Route path="/home" element={
          <Page>
            <Authenticator>
              {({ user, signOut }) => (
                <Home user={user} signOut={signOut} />
              )}
            </Authenticator>
          </Page>
        } />

        {/* Pagina Profilo: Dove crei i post e vedi i tuoi dati */}
        <Route path="/profile" element={
          <Page>
            <Authenticator>
              {({ user, signOut }) => (
                <Profile user={user} signOut={signOut} />
              )}
            </Authenticator>
          </Page>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
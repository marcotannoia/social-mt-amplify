import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { AnimatePresence, motion } from "framer-motion"; // IMPORT NUOVO
import "@aws-amplify/ui-react/styles.css";
import "./App.css";

import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";

// Configurazione animazione pagina
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

// Componente Wrapper per animare ogni pagina
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
  const location = useLocation(); // Necessario per tracciare il cambio pagina

  return (
    // AnimatePresence gestisce l'uscita del vecchio componente
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* Landing pubblica */}
        <Route path="/" element={
          <Page><Landing /></Page>
        } />

        {/* App vera */}
        <Route path="/home" element={
          <Page>
            <Authenticator>
              {({ user, signOut }) => (
                <Home user={user} signOut={signOut} />
              )}
            </Authenticator>
          </Page>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
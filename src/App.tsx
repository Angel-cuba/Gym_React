import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { ClerkProvider } from "@clerk/clerk-react";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { LoginModal } from "./components/Auth/LoginModal";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";

const CLERK_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY!;

const Home = React.lazy(() => import("./pages/Home"));
const ExerciseDetails = React.lazy(() => import("./pages/ExerciseDetails"));
const MyRoutines = React.lazy(() => import("./pages/MyRoutines"));

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const pageTransition = { duration: 0.38, ease: [0.22, 1, 0.36, 1] };

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetails />} />
          <Route path="/my-routines" element={<MyRoutines />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  const { loginModalOpen, closeLoginModal } = useAuth();
  return (
    <>
      <Box className="app-shell">
        <Navbar />
        <Suspense fallback={<div className="page-loading">Cargando...</div>}>
          <AnimatedRoutes />
        </Suspense>
        <Footer />
      </Box>
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_KEY}>
      <AuthProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default App;

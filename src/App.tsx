import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";

const Home = React.lazy(() => import("./pages/Home"));
const ExerciseDetails = React.lazy(() => import("./pages/ExerciseDetails"));

function App() {
  return (
    <Box className="app-shell">
      <Navbar />
      <Suspense fallback={<div className="page-loading">Loading workouts...</div>}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetails />} />
        </Routes>
      </Suspense>
      <Footer />
    </Box>
  );
}

export default App;

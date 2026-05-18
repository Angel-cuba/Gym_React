import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";
import "./App.css";

const Home = React.lazy(() => import("./pages/Home"));
const ExerciseDetails = React.lazy(() => import("./pages/ExerciseDetails"));

function App() {
  const { t } = useTranslation();

  return (
    <Box className="app-shell">
      <LanguageSwitcher />
      <Navbar />
      <Suspense fallback={<div className="page-loading">{t("loading")}</div>}>
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

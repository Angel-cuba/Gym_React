import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import ExerciseDetails from './pages/ExerciseDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return <Box width="400px" sx={{width: {xl: '1488px'}}} m="auto">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/exercise/:id" element={<ExerciseDetails/>} />
      </Routes>
      <Footer/>
  </Box>;
}

export default App;

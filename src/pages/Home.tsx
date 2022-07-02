import { Box } from '@mui/material';
import React from 'react';
import ExerciseList from '../components/ExerciseList';
import HeroBanner from '../components/HeroBanner';
import SearchExercises from '../components/SearchExercises';

const Home = () => {
  return (
    <Box>
      <HeroBanner />
      <SearchExercises />
      <ExerciseList />
    </Box>
  );
};

export default Home;

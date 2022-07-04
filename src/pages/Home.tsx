import { Box } from '@mui/material';
import React from 'react';
import ExerciseList from '../components/List/ExerciseList';
import HeroBanner from '../components/Banner/HeroBanner';
import SearchExercises from '../components/Search/SearchExercises';

const Home = () => {
  const [exercises, setExercises] = React.useState([]);
  const [bodyPart, setBodyPart] = React.useState('back');

  return (
    <Box>
      <HeroBanner />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <ExerciseList setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
    </Box>
  );
};

export default Home;

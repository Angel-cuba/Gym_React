import { Box } from '@mui/material';
import React from 'react';
import ExerciseList from '../components/List/ExerciseList';
import HeroBanner from '../components/Banner/HeroBanner';
import SearchExercises from '../components/Search/SearchExercises';
import { Exercise } from '../types/exercises.types';

const Home = () => {
  const [exercises, setExercises] = React.useState<Exercise[] | null>(null);
  const [bodyPart, setBodyPart] = React.useState('back');
  console.log('bodyParts', bodyPart);

  return (
    <Box>
      <HeroBanner />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <ExerciseList setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
    </Box>
  );
};

export default Home;

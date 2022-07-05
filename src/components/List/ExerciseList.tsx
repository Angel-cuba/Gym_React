import React from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';
import ExerciseCard from '../Search/Card/Card.Exercise';
import { Exercise } from '../../types/exercises.types';

const ExerciseList = ({ exercises, bodyPart, setExercises }: any) => {
  console.log('exercises', exercises);
  return (
    <Box id="exercises" sx={{ mt: { lg: '110px', xs: '30px' } }} mt={'50px'} p={'20px'}>
      <Typography variant="h3" mb="45px">
        Showing results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: '110px', xs: '50px' } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {exercises.map((exercise: Exercise, index: number) => {
          return <ExerciseCard key={index} exercise={exercise}/>;
        })}
      </Stack>
    </Box>
  );
};

export default ExerciseList;

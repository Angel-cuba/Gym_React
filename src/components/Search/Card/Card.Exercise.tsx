import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Button, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }: any) => {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Button
          sx={{
            marginLeft: '21px',
            color: 'white',
            backgroundColor: '#ffa9a9',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
            padding: '5px',
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            marginLeft: '21px',
            color: 'white',
            backgroundColor: '#fcc757',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
            padding: '5px',
          }}
        >
          {exercise.target}
        </Button>
      </Stack>
      <Typography
        ml="21px"
        color="#000"
        fontSize="18px"
        fontWeight="bold"
        mt="11px"
        pb="10px"
        textTransform="capitalize"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;

import React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

const SearchExercises = () => {
  return (
    <Stack alignItems="center" mt="38px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '50px', xs: '30px' } }}
        mb="50px"
        textAlign="center"
      >
        Awesome exercises you <br />
        Can do with your body
      </Typography>
    </Stack>
  );
};

export default SearchExercises;

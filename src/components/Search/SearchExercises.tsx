import React from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { fetchData, exerciseOptions } from '../../utils/fetchData';
import HorizontalScrollbar from '../HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }: any) => {
  const [search, setSearch] = React.useState('');
  const [bodyParts, setBodyParts] = React.useState([]);
  console.log('bodyParts', bodyParts);

  const searchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLocaleLowerCase());
  };

  React.useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      );
      setBodyParts(response);
    };
    fetchExercises();
  }, []);

  React.useEffect(() => {
    const handleSearch = async () => {
      if (search) {
        console.log('searching');
        const exercises = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises`,
          exerciseOptions
        );
        const filteredExercises = exercises.filter(
          (exercise: any) =>
            exercise.name.toLocaleLowerCase().includes(search) ||
            exercise.target.toLocaleLowerCase().includes(search) ||
            exercise.equipment.toLocaleLowerCase().includes(search) ||
            exercise.bodyPart.toLocaleLowerCase().includes(search)
        );
        setExercises(filteredExercises);
      }
    };

    handleSearch();
  }, [search, setExercises]);

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
      <Box position="relative" alignItems="center">
        <TextField
          sx={{
            input: { fontWeight: '700', borderRadius: '5px', border: 'none' },
            width: { lg: '900px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
          value={search}
          onChange={(e) => searchValue(e as any)}
          placeholder="Search for an exercise"
          type={'text'}
        />
        {/* <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '90px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
          }}
          // onClick={handleSearch}
        >
          Search
        </Button> */}
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px'}}>
        <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
      </Box>
    </Stack>
  );
};

export default SearchExercises;

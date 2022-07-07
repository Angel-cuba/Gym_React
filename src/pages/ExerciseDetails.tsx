import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Details from '../components/Details/Details';
import Similars from '../components/Details/Similars';
import Videos from '../components/Details/Videos';
import { Exercise } from '../types/exercises.types';
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';

const ExerciseDetails = () => {
  const { id } = useParams();

  const [exerciseDetails, setExercisesDetails] = React.useState<Exercise>();
  const [videos, setVideos] = React.useState();

  React.useEffect(() => {
    const exerciseDbUrl = async () => {
      const fetch = 'https://exercisedb.p.rapidapi.com/exercises';
      const ytUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${fetch}/exercise/${id}`, exerciseOptions);
      setExercisesDetails(exerciseDetailData);

      const exerciseYoutubeData = await fetchData(
        `${ytUrl}/search?query=${exerciseDetailData?.name}`,
        youtubeOptions
      );
      setVideos(exerciseYoutubeData.contents);
    };

    exerciseDbUrl();
  }, [id]);
  return (
    <Box>
      {/* Details */}
      <Details exerciseDetails={exerciseDetails} />
      {/* Videos */}
      <Videos videos={videos} name={exerciseDetails?.name}/>
      {/* Others */}
      <Similars />
    </Box>
  );
};

export default ExerciseDetails;

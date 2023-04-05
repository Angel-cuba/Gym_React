import React from 'react';
import { Box } from '@mui/material';
import Bodypart from './BodyParts/Bodypart';

import ExerciseCard from './Search/Card/Card.Exercise';
import Loader from './Loader';

const HorizontalScrollbar = ({
  data,
  bodyPart,
  setBodyPart,
  setExercises,
  isBodyParts,
  similarsTarget,
  equipment,
}: any) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {!data
        ? <Loader />
        : data?.slice(0, data.length > 11 ? 12 : data.length)?.map((item: any, index: number) => (
            <Box
              key={index}
              title={item.id || item}
              m="0 20px"
              p="10px"
              style={{
                borderRadius: '2px',
                borderTop: bodyPart === item ? '2px solid #ff2625' : ' ',
              }}
            >
              {isBodyParts ? (
                <Bodypart
                  item={item}
                  bodyPart={bodyPart}
                  setBodyPart={setBodyPart}
                  setExercises={setExercises}
                />
              ) : (
                <ExerciseCard exercise={item} />
              )}
            </Box>
          ))}
    </div>
  );
};

export default HorizontalScrollbar;

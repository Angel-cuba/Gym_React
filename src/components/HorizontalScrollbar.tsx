import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import Bodypart from './BodyParts/Bodypart';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import LeftArrowIcon from '../assets/icons/left-arrow.png';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import ExerciseCard from './Search/Card/Card.Exercise';

const HorizontalScrollbar = ({
  data,
  bodyPart,
  setBodyPart,
  setExercises,
  isBodyParts,
  similarsTarget,
  equipment,
}: any) => {
  console.log('data', data);
  console.log('similarsTarget', similarsTarget);
  console.log('equipment', equipment);
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
      {(
        data?.slice(0, data.length > 11 ? 12 : data.length) 
        //||
        // similarsTarget?.slice(0, similarsTarget.length > 11 ? 12 : similarsTarget.length) ||
        // equipment
      )?.map((item: any, index: number) => (
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

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

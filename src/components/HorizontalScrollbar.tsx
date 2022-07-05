import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import Bodypart from './BodyParts/Bodypart';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import LeftArrowIcon from '../assets/icons/left-arrow.png';
import RightArrowIcon from '../assets/icons/right-arrow.png';

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart, setExercises }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        // overflow: 'hidden',
        position: 'relative',
      }}
    >
      {data?.map((item: any, index: number) => (
        <Box
          key={index}
          // itemId={item.id || item}
          title={item.id || item}
          m="0 20px"
          p="10px"
          style={{
            backgroundColor: '#3474e2',
            borderRadius: '2px',
            borderTop: bodyPart === item ? '2px solid #ff2625' : ' ',
          }}
        >
          <Bodypart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} setExercises={setExercises}/>
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

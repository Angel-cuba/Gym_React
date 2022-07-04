import React from 'react';
import { Box } from '@mui/material';
import Bodypart from './BodyParts/Bodypart';

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart }: any) => {
  return (
    <div>
      {data.map((item: any, index: number) => (
        <Box
          key={index}
          // itemId={item.id || item}
          title={item.id || item}
          m="0 40px"
        >
          <Bodypart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
        </Box>
      ))}
    </div>
  );
};

export default HorizontalScrollbar;

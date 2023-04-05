import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import HorizontalScrollbar from '../HorizontalScrollbar';
import Loader from '../Loader';

const Similars = ({ similarsTarget, equipment }: any) => {
  return (
    <Box sx={{ mt: { lg: '100px', xs: '0' } }}>
      <Typography variant="h4" align="center" mb="13px">
        {`Similar exercises to ${ similarsTarget && similarsTarget[0]?.target}`}
      </Typography>
      <Stack direction="row" sx={{ p: '2px', position: 'relative' }}>
        {!similarsTarget?.length ? (
          <Loader />
        ) : (
          <HorizontalScrollbar data={similarsTarget} />

        )}
      </Stack>
      <Stack  direction="column" sx={{ p: '2px', position: 'relative' }}>
        <Typography variant="h6" align="center" mb="13px">
          {`Equipment: ${equipment && equipment[0]?.equipment}`}
        </Typography>
       {!equipment?.length ? <Loader /> : <HorizontalScrollbar data={equipment} />}
      </Stack>
    </Box>
  );
};

export default Similars;

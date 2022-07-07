import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const Videos = ({ videos, name }: any) => {
  console.log(videos);
  return (
    <Box sx={{ marginTop: { lg: '200px', xs: '20px' } }} p="20px">
      <Typography variant="h4" mb="33px">
        Watch <span style={{ color: '#ff2625', textTransform: 'capitalize' }}>{name}</span> exercise
        on YouTube
      </Typography>
      <Stack
        justifyContent="flex-start"
        flexWrap={'wrap'}
        alignItems="center"
        sx={{ flesDirection: { lg: 'row' }, gap: { lg: '110px', xs: '0' } }}
      >
        {videos?.slice(0, 3).map((video: any, index: number) => (
          <a key={index} className="exercise-video" href={`https://www.youtube.com/watch?v=${video.video.videoId}`} target="_blank" rel="noreferrer">
            <img src={video?.video.thumbnails[0].url} alt={video.video.title} />
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default Videos;

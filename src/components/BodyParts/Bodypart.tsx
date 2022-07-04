import { Stack, Typography } from '@mui/material';
import React from 'react';
import Icon from '../../assets/icons/gym.png';

const Bodypart = ({ item, bodyPart, setBodyPart }: any) => {
  return (
    <Stack
      //  type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
      }}
    >
      <img
        src={Icon}
        alt="dumbbell"
        style={{
          backgroundColor: bodyPart === item ? '#f9979712' : '#fff',
          borderBottomLeftRadius: '2px',
          width: '50px',
          height: '60px',
          cursor: 'pointer',
          padding: '2px',
          boxShadow: bodyPart === item ? '0px 0px 5px 1px #ff000050' : ' ',
        }}
      />
      <Typography
        fontWeight="bold"
        color={bodyPart === item ? '#ff2625' : '#501a1a'}
        textTransform="uppercase"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default Bodypart;

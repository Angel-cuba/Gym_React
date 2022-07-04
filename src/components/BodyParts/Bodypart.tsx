import { Stack } from '@mui/material';
import React from 'react';
import Icon from '../../assets/icons/gym.png';

const Bodypart = ({ item, bodyPart, setBodyPart }: any) => {
  console.log('item', item);
  return (
    <Stack
      //  type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
    >
      <img
        src={Icon}
        alt="dumbbell"
        style={
          bodyPart === item
               ? 
               {
                 borderTop: '2px solid #ff2625',
                backgroundColor: '#fff',
                borderBottomLeftRadius: '20px',
                width: '100px',
                height: '110px',
                cursor: 'pointer',
                margin: '45px',}
              
            : {
                borderTop: '2px solid #03ffa7',
                backgroundColor: '#d8d8d8',
                borderBottomLeftRadius: '20px',
                width: '70px',
                height: '80px',
                cursor: 'pointer',
            }
        }
      />
    </Stack>
  );
};

export default Bodypart;

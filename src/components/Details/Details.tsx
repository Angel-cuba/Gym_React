import React from 'react';
import BodyPartImage from '../../assets/icons/body-part.png';
import TargetImage from '../../assets/icons/target.png';
import EquipmentImage from '../../assets/icons/equipment.png';
import { Button, Stack, Typography } from '@mui/material';

const Details = ({ exerciseDetails }: any) => {
  const smallDetails = [
    {
      icon: BodyPartImage,
      name: exerciseDetails?.name,
    },
    {
      icon: TargetImage,
      name: exerciseDetails?.target,
    },
    {
      icon: EquipmentImage,
      name: exerciseDetails?.equipment,
    },
  ];
  return (
    <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
      {exerciseDetails && (
        <>
          <img
            src={exerciseDetails.gifUrl}
            alt={exerciseDetails.name}
            loading="lazy"
            className="detail-image"
          />
          <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
            <Typography variant="h3">
              {exerciseDetails.name[0].toUpperCase() + exerciseDetails.name.slice(1)}
            </Typography>
            <Typography variant="h6" style={{ maxWidth: '500px' }}>
              Exercises keep you strong and fit.
              <br /> We have a lot of exercises to help you get started. <br />
              {exerciseDetails.name[0].toUpperCase() + exerciseDetails.name.slice(1)} is one of the
              most popular exercise to target your {exerciseDetails.target}. It will help you to
              build your {exerciseDetails.bodyPart} muscles, improve your mood and gain a lot of
              energy.
            </Typography>
            {smallDetails.map((detail: any, index: number) => {
              return (
                <Stack key={index} direction="row" gap="24px" alignItems="center">
                  <Button
                    sx={{
                      background: '#fff2db',
                      borderRadius: '50%',
                      width: '100px',
                      height: '100px',
                    }}
                  >
                    <img src={detail.icon} alt={detail.name} />
                  </Button>
                  <Typography
                    textTransform="capitalize"
                    variant="h6"
                    style={{
                      background: '#ffffff59',
                      color: '#3A1212',
                      padding: '2px 5px',
                      border: '1px solid #f3f3f3',
                      borderRadius: '5px',
                      boxShadow: '0 0 5px 1px #d3d3d397',
                    }}
                  >
                    {detail.name}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Details;

import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../../assets/images/Logo-1.png';

const Footer = () => {
  return (
    <Box mt="80px" mb="50px" p="20px" bgcolor="#fff3f4">
      <Stack gap="40px" alignItems="center" justifyContent="center" px="40px" pt="24px">
        <img src={Logo} alt="logo" width="200px" height="40px" />
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ fontSize: { lg: '50px', xs: '30px' } }}
          mb="50px"
          textAlign="center"
        >
          Made with ❤️ <br /> by <br />
          Angel
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;

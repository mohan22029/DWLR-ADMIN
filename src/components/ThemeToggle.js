import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { ColorModeContext } from './theme'; // Verify this path!
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ThemeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      aria-label="toggle theme"
      sx={{
        color: '#FFFF00', // Permanent yellow color
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 0, 0.1)', // Light yellow background on hover
        },
        '& .MuiSvgIcon-root': {
          color: '#FFFF00', // Ensure icons are yellow
          fontSize: '3.5rem', // Increase icon size
        },
        padding: '22px', // Increase padding for larger clickable area
        width: '70px', // Set button width
        height: '70px', // Set button height
      }}
    >
      {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeToggle;
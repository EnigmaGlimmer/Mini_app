import React from 'react';
import { Checkbox, CheckboxProps, alpha, styled } from '@mui/material';


/**
 * Common Checkbox
 * 
 * @param {CheckboxProps} props 
 * @returns 
 */
const BpIcon = styled('span')(() => ({
  borderRadius: 10,
  width: 24,
  height: 28,
  backgroundColor: '#DFDDE8',
  padding: 0,
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:disabled ~ &': {
    backgroundColor: 'rgba(206,217,224,.5)',
  },
  'input:hover ~ &': {
    backgroundColor: alpha('#DFDDE8', 0.5),
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  '&:before': {
    display: 'block',
    width: 20,
    height: 24,
    backgroundImage:
    'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyMCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNi43MDcxIDYuNTUwNDJDMTcuMDk3NiA3LjAwODI4IDE3LjA5NzYgNy43NTA2MSAxNi43MDcxIDguMjA4NDdMOC43MDcxMSAxNy41ODc4QzguMzE2NTggMTguMDQ1NiA3LjY4MzQyIDE4LjA0NTYgNy4yOTI4OSAxNy41ODc4TDMuMjkyODkgMTIuODk4MUMyLjkwMjM3IDEyLjQ0MDMgMi45MDIzNyAxMS42OTc5IDMuMjkyODkgMTEuMjQwMUMzLjY4MzQyIDEwLjc4MjIgNC4zMTY1OCAxMC43ODIyIDQuNzA3MTEgMTEuMjQwMUw4IDE1LjEwMDdMMTUuMjkyOSA2LjU1MDQyQzE1LjY4MzQgNi4wOTI1NyAxNi4zMTY2IDYuMDkyNTcgMTYuNzA3MSA2LjU1MDQyWiIgZmlsbD0iIzE3MTcxNyIvPgo8L3N2Zz4K")',
    content: '""',
    marginTop: "2px",
    marginLeft: "2px",
  },

});

function CommonCheckbox(props) {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
        p: 0,
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

export default CommonCheckbox
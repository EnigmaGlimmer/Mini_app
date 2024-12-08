import React, { forwardRef } from 'react';
import { Stack } from '@mui/material';
import Header from './Header';

const DetailPageWrapper = forwardRef(({ children, title, onBack }, ref) => {
  return (
    <Stack sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }} ref={ref}>
      <Header title={title} onBack={onBack} />
      <Stack flex={1} overflow={"auto"} className='no-scroll'>
        {children}
      </Stack>
    </Stack>
  )
});

export default DetailPageWrapper;
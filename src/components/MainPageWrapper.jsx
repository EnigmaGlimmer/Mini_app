import React from 'react';
import { Stack } from '@mui/material';

import { usePage } from '@store';
import { Footer } from './Footer';
import Header from './Header';

const MainPageWrapper = ({ children, showHeader, hiddenFooter }) => {
  const { page } = usePage();

  const isDetail = !!page?.openDetail; 

  return (
    <Stack sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      {(!isDetail || showHeader) && <Header />}
      <Stack flex={1} overflow={"auto"} className='no-scroll'>
        {children}
      </Stack>
      {!hiddenFooter && (
        <Stack>
          <Footer />
        </Stack>
      )}
    </Stack>
  )
};

export default MainPageWrapper;
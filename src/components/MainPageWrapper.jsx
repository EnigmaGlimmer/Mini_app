import React from 'react';
import { Stack } from '@mui/material';

import { Footer } from './Footer';
import Header from './Header';
import { usePage } from '@/store';
import styled from 'styled-components';

const MainPageWrapper = ({ children, showHeader, hiddenFooter }) => {
  const { page, setPageState } = usePage();

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

const Popper = styled.div`
  position: fixed;
  right: 0px;
  bottom: ${(props) => (props?.$isMobile ? "0" : `${PopperBottom}px`)};
  height: ${(props) => (props?.$isMobile ? "100%" : "auto")};
  width: ${(props) => (props?.$isMobile ? "100%" : `${FrameWidth}px`)};
  max-width: 100%;
  background-color: transparent;
`;


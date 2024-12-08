import React from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { IconButton, Stack, Typography } from '@mui/material';

import { Assets } from "@assets";
import { windowState } from '@store/windowStore';
import { Times } from './icons/Times';
import { ArrowLeft } from './icons/ArrowLeft';
import { useAppState } from '@/store';

const Header = ({ title, onBack }) => {
  const [vaultikWindow] = useRecoilState(windowState);
  const { closeApp } = useAppState();

  const handleClose = () => {
    closeApp();
  }
  
  return (
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} px={1.5} width={"100%"} mt={2} pb={1.5}>
        <Stack flex={1} overflow={"hidden"}>
          {title ? (
            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
              <IconButton size="small" onClick={onBack} sx={{ p: 1.25 }}>
                <ArrowLeft sx={{ fontSize: 24, color: "text.primary" }}/>
              </IconButton>
              <Typography variant='h6' className="text-overflow-hide" sx={{ p: 1.25, mx: "auto" }}>{title}</Typography>
            </Stack>
          ) : (
            <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"} sx={{ pl: 1.5 }}>
              <img 
                src={vaultikWindow.logoUrl || Assets.logoImage} 
                width="auto" 
                height="60px"
                alt="brand_logo"
                style={{ objectFit: "contain", maxWidth: "146px" }} 
              />
            </Stack>
          )}           
        </Stack>
        <IconButton onClick={handleClose} size="large" sx={{ p: 1.25 }}>
          <Times sx={{ color: "text.primary", fontSize: 20 }} color="text.primary" />
        </IconButton>
      </Stack>
  )
};

Header.propTypes = {
  onBack: PropTypes.func
};

export default Header;
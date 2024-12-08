import React from 'react';
import { Stack, IconButton } from '@mui/material';

import { useAppState } from '@/store';
import { Times } from '@/components/icons/Times';

const AuthPageWrapper = ({
    detailScrollRef,
    children,
    header,
    footer
}) => {
    const { closeApp } = useAppState();

    const handleClose = () => {
        closeApp();
    }

    return (
        <Stack sx={{ display: "flex", flexDirection: "column", mt: 2, mb: 0, height: "100%", width: "100%" }} ref={detailScrollRef}>
            <Stack direction={"row"} alignItems={"center"} px={1.5}>
                <Stack flex={1}>
                    {header}
                </Stack>
                <IconButton onClick={handleClose} size="large" sx={{ position: "absolute", right: "12px" }}>
                    <Times sx={{ color: "text.primary", fontSize: 20 }} color="text.primary" />
                </IconButton>
            </Stack>
            <Stack flex={1} justifyContent={"flex-start"}>
                {children}
            </Stack>
            <Stack p={1}>
                {footer}
            </Stack>
        </Stack>
    )
};

export default AuthPageWrapper;
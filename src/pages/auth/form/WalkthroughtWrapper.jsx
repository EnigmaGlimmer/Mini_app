import React from 'react'
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';

import { Assets } from "@assets";
import LinkButton from '@/components/LinkButton';
import { windowState } from '@/store';
import AuthPageWrapper from '../AuthPageWrapper';

const WalkthroughtWrapper = ({
    onSignIn,
    children,
    centerLogo,
}) => {
    const [vaultikWindow] = useRecoilState(windowState);

    return (
        <AuthPageWrapper
            header={
                <Stack direction={"row"} justifyContent={centerLogo ? "center" : "flex-start"} alignItems={"center"} sx={{ pl: 1.5 }}>
                    <img
                        src={vaultikWindow.smallLogoUrl || vaultikWindow.logoUrl || Assets.logoImage}
                        width="auto"
                        height="60px"
                        alt="brand_logo"
                        style={{ objectFit: "contain", maxWidth: "146px" }}
                    />
                </Stack>
            }
            footer={
                <Stack>
                    <Stack direction={"row"} justifyContent={"center"} >
                        <Typography variant='subtitle1' color={'text.primary'}>
                            Already have an account? &nbsp;
                        </Typography>
                        <LinkButton onClick={onSignIn}>
                            <Typography color={'inherit'} lineHeight={1.75} fontWeight={600}>
                                Sign In
                            </Typography>
                        </LinkButton>
                    </Stack>
                </Stack>
            }
        >
            {children}
        </AuthPageWrapper>
    )
}

WalkthroughtWrapper.propTypes = {
    onSignIn: PropTypes.func.isRequired,
    onSignUp: PropTypes.func,
    children: PropTypes.node.isRequired,
    hiddenNoCode: PropTypes.bool,
}

export default WalkthroughtWrapper;
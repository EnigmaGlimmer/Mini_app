import React from 'react'
import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';

import WalkthroughtWrapper from './WalkthroughtWrapper';
import { Assets } from '@assets';

const LandingWithoutWalkthrought = ({
    onSignIn,
    onSignUp
}) => {
    return (
        <WalkthroughtWrapper onSignIn={onSignIn} centerLogo={true}>
            <Stack py={3} px={3}>
                <Stack direction={"column"} alignItems={"center"} justifyItems={"center"} gap={3}>
                    <img src={Assets.welcomeBg} height={"280px"} style={{ objectFit: "contain" }} />

                    <Typography variant='h4' color="secondary.main">Welcome to your digital Vault</Typography>
                    <Typography variant='subtitle1' color={'text.primary'} textAlign={"center"}>
                        Protect your luxury purchases<br /> and unlock exclusive experiences
                    </Typography>
                    <Button variant='contained' size='large' color="tertiary" fullWidth onClick={onSignUp}>Sign Up</Button>
                </Stack>
            </Stack>
        </WalkthroughtWrapper>
    )
}

LandingWithoutWalkthrought.propTypes = {
    onSignIn: PropTypes.func.isRequired,
    onSignUp: PropTypes.func.isRequired,
}

export default LandingWithoutWalkthrought;
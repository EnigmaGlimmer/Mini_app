import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';

import { LoginButton } from '@/components/login/LoginButton';
import { Assets } from '@/assets';
import { Colors } from '@/styles/theme';
import LinkButton from '@/components/LinkButton';
import { ArrowLeft } from '@components/icons/ArrowLeft';
import AuthPageWrapper from '../AuthPageWrapper';

export const SnackbarSignIn = ({
    onBack, 
    onSignInEmail, 
    onSignInGoogle, 
    onSignInFacebook, 
    onSignInApple,
    onSignUp
}) => {

    return (
        <AuthPageWrapper
            header={
                <Stack direction={"row"} alignItems={"center"}>
                    <IconButton size="small" onClick={onBack} sx={{ p: 1.25 }}>
                        <ArrowLeft sx={{ fontSize: 24, color: "text.primary" }}/>
                    </IconButton>
                    <Typography variant='h6' sx={{ p: 1.25, mx: "auto" }}>Sign In</Typography>
                </Stack>
            }
            footer={
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography variant='subtitle1' color={'text.primary'}>
                        Don't have an account? &nbsp;
                    </Typography>
                    <LinkButton onClick={onSignUp}>
                        <Typography color={'inherit'} lineHeight={1.75} fontWeight={600}>
                            Sign Up here
                        </Typography>
                    </LinkButton>
                </Stack>
            }
        >
            <Stack direction={"column"} mt={3} px={2.75} gap={2.5}>
                <LoginButton
                    startIcon={Assets.google}
                    title="Continue with Google"
                    background={Colors.white}
                    color={Colors.plush_1000}
                    onClick={onSignInGoogle}
                />
                <LoginButton
                    startIcon={Assets.apple}
                    title="Continue with Apple"
                    background={Colors.plush_1000}
                    color={Colors.radiant_dawn_100}
                    onClick={onSignInApple}
                />
                {/* <LoginButton
                    startIcon={Assets.facebook}
                    title="Continue with Facebook"
                    background={Colors.facebook_blue}
                    color={Colors.white}
                    onClick={onSignInFacebook}
                /> */}
                <Stack direction={"row"} justifyContent={"center"} mt={1.5}>
                    <Typography variant='subtitle1' color={'text.primary'}>
                        Or sign in with &nbsp;
                    </Typography>
                    <LinkButton onClick={onSignInEmail}>
                        <Typography color={'inherit'} lineHeight={1.75}>
                            Email
                        </Typography>
                    </LinkButton>
                </Stack>
            </Stack>
        </AuthPageWrapper>
    )
};

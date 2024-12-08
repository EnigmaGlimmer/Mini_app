import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';

import { LoginButton } from '@/components/login/LoginButton';
import { Assets } from '@/assets';
import { Colors } from '@/styles/theme';
import { ArrowLeft } from '@components/icons/ArrowLeft';
import LinkButton from '@/components/LinkButton';
import AuthPageWrapper from '../AuthPageWrapper';

export const SnackbarSignUp = ({ 
    onBack, 
    onSignUpEmail, 
    onSignUpGoogle, 
    onSignUpFacebook, 
    onSignUpApple,
    onSignIn
}) => {
    return (
        <AuthPageWrapper
            header={
                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <IconButton size="small" onClick={onBack} sx={{ p: 1.25 }}>
                        <ArrowLeft sx={{ fontSize: 24, color: "text.primary" }}/>
                    </IconButton>
                    <Typography variant='h6' sx={{ p: 1.25, mx: "auto" }}>Sign Up</Typography>
                </Stack>
            }
            footer={
                <Stack direction={"row"} justifyContent={"center"} p={1} >
                    <Typography variant='subtitle1' color={'text.primary'}>
                        Already have an account? &nbsp;
                    </Typography>
                    <LinkButton onClick={onSignIn}>
                        <Typography color={'inherit'} lineHeight={1.75} fontWeight={600}>
                            Sign In
                        </Typography>
                    </LinkButton>
                </Stack>
            }
        >
            <Stack direction={"column"} mt={2.5} px={2.75} gap={1.5}>
                <Typography variant='subtitle1' sx={{ lineHeight: "30px" }} textAlign={"center"}>
                    Please use the same email address in which<br /> you received the redeem code.
                </Typography>
                <LoginButton
                    startIcon={Assets.google}
                    title="Continue with Google"
                    background={Colors.white}
                    color={Colors.plush_1000}
                    onClick={onSignUpGoogle}
                />
                <LoginButton
                    startIcon={Assets.apple}
                    title="Continue with Apple"
                    background={Colors.plush_1000}
                    color={Colors.radiant_dawn_100}
                    onClick={onSignUpApple}
                />
                {/* <LoginButton
                    startIcon={Assets.facebook}
                    title="Continue with Facebook"
                    background={Colors.facebook_blue}
                    color={Colors.white}
                    onClick={onSignUpFacebook}
                /> */}
                <Stack direction={"row"} justifyContent={"center"} mt={1.5}>
                    <Typography variant='subtitle1' color={'text.primary'}>
                        Or continue with &nbsp;
                    </Typography>
                    <LinkButton onClick={onSignUpEmail}>
                        <Typography color={'inherit'} lineHeight={1.75}>
                            Email
                        </Typography>
                    </LinkButton>
                </Stack>
            </Stack>
        </AuthPageWrapper>
    )
};

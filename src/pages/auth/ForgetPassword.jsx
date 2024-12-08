import React, { useState } from 'react'
import { useFormik } from 'formik';
import { IconButton, Stack, Typography } from '@mui/material';

import { InputBox } from "@components/login/InputBox";
import { LoginButton } from '@/components/login/LoginButton';
import { forgetSchema } from '@/utils/validator';
import { AuthApi } from '@/api';
import { Colors } from '@/styles/theme';
import { ArrowLeft } from '@components/icons/ArrowLeft';
import useToast from '@/hooks/useToast';
import { useUser } from '@/store';
import LinkButton from '@/components/LinkButton';
import AuthPageWrapper from './AuthPageWrapper';

export const ForgetPasswordForm = ({
    onBack,
    detailScrollRef,
    onSignInSocial,
    onSubmitForgetEmail
}) => {

    const { addToast } = useToast();
    const { setVerifyEmail } = useUser();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: forgetSchema,
        onSubmit: async (values) => {
            const { email } = values
            try {
                setLoading(true);
                setVerifyEmail(email);
                await AuthApi.forgetPassword({ email });

                onSubmitForgetEmail();
            } catch (error) {
                setLoading(false);
                addToast("Forget Password Failed: " + error?.message || error);
                console.log("[Error] Forget Password Failed: " + error?.message || error);
            }
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value)
    }

    const handleForgot = () => {
        formik.handleSubmit();
    }

    return (
        <AuthPageWrapper
            detailScrollRef={detailScrollRef}
            header={
                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <IconButton size="small" onClick={onBack} sx={{ p: 1.25 }}>
                        <ArrowLeft sx={{ fontSize: 24, color: "text.primary" }}/>
                    </IconButton>
                    <Typography variant='h6' sx={{ p: 1.25, mx: "auto" }}>Forgot Password?</Typography>
                </Stack>
            }
            footer={
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography variant='subtitle1' color={'text.primary'}>
                        Do you want to use Social Login? &nbsp;
                    </Typography>
                    <LinkButton onClick={onSignInSocial}>
                        <Typography color={'inherit'} lineHeight={1.75} fontWeight={600}>
                            Sign In here
                        </Typography>
                    </LinkButton>
                </Stack>
            }
        >
            <Stack direction={"column"} mt={3} px={2.75} gap={1.5}>
                <Typography variant='subtitle2' color="neutral.500" sx={{ lineHeight: "20px" }}>
                    Enter the address you registered with and if it is in our database you will receive an email shortly with a 6-digit code to reset your password
                </Typography>
                <InputBox
                    type="text"
                    placeholder="your@email.com"
                    name="email"
                    value={formik.values.email}
                    onChange={handleChange}
                    isError={Boolean(formik.touched.email && formik.errors.email)}
                    helperText={formik.errors.email}
                />
                <LoginButton
                    background={Colors.plush_1000}
                    color={Colors.radiant_dawn_100}
                    title="Send me the code"
                    loading={loading}
                    onClick={handleForgot}
                />
            </Stack>
        </AuthPageWrapper>
    )
}

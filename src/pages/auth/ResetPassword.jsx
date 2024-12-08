import React, { useState } from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { AuthApi } from '@/api';
import { Colors } from '@/styles/theme';
import useToast from '@/hooks/useToast';
import { InputBox } from "@components/login/InputBox";
import { LoginButton } from '@/components/login/LoginButton';
import { ArrowLeft } from '@components/icons/ArrowLeft';
import LinkButton from '@/components/LinkButton';
import AuthPageWrapper from './AuthPageWrapper';

export const ResetPasswordForm = ({
    detailScrollRef,
    onBack,
    onSignInSocial,
    otpCode,
    onSignUp
}) => {
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object().shape({
            password: Yup.string()
                .required("Please Enter New Password")
                .min(8, 'Password must be 8 characters long')
                .matches(/[0-9]/, 'Password requires a number')
                .matches(/[a-z]/, 'Password requires a lowercase letter')
                .matches(/[A-Z]/, 'Password requires an uppercase letter')
                .matches(/[^\w]/, 'Password requires a symbol'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        }),
        onSubmit: async (values) => {
            const { password } = values
            try {
                setLoading(true);
                await AuthApi.resetPassword(otpCode, password);
                setLoading(false);
                onBack();
            } catch (error) {
                setLoading(false);
                addToast("Reset Password Failed: " + error?.message || error, { 
                    closeButton: { 
                        title: "Sign Up", 
                        onClick: () => { 
                            onSignUp();
                        } 
                    }
                });
                console.log("[Error] Reset Password Failed: ", error?.message || error);
            }
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
    }

    const handleSave = () => {
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
                    <Typography variant='h6' sx={{ p: 1.25, mx: "auto" }}>Reset Password</Typography>
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
                    <InputBox
                      type="password"
                      placeholder="New Password"
                      name="password"
                      value={formik.values.password}
                      onChange={handleChange}
                      isError={Boolean(formik.touched.password && formik.errors.password)}
                      helperText={formik.errors.password}
                    />
                    <InputBox
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={handleChange}
                        isError={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        helperText={formik.errors.confirmPassword}
                    />
                    <Stack direction="column" sx={{ color: "neutral.500" }}>
                        <Typography variant='subtitle2'>The password need to be:</Typography>
                        <ul>
                            <li><Typography variant='subtitle2'>At least 8 characters</Typography></li>
                            <li><Typography variant='subtitle2'>At least one number</Typography></li>
                            <li><Typography variant='subtitle2'>At least one symbol</Typography></li>
                            <li><Typography variant='subtitle2'>At least one upper and one lower case letter</Typography></li>
                        </ul>
                    </Stack>
                    <LoginButton
                        background={Colors.plush_1000}
                        color={Colors.radiant_dawn_100}
                        title="Save"
                        loading={loading}
                        disabled={!formik.isValid}
                        onClick={() => handleSave()}
                    />
            </Stack>
        </AuthPageWrapper>
    )
};

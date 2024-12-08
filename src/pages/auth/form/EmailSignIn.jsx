import React, { useState } from "react";
import { styled } from "styled-components";
import { useFormik } from "formik";
import {  IconButton, Stack, Typography } from "@mui/material";

import { Colors } from "@/styles/theme";
import { LoginButton } from "@components/login/LoginButton";
import { InputBox } from "@components/login/InputBox";
import { initialValues, loginSchema } from '@utils/validator';
import { AuthApi } from "@api";
import { useUser } from "@/store";
import { ErrorCode } from "@/utils";
import LinkButton from "@/components/LinkButton";
import { ArrowLeft } from '@components/icons/ArrowLeft';
import AuthPageWrapper from "../AuthPageWrapper";

export const EmailSignIn = ({ 
  onForgetPassword, 
  onNeedVerifyEmail, 
  onLoginSuccess, 
  onBack,
  onSignInSocial
}) => {
  const [isIncorrect, SetIsIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setVerifyEmail } = useUser();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        setLoading(true);
        setVerifyEmail(email);

        const response = await AuthApi.signIn({ email, password });

        setLoading(false);
        onLoginSuccess(response);
      } catch (err) {
        setLoading(false);
        SetIsIncorrect(true);
        if (err?.code === ErrorCode.ERROR_NOT_VERIFIED_EMAIL)
          onNeedVerifyEmail(email);
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    if (
      isIncorrect &&
      formik.values.email !== "" &&
      formik.values.password !== ""
    ) {
      SetIsIncorrect(false);
    }
  };

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
        <form className="w-100" onSubmit={formik.handleSubmit}>
            <Stack direction={"column"} mt={3} px={2.75} gap={1.5} alignItems={"center"}>
            {isIncorrect ? (
                <ErrorMessageBox>
                <ErrorText>Your Email or Password is incorrect.</ErrorText>
                </ErrorMessageBox>
            ) : null}
            <InputBox
                type="text"
                placeholder="your@email.com"
                name="email"
                value={formik.values.email}
                onChange={handleChange}
                isError={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.errors.email}
            />
            <InputBox
                type="password"
                placeholder="your password"
                name="password"
                value={formik.values.password}
                onChange={handleChange}
                isError={Boolean(formik.touched.password && formik.errors.password)}
                helperText={formik.errors.password}
            />
            <LoginButton
                background={Colors.plush_1000}
                color={Colors.radiant_dawn_100}
                title="Sign In"
                loading={loading}
            />
            <LinkButton onClick={onForgetPassword} onlyHoverUnderline sx={{ mt: 1.25 }}>
                <Typography color={'inherit'} lineHeight={1.75}>
                Forgot Password?
                </Typography>
            </LinkButton>
            </Stack>
        </form>
    </AuthPageWrapper>
  );
};

const ErrorMessageBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 19px;
  width: 100%;
  background: ${Colors.destructive_200};
  border-radius: 10px;
`;

const ErrorText = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${Colors.red};
`;

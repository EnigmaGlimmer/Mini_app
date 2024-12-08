import React, { useState, useRef, useMemo } from "react";
import { Box, Button, IconButton, Link, Stack, Typography, styled } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { LoadingButton } from '@mui/lab';
import { useFormik } from "formik";
import * as Yup from "yup";

import { ArrowLeft } from '@components/icons/ArrowLeft';
import LinkButton from "@/components/LinkButton";
import { InputBox } from "@/components/login/InputBox";
import { useUser } from "@/store";
import CommonCheckbox from "@/components/common/CommonCheckbox";
import { Assets } from "@/assets";
import { lightError } from "@/styles/theme";
import { AuthApi, MediaApi } from "@api";
import useToast from "@/hooks/useToast";
import AuthPageWrapper from "../AuthPageWrapper";
import { AUTH_USER_TYPE, URLS } from "@/utils";

const SIGNUP_STEPS = ["Let's start", 'About you', 'Password'];
const getStepPercent = (step) => 100 * step / SIGNUP_STEPS.length;
const PASSWORD_CONDITIONS = [
  {reg: /^.{8,}$/, message: 'At least 8 characters' }, 
  {reg: /\d/, message: 'At least one number' }, 
  {reg: /[^\w]/, message: 'At least one symbol' }, 
  {reg: /(?=.*[a-z])(?=.*[A-Z])/, message: 'At least one upper and one lower case letter' }
];

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 16,
  borderRadius: "100px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.primary[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: "100px",
    backgroundColor: theme.palette.primary[600],
  },
}));

const SignUpLetStart = ({ 
  onNext, 
  email, 
  onChangeEmail, 
  helpText, 
  error, 
  agreePolicy, 
  agreeUpdate, 
  onChangeAgreePolicy, 
  onChangeAgreeUpdate
}) => {
  const enabled = !!email;
  
  const handleChangeAgreePolicy = (e) => {
    onChangeAgreePolicy(e.target.checked);
  }

  const handleChangeAgreeUpdate = (e) => {
    onChangeAgreeUpdate(e.target.checked);
  }

  return (
    <Stack direction={"column"} gap={2}>
      <Typography variant='subtitle1' sx={{ lineHeight: "30px", letterSpacing: "0.8px", ml: 1 }}>
        Please enter your email address.
      </Typography>
      <InputBox
        type="text"
        placeholder="your@email.com"
        name="email"
        value={email}
        onChange={onChangeEmail}
        isError={error}
        helperText={helpText}
      />
      <Stack direction={"row"} gap={2.25} alignItems={"flex-start"} ml={2.25}>
        <CommonCheckbox checked={agreePolicy} onChange={handleChangeAgreePolicy} />
        <Typography variant="subtitle3" sx={{ lineHeight: "17px" }}>
          By signing up, I confirm to have read and agreed to &nbsp;
          <Link href={URLS.TermsAndConditions}  target="_blank" rel="noopener noreferrer" sx={{ color: "inherit" }}>Vaultik's Terms & conditions</Link>
          &nbsp;and&nbsp;
          <Link href={URLS.PrivacyPolicy}  target="_blank" rel="noopener noreferrer" sx={{ color: "inherit" }}>Privacy Policy</Link>
          , and I certify that I'm at least 18 years old.
        </Typography>
      </Stack>
      <Stack direction={"row"} gap={2.25} alignItems={"flex-start"} ml={2.25}>
        <CommonCheckbox checked={agreeUpdate} onChange={handleChangeAgreeUpdate} />
        <Typography variant="subtitle3" sx={{ lineHeight: "17px" }}>
          I'd like to receive personalized offers and be the first to know about the latest Vaultik updates via email.
        </Typography>
      </Stack>
      <Button disabled={!enabled || error || !agreePolicy} variant="contained" color="primary" size="large" onClick={onNext} sx={{ fontWeight: 500, letterSpacing: "2px" }}>Next</Button>
    </Stack>
  )
}

const SignUpAboutYou = ({
  onNext, 
  fileRef,
  avartar,
  firstName,
  lastName,
  onChange,
  onChangeFile,
  isErrorFirstName,
  isErrorLastName,
  errorFirstName,
  errorLastName,
}) => {
  const handleChangeFile = (e) => {
    onChangeFile(e);
  }
  return (
    <Stack direction={"column"} gap={2}>
      <Box 
        alignItems={"center"} 
        justifyContent={"center"} 
        onClick={() => fileRef.current.click()}
        sx={{
          width: "80px",
          height: "80px",
          backgroundColor: theme => theme.palette.primary[200],
          borderRadius: "30px",
          cursor: "pointer",
          mx: "auto",
          display: "flex"
        }}
      >
        <img
          alt="avatar_image"
          src={avartar ? avartar : Assets.avatar}
          width={avartar ? 80 : 24}
          height={avartar ? 80 : 24}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <input
          ref={fileRef}
          type="file"
          name="file"
          onChange={handleChangeFile}
          style={{ visibility: "hidden", height: '0', width: '0' }}
      />
      <InputBox
        type="text"
        placeholder="Name"
        name="firstName"
        value={firstName}
        onChange={onChange}
        isError={isErrorFirstName}
        helperText={errorFirstName}
      />
      <InputBox
        type="text"
        placeholder="Surname"
        name="lastName"
        value={lastName}
        onChange={onChange}
        isError={isErrorLastName}
        helperText={errorLastName}
      />
      <Button 
        disabled={isErrorFirstName || isErrorLastName || !firstName || !lastName}
        variant="contained" 
        color="primary" 
        size="large" 
        onClick={onNext} 
        sx={{ fontWeight: 500, letterSpacing: "2px" }}
      >
        Next
      </Button>
    </Stack>
  )
}

const SignUpPassword = ({
  password,
  confirmPassword,
  onChange,
  touchedPassword,
  touchedConfirmPassword,
  onSignUp,
  loading
}) => {
  const { conds, isErrorPassword, isErrorConfirmPassword } = useMemo(() => {
    const conds = PASSWORD_CONDITIONS.map(cond => {
      return {
        matched: !touchedPassword || cond.reg.test(password),
        label: cond.message
      }
    });

    const isErrorPassword = conds.filter(cond => !cond.matched).length > 0;
    const isErrorConfirmPassword = touchedConfirmPassword && (password !== confirmPassword);

    return { conds, isErrorPassword, isErrorConfirmPassword };
  }, [password, confirmPassword, touchedPassword, touchedConfirmPassword]);

  return (
    <Stack direction={"column"} gap={2}>
      <InputBox
        type="password"
        placeholder="New Password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <InputBox
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          color={isErrorConfirmPassword ? lightError.main : null}
      />
      <Stack direction="column" sx={{ color: "neutral.500" }}>
          <Typography variant='subtitle2'>The password need to be:</Typography>
          <ul>
            {conds.map((cond, idx) => {
              const { matched, label } = cond
                return (
                  <li key={idx}>
                    <Typography variant='subtitle2' color={matched ? "inherit" : "error"}>{label}</Typography>
                  </li>
                )
              })}
          </ul>
      </Stack>
      <LoadingButton 
        disabled={!password || !confirmPassword || isErrorPassword || isErrorConfirmPassword}
        variant="contained" 
        color="primary" 
        size="large" 
        onClick={onSignUp} 
        sx={{ fontWeight: 500, letterSpacing: "2px" }}
        loading={loading}
      >
        Sign Up
      </LoadingButton>
    </Stack>
  )
}

const SignUpWithEmail = ({ onBack, onSignInSocial, onSignup, detailScrollRef }) => {
  const { setUser, setVerifyEmail } = useUser();
  const { addToast } = useToast();

  const [step, setStep] = useState(0);
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      submit: null,
      agreePolicy: false,
      agreeUpdate: false,
      avartar: "",
    },
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      firstName: Yup.string().max(255).required("First name is required."),
      lastName: Yup.string().max(255).required("Last name is required."),
      email: Yup.string()
        .max(255)
        .email("Must be a valid email")
        .required("Email address is required."),
      password: Yup.string()
        .required("Password is required.")
        .min(8, 'Password must be 8 characters long')
        .matches(PASSWORD_CONDITIONS[0].reg, PASSWORD_CONDITIONS[0].message)
        .matches(PASSWORD_CONDITIONS[1].reg, PASSWORD_CONDITIONS[1].message)
        .matches(PASSWORD_CONDITIONS[2].reg, PASSWORD_CONDITIONS[2].message)
        .matches(PASSWORD_CONDITIONS[3].reg, PASSWORD_CONDITIONS[3].message),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: "",
        address: "",
        avatar: values.avartar,
        userType: AUTH_USER_TYPE
      };

      try {
        setLoading(true);
        setVerifyEmail(values.email);
        const response = await AuthApi.signUp(data);
        await handleRegister(response);
        setLoading(false);
        onSignup();
      } catch (err) {
        setSignUpError("Sign up failed. " + (err?.message || err));
        setLoading(false);
      }
    },
  });

  const handleRegister = async (response) => {
    setUser(response);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await formik.setFieldValue(name, value);
    await formik.setFieldTouched(name);
  };

  const handleChangeAgreePolicy = (val) => {
    formik.setFieldValue('agreePolicy', val);
  }

  const handleChangeAgreeUpdate = (val) => {
    formik.setFieldValue('agreeUpdate', val);
  }

  const handleNext = async () => {
    const gotoNext = () => {
      setStep(Math.min(step + 1, SIGNUP_STEPS.length - 1));
    }

    gotoNext();
  }

  const handleBack = () => {
    if (step === 0) {
      onBack();
    } else {
      setStep(Math.max(step - 1, 0));
    }
  }

  const handleChangeFile = async (e) => {
    try {
      const response = await MediaApi.uploadFile(e.target.files[0]);
      formik.setFieldValue("avartar", response.path);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = () => {
    formik.handleSubmit();
  }

  const getStepContent = (step, loading) => {
    switch (step) {
      case 0:
        return (
          <SignUpLetStart 
            email={formik.values.email} 
            onChangeEmail={handleChange} 
            helpText={formik.errors.email} 
            error={Boolean(formik.touched.email && formik.errors.email)} 
            agreePolicy={formik.values.agreePolicy}
            agreeUpdate={formik.values.agreeUpdate}
            onChangeAgreePolicy={handleChangeAgreePolicy}
            onChangeAgreeUpdate={handleChangeAgreeUpdate}
            onNext={handleNext}
          />
        );

      case 1:
        return (
          <SignUpAboutYou 
            fileRef={fileRef}
            avartar={formik.values.avartar}
            onChangeFile={handleChangeFile}
            onNext={handleNext}
            firstName={formik.values.firstName}
            lastName={formik.values.lastName}
            onChange={handleChange}
            isErrorFirstName={Boolean(formik.touched.firstName && formik.errors.firstName)}
            isErrorLastName={Boolean(formik.touched.lastName && formik.errors.lastName)}
            errorFirstName={formik.errors.firstName}
            errorLastName={formik.errors.lastName}
          />
        );

      case 2:
        return (
          <SignUpPassword 
            onSignUp={handleSignUp}
            password={formik.values.password}
            confirmPassword={formik.values.confirmPassword}
            onChange={handleChange}
            touchedPassword={Boolean(formik.touched.password)}
            touchedConfirmPassword={Boolean(formik.touched.confirmPassword)}
            loading={loading}
          />
        );
  
      default: 
        return null;
    }
  }

  return (
    <AuthPageWrapper 
      detailScrollRef={detailScrollRef}
      header={
        <Stack direction={"row"} alignItems={"center"} position="relative">
            <IconButton size="small" onClick={handleBack} sx={{ p: 1.25 }}>
                <ArrowLeft sx={{ fontSize: 24, color: "text.primary" }}/>
            </IconButton>
            <Typography variant='h6' sx={{ py: 1.25, px: 0.5 }}>{SIGNUP_STEPS[step]}</Typography>
            <BorderLinearProgress variant="determinate" value={getStepPercent(step)} sx={{ width: "150px", ml: "auto", mr: 3 }} />
        </Stack>
      }
      footer={
        <Stack direction={"row"} justifyContent={"center"} >
            <Typography variant='subtitle1' color={'text.primary'}>
                Do you want to use Social Login? &nbsp;
            </Typography>
            <LinkButton onClick={onSignInSocial}>
                <Typography color={'inherit'} lineHeight={1.75} fontWeight={600}>
                    Sign Up here
                </Typography>
            </LinkButton>
        </Stack>
      }
    >
      <Stack mt={3} px={2.75}>
        {signUpError && <div className="alert alert-danger">{signUpError}</div>}
        {getStepContent(step, loading)}
      </Stack>
    </AuthPageWrapper>
  )
};

export default SignUpWithEmail;

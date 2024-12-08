import React, { useState, useCallback } from "react";
import { EmailSignIn } from "./form/EmailSignIn";
import { SnackbarSignIn } from "./form/SnackbarSignIn";
import { AuthApi } from "@/api";
import useToast from "@/hooks/useToast";

export const LoginForm = ({
  onBack, 
  onLoginSuccess,
  onNeedVerifyEmail, 
  handleForgetPassword, 
  isSocialLogin,
  onSignUp
}) => {
  const [isSocial, setSocial] = useState(isSocialLogin ?? true);
  const { addToast } = useToast();
  
  const handleLoginSuccess = (user) => {
    onLoginSuccess(user);
  };

  const handleContinueWithEmail = () => {
    setSocial(!isSocial);
  };

  const handleWithSocial = () => {
    setSocial(true);
  };

  const handleGoogle = async () => {
    try {
      const response = await AuthApi.signInGoogle();
      onLoginSuccess(response);
    } catch (error) {
      addToast(error);
      console.log("[Error] Google signin failed: ", error);
    }
  };

  const handleFacebook = useCallback(async () => {
    try {
      const response = await AuthApi.signInFacebook();
      onLoginSuccess(response);
    } catch (error) {
      addToast(error);
      console.log("[Error] Facebook signin failed: ", error);
    }
  });

  const handleApple = useCallback(async () => {
    try {
      const response = await AuthApi.signInApple();
      onLoginSuccess(response);
    } catch (error) {
      addToast(error);
      console.log("[Error] Apple signin failed: ", error);
    }
  });

  const handleBack = () => {
    setSocial(true);
  }

  return (
    <>
    {
      isSocial ? 
      <SnackbarSignIn 
        onSignInApple={handleApple}
        onSignInGoogle={handleGoogle}
        onSignInFacebook={handleFacebook}
        onSignInEmail={handleContinueWithEmail}
        onBack={onBack}
        onSignUp={onSignUp}
      /> : 
      <EmailSignIn 
        onLoginSuccess={handleLoginSuccess}
        onNeedVerifyEmail={onNeedVerifyEmail}
        onForgetPassword={handleForgetPassword}
        onBack={handleBack}
        onSignInSocial={handleWithSocial}
      />
    }
    </>
  );
};
import React, { useState, useCallback } from 'react';
import { styled } from 'styled-components';

import { AuthApi } from '@/api';
import { SnackbarSignUp } from './form/SnackbarSignUp';
import useToast from '@/hooks/useToast';
import SignUpWithEmail from './form/SignUpWithEmail';

export const RegisterForm = ({ 
  onBack, 
  onLoginSuccess,
  onSignUpWithEmail, 
  handleForgetPassword, 
  detailScrollRef,
  onSignIn
}) => {
  const { addToast } = useToast();

  const [isEmailLogin, setEmailLogin] = useState(false);

  const handleSuccess = (res) => {
    if (res?.token && res?.id) {
      onLoginSuccess(res);
    } else {
      addToast("Invalid login credentials. Please try again.", {
        closeButton: {
          title: "Restart",
          onClick: () => { onBack(); }
        }
      });
    }
  }

  const handleGoogle = async () => {
    try {
      const response = await AuthApi.signInGoogle();
      handleSuccess(response);
    } catch (error) {
      addToast(error || "Google authentification is failed due to some reasons.");
      console.log("[Error] Google signup failed: ", error);
    }
  };

  const handleFacebook = useCallback(async () => {
    try {
      const response = await AuthApi.signInFacebook();
      handleSuccess(response);
    } catch (error) {
      addToast(error || "Facebook authentification is failed due to some reasons.");
      console.log("[Error] Facebook signup failed: ", error.message);
    }
  });

  const handleApple = useCallback(async () => {
    try {
      const response = await AuthApi.signInApple();
      handleSuccess(response);
    } catch (error) {
      addToast(error || "Apple authentification is failed due to some reasons.");
      console.log("[Error] Apple signup failed: ", error.message);
    }
  });

  const handleEmail = useCallback(() => {
    setEmailLogin(true);
  });

  const handleSocial = useCallback(() => {
    setEmailLogin(!isEmailLogin);
  });

  const handleBack = useCallback(() => {
    setEmailLogin(false);
  });

  return (
    <Container>
      {
        !isEmailLogin ? (
          <SnackbarSignUp
            onBack={onBack}
            onSignUpEmail={handleEmail}
            onSignUpGoogle={handleGoogle}
            onSignUpApple={handleApple}
            onSignUpFacebook={handleFacebook}
            onSignIn={onSignIn}
          />
        ) : (
          <SignUpWithEmail
            onBack={handleBack}
            detailScrollRef={detailScrollRef}
            onSignInSocial={handleSocial}
            onSignup={onSignUpWithEmail}
            handleForgetPassword={handleForgetPassword}
          />
        )
      }
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
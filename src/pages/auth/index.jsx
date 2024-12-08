import React, { useEffect, useState, useRef, } from "react";
import { styled } from "styled-components";

import { useAppState, useUser, usePage, useWindowState } from "@store";
import { PageTabs, FormState, EventTypes } from '@/utils/constants'
import { Colors } from "@styles/theme";
import { LoginForm } from "./Login";
import { RegisterForm } from "./Register";
import { ForgetPasswordForm } from "./ForgetPassword";
import { ResetPasswordForm } from "./ResetPassword";
import { VerificationForm } from "./form/VerificationForm";
import { useRecoilState } from "recoil";
import { windowState } from "@/store";
import Walkthrought from "./form/Walkthrought";
import WalkthroughtSignUp from "./form/WalkthroughtSignUp";
import LandingWithoutWalkthrought from "./form/LandingWithoutWalkthrought";

export const AuthForm = (props) => {
  const { setLoggedIn } = useAppState();
  const detailScrollRef = useRef(null);
  const { user, setUser } = useUser();
  const { page, setPage } = usePage();
  const { PostMessage } = useWindowState();

  const [vaultikWindow] = useRecoilState(windowState);

  const initFormState = vaultikWindow?.hasWalkthrought ? FormState.InitWithWalkthrought : FormState.InitWithoutWalkthrought;

  const [formID, setFormID] = useState(initFormState);
  const [otpCode, setOtpCode] = useState('');

  const handleSignIn = () => {
    setFormID(FormState.Login);
  };

  const handleRegister = () => {
    setFormID(FormState.Register);
  };

  const handleForgetPassword = () => {
    setFormID(FormState.Forget)
  };

  const onSubmitForgetEmail = () => {
    setFormID(FormState.OTPCodeVerify);
  };

  const handleWithSocial = () => {
    setFormID(FormState.Login);
  };

  const handleDefaultSet = (state) => {
    setFormID(state || initFormState);
  };

  const handleSignUpWithEmail = () => {
    setFormID(FormState.Verify);
  };

  const handleVerification = (code, loggedUser, state) => {
    setOtpCode(code);
    
    if (loggedUser) {
      onLoginSuccess(loggedUser);
    } else {
      setFormID(state || FormState.EmailLogin);
    }
  };

  const handleNeedVerifyEmail = () => {
    setFormID(FormState.Verify);
  };

  const onLoginSuccess = (response) => {
    setLoggedIn(true);
    setUser(response);

    setPage({
      ...page,
      id: PageTabs.home.id,
      background: Colors.white,
      openDetail: false,
      select: null,
      display: true,
    });

    PostMessage({
      type: EventTypes.UserEmail,
      data: user.email,
    });

    //isEmailVerify check
    if (!response.token) {
      setLoggedIn(false);
      setFormID(FormState.Verify);
    }
  };

  const handleGotoLandingPage = () => {
    setFormID(initFormState);
  }

  useEffect(() => {
    if (detailScrollRef.current) {
      detailScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [formID]);

  const getPage = (id) => {
    switch (id) {
      case FormState.Login:
      case FormState.EmailLogin:
        return (
          <LoginForm
            onBack={() => handleDefaultSet()}
            handleWithSocial={handleWithSocial}
            onNeedVerifyEmail={handleNeedVerifyEmail}
            onLoginSuccess={onLoginSuccess}
            handleForgetPassword={handleForgetPassword}
            detailScrollRef={detailScrollRef}
            isSocialLogin={id === FormState.Login}
            onSignUp={handleRegister}
          />
        );
      case FormState.Register:
        return (
          <RegisterForm
            onBack={() => handleDefaultSet(FormState.InitWithoutWalkthrought)}
            handleWithSocial={handleWithSocial}
            onSignUpWithEmail={handleSignUpWithEmail}
            detailScrollRef={detailScrollRef}
            onLoginSuccess={onLoginSuccess}
            onSignIn={handleSignIn}
          />
        );
      case FormState.Forget:
        return (
          <ForgetPasswordForm
            onBack={() => handleDefaultSet(FormState.EmailLogin)}
            onSignInSocial={handleWithSocial}
            onSubmitForgetEmail={onSubmitForgetEmail}
            detailScrollRef={detailScrollRef}
          />
        );

      case FormState.Reset:
        return (
          <ResetPasswordForm
            onSignInSocial={handleWithSocial}
            onBack={() => setFormID(FormState.OTPCodeVerify)}
            detailScrollRef={detailScrollRef}
            otpCode={otpCode}
            onSignUp={() => handleRegister()}
          />
        )

      case FormState.Verify:
        return (
          <VerificationForm
            onBack={() => setFormID(FormState.Login)}
            onSignInSocial={handleWithSocial}
            onVerification={(code, loggedUser) => handleVerification(code, loggedUser)}
          />
        )

      case FormState.OTPCodeVerify:
        return (
          <VerificationForm
            onBack={() => setFormID(FormState.Forget)}
            onSignInSocial={handleWithSocial}
            onVerification={(code, loggedUser) => handleVerification(code, loggedUser, FormState.Reset)}
          />
        )

      case FormState.InitWithWalkthrought:
        return <Walkthrought onSignUp={handleRegister} onSignIn={handleSignIn}/>;

      case FormState.InitWithoutWalkthrought:
        return <LandingWithoutWalkthrought onSignIn={handleSignIn} onSignUp={handleRegister} />;

      case FormState.WalkthroughtSignUp:
        return <WalkthroughtSignUp onSignIn={handleSignIn} onGotoLandingPage={handleGotoLandingPage} />;
        
      default: 
        return <></>
    }
  }

  return (
    <Container $background={'#FFFFFF'} $select={formID}>
      {getPage(formID)}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.$background};
  width: 100%;
  height: 100%;
  overflow: ${(props) => (props.$select.length > 0 ? "auto" : "hidden")};
  position: relative;

  &::-webkit-scrollbar {
    width: 2px;
  }
`;

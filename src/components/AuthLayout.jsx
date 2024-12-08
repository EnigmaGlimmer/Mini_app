import React, { useEffect } from "react";
import { styled } from "styled-components";
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { useAppState, useUser, useWindowState } from "../store";
import { AuthForm } from '@pages/auth';
import { Storage, GetStorageObject } from '@utils';
import { PopperBottom, EventTypes } from "@utils/constants";
import MainPageWrapper from "./MainPageWrapper";

export const AuthLayout = (props) => {
    const { isMobile, children, brand, iframe, parentWindow } = props;
    const { isLoggedIn, appState, setLoggedIn } = useAppState();
    const { PostMessage, setWindowState } = useWindowState();
    const { setUser } = useUser();

    useEffect(() => {
        setWindowState({
            iframe,
            parentWindow,
            brandName: brand?.brandName,
            brandPubKey: brand?.brandPubKey,
            logoUrl: brand?.logoUrl,
            smallLogoUrl: brand?.smallLogoUrl,
            insuranceRequired: !!brand?.insuranceRequired
        });
    }, [brand, iframe, parentWindow]);

    useEffect(() => {
        const optedUser = GetStorageObject(Storage.OptedUser);
        if (optedUser?.token != undefined) {
            PostMessage({
                type: EventTypes.UserEmail,
                data: optedUser.email,
            });

            setLoggedIn(true);
        }

        setUser(optedUser, false);
    }, [isLoggedIn]);

    return (
        <Layout
            id="vaultik-layout-container"
            $background={appState?.page?.background}
            $isMobile={isMobile}
        >
            {isLoggedIn
                ? <MainPageWrapper>{children}</MainPageWrapper>
                : (<AuthForm />)
            }

            <ToastContainer
                autoClose={60000}
                position={"bottom-center"} 
                hideProgressBar
                theme="dark"
            />
        </Layout>
    );
};

AuthLayout.propTypes = {
    isMobile: PropTypes.bool,
    children: PropTypes.node
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  overflow: hidden;
  width: 100%;
  overflow: hidden;
  height: ${(props) => props.$isMobile ? "100%" : `calc(100vh - ${PopperBottom}px)`};
  border: ${(props) => props.$isMobile ? "0" : "1px solid darkslateblue"};
  border-radius: ${(props) => props.$isMobile ? "0px" : "15px"};
`;

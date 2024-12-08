import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { PageBase } from "@pages/PageBase";
import { AuthLayout } from "@/components/AuthLayout";
import { checkMobileMode } from "@/hooks/mobileCheck";

import {
  FrameWidth,
  FrameHeight,
  OpenerWidth,
  OpenerHeight,
  PopperBottom,
  EventTypes,
} from "@utils";
import GlobalStyle from "@styles/globalStyles";
import ToastStyle from "@styles/toastStyles";
import { Colors, createCustomTheme } from "@styles/theme";
import { RTL } from "@components/rtl";
import { useAppState } from "./store";
import {
  IFrameBottom,
  IFrameMarginLeft,
  IFrameMarginTop,
  IFrameRight,
  PopperPosition,
} from "./utils";
import { AuthApi } from "./api";

function App(props) {
  const {
    brandPubKey,
    position,
    iframe,
    document,
    parentWindow,
    logo,
    bgcolor,
    logoSize,
    buttonSize,
    buttonDistanceBottomCss,
    buttonDistanceRightCss,
    buttonDistanceLeftCss,
  } = props;

  const isWix = window.location.href.startsWith("https://www.vaultik.com");
  const parentWindowHeight = parentWindow.innerHeight;
  const parentWindowWidth = parentWindow.innerWidth;
  const isLeft = position === PopperPosition.BottomLeft;

  const { isOpenApp: isOpen, toggleOpenApp, openApp } = useAppState();

  const isMobile = checkMobileMode();
  const [brand, setBrand] = useState({ brandPubKey: brandPubKey });

  const fetchBrand = async () => {
    try {
      const newBrand = await AuthApi.getBrands(brandPubKey);
      setBrand({ ...brand, ...newBrand });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleOpen = () => {
    toggleOpenApp();
  };

  useEffect(() => {
    iframe.contentWindow.addEventListener(
      "message",
      (event) => {
        const { type, data } = event.data;
        switch (type) {
          case EventTypes.ShowPopup: {
            openApp(data);
            break;
          }
        }
      },
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleChangeIframe(isOpen);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, iframe, document]);

  useEffect(() => {
    if (isOpen) {
      fetchBrand();
    }
  }, [isOpen]);

  useEffect(() => {
    fetchBrand();
  }, []);

  const handleChangeIframe = (isOpen) => {
    // if Popper is opened
    if (isOpen) {
      iframe.style.width = isMobile
        ? "calc(100% + 1px)"
        : FrameWidth + IFrameRight > parentWindowWidth
        ? `${parentWindowWidth - IFrameRight - IFrameMarginLeft}px`
        : `${FrameWidth}px`;
      iframe.style.height = isMobile
        ? "calc(100% + 1px)"
        : FrameHeight + IFrameBottom > parentWindowHeight
        ? `${parentWindowHeight - IFrameBottom - IFrameMarginTop}px`
        : `${FrameHeight}px`;

      if (position === PopperPosition.BottomRight) {
        iframe.style.right = isMobile ? "0px" : `${IFrameRight}px`;
      } else {
        iframe.style.left = isMobile ? "0px" : `${IFrameRight}px`;
      }

      iframe.style.bottom = isMobile ? "0px" : `${IFrameBottom}px`;

      return;
    }

    // if Popper is closed
    iframe.style.width = `${buttonSize || OpenerWidth}px`;
    iframe.style.height = `${buttonSize || OpenerHeight}px`;
    if (position === PopperPosition.BottomRight) {
      iframe.style.right = buttonDistanceRightCss || `${IFrameRight}px`;
    } else {
      iframe.style.left = buttonDistanceLeftCss || `${IFrameRight}px`;
    }
    iframe.style.bottom = buttonDistanceBottomCss || `${IFrameBottom}px`;
  };

  const theme = createCustomTheme({
    direction: "ltr",
    theme: "light",
  });

  return (
    <RTL direction={"ltr"} document={document}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <ToastStyle isMobile={isMobile} />
        {!isOpen &&
          (!isWix ? (
            <OpenerButton
              style={{
                height: buttonSize,
                width: buttonSize,
                left: isLeft ? 0 : "inherit",
                right: !isLeft ? 0 : "inherit",
              }}
              className="flex-all-center"
              $isMobile={isMobile}
              bgcolor={bgcolor}
              onClick={handleToggleOpen}
            >
              <Img src={logo} width={logoSize} height={logoSize} />
            </OpenerButton>
          ) : (
            <img
              style={{
                position: "fixed",
                right: 0,
                bottom: 0,
                width: `${OpenerWidth - 5}px`,
                height: `${OpenerHeight - 5}px`,
                zIndex: 9999,
                cursor: "pointer",
              }}
              src="https://cdn.vaultik.com/mini-web/assets/mini_web_opener.png"
              onClick={handleToggleOpen}
            />
          ))}

        {isOpen ? (
          isWix && isMobile ? (
            <PopperWixMobile id="vaultik-poppers-wx">
              <AuthLayout
                brand={brand}
                iframe={iframe}
                parentWindow={parentWindow}
                isMobile={isMobile}
              >
                <PageBase />
              </AuthLayout>
            </PopperWixMobile>
          ) : (
            <Popper
              id="vaultik-poppers"
              $isMobile={isMobile}
              buttonSize={buttonSize}
            >
              <AuthLayout
                brand={brand}
                iframe={iframe}
                parentWindow={parentWindow}
                isMobile={isMobile}
              >
                <PageBase />
              </AuthLayout>
            </Popper>
          )
        ) : null}
      </ThemeProvider>
    </RTL>
  );
}

export default App;

const Img = styled.img`
  cursor: pointer important!;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

const OpenerButton = styled.div`
  position: fixed;
  bottom: 0px;
  width: ${OpenerWidth - 5}px;
  height: ${OpenerHeight - 5}px;
  background-color: ${(props) =>
    props?.bgcolor ? props.bgcolor : Colors.primary_600};
  z-index: 9999;
  color: white;
  border-radius: 50%;
  border: none;
  overflow: hidden;
  cursor: pointer;
`;

const Popper = styled.div`
  position: fixed;
  right: 0px;
  bottom: ${(props) => (props?.$isMobile ? "0" : `${PopperBottom}px`)};
  height: ${(props) => (props?.$isMobile ? "100%" : "auto")};
  width: ${(props) => (props?.$isMobile ? "100%" : `${FrameWidth}px`)};
  max-width: 100%;
  background-color: transparent;
`;

const PopperWixMobile = styled.div`
  scale: 0.8333333;
  position: fixed;
  left: -10%;
  top: -10%;
  height: 120%;
  width: 120%;
  background-color: transparent;
`;

import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { StyleSheetManager } from "styled-components";
import { getAttributeFromScript, PopperPosition } from "@utils";
import { OpenerWidth, OpenerHeight, EventTypes, IFrameRight, IFrameBottom } from "@utils/constants";
import { RecoilRoot } from 'recoil';
import { Colors } from '@/styles/theme';

const App = lazy(() => import("../App"));

// // Get parameters from script tag
const slug = getAttributeFromScript("brand") || process.env.BRAND_PUBKEY;
const position = getAttributeFromScript("position") || process.env.POSITION || PopperPosition.BottomRight;
const logo = getAttributeFromScript("logo") || process.env.BRAND_LOGO;
const bgcolor = getAttributeFromScript("bgcolor") || process.env.BRAND_BGCOLOR;
const logoSize = getAttributeFromScript("size") || process.env.BRAND_LOGO_SIZE;
const buttonSize = getAttributeFromScript("button-size") || process.env.BUTTON_SIZE;
const buttonDistanceBottomCss = getAttributeFromScript("button-distance-bottom-css") || process.env.BUTTON_DISTANCE_BOTTOM_CSS;
const buttonDistanceLeftCss = getAttributeFromScript("button-distance-left-css") || process.env.BUTTON_DISTANCE_LEFT_CSS;
const buttonDistanceRightCss = getAttributeFromScript("button-distance-right-css") || process.env.BUTTON_DISTANCE_RIGHT_CSS;

const renderIFrame = (brandPubKey) => {
    const iframe = document.createElement("iframe");
    iframe.id = "#vaultik-miniapp"
    document.body.appendChild(iframe);

    const positionStyle = 
        position === "bottom-left"
            ? `left:  ${IFrameRight}px; bottom: ${IFrameBottom}px`
            : `right: ${IFrameRight}px; bottom: ${IFrameBottom}px`;

    iframe.style = `
		border: 0;
		position: fixed;
		width: ${buttonSize || OpenerWidth}px;
		height: ${buttonSize || OpenerHeight}px;
		z-index: 9999 !important;
		background: transparent;
	` + positionStyle;

    const docIframe = iframe.contentDocument;

    // Add fonts
    const link1 = document.createElement("link");
    link1.href =
        "https://fonts.googleapis.com/css?family=Space Grotesk|Inter&display=swap";
    link1.rel = "stylesheet";
    docIframe.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.href = "https://fonts.cdnfonts.com/css/geomanist";
    link2.rel = "stylesheet";
    docIframe.head.appendChild(link2);

    const link3 = document.createElement("link");
    link3.href = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css";
    link3.rel = "stylesheet";
    docIframe.head.appendChild(link3);

    const link4 = document.createElement("link");
    link4.href = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css";
    link4.rel = "stylesheet";
    docIframe.head.appendChild(link4);

    // Add meta
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0";
    docIframe.head.appendChild(meta);

    const bootstrapElement = document.createElement("link");
    bootstrapElement.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
    bootstrapElement.rel = "stylesheet";
    bootstrapElement.integrity = "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC";
    bootstrapElement.crossOrigin = "anonymous";
    docIframe.head.appendChild(bootstrapElement);

    const el = docIframe.createElement("div");
    docIframe.body.appendChild(el);
    docIframe.body.style = "margin: 0px; background-color: transparent !important;";
    const root = createRoot(el);

    root.render(
        <StyleSheetManager target={docIframe.head}>
            <RecoilRoot>
                <App
                    brandPubKey={brandPubKey}
                    document={docIframe}
                    iframe={iframe}
                    parentDocument={document}
                    parentWindow={window}
                    position={position}
                    logo={logo}
                    bgcolor={bgcolor}
                    logoSize={logoSize}
                    buttonSize={buttonSize}
                    buttonDistanceRightCss={buttonDistanceRightCss}
                    buttonDistanceLeftCss={buttonDistanceLeftCss}
                    buttonDistanceBottomCss={buttonDistanceBottomCss}
                />
            </RecoilRoot>
        </StyleSheetManager>
    );

    return { iframe, root, el };
};

// Export vaultikWallet
class VaultikWallet {
    iframe;
    iframeRoot;
    el;
    user;

    constructor() {
        this.iframe = null;
        this.iframeRoot = null;
        this.el = null;
    }

    /**
     *
     * Create and Add an iframe to the Window
     */
    mount() {
        const doRender = async () => {
            if (vaultikWallet.iframe) {
                return;
            }

            const { iframe, root, el } = renderIFrame(slug);

            vaultikWallet.el = el;
            vaultikWallet.iframeRoot = root;
            vaultikWallet.iframe = iframe;
        }

        if (document.readyState === "complete") {
            doRender();
        } else {
            window.addEventListener("load", () => {
                doRender();
            });
        }

        window.addEventListener("message", (event) => {
            const { type, data } = event.data;
            if (type === EventTypes.UserEmail) {
                this.user = { email: data }
            }
        });
    }

    /**
     * Unmount the iframe
     */
    unmount() {
        if (vaultikWallet.iframeRoot) {
            vaultikWallet.iframeRoot.unmount(vaultikWallet.el);
            vaultikWallet.iframeRoot = null;
        }

        if (vaultikWallet.el) {
            vaultikWallet.el.parentNode.removeChild(vaultikWallet.el);
            vaultikWallet.el = null;
        }

        if (vaultikWallet.iframe) {
            vaultikWallet.iframe.parentNode.removeChild(vaultikWallet.iframe);
            vaultikWallet.iframe = null;
        }
    }

    /**
     * The parent Window can get user email of mini-web using this function
     * 
     * @returns a user's email if opted in. Otherwise, return undefined.
     */
    getUserEmail() {
        return this.user?.email;
    }

    /**
     * Show / Hide Popup
     */
    showPopup() {
        if (vaultikWallet.iframe) {
            vaultikWallet.iframe.contentWindow.postMessage({
                type: EventTypes.ShowPopup,
                data: true,
            });
        }
    }

    /**
     * Hide Popup
     */
    hidePopup() {
        if (vaultikWallet.iframe) {
            vaultikWallet.iframe.contentWindow.postMessage({
                type: EventTypes.ShowPopup,
                data: false,
            });
        }
    }
}

const vaultikWallet = new VaultikWallet();

function mountVaultikWallet() {
    vaultikWallet.mount(slug);
}

mountVaultikWallet();

export default vaultikWallet;

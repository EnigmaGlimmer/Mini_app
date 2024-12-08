import React, { useEffect, useState, useRef } from "react";

import { usePage, useAppState } from "@store";
import { Storage, GetStorageObject } from "@utils";
import DetailPageWrapper from "@/components/DetailPageWrapper";
import { useWindowState } from "@/store";

export const Product3DViewer = ({ item }) => {

    const MessageCode = "ECertificateMessage";
    const { page, setPage } = usePage();
    const { setShowHeader, setShowFooter } = useAppState();
    const [isInitialized, setInitialized] = useState(false);
    const iframeRef = useRef(null);
    const { vaultikWindow } = useWindowState();

    const handleBack = () => {
        setPage({
            ...page,
            openDetail: false,
            showFooter: true,
            is3D: false,
        });
        setShowHeader(true);
        setShowFooter(true);
    }
    const title = item?.product?.name || "3d Viewer";
    // const url = item?.product?.asset3dUrl || undefined;
    const url = process.env.VIEWER_URL || "https://asset3d-viewer.s3.eu-west-2.amazonaws.com/DevVaultik3dViewer/index.html";
    const apiUrl = process.env.API_ENDPOINT || "https://dev-api.vaultik.com";

    const transferData = () => {
        if (isInitialized) {
            console.log("Already sent a token.");
            return;
        }
        try {
            const optedUser = GetStorageObject(Storage.OptedUser);
            if (iframeRef.current) {
                console.log("Sending Data to ECertificate Viewer..");
                iframeRef.current.contentWindow.postMessage({
                    messageType: MessageCode,
                    data: {
                        type: "consumer",
                        token: optedUser.token,
                        apiUrl: apiUrl + "/",
                        eid: item.id,
                    }
                }, "*");

                return true;
            }
        } catch (e) {
            console.log("IFrame PostMessage Error:", e);
        }

        return false;
    };

    useEffect(() => {
        if (vaultikWindow.iframe.contentWindow) {
            vaultikWindow.iframe.contentWindow.addEventListener('message', function (event) {
                const { type } = event.data;
                if (type === MessageCode) {
                    console.log("3D Configurator sent an initialized message", event.data);

                    setInitialized(true);
                    transferData();
                }
            });

            // transferData();
        }
    }, []);

    return (
        <DetailPageWrapper title={title} onBack={handleBack}>
            <div className="flex-col-center no-scroll pb-4 h-100">
                {url && <iframe
                    ref={iframeRef}
                    className="flex-all-center"
                    style={{ overflow: "hidden", width: "100%", height: "100%" }}
                    scrolling="no"
                    src={url}
                ></iframe>}
            </div>
        </DetailPageWrapper>
    );
}

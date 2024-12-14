import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../Button";
import { useAppState, usePage } from "@/store";
import { Colors } from "@/styles/theme";
import { Assets } from "@/assets";
import { ThankYou } from "./ThankYou";
import { BackIcon, CloseIcon, VaultCareContainer } from "./ProtectVaultCare";
import { Times } from "../icons/Times";

export const CheckVaultCare = ({ select }) => {
    const { page, setPageState } = usePage();
    const { setShowHeader, setShowFooter, closeApp } = useAppState();
    const [showThankYouPage, setShowThankYouPage] = useState(false);
    const thanksTitle = "We receive your request.You will receive an email when the policy will be active.";
    const srcImage = select.product.images[0];

    const handleBack = () => {
        setShowHeader(true);
        setPageState(true, select, false, true);
        setShowFooter(true);
    };

    const handleClose = () => {
        closeApp();
    }

    const handleThanks = () => {
        setShowThankYouPage(true);
    }

    if (showThankYouPage) {
        return <ThankYou select={select} title={thanksTitle} />
    }

    return (
        <VaultCareContainer>
            <div>
                <BackIcon onClick={handleBack}>
                    <img src={Assets.left_arrow} alt="" />
                </BackIcon>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "8px", padding: "4px", marginBottom: "16px"}}>
                    <img src={Assets.vaultcare} alt="VaultCare" width={30} height={30} />
                    <h3 style={{ margin: "0px" }}>VaultCare</h3>
                </div>
                <CloseIcon onClick={handleClose}>
                    <Times fontSize='20px' />
                </CloseIcon>
            </div>

            <div style={{ display: "flex", flexDirection: "row", padding: "28px 22px", justifyContent: "space-between", backgroundColor: "white", borderRadius: "12px" }}>
                <TitleTypography>Policy ID</TitleTypography>
                <Typography>IDIAU020228331221</Typography>
            </div>

            <div style={{ display: "flex", flexDirection: "row", padding: "16px", justifyContent: "space-between", alignItems: "center", gap: "8px", backgroundColor: "white", borderRadius: "8px" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px" }}>
                    <Typography style={{ fontSize: "12px" }}>Certificate Number: <b>V383jwdja938777j</b></Typography>
                    <TitleTypography style={{ fontSize: "18px" }}>Rolex Cosmograph Daytona 116508</TitleTypography>
                    <h5 style={{ padding: "8px 4px", backgroundColor: "#f5f5f5", borderRadius: "8px", width: "fit-content", color: "black", margin: "0px" }}>VALUE: $14390</h5>
                </div>
                <div>
                    <img width={86} height={120} style={{ borderRadius: "12px" }} src={srcImage} />
                </div>
            </div>

            <Container>
                <TitleTypography>Annual pricing</TitleTypography>
                <Typography>99 €</Typography>
            </Container>

            <Container>
                <TitleTypography>Expiry</TitleTypography>
                <Typography>27/12/2025</Typography>
            </Container>

            <div style={{ marginTop: "auto" }}>
                <Button
                    title="Submit a Claim"
                    background={Colors.white}
                    color={Colors.black}
                    onClick={handleThanks}
                />
            </div>
        </VaultCareContainer>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 16px;
    justify-content: space-between;
    background-color: white;
    border-radius: 8px;
`;

const TitleTypography = styled.h4`
    font-size: 16px;
`;

const Typography = styled.p`
    font-size:16px;
    margin: 0px;
`

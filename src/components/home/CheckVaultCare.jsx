import React, { useState } from "react";
import DetailPageWrapper from "../DetailPageWrapper";
import styled from "styled-components";
import { Button } from "../Button";
import { useAppState, usePage } from "@/store";
import { Colors } from "@/styles/theme";
import { Thank_you } from "./Thank_you";

export const CheckVaultCare = ({ select }) => {
    const { page, setPageState } = usePage();
    const { setShowHeader, setShowFooter } = useAppState();
    const [showThankYouPage, setShowThankYouPage] = useState(false);
    const thanksTitle = "We receive your request.You will receive an email when the policy will be active.";

    const handleBack = () => {
        setShowHeader(true);
        setPageState(true, select, false, true);
        setShowFooter(true);
    }

    const handleThanks = () => {
        setShowThankYouPage(true);
    }

    if(showThankYouPage) {
        return <Thank_you select={select} title={thanksTitle}/>
    }

    return (
        <DetailPageWrapper onBack={handleBack} title="VaultCare">
            <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#fafafa", padding: "24px", height: "200%", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "row", padding: "28px 22px", justifyContent: "space-between", backgroundColor: "white", borderRadius: "12px" }}>
                    <TitleTypography>Policy ID</TitleTypography>
                    <Typography>IDIAU020228331221</Typography>
                </div>

                <div style={{ display: "flex", flexDirection: "row", padding: "16px", justifyContent: "space-between", alignItems: "center", gap: "8px", backgroundColor: "white", borderRadius: "8px" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                        <Typography style={{ fontSize: "12px" }}>Certificate Number: <b>V383jwdja938777j</b></Typography>
                        <TitleTypography style={{ fontSize: "18px" }}>Rolex Cosmograph Daytona 116508</TitleTypography>
                        <h5 style={{ padding: "8px 4px", backgroundColor: "#f5f5f5", borderRadius: "8px", width: "fit-content", color: "black", margin: "0px" }}>VALUE: $14390</h5>
                    </div>
                    <div>
                        <img width={86} height={120} style={{ backgroundColor: 'black', borderRadius: "12px" }} />
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
            </div>
        </DetailPageWrapper>
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

// const Button = styled.div`
//     width: 100%;
//     cursor: pointer;
//     border: 1px solid gray;
//     background-color: white;
//     border-radius: 8px;
//     padding: 12px;
//     text-align:center
// `;

const TitleTypography = styled.h4`
    font-family: Geomanist;
    font-size: 16px;
`;

const Typography = styled.p`
    font-family: Geomanist;
    font-size:16px;
    margin: 0px;
`

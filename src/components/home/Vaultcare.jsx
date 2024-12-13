import React, { useState } from 'react';
import { Colors } from "@/styles/theme";
import styled from "styled-components";
import { Link } from '@mui/material';
import { RightArrowIcon } from '../icons/RightArrowIcon';
import { useAppState, usePage } from '@/store';

export function VaultCare({ select }) {
    const { page, setPageState } = usePage();
    const { setShowHeader, setShowFooter } = useAppState();
    const completeVaultCare = page.completeVaultCare;

    const handleVaultCare = () => {
        setPageState(true, select, true);
        setShowHeader(false);
        setShowFooter(false);
    };

    const handlePolicyDetail = () => {
        setPageState(true, select, true, true);
        setShowHeader(false);
        setShowFooter(false);
    }
    
    if (completeVaultCare) {
        return (
            <Content>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "32px 24px", gap: "20px", backgroundColor: "black", color: "white", textAlign: "center", borderRadius: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px" }}>
                        <img src='/Group.png' alt='Group' width={30} height={30} />
                        <h2 style={{ margin: "0px" }}>VaultCare</h2>
                    </div>
                    <div>
                        <p style={{ margin: "0px", fontSize: "14px" }}>Powered by Avata</p>
                    </div>
                </div>

                <ProgressBarSection>
                    <ProgressBarHead>
                        <ProgressBarTypo>Policy Expire</ProgressBarTypo>
                        <ProgressBarTypo>27/12/2025</ProgressBarTypo>
                    </ProgressBarHead>

                    <div style={{ position: "relative", height: "4px", backgroundColor: "#f5f5f5", borderRadius: "1000px", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: "0", left: "0", height: "8px", backgroundColor: "black", width: "25%" }}></div>
                    </div>
                </ProgressBarSection>

                <Desc>
                    At Vaultik, we specialize in the elite facilitation of protective services for your cherished assets.
                    Vault+ seamlessly integrates into your digital certificate,protection of your valuable possessions.purchase powered by Avata and Vaultik. <br /><br />
                    View conditions <Link sx={{ cursor: "pointer", fontWeight: "bold" }}>here</Link>
                </Desc>
                <ButtonWithIcon bgcolor="#f5f5f5" cursor="pointer" onClick={handlePolicyDetail}>
                    <ButtonTitle textcolor="black">Policy Details</ButtonTitle>
                    <RightArrowIcon fill={Colors.black} />
                </ButtonWithIcon>

                <div style={{ width: "100%" }}>
                    <Button>
                        Submit a Claim
                    </Button>
                </div>
            </Content>
        );
    };

    return (
        <Content>
            <ButtonWithIcon radius="16px" bgcolor="#fafafa">
                <ButtonTitle size="12px">Insurance Provider</ButtonTitle>
            </ButtonWithIcon>
            <Desc>
                At Vaultik, we specialize in the elite facilitation of protective services for your cherished assets.
                Vault+ seamlessly integrates into your digital certificate, streamlining the process for rapid response to any unexpected events, while offering you unparalleled peace of mind.
                Indulge in the world of luxury, knowing that Vault+ is steadfastly elevating the protection of your valuable possessions. <br /><br />
                Enjoy up to 1 year of care with your Luxe Dressing purchase powered by Avata and Vaultik. <br /><br />
                View conditions <Link sx={{ cursor: "pointer", fontWeight: "bold" }}>here</Link>
            </Desc>
            <ButtonWithIcon bgcolor="#dd0735" cursor="pointer" onClick={handleVaultCare}>
                <ButtonTitle textcolor="white">Protect with VaultCare</ButtonTitle>
                <RightArrowIcon fill={Colors.white} />
            </ButtonWithIcon>
        </Content>
    );
}

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
    margin-top: 16px;
`;

const ButtonWithIcon = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 17px 21px;
    width: 100%;
    background: ${({ bgcolor }) => bgcolor || Colors.primary_200};
    border-radius: ${({ radius }) => radius || "6px"};
    cursor: ${({ cursor }) => cursor || "not-allowed"};
`;

const ButtonTitle = styled.div`
    font-family: "Geomanist";
    font-style: normal;
    font-weight: 500;
    font-size: ${({ size }) => size || "16px"};
    line-height: 24px;
    color: ${({ textcolor }) => textcolor || Colors.gray};
`;

const Desc = styled.div`
    font-family: "Geomanist";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: normal;
    padding: 3.5px;
    color: #707070;
`;

const Button = styled.div`
    width: 100%;
    cursor: pointer;
    border: 1px solid ${Colors.neutral_200};
    background-color: white;
    color: #404040;
    border-radius: 8px;
    padding: 12px;
    text-align:center;
`;

const ProgressBarSection = styled.div`
    width: 100%;
`;

const ProgressBarHead = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
`;
const ProgressBarTypo = styled.span`
    font-size: 12px;
    font-weight: 500;
`
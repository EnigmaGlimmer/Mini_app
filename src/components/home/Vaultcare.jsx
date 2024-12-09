import React, { useState } from 'react';
import { Colors } from "@/styles/theme";
import styled from "styled-components";
import { Link } from '@mui/material';
import { RightArrowIcon } from '../icons/RightArrowIcon';

export function VaultCare(props) {
    const [isVaultCare, setIsVaultCare] = useState(true);

    if (isVaultCare) {
        return (
            <Content>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "24px", gap: "12px", backgroundColor: "black", color: "white", textAlign: "center", borderRadius: "8px" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "4px" }}>
                        <img src='/Group.png' alt='Group' width={50} height={50} />
                        <h2 style={{ margin: "0px" }}>VaultCare</h2>
                    </div>
                    <div>
                        <p style={{ margin: "0px", fontSize: "14px" }}>Powered by Avata</p>
                    </div>
                </div>

                <div style={{width: "100%"}}>
                    <div style={{display: "flex", justifyContent:"space-between", marginBottom: "8px"}}>
                        <span style={{ fontSize: "14px", fontWeight: "500" }}>Policy Expire</span>
                        <span style={{ fontSize: "14px", fontWeight: "500" }}>27/12/2025</span>
                    </div>

                    <div style={{position:"relative", height: "8px", backgroundColor: "gray", borderRadius:"1000px",overflow:"hidden"}}>
                        <div style={{position:"absolute", top:"0", left:"0", height:"8px", backgroundColor:"black", width:"25%"}}></div>
                    </div>
                </div>

                <Desc>
                    At Vaultik, we specialize in the elite facilitation of protective services for your cherished assets.
                    Vault+ seamlessly integrates into your digital certificate, streamlining the process for rapid response to any unexpected events, while offering you unparalleled peace of mind.
                    Indulge in the world of luxury, knowing that Vault+ is steadfastly elevating the protection of your valuable possessions. <br /><br />
                    Enjoy up to 1 year of care with your Luxe Dressing purchase powered by Avata and Vaultik. <br /><br />
                    View conditions <Link sx={{ cursor: "pointer", fontWeight: "bold" }}>here</Link>
                </Desc>
                <ButtonWithIcon bgColor="gray" cursor="pointer">
                    <ButtonTitle textColor="white">Policy Details</ButtonTitle>
                    <RightArrowIcon fill={Colors.white} />
                </ButtonWithIcon>
            </Content>
        );
    };


    return (
        <Content>
            <ButtonWithIcon>
                <ButtonTitle>Insurance Provider</ButtonTitle>
            </ButtonWithIcon>
            <Desc>
                At Vaultik, we specialize in the elite facilitation of protective services for your cherished assets.
                Vault+ seamlessly integrates into your digital certificate, streamlining the process for rapid response to any unexpected events, while offering you unparalleled peace of mind.
                Indulge in the world of luxury, knowing that Vault+ is steadfastly elevating the protection of your valuable possessions. <br /><br />
                Enjoy up to 1 year of care with your Luxe Dressing purchase powered by Avata and Vaultik. <br /><br />
                View conditions <Link sx={{ cursor: "pointer", fontWeight: "bold" }}>here</Link>
            </Desc>
            <ButtonWithIcon bgColor="red" cursor="pointer">
                <ButtonTitle textColor="white">Protect with VaultCare</ButtonTitle>
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
    padding: 12px 20px;
    width: 100%;
    background: ${({ bgColor }) => bgColor || Colors.primary_200};
    border-radius: 6px;
    cursor: ${({ cursor }) => cursor || "not-allowed"};
`;

const ButtonTitle = styled.div`
    font-family: "Space Grotesk";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${({ textColor }) => textColor || Colors.gray};
`;

const Desc = styled.div`
    font-family: "Space Grotesk";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: normal;
`;

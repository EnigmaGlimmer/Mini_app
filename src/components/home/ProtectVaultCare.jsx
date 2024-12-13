import React, { useState, useRef } from 'react';
import { Colors } from '@/styles/theme';
import { Assets } from '@/assets';
import styled from 'styled-components';
import { useAppState, usePage } from '@/store';
import { Times } from '../icons/Times';
import { Button } from '../Button';
import { Thank_you } from './Thank_you';

export const ProtectVaultCare = ({ select }) => {
    const { page, setPageState } = usePage();
    const { setShowHeader, setShowFooter } = useAppState();
    const [checkboxes, setCheckboxes] = useState([false, false, false]);
    const [showThankYouPage, setShowThankYouPage] = useState(false);
    const thanksTitle = "Your Vaultcare Policy is active ID: 92928 37dd.";
    const srcImage = select.product.images[0];

    const detailScrollRef = useRef(null);

    const handleBack = () => {
        setShowHeader(true);
        setPageState(true, select, false);
        setShowFooter(true);
    };

    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);
    };

    const allChecked = checkboxes.every((checked) => checked);

    const handleThanks = () => {
        setShowThankYouPage(true);
    };

    if (showThankYouPage) {
        return <Thank_you select={select} title={thanksTitle} />
    }

    return (
        <VaultCareContainer>
            <div>
                <BackIcon onClick={handleBack}>
                    <img src={Assets.left_arrow} alt="" />
                </BackIcon>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:"8px", padding:"4px", marginBottom:"16px"}}>
                    <img src="/Group.png" alt="VaultCare" width={30} height={30}/>
                    <h3 style={{margin:"0px"}}>VaultCare</h3>
                </div>
                <CloseIcon>
                    <Times fontSize='20px' />
                </CloseIcon>
            </div>
            <Content>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                    <p style={{ fontSize: "12px", margin: "0px" }}>Certificate Number: <b>V383jwdja938777j</b></p>
                    <h4 style={{ fontFamily: "Geomanist" }}>Rolex Cosmograph Daytona 116508</h4>
                    <h5 style={{ padding: "8px 4px", backgroundColor: "#f5f5f5", borderRadius: "8px", width: "fit-content", color: "black", margin: "0px" }}>VALUE: $14390</h5>
                </div>
                <div>
                    <img width={86} height={120} style={{ borderRadius: "12px" }} src={srcImage} />
                </div>
            </Content>

            <div style={{ display: "flex", flexDirection: "row", padding: "22px 28px", justifyContent: "space-between", backgroundColor: "white", borderRadius: "8px" }}>
                <h4 style={{ fontSize: "16px" }}>Annual pricing</h4>
                <p style={{ margin: "0px", fontSize: "16px" }}>99 €</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", padding: "16px", gap: "12px" }}>
                {[
                    "By signing up, I confirm to have read and agreed to Vaultik's Terms & conditions and Privacy Policy, and I certify that I'm at least 18 years old.",
                    "I'd like to receive personalized offers and be the first to know about the latest Vaultik updates via email.",
                    "I'd like to receive personalized offers and be the first to know about the latest Vaultik updates via email."
                ].map((text, index) => (
                    <div key={index} style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        gap: "8px",
                    }}>
                        <input
                            type="checkbox"
                            style={{ marginTop: "6px", transform: {} }}
                            checked={checkboxes[index]}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <p style={{ margin: "0px" }}>{text}</p>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "auto" }}>
                <Button
                    title="Pay 99 €"
                    background={allChecked ? Colors.neutral_900 : "lightgray"}
                    disabled={!allChecked}
                    onClick={handleThanks}
                />
            </div>
        </VaultCareContainer>
    );
}

export const VaultCareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 16px 16px;
  background-color: #fafafa;
  height: 200%;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    padding: 16px;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    background-color: white;
    border-radius: 8px;
`;

export const BackIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;

  position: absolute;
  left: 24px;
  top: 24px;

  background: rgba(255, 255, 255, 0.8);
  /* Drop shadow/Small */

  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.2),
    0px 1px 2px -1px rgba(16, 24, 40, 0.1);
  border-radius: 24px;
  cursor: pointer;
  z-index: 999;
`;

export const CloseIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;

  position: absolute;
  right: 24px;
  top: 24px;

  background: rgba(255, 255, 255, 0.8);
  /* Drop shadow/Small */

  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.2),
    0px 1px 2px -1px rgba(16, 24, 40, 0.1);
  border-radius: 24px;
  cursor: pointer;
  z-index: 999;
`;
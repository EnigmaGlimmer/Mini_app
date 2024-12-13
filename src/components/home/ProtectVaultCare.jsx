import React, { useState, useRef } from 'react';
import { Colors } from '@/styles/theme';
import styled from 'styled-components';
import { useAppState, usePage } from '@/store';
import DetailPageWrapper from "../DetailPageWrapper";
import { Button } from '../Button';
import { Thank_you } from './Thank_you';

export const ProtectVaultCare = ({select}) => {
    const { page, setPageState } = usePage();
    const {setShowHeader, setShowFooter} = useAppState();
    const [checkboxes, setCheckboxes] = useState([false, false, false]);
    const [showThankYouPage, setShowThankYouPage] = useState(false);

    const detailScrollRef = useRef(null);

    const handleBack = () => {
        setShowHeader(true);
        setPageState(true,select,false);
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

    if(showThankYouPage) {
        return <Thank_you select={select}/>
    }

    return (
        <DetailPageWrapper onBack={handleBack} title="VaultCare" ref={detailScrollRef}>
            <VaultCareContainer>
                <Content>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                        <p style={{ fontSize: "12px", margin: "0px" }}>Certificate Number: <b>V383jwdja938777j</b></p>
                        <h4 style={{fontFamily:"Geomanist"}}>Rolex Cosmograph Daytona 116508</h4>
                        <h5 style={{ padding: "8px 4px", backgroundColor: "#f5f5f5", borderRadius: "8px", width: "fit-content", color: "black", margin: "0px" }}>VALUE: $14390</h5>
                    </div>
                    <div>
                        <img width={86} height={120} style={{ backgroundColor: 'black', borderRadius: "12px" }} />
                    </div>
                </Content>

                <div style={{ display: "flex", flexDirection: "row", padding: "22px 28px", justifyContent: "space-between", backgroundColor: "white", borderRadius: "8px" }}>
                    <h4 style={{fontSize:"16px"}}>Annual pricing</h4>
                    <p style={{ margin: "0px", fontSize:"16px" }}>99 €</p>
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
                                style={{ marginTop: "6px" , transform: {}}}
                                checked={checkboxes[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <p style={{ margin: "0px" }}>{text}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <Button
                        title="Pay 99 €"
                        background={allChecked ? Colors.neutral_900 : "lightgray"}
                        disabled={!allChecked}
                        onClick = {handleThanks}
                    />
                </div>
            </VaultCareContainer>
        </DetailPageWrapper>
    );
}

const VaultCareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
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
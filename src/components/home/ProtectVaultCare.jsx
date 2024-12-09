import React, { useState, useRef } from 'react';
import { Colors } from '@/styles/theme';
import styled from 'styled-components';
import { usePage } from '@/store';
import DetailPageWrapper from "../DetailPageWrapper";
import { Button } from '../Button';

export const ProtectVaultCare = () => {
    const { page, setPageState } = usePage();
    const [checkboxes, setCheckboxes] = useState([false, false, false]);

    const detailScrollRef = useRef(null);

    const handleClick = () => {
        setPageState(false);
    };

    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);
    };

    const allChecked = checkboxes.every((checked) => checked)

    return (
        <DetailPageWrapper onBack={handleClick} title="VaultCare" ref={detailScrollRef}>
            <VaultCareContainer>
                <div style={{ display: "flex", flexDirection: "row", padding: "16px", justifyContent: "space-between", alignItems: "center", gap: "8px", backgroundColor: "white", borderRadius: "8px" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
                        <p style={{ fontSize: "12px", margin: "0px" }}>Certificate Number: <b>V383jwdja938777j</b></p>
                        <h4>Rolex Cosmograph Daytona 116508</h4>
                        <h5 style={{ padding: "8px 4px", backgroundColor: "lightgray", borderRadius: "8px", width: "fit-content", color: "black", margin: "0px" }}>VALUE: $14390</h5>
                    </div>
                    <div>
                        <img width={86} height={120} style={{ backgroundColor: 'black' }} />
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", padding: "16px", justifyContent: "space-between", backgroundColor: "white", borderRadius: "8px" }}>
                    <h4>Annual pricing</h4>
                    <p style={{ margin: "0px" }}>99 €</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", padding: "16px", gap: "20px" }}>
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
                                style={{ marginTop: "6px" }}
                                checked={checkboxes[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <p style={{ margin: "0px" }}>{text}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <Button
                        title="99 €"
                        background={allChecked ? Colors.neutral_900 : "lightgray"}
                        disabled={!allChecked}
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
  background-color: #efefef;
  height: 200%;
`;
import React from "react";
import DetailPageWrapper from "../DetailPageWrapper";
import { Colors } from "@/styles/theme";

export const CheckVaultCare = () => {

    return (
        <DetailPageWrapper title="VaultCare">
            <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#efefef", padding: "24px", height: "200%", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "row", padding: "16px", justifyContent: "space-between", backgroundColor: "white", borderRadius: "8px" }}>
                    <h4>Policy ID</h4>
                    <p style={{ margin: "0px" }}>IDIAU020228331221</p>
                </div>

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

                <div style={{ display: "flex", flexDirection: "row", padding: "16px", justifyContent: "space-between", backgroundColor: "white", borderRadius: "8px" }}>
                    <h4>Expiry</h4>
                    <p style={{ margin: "0px" }}>27/12/2025</p>
                </div>

                <div style={{marginTop: "auto"}}>
                    <button style={{
                        width:"100%",
                        cursor: "pointer",
                        border: "1px solid gray",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "12px",
                        }}>
                        Submit a Claim
                    </button>
                </div>
            </div>
        </DetailPageWrapper>
    );
}
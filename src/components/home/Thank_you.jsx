import React, { useState } from "react";
import DetailPageWrapper from "../DetailPageWrapper";
import { Button } from "../Button";
import { Colors } from "@/styles/theme";
import { usePage } from "@/store";

const titles = [
    "Your Vaultcare Policy is active ID: 92928 37dd.",
    "We receive your request.You will receive an email when the policy will be active."
];

export const Thank_you = ({select}) => {
    const {setPageState} = usePage();

    const handleClick = () => {
        setPageState(true, select, false, true);
    };

    return (
        <DetailPageWrapper title="Thank you!">
            <div style={{ display: "flex", flexDirection: "column", height: "200%", padding: "16px", backgroundColor: "#fafafa", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", padding: "132px 48px", gap: "24px", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
                    <h3><b>Thanks you!</b></h3>
                    <img src="/Group.png" alt="Group" width={120} height={120} />
                    <p style={{ margin: "0px" }}>
                        {titles[0]}
                    </p>
                </div>

                <div style={{ margin: "auto", width: "100%" }}>
                    <Button
                        title="Thanks"
                        background={Colors.neutral_900}
                        onClick={handleClick}
                    />
                </div>
            </div>
        </DetailPageWrapper>
    );
}
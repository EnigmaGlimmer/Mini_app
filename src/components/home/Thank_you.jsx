import React from "react";
import DetailPageWrapper from "../DetailPageWrapper";
import { Button } from "../Button";
import { Colors } from "@/styles/theme";

const titles = [
    "Your Vaultcare Policy is active ID: 92928 37dd.",
    "We receive your request.You will receive an email when the policy will be active."
]

export const Thank_you = () => {

    return (
        <DetailPageWrapper title="Thank you!">
            <div style={{ display: "flex", flexDirection: "column", height: "200%", padding: "16px", backgroundColor: "#efefef", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", padding: "132px 48px", gap: "24px", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
                    <h3>Thanks you!</h3>
                    <img src="/Group.png" alt="Group" width={160} height={160} />
                    <p style={{ margin: "0px" }}>
                        {titles[1]}
                    </p>
                </div>

                <div>
                    <Button
                        title="Thanks"
                        background={Colors.netural_800}
                    />
                </div>
            </div>
        </DetailPageWrapper>
    );
}
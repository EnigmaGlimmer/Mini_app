import React, { useState } from "react";
import DetailPageWrapper from "../DetailPageWrapper";
import { Button } from "../Button";
import { Colors } from "@/styles/theme";
import { useAppState, usePage } from "@/store";

export const Thank_you = ({select, title}) => {
    const {setPageState} = usePage();
    const {setShowHeader, setShowFooter} = useAppState();

    const handleClick = () => {
        setPageState(true, select, false, true);
        setShowHeader(true);
        setShowFooter(true);
    };

    return (
        <DetailPageWrapper title="Thank you!">
            <div style={{ display: "flex", flexDirection: "column", height: "200%", padding: "16px", backgroundColor: "#fafafa", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", padding: "132px 48px", gap: "24px", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
                    <h3><b>Thanks you!</b></h3>
                    <img src="/Group.png" alt="Group" width={120} height={120} />
                    <p style={{ margin: "0px" }}>
                        {title}
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
import React from "react";
import { Button } from "../Button";
import { Colors } from "@/styles/theme";
import { useAppState, usePage } from "@/store";
import { Assets } from "@/assets";

export const ThankYou = ({select, title}) => {
    const {setPageState} = usePage();
    const {setShowHeader, setShowFooter} = useAppState();

    const handleClick = () => {
        setPageState(true, select, false, true);
        setShowHeader(true);
        setShowFooter(true);
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column",justifyContent:"space-between", height: "200%", padding: "16px", backgroundColor: "#fafafa", gap: "16px" }}>
                <div style={{textAlign: "center"}}>
                    Thank you!
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px", justifyContent: "space-between", alignItems: "center", textAlign: "center", maxWidth:"250px", margin:"auto" }}>
                    <h3 style={{fontSize:"24px"}}><b>Thank you!</b></h3>
                    <img src={Assets.vaultcare} alt="VaultCare" width={120} height={120} />
                    <p style={{ margin: "0px" }}>
                        {title}
                    </p>
                </div>

                <div style={{ width: "100%" }}>
                    <Button
                        title="Thanks"
                        background={Colors.neutral_900}
                        borderRadius="16px"
                        onClick={handleClick}
                    />
                </div>
            </div>
        </>
    );
}
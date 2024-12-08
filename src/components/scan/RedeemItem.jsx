import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { Stack } from "@mui/material";

import { Assets } from "@assets";
import { Colors } from "../../styles/theme";
import { Button } from "../Button";
import { OrderApi } from "@api";
import { useAppState, usePage } from "@store";
import { AppState } from "@utils/constants";
import { useOrders } from "@/store/orderStore";
import MainPageWrapper from "../MainPageWrapper";

const Steps = {
  NONE: 0,
  REDEEMING: 1,
  SUCCESS: 2,
  ERROR: 3,
}
export const RedeemItem = (props) => {
  const { onBack, code } = props;
  const detailScrollRef = useRef(null);
  const [nft, setNft] = useState();
  const [step, setStep] = useState(Steps.NONE);
  const [error, setError] = useState();
  const { setActivePage, setShowFooter } = useAppState();
  const { fetchOrders } = useOrders(false);
  const { page, setPage } = usePage();

  useEffect(() => {
    const redeemItem = async (code) => {
      setStep(Steps.REDEEMING);
      setShowFooter(false);
      
      try {
        const nftData = await OrderApi.redeem(code);
        setNft(nftData);

        setStep(Steps.SUCCESS);
      } catch (err) {
        setStep(Steps.ERROR);
        
        console.log("[Error] Redeem Failed:", err?.message);
        setError(err);
      } finally {
        setShowFooter(true);
      }
    };

    redeemItem(code);
  }, [code]);

  const handleBack = () => {
    onBack();
  };

  const handleSaveValut = async () => {
    await fetchOrders();
    setActivePage(AppState.Home);
    setPage({ ...page, openDetail: false });
  }

  useEffect(() => {
    if (detailScrollRef.current) {
      detailScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [step]);

  if (step === Steps.REDEEMING || step === Steps.NONE) {
    return (
      <MainPageWrapper showHeader>
        <Stack my={"auto"} pb={2} direction={"column"} alignItems={"center"}>
          <img src={Assets.drill} alt="" ref={detailScrollRef} />
          <div className="text pb-5">
            We are redeeming your DPP
            <br /> just some seconds...
          </div>
        </Stack>
      </MainPageWrapper>
    );
  } else if (step === Steps.ERROR) {
    return (
      <MainPageWrapper showHeader hiddenFooter>
        <Stack px={3} height={"100%"}>
          <Stack width={"100%"} justifyContent={"center"} gap={10} my={"auto"} py={2}>
            <CardImg $success={false} className="p-2">
              <img src={Assets.emoticons} alt="" width={56} height={56} style={{ objectFit: "contain" }} />
              <HeaderDesc className="p-0 mt-2">
                {error?.message ? (
                  <span>{error?.message || ""}</span>
                ) : (
                  <span>We had some issues, <br /> something was wrong.</span>
                )}
              </HeaderDesc>
            </CardImg>

            <Button
              onClick={handleBack}
              title="Restart the process"
              background={Colors.primary_600}
            />
          </Stack>
        </Stack>
      </MainPageWrapper>
    );
  }

  return (
    <MainPageWrapper showHeader hiddenFooter>
      <Stack 
        px={3}
        justifyContent={"space-between"} 
        direction={"column"}
      >
        <HeaderDesc $success={true} className="mt-4 p-0">
          Excellent, <br />
          your digital certificate is ready.
        </HeaderDesc>
        <CardImg 
          $success={true} 
          className="mt-3" 
          style={{
            borderRadius: "24px",
            boxShadow: "0px 1px 2px -1px rgba(16, 24, 40, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
          }}
        >
          <img style={{ objectFit: "contain" }} width={340} height={240} src={nft?.product?.images[0]} alt="" />
        </CardImg>
        <div className="data mt-3 justify-content-start ps-3">
          <img src={nft?.collection?.image} alt="" width={41} height={41} style={{ objectFit: "contain" }}/>
          <div className="info">
            <div className="brand-title">{nft?.collection?.name}</div>
            <div className="product-name">{nft?.product?.name}</div>
          </div>
        </div>
        <Button
          onClick={handleSaveValut}
          title="Save it in my Vault"
          background={Colors.primary_600}
          className="mt-4 mb-3"
        />
      </Stack>
    </MainPageWrapper>
  );
};

const HeaderDesc = styled.div`
  color: var(--color-neutral-800);
  text-align: center;
  font-family: "Space Grotesk";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.8px;
  padding: 16px;
`;

const CardImg = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 24px;
  background: ${(props) => (props.$success ? "none" : 'var(--color-warning-100)')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BrandTitle = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: var(--letter-spacing);
  color: var(--color-plush);
`;
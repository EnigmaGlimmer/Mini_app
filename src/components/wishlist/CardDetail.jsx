import React from 'react';
import { styled } from "styled-components";
import { Assets } from "@assets";
import { Colors } from "../../styles/theme";
import { FrameWidth } from '@/utils';
import { useAppState } from '@/store';
import { Times } from '../icons/Times';
import { Button } from "@components/Button";

export const CardDetail = (props) => {
  const { onBack, select, detailScrollRef } = props;
  const { closeApp } = useAppState();

  const handleBack = async () => {
    onBack();
  }

  const handleClose = () => {
    closeApp();
  }

  const handleReward = () => {
    window.open(select?.cta, "_blank");
  }

  return (
    <>
      <BackIcon onClick={handleBack}>
        <img src={Assets.left_arrow} alt="" />
      </BackIcon>

      <CloseIcon onClick={handleClose}>
        <Times fontSize='20px' />
      </CloseIcon>

      <div className="position-relative text-center" ref={detailScrollRef}>
        <div style={{ height: 'fit-content' }}>
          <img
            src={select?.coverImage}
            height={250}
            width={FrameWidth}
            alt="reward-cover-image"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div style={{ height: 'fit-content' }}>
          <Logo
            src={select?.brand?.smallLogoUrl}
            height={85}
            width={85}
            style={{ objectFit: "contain", backgroundColor: "white", padding: "10px" }}
            alt="brand-small-logo"
          />
        </div>
      </div>
      <Desc>
        <div className="d-flex flex-column w-100">
          <Title>{select.title}</Title>
          <div dangerouslySetInnerHTML={{ __html: select?.description }}>
          </div>
        </div>
        {select?.rewardCode && <div className="w-100">
          <CouponTitle>Unique Code</CouponTitle>
          {select?.rewardCode}
          <br />
        </div>}
        <Line />
        {select?.cta && <>
          <Button
            title={select?.ctaText || "Redeem Reward"}
            onClick={handleReward}
            background={Colors.primary_600}
          />
          <div></div>
        </>}
      </Desc>
    </>
  );
};

const Logo = styled.img`
  position: absolute;
  left: calc(50% - 80px / 2);
  top: 210px;
  border-radius: 50%;
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.10);
`;

const BackIcon = styled.div`
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

const CloseIcon = styled.div`
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

const Title = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: normal;
  color: ${Colors.tertiary};
  margin-top: 66px;
  margin-bottom: 8px;
`;

const CouponTitle = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: normal;
  color: ${Colors.tertiary};
  margin-bottom: 8px;
`;

const Desc = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: ${Colors.tertiary};
  margin-top: 9px;
  margin-bottom: 12px;
  width: 100%;
  gap: 12px;
`;

const Line = styled.div`
  display: flex;
  width: 100%;
  height: 0px;
  border: 1px solid ${Colors.tertiary};
  margin-top: 24px;
  margin-bottom: 24px;
`;

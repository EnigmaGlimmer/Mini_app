import React from "react";
import { styled } from "styled-components";
import { Colors } from "../../styles/theme";
import { RightArrowIcon } from "../icons/RightArrowIcon";

export const Transfer = (props) => {
  const { onTransfer } = props;

  return (
    <Content>
      <Desc>
        Transfer Ownership: <br />
        Vaultik provides a streamlined and secure process for transferring ownership of your luxury products. Whether you're looking to sell, gift, or transfer your cherished items, our platform ensures a seamless transition.
        Through our digital product passports and blockchain technology, we verify the authenticity and provenance of your products, giving both buyers and sellers peace of mind.<br /><br />
        With just a few clicks, you can initiate the transfer process, securely transferring the ownership rights and associated digital records to the new owner.
        Vaultik's transfer ownership feature simplifies the process and enables you to confidently manage the lifecycle of your luxury products.
      </Desc>
      <ButtonWithIcon onClick={onTransfer}>
        <ButtonTitle>Transfer/Sell</ButtonTitle>
        <RightArrowIcon fill={Colors.gray} />
      </ButtonWithIcon>
    </Content>
  );
};


const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  margin-top: 16px;
`;

const Desc = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: normal;
`;

const ButtonWithIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  width: 100%;
  background: ${Colors.primary_200};
  border-radius: 6px;
  cursor: not-allowed;
`;

const ButtonTitle = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.gray};
`;

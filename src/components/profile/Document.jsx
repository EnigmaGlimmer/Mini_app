import React, { useState } from 'react';
import { styled } from "styled-components";
import { Colors } from "../../styles/theme";
import { Assets } from "@assets";
import { StatusIcon } from "../icons/StatusIcon";
import { Button } from "../Button";
import DetailPageWrapper from '../DetailPageWrapper';

export const Document = (props) => {
  const { onBack, title, detailScrollRef } = props;
  const [kycStatus, setKycStatus] = useState("KYC Pending");
  const status = "ok";

  const handleChangeKycStatus = (e) => {
    setKycStatus(e.target.value);
  };

  const handleSubmit = () => { };

  return (
    <DetailPageWrapper onBack={onBack} title={title} ref={detailScrollRef}>
      <div className="flex-col-center inner-content justify-content-start">
        <div className="flex-col-center no-scroll pb-4">
          <Text1>
            KYC (Know Your Customer) is a prerequisite for insurance activation.
            <br />
            Without completing the KYC process, your items will not be covered by the insurance provided.
          </Text1>
          <InputBoxt>
            <div className='d-flex flex-row align-items-center gap-2'>
              <img src={Assets.notepad} alt="" />
              <Input
                value={kycStatus}
                onChange={handleChangeKycStatus}
                status={status}
              />
            </div>
            <div className="d-flex flex-row align-items-center gap-1">
              <Text status={status}>
                {status === "ok" ? "Status OK" : "Status Pending"}
              </Text>
              {status === "ok" ? (
                <StatusIcon fill={Colors.neutral_900} />
              ) : (
                <img src={Assets.pending} alt="" />
              )}
            </div>
          </InputBoxt>
          <Text2>
            Please exercise caution when selecting the document for KYC verification. <br />
            We accept various types of documents, including passports, national IDs, and driver's licenses. <br />
            Depending on your country of residence, you may choose the one that suits you best. <br />
            It's essential to ensure that the selected document has an expiry date of more than one year.
          </Text2>
        </div>
        {status === "ok" ? null : (
          <Button
            title="Submit your KYC"
            onClick={handleSubmit}
            background={Colors.primary_600}
          />
        )}
      </div>
    </DetailPageWrapper>
  );
};

const Text1 = styled.div`
  width: 100%;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-top: 29px;
`;

const Text2 = styled.div`
  width: 100%;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.neutral_500};
  margin-top: 8px;
`;

const InputBoxt = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  gap: 12px;
  width: 100%;
  height: 60px;
  background: ${Colors.white};
  border: 1px solid ${Colors.neutral_200};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  outline: none;

  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.neutral_400};
`;

const Text = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) =>
    props.status === "ok" ? Colors.success_600 : Colors.warning_400};
`;

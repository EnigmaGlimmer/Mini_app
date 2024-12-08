import React, { useState } from "react";
import { styled } from "styled-components";
import { Assets } from "@assets";
import { Colors } from "../../styles/theme";
import { HeaderTab } from "../HeaderTab";
import { AuthApi } from "@api";
import { LinkButton } from "./LinkButton";
import { Storage, SetStorageObject, URLS } from "@/utils";
import { useAppState } from "@/store";
import { useOrders } from "@/store/orderStore";
import { useRewards } from "@/store/rewardStore";
import DetailPageWrapper from "../DetailPageWrapper";

export const Others = (props) => {

  const { onBack, title, detailScrollRef } = props;
  const [stage, setStage] = useState(0);
  const [tabTitle, setTabTitle] = useState(title);

  const { setLoggedIn } = useAppState();
  const { setOrders } = useOrders(false);
  const { setRewards } = useRewards(false);
  const handleLinkWeb = () => { window.open("https://www.vaultik.com", "_blank") };

  const handleTerms = () => { window.open(URLS.TermsAndConditions, "_blank") };

  const handlePrivacy = () => { window.open(URLS.PrivacyPolicy, "_blank") };

  const handleBack = () => {
    if (stage !== 0) {
      setStage(0);
      return;
    }

    onBack();
  }
  const handleDelete = async () => {
    try {
      await AuthApi.deleteUser();
      SetStorageObject(Storage.OptedUser, {});
      setLoggedIn(false);
    } catch (err) {
      console.log(err)
    }
  };

  const handleLogout = async () => {
    try {
      setOrders([]);
      setRewards([]);
      SetStorageObject(Storage.OptedUser, {});
      setLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  const links = [
    {
      title: "Vaultik Website",
      icon: Assets.arrow_right,
      position: "left",
      onClick: handleLinkWeb,
    },
    {
      title: "Terms & Conditions",
      icon: Assets.arrow_right,
      position: "left",
      onClick: handleTerms,
    },
    {
      title: "Privacy Policy",
      icon: Assets.arrow_right,
      position: "left",
      onClick: handlePrivacy,
    },
    {
      title: "Log out",
      icon: Assets.logout,
      position: "left",
      onClick: handleLogout,
      background: Colors.neutral_200,
    },
  ];

  const getContent = () => {
    if (stage === 1) {
      return (
        <div>
          Introduction<br /><br />
          Welcome to Vaultik & Brand's mobile & web application and services. By accessing or using our mobile & web application and services, you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, please do not use our services.
          <br /><br />Use of Our Services<br /><br />
          You are solely responsible for any activity that occurs under your account. When using our services, you agree to provide accurate and up-to-date information. You must not use our services for any illegal or unauthorized purpose, and you are prohibited from violating any laws in your jurisdiction while using our mobile & web application.
          <br /><br />Intellectual Property<br /><br />
          All content and materials available on our mobile & web application are the intellectual property of Vaultik & Brand and are protected by applicable copyright and trademark laws. You may not use, modify, or distribute our content without our written permission.
          <br /><br />Limitation of Liability<br /><br />
          Vaultik & Brand and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services through the mobile & web application. We do not guarantee the accuracy, completeness, or timeliness of the content on our mobile & web application.
        </div>
      )
    } else if (stage === 2) {
      return (
        <div>
          Privacy and Data Collection<br /><br />
          Your use of our services is also governed by our Privacy Policy. We collect and process your personal information in accordance with this policy, and by using our services through the mobile & web application, you consent to such collection and processing.
        </div>
      )
    }
    return (
      <div className="d-grid no-scroll pb-4" >
        <List>
          {links.map(item => (
            <LinkButton key={item.title} select={item} />
          ))}
          <Line />
        </List>
        <Text>DANGEROUS AREA</Text>
        <DeleteBox>
          <LinkBox onClick={handleDelete}>
            <Title>Delete Profile</Title>
            <Icon src={Assets.exclamation} alt="" />
          </LinkBox>
          <WarnningText>
            If you delete your profile all data, products and rewards connected to your account will be lost.
          </WarnningText>
        </DeleteBox>
        <Footer>
          <FooterText>Ver. 1928.098</FooterText>
        </Footer>
      </div >
    );
  }

  return (
    <DetailPageWrapper onBack={handleBack} title={title} ref={detailScrollRef}>
      <div className="flex-col-center inner-content w-100 pt-2">
        {getContent()}
      </div>
    </DetailPageWrapper>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  width: 100%;
  background: ${Colors.destructive_200};
  border-radius: 16px;
  cursor: pointer;
`;

const Title = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${Colors.destructive_900};
`;

const Icon = styled.img``;

const Line = styled.div`
  width: 100%;
  height: 0px;
  border: 1px solid ${Colors.neutral_300};
  margin-top: 36px;
`;

const Text = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  margin-top: 36px;
  margin-left: 0px;
`;

const DeleteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  gap: 11px;
  width: 100%;
`;

const WarnningText = styled.div`
  width: 100%;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  padding: 0 25px 32px 25px 0;
`;

const FooterText = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
`;

import React, { useState } from 'react';
import { styled } from "styled-components";
import { Assets } from "@assets";

import { Colors } from "../../styles/theme";
import DetailPageWrapper from '../DetailPageWrapper';

export const Notifications = (props) => {
  const { onBack, title, detailScrollRef } = props;
  const [controller, setController] = useState({
    transactions: false,
    rewardAndPerks: false,
    markettingStuff: true,
  });

  const handleBack = async () => {
    onBack({ ...controller });
  };

  const handleClick = (item) => {
    if (item.id === "notification") {
      setController({
        ...controller,
        transactions: !controller.transactions,
      });
    } else if (item.id === "reward") {
      setController({
        ...controller,
        rewardAndPerks: !controller.rewardAndPerks,
      });
    } else {
      setController({
        ...controller,
        markettingStuff: !controller.markettingStuff,
      });
    }
  };

  const controlItems = [
    {
      id: "notification",
      title: "Turn on email notifications",
      desc: "We will send you an email if we need to notify you about changes on the app or on your account. No spam and you can unsubscribe at any moment",
      on: controller.transactions,
      onClick: handleClick,
    },
    // {
    //   id: "reward",
    //   title: "Reward and Perks",
    //   desc: "All info about Reward and Perks connected to your items",
    //   on: controller.rewardAndPerks,
    //   onClick: handleClick,
    // },
    // {
    //   id: "marketing",
    //   title: "Marketing Stuff",
    //   desc: "Juicy updates coming from Vaultik team, no Spam at all",
    //   on: controller.markettingStuff,
    //   onClick: handleClick,
    // },
  ];

  return (
    <DetailPageWrapper onBack={() => handleBack()} title={title} ref={detailScrollRef}>
      <div className="flex-col-center inner-content w-100 pt-2">
        <div className="d-grid no-scroll pb-4">
          <Text>
            Personalize your notification preferences to ensure you receive email updates tailored to your interests and needs.
          </Text>
          <List>
            {controlItems.map(item => (
              <ControllItem key={item.title}>
                <img
                  className="cursor-pointer"
                  src={item.on ? Assets.on : Assets.off}
                  alt="check box"
                  onClick={() => item.onClick(item)}
                />
                <div className="product-meta">
                  <Title>{item.title}</Title>
                  <DescText>{item.desc}</DescText>
                </div>
              </ControllItem>
            ))}
          </List>
        </div>
      </div>
    </DetailPageWrapper>
  );
};

const Text = styled.div`
  width: 100%;
  height: 96px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-top: 24px;
  margin-left: 0px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 32px;
  margin-left: 0px;
`;

const ControllItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;

const Title = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.neutral_900};
`;

const DescText = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.neutral_500};
`;

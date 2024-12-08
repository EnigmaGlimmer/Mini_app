import React, { useState, useRef } from 'react';
import { styled } from "styled-components";
import { Assets } from "@assets";
import { Colors } from "../../styles/theme";
import { useClickOutSide } from '@/hooks/useClickOutside';
import { SupportModal } from '../modal';
import DetailPageWrapper from '../DetailPageWrapper';

export const Support = (props) => {
  const { onBack, title, detailScrollRef } = props;
  const [open, setOpen] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const containerEl = useRef(null);

  const handleClick = (index) => {
    setOpen({
      ...open,
      [index]: !open[index],
    });
  };

  useClickOutSide(containerEl, () => setOpenModal(false));

  const questions = [
    {
      "question": "How can I access my Vault?",
      "answer": "You can login using your email, Google, Apple or Facebook account."
    },
    {
      "question": "How do I redeem a new item I just purchased?",
      "answer": "To redeem a purchase, you need to insert the Redeem Code in your Vault. You can find it in the email received shortly after your purchase. Make sure your Vaultik account is associated with the same email address you used when purchasing your item."
    },
    {
      "question": "I’m trying to redeem a new item, but it says that it does not belong to me.",
      "answer": "Your Vaultik account is based on the email address you used to login. For this reason, you can only redeem products purchased using the same email address."
    },
    {
      "question": "Why don’t I see my items inside my Vault?",
      "answer": "To make sure your Vault is updated you can: <br/>Double check that your Vault account is associated with the same email address you used when purchasing your item. You can verify this on the Profile page in the bottom right part of the Vault screen. Once you are certain to have logged-in using the correct email address, you can redeem a newly purchased item."
    }
  ];

  const handleAsk = () => {
    setOpenModal(true);
  };

  const handleSend = () => {
    setOpenModal(false);
  };

  return (
    <DetailPageWrapper onBack={onBack} title={title} ref={detailScrollRef}>
      <div className="flex-col-center inner-content w-100">
        <div className="flex-col-center no-scroll w-100 pb-4">
          <List>
            {questions.map((item, index) => (
              <QuestionBox key={index}>
                <Question onClick={() => handleClick(index)}>
                  <Title>{item.question}</Title>
                  <img
                    src={open[index] ? Assets.up_arrow : Assets.down_arrow}
                    alt=""
                  />
                </Question>
                {open[index] ? <Answer dangerouslySetInnerHTML={{ __html: item.answer }}/> : null}
              </QuestionBox>
            ))}
          </List>
          <div className="flex-col-center w-100 mt-5">
            {/* <Button
            title="Ask To Support"
            onClick={handleAsk}
            background={Colors.primary_600}
          /> */}
            <HelpText>
              Couldn’t find what you were looking for?
              <br />
              Contact support at <a style={{ color: Colors.primary_600 }}>support@vaultik.com</a>
            </HelpText>
          </div>
        </div>
      </div>
      {openModal && <SupportModal onSend={() => setOpenModal(false)} />}
    </DetailPageWrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 10px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  width: 100%;
  background: ${Colors.white};
  border-bottom: 1px solid ${Colors.neutral_200};
  border-radius: 8px;
`;

const Question = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const Title = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.neutral_900};
`;

const Answer = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.neutral_500};
`;

const HelpText = styled.div`
  height: 48px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${Colors.netural_800};
  margin-top: 12px;
`;
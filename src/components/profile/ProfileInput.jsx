import React from "react";
import { styled } from "styled-components";
import { Colors } from "../../styles/theme";

export const ProfileInput = (props) => {
  const { type, title, value, onChange, disabled } = props;
  return (
    <Content>
      <Title>{title}</Title>
      <InputBox>
        <Input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </InputBox>
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Title = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.neutral_900};
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 18px 12px;
  background: ${Colors.white};
  border: 1px solid ${Colors.neutral_200};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  background: ${Colors.white};
  color: ${Colors.netural_800};
`;

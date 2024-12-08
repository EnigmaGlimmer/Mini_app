import React from "react";
import { styled } from "styled-components";
import { Colors } from "@styles/theme";

export const Button = (props) => {
  const { background, onClick, title,  ...rest } = props;

  return (
    <Content
      background={background}
      onClick={onClick}
      {...rest}
    >
      <Title>{title}</Title>
    </Content>
  );
};

const Content = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 48px;
  height: 48px;
  background: ${(props) => props.background};
  border-radius: 6px;
  cursor: pointer;
  border: none;

  &:disabled {
    cursor: default;
    &:disabled {
      filter: brightness(75%);
    }
  }
`;

const Title = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${Colors.white};
`;

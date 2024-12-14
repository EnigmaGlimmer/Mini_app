import React from "react";
import { styled } from "styled-components";
import { Colors } from "@styles/theme";

export const Button = (props) => {
  const { background, onClick, title, ...rest } = props;

  console.log("background", background);
  return (
    <Content
      background={background}
      onClick={onClick}
      {...rest}
    >
      <Title color={props.color}>{title}</Title>
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
  border-radius: ${(props) => props.borderRadius ? props.borderRadius:"6px"};
  cursor: pointer;
  border: ${(props) =>props.border ? props.border:"none"};

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
  color: ${(props) => props.color ? props.color : Colors.white};
`;

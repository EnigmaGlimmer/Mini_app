import React from "react";
import styled, { keyframes } from "styled-components";
import { Colors } from "../../styles/theme";

export const LoginButton = (props) => {
  const { startIcon, background, color, onClick, title, loading, endIcon, disabled } = props;

  return (
    <Content background={background} onClick={onClick} disabled={loading || disabled}>
      {loading ? <Spinner /> :
        <>
          <img src={startIcon} alt="" />
          <Title color={color}>{title}</Title>
        </>
      }
    </Content>
  );
};

const Content = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;

  width: 100%;
  height: 54px;
  background: ${(props) => props.background};
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 1 : 1)};
  border: none;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.17), 0px 0px 3px 0px rgba(0, 0, 0, 0.08);
  &:disabled {
    filter: brightness(75%);
  }

`;

const Title = styled.div`
  font-family: 'Geomanist', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;

  text-align: center;
  letter-spacing: 0.1em;
  color: ${(props) => props.color};
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid ${Colors.light_gray};
  border-top: 2px solid ${Colors.netural_800};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spinAnimation} 1s linear infinite;
`;

import React from 'react';
import { styled } from "styled-components";
import { Colors } from "../../styles/theme";

export const InputBox = (props) => {
  const { type, placeholder, name, value, onChange, isError, helperText, color } = props;

  return (
    <Content>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        $isError={isError}
        $textColor={color}
      />
      {isError ? <HelperText>{helperText}</HelperText> : null}
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 4px;
`;

const Input = styled.input`
  width: 100%;
  height: 54px;
  background: ${Colors.plush_100};
  outline: ${(props) => (props.$isError ? "1px solid red" : "none")};
  border: none;
  border-radius: 10px;
  padding: 14px 19px;

  font-family: 'Geomanist', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: ${(props) => (props.$textColor || Colors.plush_1000)};

  ::placeholder {
    color: ${Colors.plush_300};
  }
`;

const HelperText = styled.div`
  font-family: 'Geomanist', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  color: ${Colors.red};
`;

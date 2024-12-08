import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { Assets } from "@assets";
import { Colors } from "../../styles/theme";

export const LinkButton = (props) => {
  const { select } = props;

  const handleClick = () => {
    if (select?.position === "right") {
      select?.onClick(select);
    } else {
      select?.onClick();
    }
  };

  return (
    <ItemButton
      $position={select?.position}
      onClick={handleClick}
      $background={select?.background}
    >
      {select?.position === "right" ? <img style={{ cursor: 'pointer'}} src={select?.icon} alt="" /> : null}
      <Title>{select?.title}</Title>
      {select?.position === "left" ? <img style={{ cursor: 'pointer'}} src={select?.icon} alt="" /> : null}
    </ItemButton>
  );
};

const ItemButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props?.$position === "left" ? "space-between" : "unset"};
  padding: 16px 24px;
  gap: ${(props) => (props?.$position === "left" ? 0 : 16)}px;
  width: 100%;
  background: ${Colors.neutral_100};
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
  color: ${Colors.netural_800};
`;
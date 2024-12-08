import React, { useEffect, useState, useRef } from 'react';
import { styled } from "styled-components";
import { Colors } from "../../styles/theme";
import { Assets } from "@assets";

const ProductDetailItem = (props) => {
  const { item } = props;
  const [open, setOpen] = useState(false);
  const infoScrollRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  useEffect(() => {
    if (infoScrollRef.current) {
      infoScrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, [open]);

  if (item.hidden) return <></>;

  return (
    <Content>
      <Divide />
      <Item ref={infoScrollRef} >
        <ItemTab onClick={handleClick}>
          <Title>
            <Icon src={item?.icon} alt="" />
            <TitleText>{item?.title}</TitleText>
          </Title>
          <Icon src={open ? Assets.up_arrow : Assets.down_arrow} alt="" />
        </ItemTab>
        {open ? <>{item?.element}</> : null}
      </Item>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Item = styled.div`
  width: 100%;
  padding-top: var(--spacing-6);
`;

const ItemTab = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Divide = styled.div`
  top: -1px;
  width: 100%;
  height: 0px;
  border: 1px solid ${Colors.neutral_300};
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`;

const Icon = styled.img``;

const TitleText = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.netural_600};
`;


export default ProductDetailItem;
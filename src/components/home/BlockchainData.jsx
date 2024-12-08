import React from 'react';
import { styled } from "styled-components";
import { Colors } from "../../styles/theme";
import getTokenFullURL from '@/utils/getTokenFullURL';

export const BlockchainData = (props) => {
  const { select } = props;
  const collection = select.collection;
  const tokenAddress = collection ? getTokenFullURL(collection.chain, collection.address, select.tokenId, 'address') : "";
  const ipfsUrl = `https://ipfs.io/ipfs/${select?.ipfsHash}`

  const data = [
    {
      title: "Contract Address", info: select.collection.address || "0x942bc2d3e7a589fee7a589",
      style: { cursor: "pointer", textDecoration: "underline" },
      onClick: () => select?.collection?.address && window.open(tokenAddress, "_blank")
    },
    { title: "Token ID", info: select.tokenId },
    { title: "Token Standard", info: "ERC-721" },
    { title: "Chain", info: select.chain },
    { 
      title: "Metadata", 
      info: "IPFS", 
      style: { cursor: "pointer", textDecoration: "underline" },
      onClick: () => select?.ipfsHash && window.open(ipfsUrl, "_blank")
    },
  ];

  return (
    <Content>
      {data.map((item, index) => (
        <DataRow key={item.title}>
          <DataTitle>{item.title}</DataTitle>
          <DataInfo
            title={item.title}
            style={item.style}
            onClick={item.onClick}
          >
            {item.info}
          </DataInfo>
        </DataRow>
      ))}
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  margin-top: 25px;
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 31px;
`;

const DataTitle = styled.div`
  width: 120px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: normal;
  color: ${Colors.plush_500};
`;

const DataInfo = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: normal;
  color: ${(props) =>
    props.title === "Contract Address" ? Colors.primary_600 : Colors.plush_500};
`;

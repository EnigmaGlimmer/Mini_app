import React from 'react';
import { styled } from "styled-components";

import { Colors } from "../../styles/theme";
import { Passport } from '../icons/Passport';
import { RightArrowIcon } from '../icons/RightArrowIcon';
const CatalogItemDescription = (props) => {
    const { select: item } = props;
    const dpplink = item?.product?.qrcode || "";

    return (
        <Content>
            {dpplink && <Title
                onClick={() => window.open(dpplink, "_blank")}
            >
                Digital Passport
                <Passport />
            </Title>}
            <Desc dangerouslySetInnerHTML={{ __html: item?.product?.fullDescription }}>
            </Desc>
            <div
                className="d-flex justify-content-between align-items-center w-100 cursor-pointer"
                style={{ background: "var(--color-primary-200)", borderRadius: '6px', padding: '12px 20px' }}
                onClick={() => item?.product?.productUrl && window.open(item?.product?.productUrl, "_blank")}
            >
                <Link> Website Product Link </Link>
                <RightArrowIcon fill={Colors.black} />
            </div>
        </Content >
    );
};

export default CatalogItemDescription;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  border-radius: 6px;
  color: white;
  background: var(--color-primary-600);
  padding: 12px 20px;
  cursor: pointer !important;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 0px;
  gap: 8px;
  margin-top: 24px;
`;

const Desc = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.neutral_400};
`;

const Link = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.netural_800};
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
`;

const DataTitle = styled.h5`
  width: 120px;
  font-weight: 700;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`;

const DataInfo = styled.h5`
  max-width: 200px;
}`;

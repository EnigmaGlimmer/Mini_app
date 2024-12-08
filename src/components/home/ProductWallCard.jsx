import React from 'react';
import { styled } from "styled-components";

import { usePage } from "@store";
import { useAppState } from '@/store';
import { RefineIcon } from '../icons/Refine';
import { CertifiableItemType } from '@/utils';

export const ProductWallCard = ({ item, onOpen }) => {
  if (!item) {
    return (<></>);
  }

  const { page, setPage } = usePage();
  const { setShowHeader, setShowFooter } = useAppState();

  const isUniqueItem = item.certifiableItemType === CertifiableItemType.UNIQUE_ITEM;
  const itemName = isUniqueItem ? item.eCertificateItemCategory.name : item.product.name;
  const itemImage = isUniqueItem ? item.authenticatedItem.imageUrls[0] : item.product.images[0];
  const brandName = item.brand.brandName;
  const smallLogo = item.brand.smallLogoUrl;

  const onLink = (e, item) => {
    setShowFooter(false);
    setShowHeader(false);
    e.stopPropagation();
    setPage({
      ...page,
      is3D: true,
      showFooter: false,
      select: item,
      openDetail: true,
    })
  }

  return (
    <div className="inner-content flex-col-center cursor-pointer p-0 w-100 gap-4" onClick={onOpen}>
      <div
        className="position-relative"
        style={{ width: "100%", height: "250px" }}
      >
        <img
          className="border w-100 object-contain"
          height="100%"
          src={itemImage}
          alt="Product Image"
          style={{ borderRadius: "20px", objectFit: "contain" }}
        />
        {<div
          className="position-absolute"
          style={{ right: '-10px', bottom: '-30px', cursor: "pointer" }}
        >
          <div onClick={(e) => onLink(e, item)}>
            <RefineIcon />
          </div>
        </div>}

        {item.insurance &&
          <Badge $isInsured={true}>
            <Status $isInsured={true}>
              Vault+ Active
            </Status>
          </Badge>
        }
      </div>
      <div className="d-flex flex-row w-100 align-items-center gap-3">
        <img width="50px" src={smallLogo} alt="Brand Logo" />
        <div className="product-meta">
          <div className="brand-title">{brandName}</div>
          <div className="product-name">{itemName}</div>
        </div>
      </div>
      <div className='divide' />
    </div>
  );
};

const Badge = styled.div`
  padding: 4px 12px;
  position: absolute;
  right: 12px;
  top: 12px;
  background: ${(props) =>
    props.$isInsured ? 'var(--color-primary-600)' : 'var(--color-warning-50)'};
  border-radius: 24px;
`;

const Status = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${(props) => (props.$isInsured ? "#FFFFFF" : "var(--color-warning-500)")};
`;

const BrandTitle = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: var(--letter-spacing);
  color: var(--color-plush);
`;
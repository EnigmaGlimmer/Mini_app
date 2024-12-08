import React from 'react';
import { styled } from 'styled-components';

import { usePage } from "@store";
import { useAppState } from '@/store';
import { RefineIcon } from '../icons/Refine';
import { CertifiableItemType } from '@/utils';

export const ProductListCard = ({ item, onOpen }) => {
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
      select: item,
      openDetail: false,
    });
  }

  return (
    <div className="flex-col-center cursor-pointer gap-4 w-100" onClick={onOpen}>
      <div className="position-relative d-flex flex-row align-items-center gap-4 w-100">
        <div className="position-relative" style={{ minWidth: "35%", width: "35%" }}>
          <img
            alt="Product Image"
            src={itemImage}
            className="border object-contain"
            style={{ borderRadius: "15px", height: "160px", width: "100%", bjectFit: "contain" }}
          />
          {<div
            className="position-absolute"
            style={{ left: '-13px', top: '7px', cursor: "context-menu" }}
          >
            <div onClick={(e) => onLink(e, item)}>
              <RefineIcon />
            </div>
          </div>}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-start gap-2">
          <img width="36px" height="36px" className="rounged-lg" src={smallLogo} alt="Brand Logo" />
          <div className="product-meta">
            <div className="brand-title">{brandName}</div>
            <div className="product-name">{itemName}</div>
          </div>
          {item.insurance &&
            <Badge $isInsured={true}>
              <Status $isInsured={true}>
                Vault+ Active
              </Status>
            </Badge>
          }
        </div>
      </div>
      <div className='divide' />
    </div >
  );
};

const BrandTitle = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.02em;
  color: var(--color-plush);
`;

const Badge = styled.div`
  padding: 4px 12px;
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
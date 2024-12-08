import { styled } from 'styled-components';
import React, { useEffect, useState, useRef } from 'react';

import { Assets } from '@assets';
import { usePage } from '@store';
import { useOrders } from '@/store/orderStore';
import { Colors } from '../../styles/theme';
import { ProductDetail } from './ProductDetail';
import { Product3DViewer } from './Product3DViewer';
import { ListIcon } from '@components/icons/ListIcon';
import { WallIcon } from '@components/icons/WallIcon';
import { ProductWallCard } from '@components/home/ProductWallCard';
import { ProductListCard } from '@components/home/ProductListCard';
import Loading from '@components/Loading';
import { Currencies } from '@/utils';

export const Home = (props) => {
  const { page, setPageState } = usePage();
  const [listType, setListType] = useState("wall");
  const [totalPrice, setTotalPrice] = useState(0);
  const { isFetching, orders, fetchOrders } = useOrders(false, true);

  const detailScrollRef = useRef(null);

  const handelOpenDetail = (item) => {
    setPageState(true, item);
  };

  const handleCloseDetail = () => {
    setPageState(false, null);
  };

  const handleChangeType = () => {
    if (listType === "wall") {
      setListType("list");
    } else {
      setListType("wall");
    }
  };

  useEffect(() => {
    if (detailScrollRef.current) {
      detailScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [page]);

  useEffect(() => {
    const price = orders.reduce((sum, _item) => sum + Number(_item?.priceInUsd), 0);
    setTotalPrice(price);
  }, [orders]);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isFetching && orders.length === 0) {
    return <Loading />;
  }

  if (page?.openDetail && page?.select) {
    if (page.is3D) {
      return <Product3DViewer item={page?.select} />
    }

    return (
      <ProductDetail
        onBack={handleCloseDetail}
        select={page?.select}
        detailScrollRef={detailScrollRef}
      />
    );
  }

  return (
    <div className="inner-card inner-content gap-4">
      <div className="items-info">
        <div className="d-flex flex-column align-items-start gap-1">
          <div className="d-flex flex-row align-items-center gap-1">
            <Unit>{Currencies.USD}</Unit>
            <Price>{totalPrice.toLocaleString("en-US")}</Price>
          </div>
          <div className="product-name">{orders.length ?
            `${orders.length} items` :
            '😉 No items yet'}
          </div>
        </div>
        <div className="d-flex">
          <img src={Assets.chartUp} alt="" />
        </div>
      </div>
      <MenuBar>
        <MenuTitle>Your Items</MenuTitle>
        <div className="d-flex flex-row align-items-center gap-3">
          <ListIcon
            fill={listType === "list" ? Colors.primary_600 : Colors.neutral_200}
            onClick={handleChangeType}
          />
          <WallIcon
            fill={listType === "wall" ? Colors.primary_600 : Colors.neutral_300}
            onClick={handleChangeType}
          />
        </div>
      </MenuBar>
      <div className="flex-col-center gap-4 text-center">
        {orders.map(item =>
          listType === "wall" ? (
            <ProductWallCard
              item={item}
              key={item.id}
              onOpen={() => handelOpenDetail(item)}
            />
          ) : (
            <ProductListCard
              item={item}
              key={item.id}
              onOpen={() => handelOpenDetail(item)}
            />
          )
        )}
        {!orders.length &&
          <div className="flex-all-center flex-column h-100 gap-2">
            <div className="w-100">
              <img src={Assets.noItem} />
            </div>
            <span>No Items yet in your Vault...</span>
          </div>
        }
      </div>
    </div>
  );
};

const Unit = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  letter-spacing: -0.02em;
  color: var(--color-primary-900);
`;

const Price = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: var(--letter-spacing);
  color: var(--color-primary-800);
`;

const MenuBar = styled.div`
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MenuTitle = styled.div`
  width: 50%;
  height: 24px;
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: var(--letter-spacing);
  color: var(--color-netural-900);
`;
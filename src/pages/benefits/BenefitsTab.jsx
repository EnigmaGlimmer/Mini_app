import React, { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import { Assets } from '@assets';
import { Colors } from '../../styles/theme';
import { CardDetail } from '@components/wishlist/CardDetail';
import { BenefitsCard } from '@components/wishlist/BenefitsCard';
import { usePage } from '@store';
import { useAppState } from '@/store';
import Loading from '@/components/Loading';
import { useRewards } from '@/store/rewardStore';

export const BenefitsTab = () => {
  const { page, setPage } = usePage();
  const [filterRewards, setFilterRewards] = useState([]);
  const { setShowFooter } = useAppState()
  const [search, setSearch] = useState("");
  const { isFetching, rewards, openReward } = useRewards(false, true);

  const detailScrollRef = useRef(null);

  const handelOpenDetail = async (item) => {
    setPage({
      ...page,
      background: Colors.radiant_dawn_100,
      openDetail: true,
      select: item,
      display: false,
    });
    setShowFooter(false);
    await openReward(item.id);
  };

  const handleCloseDetail = () => {
    setPage({
      ...page,
      background: Colors.neutral_100,
      openDetail: false,
      display: true,
    });
    setShowFooter(true);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      setFilterRewards(rewards);
    }
  };

  const handleSearch = () => {
    const filteredRewards = rewards.filter(
      (item) => item.brand.brandName.toLocaleLowerCase() === search.toLocaleLowerCase()
    );
    setFilterRewards(filteredRewards);
  };

  useEffect(() => {
    setFilterRewards(rewards);
  }, [rewards]);

  useEffect(() => {
    if (detailScrollRef.current) {
      detailScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [page?.openDetail]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="inner-card">
      <div className="inner-content">
        {page?.openDetail ? (
          <CardDetail
            onBack={handleCloseDetail}
            select={page?.select}
            detailScrollRef={detailScrollRef}
          />
        ) : (
          <div className="flex-col-center h-100">
            {filterRewards.length === 0 ? (
              <div className="flex-all-center flex-column h-100 gap-4">
                <div className="w-100">
                  <img src={Assets.noReward} />
                </div>
                <span>No Benefit available yet...</span>
              </div>
            ) : (
              <>
                <SearchBox>
                  <InputBox
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={handleChange}
                  />
                  <img style={{ curosor: 'pointer' }} src={Assets.search} alt="" onClick={handleSearch} />
                </SearchBox>
                <Title>Featured</Title>
                {filterRewards.map(item => (
                  <BenefitsCard
                    item={item}
                    key={item.id}
                    onOpen={() => handelOpenDetail(item)}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 12px;
  width: 100%;
  gap: 12px;
  background: ${Colors.white};
  border: 1px solid #E5E5E5;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
`;

const InputBox = styled.input`
  width: 100%;
  height: 20px;
  background: ${Colors.white};
  padding: 0px;
  outline: none;
  border: none;

  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.neutral_900};

  ::placeholder {
    color: ${Colors.neutral_400};
  }
`;

const Title = styled.div`
  font-family: "Space Grotesk";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  width: 70px;
  margin-top: 10px;
  margin-left: -246px;
  margin-bottom: 18px;
`;

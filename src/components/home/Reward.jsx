import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRewards } from '@/store/rewardStore';
import { usePage, useAppState } from '@/store';
import { AppState } from '@/utils';
import { Colors } from '@/styles/theme';

export const Reward = ({ select }) => {
    const [rewardList, setReward] = useState([]);
    const { isFetching, rewards, openReward } = useRewards();
    const { page, setPage } = usePage();
    const { setShowFooter, setActivePage } = useAppState();

    function getDate(date) {
        const currentDate = new Date(date);
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        return `${month}/${day}`;
    };

    useEffect(() => {
        const _rewards = rewards.filter(_reward => (
            _reward.triggerProductIds.includes(select?.product?.id)
        ));

        setReward(_rewards);
    }, [rewards]);

    const handleReward = async (item) => {
        setActivePage(AppState.Perks);
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

    return (
        <Content>
            {rewardList.length === 0 ? (
                <div className="pt-4">
                    {isFetching ?
                        "" :
                        "No rewards or benefits associated to this digital passport yet"
                    }
                </div>
            ) :
                <div
                    className="d-flex justify-content-between w-100 mt-4 gap-4 flex-column"
                >
                    {rewardList?.map((item) => (
                        <div
                            key={item.id}
                            className="d-flex bg-grey cursor-pointer"
                            style={{ background: "var(--color-primary-200)", borderRadius: '24px', gap: '16px', padding: '12px' }}
                            onClick={() => handleReward(item)}
                        >
                            <div className="flex-all-center">
                                <img
                                    src={item?.coverImage}
                                    width={100} height={100}
                                    alt="reward-cover-image"
                                    style={{ objectFit: "contain", borderRadius: "12px" }}
                                />
                            </div>
                            <div className="flex-col-center align-items-start gap-2">
                                <div className="fw-bolder" style={{ maxHeight: "48px", overflow: "hidden" }}>
                                    {item.title}
                                </div>
                                <div
                                    className="badge"
                                    style={{ background: "var(--color-primary-600)", borderRadius: '24px' }}
                                >
                                    {item?.category}
                                </div>
                                <div style={{ color: "var(--color-neutral-400)" }}>
                                    from {getDate(item?.eventFrom)} to {getDate(item?.eventTo)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </Content>
    );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
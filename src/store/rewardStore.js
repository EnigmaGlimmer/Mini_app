import { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { windowState } from './windowStore';
import { RewardApi } from '@/api';

const rewardsState = atom({
    key: 'rewardsStateKey',
    default: [],
});

export const useRewards = (fetchOnStart = true, isForce = false) => {
    const [isFetching, setFetching] = useState(false);
    const [rewards, setRewards] = useRecoilState(rewardsState);
    const [vaultikWindow] = useRecoilState(windowState);

    const fetchRewards = async (page, size) => {
        if (!vaultikWindow.brandPubKey && process.env.FETCH_ONLY_BRANDS === "true") {
            setRewards([]);
            return [];
        }

        setFetching(true);

        try {
            const _rewards = await RewardApi.getRewards(vaultikWindow.brandPubKey, page, size);
            setRewards(_rewards.data);
            setFetching(false);
            return _rewards;
        } catch (error) {
            setFetching(false);
            throw error;
        }
    };

    const openReward = async (rewardId) => {
        try {
            await RewardApi.openReward(rewardId);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isForce) {
            fetchRewards();
        } else if (fetchOnStart && rewards.length === 0) {
            fetchRewards();
        }
    }, []);

    return {
        isFetching,
        rewards,
        setRewards,
        fetchRewards,
        openReward
    };
};

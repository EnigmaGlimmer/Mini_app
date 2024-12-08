import * as yup from 'yup';

import { apiGet, apiPut } from './baseApi';

let testRewards = [];
const MOCK_REWARD = false;

export const initialReward = {
    id: 0, // Auto Increase
    title: '',
    category: '',
    discount: 0,
    videoLink: '',
    cta: '',
    description: '',
    coverImage: '',
    rewardCode: '',
    eventFrom: new Date().toISOString().split('T')[0],
    eventTo: new Date().toISOString().split('T')[0],
    hasExpire: false,
    triggerProducts: [], // An array of trigger products ID
    applyToProducts: [] // An array of apply to products ID
};

export const RewardModelValidator = yup.object().shape({
    id: yup.number()
        .required('Reward ID is missing'),
    category: yup.string()
        .required('Reward Title is invalid.'),
    discount: yup.number()
        .required('Reward Discount is invalid'),
    videoLink: yup.string()
        .required('Reward Video Link is invalid'),
    cta: yup.string()
        .required('Reward External Link is invalid'),
    description: yup.string()
        .required('Full Description is invalid'),
    coverImage: yup.string()
        .required('Reward Cover Image is invalid'),
    rewardCode: yup.string()
        .required('Reward Unique Code is missing'),
    eventFrom: yup.date()
        .optional('Reward Event Start Date is invalid'),
    eventTo: yup.date()
        .optional('Reward Event Start Date is invalid'),
    hasExpire: yup.boolean()
        .optional('Reward Expiration Flag is invalid'),
    triggerProducts: yup.array(yup.number())
        .required('Reward Products are not valid'),
        applyToProducts: yup.array(yup.number())
        .required('Rewarding Products are not valid'),
});

/**
 * This function validates the reward response coming from backend.
 * 
 * @param {RewardModelValidator} reward An reward object or an array of rewards
 */
const rewardValidate = async (rewards) => {
    try {
        if (Array.isArray(rewards)) {
            for (let reward of rewards) {
                await RewardModelValidator.validate(reward);
            }
        } else {
            await RewardModelValidator.validate(rewards);
        }
    } catch (validationError) {
        console.log(validationError);
        throw validationError;
    }
}

/**
 * Get paginationized rewards from backend.
 * 
 * There are 2 ways of getting rewards from backend.
 * One is to use access_token given when logged in.
 * Another one is to use API_PRIVATE_KEY as a token.
 * As we send access_token by default in baseApi, we follow first one.
 * 
 * @param {string} brandPublicKey A public key of brands
 * @param {number} page Page Number starting from 0
 * @param {number} pageSize Page Size. default is 15.
 * @returns An array of rewards
 */
export const getRewards = async (brandPublicKey, page = 0, size = 15000) => {

    try {
        if (MOCK_REWARD) {
            return {
                data: testRewards
            };
        }

        const response = await apiGet({
            url: '/rewards/valid',
            queryParams: { brandPublicKey, page, size },
        });

        // await rewardValidate(response.data);

        return response;
    } catch (error) {
        console.log('[Error] getRewards Failed.', error);
        throw error;
    }
};

/**
 * Get a specific reward based on reward id.
 * 
 * if return value is undefined, it will show 404 Not Found Page.
 * 
 * @param {number} rewardId ID of the selected reward
 * @returns An object to describe details
 */
export const getRewardDetail = async (rewardId) => {
    try {
        if (MOCK_REWARD) {
            const _rewards = testRewards.filter(_reward => _reward.id === rewardId);
            if (_rewards.length > 0) return _rewards[0];

            throw "Invalid rewardId";
        }

        const reward = await apiGet({
            url: `/rewards/${rewardId}`,
        });

        await rewardValidate(reward);

        return reward;
    } catch (error) {
        console.log('[Error] getReward Failed.', error);
        throw error;
    }
}

/**
 * Open a reward to update the opened stats.
 * 
 * @param {number} rewardId identifier of the reward object
 * @returns true if succeed, otherwise false
 */
export const openReward = async (rewardId) => {
    try {
        const newReward = await apiPut({
            url: `/rewards/${rewardId}/open`
        });

        return newReward;
    } catch (error) {
        console.log('[Error] newReward Failed.', error);
        throw error;
    }
}

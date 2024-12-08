import { apiPost, } from './baseApi';

/**
 * Subscribe walkthrought newsletter without redeem code.
 * 
 * @param {string} email email to subscribe
 * @returns {{ isValid: boolean }} A valid flag for error or success
 */
export const subscribeWalkthroughtNewsletter = async ({ email }) => {

    try {
        const res = await apiPost({
            url: '/newsletter/subscriptions',
            bodyParam: { email, source: "mini-app" },
        });

        return res;
    } catch (error) {
        // Handle any network or server errors
        console.log('[Error] Subscribe Walkthrought Newsletter Failed.', error);
        throw error;
    }
};

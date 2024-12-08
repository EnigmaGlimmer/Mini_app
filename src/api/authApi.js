import * as yup from 'yup';

import { apiPost, apiGet, apiDelete, apiPut, API_ENDPOINT } from './baseApi';
import { AUTH_USER_TYPE } from '@/utils';

/**
 * This function validates the product response coming from backend.
 * 
 * @param {UserModelValidator} product An product object or an array of products
 */
const userValidate = async (user) => {
    try {
        const validatedResponse = await UserModelValidator.validate(user);

        return validatedResponse;
    } catch (validationError) {
        console.log(validationError);
        throw validationError;
    }
}

export const UserModelValidator = yup.object().shape({
    id: yup.number().required('User ID is missing'),
    email: yup.string().required('User Email is invalid.'),
    firstName: yup.string().required('User First Name is invalid.'),
    lastName: yup.string().required('User Last Name is invalid.'),
    refreshToken: yup.string().nullable(),
    walletId: yup.string().optional('Wallet ID is invalid.').nullable(),
    address: yup.string().optional().nullable(),
    phone: yup.string().optional().nullable(),
});

/**
 * Sign in to Brand Dashboard backend.
 * The API response will send cookies as well,
 * so the next APIs will be sent with the cookie.
 * 
 * @param {string} email A user's email
 * @param {string} password A user's password
 * @returns {UserModelValidator} A User object.
 */
export const signIn = async ({ email, password }) => {

    try {
        const user = await apiPost({
            url: '/auth/login',
            bodyParam: { email, password, userType: AUTH_USER_TYPE },
        });

        await userValidate(user);
        return user;
    } catch (error) {
        // Handle any network or server errors
        console.log('[Error] Login Failed.', error);
        throw error;
    }
};


/**
 * Google Login in API.
 * Internally, /auth/google API will send redirect url as a response.
 * /auth/google => google auth redirect url => /auth/callback => user object.
 * In general, just calling /auth/google api is enough, but as we are calling this api inside iframe,
 * parent site redirection is not allowed.
 * So we will open a popup window to do this kinda redirection.
 * The backend will send a html page firing postMessage with user object.
 * 
 * @returns {Promise<UserModelValidator>} A User object.
 */
export const signInGoogle = async () => {
    const xcode = 'mini';
    return new Promise((resolve, reject) => {
        const popup = window.open(
            `${API_ENDPOINT}/auth/google?windowId=${xcode}&userType=${AUTH_USER_TYPE}`,
            '_blank',
            'popup,height=800,width=600'
        );
        
        const checkPopupClosed = setInterval(function () {
            if (popup.closed !== false) {
                clearInterval(checkPopupClosed);
                reject('User declined to login.');
            }
        }, 1000);

        window.addEventListener('message', (event) => {
            const data = event?.data;
            if (data?.windowId !== xcode) {
                return;
            }

            if (data.type === 'auth') {
                if (data.error?.code) {
                    reject(data.error.message || "Failed to sigin");
                } else {
                    resolve(data.user);
                }
            } else {
                reject('User declined to login.');
            }
            popup.close();
        });
    });
};

/**
 * Apple Login in API.
 * Same as Google Login
 * 
 * @returns {Promise<UserModelValidator>} A User object.
 */
export const signInApple = async () => {
    const xcode = 'mini';
    return new Promise((resolve, reject) => {
        const popup = window.open(
            `${API_ENDPOINT}/auth/apple?windowId=${xcode}&userType=${AUTH_USER_TYPE}`,
            '_blank',
            'popup,height=800,width=600'
        );

        const checkPopupClosed = setInterval(function () {
            if (popup.closed !== false) {
                clearInterval(checkPopupClosed);
                reject('User declined to login.');
            }
        }, 1000);

        window.addEventListener('message', (event) => {
            const data = event?.data;
            if (data?.windowId !== xcode) {
                return;
            }

            if (data.type === 'auth') {
                console.log('data: ', data); // WIP: test for google sign in/up
                if (data.error?.code) {
                    reject(data.error.message || "Failed to sigin");
                } else {
                    resolve(data.user);
                }
            } else {
                reject('User declined to login.');
            }
            popup.close();
        });
    });
};


/**
 * Facebook Login in API.
 * Same as Google Login
 * 
 * @returns {Promise<UserModelValidator>} A User object.
 */
export const signInFacebook = async () => {
    const xcode = 'mini';
    return new Promise((resolve, reject) => {
        const popup = window.open(
            `${API_ENDPOINT}/auth/google?windowId=${xcode}&userType=${AUTH_USER_TYPE}`,
            '_blank',
            'popup,height=800,width=600'
        );

        const checkPopupClosed = setInterval(function () {
            if (popup.closed !== false) {
                clearInterval(checkPopupClosed);
                reject('User declined to login.');
            }
        }, 1000);

        window.addEventListener('message', (event) => {
            const data = event?.data;
            if (data?.windowId !== xcode) {
                return;
            }

            if (data.type === 'auth') {
                if (data.error?.code) {
                    reject(data.error.message || "Failed to sigin");
                } else {
                    resolve(data.user);
                }
            } else {
                reject('User declined to login.');
            }
            popup.close();
        });
    });
};

/**
 * Sign up to Brand Dashboard backend.
 * The API response will send a verification email.
 * so the user should have to sign in after the account creation.
 * 
 * @param {string} email A user's email
 * @param {string} password A user's password
 * @param {string} firstName A user's first name
 * @param {string} lastName A user's last name
 * @returns {Promise<UserModelValidator>} A newly created user.
 */
export const signUp = async (userInfo) => {
    try {
        const user = await apiPost({
            url: '/auth/signup',
            bodyParam: userInfo,
        });

        await userValidate(user);
        return user;
    } catch (error) {
        // Handle any network or server errors
        console.log('[Error] Sign up Failed.', error);
        throw error;
    }
}

/**
 * Email Verification.
 * The user has been received a 6 digit code after sign up and should send digital code.
 * After that, you can successfully login.
 * If you have a trouble with that, please click Resend below.
 * @param {Number} digit
 */

export const verifyEmail = async (email, digit) => {
    try {
        const response = await apiPost({
            url: '/auth/verify-email',
            bodyParam: { token: digit, email },
        });

        return response;
    } catch (error) {
        console.log('[Error] Verify Token failed.')
        throw error;
    }
}

/**
 * This function is called when user doesn't verify the account
 * This API isn't tied with valid token
 * @param {string} email A user email
 */

export const resendVerification = async (email) => {
    try {
        const response = await apiGet({
            url: '/auth/resend-verification',
            queryParams: { email }
        });
        return response;
    } catch (err) {
        console.log('[Error] Resend Verification Failed', err);
        throw err;
    }
};

/**
 * This function is called when consumer forgets password.
 * This API can be called without valid token.
 * Consumer should call resetPassword API after forgot.
 * 
 * @param {string} email A user's email
 * @returns {Promise<string>} A link to be used when calling resetPassword
 */
export const forgetPassword = async ({ email }) => {
    try {
        const response = await apiPost({
            url: '/auth/forgot-password',
            bodyParam: { email }
        })
        return response;
    } catch (err) {
        console.log('[Error] Forget Password Failed', err);
        throw err;
    }
}

/**
 * An API to change password.
 * This API should be called with valid token.
 * 
 * @param {string} newPassword A new password
 * @param {string} confirmPassword A confirm password
 */
export const changePassword = async ({ newPassword, confirmPassword }) => {
    try {
        const response = await apiPost({
            url: '/account/change-password',
            bodyParam: {
                newPassword,
                confirmPassword
            }
        })

        return response;
    } catch (err) {
        console.log('[Error] Forget Password Failed', err);
        throw err;
    }
}

/**
 * An API to reset password when forgot.
 * This API should be called with the link being sent in forgetPassword API.
 * 
 * @param {string} resetLink A new password
 * @param {string} password A confirm password
 */
export const resetPassword = async (token, password) => {
    try {
        const response = await apiPost({
            url: '/auth/reset-password',
            bodyParam: {
                token: token,
                password: password
            }
        });
        return response;
    } catch (err) {
        console.log('[Error] Rest Password Failed', err);
        throw err;
    }
}

/**
 * An API to delete my account.
 */
export const deleteUser = async () => {
    try {
        const response = await apiDelete({
            url: '/account'
        })
        return response
    } catch (err) {
        console.log('[Error] Delete Account Failed');
        throw err;
    }
}

/**
 * An API to update current user profile
 */

export const updateProfile = async (param) => {
    try {
        const reponse = await apiPut({
            url: '/account/profile',
            bodyParam: param
        });
        return reponse;
    } catch (err) {
        console.log('[Error] Update Profile Failed.', err);
        throw err;
    }
}

/**
 * Returns an object from brand's public key
 * 
 * @param {string} brandPublicKey Brand's public key
 * @returns An object with { brandName, logoUrl, smallLogoUrl }
 */
export const getBrands = async (brandPublicKey) => {

    try {
        const response = await apiGet({
            url: `/brands/key/${brandPublicKey }`,
        });

        return response;
    } catch (error) {
        // Handle any network or server errors
        console.log('[Error] Get Brands Failed.', error);
        throw error;
    }
}

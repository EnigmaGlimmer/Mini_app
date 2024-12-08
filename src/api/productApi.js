import { apiGet } from './baseApi';

/**
 * Get a specific product based on product id.
 * 
 * if return value is undefined, it will show 404 Not Found Page.
 * 
 * @param {number} productId ID of the selected product
 * @returns An object to describe details
 */
export const getProductDetail = async (productId) => {
    try {
        const product = await apiGet({
            url: `/products/id/${productId}`,
        });

        return product;
    } catch (error) {
        console.log('[Error] getProduct Failed.', error);
        throw error;
    }
}

/**
 * Get vault content assigned to a specific product based on product id.
 * 
 * @param {string} brandPublicKey A public key of brands
 * @param {number} productId ID of the selected product
 * @returns An object to describe details
 */
export const getVaultContentByProductId = async (pubKey, productId) => {
    try {
        const product = await apiGet({
            url: `/vault-content`,
            queryParams: {
                pubKey,
                productId,
                page: 0,
                size: 15000
            }
        });

        return product;
    } catch (error) {
        console.log('[Error] getVaultContentByProductId Failed.', error);
        throw error;
    }
}

/**
 * Get repair content assigned to a specific product based on product id.
 * 
 * @param {string} brandPublicKey A public key of brands
 * @param {number} productId ID of the selected product
 * @returns An object to describe details
 */
export const getRepairContentByProductId = async (pubKey, productId) => {
    try {
        const product = await apiGet({
            url: `/repair-content`,
            queryParams: {
                pubKey,
                productId,
                page: 0,
                size: 15000
            }
        });

        return product;
    } catch (error) {
        console.log('[Error] getRepairContentByProductId Failed.', error);
        throw error;
    }
}
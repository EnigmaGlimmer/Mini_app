import axios from 'axios';
import { Storage, GetStorageObject } from '../utils';

export const API_ENDPOINT = process.env.API_ENDPOINT || 'https://dev-api.vaultik.com';

const axiosApi = axios.create({
    baseURL: API_ENDPOINT
});

/**
 * HTTP Request using GET method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} hasToken A flag to indicate if it is a public api or private
 * 
 * @returns HTTP Request Response
 */
export const apiGet = async ({ url, queryParams, hasToken = true }) => {
    const token = GetStorageObject(Storage.OptedUser)?.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    if (!hasToken) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.get(url, {
            params: queryParams,
            headers,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(response?.data);
        }
    } catch (error) {
        throw error?.response?.data || error;
    }
};

/**
 * HTTP Request using POST method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} bodyParam Body Params 
 * @param {string} hasToken A flag to indicate if it is a public api or private
 * 
 * @returns HTTP Request Response
 */
export const apiPost = async ({ url, queryParams, bodyParam, hasToken = true }) => {
    const token = GetStorageObject(Storage.OptedUser)?.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    if (!hasToken) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.post(url, bodyParam, {
            params: queryParams,
            headers: headers,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(response?.data);
        }
    } catch (error) {
        throw error?.response?.data || error;
    }
};


/**
 * HTTP Request using POST method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} bodyParam Body Params 
 * @param {string} hasToken A flag to indicate if it is a public api or private
 * 
 * @returns HTTP Request Response
 */
export const apiPut = async ({ url, queryParams, bodyParam, hasToken = true }) => {
    const token = GetStorageObject(Storage.OptedUser)?.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    if (!hasToken) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.put(url, bodyParam, {
            params: queryParams,
            headers: headers,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(response?.data);
        }
    } catch (error) {
        throw error?.response?.data || error;
    }
};


/**
 * HTTP Request using POST method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} bodyParam Body Params 
 * @param {string} hasToken A flag to indicate if it is a public api or private
 * 
 * @returns HTTP Request Response
 */
export const apiUpload = async ({ url, bodyParam, queryParams, hasToken = true }) => {
    const token = GetStorageObject(Storage.OptedUser)?.token;
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    };
    try {
        const response = await axiosApi.post(url, bodyParam, {
            params: queryParams,
            headers: headers,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(response?.data);
        }
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export const apiDelete = async ({ url, hasToken = true }) => {
    const token = GetStorageObject(Storage.OptedUser)?.token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    if (!hasToken) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.delete(url, {
            headers: headers,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(response?.data);
        }
    } catch (error) {
        throw error?.response?.data || error;
    }
};

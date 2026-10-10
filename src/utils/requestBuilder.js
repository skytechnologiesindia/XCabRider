import axios from "axios";
import { storage, STORAGE_KEYS } from "./storage";

export const BASE_URL = process.env.BASE_URL || "https://extinct-fester-crop.ngrok-free.dev/v1";

const resolveToken = async (explicitToken = null) => {
    if (explicitToken) return explicitToken;
    try {
        return await storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch {
        return null;
    }
};

const getHeaders = (token = null, customHeaders = {}) => {
    return {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...customHeaders,
    };
};

const formatUrl = (endpoint) => {
    if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
        return endpoint;
    }
    const cleanBase = BASE_URL.replace(/\/+$/, "");
    let cleanEndpoint = endpoint.replace(/^\/+/, "");

    // Avoid double /v1 if cleanBase ends with /v1 and cleanEndpoint starts with v1/
    if (cleanBase.endsWith("/v1") && cleanEndpoint.startsWith("v1/")) {
        cleanEndpoint = cleanEndpoint.substring(3);
    }
    return `${cleanBase}/${cleanEndpoint}`;
};

export const extractErrorMessage = (error) => {
    return (
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        (error?.response?.status === 401 ? 'Session expired. Please log in again.' : null) ||
        (error?.message === 'Network Error'
            ? 'Network Error: Cannot connect to server.'
            : error?.message) ||
        'An unexpected error occurred. Please try again.'
    );
};

export const post = async (endpoint, data = {}, token = null, customHeaders = {}) => {
    try {
        const authToken = await resolveToken(token);
        const url = formatUrl(endpoint);
        const headers = getHeaders(authToken, customHeaders);
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        if (error?.response?.status === 401) {
            console.warn(`[401 Unauthorized] Session expired on ${endpoint}`);
        }
        console.error(`API POST error (${endpoint}):`, error?.response?.data || error.message);
        throw error;
    }
};

export const get = async (endpoint, token = null, customHeaders = {}) => {
    try {
        const authToken = await resolveToken(token);
        const url = formatUrl(endpoint);
        const headers = getHeaders(authToken, customHeaders);
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        if (error?.response?.status === 401) {
            console.warn(`[401 Unauthorized] Session expired on ${endpoint}`);
        }
        console.error(`API GET error (${endpoint}):`, error?.response?.data || error.message);
        throw error;
    }
};

export default {
    post,
    get,
    extractErrorMessage,
};
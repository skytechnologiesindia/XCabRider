import axios from "axios";


const Base_Url = process.env.BASE_URL || "http://localhost:3000";

const getHeaders = (token = null, customHeaders = {}) => {
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...customHeaders,
    };
};

const formatUrl = (endpoint) => {
    if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
        return endpoint;
    }
    const cleanBase = Base_Url.replace(/\/+$/, "");
    const cleanEndpoint = endpoint.replace(/^\/+/, "");
    return `${cleanBase}/${cleanEndpoint}`;
};

export const post = async (endpoint, data = {}, token = null, customHeaders = {}) => {
    try {
        const url = formatUrl(endpoint);
        const headers = getHeaders(token, customHeaders);
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error(`API POST error (${endpoint}):`, error?.response?.data || error.message);
        throw error;
    }
};
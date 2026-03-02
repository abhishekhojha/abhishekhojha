import axios from 'axios';

// A single, global axios instance
export const apiClient = axios.create({
    // You can set defaults here, like:
    // baseURL: import.meta.env.PUBLIC_API_URL || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;

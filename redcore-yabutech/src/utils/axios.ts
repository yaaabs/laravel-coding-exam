import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Correct backend API URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

// Add response interceptor
instance.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default instance;
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthUser() {
    const navigate = useNavigate();

    const gettoken = () => {
        return sessionStorage.getItem('jwt_token');
    }

    const getuser = () => {
        return sessionStorage.getItem('user');
    }

    const [token, settoken] = useState(gettoken());
    const [user, setuser] = useState(getuser());

    const savetoken = (user, token) => {
        sessionStorage.setItem('jwt_token', token);
        sessionStorage.setItem('user', user);
        settoken(token);
        setuser(user);
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/Signin');
    }

    // Create axios instance with updated CORS configuration
    const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    // Request interceptor
    http.interceptors.request.use(
        (config) => {
            const token = gettoken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            // Ensure CORS headers are properly set
            config.headers['Access-Control-Allow-Credentials'] = true;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor with better error handling
    http.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                // Handle specific error cases
                switch (error.response.status) {
                    case 401: // Unauthorized
                        logout();
                        break;
                    case 403: // Forbidden
                        console.error('Access denied');
                        break;
                    case 500: // Server error
                        console.error('Server error occurred');
                        break;
                    default:
                        console.error('API Error:', error.response.data);
                }
            } else if (error.request) {
                // Network error
                console.error('Network error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
            return Promise.reject(error);
        }
    );

    return {
        settoken: savetoken,
        gettoken,
        getuser,
        user,
        token,
        http,
        logout
    };
}

export default AuthUser;
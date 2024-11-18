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

    const [token,settoken] = useState(gettoken());
    const [user,setuser] = useState(gettoken());


    const savetoken = (user,token) => {
        sessionStorage.setItem('jwt_token',token);
        sessionStorage.setItem('user',user);

        settoken(token);
        setuser(user);
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/Signin');
    }

    const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    });

    // Add response interceptor to handle errors
    http.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('API Error:', error.response);
            return Promise.reject(error);
        }
    );

    // Add request interceptor to handle CSRF token if needed
    http.interceptors.request.use(
        (config) => {
            const token = sessionStorage.getItem('jwt_token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
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
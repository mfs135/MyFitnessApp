import axios from 'axios';

function AuthUser(){
    const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        withCredentials: true,
        headers:{
            "Content-Type": "application/json"
        }
    });

    return {
        http
    }
}

export default AuthUser;
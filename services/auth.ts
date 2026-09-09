import  axios  from 'axios';


const API_URL = 'https://dummyjson.com'

export const login = async (username: string, password: string) => {

        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password
        });

        return response.data; // includes user data , access token and role 
    }

    export const me = async (token: string) => {
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    

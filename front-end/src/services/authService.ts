import axios from "axios";
import { Inputs } from "../components/LoginModal";

const baseUrl = import.meta.env.VITE_APP_BASE_API_URL;

export const registerService = (data: Inputs) => {
    return axios.post(`${baseUrl}/auth/register`, data, { withCredentials: true });
};

export const loginService = (data: Inputs) => {
    return axios.post(`${baseUrl}/auth/login`, data, { withCredentials: true });
};

export const isLoginService = () => {
    return axios.get(`${baseUrl}/auth/isLoggedIn`, { withCredentials: true });
};

export const logOutService = () => {
    return axios.get(`${baseUrl}/auth/logout`, { withCredentials: true });
};
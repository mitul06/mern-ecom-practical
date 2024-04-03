import axios from "axios";
import { queryBuilder } from "./queryBuilder";
import { ICreateOrder } from "../models/CartSlice";

const baseUrl = import.meta.env.VITE_APP_BASE_API_URL;

export const getOrder = (id: string) => {
    return axios.get(`${baseUrl}/order/get/${id}`, { withCredentials: true });
};

export const getAllOrders = (param: any) => {
    let str = queryBuilder(param);

    return axios.get(`${baseUrl}/order/list` + str, { withCredentials: true });
};

export const createOrder = (data: ICreateOrder) => {
    return axios.post(`${baseUrl}/order/create`, data, { withCredentials: true });
};

export const editOrder = (id: string, data: ICreateOrder) => {
    return axios.post(`${baseUrl}/order/edit/${id}`, data, { withCredentials: true });
};
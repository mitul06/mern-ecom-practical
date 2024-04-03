import axios from "axios";
import { queryBuilder } from "./queryBuilder";

const baseUrl = import.meta.env.VITE_APP_BASE_API_URL;

export const getProduct = (id: string) => {
    return axios.get(`${baseUrl}/product/get/${id}`, { withCredentials: true });
};

export const getAllProducts = (param: any) => {
    let str = queryBuilder(param);

    return axios.get(`${baseUrl}/product/list` + str, { withCredentials: true });
};

export const getAllCategories = (param: any) => {
    let str = queryBuilder(param);

    return axios.get(`${baseUrl}/category/list` + str, { withCredentials: true });
}

export const getAllBrands = (param: any) => {
    let str = queryBuilder(param);

    return axios.get(`${baseUrl}/brand/list` + str, { withCredentials: true });
}
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';


const BakeryClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default BakeryClient;
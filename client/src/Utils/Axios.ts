import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';


const BakeryClient: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_ENDPOINT}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default BakeryClient;
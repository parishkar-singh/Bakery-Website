import {AxiosResponse} from "axios";
import BakeryClient from "@/Utils/Axios.ts";

export const getAllInventoryItems = async () => {
    try {
        const response: AxiosResponse = await BakeryClient.get('/ingredients', {withCredentials: true});
        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
};
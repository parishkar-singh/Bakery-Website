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
export const updateInventoryItems = async (data: any) => {
    try {
        const response: AxiosResponse = await BakeryClient.put('/ingredients', data, {withCredentials: true});
        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
}
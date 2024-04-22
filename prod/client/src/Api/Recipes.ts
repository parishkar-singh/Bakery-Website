import {AxiosResponse} from "axios";
import BakeryClient from "@/Utils/Axios.ts";

export const getAllRecipeItems = async () => {
    try {
        const response: AxiosResponse = await BakeryClient.get('/recipes/make', {withCredentials: true});
        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
};